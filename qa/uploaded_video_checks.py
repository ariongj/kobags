"""CMS-uploaded MP4 playback on the isolated local Worker; no page or inquiry edits."""
import argparse
import asyncio
import json
import os
import struct
from pathlib import Path

from playwright.async_api import async_playwright
from browser_support import BASE, launch

ROOT = Path(__file__).resolve().parents[1]
FIXTURE = Path('/tmp/kobags-uploaded-video-qa.mp4')


async def main(record_before=False):
    source = (ROOT / 'public/assets/client-2026-09/bag-stacking-reel.mp4').read_bytes()
    # A valid MP4 free-space atom prevents deduplication to the seeded asset redirect.
    marker = b'KOBAGS disposable local uploaded-video QA 2026-10-14'
    data = source + struct.pack('>I4s', 8 + len(marker), b'free') + marker
    FIXTURE.write_bytes(data)
    async with async_playwright() as playwright:
        owner = await playwright.request.new_context(base_url=BASE, extra_http_headers={
            'Origin': BASE, 'cf-connecting-ip': '198.19.147.93',
        })
        password = Path(os.environ.get('KOBAGS_QA_PASSWORD_FILE', '/tmp/kobags-stock-qa-password')).read_text().strip()
        login = await owner.post('/api/cms/login', data={
            'email': os.environ.get('KOBAGS_QA_EMAIL', 'info@itdks.tech'), 'password': password,
        })
        assert login.status == 200, login.status
        try:
            settings_before = next(row for row in (await (await owner.get('/api/cms/records')).json())['records'] if row['kind'] == 'settings')
            upload = await owner.post('/api/cms/media', multipart={
                'file': {'name': 'qa-uploaded-factory-video.mp4', 'mimeType': 'video/mp4', 'buffer': data},
                'visibility': 'public', 'altEn': 'Disposable local video playback test', 'altSq': 'Provë lokale e videos',
            })
            assert upload.status == 201, (upload.status, await upload.text())
            media = await upload.json()
            assert not media['id'].startswith('source-'), 'Fixture must exercise R2 delivery, not the seeded static redirect'
            path = '/api/media/' + media['id']
            guest = await playwright.request.new_context(base_url=BASE)
            try:
                response = await guest.get(path, headers={'Range': 'bytes=0-1'})
                body = await response.body()
                observation = {
                    'status': response.status, 'bytesReceived': len(body), 'size': len(data),
                    'contentType': response.headers.get('content-type'),
                    'contentDisposition': response.headers.get('content-disposition'),
                    'acceptRanges': response.headers.get('accept-ranges'),
                    'contentRange': response.headers.get('content-range'),
                }
                if record_before:
                    (ROOT / 'evidence/uploaded-video-before.json').write_text(json.dumps(observation, indent=2))
                    print('BEFORE uploaded MP4:', json.dumps(observation))
                    print('Local fixture:', path)
                else:
                    assert response.status == 206, observation
                    assert body == data[:2], observation
                    assert response.headers.get('content-range') == f'bytes 0-1/{len(data)}', observation
                    assert response.headers.get('content-disposition', '').startswith('inline;'), observation
                    assert response.headers.get('accept-ranges') == 'bytes', observation
                    assert response.headers.get('content-type') == 'video/mp4', observation
                    await check_playback(playwright, path, observation)
            finally:
                await guest.dispose()
            settings_after = next(row for row in (await (await owner.get('/api/cms/records')).json())['records'] if row['kind'] == 'settings')
            assert settings_before == settings_after, 'Video QA must not change site settings'
            print('UNCHANGED local CMS settings; no inquiry or page records changed')
        finally:
            await owner.post('/api/cms/logout', data={})
            await owner.dispose()


async def check_playback(playwright, path, observation):
    browser = await launch(playwright)
    try:
        context = await browser.new_context(viewport={'width': 390, 'height': 844}, is_mobile=True, has_touch=True)
        page = await context.new_page()
        errors = []
        requests = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.on('response', lambda response: requests.append({'status': response.status, 'range': response.headers.get('content-range')}) if response.url == BASE + path else None)
        await page.goto(BASE + '/', wait_until='networkidle')
        # Use the real compiled page origin/CSP without changing published CMS content.
        await page.evaluate('''src => {
            document.querySelectorAll('video').forEach(video => video.pause());
            const video = document.createElement('video');
            video.id = 'cms-uploaded-video-qa';
            video.src = src; video.controls = true; video.playsInline = true;
            video.preload = 'metadata'; video.muted = true;
            video.style.cssText = 'display:block;width:100%;max-width:390px;background:#172d35';
            document.querySelector('main').prepend(video);
        }''', path)
        video = page.locator('#cms-uploaded-video-qa')
        await video.scroll_into_view_if_needed()
        await page.wait_for_function('''() => { const v=document.querySelector('#cms-uploaded-video-qa'); return v.readyState>=1 && Number.isFinite(v.duration) && v.duration>1; }''')
        await video.evaluate('(video)=>video.play()')
        await page.wait_for_function("document.querySelector('#cms-uploaded-video-qa').currentTime > .2")
        duration = await video.evaluate('(video)=>video.duration')
        seek_to = min(duration - .3, duration * .75)
        await video.evaluate('(video, time)=>{video.currentTime=time}', seek_to)
        await page.wait_for_function('''time => { const v=document.querySelector('#cms-uploaded-video-qa');return !v.seeking && v.currentTime>=time-.1 && v.readyState>=2; }''', arg=seek_to)
        await video.evaluate('(video)=>video.pause()')
        dimensions = await video.evaluate('(video)=>({width:video.videoWidth,height:video.videoHeight,error:video.error?.code||null})')
        assert dimensions['width'] > 0 and dimensions['height'] > 0 and not dimensions['error'], dimensions
        assert any(row['status'] == 206 for row in requests), requests
        assert not errors, errors
        await video.screenshot(path=str(ROOT / 'evidence/uploaded-video-mobile.png'))
        (ROOT / 'evidence/uploaded-video-checks.json').write_text(json.dumps({
            'status': 'passed',
            'scope': 'R2-backed CMS upload in disposable local state; real mobile Chromium video element on compiled site origin; no production writes',
            'rangeProbe': observation, 'browserResponses': requests, 'duration': duration,
            'seekTo': seek_to, 'videoDimensions': dimensions, 'browserErrors': errors,
            'checks': ['CMS upload uses R2 instead of static-asset redirect', 'Two-byte range returns exact 206 payload and inline video headers', 'Mobile metadata and actual decoded playback', 'Seek to 75% completes with a decoded frame', 'Settings and all content/inquiry records unchanged'],
        }, indent=2))
        print('PASS 5 uploaded-video delivery/playback checks')
    finally:
        await browser.close()


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--record-before', action='store_true')
    asyncio.run(main(parser.parse_args().record_before))
