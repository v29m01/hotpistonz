import { studio, rnd, setSeed } from './car.mjs';

const ORANGE = ['#ffb35c', '#f07a1a', '#7a2c06'];
const ACC = '#f28c28';
const svgOpen = (W, H, vb = `0 0 ${W} ${H}`) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="${vb}" preserveAspectRatio="xMidYMid slice">`;
const blur = (id, s) => `<filter id="${id}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${s}"/></filter>`;

/* ---------- Glossy paint with ceramic water beading ---------- */
export function paint(W, H, pal = ['#3a1402','#d9620f','#ff9a3a','#b8480a','#1c0801'], beadTint = ['#ffb066','#7a2a04','#ffcf99','#2a0d00','#ffd9a8']) {
  setSeed(42);
  let beads = '';
  for (let i = 0; i < 230; i++) {
    const x = rnd() * W, y = rnd() * H;
    const r = 4 + Math.pow(rnd(), 2.4) * 30;
    beads += `<g transform="translate(${x.toFixed(0)},${y.toFixed(0)})">
      <ellipse rx="${r}" ry="${(r * 0.92).toFixed(1)}" fill="url(#bead)"/>
      <ellipse rx="${r}" ry="${(r * 0.92).toFixed(1)}" fill="none" stroke="${beadTint[3]}" stroke-opacity=".55" stroke-width="${Math.max(1, r * 0.12).toFixed(1)}"/>
      <ellipse cx="${(-r * 0.35).toFixed(1)}" cy="${(-r * 0.4).toFixed(1)}" rx="${(r * 0.28).toFixed(1)}" ry="${(r * 0.18).toFixed(1)}" fill="#fff" opacity=".95" transform="rotate(-30)"/>
      <ellipse cx="${(r * 0.3).toFixed(1)}" cy="${(r * 0.45).toFixed(1)}" rx="${(r * 0.35).toFixed(1)}" ry="${(r * 0.12).toFixed(1)}" fill="${beadTint[4]}" opacity=".5"/>
    </g>`;
  }
  return `${svgOpen(W, H)}<defs>
    <linearGradient id="pg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${pal[0]}"/><stop offset=".35" stop-color="${pal[1]}"/><stop offset=".55" stop-color="${pal[2]}"/><stop offset=".75" stop-color="${pal[3]}"/><stop offset="1" stop-color="${pal[4]}"/></linearGradient>
    <radialGradient id="bead" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="${beadTint[0]}" stop-opacity=".3"/><stop offset=".7" stop-color="${beadTint[1]}" stop-opacity=".45"/><stop offset="1" stop-color="${beadTint[2]}" stop-opacity=".6"/></radialGradient>
    ${blur('b10', 10)}${blur('b30', 30)}${blur('b3', 3)}
  </defs>
  <rect width="${W}" height="${H}" fill="url(#pg)"/>
  <path d="M -100 ${H * 0.62} C ${W * 0.3} ${H * 0.5}, ${W * 0.7} ${H * 0.58}, ${W + 100} ${H * 0.4}" stroke="#fff" stroke-width="70" fill="none" opacity=".35" filter="url(#b30)"/>
  <path d="M -100 ${H * 0.62} C ${W * 0.3} ${H * 0.5}, ${W * 0.7} ${H * 0.58}, ${W + 100} ${H * 0.4}" stroke="#fff" stroke-width="10" fill="none" opacity=".8" filter="url(#b3)"/>
  <path d="M -100 ${H * 0.3} C ${W * 0.4} ${H * 0.2}, ${W * 0.6} ${H * 0.28}, ${W + 100} ${H * 0.12}" stroke="#fff" stroke-width="30" fill="none" opacity=".18" filter="url(#b10)"/>
  <path d="M ${W * 0.1} ${H + 50} C ${W * 0.3} ${H * 0.7}, ${W * 0.5} ${H * 0.66}, ${W + 50} ${H * 0.75}" stroke="#000" stroke-width="3" fill="none" opacity=".45"/>
  <path d="M ${W * 0.1} ${H + 50} C ${W * 0.3} ${H * 0.7}, ${W * 0.5} ${H * 0.66}, ${W + 50} ${H * 0.75}" stroke="#fff" stroke-width="1.5" fill="none" opacity=".45" transform="translate(0,-4)"/>
  ${beads}
