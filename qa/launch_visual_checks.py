"""Verify settled, visible 3D frames after mobile scroll/resize; local only."""
import asyncio, io, json
from pathlib import Path
from PIL import Image
from playwright.async_api import async_playwright
from browser_support import BASE, launch
ROOT=Path(__file__).resolve().parents[1]

async def main():
    checks=[]
    async with async_playwright() as playwright:
        browser=await launch(playwright)
        context=await browser.new_context(viewport={'width':390,'height':844},reduced_motion='reduce')
        page=await context.new_page();page.set_default_timeout(60000)
        await page.goto(BASE+'/design',wait_until='networkidle')
        for width in [390,1440]:
            await page.set_viewport_size({'width':width,'height':950 if width>390 else 844})
            for label in ['Box','String','T-Shirt']:
                await page.get_by_role('button',name=label,exact=True).click()
                await page.locator('.studio-3d[data-status=ready]').wait_for()
                canvas=page.locator('.preview-stage .studio-3d-host canvas')
                await canvas.scroll_into_view_if_needed();await page.wait_for_timeout(1000)
                pixels=Image.open(io.BytesIO(await canvas.screenshot())).convert('RGB')
                count=sum(1 for value in pixels.getdata() if max(value)<220)
                assert count>1000,(width,label,'Blank visible bag',count)
                await page.locator('.preview-stage').screenshot(path=str(ROOT/f'evidence/launch-{label.lower()}-{width}.png'))
                if width==390 and label=='Box':
                    await page.screenshot(path=str(ROOT/'evidence/compact-mobile-designer.jpg'),type='jpeg',quality=85,full_page=True)
                checks.append({'width':width,'bag':label,'renderedDarkPixels':count})
        await browser.close()
    (ROOT/'evidence/launch-visual-checks.json').write_text(json.dumps({'status':'passed','checks':checks},indent=2)+'\n')
    print('PASS',len(checks),'settled visible 3D frames')
asyncio.run(main())
