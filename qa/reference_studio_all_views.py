"""Read-only Opened/Folded acceptance journey for every supplied bag family.

Use the existing QA browser environment, with --live only for post-deploy checks.
Local requests are forwarded to the loopback worker with the real Host header.
No inquiry, account, CMS or other application write can leave this browser.
Native canvas captures call the supplied composer and read its pixels in the
same task: a later ResizeObserver cannot clear a paused screenshot buffer.
"""
import argparse
import asyncio
import base64
import hashlib
import io
import json
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlsplit

from PIL import Image, ImageDraw
from playwright.async_api import async_playwright
from browser_support import launch

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "deliverables/handoff/studio-all-bags-20261109"
ORIGIN = "https://kobags.itdks.tech"
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--live", action="store_true")
parser.add_argument("--width", type=int, default=393)
parser.add_argument("--height", type=int, default=852)
parser.add_argument("--skip-images", action="store_true", help="Repeat interaction checks without recapturing the reviewed native models")
parser.add_argument("--tshirt-visual-only", action="store_true", help="Only capture the changed T-shirt side opening in eight white/kraft native views")
args = parser.parse_args()
OUT.mkdir(parents=True, exist_ok=True)
prefix = f"{'live' if args.live else 'local'}-all-views-{args.width}" + ("-tshirt-opening" if args.tshirt_visual_only else "")
checks, errors, writes, captures, geometry, controls, layouts = [], [], [], [], [], [], []
diagnostics = {}


def canvas_background(encoded):
    with Image.open(io.BytesIO(base64.b64decode(encoded))).convert("RGBA") as im:
        rgba = im.getpixel((3, 3))
    # A transparent canvas is composited over the website's white stage.
    rgb = [round(v * rgba[3] / 255 + 255 * (1 - rgba[3] / 255)) for v in rgba[:3]]
    return {"rgba": list(rgba), "overWhite": rgb}


def check(message, valid=True):
    assert valid, message
    checks.append(message)
    print("PASS:", message, flush=True)


