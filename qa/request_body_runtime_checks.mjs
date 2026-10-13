/** Isolate request limits in workerd, without Wrangler's forwarding proxy. */
import assert from 'node:assert/strict';
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Miniflare } from 'miniflare';
import ts from 'typescript';

const root = fileURLToPath(new URL('../', import.meta.url));
const source = await readFile(path.join(root, 'lib/request-body.ts'), 'utf8');
const helper = ts.transpile(source, { target: ts.ScriptTarget.ESNext, module: ts.ModuleKind.ESNext });
const results = [];
const serverRoot = path.join(root, 'dist/server');
const compiledPaths = (await readdir(serverRoot, { recursive: true })).filter(p => /\.(?:m?js)$/.test(p));
compiledPaths.sort((a, b) => a === 'index.js' ? -1 : b === 'index.js' ? 1 : a.localeCompare(b));

function streamingRequest(port, pathname) {
  return new Promise((resolve, reject) => {
    const timers = [];
    const request = http.request({ host: '127.0.0.1', port, path: pathname, method: 'POST', headers: {
      Origin: `http://127.0.0.1:${port}`, 'Content-Type': 'application/json', 'Transfer-Encoding': 'chunked',
    } }, response => {
      let body = '';
      response.setEncoding('utf8');
      response.on('data', chunk => body += chunk);
      response.on('end', () => { timers.forEach(clearTimeout); resolve({ status: response.statusCode, body }); });
      response.on('error', reject);
    });
    request.on('error', reject);
    request.setTimeout(15000, () => request.destroy(new Error('Request timed out')));
    request.write(' '.repeat(3000));
    timers.push(setTimeout(() => request.write(' '.repeat(3000)), 10));
    timers.push(setTimeout(() => request.end(' '.repeat(3000)), 20));
  });
}

for (const compiled of [false, true]) {
  const port = compiled ? 8792 : 8791;
  const mf = new Miniflare({
    modules: true, port, host: '127.0.0.1', compatibilityDate: '2026-05-15',
    compatibilityFlags: ['nodejs_compat'],
    ...(compiled ? {
      modules: compiledPaths.map(p => ({ type: 'ESModule', path: path.join(serverRoot, p) })),
      modulesRoot: serverRoot,
    } : {
      script: helper + `\nexport default {async fetch(req){try{await readRequestBytes(req,4096);return new Response('ok')}catch(e){return new Response(e.message,{status:e.status||500})}}};`,
    }),
  });
  try {
    await mf.ready;
    const statuses = [];
    for (let i = 0; i < 5; i++) {
      const result = await streamingRequest(port, compiled ? '/api/cms/login' : '/');
      assert.equal(result.status, 413, JSON.stringify(result));
      statuses.push(result.status);
      const recovery = await fetch(`http://127.0.0.1:${port}${compiled ? '/api/cms/session' : '/'}`);
      assert.equal(recovery.status, 200);
      await recovery.text();
    }
    results.push({ scope: compiled ? 'Actual compiled application Worker; no database or secrets bound' : 'Actual source helper transpiled into minimal Worker', streamedOversizeStatuses: statuses, recoveryStatuses: [200, 200, 200, 200, 200] });
    if (compiled) {
      for (const origin of [null, 'https://untrusted.example']) {
        const response = await fetch(`http://127.0.0.1:${port}/api/demo`, { method: 'POST', headers: { 'Content-Type': 'application/json', Cookie: 'kobags-demo=' + 'a'.repeat(64), ...(origin ? { Origin: origin } : {}) }, body: '{"type":"reset"}' });
        assert.equal(response.status, 403);
        await response.text();
      }
      results.push({ scope: 'Actual compiled application Worker', missingAndForeignOriginStatuses: [403, 403] });
    }
  } finally { await mf.dispose(); }
}

await writeFile(path.join(root, 'evidence/request-body-workerd-checks.json'), JSON.stringify({
  status: 'passed', runtime: 'Direct local workerd through Miniflare, without Wrangler HTTP proxy',
  helperSha256: createHash('sha256').update(source).digest('hex'), results,
}, null, 2));
console.log('PASS direct workerd: 10 streamed oversized requests return 413; 10 immediate recovery requests return 200');
