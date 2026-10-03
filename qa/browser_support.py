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

async def artwork_point(canvas, layer=None):
    """Center of a rendered layer, accounting for the photo and CSS letterboxing."""
    await canvas.scroll_into_view_if_needed()
    return await canvas.evaluate('''(canvas, layer) => {
      const targets=JSON.parse(canvas.dataset.artworkTargets || '[]');
      const point=targets.find(p=>p.layer===layer) || targets[0];
      if(!point) throw Error('No rendered artwork to select');
      const r=canvas.getBoundingClientRect();
      const contain=getComputedStyle(canvas).objectFit==='contain';
      const w=contain?Math.min(r.width,r.height):r.width;
      const h=contain?w:r.height;
      return {x:r.left+(r.width-w)/2+point.x*w/800,y:r.top+(r.height-h)/2+point.y*h/800};
    }''',layer)