async def main():
    async with async_playwright() as playwright:
        browser = await launch(playwright)
        context = await browser.new_context(
            viewport={"width": args.width, "height": args.height},
            is_mobile=args.width <= 760, has_touch=args.width <= 760,
            color_scheme="dark",
            extra_http_headers={"Cache-Control": "no-cache"},
        )
        page = await context.new_page()
        page.set_default_timeout(45000)
        page.set_default_navigation_timeout(120000)
        page.on("pageerror", lambda error: errors.append(str(error)))

        async def route(request):
            url = urlsplit(request.request.url)
            if url.scheme not in ("http", "https"):
                return await request.continue_()
            if request.request.method not in ("GET", "HEAD", "OPTIONS") and not url.path.startswith("/cdn-cgi/challenge-platform/"):
                writes.append({"method": request.request.method, "path": url.path})
                return await request.abort()
            if args.live or url.hostname != "kobags.itdks.tech":
                return await request.continue_()
            response = await request.fetch(url="http://127.0.0.1:8787" + url.path + ("?" + url.query if url.query else ""), headers={**request.request.headers, "Host": url.netloc}, max_redirects=0)
            await request.fulfill(response=response)

        await context.route("**/*", route)

        async def ready():
            await page.frame_locator(".reference-studio-frame").locator("html[data-studio-source]").wait_for(timeout=120000)
            frame = next(frame for frame in page.frames if "/design/viewer" in frame.url)
            await frame.wait_for_function("() => window.__api && document.fonts.status === 'loaded'", timeout=120000)
            return frame

        async def press(locator):
            if args.width <= 760:
                await locator.tap()
            else:
                await locator.click()

        async def set_mode(frame, name):
            await press(frame.locator(f"#bag-view [data-v={name}]"))
            await frame.wait_for_function("v => __api.state.bagView === v", arg=name)
            check(f"{await frame.evaluate('() => __api.state.type')}: {name} reports its selected state", await frame.locator(f"#bag-view [data-v={name}]").get_attribute("aria-pressed") == "true")

        async def set_type(frame, name):
            await press(frame.locator("#tabs [data-tab=bag]"))
            await press(frame.locator(f"#typeSeg [data-v={name}]"))
            await frame.wait_for_function("v => __api.state.type === v", arg=name)

        async def snapshot(frame, label):
            result = await frame.evaluate("""label => {
                const a=__api,g=a.outer.geometry;g.computeBoundingBox();const b=g.boundingBox,p=g.getAttribute('position');
                return {label,type:a.state.type,mode:a.state.bagView,size:a.state.size,
                  dimensions:[a.state.W,a.state.H,a.state.D],finite:Array.from(p.array).every(Number.isFinite),
                  bodyCm:{width:100*(b.max.x-b.min.x),height:100*(b.max.y-b.min.y),depth:100*(b.max.z-b.min.z)},
                  vertices:p.count,contextLost:a.renderer.getContext().isContextLost(),artwork:JSON.stringify(a.design)};
            }""", label)
            geometry.append({k: v for k, v in result.items() if k != "artwork"})
            assert result["finite"] and not result["contextLost"] and result["vertices"] > 100, result
            return result

        async def capture(frame, name, view="34"):
            if args.skip_images:
                return
            data = await frame.evaluate("""view => {
                __api.setView(view==='near-side'?'34':view,false);
                if(view==='near-side'){
                    const p=__api.camera.position,t=__api.controls.target,x=p.x-t.x,z=p.z-t.z,a=.4;
                    p.x=t.x+x*Math.cos(a)+z*Math.sin(a);p.z=t.z+z*Math.cos(a)-x*Math.sin(a);
                }
                __api.controls.update();__api.render();
                return __api.renderer.domElement.toDataURL('image/png').split(',')[1];
            }""", view)
            dest = OUT / f"{prefix}-{name}.png"
            dest.write_bytes(base64.b64decode(data))
            with Image.open(dest) as im:
                captures.append({"file": str(dest.relative_to(ROOT)), "sha256": hashlib.sha256(dest.read_bytes()).hexdigest(), "width": im.width, "height": im.height, "view": view})

        async def assert_controls(frame, name):
            group = frame.locator("#bag-view")
            assert await group.is_visible()
            bounds = await group.evaluate("""e=>[...e.querySelectorAll('button')].map(b=>{const r=b.getBoundingClientRect();return {label:b.textContent.trim(),aria:b.getAttribute('aria-label'),x:r.x,right:r.right,y:r.y,bottom:r.bottom,width:r.width,height:r.height}})""")
            controls.append({"type": name, "buttons": bounds})
            height = await frame.evaluate("() => innerHeight")
            width = await frame.evaluate("() => innerWidth")
            check(f"{name}: both presentation buttons are visible, labelled and touch-sized", len(bounds) == 2 and all(b["aria"] and b["width"] >= 40 and b["height"] >= 40 and b["x"] >= 0 and b["right"] <= width + 1 and b["y"] >= 0 and b["bottom"] <= height + 1 for b in bounds))
            check(f"{name}: no horizontal page/viewer overflow", not await page.evaluate("() => document.documentElement.scrollWidth>innerWidth") and not await frame.evaluate("() => document.documentElement.scrollWidth>innerWidth"))

        await page.goto(ORIGIN + "/design", wait_until="domcontentloaded")
        frame = await ready()
        check("Fresh session starts in Opened mode", await frame.evaluate("() => __api.state.bagView") == "open")
        check("Viewer pins light theme and a white panel under a dark system preference", await frame.evaluate("""() => matchMedia('(prefers-color-scheme: dark)').matches && document.documentElement.dataset.theme==='light' && getComputedStyle(document.getElementById('panel')).backgroundColor==='rgb(255, 255, 255)'"""))
        if not args.skip_images:
            await page.screenshot(path=str(OUT / f"{prefix}-native-initial.png"), timeout=120000)
        await frame.evaluate("() => __api.renderer.setAnimationLoop(null)")
        rendered = await frame.evaluate("() => {__api.render();return __api.renderer.domElement.toDataURL('image/png').split(',')[1]}")
        diagnostics["renderedBackground"] = canvas_background(rendered)
        check("Actual rendered background is white after tone mapping and compositing", min(diagnostics["renderedBackground"]["overWhite"]) >= 253)

        if args.tshirt_visual_only:
            await set_type(frame, "tshirt")
            await press(frame.locator("#sizeSeg [data-v=S]"))
            await assert_controls(frame, "T-shirt visual review")
            artwork = await frame.evaluate("() => JSON.stringify(__api.design)")
            for colour, views in [("#efeee9", ["34", "side", "top"]), ("#bd9665", ["near-side"])]:
                await press(frame.locator(f'#bagSw [data-v="{colour}"]'))
                colour_name = "white" if colour == "#efeee9" else "kraft"
                for presentation in ("open", "flat"):
                    await set_mode(frame, presentation)
                    await snapshot(frame, f"T-shirt {colour_name} {presentation}")
                    for view in views:
                        await capture(frame, f"tshirt-{colour_name}-{presentation}-{view}", view)
            check("T-shirt opening review retains both sides' artwork", await frame.evaluate("() => JSON.stringify(__api.design)") == artwork)
            check("No JavaScript errors or application writes occurred", not errors and not writes)
            await context.close()
            await browser.close()
            return

        for family in ("box", "handle", "dcut", "tshirt", "bottle", "string"):
            expected_mode = await frame.evaluate("() => __api.state.bagView")
            await set_type(frame, family)
            check(f"{family}: bag selection retains the selected presentation", await frame.evaluate("() => __api.state.bagView") == expected_mode)
            await assert_controls(frame, family)
            # A mid-sized bag exercises each construction; the smallest D-cut
            # without a gusset is checked separately below.
            if await frame.locator("#sizeSeg [data-v=M]").count():
                await press(frame.locator("#sizeSeg [data-v=M]"))
            await set_mode(frame, "open")
            opened = await snapshot(frame, family + " opened")
            if args.width > 760 or family in ("box", "tshirt", "string"):
                await capture(frame, family + "-opened")
            camera_before = await frame.evaluate("() => JSON.stringify({position:__api.camera.position.toArray(),target:__api.controls.target.toArray()})")
            await set_mode(frame, "flat")
            check(f"{family}: switching presentation preserves the current camera", await frame.evaluate("() => JSON.stringify({position:__api.camera.position.toArray(),target:__api.controls.target.toArray()})") == camera_before)
            folded = await snapshot(frame, family + " folded")
            check(f"{family}: Folded has measurably less depth while dimensions and artwork remain unchanged", folded["bodyCm"]["depth"] < opened["bodyCm"]["depth"] * .7 and folded["dimensions"] == opened["dimensions"] and folded["artwork"] == opened["artwork"])
            if args.width > 760 or family in ("box", "tshirt", "string"):
                await capture(frame, family + "-folded")
            await set_mode(frame, "open")
            again = await snapshot(frame, family + " reopened")
            check(f"{family}: reopening reproduces the open mesh and keeps both sides intact", abs(again["bodyCm"]["depth"] - opened["bodyCm"]["depth"]) < .00001 and again["artwork"] == opened["artwork"])
            await press(frame.locator("#edit-back"))
            selected = await frame.locator("#artwork-picker").input_value()
            await set_mode(frame, "flat")
            check(f"{family}: Folded is usable while editing the back without changing its selection", await frame.locator("[data-pane=design]").is_visible() and await frame.evaluate("() => __api.getSide()") == "back" and await frame.locator("#artwork-picker").input_value() == selected and await frame.evaluate("() => JSON.stringify(__api.design)") == opened["artwork"])
            await press(frame.locator("#edit-front"))
            check(f"{family}: Front keeps the Folded view", await frame.evaluate("() => __api.state.bagView") == "flat")
            await press(frame.locator("#tabs [data-tab=bag]"))
            choices = await frame.locator("#sizeSeg button").count()
            if choices > 1:
                await press(frame.locator("#sizeSeg button").last)
                check(f"{family}: size change retains Folded and both artwork lists", await frame.evaluate("() => __api.state.bagView") == "flat" and await frame.evaluate("() => __api.design.front.length > 0 && __api.design.back.length > 0"))

        await set_type(frame, "dcut")
        await press(frame.locator("#sizeSeg [data-v=XS]"))
        await set_mode(frame, "open")
        no_gusset_open = await snapshot(frame, "D-cut XS without gusset / opened")
        await set_mode(frame, "flat")
        no_gusset_flat = await snapshot(frame, "D-cut XS without gusset / folded")
        check("D-cut without gusset supports both views without inventing a gusset dimension", no_gusset_open["dimensions"][2] == no_gusset_flat["dimensions"][2] == 0 and no_gusset_flat["bodyCm"]["depth"] < no_gusset_open["bodyCm"]["depth"])

        # Continue from a non-vest bag to exercise the newly generalized path.
        await set_type(frame, "box")
        await press(frame.locator("#edit-back"))
        before_modal = await frame.evaluate("() => JSON.stringify(__api.design)")
        if args.width <= 760:
            await press(frame.locator("#expand-artwork-canvas"))
            await frame.locator("#artwork-canvas-dialog").wait_for(state="visible")
            await press(frame.locator("#edit-front"))
            await press(frame.locator("#edit-back"))
            await press(frame.locator("#close-artwork-canvas"))
            check("Expanded mobile canvas preserves both sides and the Folded selection", await frame.evaluate("() => JSON.stringify(__api.design)") == before_modal and await frame.evaluate("() => __api.state.bagView") == "flat")
            await assert_controls(frame, "box after expanded canvas")
            for width, height in [(320, 640), (320, 568), (844, 390), (args.width, args.height)]:
                await page.set_viewport_size({"width": width, "height": height})
                await frame.wait_for_function("v => innerWidth === v", arg=width)
                await assert_controls(frame, f"layout {width}×{height}")
                for tab in ("bag", "design"):
                    await press(frame.locator(f"#tabs [data-tab={tab}]"))
                    await set_mode(frame, "open")
                    await set_mode(frame, "flat")
                    layout = await frame.evaluate("""tab=>{const rect=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,bottom:r.bottom}};return {tab,viewport:{width:innerWidth,height:innerHeight},stage:rect(document.getElementById('stage')),panel:rect(document.getElementById('panel')),panes:rect(document.getElementById('panes')),mode:__api.state.bagView}}""", tab)
                    layouts.append({"phone": {"width": width, "height": height}, **layout})
                    check(f"{width}×{height} {tab}: controls remain operable and scroll pane retains usable space", layout["panes"]["height"] >= 80 and layout["mode"] == "flat")
                if width <= 760:
                    add = frame.locator("#studio-add-toggle")
                    await press(add)
                    check(f"{width}×{height}: Add artwork remains reachable", await frame.locator("#addText").is_visible() and await frame.locator("#addQr").is_visible())
                    await press(add)
                if not args.skip_images and (width, height) in [(320, 568), (844, 390)]:
                    await page.screenshot(path=str(OUT / f"{prefix}-layout-{width}x{height}.png"), timeout=120000)
            await press(frame.locator("#edit-back"))
        # Keyboard activation exercises the same visible buttons as touch.
        await frame.locator("#bag-view [data-v=open]").focus()
        await page.keyboard.press("Enter")
        check("Opened can be selected with the keyboard", await frame.evaluate("() => __api.state.bagView") == "open")
        await frame.locator("#bag-view [data-v=flat]").focus()
        await page.keyboard.press("Space")
        check("Folded can be selected with the keyboard", await frame.evaluate("() => __api.state.bagView") == "flat")
        await page.keyboard.press("ArrowLeft")
        check("Arrow keys change presentation and move focus", await frame.evaluate("() => __api.state.bagView") == "open" and await frame.locator("#bag-view [data-v=open]").evaluate("e=>e===document.activeElement"))
        await page.keyboard.press("End")
        check("End selects and focuses Folded", await frame.evaluate("() => __api.state.bagView") == "flat" and await frame.locator("#bag-view [data-v=flat]").evaluate("e=>e===document.activeElement"))
        before_reload = await snapshot(frame, "Box folded before reload")
        await page.wait_for_timeout(900)
        saved = await frame.evaluate("() => JSON.parse(localStorage.getItem('kobags-reference-studio-v1'))")
        check("Saved draft records the general bag presentation", saved["state"]["bagView"] == "flat" and saved["state"]["type"] == "box")
        await page.reload(wait_until="domcontentloaded")
        frame = await ready()
        if not args.skip_images:
            await page.screenshot(path=str(OUT / f"{prefix}-native-folded-reload.png"), timeout=120000)
        await frame.evaluate("() => __api.renderer.setAnimationLoop(null)")
        reloaded = await snapshot(frame, "Box folded after reload")
        check("Reload restores Folded on a non-T-shirt bag and its actual geometry", reloaded["type"] == "box" and reloaded["mode"] == "flat" and abs(reloaded["bodyCm"]["depth"] - before_reload["bodyCm"]["depth"]) < .00001)
        # Restoring a draft deliberately allocates new item IDs and normalizes
        # optional text/data to empty strings. These are equivalent artwork.
        normalize = lambda items: [{"text": "", "data": "", **{k: round(v, 6) if isinstance(v, float) else v for k, v in item.items() if k != "id"}} for item in items]
        restored_design = await frame.evaluate("() => __api.design")
        restored_side = await frame.evaluate("() => __api.getSide()")
        for artwork_side in ("front", "back"):
            if normalize(restored_design[artwork_side]) != normalize(saved["design"][artwork_side]):
                diagnostics["restore-" + artwork_side] = {"expected": normalize(saved["design"][artwork_side]), "actual": normalize(restored_design[artwork_side])}
        diagnostics["restoredSide"] = restored_side
        check("Reload preserves front/back artwork and selected back side", all(normalize(restored_design[s]) == normalize(saved["design"][s]) for s in ("front", "back")) and restored_side == "back")

        # Seed only this disposable browser's essential draft to exercise the
        # migration, including old non-vest drafts carrying a stale vest value.
        for family, canonical, expected in [("tshirt", None, "flat"), ("box", None, "open"), ("tshirt", "invalid", "open")]:
            fixture = json.loads(json.dumps(saved))
            fixture["state"].update({"type": family, "size": "S", "vestView": "flat"})
            if canonical is None:
                fixture["state"].pop("bagView", None)
            else:
                fixture["state"]["bagView"] = canonical
            await frame.evaluate("s=>localStorage.setItem('kobags-reference-studio-v1',JSON.stringify(s))", fixture)
            await page.reload(wait_until="domcontentloaded")
            frame = await ready()
            await frame.evaluate("() => __api.renderer.setAnimationLoop(null)")
            check(f"Legacy {family} draft with bagView={canonical} restores {expected}", await frame.evaluate("() => __api.state.bagView") == expected)
            assert await frame.locator(f"#bag-view [data-v={expected}]").get_attribute("aria-pressed") == "true"
        await frame.evaluate("s=>localStorage.setItem('kobags-reference-studio-v1',JSON.stringify(s))", saved)
        await page.reload(wait_until="domcontentloaded")
        frame = await ready()
        await frame.evaluate("() => __api.renderer.setAnimationLoop(null)")

        await page.wait_for_function("() => {const b=document.querySelector('.reference-studio-bar button');return b&&!b.disabled&&b.textContent.includes('Continue to quote')}", timeout=60000)
        await press(page.locator(".reference-studio-bar button"))
        await page.wait_for_url("**/quote", timeout=120000)
        quote = await page.evaluate("() => JSON.parse(localStorage.getItem('kobags-design-v1'))")
        check("Non-T-shirt quote handoff carries Folded preview and both native images", "Preview: Folded / flat." in quote["note"] and all(quote["referenceStudio"][s].startswith("data:image/") for s in ("front", "back")) and quote["customDimensions"] == " × ".join(f"{n:g}" for n in reloaded["dimensions"]) + " cm")
        check("No JavaScript errors or application writes occurred", not errors and not writes)
        await context.close()
        await browser.close()


