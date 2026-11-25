// Supercar studio scene, drawn as SVG. Car coordinates: ground y=570, length x 165..1465.
let seed = 7;
export const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
export const setSeed = (s) => { seed = s; };

const COUPE = `M 175 488 C 162 470, 164 432, 192 418 C 262 398, 382 376, 522 349 C 592 334, 642 316, 682 300 C 770 272, 846 258, 922 256 C 1012 256, 1092 268, 1182 290 C 1272 307, 1362 320, 1442 330 C 1460 334, 1468 352, 1464 382 L 1458 452 C 1455 474, 1442 488, 1422 490 L 1304 490 A 128 128 0 1 0 1056 490 L 544 490 A 128 128 0 1 0 296 490 Z`;

const SALOON = `M 160 488 C 150 462, 154 414, 186 400 C 258 384, 400 370, 566 350 C 626 330, 684 292, 742 264 C 820 230, 900 222, 984 222 C 1064 222, 1132 236, 1204 272 C 1262 298, 1340 310, 1432 318 C 1462 322, 1472 342, 1470 372 L 1464 452 C 1460 474, 1446 488, 1426 490 L 1304 490 A 128 128 0 1 0 1056 490 L 544 490 A 128 128 0 1 0 296 490 Z`;
export const SHAPES = {
  coupe: {
    body: COUPE,
    roof: 'M 200 416 C 380 380, 560 350, 690 304 C 776 276, 852 262, 925 261 C 1010 261, 1095 272, 1180 295 C 1270 312, 1360 324, 1440 334',
    glass: 'M 710 304 C 780 280, 854 268, 924 268 C 1002 268, 1072 280, 1134 298 L 1070 314 C 980 302, 850 302, 744 316 Z',
    glassTop: 'M 710 304 C 780 280, 854 268, 924 268 C 1002 268, 1072 280, 1134 298',
    rim: 'M 1182 290 C 1272 307, 1362 320, 1442 330 C 1460 334, 1468 352, 1464 382 L 1458 452',
    intake: true, head: 'M 206 410 L 318 386 L 312 398 L 214 420 Z', tail: 'M 1436 334 L 1464 346 L 1464 362 L 1440 352 Z',
  },
  saloon: {
    body: SALOON,
    roof: 'M 190 404 C 380 376, 560 356, 700 300 C 800 246, 900 230, 984 230 C 1064 230, 1132 242, 1204 278 C 1262 302, 1340 314, 1440 322',
    glass: 'M 752 272 C 826 240, 904 232, 984 232 C 1062 232, 1126 246, 1188 278 L 1120 300 C 1000 290, 880 290, 790 302 Z',
    glassTop: 'M 752 272 C 826 240, 904 232, 984 232 C 1062 232, 1126 246, 1188 278',
    rim: 'M 1204 272 C 1262 298, 1340 310, 1432 318 C 1462 322, 1472 342, 1470 372 L 1464 452',
    intake: false, head: 'M 170 404 L 290 390 L 288 404 L 176 416 Z', tail: 'M 1444 322 L 1470 330 L 1470 352 L 1446 344 Z',
  },
};
let BODY = COUPE;

function wheel(cx, cy, accent, id) {
  let holes = '';
  for (const [r, n] of [[50, 22], [58, 26]]) {
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + r;
      holes += `<circle cx="${(Math.cos(a) * r).toFixed(1)}" cy="${(Math.sin(a) * r).toFixed(1)}" r="2.1" fill="#0b0b0d"/>`;
    }
  }
  let spokes = '';
  for (let i = 0; i < 5; i++) {
    for (const off of [-7, 7]) {
      spokes += `<g transform="rotate(${i * 72 + off})"><path d="M -4 -18 L 4 -18 L 9 -80 L -9 -80 Z" fill="url(#spoke${id})"/><path d="M -1 -20 L 1 -20 L 3 -79 L 1 -79 Z" fill="#fff" opacity=".35"/></g>`;
    }
  }
  return `
  <g transform="translate(${cx},${cy}) scale(1.12)">
    <circle r="101" fill="#060607"/>
    <circle r="99" fill="none" stroke="#202026" stroke-width="2"/>
    <circle r="93" fill="none" stroke="#141418" stroke-width="6"/>
    <path d="M -70 -70 A 99 99 0 0 1 70 -70" fill="none" stroke="#3a3a42" stroke-width="2" opacity=".7"/>
    <circle r="84" fill="#0d0d10"/>
    <circle r="68" fill="url(#disc)"/>
    <circle r="40" fill="#1a1a1e"/>
    ${holes}
    <path d="M -58 -38 A 70 70 0 0 1 -18 -66 L -14 -50 A 52 52 0 0 0 -44 -28 Z" fill="${accent}"/>
    <path d="M -55 -38 A 66 66 0 0 1 -20 -62" fill="none" stroke="#fff" stroke-width="2" opacity=".45"/>
    ${spokes}
    <circle r="84" fill="none" stroke="url(#lip)" stroke-width="5"/>
    <circle r="17" fill="#1c1c20" stroke="#55555e" stroke-width="2"/>
    <circle r="7" fill="${accent}"/>
  </g>`;
}

