import { studio, rnd, setSeed } from './car.mjs';
import { paint, pistons, gauge, wheelInterior, trails } from './scenes.mjs';

const ACC = '#f28c28';
const P = {
  orange: ['#ffb35c', '#f07a1a', '#7a2c06'],
  silver: ['#f4f5f7', '#9aa0a8', '#33363c'],
  black: ['#6a6d76', '#1c1d22', '#08080a'],
  red: ['#ff7a6b', '#c8141b', '#4a0507'],
  yellow: ['#ffe27a', '#f2b705', '#5c3d00'],
  blue: ['#8fc0ff', '#1f5fd1', '#071a45'],
  white: ['#ffffff', '#d5d9df', '#5f656e'],
};
const svgOpen = (W, H) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">`;
const blur = (id, s) => `<filter id="${id}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${s}"/></filter>`;

/* ---------- Gears ---------- */
function gearPath(teeth, ro, ri) {
  let d = '';
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const pts = [[ri, a], [ro, a + step * 0.18], [ro, a + step * 0.48], [ri, a + step * 0.66]];
    pts.forEach(([r, t], j) => { d += `${i === 0 && j === 0 ? 'M' : 'L'} ${(Math.cos(t) * r).toFixed(1)} ${(Math.sin(t) * r).toFixed(1)} `; });
  }
  return d + 'Z';
}
function gear(cx, cy, teeth, ro, rot, id) {
  const ri = ro - 26;
  let bolts = '';
  for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2; bolts += `<circle cx="${Math.cos(a) * ro * 0.42}" cy="${Math.sin(a) * ro * 0.42}" r="${ro * 0.07}" fill="#0c0c0e"/>`; }
  return `<g transform="translate(${cx},${cy}) rotate(${rot})">
    <path d="${gearPath(teeth, ro, ri)}" fill="url(#steel${id})" stroke="#000" stroke-opacity=".5"/>
    <circle r="${ri * 0.82}" fill="none" stroke="#000" stroke-opacity=".35" stroke-width="6"/>
    <circle r="${ri * 0.82}" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="2" transform="translate(-2,-2)"/>
    ${bolts}
    <circle r="${ro * 0.2}" fill="#0a0a0c" stroke="url(#steel${id})" stroke-width="10"/>
  </g>`;
}
function gears(W, H) {
  const g = [[W * 0.36, H * 0.42, 34, 300, 4], [W * 0.82, H * 0.66, 22, 200, 8], [W * 0.2, H * 0.9, 18, 160, 3]];
  return `${svgOpen(W, H)}<defs>
    ${[0, 1, 2].map((i) => `<linearGradient id="steel${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f1f1f4"/><stop offset=".35" stop-color="#8a8a93"/><stop offset=".6" stop-color="#c9c9d0"/><stop offset="1" stop-color="#2a2a30"/></linearGradient>`).join('')}
    <radialGradient id="bg" cx=".6" cy=".3" r=".9"><stop offset="0" stop-color="#2a2016"/><stop offset=".6" stop-color="#0b0b0c"/><stop offset="1" stop-color="#040404"/></radialGradient>
    ${blur('b60', 60)}${blur('b8', 8)}
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <ellipse cx="${W * 0.7}" cy="${H * 0.3}" rx="300" ry="240" fill="${ACC}" opacity=".35" filter="url(#b60)"/>
  ${g.map(([x, y, t, r, rot], i) => `<g filter="url(#b8)" opacity=".6"><circle cx="${x + 14}" cy="${y + 18}" r="${r}" fill="#000"/></g>${gear(x, y, t, r, rot, i)}`).join('')}
  <path d="M 0 ${H * 0.15} L ${W} ${H * 0.05}" stroke="${ACC}" stroke-width="3" opacity=".6" filter="url(#b8)"/>
</svg>`;
}

