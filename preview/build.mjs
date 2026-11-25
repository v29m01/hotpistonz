// Builds a single-file HTML preview from the real React source.
import * as esbuild from '/opt/npm-tools/node_modules/esbuild/lib/main.js';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const mockApi = {
  name: 'mock-api',
  setup(b) {
    b.onResolve({ filter: /\/api$/ }, () => ({ path: path.join(root, 'preview/api.mock.js') }));
  },
};
const out = await esbuild.build({
  entryPoints: [path.join(root, 'client/src/main.jsx')],
  bundle: true, minify: true, write: false, format: 'iife', outdir: 'out',
  jsx: 'automatic', loader: { '.js': 'jsx' },
  nodePaths: ['/opt/npm-tools/node_modules'],
  define: { 'process.env.NODE_ENV': '"production"', __ROUTER_MODE__: '"hash"' },
  plugins: [mockApi],
});
const js = out.outputFiles.find((f) => f.path.endsWith('.js')).text;
const css = out.outputFiles.find((f) => f.path.endsWith('.css')).text;
let html = fs.readFileSync(path.join(root, 'client/index.html'), 'utf8')
  .replace('<link rel="icon" href="/favicon.svg" type="image/svg+xml" />', '')
  .replace('<script type="module" src="/src/main.jsx"></script>', () => `<script>${js.replace(/<\/script/g, '<\\/script')}</script>`)
  .replace('</head>', () => `<style>${css}</style></head>`);
const dist = path.join(root, 'preview/dist');
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(path.join(dist, 'images'), { recursive: true });
fs.writeFileSync(path.join(dist, 'index.html'), html);
const imgDir = path.join(root, 'client/public/images');
fs.rmSync(path.join(dist, 'images'), { recursive: true, force: true }); fs.mkdirSync(path.join(dist, 'images'), { recursive: true });
for (const f of fs.existsSync(imgDir) ? fs.readdirSync(imgDir) : []) fs.copyFileSync(path.join(imgDir, f), path.join(dist, 'images', f));
const mediaDir = path.join(root, 'client/public/media');
fs.mkdirSync(path.join(dist, 'media'), { recursive: true });
for (const f of fs.existsSync(mediaDir) ? fs.readdirSync(mediaDir) : []) fs.copyFileSync(path.join(mediaDir, f), path.join(dist, 'media', f));
console.log('preview size', (html.length / 1024).toFixed(0), 'KB');
