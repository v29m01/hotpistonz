// Brand Specialist and Area We Cover pages.
// The live site only links these menu items to WhatsApp; these pages are new.
// Edit the text freely — every page is built from this file.

export const slugify = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// image: built-in photo used until a photo is uploaded to the "brand-<slug>" slot in the dashboard.
export const specialistBrands = [
  {
    name: 'Audi', group: 'German Cars', origin: 'Ingolstadt, Germany', image: 'spec-audi', tiles: 'german', theme: 'audi',
    models: ['A3', 'A4', 'A6', 'A8', 'Q5', 'Q7', 'Q8', 'RS models', 'e-tron GT'],
    intro: 'From everyday A4s to RS models and the electric e-tron GT, Audis combine quattro all-wheel drive, dual-clutch and automatic gearboxes and dense on-board electronics. Our technicians service and repair them with the right diagnostic tools and quality parts.',
    focus: [
      ['quattro & drivetrain', 'Inspection and servicing of all-wheel-drive components, differentials and drivetrain fluids.'],
      ['S tronic & tiptronic gearboxes', 'Fluid service, diagnostics and repair for Audi dual-clutch and automatic transmissions.'],
      ['Electronics & MMI', 'Fault-code diagnostics for warning lights, sensors, infotainment and comfort systems.'],
    ],
  },
  {
    name: 'BMW', group: 'German Cars', origin: 'Munich, Germany', image: 'spec-bmw', tiles: 'german', theme: 'bmw',
    models: ['1 Series', '3 Series', '5 Series', '7 Series', 'X3', 'X5', 'X6', 'X7', 'M models'],
    intro: 'BMWs are built for driving, and they reward careful maintenance. From 3 Series saloons to X models and M cars, we look after engines, gearboxes, cooling systems and electronics so your BMW keeps driving the way it should.',
    focus: [
      ['Engine & cooling', 'Oil leaks, cooling-system checks and engine diagnostics — common needs in the UAE heat.'],
      ['Automatic gearboxes', 'Transmission fluid service, diagnostics and repair for smooth, responsive shifting.'],
      ['Electrical & coding', 'Diagnostics for warning lights, batteries, sensors and electrical faults.'],
    ],
  },
  {
    name: 'Volkswagen', group: 'German Cars', origin: 'Wolfsburg, Germany', image: 'hero', tiles: 'german', theme: 'vw',
    models: ['Golf', 'Golf GTI', 'Golf R', 'Passat', 'Jetta', 'Tiguan', 'Touareg', 'Teramont'],
    intro: 'From the Golf GTI and Golf R to the Tiguan, Touareg and Teramont, we provide complete Volkswagen servicing and repairs — routine maintenance, DSG and automatic gearbox work, electrical diagnostics and more.',
    focus: [
      ['DSG gearbox care', 'Fluid service and diagnostics for Volkswagen dual-clutch gearboxes.'],
      ['TSI engines', 'Servicing, oil and filter changes and diagnostics for turbocharged petrol engines.'],
      ['Electrical diagnostics', 'Fault finding for warning lights, sensors and comfort electronics.'],
    ],
  },
  {
    name: 'Mercedes', group: 'German Cars', origin: 'Stuttgart, Germany', image: 'spec-workshop', tiles: 'german', theme: 'mercedes',
    models: ['A-Class', 'C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'GLS', 'G-Class', 'AMG'],
    intro: 'Mercedes-Benz cars set the standard for comfort and refinement. We service and repair the full range, from the A-Class to the S-Class, G-Class and AMG models — engines, transmissions, suspension and electronics.',
    focus: [
      ['Scheduled servicing', 'Oil, filters and inspections to keep your Mercedes running smoothly.'],
      ['Air suspension & ride', 'Diagnostics and repair for suspension and ride-comfort systems.'],
      ['Electronics', 'Diagnostics for warning messages, sensors, batteries and comfort systems.'],
    ],
  },
  {
    name: 'Porsche', group: 'German Cars', origin: 'Stuttgart, Germany', image: 'spec-porsche', tiles: 'sport', theme: 'porsche',
    models: ['911', '718 Boxster', '718 Cayman', 'Cayenne', 'Macan', 'Panamera', 'Taycan'],
    intro: 'Porsches are engineered for performance, and they need technicians who treat them that way. We service and repair the 911, 718, Cayenne, Macan, Panamera and Taycan with care and precision.',
    focus: [
      ['PDK & gearboxes', 'Fluid service and diagnostics for Porsche PDK and automatic transmissions.'],
      ['Brakes & tyres', 'Inspection and replacement of high-performance brakes and tyres.'],
      ['Engine & cooling', 'Servicing, leak checks and cooling-system care for high-performance engines.'],
    ],
  },
  {
    name: 'Maybach', group: 'German Cars', origin: 'Sindelfingen, Germany', image: 'tint', tiles: 'luxury', theme: 'rollsroyce',
    models: ['Mercedes-Maybach S-Class', 'Mercedes-Maybach GLS'],
    intro: 'Mercedes-Maybach models are the most luxurious cars in the Mercedes family. We look after them with the attention to detail they deserve — servicing, diagnostics, suspension and interior care.',
    focus: [
      ['Discreet, careful handling', 'Pick-up and drop-off, and careful handling from collection to return.'],
      ['Comfort & suspension systems', 'Diagnostics for air suspension and comfort electronics.'],
      ['Interior & detailing', 'Interior cleaning and detailing to keep the cabin immaculate.'],
    ],
  },
  {
    name: 'Ford', group: 'German Cars', origin: 'Ford — Cologne & Dearborn', image: 'hero-ford',
    models: ['F-150', 'F-150 Raptor', 'Ranger', 'Explorer', 'Expedition', 'Edge', 'Mustang'],
    intro: 'From the F-150 Raptor and Ranger to the Explorer, Expedition and Mustang, we service and repair Ford trucks, SUVs and performance cars — including vehicles used hard in desert and fleet work.',
    focus: [
      ['Trucks & 4x4', 'Suspension, drivetrain and tyre work for pickups and off-road vehicles.'],
      ['Fleet maintenance', 'Scheduled servicing to keep work vehicles on the road.'],
      ['Engine & transmission', 'Servicing, diagnostics and repair for EcoBoost and V8 engines and automatic gearboxes.'],
    ],
  },
  {
    name: 'Opel', group: 'German Cars', origin: 'Rüsselsheim, Germany', image: 'engine',
    models: ['Corsa', 'Astra', 'Insignia', 'Grandland', 'Crossland'],
    intro: 'We provide reliable, good-value servicing and repairs for Opel cars — from routine oil changes and inspections to engine, gearbox and electrical work.',
    focus: [
      ['Routine servicing', 'Oil, filters and inspections at sensible prices.'],
      ['Engine & gearbox', 'Diagnostics and repair for engines and manual or automatic gearboxes.'],
      ['Air conditioning & electrics', 'Electrical fault finding to keep your Opel comfortable and reliable.'],
    ],
  },
  {
    name: 'Abt Sportsline', group: 'German Cars', origin: 'Kempten, Germany', image: 'hero-audi',
    models: ['Abt-tuned Audi models', 'Abt-tuned Volkswagen models'],
    intro: 'Abt Sportsline builds performance upgrades for Audi and Volkswagen models. Tuned cars need technicians who understand both the base car and the extra performance — we service and maintain them with that in mind.',
    focus: [
      ['Performance servicing', 'Servicing suited to higher-output engines and upgraded components.'],
      ['Brakes, wheels & tyres', 'Inspection and replacement of performance brakes and tyres.'],
      ['Diagnostics', 'Fault finding on tuned engines, gearboxes and electronics.'],
    ],
  },
  {
    name: 'Alpina', group: 'German Cars', origin: 'Buchloe, Germany', image: 'hero-bmw',
    models: ['B3', 'B4', 'B5', 'B7', 'B8', 'XB7', 'XD3'],
    intro: 'Alpina cars are hand-finished, high-performance models based on BMWs. We service and repair them with the same care as the rest of our German and luxury cars — engines, gearboxes, suspension and electronics.',
    focus: [
      ['BMW-based mechanicals', 'Servicing and repair for Alpina engines and automatic gearboxes.'],
      ['Ride & handling', 'Suspension, brake and tyre inspection for comfort at speed.'],
      ['Interior care', 'Detailing to protect Alpina leather and trim.'],
    ],
  },
  {
    name: 'Isdera', group: 'German Cars', origin: 'Leonberg, Germany', image: 'cockpit',
    models: ['Hand-built Isdera sports cars'],
    intro: 'Isdera builds rare, hand-made German sports cars. Cars like these need patience and careful handling — talk to us about servicing, inspection and maintenance for your Isdera.',
    focus: [
      ['Careful inspection', 'A thorough check before any work, with a detailed quote.'],
      ['Mechanical servicing', 'Fluids, brakes and mechanical maintenance.'],
      ['Detailing & protection', 'Cleaning, polishing and protection for rare paintwork.'],
    ],
  },
  {
    name: 'Borgward', group: 'German Cars', origin: 'Germany', image: 'hero-alt',
    models: ['BX5', 'BX7'],
    intro: 'We service and repair Borgward SUVs, including the BX5 and BX7 — routine maintenance, diagnostics, brakes, tyres and air conditioning.',
    focus: [
      ['Routine servicing', 'Oil, filters and inspections to keep your Borgward reliable.'],
      ['Diagnostics', 'Fault finding for warning lights and electrical issues.'],
      ['Brakes & tyres', 'Inspection and replacement for safe everyday driving.'],
    ],
  },
  {
    name: 'Lamborghini', group: 'Luxury & Sports', origin: "Sant'Agata Bolognese, Italy", image: 'spec-lamborghini', tiles: 'sport', theme: 'lamborghini',
    models: ['Urus', 'Huracán', 'Revuelto', 'Aventador'],
    intro: 'From the Urus to the Huracán and Aventador, Lamborghinis combine high-revving engines, all-wheel drive and advanced electronics. We service them with the precision and care these cars demand.',
    focus: [
      ['Performance servicing', 'Fluids, filters and inspections for high-output V8, V10 and V12 engines.'],
      ['Brakes & tyres', 'Inspection and replacement of high-performance brakes and tyres.'],
      ['Diagnostics', 'Fault finding on gearboxes, drive systems and electronics.'],
    ],
  },
  {
    name: 'Ferrari', group: 'Luxury & Sports', origin: 'Maranello, Italy', image: 'spec-ferrari', tiles: 'sport', theme: 'ferrari',
    models: ['Roma', 'Portofino', '296 GTB', 'F8', 'SF90', 'Purosangue', 'Classic Ferraris'],
    intro: 'Modern or classic, a Ferrari deserves technicians who share the passion. We look after engines, gearboxes, brakes and electronics so your Ferrari performs as it should.',
    focus: [
      ['Engine & cooling', 'Servicing, leak checks and cooling-system care for high-performance engines.'],
      ['Gearbox & driveline', 'Fluid service and diagnostics for dual-clutch and manual gearboxes.'],
      ['Paint & detailing', 'Paint correction, detailing and protection for your Ferrari\'s finish.'],
    ],
  },
  {
    name: 'McLaren', group: 'Luxury & Sports', origin: 'Woking, UK', image: 'spec-mclaren', tiles: 'sport', theme: 'mclaren',
    models: ['GT', 'Artura', '570S', '600LT', '720S', '750S'],
    intro: 'McLarens are engineered like race cars for the road. We service and maintain them with care — engines, gearboxes, brakes, suspension and electronics.',
    focus: [
      ['Performance servicing', 'Scheduled servicing for twin-turbo V8 and hybrid powertrains.'],
      ['Brakes & suspension', 'Inspection of high-performance brakes, tyres and suspension.'],
      ['Electronic diagnostics', 'Fault finding for warning lights, sensors and electronics.'],
    ],
  },
  {
    name: 'Rolls-Royce', group: 'Luxury & Sports', origin: 'Goodwood, UK', image: 'spec-rollsroyce', tiles: 'luxury', theme: 'rollsroyce',
    models: ['Phantom', 'Ghost', 'Cullinan', 'Wraith', 'Dawn', 'Spectre'],
    intro: 'A Rolls-Royce is built for effortless comfort. We look after the Phantom, Ghost, Cullinan and more with discreet collection, careful handling and attention to every detail.',
    focus: [
      ['Discreet collection', 'Pick-up and drop-off with careful handling from start to finish.'],
      ['Ride & comfort systems', 'Diagnostics for air suspension and comfort electronics.'],
      ['Interior & coachwork care', 'Detailing, paint and body care to keep your car immaculate.'],
    ],
  },
  {
    name: 'Bugatti', group: 'Luxury & Sports', origin: 'Molsheim, France', image: 'spec-bugatti', tiles: 'sport', theme: 'bugatti',
    models: ['Chiron', 'Veyron', 'Divo'],
    intro: 'Bugattis are among the most exclusive cars on the road. Talk to us about careful inspection, detailing, paint protection and maintenance support for your Bugatti.',
    focus: [
      ['Careful inspection', 'A thorough check before any work, with a detailed quote.'],
      ['Detailing & protection', 'Cleaning, polishing and paint protection for rare finishes.'],
      ['Tyres & brakes', 'Inspection of tyres and brakes for safe driving.'],
    ],
  },
  {
    name: 'Luxury Cars', group: 'Luxury & Sports', origin: 'Every luxury marque', image: 'spec-rollsroyce', tiles: 'luxury', theme: 'rollsroyce',
    models: ['Rolls-Royce', 'Bentley', 'Mercedes-Maybach', 'Range Rover', 'Maserati', 'Lexus', 'Jaguar'],
    intro: 'We specialise in all car repairs, including luxury car repairs. Bentley, Rolls-Royce, Range Rover, Maserati, Lexus, Jaguar and more are serviced with the care, tools and attention to detail luxury cars need.',
    focus: [
      ['Careful handling', 'Pick-up and drop-off, with your car treated with care at every step.'],
      ['Complete servicing', 'Engine, transmission, suspension, electrical and air-conditioning work under one roof.'],
      ['Detailing & paint', 'Interior and exterior detailing, paint correction, and denting and painting.'],
    ],
  },
  {
    name: 'Sports Cars', group: 'Luxury & Sports', origin: 'Performance cars', image: 'spec-lamborghini', tiles: 'sport', theme: 'lamborghini',
    models: ['Porsche', 'Ferrari', 'Lamborghini', 'McLaren', 'Mercedes-AMG', 'BMW M', 'Audi RS'],
    intro: 'From Porsche and AMG to Ferrari, Lamborghini and McLaren, sports cars need precise servicing. We look after engines, gearboxes, brakes and tyres so your car performs as it should.',
    focus: [
      ['Performance servicing', 'Fluids, filters and inspections for high-output engines.'],
      ['Brakes & tyres', 'High-performance brake and tyre inspection and replacement.'],
      ['Speed limiter & electronics', 'Speed limiter services and electronic diagnostics.'],
    ],
  },
].map((b) => ({ ...b, slug: slugify(b.name) }));

export const findBrand = (slug) => specialistBrands.find((b) => b.slug === slug);

// Areas: the order and names follow the live site's "Area We Cover" menu.
export const areaPages = [
  { name: 'Dubai Investment Park', note: 'Our workshop is in Dubai Investment Park, so you can drive in or we can collect your car from home or work.', home: true },
  { name: 'Discovery Garden', note: 'Car owners in Discovery Gardens can book a pick-up from their building and have the car returned when the work is done.' },
  { name: 'Green Community', note: 'Green Community is right next door to our Dubai Investment Park workshop — quick collection and return.' },
  { name: 'Al Furjan', note: 'For residents of Al Furjan, we collect your car, carry out the work at our workshop and bring it back to you.' },
  { name: 'Jebel Ali', note: 'We serve Jebel Ali homes and businesses, including company vehicles and fleets.' },
  { name: 'Jumeirah Village Circle', note: 'JVC residents can book a pick-up and drop-off — no need to take time out of your day.' },
  { name: 'Jumeirah Village Triangle', note: 'JVT residents can book a pick-up and drop-off from their villa or building.' },
  { name: 'Al Barsha', note: 'We collect cars from across Al Barsha and return them once the service or repair is complete.' },
  { name: 'Dubai Production City', note: 'For residents and businesses in Dubai Production City, we offer collection and delivery for every service.' },
  { name: 'Jebel Ali Hills', note: 'Jebel Ali Hills residents can book collection and delivery for servicing and repairs.' },
  { name: 'DAMAC Hills', note: 'We collect cars from DAMAC Hills, carry out the work at our workshop and return them to your door.' },
  { name: 'Emirates Hills', note: 'Emirates Hills residents can count on discreet collection and careful handling of luxury and performance cars.' },
  { name: 'Dubai Industrial City', note: 'We serve businesses and fleets in Dubai Industrial City, as well as private car owners.' },
  { name: 'Dubai Media City', note: 'Working in Dubai Media City? We can collect your car from the office and return it when it is ready.' },
  { name: 'Dubai Logistics City', note: 'We look after company vehicles and fleets in Dubai Logistics City, as well as private cars.' },
  { name: 'Dubai Marina', note: 'Dubai Marina residents can book collection and delivery from their building for every service.' },
].map((a) => ({ ...a, slug: slugify(a.name) }));

export const findArea = (slug) => areaPages.find((a) => a.slug === slug);

export const pickupSteps = [
  ['Book', 'Call, WhatsApp or book online and tell us about your car.'],
  ['We collect', 'Our team picks up your car from your home or office.'],
  ['Inspect & quote', 'We inspect the car and explain the work and the price before we start.'],
  ['We return it', 'Once the work is done, we bring your car back to you.'],
];

export const areaFaqs = (area) => [
  [`Do you offer pick-up and drop-off in ${area}?`, `Yes. ${area} is one of the areas we cover. Call or WhatsApp us to arrange a collection time.`],
  ['Are you open on weekends and holidays?', 'Yes. We are available 24/7, including holidays.'],
  ['Will I get a quote before any work begins?', 'Yes. We inspect the car and explain the work needed and the cost before we start.'],
  ['Which cars do you service?', 'All cars, including German, luxury and sports cars — Mercedes, BMW, Audi, Porsche, Range Rover, Bentley and more.'],
];

export const brandFaqs = (brand) => [
  [`Do you service and repair ${brand}?`, `Yes. Our technicians service and repair ${brand}, from routine maintenance to engine, transmission and electrical work.`],
  ['Can you collect my car?', 'Yes. We offer pick-up and drop-off across the areas we cover in Dubai.'],
  ['Will I get a quote before any work begins?', 'Yes. We inspect the car and explain the work needed and the cost before we start.'],
  ['Are you available on weekends and holidays?', 'Yes. We are available 24/7, including holidays.'],
];

// ---- Brand page look: one colour scheme per marque (see .bp in global.css) ----
// mode: hero/section tone · tiles: outline | card | solid | soft | glass
export const brandThemes = {
  default: { mode: 'dark', accent: '#F28C28', onAccent: '#111', title: '#fff', ground: '#0E0E10', section: '#fff', tiles: 'card', strip: '#141416' },
  audi: { mode: 'light', accent: '#BB0A30', onAccent: '#fff', title: '#fff', ground: '#111', section: '#fff', tiles: 'outline', strip: '#1A1A1A' },
  bmw: { mode: 'light', accent: '#1C69D4', onAccent: '#fff', title: '#fff', titleAccent: '#5BA4FF', ground: '#101418', section: '#fff', tiles: 'card', strip: '#262A30' },
  mercedes: { mode: 'light', accent: '#2C8C99', onAccent: '#fff', title: '#fff', ground: '#0F1414', section: '#fff', tiles: 'card', strip: '#1C2526' },
  vw: { mode: 'light', accent: '#0F4C9C', onAccent: '#fff', title: '#fff', ground: '#0B1426', section: '#fff', tiles: 'card', strip: '#0B1E3F' },
  porsche: { mode: 'dark', accent: '#D5001C', onAccent: '#fff', title: '#E9ECF2', ground: '#070B14', section: '#0B1220', tiles: 'glass', line: '#2E4A78', strip: '#0E1A33' },
  lamborghini: { mode: 'dark', accent: '#FFC000', onAccent: '#111', title: '#FFC000', ground: '#000', section: '#fff', tiles: 'solid', strip: '#000' },
  ferrari: { mode: 'dark', accent: '#E10600', onAccent: '#fff', icon: '#FFD200', title: '#FFD200', ground: '#0A0000', section: '#fff', tiles: 'solid', strip: '#0A0A0A', nav: '#C40000' },
  mclaren: { mode: 'dark', accent: '#FF8000', onAccent: '#111', title: '#FF9A2E', ground: '#060606', section: '#fff', tiles: 'solid', strip: '#0A0A0A' },
  rollsroyce: { mode: 'dark', accent: '#C8A464', onAccent: '#141A33', title: '#E2C98F', ground: '#0E1226', section: '#fff', tiles: 'soft', soft: '#F4ECDD', strip: '#141A33' },
  bugatti: { mode: 'dark', accent: '#1F6FD1', onAccent: '#fff', title: '#E9EEF8', ground: '#050A16', section: '#070D1C', tiles: 'glass', line: '#244A86', strip: '#0B1530' },
};

// Six service tiles per brand type. Each links to a real service page.
export const brandTiles = {
  german: [
    ['Engine Service', 'engine', 'Diagnostics, maintenance and repair to keep your engine healthy.', 'auto-mechanical-services'],
    ['Engine Oil Change', 'oil', 'Quality oil and filter changes to the right specification.', 'auto-engine-oil-change-service-in-dubai'],
    ['Transmission Service', 'gear', 'Fluid service and repair for smooth, responsive shifting.', 'auto-transmission-service-gear-oil-filter-gear-oil-chamber-gasket'],
    ['Suspension & Steering', 'shock', 'Checks and repairs for comfort, control and alignment.', 'auto-mechanical-services'],
    ['AC & Cooling', 'snow', 'Cooling-system and climate checks for the UAE heat.', 'auto-mechanical-services'],
    ['Electrical & Diagnostics', 'chip', 'Computer diagnostics for warning lights and electronics.', 'auto-electrical-services'],
  ],
  sport: [
    ['Engine & Performance', 'engine', 'Servicing and diagnostics for high-output engines.', 'auto-mechanical-services'],
    ['Body & Paintwork', 'body', 'Denting, painting and paint correction to a high finish.', 'auto-denting-painting'],
    ['Brake System', 'brake', 'Inspection and replacement of high-performance brakes.', 'auto-mechanical-services'],
    ['Transmission & Drive', 'gear', 'Gearbox diagnostics, fluid service and overhauls.', 'auto-transmission-overhauling'],
    ['Suspension & Dynamics', 'shock', 'Suspension, alignment and tyre care for precise handling.', 'auto-tire-service'],
    ['Electronic Diagnostics', 'chip', 'Fault finding for sensors, control units and electrics.', 'auto-electrical-services'],
  ],
  luxury: [
    ['Bespoke Detailing', 'sparkle', 'Interior and exterior detailing for an immaculate finish.', 'auto-interior-and-exterior-detailing'],
    ['Engine Care', 'engine', 'Servicing and diagnostics for smooth, quiet power.', 'auto-mechanical-services'],
    ['Coachwork & Body', 'body', 'Denting, painting and paint protection.', 'auto-denting-painting'],
    ['Transmission & Driveline', 'gear', 'Gearbox servicing and repair for effortless shifting.', 'auto-transmission-service-gear-oil-filter-gear-oil-chamber-gasket'],
    ['Suspension & Ride', 'shock', 'Air-suspension and ride-comfort diagnostics.', 'auto-mechanical-services'],
    ['Electrical Diagnostics', 'chip', 'Diagnostics for comfort systems, sensors and electrics.', 'auto-electrical-services'],
  ],
};

// Kept to what the live site states (no "certified", "genuine" or "warranty" claims).
export const brandWhy = ['Experienced technicians', 'Quality components', 'Latest tools & technology', 'Pick-up & drop-off', 'Available 24/7, incl. holidays'];