/* ---------- Circuit / ECU ---------- */
function circuit(W, H) {
  setSeed(9);
  const cx = W / 2, cy = H / 2, S = 220;
  let traces = '';
  for (let i = 0; i < 90; i++) {
    const side = Math.floor(rnd() * 4);
    let x = cx + (side === 0 ? -S / 2 : side === 1 ? S / 2 : (rnd() - 0.5) * S);
    let y = cy + (side === 2 ? -S / 2 : side === 3 ? S / 2 : (rnd() - 0.5) * S);
    let d = `M ${x} ${y}`;
    let dir = side;
    for (let k = 0; k < 4; k++) {
      const len = 40 + rnd() * 160;
      if (dir === 0) x -= len; else if (dir === 1) x += len; else if (dir === 2) y -= len; else y += len;
      d += ` L ${x.toFixed(0)} ${y.toFixed(0)}`;
      if (rnd() < 0.5) {
        const diag = 30 + rnd() * 50, s2 = rnd() < 0.5 ? -1 : 1;
        if (dir < 2) { x += dir === 0 ? -diag : diag; y += s2 * diag; } else { y += dir === 2 ? -diag : diag; x += s2 * diag; }
        d += ` L ${x.toFixed(0)} ${y.toFixed(0)}`;
      }
    }
    const lit = rnd() < 0.3;
    traces += `<path d="${d}" fill="none" stroke="${lit ? ACC : '#3a3d44'}" stroke-width="${lit ? 2.5 : 2}" ${lit ? 'filter="url(#g)"' : ''}/><circle cx="${x}" cy="${y}" r="5" fill="${lit ? ACC : '#4a4d55'}"/>`;
  }
  let pins = '';
  for (let i = 0; i < 14; i++) {
    const o = -S / 2 + 14 + i * ((S - 28) / 13);
    pins += `<rect x="${cx + o - 3}" y="${cy - S / 2 - 14}" width="6" height="14" fill="#b9b9c2"/><rect x="${cx + o - 3}" y="${cy + S / 2}" width="6" height="14" fill="#b9b9c2"/><rect y="${cy + o - 3}" x="${cx - S / 2 - 14}" height="6" width="14" fill="#b9b9c2"/><rect y="${cy + o - 3}" x="${cx + S / 2}" height="6" width="14" fill="#b9b9c2"/>`;
  }
  return `${svgOpen(W, H)}<defs>
    <radialGradient id="bg" cx=".5" cy=".5" r=".75"><stop offset="0" stop-color="#14161a"/><stop offset="1" stop-color="#050506"/></radialGradient>
    <linearGradient id="chip" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2c2d33"/><stop offset="1" stop-color="#0c0c0e"/></linearGradient>
    <filter id="g" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    ${blur('b80', 80)}
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="${cx}" cy="${cy}" r="300" fill="${ACC}" opacity=".18" filter="url(#b80)"/>
  ${traces}${pins}
  <rect x="${cx - S / 2}" y="${cy - S / 2}" width="${S}" height="${S}" rx="10" fill="url(#chip)" stroke="#45474f" stroke-width="2"/>
  <rect x="${cx - S / 2 + 18}" y="${cy - S / 2 + 18}" width="${S - 36}" height="${S - 36}" rx="6" fill="none" stroke="${ACC}" stroke-opacity=".5"/>
  <text x="${cx}" y="${cy + 10}" fill="${ACC}" font-family="Arial Narrow, Arial" font-weight="700" font-size="34" letter-spacing="6" text-anchor="middle">ECU</text>
</svg>`;
}

/* ---------- Oil drop ---------- */
function oil(W, H) {
  const cx = W * 0.5, top = H * 0.08, dy = H * 0.5;
  return `${svgOpen(W, H)}<defs>
    <radialGradient id="bg" cx=".5" cy=".4" r=".8"><stop offset="0" stop-color="#241a0e"/><stop offset=".6" stop-color="#0b0a09"/><stop offset="1" stop-color="#040404"/></radialGradient>
    <linearGradient id="amber" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe08a"/><stop offset=".4" stop-color="#f2a01e"/><stop offset=".8" stop-color="#8a4a05"/><stop offset="1" stop-color="#3a1d02"/></linearGradient>
    <linearGradient id="stream" x1="0" x2="1"><stop offset="0" stop-color="#8a4a05"/><stop offset=".45" stop-color="#ffd36b"/><stop offset="1" stop-color="#8a4a05"/></linearGradient>
    ${blur('b4', 4)}${blur('b30', 30)}${blur('b80', 80)}
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <ellipse cx="${cx}" cy="${dy}" rx="320" ry="300" fill="#f2a01e" opacity=".22" filter="url(#b80)"/>
  <path d="M ${cx - 10} -10 C ${cx - 8} ${top + 80}, ${cx - 4} ${dy - 260}, ${cx} ${dy - 210} C ${cx + 4} ${dy - 260}, ${cx + 8} ${top + 80}, ${cx + 10} -10 Z" fill="url(#stream)"/>
  <path d="M ${cx} ${dy - 220} C ${cx + 40} ${dy - 120}, ${cx + 150} ${dy - 20}, ${cx + 150} ${dy + 70} A 150 150 0 0 1 ${cx - 150} ${dy + 70} C ${cx - 150} ${dy - 20}, ${cx - 40} ${dy - 120}, ${cx} ${dy - 220} Z" fill="url(#amber)"/>
  <path d="M ${cx - 95} ${dy + 10} C ${cx - 90} ${dy - 60}, ${cx - 50} ${dy - 110}, ${cx - 20} ${dy - 150}" stroke="#fff" stroke-width="14" fill="none" stroke-linecap="round" opacity=".85" filter="url(#b4)"/>
  <ellipse cx="${cx + 70}" cy="${dy + 120}" rx="40" ry="16" fill="#fff" opacity=".35" filter="url(#b4)" transform="rotate(-30 ${cx + 70} ${dy + 120})"/>
  ${[0, 1, 2, 3].map((i) => `<ellipse cx="${cx}" cy="${H * 0.86}" rx="${180 + i * 110}" ry="${26 + i * 16}" fill="none" stroke="#f2a01e" stroke-opacity="${0.5 - i * 0.11}" stroke-width="3"/>`).join('')}
  <ellipse cx="${cx}" cy="${H * 0.86}" rx="160" ry="24" fill="url(#amber)" opacity=".9"/>
</svg>`;
}

