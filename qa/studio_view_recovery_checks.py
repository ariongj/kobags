"""3D view selection, explicit motion and interrupted artwork recovery. Local only."""
import asyncio, json
from pathlib import Path
from playwright.async_api import async_playwright
from browser_support import BASE, launch

ROOT = Path(__file__).resolve().parents[1]

async def main():
    checks, errors = [], []
    async with async_playwright() as p:
        browser = await launch(p)
        context = await browser.new_context(viewport={'width':1440, 'height':1000})
        page = await context.new_page()
        page.set_default_timeout(45000)
        page.on('pageerror', lambda error: errors.append(str(error)))
        host = page.locator('.preview-stage .studio-3d-host')
        canvas = host.locator('canvas')
        async def ready():
            await page.locator('.preview-stage .studio-3d[data-status=ready]').wait_for()
        async def angle():
            return float(await host.get_attribute('data-angle'))
        async def draft():
            return await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")
        async def face(name, value):
            await page.get_by_role('button', name=name, exact=True).click()
            await page.wait_for_function("expected => Math.abs(Math.abs(Number(document.querySelector('.preview-stage .studio-3d-host').dataset.angle)) - expected) < .015", arg=value)
        await page.goto(BASE+'/design', wait_until='networkidle')
        await ready()
        for family in ['Handle','Box','D-Cut','T-Shirt','String']:
            await page.get_by_role('button', name=family, exact=True).click()
            await ready()
            await face('Front', 0)
            await page.get_by_role('button', name='Rotate bag right', exact=True).click()
            await page.wait_for_function("Math.abs(Number(document.querySelector('.preview-stage .studio-3d-host').dataset.angle)) > .2")
            await face('Front', 0)
            await face('Back', 3.14159)
            await page.get_by_role('button', name='Rotate bag right', exact=True).click()
            await page.wait_for_function("Math.abs(Math.abs(Number(document.querySelector('.preview-stage .studio-3d-host').dataset.angle))-Math.PI) > .2")
            await face('Back', 3.14159)
            checks.append(f'{family}: reselecting either face snaps the camera correctly')
        await page.get_by_role('button', name='Box', exact=True).click()
        await ready()
        await page.get_by_role('tab', name='02 Your design', exact=True).click()
        await page.get_by_label('Brand name or message', exact=True).fill('MOTION CHECK')
        await ready()
        before = await angle()
        await page.get_by_role('button', name='Auto rotate bag', exact=True).click()
        await page.wait_for_function("before => Math.abs(Number(document.querySelector('.preview-stage .studio-3d-host').dataset.angle) - before) > .025", arg=before)
        await page.get_by_role('button', name='Pause rotation', exact=True).click()
        await page.wait_for_timeout(500)
        stopped = await angle()
        await page.wait_for_timeout(500)
        assert abs(await angle() - stopped) < .005
        checks.append('Explicit auto-rotation and pause work in the artwork editor')
        await page.get_by_role('button', name='Auto rotate bag', exact=True).click()
        await face('Front', 0)
        assert await page.get_by_role('button', name='Auto rotate bag', exact=True).get_attribute('aria-pressed') == 'false'
        checks.append('Explicit face selection stops rotation and keeps its button state honest')
        await page.wait_for_timeout(900)
        idle_frame = await host.get_attribute('data-frame')
        await page.wait_for_timeout(600)
        assert await host.get_attribute('data-frame') == idle_frame
        checks.append('A still, visible bag stops rendering until another edit or camera action')
        await page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
        await page.wait_for_timeout(350)
        frame = await host.get_attribute('data-frame')
        await page.wait_for_timeout(600)
        assert await host.get_attribute('data-frame') == frame
        checks.append('The offscreen 3D editor stops rendering')
        await canvas.scroll_into_view_if_needed()
        await ready()
        await face('Front', 0)
        start = await draft()
        target = await host.evaluate("e => JSON.parse(e.dataset.artworkTargets).find(p => p.side === 'front' && p.layer === 'text')")
        bounds = await canvas.bounding_box()
        x, y = bounds['x'] + target['x'] * bounds['width'], bounds['y'] + target['y'] * bounds['height']
        await page.mouse.move(x, y)
        await page.mouse.down()
        await page.mouse.move(x+30, y+10, steps=5)
        assert await host.get_attribute('data-dragging') == 'true'
        moved = await draft()
        assert moved['x'] != start['x']
        lost = await canvas.evaluate("c => {const gl = c.getContext('webgl2'); const ext = gl?.getExtension('WEBGL_lose_context'); if(!ext) return false; ext.loseContext(); return true}")
        assert lost, 'This browser cannot exercise an actual context loss'
        await page.locator('.studio-3d[data-status=fallback] .bag-canvas[data-ready=true]').wait_for()
        await page.mouse.up()
        await page.get_by_role('button', name='Undo change', exact=True).click()
        await page.wait_for_function("start => JSON.parse(localStorage.getItem('kobags-design-v1')).x === start", arg=start['x'])
        await page.get_by_label('Brand name or message', exact=True).fill('RECOVERED AFTER CONTEXT LOSS')
        await page.locator('.studio-3d[data-status=fallback] .bag-canvas[data-ready=true]').wait_for()
        assert (await draft())['text'] == 'RECOVERED AFTER CONTEXT LOSS'
        checks.append('Actual WebGL loss during dragging preserves the draft, ends the gesture and allows undo/editing')
        await page.get_by_role('button', name='Photo + artwork', exact=True).click()
        await page.get_by_role('button', name='3D view', exact=True).click()
        await ready()
        assert (await draft())['text'] == 'RECOVERED AFTER CONTEXT LOSS'
        checks.append('Reopening 3D recovers a new canvas without losing artwork')
        assert not errors, errors
        await browser.close()
    result = {'status':'passed','checks':checks,'browserErrors':errors}
    (ROOT/'evidence/studio-view-recovery-checks.json').write_text(json.dumps(result, indent=2))
    print(json.dumps(result, indent=2))

asyncio.run(main())
