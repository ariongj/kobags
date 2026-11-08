"""Read-only release checks for the native non-woven studio, local or --live.

Uses an isolated browser profile. Application writes are blocked even on live;
artwork and quote drafts stay in that profile and are never sent to the CMS.
"""
import asyncio
import base64
import json
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlsplit

from playwright.async_api import async_playwright
from browser_support import launch

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'deliverables/handoff/studio-20261108'
LIVE = '--live' in sys.argv
PUBLIC_ONLY = '--public-only' in sys.argv
MODE = 'live' if LIVE else 'local'
STUDIO = 'https://kobags.itdks.tech'
MAIN = 'https://kobags-group.com'
LOCAL = 'http://127.0.0.1:8787'
checks, errors, measurements, requests = [], [], [], set()


async def main():
    OUT.mkdir(parents=True, exist_ok=True)
    async with async_playwright() as p:
        browser = await launch(p)
        slots = asyncio.Semaphore(6)

        async def context(width):
            c = await browser.new_context(viewport={'width': width, 'height': 852 if width < 800 else 900}, is_mobile=width < 800, has_touch=width < 800, reduced_motion='reduce')
            await c.add_init_script("""window.__qaVitals={lcp:0,cls:0};
                new PerformanceObserver(list=>list.getEntries().forEach(e=>window.__qaVitals.lcp=e.startTime)).observe({type:'largest-contentful-paint',buffered:true});
                new PerformanceObserver(list=>list.getEntries().forEach(e=>{if(!e.hadRecentInput)window.__qaVitals.cls+=e.value})).observe({type:'layout-shift',buffered:true});""")
            async def route(r):
                u = urlsplit(r.request.url)
                requests.add(u.netloc)
                if LIVE and u.path.startswith('/cdn-cgi/challenge-platform/'):
                    await r.continue_(); return
                if r.request.method not in ['GET', 'HEAD', 'OPTIONS']:
                    errors.append('Blocked application write: ' + u.path)
                    await r.abort(); return
                if LIVE:
                    await r.continue_(); return
                if u.netloc not in ['kobags.itdks.tech', 'kobags-group.com', 'www.kobags-group.com']:
                    errors.append('Unexpected third party: ' + u.netloc)
                    await r.abort(); return
                async with slots:
                    response = await r.fetch(url=LOCAL + u.path + ('?' + u.query if u.query else ''), headers={**r.request.headers, 'Host': u.netloc}, max_redirects=0, max_retries=2)
                    await r.fulfill(response=response)
            await c.route('**/*', route)
            return c

        api = await p.request.new_context()
        async def get(origin, path, headers=None):
            return await api.get((origin if LIVE else LOCAL) + path, headers={**(headers or {}), **({'Host': urlsplit(origin).netloc} if not LIVE else {})}, max_redirects=0)
        for prefix in ['', '/sq']:
            r = await get(STUDIO, prefix + '/design')
            assert r.status == 200 and 'noindex' in r.headers.get('x-robots-tag', '') and 'no-store' in r.headers.get('cache-control', ''), (r.status, r.headers)
            for suffix in ['', '?model=coffee-test&preview=1', '/extra']:
                r = await get(MAIN, prefix + '/design' + suffix, {'x-forwarded-host': 'kobags.itdks.tech', 'x-kobags-studio-enabled': '1'})
                assert r.status == 307 and r.headers['location'].endswith(prefix + '/products'), (r.status, r.headers)
        checks.append('EN/SQ studio is enabled only on testing host; main direct/deep/query requests redirect, including spoofed headers')
        r = await get(STUDIO, '/robots.txt'); assert 'Disallow: /\n' in await r.text()
        r = await get(MAIN, '/sitemap.xml'); assert '/design' not in await r.text()
        r = await get(MAIN, '/')
        for header in ['content-security-policy', 'strict-transport-security', 'x-content-type-options', 'referrer-policy', 'permissions-policy']:
            if header == 'strict-transport-security' and not LIVE:
                continue  # HSTS is correctly absent on the local HTTP listener.
            assert header in r.headers, header
        checks.append('Preview noindex and main sitemap exclusion; security headers retained' + (' including HSTS on live HTTPS' if LIVE else ' (HSTS tested on live HTTPS only)'))
        await api.dispose()

        for width in ([] if PUBLIC_ONLY else [1440, 393, 320]):
            print('Studio', MODE, width, flush=True)
            c = await context(width)
            page = await c.new_page(); page.set_default_timeout(90000)
            page.on('pageerror', lambda e: errors.append(str(e)))
            start = time.monotonic()
            await page.goto(STUDIO + '/design', wait_until='domcontentloaded')
            host = page.locator('.preview-stage .studio-3d-host')
            canvas = host.locator('canvas')
            async def ready():
                await page.locator('.preview-stage .studio-3d[data-status=ready]').wait_for()
                await page.wait_for_function('document.querySelector(".preview-stage .studio-3d-host")?.dataset.geometry === "nonwoven-20261108"')
            async def draft():
                return await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")
            async def target(layer):
                await canvas.scroll_into_view_if_needed()
                await page.wait_for_function('(layer)=>JSON.parse(document.querySelector(".preview-stage .studio-3d-host").dataset.artworkTargets||"[]").some(t=>t.layer===layer&&t.side==="front"&&t.visible)', arg=layer)
                points = json.loads(await host.get_attribute('data-artwork-targets'))
                point = next(t for t in points if t['layer'] == layer and t['side'] == 'front')
                rect = await canvas.bounding_box()
                return rect['x'] + point['x'] * rect['width'], rect['y'] + point['y'] * rect['height']
            async def drag(layer, dx=16, dy=8):
                x, y = await target(layer)
                if width < 800:
                    cd = await c.new_cdp_session(page)
                    await cd.send('Input.dispatchTouchEvent', {'type': 'touchStart', 'touchPoints': [{'x': x, 'y': y, 'id': 1}]})
                    assert await host.get_attribute('data-dragging') == 'true', (layer, await host.get_attribute('data-selection'))
                    for step in range(1, 5):
                        await cd.send('Input.dispatchTouchEvent', {'type': 'touchMove', 'touchPoints': [{'x': x + dx * step / 4, 'y': y + dy * step / 4, 'id': 1}]})
                    await cd.send('Input.dispatchTouchEvent', {'type': 'touchEnd', 'touchPoints': []})
                    await cd.detach()
                else:
                    await page.mouse.move(x, y); await page.mouse.down()
                    assert await host.get_attribute('data-dragging') == 'true', (layer, await host.get_attribute('data-selection'))
                    await page.mouse.move(x + dx, y + dy, steps=6); await page.mouse.up()
                await ready(); await page.wait_for_timeout(200)
            await ready()
            page.set_default_timeout(25000)
            measurements.append({'viewport': width, 'coldStudioReadySeconds': round(time.monotonic() - start, 2), 'renderer': 'Chromium / SwiftShader software WebGL, unthrottled VPS; not real-device GPU performance'})
            assert (await draft())['color'] == 'Natural'
            assert await page.locator('.bag-pick').count() == 5
            assert not await page.evaluate('document.documentElement.scrollWidth > innerWidth')
            await canvas.evaluate('(e)=>e.dataset.qaIdentity="same-context"')
            if width != 320:
                for label, slug in [('Box', 'box-bag'), ('D-Cut', 'd-cut-bag'), ('Handle', 'handle-bag'), ('String', 'string-bag'), ('T-Shirt', 't-shirt-bag')]:
                    await page.get_by_role('button', name=label, exact=True).click()
                    await page.wait_for_function('(s)=>document.querySelector(".studio-3d-host")?.dataset.model===s', arg=slug)
                    await ready()
                    assert await canvas.get_attribute('data-qa-identity') == 'same-context'
                    await page.locator('.preview-stage').screenshot(path=str(OUT / f'{MODE}-final-{slug}-{width}.png'))
                    print('  model', slug, flush=True)
                assert await host.get_attribute('data-dimensions') == '31 × 55 × 18 cm'
                checks.append(f'{width}px: all five catalogue models render; T-shirt dimensions correct; WebGL context reused across models')
            await page.get_by_role('button', name='Box', exact=True).click(); await ready()
            if width == 1440:
                sizes = page.get_by_label('Bag size', exact=True)
                original = await host.get_attribute('data-dimensions')
                await sizes.click()
                await page.get_by_role('option').last.click(); await ready()
                assert await host.get_attribute('data-dimensions') != original
                await sizes.click()
                await page.get_by_role('option').first.click(); await ready()
                checks.append('Selected catalogue size updates model dimensions, without replacing the renderer')
            if width < 800:
                await page.get_by_role('button', name='3D view controls', exact=True).click()
            for name in ['View side', 'View inside', 'View 3/4']:
                await page.get_by_role('button', name=name, exact=True).click()
                await page.wait_for_timeout(150)
            await page.locator('.preview-stage').screenshot(path=str(OUT / f'{MODE}-view-controls-{width}.png'))
            await page.get_by_label('Preview brightness', exact=True).fill('1.25')
            assert await page.get_by_label('Preview brightness', exact=True).input_value() == '1.25'
            before_distance = float(await host.get_attribute('data-distance'))
            await page.get_by_role('button', name='Zoom in', exact=True).click()
            await page.wait_for_function('(d)=>Number(document.querySelector(".studio-3d-host").dataset.distance)<d', arg=before_distance)
            await page.get_by_role('button', name='Reset 3D view', exact=True).click()
            async with page.expect_download() as pending:
                await page.get_by_role('button', name='Save 3D image', exact=True).click()
            download = await pending.value
            await download.save_as(str(OUT / f'{MODE}-3d-export-{width}.png'))
            assert Path(await download.path()).stat().st_size > 15000
            await ready()
            if width < 800:
                await page.keyboard.press('Escape')
                assert await page.get_by_role('button', name='3D view controls', exact=True).get_attribute('aria-expanded') == 'false'
            checks.append(f'{width}px: inspection angles, exposure, zoom/reset, real 3D PNG export, accessible controls')
            print('  views and export passed', flush=True)
            await page.wait_for_timeout(900)
            idle_frame = int(await host.get_attribute('data-frame'))
            await page.wait_for_timeout(900)
            assert int(await host.get_attribute('data-frame')) == idle_frame, 'Idle renderer is still drawing'
            checks.append(f'{width}px: idle WebGL rendering pauses')
            if width != 320:
                await page.get_by_role('tab', name='02 Your design', exact=True).click()
                await page.get_by_label('Brand name or message', exact=True).fill('KOBAGS TEST')
                await page.get_by_role('button', name='Front', exact=True).click(); await ready()
                before = await draft()
                await drag('text')
                moved = await draft()
                assert moved['x'] != before['x'] or moved.get('textPlacement') != before.get('textPlacement'), (before, moved)
                await page.get_by_role('button', name='Undo change', exact=True).filter(visible=True).click(); await ready()
                assert (await draft())['x'] == before['x']
                await page.get_by_role('button', name='Redo change', exact=True).filter(visible=True).click(); await ready()
                palette = page.get_by_role('group', name='Add artwork', exact=True)
                await palette.get_by_role('button', name='QR', exact=True).click()
                dialog = page.get_by_role('dialog')
                await dialog.get_by_label('Website or page link').fill(MAIN)
                await dialog.get_by_role('button', name='Add QR code', exact=True).click(); await dialog.wait_for(state='hidden'); await ready()
                qr = next(e for e in (await draft())['elements'] if e['kind'] == 'qr')
                if width < 800:
                    await page.get_by_label('Selected element', exact=True).select_option('element:' + qr['id'])
                    await page.get_by_role('button', name='Make selected element larger', exact=True).click()
                else:
                    await page.get_by_role('group', name='Your elements', exact=True).get_by_role('button', name='Select QR 2:', exact=False).click()
                    await page.get_by_role('slider', name='Artwork size', exact=True).focus()
                    await page.keyboard.press('ArrowRight'); await page.keyboard.press('ArrowRight')
                await ready()
                assert next(e for e in (await draft())['elements'] if e['id'] == qr['id'])['scale'] == qr['scale'] + 2
                await drag('element:' + qr['id'], -14, -8)
                after_qr = next(e for e in (await draft())['elements'] if e['id'] == qr['id'])
                assert after_qr['x'] != qr['x']
                await palette.get_by_role('button', name='Logo', exact=True).click()
                raw = await page.evaluate("""()=>{const c=document.createElement('canvas');c.width=c.height=120;const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,120,120);x.fillStyle='#007a36';x.fillRect(20,20,80,80);return c.toDataURL().split(',')[1]}""")
                await page.locator('input[type=file]').set_input_files({'name': 'qa-logo.png', 'mimeType': 'image/png', 'buffer': base64.b64decode(raw)})
                await page.locator('.artwork-file strong').filter(has_text='qa-logo.png').wait_for(); await ready()
                selected = await page.get_by_label('Selected element', exact=True).input_value()
                before_logo = await draft(); await drag(selected, -12, 5); after_logo = await draft()
                assert after_logo != before_logo
                await page.screenshot(path=str(OUT / f'{MODE}-artwork-{width}.png'))
                await page.reload(wait_until='domcontentloaded'); await ready()
                assert (await draft()) == after_logo
                checks.append(f'{width}px: text/QR/logo selection and direct drag, QR resize, undo/redo, draft persistence; no server upload')
                print('  artwork gestures and persistence passed', flush=True)
            await page.goto(STUDIO + '/sq/design', wait_until='domcontentloaded'); await ready()
            assert await page.locator('html').get_attribute('lang') == 'sq'
            assert not await page.evaluate('document.documentElement.scrollWidth > innerWidth')
            if width == 320:
                await canvas.evaluate("e=>{const gl=e.getContext('webgl2');gl.getExtension('WEBGL_lose_context').loseContext()}")
                await page.locator('.studio-3d[data-status=fallback] .bag-canvas').wait_for()
                checks.append('Lost WebGL context retains the photo preview and design tools')
            # Closing a profile cancels navigation prefetches; ignore only their
            # teardown errors, after all page/interaction assertions completed.
            await c.unroute_all(behavior='ignoreErrors'); await c.close()

        for width in [1440, 393]:
            print('Public website', MODE, width, flush=True)
            c = await context(width); page = await c.new_page(); page.set_default_timeout(60000)
            page.on('pageerror', lambda e: errors.append(str(e)))
            for path in ['/', '/manufacturing', '/products', '/products/t-shirt-bag', '/sustainability', '/quote', '/sq', '/sq/products', '/sq/quote', '/not-a-real-page-qa']:
                r = await page.goto(MAIN + path, wait_until='domcontentloaded')
                await page.locator('main').wait_for()
                assert r.status == (404 if 'not-a-real' in path else 200), (path, r.status)
                assert not await page.locator('a[href*="/design"]').count(), path
                assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth'), path
                if path in ['/', '/manufacturing']:
                    await page.evaluate('document.fonts.ready')
                    await page.screenshot(path=str(OUT / f'{MODE}-after-{"home" if path == "/" else "manufacturing"}-{width}.png'), full_page=True)
                    measurements.append({'page': path, 'viewport': width, 'lab': 'unthrottled Chromium on VPS; cache disabled; not field CWV or Lighthouse', **(await page.evaluate('window.__qaVitals'))})
                    assert not await page.locator('img').evaluate_all('(items)=>items.filter(e=>e.loading!=="lazy"&&e.complete&&e.naturalWidth===0).length')
            checks.append(f'{width}px: main EN/SQ navigation endpoints, products, responsibility, quote, correct 404, images and width; studio remains absent')
            await c.unroute_all(behavior='ignoreErrors'); await c.close()
        await browser.close()
    assert not errors, errors


if __name__ == '__main__':
    try:
        asyncio.run(main())
    except Exception as e:
        errors.append(repr(e))
        raise
    finally:
        result = {'status': 'passed' if not errors else 'failed', 'timestampUTC': datetime.now(timezone.utc).isoformat(), 'mode': MODE, 'checks': checks, 'errors': errors, 'measurements': measurements, 'networkHosts': sorted(requests), 'submittedInquiries': 0}
        (OUT / f'{MODE}-{"public-" if PUBLIC_ONLY else ""}release-results.json').write_text(json.dumps(result, indent=2) + '\n')
        print(json.dumps(result, indent=2), flush=True)
