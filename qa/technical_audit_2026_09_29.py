"""Close the 29 September browser audit against an isolated compiled preview."""

import asyncio
import io
import re
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw
from playwright.async_api import async_playwright

from browser_support import BASE, launch


def logo_file(name, image_format, mime):
    image = Image.new("RGB", (480, 260), "white")
    draw = ImageDraw.Draw(image)
    draw.rectangle((55, 55, 425, 205), fill="#123442")
    draw.ellipse((190, 85, 290, 185), fill="#c6eb9d")
    output = io.BytesIO()
    image.save(output, format=image_format)
    return {"name": name, "mimeType": mime, "buffer": output.getvalue()}


async def main():
    async with async_playwright() as playwright:
        browser = await launch(playwright)
        context = await browser.new_context(viewport={"width": 390, "height": 844}, accept_downloads=True)
        page = await context.new_page()
        page.set_default_timeout(45000)
        errors = []
        page.on("pageerror", lambda error: errors.append(str(error)))

        async def draft():
            return await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")

        await page.goto(BASE + "/design", wait_until="networkidle")
        await page.locator(".preview-stage .studio-3d[data-status=ready]").wait_for()
        await page.get_by_role("tab", name="02 Your design").click()
        field = page.get_by_label("Brand name or message")
        for count in (59, 60, 61, 80):
            if count > 60:
                # Bypass the browser attribute to exercise the app's own guard.
                await field.evaluate("element => element.removeAttribute('maxlength')")
            await field.fill("A" * count)
            assert len(await field.input_value()) == min(count, 60), count
            assert len((await draft())["text"]) == min(count, 60), count
            help_text = await page.locator(".text-field-help").inner_text()
            assert "60-character limit" in help_text and f"{min(count, 60)}/60" in help_text, repr(help_text)
            if count > 60:
                assert await page.get_by_role("status").get_by_text("Extra text was removed.").is_visible()

        # A draft written by an older build is corrected before being used or quoted.
        await page.evaluate("""() => {
          const design = JSON.parse(localStorage.getItem('kobags-design-v1'));
          design.text = 'X'.repeat(80);
          design.backText = 'Y'.repeat(80);
          localStorage.setItem('kobags-design-v1', JSON.stringify(design));
        }""")
        await page.reload(wait_until="networkidle")
        await page.get_by_role("tab", name="02 Your design").click()
        await page.wait_for_function("JSON.parse(localStorage.getItem('kobags-design-v1')).text.length === 60")
        assert len((await draft())["backText"]) == 60
        await page.get_by_role("button", name="Edit back").click()
        await page.get_by_label("Brand name or message").fill("B" * 61)
        assert len((await draft())["backText"]) == 60
        assert len((await draft())["text"]) == 60
        await page.get_by_role("button", name="Edit front").click()

        await page.get_by_role("link", name="Switch to Albanian").click()
        await page.get_by_role("tab", name="01 Çanta").click()
        await page.locator("#bag-size").click()
        await page.get_by_role("option", name=re.compile("Mesatare")).click()
        await page.get_by_role("button", name="E kuqe", exact=True).click()
        assert "Mesatare" in await page.locator(".stage-top").inner_text()
        assert "E kuqe" in await page.locator(".studio-spec-line").inner_text(), repr(await page.locator(".studio-spec-line").inner_text())
        assert "PP jo i endur" in await page.locator(".studio-spec-line").inner_text()
        await page.wait_for_function("document.querySelector('.preview-stage .studio-3d-host canvas')?.getAttribute('aria-label')?.startsWith('Çantë 3D.')")

        # Both downloads must be real, readable PNG files; the sheet must show two different faces.
        async with page.expect_download() as single_event:
            await page.get_by_role("button", name="Shkarko parapamjen", exact=True).click()
        single = await single_event.value
        single_image = Image.open(await single.path())
        single_image.load()
        assert single_image.format == "PNG" and single_image.size == (1600, 1820)
        async with page.expect_download() as sheet_event:
            await page.get_by_role("button", name="Shkarko të dyja anët + specifikimet", exact=True).click()
        sheet = await sheet_event.value
        sheet_image = Image.open(await sheet.path())
        sheet_image.load()
        assert sheet_image.format == "PNG" and sheet_image.size == (2000, 1400)
        front = sheet_image.crop((80, 175, 920, 1015))
        back = sheet_image.crop((1080, 175, 1920, 1015))
        assert ImageChops.difference(front.convert("RGB"), back.convert("RGB")).getbbox() is not None

        await page.get_by_role("tab", name="02 Dizajni juaj").click()
        await page.get_by_role("group", name="Zgjidhni shtresën e dizajnit").get_by_role("button", name="Logo").click()
        for name, image_format, mime in (
            ("audit.png", "PNG", "image/png"),
            ("audit.jpg", "JPEG", "image/jpeg"),
            ("audit.webp", "WEBP", "image/webp"),
        ):
            await page.locator("input[type=file]").set_input_files(logo_file(name, image_format, mime))
            await page.get_by_text(name, exact=True).wait_for()
            assert (await draft())["logoName"] == name
        before = (await draft())["logo"]
        await page.locator("input[type=file]").set_input_files({"name": "unsafe.svg", "mimeType": "image/svg+xml", "buffer": b"<svg/>"})
        await page.get_by_role("alert").get_by_text("Zgjidhni PNG, JPG ose WebP nën 5 MB.").wait_for()
        assert (await draft())["logo"] == before
        await page.locator("input[type=file]").set_input_files({"name": "large.png", "mimeType": "image/png", "buffer": b"0" * (5 * 1024 * 1024 + 1)})
        await page.get_by_role("alert").get_by_text("Zgjidhni PNG, JPG ose WebP nën 5 MB.").wait_for()
        assert (await draft())["logo"] == before
        async with page.expect_download() as logo_event:
            await page.get_by_role("button", name="Shkarko parapamjen", exact=True).click()
        logo_image = Image.open(await (await logo_event.value).path())
        logo_image.load()
        assert logo_image.size == (1600, 1820)

        await page.get_by_role("link", name="Kërkoni ofertë për këtë çantë").click()
        await page.wait_for_url("**/quote")
        await page.wait_for_function("JSON.parse(localStorage.getItem('kobags-design-v1')).text.length === 60")
        assert len((await draft())["text"]) == 60
        assert len((await draft())["backText"]) == 60
        assert "E kuqe" in await page.locator(".quote-summary").inner_text()
        assert not errors, errors
        print("PASS 60-character limits, SQ studio, PNG exports, logo formats and quote carry-through")
        await browser.close()


asyncio.run(main())