/* ---------- Spray / bodywork ---------- */
function spray(W, H) {
  setSeed(21);
  let mist = '';
  for (let i = 0; i < 1400; i++) {
    const a = -0.9 + rnd() * 0.9, d = Math.pow(rnd(), 0.6) * W * 0.9;
    const x = W * 0.05 + Math.cos(a) * d, y = H * 0.25 + Math.sin(-a) * d * 0.9 + (rnd() - 0.5) * 120;
    mist += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(0.6 + rnd() * 2.4).toFixed(1)}" fill="#ff5a4a" opacity="${(0.1 + rnd() * 0.5).toFixed(2)}"/>`;
  }
  return `${svgOpen(W, H)}<defs>
    <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a0405"/><stop offset=".45" stop-color="#c8141b"/><stop offset=".6" stop-color="#ff6a5c"/><stop offset=".8" stop-color="#8a0a10"/><stop offset="1" stop-color="#1a0203"/></linearGradient>
    ${blur('b3', 3)}${blur('b25', 25)}${blur('b60', 60)}
  </defs>
  <rect width="${W}" height="${H}" fill="#0b0b0c"/>
  <path d="M 0 ${H * 0.35} C ${W * 0.3} ${H * 0.3}, ${W * 0.7} ${H * 0.4}, ${W} ${H * 0.32} L ${W} ${H} L 0 ${H} Z" fill="url(#panel)"/>
  <path d="M 0 ${H * 0.55} C ${W * 0.3} ${H * 0.48}, ${W * 0.7} ${H * 0.6}, ${W} ${H * 0.5}" stroke="#fff" stroke-width="40" fill="none" opacity=".35" filter="url(#b25)"/>
  <path d="M 0 ${H * 0.55} C ${W * 0.3} ${H * 0.48}, ${W * 0.7} ${H * 0.6}, ${W} ${H * 0.5}" stroke="#fff" stroke-width="4" fill="none" opacity=".75" filter="url(#b3)"/>
  <rect x="-100" y="${H * 0.78}" width="${W + 200}" height="60" fill="#e8dcc0" transform="rotate(-6 ${W / 2} ${H * 0.8})"/>
  <rect x="-100" y="${H * 0.78}" width="${W + 200}" height="60" fill="#000" opacity=".08" transform="rotate(-6 ${W / 2} ${H * 0.8})"/>
  <ellipse cx="${W * 0.1}" cy="${H * 0.2}" rx="260" ry="160" fill="#ff5a4a" opacity=".25" filter="url(#b60)"/>
  ${mist}
</svg>`;
}

const S = (o) => studio({ accent: ACC, ...o });
const MARQUE_HEROES = [
  ['porsche',     ['#f6f4ee', '#b7b3a8', '#34322d'], '#D5372E', 'coupe'],
  ['mercedes',    ['#f4f6f8', '#9aa3ad', '#2c3036'], '#A9BCCC', 'saloon'],
  ['maybach',     ['#e9d3a8', '#8a6a3c', '#1d140a'], '#C2A271', 'saloon'],
  ['bmw',         ['#8cc2ff', '#1f63d6', '#06183f'], '#2F7BE0', 'coupe'],
  ['audi',        ['#c9ccd1', '#6e737b', '#1b1d21'], '#E0242E', 'coupe'],
  ['vw',          ['#ffffff', '#d3d8de', '#5d646e'], '#3B8FD9', 'coupe'],
  ['ferrari',     ['#ff6a5c', '#d1141c', '#4a0306'], '#E3262D', 'coupe'],
  ['lamborghini', ['#ffe57d', '#f2b705', '#5c3d00'], '#F2C230', 'coupe'],
  ['mclaren',     ['#ffb760', '#ff7a00', '#6b2a00'], '#FF8000', 'coupe'],
  ['rollsroyce',  ['#4b5c86', '#16213f', '#05080f'], '#CBB27C', 'saloon'],
  ['bentley',     ['#5f9c80', '#1d4d38', '#06150e'], '#4E9C7A', 'saloon'],
];