</svg>`;
}

/* ---------- Engine pistons ---------- */
export function pistons(W, H) {
  const pis = [[250, 520], [440, 420], [630, 560], [820, 470]];
  let g = '';
  for (const [cx, top] of pis) {
    const w = 150;
    g += `<g>
      <path d="M ${cx - 22} ${top + 190} L ${cx + 22} ${top + 190} L ${cx + 34} ${top + 560} L ${cx - 34} ${top + 560} Z" fill="url(#rod)"/>
      <circle cx="${cx}" cy="${top + 560}" r="58" fill="url(#rod)"/><circle cx="${cx}" cy="${top + 560}" r="30" fill="#0b0b0d"/>
      <rect x="${cx - w / 2}" y="${top}" width="${w}" height="210" rx="8" fill="url(#cyl)"/>
      <ellipse cx="${cx}" cy="${top}" rx="${w / 2}" ry="18" fill="url(#crown)"/>
      ${[26, 44, 62].map((d) => `<rect x="${cx - w / 2}" y="${top + d}" width="${w}" height="5" fill="#0e0e10" opacity=".85"/><rect x="${cx - w / 2}" y="${top + d + 5}" width="${w}" height="1.5" fill="#fff" opacity=".35"/>`).join('')}
      <circle cx="${cx}" cy="${top + 140}" r="22" fill="#141417"/><circle cx="${cx}" cy="${top + 140}" r="13" fill="url(#crown)"/>
      <rect x="${cx + 22}" y="${top + 6}" width="10" height="200" fill="#fff" opacity=".35" filter="url(#b3)"/>
      <rect x="${cx - w / 2}" y="${top}" width="5" height="210" fill="${ACC}" opacity=".8" filter="url(#b3)"/>
    </g>`;
  }
  return `${svgOpen(W, H)}<defs>
    <linearGradient id="cyl" x1="0" x2="1"><stop offset="0" stop-color="#2a2a30"/><stop offset=".25" stop-color="#9a9aa3"/><stop offset=".45" stop-color="#e9e9ee"/><stop offset=".6" stop-color="#7d7d86"/><stop offset="1" stop-color="#16161a"/></linearGradient>
    <linearGradient id="rod" x1="0" x2="1"><stop offset="0" stop-color="#1c1c20"/><stop offset=".5" stop-color="#6c6c75"/><stop offset="1" stop-color="#141417"/></linearGradient>
    <radialGradient id="crown" cx=".4" cy=".3"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#9c9ca5"/><stop offset="1" stop-color="#3a3a40"/></radialGradient>
    <radialGradient id="bg" cx=".55" cy=".35" r=".8"><stop offset="0" stop-color="#2b2016"/><stop offset=".55" stop-color="#0d0c0c"/><stop offset="1" stop-color="#050505"/></radialGradient>
    ${blur('b3', 3)}${blur('b60', 60)}
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <ellipse cx="${W * 0.78}" cy="${H * 0.28}" rx="260" ry="200" fill="${ACC}" opacity=".35" filter="url(#b60)"/>
  <ellipse cx="${W * 0.15}" cy="${H * 0.8}" rx="200" ry="160" fill="${ACC}" opacity=".18" filter="url(#b60)"/>
  <g transform="translate(-20,40)">${g}</g>
  <rect y="${H * 0.86}" width="${W}" height="${H * 0.14}" fill="#000" opacity=".55" filter="url(#b60)"/>