result = {"status": "failed"}
try:
    asyncio.run(main())
    result["status"] = "pass"
except BaseException as error:
    result["error"] = str(error)
    raise
finally:
    if captures:
        tiles = []
        for capture in captures:
            im = Image.open(ROOT / capture["file"]).convert("RGB")
            im.thumbnail((480, 330))
            tile = Image.new("RGB", (480, 365), "white")
            tile.paste(im, ((480-im.width)//2, 28+(330-im.height)//2))
            ImageDraw.Draw(tile).text((10, 8), Path(capture["file"]).stem.replace(prefix+"-", ""), fill="black")
            tiles.append(tile)
        sheet = Image.new("RGB", (960, 365*((len(tiles)+1)//2)), "white")
        for i, tile in enumerate(tiles):
            sheet.paste(tile, ((i % 2)*480, (i//2)*365))
        sheet.save(OUT / f"{prefix}-contact-sheet.jpg", quality=92)
    result.update({"timestampUTC": datetime.now(timezone.utc).isoformat(), "mode": "live" if args.live else "local", "viewport": {"width": args.width, "height": args.height}, "systemColorScheme": "dark", "tshirtVisualOnly": args.tshirt_visual_only, "checks": checks, "errors": errors, "blockedApplicationWrites": writes, "submittedInquiries": 0, "controls": controls, "geometry": geometry, "layouts": layouts, "diagnostics": diagnostics, "captures": captures, "rendering": "Chromium software GPU. Initial/reloaded page screenshots use the normal live animation loop; model captures force the original composer and read canvas pixels synchronously. Not a physical-phone frame-rate test."})
    destination = OUT / f"{prefix}.json"
    destination.write_text(json.dumps(result, indent=2) + "\n")
    print(json.dumps({"status": result["status"], "checks": len(checks), "evidence": str(destination)}), flush=True)