export const scenes = [
  ...MARQUE_HEROES.map(([id, paint, accent, shape]) => ({
    name: `hero-${id}`, W: 2400, H: 1350, vx: '65%',
    svg: studio({ W: 2400, H: 1350, viewBox: '0 0 1600 900', x: 470, sc: 0.7, paint, accent, shape, mood: ['mercedes', 'bmw', 'vw'].includes(id) ? 'cool' : 'warm' }),
  })),
  // Home & page banners
  { name: 'hero', W: 2400, H: 1350, vx: '65%', svg: S({ W: 2400, H: 1350, viewBox: '0 0 1600 900', x: 470, sc: 0.7, paint: P.orange }) },
  { name: 'hero-alt', W: 2400, H: 1350, vig: 0.5, svg: S({ W: 2400, H: 1350, viewBox: '120 215 920 517', paint: P.orange, mood: 'cool', dust: 260 }) },
  { name: 'banner-silver', W: 2400, H: 900, vig: 0.5, svg: S({ W: 2400, H: 900, viewBox: '0 120 1600 600', x: 560, sc: 0.62, paint: P.silver, mood: 'cool' }) },
  { name: 'banner-black', W: 2400, H: 900, vig: 0.5, svg: S({ W: 2400, H: 900, viewBox: '0 120 1600 600', x: 560, sc: 0.62, paint: P.black }) },
  { name: 'banner-red', W: 2400, H: 900, vig: 0.5, svg: S({ W: 2400, H: 900, viewBox: '0 120 1600 600', x: 560, sc: 0.62, paint: P.red }) },
  { name: 'banner-yellow', W: 2400, H: 900, vig: 0.5, svg: S({ W: 2400, H: 900, viewBox: '0 120 1600 600', x: 560, sc: 0.62, paint: P.yellow }) },
  { name: 'banner-blue', W: 2400, H: 900, vig: 0.5, svg: S({ W: 2400, H: 900, viewBox: '0 120 1600 600', x: 560, sc: 0.62, paint: P.blue, mood: 'cool' }) },
  { name: 'rear-white', W: 1600, H: 1200, vig: 0.5, svg: S({ W: 1600, H: 1200, viewBox: '980 230 600 450', paint: P.white, mood: 'cool' }) },
  // Detail crops
  { name: 'mechanic', W: 1000, H: 1200, vig: 0.4, svg: S({ W: 1000, H: 1200, viewBox: '225 250 390 468', paint: P.orange }) },
  { name: 'tyre', W: 1200, H: 1000, vig: 0.45, svg: S({ W: 1200, H: 1000, viewBox: '1010 300 340 283', paint: P.black }) },
  { name: 'roof', W: 1600, H: 1000, vig: 0.5, svg: S({ W: 1600, H: 1000, viewBox: '600 200 640 400', paint: P.silver, mood: 'cool' }) },
  { name: 'tint', W: 1600, H: 1000, vig: 0.5, svg: S({ W: 1600, H: 1000, viewBox: '660 220 560 350', paint: P.black, mood: 'cool' }) },
  // Abstract service scenes
  { name: 'paint', W: 1000, H: 1200, vig: 0.55, svg: paint(1000, 1200) },
  { name: 'wash', W: 1000, H: 1200, vig: 0.55, svg: paint(1000, 1200, ['#03081a', '#123a8a', '#3f7fe0', '#0d2a66', '#02050f'], ['#9cc4ff', '#04163d', '#d4e6ff', '#020814', '#cfe2ff']) },
  { name: 'interior', W: 1000, H: 1200, vig: 0.5, svg: wheelInterior(1000, 1200) },
  { name: 'engine', W: 1000, H: 1250, vig: 0.5, svg: pistons(1000, 1250) },
  { name: 'cockpit', W: 900, H: 900, vig: 0.5, svg: gauge(900, 900) },
  { name: 'speed', W: 1200, H: 1000, vig: 0.5, svg: gauge(1200, 1000, 100, '100', 'KM/H · RTA LIMIT', 270, 100) },
  { name: 'supercar', W: 2400, H: 1200, vig: 0.4, svg: trails(2400, 1200) },
  { name: 'gears', W: 1200, H: 1000, vig: 0.45, svg: gears(1200, 1000) },
  { name: 'circuit', W: 1200, H: 1000, vig: 0.4, svg: circuit(1200, 1000) },
  { name: 'oil', W: 1200, H: 1000, vig: 0.45, svg: oil(1200, 1000) },
  { name: 'spray', W: 1200, H: 1000, vig: 0.45, svg: spray(1200, 1000) },
];
