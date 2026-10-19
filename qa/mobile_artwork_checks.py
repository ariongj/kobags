"""Touch acceptance for the compact mobile logo / QR editor; localhost only."""
import asyncio, base64, io, json, sys, traceback
from pathlib import Path
from PIL import Image, ImageDraw
from playwright.async_api import async_playwright
from browser_support import BASE, launch, artwork_point
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'evidence/mobile-artwork-20261019'
report = {'checks': [], 'errors': [], 'layouts': []}

def record(message):
    report['checks'].append(message)
    print(message, flush=True)

async def main():
    OUT.mkdir(exist_ok=True)
    async with async_playwright() as p:
        browser = await launch(p)
        context = await browser.new_context(viewport={'width': 390, 'height': 844}, is_mobile=True, has_touch=True, reduced_motion='reduce')
        page = await context.new_page()
        page.set_default_timeout(45000)
        page.on('pageerror', lambda e: report['errors'].append(str(e)))
        async def draft():
            return await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")
        async def ready():
            await page.locator('.preview-stage .studio-3d[data-status=ready]').wait_for()
        async def top():
            await page.evaluate("document.activeElement?.blur();window.scrollTo({top:0,behavior:'instant'})")
        async def touch_drag(point, dx, dy=0, pause=False):
            cdp = await context.new_cdp_session(page)
            await cdp.send('Input.dispatchTouchEvent', {'type': 'touchStart', 'touchPoints': [point]})
            for step in range(1, 7):
                await cdp.send('Input.dispatchTouchEvent', {'type': 'touchMove', 'touchPoints': [{'x': point['x'] + dx * step / 6, 'y': point['y'] + dy * step / 6}]})
                if pause and step == 3:
                    await page.wait_for_timeout(950)
            await cdp.send('Input.dispatchTouchEvent', {'type': 'touchEnd', 'touchPoints': []})
            await cdp.detach()
        async def point3d(layer):
            await top()
            await page.wait_for_function("layer=>JSON.parse(document.querySelector('.preview-stage .studio-3d-host').dataset.artworkTargets).some(t=>t.layer===layer&&t.side==='front'&&t.visible)", arg=layer)
            host = page.locator('.preview-stage .studio-3d-host')
            target = next(t for t in json.loads(await host.get_attribute('data-artwork-targets')) if t['layer'] == layer and t['side'] == 'front')
            box = await host.locator('canvas').bounding_box()
            return {'x': box['x'] + target['x'] * box['width'], 'y': box['y'] + target['y'] * box['height']}

        await page.goto(BASE + '/design', wait_until='networkidle')
        await ready()
        assert (await draft())['color'] == 'Natural'
        await page.get_by_role('tab', name='02 Your design', exact=True).tap()
        add = page.get_by_role('group', name='Add artwork', exact=True)
        im = Image.new('RGBA', (240, 240), 'white')
        pen = ImageDraw.Draw(im); pen.ellipse((30, 30, 210, 210), fill='#123442'); pen.ellipse((90, 90, 150, 150), fill='white')
        data = io.BytesIO(); im.save(data, format='PNG')
        await add.get_by_role('button', name='Logo', exact=True).tap()
        await page.locator('input[type=file]').set_input_files({'name': 'client-brand-mark-with-a-long-filename.png', 'mimeType': 'image/png', 'buffer': data.getvalue()})
        await page.get_by_role('button', name='Restore original', exact=True).wait_for()
        await ready()
        logo = (await draft())['logo']
        pixels = await page.evaluate("async src=>{const i=new Image();i.src=src;await i.decode();const c=document.createElement('canvas');c.width=i.width;c.height=i.height;const x=c.getContext('2d');x.drawImage(i,0,0);return [x.getImageData(0,0,1,1).data[3],x.getImageData(i.width/2,i.height/2,1,1).data[3]]}", logo)
        assert pixels == [0, 255], pixels
        await add.get_by_role('button', name='QR', exact=True).tap()
        dialog = page.get_by_role('dialog')
        await dialog.get_by_label('Website or page link').fill('https://example.com/mobile')
        await dialog.get_by_role('button', name='Add QR code', exact=True).tap()
        await dialog.wait_for(state='hidden'); await ready()
        qr = next(e for e in (await draft())['elements'] if e['kind'] == 'qr')
        qlayer = 'element:' + qr['id']
        picker = page.get_by_label('Selected element', exact=True)
        await picker.select_option('logo')
        before = await draft()
        await page.get_by_role('button', name='Make selected element larger', exact=True).tap()
        assert (await draft())['scale'] == before['scale'] + 2
        assert (await draft())['elements'] == before['elements']
        await page.get_by_role('button', name='Undo change', exact=True).tap()
        assert (await draft())['scale'] == before['scale']
        await picker.select_option(qlayer)
        await page.get_by_role('button', name='Make selected element larger', exact=True).tap()
        assert next(e for e in (await draft())['elements'] if e['id'] == qr['id'])['scale'] == qr['scale'] + 2
        assert (await draft())['scale'] == before['scale']
        record('Natural default, automatic logo cleanup, independent logo/QR quick sizing and undo')

        # Select directly on the bag, then drag each element without orbiting it.
        host = page.locator('.preview-stage .studio-3d-host')
        for layer in ['logo', qlayer]:
            point = await point3d(layer)
            print({'touchLayer':layer,'point':point,'hit':await page.evaluate('(p)=>{const e=document.elementFromPoint(p.x,p.y);return {tag:e?.tagName,cls:e?.className}}',point)},flush=True)
            await page.touchscreen.tap(point['x'], point['y'])
            await page.wait_for_timeout(200)
            print({'selected':await picker.input_value(),'sceneSelection':await host.get_attribute('data-selection')},flush=True)
            await page.screenshot(path=str(OUT/'touch-selection.jpg'),full_page=True,quality=85)
            await page.wait_for_function("layer=>document.querySelector('.mobile-artwork-tools select').value===layer", arg=layer)
            point = await point3d(layer)
            before = await draft(); angle = float(await host.get_attribute('data-angle'))
            await touch_drag(point, 12 if layer == 'logo' else -12, -4)
            await ready(); after = await draft()
            if layer == 'logo':
                assert after['x'] != before['x'] and after['elements'] == before['elements']
            else:
                assert after['elements'][0]['x'] != before['elements'][0]['x'] and after['x'] == before['x']
            assert abs(float(await host.get_attribute('data-angle')) - angle) < .01
        before = await draft()
        await page.get_by_role('button', name='Make selected element larger', exact=True).tap()
        assert (await draft())['elements'][0]['scale'] == before['elements'][0]['scale'] + 2, 'First resize tap after a drag must work'
        record('Direct touch selection and independent logo/QR dragging in 3D; camera stays still')

        # The quick controls stay put while detailed settings scroll underneath.
        await top()
        before_box = await page.locator('.mobile-artwork-tools').bounding_box()
        panel = page.locator('.editor-body[data-state=active]')
        await panel.evaluate('(e)=>e.scrollTop=e.scrollHeight')
        after_box = await page.locator('.mobile-artwork-tools').bounding_box()
        assert abs(before_box['y'] - after_box['y']) < 1
        await picker.select_option('logo')
        slider = page.locator('.artwork-transform [data-slot=slider-thumb]')
        await slider.scroll_into_view_if_needed()
        box = await slider.bounding_box(); before = await draft()
        await touch_drag({'x': box['x'] + box['width']/2, 'y': box['y'] + box['height']/2}, 35, pause=True)
        assert (await draft())['scale'] != before['scale']
        await page.get_by_role('button', name='Undo change', exact=True).tap()
        assert (await draft())['scale'] == before['scale'], 'One paused resize must be one undo gesture'
        await slider.focus(); await page.keyboard.press('End')
        assert (await draft())['scale'] == 55
        assert await page.get_by_role('button', name='Make selected element larger', exact=True).is_disabled()
        await page.keyboard.press('Home')
        assert (await draft())['scale'] == 10
        assert await page.get_by_role('button', name='Make selected element smaller', exact=True).is_disabled()
        await picker.select_option(qlayer)
        record('Fixed selection/size row; touch slider with a pause undoes once; size bounds respected')

        for width, height in [(320,568),(360,740),(390,844),(430,932),(768,1024),(844,390),(1440,900)]:
            await page.set_viewport_size({'width':width,'height':height}); await top()
            await page.wait_for_timeout(150)
            assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth'), width
            if width <= 800:
                row = page.locator('.mobile-artwork-tools')
                assert await row.is_visible()
                targets = await row.locator('select,button').evaluate_all('(els)=>els.map(e=>({w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height}))')
                assert all(t['w'] >= 44 and t['h'] >= 44 for t in targets), (width,targets)
                if width == 390:
                    quote = await page.locator('.studio-quote .button').bounding_box()
                    assert quote['y'] + quote['height'] <= 844
                await page.locator('.editor-body[data-state=active]').evaluate('(e)=>e.scrollTop=0')
                await page.screenshot(path=str(OUT/f'controls-{width}.jpg'), full_page=True, quality=85)
            report['layouts'].append({'width':width,'height':height,'overflow':False})
        record('Compact 320–1440px layouts, 44px quick controls and visible phone quote action')
        saved = await draft()
        await context.close()

        # Previously, an extra QR alone could not be dragged in photo/fallback.
        only = {**saved, 'logo':'', 'text':'', 'backLogo':'', 'backText':'', 'elements':[next(e for e in saved['elements'] if e['kind']=='qr')]}
        context = await browser.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,reduced_motion='reduce')
        await context.add_init_script("(()=>{const old=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(k,...a){return k.includes('webgl')?null:old.call(this,k,...a)}})()")
        await context.add_init_script('localStorage.setItem("kobags-design-v1",'+json.dumps(json.dumps(only))+')')
        page = await context.new_page(); page.on('pageerror', lambda e: report['errors'].append(str(e)))
        await page.goto(BASE+'/design',wait_until='networkidle')
        await page.get_by_role('tab').nth(1).tap()
        for mode in ['3D view', 'Photo + artwork']:
            await page.get_by_role('button',name=mode,exact=True).tap()
            canvas=page.locator('.preview-stage canvas.bag-canvas')
            await page.wait_for_function("document.querySelector('.preview-stage canvas.bag-canvas')?.dataset.ready==='true'")
            point=await artwork_point(canvas,qlayer); before=await draft()
            await touch_drag(point,10,-2)
            after=await draft(); assert after['elements'][0]['x']!=before['elements'][0]['x'], mode
            assert await page.get_by_label('Selected element',exact=True).input_value()==qlayer
        await page.get_by_role('button',name='Make selected element larger',exact=True).tap()
        await page.locator('.studio-resources > summary').tap()
        async with page.expect_download() as download:
            await page.get_by_role('button',name='Download both sides + specifications',exact=True).tap()
        await (await download.value).save_as(str(OUT/'qr-only-export.png'))
        assert Image.open(OUT/'qr-only-export.png').size==(2000,1400)
        record('QR-only touch dragging works in photo and unavailable-WebGL previews; export succeeds')

        await page.goto(BASE+'/sq/design',wait_until='networkidle'); await page.get_by_role('tab').nth(1).tap()
        await page.get_by_label('Elementi i zgjedhur',exact=True).select_option(qlayer)
        before=await draft(); await page.get_by_role('button',name='Zmadho elementin e zgjedhur',exact=True).tap()
        assert (await draft())['elements'][0]['scale'] == before['elements'][0]['scale']+2
        await page.add_script_tag(path=str(ROOT/'node_modules/axe-core/axe.min.js'))
        violations=await page.evaluate("async()=> (await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))")
        assert not violations, violations; report['accessibility']=violations
        await page.locator('.artwork-add button').last.tap()
        dialog=page.get_by_role('dialog'); await dialog.wait_for()
        await page.set_viewport_size({'width':390,'height':420})
        await dialog.get_by_label('Lidhja e faqes').fill('example.com/contact')
        await dialog.get_by_role('button',name='Shto kodin QR',exact=True).tap(); await dialog.wait_for(state='hidden')
        assert len((await draft())['elements'])==2
        await page.set_viewport_size({'width':390,'height':844}); await top()
        await page.screenshot(path=str(OUT/'albanian.jpg'),full_page=True,quality=85)
        record('Albanian selection/resizing, accessible controls and QR entry with a short viewport')
        assert not report['errors'], report['errors']
        await browser.close()

try:
    asyncio.run(main()); report['status']='passed'
except Exception as e:
    report.update(status='failed',failure=str(e),traceback=traceback.format_exc())
    raise
finally:
    OUT.mkdir(exist_ok=True); (OUT/'checks.json').write_text(json.dumps(report,indent=2))
