"""Read-only client review of the supplied studio, native renders and phone tools.

Run through the project's browser environment, e.g.:
  /tmp/kobags-local-dev-qa.sh qa/reference_studio_client.py --width 393
  /tmp/kobags-local-dev-qa.sh qa/reference_studio_client.py --live --width 1440

The local mode forwards the public preview host to port 8787. Browser contexts
start with empty storage. No customer request, account or CMS write is allowed.
Native renderer screenshots are saved for human comparison with the real bags;
finite geometry and a successful screenshot do not establish photorealism.
"""

import argparse
import asyncio
import hashlib
import json
import time
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlsplit

from PIL import Image, ImageDraw
from playwright.async_api import async_playwright

from browser_support import launch


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "deliverables/handoff/studio-client-20261109"
ORIGIN = "https://kobags.itdks.tech"
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--live", action="store_true")
parser.add_argument("--width", type=int, default=393)
parser.add_argument("--height", type=int, default=852)
parser.add_argument("--visual-only", action="store_true", help="Capture native bag views without the editing journey")
parser.add_argument("--quick", action="store_true", help="Initial and Opened/Folded three-quarter renders plus the full UI journey; skip repeated geometry views")
args = parser.parse_args()
OUT.mkdir(parents=True, exist_ok=True)
mode = "live" if args.live else "local"
prefix = f"{mode}-client-{args.width}" + ("-quick" if args.quick else "")
checks, errors, blocked_writes, screenshots, geometry, metrics = [], [], [], [], [], {}


def check(message, condition=True):
    assert condition, message
    checks.append(message)
    print("PASS:", message, flush=True)