</svg>`;
}

/* ---------- Tachometer ---------- */
export function gauge(W, H, value = 6.4, speed = '248', unitsTop = 'RPM × 1000', maxV = 9, redFrom = 7.5) {
  const cx = W / 2, cy = H / 2 + 20, R = 330;
  const a0 = 135, a1 = 405;
  const ang = (v) => ((a0 + (a1 - a0) * (v / maxV)) * Math.PI) / 180;
  let ticks = '';
  for (let v = 0; v <= maxV + 0.001; v += maxV / 36) {
    const major = Math.abs(v / (maxV / 9) - Math.round(v / (maxV / 9))) < 0.01, a = ang(v);
    const r1 = R - (major ? 46 : 26), r2 = R - 8;
    const red = v >= redFrom - 0.001;
    ticks += `<line x1="${cx + Math.cos(a) * r1}" y1="${cy + Math.sin(a) * r1}" x2="${cx + Math.cos(a) * r2}" y2="${cy + Math.sin(a) * r2}" stroke="${red ? ACC : '#f2f1ee'}" stroke-width="${major ? 6 : 2.5}" stroke-linecap="round"/>`;
    if (major) ticks += `<text x="${cx + Math.cos(a) * (R - 92)}" y="${cy + Math.sin(a) * (R - 92) + 14}" fill="${red ? ACC : '#f2f1ee'}" font-family="Arial Narrow, Arial" font-weight="700" font-size="42" text-anchor="middle">${Math.round(v)}</text>`;
  }
  const ra = ang(redFrom), rb = ang(maxV);
  const arc = `M ${cx + Math.cos(ra) * (R + 14)} ${cy + Math.sin(ra) * (R + 14)} A ${R + 14} ${R + 14} 0 0 1 ${cx + Math.cos(rb) * (R + 14)} ${cy + Math.sin(rb) * (R + 14)}`;
  const na = ang(value);
  const needle = `M ${cx + Math.cos(na + Math.PI / 2) * 9} ${cy + Math.sin(na + Math.PI / 2) * 9} L ${cx + Math.cos(na) * (R - 20)} ${cy + Math.sin(na) * (R - 20)} L ${cx + Math.cos(na - Math.PI / 2) * 9} ${cy + Math.sin(na - Math.PI / 2) * 9} Z`;
  return `${svgOpen(W, H)}<defs>
    <pattern id="cf" width="16" height="16" patternUnits="userSpaceOnUse">
      <rect width="16" height="16" fill="#0c0c0e"/><rect width="8" height="8" fill="#1b1b1f"/><rect x="8" y="8" width="8" height="8" fill="#1b1b1f"/>
      <rect width="8" height="2" fill="#26262c"/><rect x="8" y="8" width="8" height="2" fill="#26262c"/>
    </pattern>
    <radialGradient id="face" cx=".5" cy=".4"><stop offset="0" stop-color="#1d1d22"/><stop offset="1" stop-color="#060607"/></radialGradient>
    <linearGradient id="bezel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4f4f6"/><stop offset=".4" stop-color="#55555d"/><stop offset=".7" stop-color="#cfcfd6"/><stop offset="1" stop-color="#2a2a30"/></linearGradient>
    ${blur('b4', 4)}${blur('b20', 20)}${blur('b60', 60)}
  </defs>
  <rect width="${W}" height="${H}" fill="url(#cf)"/>
  <rect width="${W}" height="${H}" fill="#000" opacity=".35"/>
  <circle cx="${cx}" cy="${cy}" r="${R + 60}" fill="${ACC}" opacity=".18" filter="url(#b60)"/>
  <circle cx="${cx}" cy="${cy}" r="${R + 34}" fill="url(#bezel)"/>
  <circle cx="${cx}" cy="${cy}" r="${R + 22}" fill="url(#face)"/>
  <path d="${arc}" stroke="${ACC}" stroke-width="10" fill="none"/>
  <path d="${arc}" stroke="${ACC}" stroke-width="16" fill="none" filter="url(#b4)" opacity=".8"/>
  ${ticks}
  <text x="${cx}" y="${cy + 150}" fill="#f2f1ee" font-family="Arial Narrow, Arial" font-weight="700" font-size="84" text-anchor="middle">${speed}</text>
  <text x="${cx}" y="${cy + 190}" fill="#9b9a96" font-family="Arial" font-size="24" letter-spacing="6" text-anchor="middle">KM/H</text>
  <text x="${cx}" y="${cy - 110}" fill="#9b9a96" font-family="Arial" font-size="20" letter-spacing="6" text-anchor="middle">${unitsTop}</text>
  <path d="${needle}" fill="${ACC}" filter="url(#b4)"/>
  <path d="${needle}" fill="#ffb067"/>
  <circle cx="${cx}" cy="${cy}" r="30" fill="#1a1a1e" stroke="url(#bezel)" stroke-width="4"/>
  <ellipse cx="${cx - 120}" cy="${cy - 200}" rx="200" ry="70" fill="#fff" opacity=".06" transform="rotate(-25 ${cx} ${cy})"/>
