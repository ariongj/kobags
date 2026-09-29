"""Local browser checks for product inspection, journal language and phone controls."""

import asyncio
from playwright.async_api import async_playwright
from browser_support import BASE, launch


async def main():
    async with async_playwright() as playwright:
        browser = await launch(playwright)
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        page.set_default_timeout(30000)
        errors = []
        page.on("pageerror", lambda error: errors.append(str(error)))

        await page.goto(BASE + "/products/box-bag", wait_until="networkidle")
        opener = page.get_by_role("button", name="Inspect photo")
        await opener.click()
        dialog = page.get_by_role("dialog")
        await dialog.wait_for()
        first = await dialog.locator(".product-photo-viewer img").get_attribute("src")
        await dialog.get_by_role("button", name="Next photo").click()
        second = await dialog.locator(".product-photo-viewer img").get_attribute("src")
        assert first != second
        await dialog.press("ArrowLeft")
        assert await dialog.locator(".product-photo-viewer img").get_attribute("src") == first
        await dialog.get_by_role("button", name="Zoom in").click()
        assert "zoomed" in await dialog.locator(".product-photo-viewer").get_attribute("class")
        await page.keyboard.press("Escape")
        await dialog.wait_for(state="hidden")
        await page.wait_for_function("document.activeElement?.classList.contains('detail-photo-open')")

        await page.goto(BASE + "/blog", wait_until="networkidle")
        await page.get_by_role("button", name="Switch to Albanian").click()
        assert "Ide të mira" in await page.locator("h1").inner_text()
        await page.locator(".journal-card").first.click()
        await page.wait_for_function("document.querySelector('h1')?.textContent?.includes('Prodhuar në Kosovë')")
        assert "Prodhuar në Kosovë" in await page.locator("h1").inner_text()
        assert "Filloni me produktin" in await page.locator(".journal-article-body h2").first.inner_text()
        assert await page.locator(".journal-article-photo").evaluate("(image) => image.complete && image.naturalWidth > 0")
        await page.get_by_role("link", name="Kthehu te artikujt").click()
        assert await page.locator(".journal-card").count() == 6

        await page.set_viewport_size({"width": 320, "height": 780})
        await page.goto(BASE + "/design", wait_until="networkidle")
        await page.locator(".preview-stage .studio-3d[data-status=ready]").wait_for()
        preview = await page.locator(".preview-stage").bounding_box()
        toolbar = await page.locator(".preview-stage .studio-3d-tools").bounding_box()
        assert toolbar["x"] >= preview["x"] - 1
        assert toolbar["x"] + toolbar["width"] <= preview["x"] + preview["width"] + 1
        assert not await page.evaluate("document.documentElement.scrollWidth > innerWidth")

        await page.goto(BASE + "/products/box-bag", wait_until="networkidle")
        await page.get_by_role("button", name="Shihni foton").click()
        dialog = page.get_by_role("dialog")
        assert await dialog.is_visible()
        assert not await page.evaluate("document.documentElement.scrollWidth > innerWidth")
        await page.keyboard.press("Escape")
        await dialog.wait_for(state="hidden")
        assert not errors, errors
        print("PASS product photo inspection, journal SQ, phone controls")
        await browser.close()


asyncio.run(main())