export function defs({ paint, accent, shape = 'coupe' }) {
  BODY = SHAPES[shape].body;
  return `
  <linearGradient id="paint" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${paint[0]}"/>
    <stop offset=".45" stop-color="${paint[1]}"/>
    <stop offset=".8" stop-color="${paint[2]}"/>
    <stop offset="1" stop-color="#050505"/>
  </linearGradient>
  <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#2a2f38"/><stop offset=".5" stop-color="#0b0d11"/><stop offset="1" stop-color="#040506"/>
  </linearGradient>
  <radialGradient id="disc">
    <stop offset=".55" stop-color="#3b3b42"/><stop offset=".8" stop-color="#8d8d96"/><stop offset="1" stop-color="#4a4a52"/>
  </radialGradient>
  <linearGradient id="lip" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#f4f4f6"/><stop offset=".5" stop-color="#55555d"/><stop offset="1" stop-color="#bdbdc4"/>
  </linearGradient>
  ${['F', 'R'].map((id) => `<linearGradient id="spoke${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2a2a30"/><stop offset=".5" stop-color="#b9b9c2"/><stop offset="1" stop-color="#3a3a42"/></linearGradient>`).join('')}
  <clipPath id="bodyClip"><path d="${BODY}"/></clipPath>
  <filter id="b2" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2"/></filter>
  <filter id="b6" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
  <filter id="b14" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14"/></filter>
  <filter id="b40" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="40"/></filter>
  <filter id="b90" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="90"/></filter>
  <linearGradient id="reflFade" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#fff" stop-opacity=".38"/><stop offset=".7" stop-color="#fff" stop-opacity="0"/>
  </linearGradient>
  <mask id="reflMask" maskUnits="userSpaceOnUse" x="0" y="570" width="1700" height="400"><rect x="0" y="570" width="1700" height="400" fill="url(#reflFade)"/></mask>
  <radialGradient id="vign" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".85"/></radialGradient>
  <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#141417"/><stop offset="1" stop-color="#050506"/></linearGradient>
  <radialGradient id="wall" cx=".5" cy=".2" r=".8"><stop offset="0" stop-color="#25252b"/><stop offset=".6" stop-color="#0b0b0d"/><stop offset="1" stop-color="#050506"/></radialGradient>`;
}

export function car({ accent, shape = 'coupe' }) {
  const S = SHAPES[shape];
  return `
  <g>
    <!-- body -->
    <path d="${S.body}" fill="url(#paint)"/>
    <g clip-path="url(#bodyClip)">
      <!-- ambient occlusion near arches -->
      <circle cx="420" cy="457" r="160" fill="#000" opacity=".55" filter="url(#b14)"/>
      <circle cx="1180" cy="457" r="160" fill="#000" opacity=".55" filter="url(#b14)"/>
      <!-- sill shadow -->
      <rect x="100" y="452" width="1500" height="60" fill="#000" opacity=".6" filter="url(#b6)"/>
      <!-- side intake -->
      ${S.intake ? `<path d="M 960 352 C 1030 340, 1090 350, 1118 382 L 1112 420 C 1060 400, 1000 395, 950 398 Z" fill="#050506" opacity=".9"/>
      <path d="M 962 354 C 1030 343, 1088 352, 1115 382" fill="none" stroke="#fff" stroke-width="1.5" opacity=".35"/>` : `<path d="M 1000 306 L 1010 488" stroke="#000" stroke-width="2" opacity=".35"/>`}
      <!-- studio reflections -->
      <path d="${S.roof}" fill="none" stroke="#fff" stroke-width="9" opacity=".55" filter="url(#b6)"/>
      <path d="${S.roof}" fill="none" stroke="#fff" stroke-width="1.6" opacity=".9"/>
      <path d="M 300 412 C 600 388, 950 380, 1450 372" fill="none" stroke="#fff" stroke-width="16" opacity=".22" filter="url(#b6)"/>
      <path d="M 320 410 C 620 387, 950 379, 1450 371" fill="none" stroke="#fff" stroke-width="2" opacity=".55"/>
      <path d="M 560 446 C 800 440, 1000 438, 1060 438" fill="none" stroke="#fff" stroke-width="6" opacity=".12" filter="url(#b2)"/>
      <!-- door line -->
      <path d="M 700 318 C 720 380, 730 430, 742 488" fill="none" stroke="#000" stroke-width="2" opacity=".5"/>
      <path d="M 940 300 C 950 360, 952 420, 956 488" fill="none" stroke="#000" stroke-width="2" opacity=".35"/>
      <!-- mirror -->
      <path d="M 690 318 C 700 300, 735 298, 742 312 L 736 326 L 696 330 Z" fill="url(#paint)" stroke="#000" stroke-opacity=".4"/>
    </g>
    <!-- glasshouse -->
    <path d="${S.glass}" fill="url(#glass)"/>
    <path d="M 764 302 L 842 276 L 880 272 L 804 304 Z" fill="#fff" opacity=".08"/>
    <path d="${S.glassTop}" fill="none" stroke="#fff" stroke-width="1.2" opacity=".5"/>
    <!-- headlight -->
    <path d="${S.head}" fill="#f4f7ff"/>
    <path d="${S.head}" fill="#cfe3ff" filter="url(#b6)" opacity=".9"/>
    <ellipse cx="225" cy="410" rx="45" ry="14" fill="#cfe3ff" opacity=".22" filter="url(#b14)"/>
    <!-- front splitter & rear diffuser -->
    <path d="M 168 478 L 300 486 L 300 492 L 172 490 Z" fill="#0a0a0b"/>
    <path d="M 1300 486 L 1450 474 L 1452 486 L 1300 494 Z" fill="#0a0a0b"/>
    <!-- tail light -->
    <path d="${S.tail}" fill="#ff3b2f"/>
    <path d="${S.tail}" fill="#ff3b2f" filter="url(#b6)"/>
    <!-- wheels -->
    ${wheel(420, 457, accent, 'F')}
    ${wheel(1180, 457, accent, 'R')}
  </g>`;
}