async def main():
    async with async_playwright() as playwright:
        browser = await launch(playwright)
        context = await browser.new_context(
            viewport={"width": args.width, "height": args.height},
            is_mobile=args.width <= 760,
            has_touch=args.width <= 760,
            extra_http_headers={"Cache-Control": "no-cache"},
        )
        page = await context.new_page()
        page.set_default_timeout(30000)
        page.set_default_navigation_timeout(120000)
        page.on("pageerror", lambda error: errors.append(str(error)))

        async def route(request):
            url = urlsplit(request.request.url)
            if url.scheme not in ("http", "https"):
                return await request.continue_()
            if request.request.method not in ("GET", "HEAD", "OPTIONS") and not url.path.startswith("/cdn-cgi/challenge-platform/"):
                blocked_writes.append({"method": request.request.method, "path": url.path})
                return await request.abort()
            if args.live or url.hostname != "kobags.itdks.tech":
                return await request.continue_()
            response = await request.fetch(
                url="http://127.0.0.1:8787" + url.path + ("?" + url.query if url.query else ""),
                headers={**request.request.headers, "Host": url.netloc}, max_redirects=0,
            )
            await request.fulfill(response=response)

        await context.route("**/*", route)

        async def ready():
            await page.frame_locator(".reference-studio-frame").locator("html[data-studio-source]").wait_for(timeout=120000)
            frame = next(frame for frame in page.frames if "/design/viewer" in frame.url)
            await frame.wait_for_function("() => window.__api && document.fonts.status === 'loaded'", timeout=120000)
            return frame

        async def capture(name, frame, view=None):
            # Force the original composer, shadows and material shaders. Only the
            # continuous animation loop is paused to keep software-GPU QA usable.
            await frame.evaluate("view => { if(view) __api.setView(view, false); __api.controls.update(); __api.render(); }", view)
            destination = OUT / f"{prefix}-{name}.png"
            await page.screenshot(path=str(destination), full_page=True, timeout=120000)
            pixels = Image.open(destination).convert("RGB")
            screenshots.append({"file": str(destination.relative_to(ROOT)), "sha256": hashlib.sha256(destination.read_bytes()).hexdigest(), "width": pixels.width, "height": pixels.height})

        async def assert_width(frame):
            check("Website and viewer have no horizontal overflow", not await page.evaluate("() => document.documentElement.scrollWidth > innerWidth") and not await frame.evaluate("() => document.documentElement.scrollWidth > innerWidth"))

        async def bag_type(frame, name):
            await frame.locator("#tabs [data-tab=bag]").click()
            await frame.locator(f"#typeSeg [data-v={name}]").click()
            await frame.wait_for_function("name => __api.state.type === name", arg=name)

        async def read_geometry(frame, label):
            result = await frame.evaluate("""label => {
                const body=__api.outer.geometry, p=body.getAttribute('position');
                body.computeBoundingBox();const b=body.boundingBox;
                const finite=Array.from(p.array).every(Number.isFinite);
                const size=b.max.clone().sub(b.min).multiplyScalar(100);
                const slice=height=>{let min=Infinity,max=-Infinity,n=0;for(let i=0;i<p.count;i++)if(Math.abs(p.getY(i)*100-height)<__api.state.H*.025){min=Math.min(min,p.getZ(i)*100);max=Math.max(max,p.getZ(i)*100);n++;}return {heightCm:height,depthCm:n?max-min:null,vertices:n};};
                return {label,finite,vertices:p.count,sizeCm:{width:size.x,height:size.y,depth:size.z},configured:{...__api.state},slices:[.15,.5,.72,.9].map(n=>slice(n*__api.state.H))};
            }""", label)
            geometry.append(result)
            assert result["finite"] and result["vertices"] > 100
            assert all(0 < result["sizeCm"][axis] < 200 for axis in ("width", "height", "depth")), result
            return result

        async def vest_mode(frame, mode):
            await frame.locator(f"#bag-view button[data-v={mode}]").click()
            await frame.wait_for_function("mode => __api.state.bagView === mode", arg=mode)
            assert await frame.locator(f"#bag-view button[data-v={mode}]").get_attribute("aria-pressed") == "true"

        async def drag_item(frame, item_id, dx=-16, dy=-8):
            canvas = frame.locator("#editor")
            await canvas.scroll_into_view_if_needed()
            position = await canvas.evaluate("""(canvas,id)=>{const item=__api.design[__api.getSide()].find(item=>item.id===id),r=canvas.getBoundingClientRect();return {x:r.left+item.x/__api.state.W*r.width,y:r.top+item.y/__api.state.H*r.height}}""", item_id)
            bounds = await page.locator(".reference-studio-frame").bounding_box()
            x, y = position["x"] + bounds["x"], position["y"] + bounds["y"]
            if args.width <= 760:
                session = await context.new_cdp_session(page)
                await session.send("Input.dispatchTouchEvent", {"type": "touchStart", "touchPoints": [{"x": x, "y": y, "id": 1}]})
                for step in range(1, 5):
                    await session.send("Input.dispatchTouchEvent", {"type": "touchMove", "touchPoints": [{"x": x + dx * step / 4, "y": y + dy * step / 4, "id": 1}]})
                await session.send("Input.dispatchTouchEvent", {"type": "touchEnd", "touchPoints": []})
                await session.detach()
            else:
                await page.mouse.move(x, y)
                await page.mouse.down()
                await page.mouse.move(x + dx, y + dy, steps=4)
                await page.mouse.up()

        started = time.monotonic()
        await page.goto(ORIGIN + "/design", wait_until="domcontentloaded")
        frame = await ready()
        metrics["freshReadySeconds"] = round(time.monotonic() - started, 3)
        await capture("initial", frame)
        await frame.evaluate("() => __api.renderer.setAnimationLoop(null)")
        check("Fresh studio starts and its original native renderer produces the first frame")
        await assert_width(frame)

        # A real supplied T-shirt sample puts its approved artwork lower on the
        # front; it is a better comparison than rescaling a Box sample onto it.
        index = await frame.evaluate("() => __api.SAMPLES.findIndex(s => s.type==='tshirt' && s.name.includes('navy'))")
        assert index >= 0
        await frame.locator("#tabs [data-tab=samples]").click()
        await frame.locator(f"#samples .sample[data-i='{index}']").click()
        await frame.locator("#tabs [data-tab=bag]").click()
        check("New T-shirt product starts in Opened view", await frame.evaluate("() => __api.state.bagView") == "open")
        artwork_before_pose = await frame.evaluate("() => JSON.stringify(__api.design)")
        opened = await read_geometry(frame, "T-shirt supplied navy sample / opened")
        opened_views = [("34", "three-quarter")] if args.quick else [("34", "three-quarter"), ("front", "front"), ("back", "back"), ("side", "side"), ("top", "inside")]
        for view, name in opened_views:
            await capture("tshirt-opened-" + name, frame, view)
        await vest_mode(frame, "flat")
        folded = await read_geometry(frame, "T-shirt supplied navy sample / folded")
        check("Folded view is visibly shallower than Opened in the actual mesh", opened["sizeCm"]["depth"] > folded["sizeCm"]["depth"] + 1)
        check("Changing T-shirt view preserves both sides of the artwork", await frame.evaluate("() => JSON.stringify(__api.design)") == artwork_before_pose)
        folded_views = [("34", "three-quarter")] if args.quick else [("34", "three-quarter"), ("side", "side"), ("top", "inside")]
        for view, name in folded_views:
            await capture("tshirt-folded-" + name, frame, view)
        await vest_mode(frame, "open")
        check("Returning to Opened preserves artwork", await frame.evaluate("() => JSON.stringify(__api.design)") == artwork_before_pose)
        if args.width <= 760:
            controls = frame.locator("#bag-view")
            await controls.scroll_into_view_if_needed()
            metrics["tshirtViewControls"] = await controls.evaluate("""element=>[...element.querySelectorAll('button')].map(e=>{const r=e.getBoundingClientRect();return {label:e.textContent.trim(),width:r.width,height:r.height,left:r.left,right:r.right}})""")
            check("Both T-shirt view controls fit the mobile screen", await controls.is_visible() and len(metrics["tshirtViewControls"]) == 2 and all(item["left"] >= 0 and item["right"] <= args.width for item in metrics["tshirtViewControls"]))
            camera = frame.locator("#mobile-camera-view")
            check("Compact phone camera selector is visible", await camera.is_visible())
            await camera.select_option("top")
            check("Phone camera selector accepts the Inside view", await camera.input_value() == "top")
            await camera.select_option("34")
            await capture("tshirt-phone-view-controls", frame, "34")
        check("Opened and Folded T-shirt native screenshots saved for human comparison")

        if not args.quick:
            for family in ("box", "handle"):
                await bag_type(frame, family)
                for pose in ("upright", "relaxed"):
                    await frame.locator(f"#poseSeg [data-v={pose}]").click()
                    await read_geometry(frame, family + " " + pose)
                    await capture(f"{family}-{pose}", frame, "34")
            check("Box and Handle upright/relaxed views render; all inspected body meshes have finite nonzero dimensions")
        if args.visual_only:
            check("No JavaScript runtime errors or application writes", not errors and not blocked_writes)
            await context.close()
            await browser.close()
            return

        # Start from a genuine product card, then perform actual UI editing on
        # the back. Never replace the artwork arrays directly from automation.
        await frame.locator("#tabs [data-tab=samples]").click()
        await frame.locator(f"#samples .sample[data-i='{index}']").click()
        front_before = await frame.evaluate("() => JSON.stringify(__api.design.front)")
        await frame.locator("#edit-back").click()
        check("Back button opens back artwork directly", await frame.evaluate("() => __api.getSide()") == "back" and await frame.locator("[data-pane=design]").is_visible())

        async def open_add():
            # A phone can collapse Add tools; desktop keeps them visible.
            if not await frame.locator("#addText").is_visible():
                await frame.locator("#studio-add-toggle").click()

        await open_add()
        await frame.locator("#addText").click()
        await frame.locator("#pText").fill("CLIENT BACK ONLY")
        text_id = await frame.evaluate("() => __api.design.back.at(-1).id")
        await open_add()
        await frame.locator("#addQr").click()
        await frame.locator("#pQr").fill("https://kobags-group.com/client-review")
        qr_id = await frame.evaluate("() => __api.design.back.at(-1).id")
        # Real upload path, small test fixture, never a remote client file.
        fixture = OUT / "qa-client-logo.png"
        logo = Image.new("RGBA", (160, 80), (255, 255, 255, 0))
        ImageDraw.Draw(logo).rounded_rectangle((12, 15, 148, 65), radius=8, fill="#143442")
        logo.save(fixture)
        await open_add()
        await frame.locator("#addLogo").set_input_files(str(fixture))
        await frame.wait_for_function("() => __api.design.back.some(item => item.kind==='logo')")
        check("Back text, QR and uploaded logo leave the front artwork unchanged", await frame.evaluate("() => JSON.stringify(__api.design.front)") == front_before)

        await frame.locator("#artwork-picker").select_option(str(text_id))
        before = await frame.evaluate("id => ({...__api.design.back.find(item=>item.id===id)})", text_id)
        await frame.get_by_role("button", name="Move right", exact=True).click()
        await frame.get_by_role("button", name="Make artwork larger", exact=True).click()
        after = await frame.evaluate("id => ({...__api.design.back.find(item=>item.id===id)})", text_id)
        check("Art selector, position nudge and resizing operate on the selected text", after["x"] > before["x"] and after["w"] > before["w"])
        await frame.locator("#artwork-picker").select_option(str(qr_id))
        check("QR remains independently selectable", await frame.locator("#pQr").input_value() == "https://kobags-group.com/client-review")

        # Drag the actual flat canvas using pointer/touch input, not a state edit.
        old_x = await frame.evaluate("id => __api.design.back.find(item=>item.id===id).x", qr_id)
        await drag_item(frame, qr_id)
        check("Pointer/touch canvas drag moves the selected QR code", await frame.evaluate("id => __api.design.back.find(item=>item.id===id).x", qr_id) < old_x)

        if args.width <= 760:
            dock = frame.locator("#studio-mobile-tools")
            check("Compact phone artwork dock is visible", await dock.is_visible())
            metrics["mobileDock"] = await dock.evaluate("""element=>{const r=element.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,viewportHeight:innerHeight,controls:[...element.querySelectorAll('button,select')].filter(e=>e.getClientRects().length).map(e=>{const b=e.getBoundingClientRect();return {label:e.getAttribute('aria-label')||e.textContent.trim(),width:b.width,height:b.height}})}}""")
            assert metrics["mobileDock"]["width"] <= args.width
            assert metrics["mobileDock"]["y"] >= 0
            assert metrics["mobileDock"]["y"] + metrics["mobileDock"]["height"] <= metrics["mobileDock"]["viewportHeight"] + 1
        await capture("design-back-controls", frame, "back")
        await assert_width(frame)

        if args.width <= 760:
            inline_height = await frame.locator("#editor").evaluate("e => e.getBoundingClientRect().height")
            await frame.locator("#expand-artwork-canvas").click()
            dialog = frame.locator("#artwork-canvas-dialog")
            await dialog.wait_for(state="visible")
            await frame.wait_for_function("() => document.documentElement.dataset.canvasFocus === 'true'")
            modal_height = await frame.locator("#editor").evaluate("e => e.getBoundingClientRect().height")
            check("Expanded phone canvas is larger than the inline editor", modal_height > inline_height)
            check("Focused canvas contains the same artwork and side controls", await dialog.locator("#editor").count() == 1 and await dialog.locator("#artwork-picker").count() == 1 and await dialog.locator("#edit-front").count() == 1 and await dialog.locator("#edit-back").count() == 1)
            before_modal_drag = await frame.evaluate("id => __api.design.back.find(item=>item.id===id).x", qr_id)
            await drag_item(frame, qr_id)
            check("Touch dragging works in the enlarged canvas", await frame.evaluate("id => __api.design.back.find(item=>item.id===id).x", qr_id) < before_modal_drag)
            await dialog.get_by_role("button", name="Make artwork larger", exact=True).click()
            back_before_switch = await frame.evaluate("() => JSON.stringify(__api.design.back)")
            await dialog.locator("#edit-front").click()
            front_id = await frame.evaluate("() => __api.design.front[0].id")
            await dialog.locator("#artwork-picker").select_option(str(front_id))
            front_item = await frame.evaluate("id => ({...__api.design.front.find(item=>item.id===id)})", front_id)
            await dialog.get_by_role("button", name="Move left", exact=True).click()
            await dialog.get_by_role("button", name="Make artwork smaller", exact=True).click()
            front_changed = await frame.evaluate("id => ({...__api.design.front.find(item=>item.id===id)})", front_id)
            check("Focused canvas can move and resize front artwork independently", front_changed["x"] < front_item["x"] and front_changed["w"] < front_item["w"] and await frame.evaluate("() => JSON.stringify(__api.design.back)") == back_before_switch)
            # Subsequent copy-cancellation checks compare with this intentionally
            # edited front, rather than silently undoing the real UI interaction.
            front_before = await frame.evaluate("() => JSON.stringify(__api.design.front)")
            await dialog.locator("#edit-back").click()
            check("Changing sides in the dialog retains back artwork and selection", await frame.evaluate("() => JSON.stringify(__api.design.back)") == back_before_switch and await dialog.locator("#artwork-picker").input_value() == str(qr_id))
            metrics["focusedCanvas"] = {"inlineHeight": inline_height, "expandedHeight": modal_height}
            await capture("expanded-canvas-back", frame, "back")
            # Cross the CSS breakpoint while the dialog owns these DOM nodes.
            # Resizing must not pull the selector/buttons out from under a finger.
            for width in (900, args.width):
                await page.set_viewport_size({"width": width, "height": args.height})
                await frame.wait_for_function("width => innerWidth === width", arg=width)
                assert await dialog.is_visible()
                assert await dialog.locator("#editor").count() == 1
                assert await dialog.locator("#artwork-picker").count() == 1
                assert await dialog.get_by_role("button", name="Move right", exact=True).count() == 1
            metrics["focusedCanvas"]["controls"] = await dialog.evaluate("""element=>[...element.querySelectorAll('button,select')].filter(e=>e.getClientRects().length).map(e=>{const r=e.getBoundingClientRect();return {label:e.getAttribute('aria-label')||e.textContent.trim(),left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height}})""")
            viewport_height = await frame.evaluate("() => innerHeight")
            check("Dialog controls stay reachable after phone/desktop/phone resize", all(c["left"] >= 0 and c["right"] <= args.width + 1 and c["top"] >= 0 and c["bottom"] <= viewport_height + 1 for c in metrics["focusedCanvas"]["controls"]))
            await page.keyboard.press("Escape")
            await dialog.wait_for(state="hidden")
            check("Escape closes focused canvas and returns focus to Expand", await frame.locator("#expand-artwork-canvas").evaluate("e => document.activeElement === e"))
            check("Closing dialog restores phone selection and resize controls", await frame.locator("#studio-mobile-tools #artwork-picker").count() == 1 and await frame.locator("#studio-mobile-tools").get_by_role("button", name="Make artwork larger", exact=True).count() == 1 and await dialog.locator("#editor").count() == 0)
            await frame.locator("#expand-artwork-canvas").click()
            await dialog.locator("#close-artwork-canvas").click()
            await dialog.wait_for(state="hidden")
            check("Done closes focused canvas and returns focus to Expand", await frame.locator("#expand-artwork-canvas").evaluate("e => document.activeElement === e"))
            await assert_width(frame)

        await frame.locator("#copySide").click()
        await frame.locator(".studio-copy-confirm").wait_for(state="visible")
        await frame.locator(".studio-copy-confirm").get_by_role("button", name="Cancel", exact=True).click()
        check("Copy confirmation cancellation preserves independent front artwork", await frame.evaluate("() => JSON.stringify(__api.design.front)") == front_before)
        # Persist the non-default view so a silent reset to Opened is detected.
        before_fold = await frame.evaluate("() => JSON.stringify(__api.design)")
        selected_before_fold = await frame.locator("#artwork-picker").input_value()
        await vest_mode(frame, "flat")
        check("View switch stays in Your design and retains selected artwork", await frame.locator("[data-pane=design]").is_visible() and await frame.locator("#artwork-picker").input_value() == selected_before_fold)
        await frame.locator("#edit-back").click()
        check("Folded view keeps uploaded logo, text and QR artwork intact", await frame.evaluate("() => JSON.stringify(__api.design)") == before_fold)
        await page.wait_for_timeout(900)
        saved = await frame.evaluate("() => JSON.parse(localStorage.getItem('kobags-reference-studio-v1'))")
        assert saved["uploaded"] and any(item.get("text") == "CLIENT BACK ONLY" for item in saved["design"]["back"])
        assert saved["state"]["bagView"] == "flat"
        await page.reload(wait_until="domcontentloaded")
        frame = await ready()
        await frame.evaluate("() => __api.renderer.setAnimationLoop(null)")
        restored = await frame.evaluate("() => ({side:__api.getSide(),front:__api.design.front,back:__api.design.back})")
        check("Reload restores selected back side, independent artwork and uploaded logo", restored["side"] == "back" and any(item.get("text") == "CLIENT BACK ONLY" for item in restored["back"]) and any(item["kind"] == "logo" for item in restored["back"]) and any(item.get("data", "").endswith("/client-review") for item in restored["back"]))
        check("Reload restores the selected Folded T-shirt view", await frame.evaluate("() => __api.state.bagView") == "flat")
        restored_mesh = await read_geometry(frame, "T-shirt folded after draft reload")
        check("Restored T-shirt mesh matches the saved Folded depth", abs(restored_mesh["sizeCm"]["depth"] - folded["sizeCm"]["depth"]) < .01)

        await frame.locator("#product-references summary").click()
        await frame.locator(".reference-gallery-card").first.click()
        await frame.wait_for_function("() => {const image=document.querySelector('.reference-photo-image');return image.complete&&image.naturalWidth>0}")
        await page.screenshot(path=str(OUT / f"{prefix}-real-reference.png"), full_page=True)
        await page.keyboard.press("Escape")
        check("Real T-shirt reference opens and Escape restores focus", await frame.locator("#reference-photo-dialog").is_hidden() and await frame.locator(".reference-gallery-card").first.evaluate("e => e === document.activeElement"))

        expected = await frame.evaluate("() => ({W:__api.state.W,H:__api.state.H,D:__api.state.D,type:__api.state.type})")
        await page.wait_for_function("() => {const b=document.querySelector('.reference-studio-bar button');return b&&!b.disabled&&b.textContent.includes('Continue to quote')}", polling=200, timeout=45000)
        quote = await page.evaluate("() => {const b=document.querySelector('.reference-studio-bar button');b.scrollIntoView({block:'center'});const r=b.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2}}")
        if args.width <= 760:
            await page.touchscreen.tap(quote["x"], quote["y"])
        else:
            await page.mouse.click(quote["x"], quote["y"])
        await page.wait_for_url("**/quote", timeout=120000)
        draft = await page.evaluate("() => JSON.parse(localStorage.getItem('kobags-design-v1'))")
        for key in ("front", "back"):
            assert draft["referenceStudio"][key].startswith("data:image/")
        assert draft["backLogo"].startswith("data:image/")
        dimensions = f"{expected['W']:g} × {expected['H']:g} × {expected['D']:g} cm"
        check("Quote handoff carries source dimensions, both native previews and back artwork", draft["customDimensions"] == dimensions and draft["referenceStudio"]["source"] == "ariongj-mo-b23cd8f" and "[3D studio]" in draft["note"])
        check("Quote notes retain the selected Folded / flat preview", "Preview: Folded / flat." in draft["note"])
        await page.screenshot(path=str(OUT / f"{prefix}-quote.png"), full_page=True, timeout=120000)
        check("No JavaScript runtime errors or application writes", not errors and not blocked_writes)
        await context.unroute_all(behavior="ignoreErrors")
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
    result.update({
        "timestampUTC": datetime.now(timezone.utc).isoformat(), "mode": mode,
        "viewport": {"width": args.width, "height": args.height}, "quick": args.quick, "checks": checks,
        "errors": errors, "blockedApplicationWrites": blocked_writes, "submittedInquiries": 0,
        "metrics": metrics, "screenshots": screenshots, "geometry": geometry,
        "rendering": "Chromium; native initial render and forced original renderer/composer for every bag view. Continuous animation paused after initial capture for software-GPU automation. Not a physical-phone FPS test.",
        "visualReview": "T-shirt volume, open interior, fabric realism, and handle silhouette require human review of the PNG views against approved production photos. Geometry checks alone do not establish realism.",
    })
    (OUT / f"{prefix}.json").write_text(json.dumps(result, indent=2) + "\n")
    print(json.dumps({"status": result["status"], "checks": len(checks), "evidence": str(OUT / f"{prefix}.json")}, indent=2), flush=True)
