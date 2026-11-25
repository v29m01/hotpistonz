// Replaces the generated artwork with real premium photos from Unsplash.
// All photos are free for commercial use under the Unsplash License (https://unsplash.com/license).
// Run from the project root:   npm run photos
// The original generated images are backed up to client/public/images-generated/.
import fs from 'node:fs';
import path from 'node:path';

const photos = {
  'hero.jpg':          ['O_gYw3deB6U', 'Mathew Antony — supercar in a garage'],
  'hero-alt.jpg':      ['g21_k1w6CRU', 'Anastasiia Krutota — silver car in a foggy workshop'],
  'banner-silver.jpg': ['DnarAXUWPKM', 'Brendon van Zyl — white supercar'],
  'banner-black.jpg':  ['qtFnOA6NJbs', 'fangfei shi — car headlights at night'],
  'banner-red.jpg':    ['OPt-m0VBR50', 'Zac Nielson — red sports car bonnet'],
  'banner-yellow.jpg': ['i0owkixGoWk', 'Vincent Raine — yellow supercar'],
  'banner-blue.jpg':   ['fSBYj0VMNd4', 'Atul Pandey — car on a wet road at night'],
  'rear-white.jpg':    ['e9uOssEwwjo', 'Richard Ciraulo — white car at night'],
  'mechanic.jpg':      ['0W5Ec5-NIv0', 'Fine Automotive Detailing — mechanic working on a Ferrari'],
  'tyre.jpg':          ['5r7qgI2FHWs', 'CARTIST SARVAM — wheel with red brake calipers'],
  'roof.jpg':          ['iKEHh0bdlYA', 'Mathew Antony — orange supercar'],
  'tint.jpg':          ['Hf3DDEXNdxY', 'luca romano — dark sports car at night'],
  'paint.jpg':         ['i-SLbh6yvw4', "Fine Automotive Detailing — working on a car's paint"],
  'wash.jpg':          ['GKm-XEHF0DM', 'Fine Automotive Detailing — hand washing a car'],
  'interior.jpg':      ['qUkmAWIpc90', 'Fine Automotive Detailing — sports car interior'],
  'engine.jpg':        ['4Pt739lme7E', 'Stefano Zanin — AMG engine bay'],
  'cockpit.jpg':       ['wSIcTOaOedM', "Julian O'hayon — supercar dashboard"],
  'speed.jpg':         ['-kdeKB8UdAA', 'Calvin Kinateder — speedometer'],
  'supercar.jpg':      ['H0_hcEsQmww', 'Timo Volz — highway light trails'],
  'gears.jpg':         ['XP8o9_Arwqg', 'Dextar Vision — mechanic in a workshop'],
  'circuit.jpg':       ['M5lsL2E4ot0', 'Zac Nielson — car electrics'],
  'oil.jpg':           ['20F9ht9RY9s', 'Close-up of an engine'],
  'spray.jpg':         ['bNxnLSf4VMc', 'Fine Automotive Detailing — polishing paintwork'],
  // Home hero image for each marque (shown when the visitor picks that brand)
  'hero-porsche.jpg':     ['3b8Au7UjqeU', 'Grey Porsche 911 on a dark stage'],
  'hero-mercedes.jpg':    ['YSJSs78rw10', 'Samuele Errico Piccarini — black Mercedes-Benz'],
  'hero-maybach.jpg':     ['Lk7MgtCD6ic', 'Agreen — Mercedes luxury car'],
  'hero-bmw.jpg':         ['QxqJ6dL964k', 'BMW M4 in Yas Marina Blue'],
  'hero-audi.jpg':        ['CRNbHjNaljo', 'Red Audi R8'],
  'hero-vw.jpg':          ['3iHW2HLqTXU', 'Hannes Egler — Volkswagen Golf'],
  'hero-ferrari.jpg':     ['lVDXRLVZyP4', 'Juan Rojas — red Ferrari 458 Italia'],
  'hero-lamborghini.jpg': ['i0owkixGoWk', 'Vincent Raine — yellow Lamborghini'],
  'hero-mclaren.jpg':     ['iKEHh0bdlYA', 'Mathew Antony — orange McLaren'],
  'hero-rollsroyce.jpg':  ['aGOePWYd4Ww', 'Nejc Soklič — silver Rolls-Royce in a garage'],
  'hero-bentley.jpg':     ['hLIbbGJD5uA', 'Phil Shaw — Bentley interior'],
};

const root = path.resolve(import.meta.dirname, '..');
const dir = path.join(root, 'client/public/images');
const backup = path.join(root, 'client/public/images-generated');
fs.mkdirSync(backup, { recursive: true });

let ok = 0;
for (const [file, [id, credit]] of Object.entries(photos)) {
  const url = `https://unsplash.com/photos/${id}/download?force=true&w=2000`;
  try {
    const res = await fetch(url, { redirect: 'follow' });
    const type = res.headers.get('content-type') || '';
    if (!res.ok || !type.startsWith('image/')) throw new Error(`HTTP ${res.status} ${type}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const dest = path.join(dir, file);
    if (fs.existsSync(dest) && !fs.existsSync(path.join(backup, file))) fs.copyFileSync(dest, path.join(backup, file));
    fs.writeFileSync(dest, buf);
    ok++;
    console.log(`✅ ${file.padEnd(18)} ${(buf.length / 1024).toFixed(0).padStart(5)} KB  ${credit}`);
  } catch (err) {
    console.log(`⚠️  ${file.padEnd(18)} kept generated image (${err.message})`);
  }
}
console.log(`\n${ok}/${Object.keys(photos).length} premium photos installed. Generated originals are in client/public/images-generated/.`);