export function studio({ W, H, viewBox, x = 0, sc = 1, paint, accent, mood = 'warm', dust = 160, shape = 'coupe' }) {
  const carT = `translate(${x},${570 - 570 * sc}) scale(${sc})`;
  const rim = mood === 'cool' ? '#7fb2ff' : accent;
  let d = '';
  setSeed(11);
  for (let i = 0; i < dust; i++) {
    const x = 200 + rnd() * 1200, y = 20 + rnd() * 520, r = 0.6 + rnd() * 1.8;
    d += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="#fff" opacity="${(0.05 + rnd() * 0.25).toFixed(2)}"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="${viewBox}" preserveAspectRatio="xMidYMid slice">
  <defs>${defs({ paint, accent, shape })}</defs>
  <rect x="-2000" y="-2000" width="6000" height="6000" fill="url(#wall)"/>
  <rect x="-2000" y="-2000" width="6000" height="6000" fill="#050506" opacity=".35"/>
  <!-- overhead softbox -->
  <rect x="380" y="-30" width="900" height="26" rx="13" fill="#fff" opacity=".9" filter="url(#b14)"/>
  <rect x="440" y="-24" width="780" height="10" rx="5" fill="#fff"/>
  <polygon points="380,0 1280,0 1520,620 140,620" fill="url(#beam)" filter="url(#b40)"/>
  <!-- rim light glow behind -->
  <ellipse cx="1500" cy="380" rx="260" ry="200" fill="${rim}" opacity=".45" filter="url(#b90)"/>
  <ellipse cx="120" cy="420" rx="200" ry="160" fill="${rim}" opacity=".25" filter="url(#b90)"/>
  <!-- floor -->
  <rect x="-2000" y="570" width="6000" height="2000" fill="url(#floor)"/>
  <ellipse cx="815" cy="600" rx="760" ry="70" fill="#fff" opacity=".06" filter="url(#b40)"/>
  <rect x="300" y="640" width="1100" height="18" rx="9" fill="#fff" opacity=".07" filter="url(#b14)"/>
  <line x1="-2000" y1="570.5" x2="6000" y2="570.5" stroke="#fff" stroke-opacity=".05"/>
  ${d}
  <g transform="${carT}">
    <!-- reflection -->
    <g mask="url(#reflMask)"><g transform="translate(0,1140) scale(1,-1)">${car({ accent, shape })}</g></g>
    <!-- contact shadow -->
    <ellipse cx="815" cy="574" rx="690" ry="20" fill="#000" opacity=".85" filter="url(#b14)"/>
    <ellipse cx="420" cy="570" rx="100" ry="8" fill="#000" filter="url(#b6)"/>
    <ellipse cx="1180" cy="570" rx="100" ry="8" fill="#000" filter="url(#b6)"/>
    ${car({ accent, shape })}
    <!-- edge rim light from behind -->
    <path d="${SHAPES[shape].rim}" fill="none" stroke="${rim}" stroke-width="3" opacity=".9" filter="url(#b2)"/>
  </g>
  <rect x="-2000" y="-2000" width="6000" height="6000" fill="url(#vign)" opacity=".0"/>
</svg>`;
}
