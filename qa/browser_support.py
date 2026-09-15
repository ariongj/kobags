"""Portable local-only browser setup. Run `playwright install chromium` first."""
import os
from urllib.parse import urlparse
BASE = os.getenv('KOBAGS_BASE_URL', 'http://localhost:8787').rstrip('/')
assert urlparse(BASE).hostname in ('localhost', '127.0.0.1') and urlparse(BASE).scheme == 'http', 'QA only runs against an isolated local preview.'
async def launch(playwright):
    options = {'headless': True}
    if os.getenv('CHROME_PATH'):
        options['executable_path'] = os.environ['CHROME_PATH']
    if os.getenv('CHROME_NO_SANDBOX') == '1':
        options['args'] = ['--no-sandbox']
    if os.getenv('CHROME_SOFTWARE_GL') == '1':
        options.setdefault('args', []).extend(['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'])
    options['env'] = dict(os.environ)
    if os.getenv('CHROME_LIBS'):
        options['env']['LD_LIBRARY_PATH'] = os.environ['CHROME_LIBS']
    return await playwright.chromium.launch(**options)
