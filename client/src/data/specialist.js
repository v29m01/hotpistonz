// Brand Specialist and Area We Cover pages.
// The live site only links these menu items to WhatsApp; these pages are new.
// Edit the text freely — every page is built from this file.

export const slugify = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// image: built-in photo used until a photo is uploaded to the "brand-<slug>" slot in the dashboard.
export const specialistBrands = [
  {
    name: 'Audi', group: 'German Cars', origin: 'Ingolstadt, Germany', image: 'hero-audi',
    models: ['A3', 'A4', 'A6', 'A8', 'Q5', 'Q7', 'Q8', 'RS models', 'e-tron GT'],
    intro: 'From everyday A4s to RS models and the electric e-tron GT, Audis combine quattro all-wheel drive, dual-clutch and automatic gearboxes and dense on-board electronics. Our technicians service and repair them with the right diagnostic tools and quality parts.',
    focus: [
      ['quattro & drivetrain', 'Inspection and servicing of all-wheel-drive components, differentials and drivetrain fluids.'],
      ['S tronic & tiptronic gearboxes', 'Fluid service, diagnostics and repair for Audi dual-clutch and automatic transmissions.'],
      ['Electronics & MMI', 'Fault-code diagnostics for warning lights, sensors, infotainment and comfort systems.'],
    ],
  },
  {
    name: 'BMW', group: 'German Cars', origin: 'Munich, Germany', image: 'hero-bmw',
    models: ['1 Series', '3 Series', '5 Series', '7 Series', 'X3', 'X5', 'X6', 'X7', 'M models'],
    intro: 'BMWs are built for driving, and they reward careful maintenance. From 3 Series saloons to X models and M cars, we look after engines, gearboxes, cooling systems and electronics so your BMW keeps driving the way it should.',
    focus: [
      ['Engine & cooling', 'Oil leaks, cooling-system checks and engine diagnostics — common needs in the UAE heat.'],
      ['Automatic gearboxes', 'Transmission fluid service, diagnostics and repair for smooth, responsive shifting.'],
      ['Electrical & coding', 'Diagnostics for warning lights, batteries, sensors and electrical faults.'],
    ],
  },
  {
    name: 'Volkswagen', group: 'German Cars', origin: 'Wolfsburg, Germany', image: 'hero',
    models: ['Golf', 'Golf GTI', 'Golf R', 'Passat', 'Jetta', 'Tiguan', 'Touareg', 'Teramont'],
    intro: 'From the Golf GTI and Golf R to the Tiguan, Touareg and Teramont, we provide complete Volkswagen servicing and repairs — routine maintenance, DSG and automatic gearbox work, electrical diagnostics and more.',
    focus: [
      ['DSG gearbox care', 'Fluid service and diagnostics for Volkswagen dual-clutch gearboxes.'],
      ['TSI engines', 'Servicing, oil and filter changes and diagnostics for turbocharged petrol engines.'],
      ['Electrical diagnostics', 'Fault finding for warning lights, sensors and comfort electronics.'],
    ],
  },
  {
    name: 'Mercedes', group: 'German Cars', origin: 'Stuttgart, Germany', image: 'hero-mercedes',
    models: ['A-Class', 'C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'GLS', 'G-Class', 'AMG'],
    intro: 'Mercedes-Benz cars set the standard for comfort and refinement. We service and repair the full range, from the A-Class to the S-Class, G-Class and AMG models — engines, transmissions, suspension and electronics.',
    focus: [
      ['Scheduled servicing', 'Oil, filters and inspections to keep your Mercedes running smoothly.'],
      ['Air suspension & ride', 'Diagnostics and repair for suspension and ride-comfort systems.'],
      ['Electronics', 'Diagnostics for warning messages, sensors, batteries and comfort systems.'],
    ],
  },
  {
    name: 'Porsche', group: 'German Cars', origin: 'Stuttgart, Germany', image: 'speed',
    models: ['911', '718 Boxster', '718 Cayman', 'Cayenne', 'Macan', 'Panamera', 'Taycan'],
    intro: 'Porsches are engineered for performance, and they need technicians who treat them that way. We service and repair the 911, 718, Cayenne, Macan, Panamera and Taycan with care and precision.',
    focus: [
      ['PDK & gearboxes', 'Fluid service and diagnostics for Porsche PDK and automatic transmissions.'],
      ['Brakes & tyres', 'Inspection and replacement of high-performance brakes and tyres.'],
      ['Engine & cooling', 'Servicing, leak checks and cooling-system care for high-performance engines.'],
    ],
  },
  {
    name: 'Maybach', group: 'German Cars', origin: 'Sindelfingen, Germany', image: 'tint',
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
    name: 'Luxury Cars', group: 'More', origin: 'Every luxury marque', image: 'hero-bentley',
    models: ['Rolls-Royce', 'Bentley', 'Mercedes-Maybach', 'Range Rover', 'Maserati', 'Lexus', 'Jaguar'],
    intro: 'We specialise in all car repairs, including luxury car repairs. Bentley, Rolls-Royce, Range Rover, Maserati, Lexus, Jaguar and more are serviced with the care, tools and attention to detail luxury cars need.',
    focus: [
      ['Careful handling', 'Pick-up and drop-off, with your car treated with care at every step.'],
      ['Complete servicing', 'Engine, transmission, suspension, electrical and air-conditioning work under one roof.'],
      ['Detailing & paint', 'Interior and exterior detailing, paint correction, and denting and painting.'],
    ],
  },
  {
    name: 'Sports Cars', group: 'More', origin: 'Performance cars', image: 'supercar',
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
