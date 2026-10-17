"""Phone workspace acceptance: visible preview/CTA, touch editing and reflow.

Runs only against the isolated local Worker via browser_support. No real requests.
"""
import asyncio
import io
import json
from pathlib import Path

from PIL import Image, ImageDraw
from playwright.async_api import async_playwright
from browser_support import BASE, launch

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'evidence/mobile-refresh'


async def main():
    OUT.mkdir(exist_ok=True)
    results = {'checks': [], 'widths': [], 'browserErrors': []}
    async with async_playwright() as p:
        browser = await launch(p)
        ctx = await browser.new_context(viewport={'width': 390, 'height': 844},
                                        is_mobile=True, has_touch=True, reduced_motion='reduce')
        page = await ctx.new_page()
        page.set_default_timeout(30000)
        page.on('pageerror', lambda e: results['browserErrors'].append(str(e)))
        host = page.locator('.preview-stage .studio-3d-host')
        canvas = host.locator('canvas')

        async def ready():
            await page.locator('.preview-stage .studio-3d[data-status=ready]').wait_for()
            await page.wait_for_function("document.querySelector('.preview-stage .studio-3d-host')?.dataset.artworkTargets")

        async def draft():
            return await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")

        async def top():
            await page.evaluate("document.activeElement?.blur();window.scrollTo({top:0,behavior:'instant'})")

        async def fits():
            assert not await page.evaluate('document.documentElement.scrollWidth > innerWidth'), page.viewport_size

        async def shot(name, full=True):
            await page.screenshot(path=str(OUT / (name + '.jpg')), type='jpeg', quality=85, full_page=full)

        await page.goto(BASE + '/design', wait_until='networkidle')
        await ready()
        assert (await draft())['color'] == 'Natural'
        assert await page.get_by_role('group', name='Bag color', exact=True).get_by_role('button').first.get_attribute('aria-label') == 'Natural'
        for shape in ['Box', 'D-Cut', 'Handle', 'String', 'T-Shirt']:
            await page.get_by_role('button', name=shape, exact=True).tap()
            await ready()
            assert (await draft())['color'] == 'Natural', shape
        await page.get_by_role('button', name='Box', exact=True).tap()
        await ready()
        palette = page.get_by_role('group', name='Bag color', exact=True)
        await palette.get_by_role('button', name='Forest green', exact=True).tap()
        await page.reload(wait_until='networkidle')
        await ready()
        assert (await draft())['color'] == 'Forest green', 'A chosen color must survive reload'
        await palette.get_by_role('button', name='Natural', exact=True).tap()
        quote = page.get_by_role('link', name='Get a quote for this bag', exact=True)
        q = await quote.bounding_box()
        assert q['y'] + q['height'] <= 844 and q['height'] >= 44, q
        front = page.get_by_role('button', name='Front', exact=True)
        fb = await front.bounding_box()
        stage = await page.locator('.preview-stage').bounding_box()
        results['studio'] = {'quoteBottom': round(q['y'] + q['height'], 1), 'previewHeight': round(stage['height'], 1), 'pageHeight': await page.evaluate('document.documentElement.scrollHeight')}
        assert stage['y'] <= fb['y'] and fb['y'] + fb['height'] <= stage['y'] + stage['height'], (stage, fb)
        await front.tap()
        results['checks'].append('Natural first/default for all five bag shapes, saved chosen colors preserved; front/back and quote visible on first phone screen')
        await shot('after-studio')

        # The editor can scroll to advanced options without moving the bag or CTA.
        pane = page.locator('.editor-body[data-state=active]')
        before = await page.locator('.preview-stage').bounding_box()
        await pane.evaluate('(e)=>e.scrollTop=e.scrollHeight')
        assert await pane.evaluate('(e)=>e.scrollTop') > 0
        assert await page.locator('.preview-stage').bounding_box() == before
        assert await quote.bounding_box() == q
        await page.get_by_role('button', name='Next: add your design', exact=True).tap()
        await page.get_by_role('group', name='Your elements').get_by_role('button', name='Select Text').first.tap()
        await page.get_by_label('Brand name or message').fill('MOBILE BRAND')
        await top()
        await page.wait_for_function("JSON.parse(document.querySelector('.preview-stage .studio-3d-host').dataset.artworkTargets).some(t=>t.layer==='text'&&t.visible)")
        await shot('after-artwork')
        results['checks'].append('Editor scrolls independently; direct next-step text entry')

        # Actual touch events move only the selected artwork, not the camera.
        cdp = await ctx.new_cdp_session(page)

        async def drag(layer, dx, dy):
            await top()
            await front.tap()
            await page.wait_for_function("Math.abs(Number(document.querySelector('.preview-stage .studio-3d-host').dataset.angle))<.01")
            targets = json.loads(await host.get_attribute('data-artwork-targets'))
            target = next(t for t in targets if t['layer'] == layer and t['side'] == 'front')
            assert target['visible'], target
            box = await canvas.bounding_box()
            x, y = box['x'] + target['x'] * box['width'], box['y'] + target['y'] * box['height']
            angle = float(await host.get_attribute('data-angle'))
            await cdp.send('Input.dispatchTouchEvent', {'type': 'touchStart', 'touchPoints': [{'x': x, 'y': y}]})
            for step in range(1, 7):
                await cdp.send('Input.dispatchTouchEvent', {'type': 'touchMove', 'touchPoints': [{'x': x + dx * step / 6, 'y': y + dy * step / 6}]})
            await cdp.send('Input.dispatchTouchEvent', {'type': 'touchEnd', 'touchPoints': []})
            assert abs(float(await host.get_attribute('data-angle')) - angle) < .01

        before = await draft()
        await drag('text', 12, 8)
        after = await draft()
        assert (after['x'], after['y']) != (before['x'], before['y']), 'The single text layer did not move'
        await page.get_by_role('button', name='Undo change').tap()
        undone = await draft()
        assert (undone['x'], undone['y']) == (before['x'], before['y'])
        await page.get_by_role('button', name='Redo change').tap()

        logo = Image.new('RGBA', (160, 100), (0, 0, 0, 0))
        draw = ImageDraw.Draw(logo)
        draw.rounded_rectangle((4, 4, 156, 96), radius=15, fill='#123442')
        draw.text((45, 40), 'MOBILE', fill='white')
        buf = io.BytesIO()
        logo.save(buf, format='PNG')
        await page.locator('input[type=file]').set_input_files({'name': 'mobile-qa.png', 'mimeType': 'image/png', 'buffer': buf.getvalue()})
        await page.locator('.artwork-file strong').filter(has_text='mobile-qa.png').wait_for()
        await top()
        await front.tap()
        try:
            await page.wait_for_function("JSON.parse(document.querySelector('.preview-stage .studio-3d-host').dataset.artworkTargets).some(t=>t.layer==='logo'&&t.visible)")
        except Exception:
            await shot('upload-failure')
            state = await draft()
            print('UPLOAD DIAGNOSTIC', {k: state.get(k) for k in ['product', 'side', 'color', 'logoName', 'text', 'layeredArtwork']},
                  'logoBytes', len(state.get('logo', '')), 'targets', await host.get_attribute('data-artwork-targets'),
                  'angle', await host.get_attribute('data-angle'), 'canvas', await canvas.bounding_box(),
                  'scroll', await page.evaluate('scrollY'), flush=True)
            raise
        before = await draft()
        await drag('logo', -14, -10)
        after = await draft()
        assert after['x'] != before['x'] and after['textPlacement'] == before['textPlacement']
        await page.get_by_role('button', name='Copy design to back', exact=True).tap()
        await page.get_by_role('button', name='Back', exact=True).tap()
        assert (await draft())['backLogo'] and (await draft())['backText'] == 'MOBILE BRAND'
        await top()
        await front.tap()
        results['checks'].append('Phone logo upload, independent text/logo touch dragging, undo/redo, both sides')

        view = page.get_by_role('button', name='3D view controls', exact=True)
        assert await view.get_attribute('aria-expanded') == 'false'
        await view.tap()
        for button in await page.get_by_role('group', name='3D view controls').get_by_role('button').all():
            box = await button.bounding_box()
            assert box['width'] >= 44 and box['height'] >= 44, box
        angle = float(await host.get_attribute('data-angle'))
        await page.get_by_role('button', name='Rotate bag right').tap()
        await page.wait_for_function("v=>Math.abs(Number(document.querySelector('.preview-stage .studio-3d-host').dataset.angle)-v)>.1", arg=angle)
        distance = float(await host.get_attribute('data-distance'))
        await page.get_by_role('button', name='Zoom in', exact=True).tap()
        await page.wait_for_function("v=>Number(document.querySelector('.preview-stage .studio-3d-host').dataset.distance)<v", arg=distance)
        await page.keyboard.press('Escape')
        assert await view.get_attribute('aria-expanded') == 'false'
        await page.get_by_role('button', name='Expand editing controls').tap()
        assert not await canvas.is_visible()
        await shot('expanded-editor', False)
        await page.get_by_role('button', name='Show bag preview').tap()
        await ready()
        await page.get_by_role('button', name='Enlarge preview').tap()
        dialog = page.get_by_role('dialog')
        await dialog.locator('.studio-3d[data-status=ready]').wait_for()
        await dialog.get_by_role('button', name='3D view controls', exact=True).tap()
        await dialog.get_by_role('button', name='Rotate bag left').tap()
        await dialog.get_by_role('button', name='Close', exact=True).tap()
        assert await page.get_by_role('button', name='Enlarge preview').evaluate('(e)=>e===document.activeElement')
        results['checks'].append('44px view controls; zoom/orbit; expanded editor restores preview; fullscreen and focus return')

        # Secondary content is reachable without consuming the editing viewport.
        await page.locator('.studio-resources > summary').tap()
        await page.locator('.studio-real-samples-images button').first.tap()
        await page.get_by_role('dialog').get_by_role('button', name='Close', exact=True).tap()
        async with page.expect_download() as pending:
            await page.get_by_role('button', name='Download both sides + specifications', exact=True).tap()
        png = Path(await (await pending.value).path()).read_bytes()
        assert int.from_bytes(png[16:20], 'big') == 2000
        await page.locator('.studio-resources > summary').tap()
        await quote.tap()
        await page.wait_for_url('**/quote')
        assert (await draft())['backText'] == 'MOBILE BRAND'
        await shot('quote-handoff')
        results['checks'].append('Real photo dialog, full resolution two-sided export, quote carries both sides')

        for width, height in [(320, 568), (360, 740), (390, 844), (430, 932), (768, 1024), (844, 390), (1440, 900)]:
            await page.set_viewport_size({'width': width, 'height': height})
            await page.goto(BASE + '/design', wait_until='networkidle')
            await ready()
            await fits()
            await page.get_by_role('tab', name='02 Your design', exact=True).click()
            await page.get_by_role('group', name='Your elements').get_by_role('button', name='Select Text').first.click()
            await page.get_by_label('Brand name or message').fill('MOBILE BRAND')
            await quote.scroll_into_view_if_needed()
            await fits()
            await top()
            await shot(f'studio-{width}x{height}', width <= 430)
            results['widths'].append([width, height])

        await page.set_viewport_size({'width': 390, 'height': 844})
        await page.goto(BASE + '/sq/design', wait_until='networkidle')
        await ready()
        await fits()
        await shot('studio-albanian')
        await page.goto(BASE + '/', wait_until='networkidle')
        assert await page.get_by_role('button', name='Natural 3D bag', exact=True).get_attribute('aria-pressed') == 'true'
        carousel = page.get_by_role('region', name='Explore bag shapes')
        await carousel.scroll_into_view_if_needed()
        await carousel.evaluate('(e)=>e.scrollLeft=e.scrollWidth')
        assert await carousel.evaluate('(e)=>e.scrollLeft') > 0
        assert await carousel.get_by_role('link').count() == 5
        await top()
        await shot('after-home')
        results['homeHeight'] = await page.evaluate('document.documentElement.scrollHeight')
        await page.goto(BASE + '/products', wait_until='networkidle')
        await fits()
        await shot('after-catalog')
        results['catalogHeight'] = await page.evaluate('document.documentElement.scrollHeight')
        results['checks'].append('Albanian studio, all five swipeable homepage shapes, Natural homepage default, compact catalog')
        assert not results['browserErrors'], results['browserErrors']
        results['status'] = 'passed'
        (OUT / 'checks.json').write_text(json.dumps(results, indent=2))
        await browser.close()
        print('PASS mobile workspace:', len(results['checks']), 'journeys;', len(results['widths']), 'viewport sizes', flush=True)


asyncio.run(main())
