// Eina de desenvolupament: captura pantalles i detecta desbordaments horitzontals.
// Ús: node eines/captura.mjs <url> <sortida.png> [ampladaCSS] [alçadaCSS] [fosc]
import { spawn } from 'node:child_process';
import fs from 'node:fs';

const [, , url, sortida, w = '390', h = '844', mode = 'light'] = process.argv;
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9222 + Math.floor(Math.random() * 500);

const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${process.env.TMPDIR ?? '/tmp'}/chrome-captura-${PORT}`,
  'about:blank',
], { stdio: 'ignore', detached: true });
chrome.unref();

const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

let info;
for (let i = 0; i < 60; i++) {
  try { info = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json(); if (info?.[0]?.webSocketDebuggerUrl) break; } catch {}
  await esperar(250);
}

if (!info?.[0]?.webSocketDebuggerUrl) { console.error('Chrome no ha respost'); chrome.kill(); process.exit(1); }
const ws = new WebSocket(info[0].webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pendents = new Map();
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pendents.has(m.id)) { pendents.get(m.id)(m.result); pendents.delete(m.id); }
};
const cmd = (method, params = {}) => new Promise((res) => { const i = ++id; pendents.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });

await cmd('Page.enable');
await cmd('Emulation.setDeviceMetricsOverride', {
  width: Number(w), height: Number(h), deviceScaleFactor: 2, mobile: Number(w) < 700,
});
await cmd('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: mode === 'fosc' ? 'dark' : 'light' }] });
await cmd('Page.navigate', { url });
await esperar(1200);
// Es torna a aplicar després de carregar: així es respecta la metaetiqueta viewport.
await cmd('Emulation.setDeviceMetricsOverride', {
  width: Number(w), height: Number(h), deviceScaleFactor: 2, mobile: Number(w) < 700,
  screenWidth: Number(w), screenHeight: Number(h),
});
await esperar(800);

const { result } = await cmd('Runtime.evaluate', {
  returnByValue: true,
  expression: `(() => {
    const limit = document.documentElement.clientWidth;
    const culpables = [];
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect();
      if (r.width === 0) continue;
      if (r.right > limit + 1 || r.left < -1) {
        culpables.push({ tag: el.tagName.toLowerCase(), cls: el.className?.toString?.().slice(0, 60) ?? '', left: Math.round(r.left), right: Math.round(r.right) });
      }
    }
    return { limit, scrollW: document.documentElement.scrollWidth, culpables: culpables.slice(0, 12) };
  })()`,
});
console.log(JSON.stringify(result.value, null, 1));

const { data } = await cmd('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
fs.writeFileSync(sortida, Buffer.from(data, 'base64'));
console.log('desat:', sortida);
ws.close();
chrome.kill();
process.exit(0);