</svg>`;
}

/* ---------- Steering wheel (Alcantara + stitching) ---------- */
export function wheelInterior(W, H) {
  const cx = W * 0.62, cy = H * 0.72, R = 560;
  return `${svgOpen(W, H)}<defs>
    <filter id="alc"><feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="3"/><feColorMatrix values="0 0 0 0 .1  0 0 0 0 .1  0 0 0 0 .11  0 0 0 .55 0"/><feComposite in2="SourceGraphic" operator="in"/></filter>
    <radialGradient id="bg" cx=".3" cy=".25" r=".9"><stop offset="0" stop-color="#2a1d12"/><stop offset=".5" stop-color="#0c0b0b"/><stop offset="1" stop-color="#040404"/></radialGradient>
    <linearGradient id="rim" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a3a40"/><stop offset=".5" stop-color="#16161a"/><stop offset="1" stop-color="#050506"/></linearGradient>
    <linearGradient id="carbon" x1="0" x2="1"><stop offset="0" stop-color="#1b1b20"/><stop offset=".5" stop-color="#4a4a52"/><stop offset="1" stop-color="#121215"/></linearGradient>
    ${blur('b3', 3)}${blur('b50', 50)}
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <ellipse cx="${W * 0.2}" cy="${H * 0.2}" rx="300" ry="220" fill="${ACC}" opacity=".25" filter="url(#b50)"/>
  <rect x="-20" y="${H * 0.12}" width="${W + 40}" height="6" fill="${ACC}" opacity=".9" filter="url(#b3)"/>
  <circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="url(#rim)" stroke-width="120"/>
  <circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#fff" stroke-width="120" filter="url(#alc)"/>
  <circle cx="${cx}" cy="${cy}" r="${R - 38}" fill="none" stroke="${ACC}" stroke-width="3" stroke-dasharray="10 9"/>
  <circle cx="${cx}" cy="${cy}" r="${R + 38}" fill="none" stroke="${ACC}" stroke-width="3" stroke-dasharray="10 9"/>
  <circle cx="${cx}" cy="${cy}" r="${R + 48}" fill="none" stroke="#fff" stroke-width="3" opacity=".25" filter="url(#b3)"/>
  <rect x="${cx - 18}" y="${cy - R - 62}" width="36" height="124" fill="${ACC}"/>
  <path d="M ${cx - R + 40} ${cy + 10} C ${cx - 300} ${cy - 30}, ${cx - 200} ${cy - 60}, ${cx - 140} ${cy - 40} L ${cx - 140} ${cy + 80} C ${cx - 220} ${cy + 80}, ${cx - 340} ${cy + 90}, ${cx - R + 40} ${cy + 110} Z" fill="url(#carbon)"/>
  <circle cx="${cx}" cy="${cy}" r="170" fill="#0e0e11" stroke="url(#carbon)" stroke-width="18"/>
  <circle cx="${cx}" cy="${cy}" r="70" fill="#151518" stroke="${ACC}" stroke-width="3"/>
  <path d="M ${cx - 420} ${cy - 360} L ${cx - 300} ${cy - 420} L ${cx - 260} ${cy - 330} L ${cx - 380} ${cy - 280} Z" fill="url(#carbon)" opacity=".9"/>
  <circle cx="${cx - 260}" cy="${cy + 40}" r="16" fill="${ACC}"/><circle cx="${cx - 260}" cy="${cy + 40}" r="26" fill="${ACC}" opacity=".5" filter="url(#b3)"/>
