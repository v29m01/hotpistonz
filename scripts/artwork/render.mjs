import { chromium } from '/opt/npm-tools/node_modules/playwright/index.mjs';
import { createRequire } from 'node:module';
const sharp = createRequire(import.meta.url)('/opt/npm-tools/node_modules/sharp/dist/index.cjs');
import fs from 'node:fs';
import { scenes } from './list.mjs';

const only = process.argv.slice(2);
const out = '/home/claude/art/out';
fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch();
for (const s of scenes) {
  if (only.length && !only.includes(s.name)) continue;
  const p = await b.newPage({ viewport: { width: s.W, height: s.H } });
  const html = `<!doctype html><html><body style="margin:0;background:#000;overflow:hidden">
    <div style="position:relative;width:${s.W}px;height:${s.H}px">${s.svg}
    <div style="position:absolute;inset:0;background:radial-gradient(ellipse at ${s.vx || '50%'} 45%, transparent 45%, rgba(0,0,0,${s.vig ?? 0.7}) 100%)"></div>
    <div style="position:absolute;inset:0;opacity:.07;mix-blend-mode:overlay;background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%22.9%22 numOctaves=%222%22/></filter><rect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22/></svg>')"></div>
    </div></body></html>`;
  await p.setContent(html);
  await p.waitForTimeout(300);
  const png = await p.screenshot({ type: 'png' });
  await sharp(png).jpeg({ quality: 84, mozjpeg: true }).toFile(`${out}/${s.name}.jpg`);
  console.log('rendered', s.name, s.W + 'x' + s.H, (fs.statSync(`${out}/${s.name}.jpg`).size / 1024).toFixed(0) + 'KB');
  await p.close();
}
await b.close();