</svg>`;
}

/* ---------- Light trails ---------- */
export function trails(W, H) {
  setSeed(5);
  const vx = W * 0.5, vy = H * 0.46;
  let lines = '';
  for (let i = 0; i < 70; i++) {
    const side = i % 2 ? 1 : -1;
    const spread = 0.2 + rnd() * 1.1;
    const ex = vx + side * W * spread, ey = H + rnd() * H * 0.6 - H * 0.1 * rnd();
    const c = rnd() < 0.55 ? '#ffb24d' : rnd() < 0.6 ? '#ffffff' : '#ff3b2f';
    const w = 1 + rnd() * 4;
    const d = `M ${vx + side * 10} ${vy} Q ${vx + side * W * spread * 0.3} ${vy + 40}, ${ex} ${ey}`;
    lines += `<path d="${d}" stroke="${c}" stroke-width="${w * 4}" fill="none" opacity=".25" filter="url(#b6)"/><path d="${d}" stroke="${c}" stroke-width="${w}" fill="none" opacity="${0.5 + rnd() * 0.5}"/>`;
  }
  let bokeh = '';
  for (let i = 0; i < 60; i++) {
    const x = rnd() * W, y = rnd() * H * 0.5, r = 6 + rnd() * 30;
    bokeh += `<circle cx="${x}" cy="${y}" r="${r}" fill="${rnd() < 0.5 ? '#ffb24d' : '#9fc3ff'}" opacity="${0.05 + rnd() * 0.15}" filter="url(#b3)"/>`;
  }
  return `${svgOpen(W, H)}<defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#05060a"/><stop offset=".46" stop-color="#151017"/><stop offset="1" stop-color="#050505"/></linearGradient>
    ${blur('b3', 3)}${blur('b6', 6)}${blur('b80', 80)}
  </defs>
  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  ${bokeh}
  <ellipse cx="${vx}" cy="${vy}" rx="${W * 0.3}" ry="${H * 0.12}" fill="#ffb24d" opacity=".25" filter="url(#b80)"/>
  ${lines}
</svg>`;
}

export const scenes = [
  { name: 'hero', W: 2400, H: 1350, vx: '65%',
    svg: studio({ W: 2400, H: 1350, viewBox: '0 0 1600 900', x: 470, sc: 0.7, paint: ORANGE, accent: ACC }) },
  { name: 'hero-alt', W: 2400, H: 1350, vig: 0.5,
    svg: studio({ W: 2400, H: 1350, viewBox: '120 215 920 517', paint: ORANGE, accent: ACC, mood: 'cool', dust: 260 }) },
  { name: 'mechanic', W: 1000, H: 1200, vig: 0.4,
    svg: studio({ W: 1000, H: 1200, viewBox: '225 250 390 468', paint: ORANGE, accent: ACC }) },
  { name: 'paint', W: 1000, H: 1200, vig: 0.55, svg: paint(1000, 1200) },
  { name: 'interior', W: 1000, H: 1200, vig: 0.5, svg: wheelInterior(1000, 1200) },
  { name: 'engine', W: 1000, H: 1250, vig: 0.5, svg: pistons(1000, 1250) },
  { name: 'cockpit', W: 900, H: 900, vig: 0.5, svg: gauge(900, 900) },
  { name: 'supercar', W: 2400, H: 1200, vig: 0.4, svg: trails(2400, 1200) },
];
