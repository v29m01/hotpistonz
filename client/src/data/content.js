// Site-wide copy, taken from the live hotpistonz.com pages.
// Edit text here without touching components.

export const business = {
  name: 'Hot Pistonz',
  fullName: 'Hot Pistonz Garage',
  phone: '+971 50 774 4680',
  phoneHref: 'tel:+971507744680',
  whatsapp: 'https://wa.me/971507744680',
  email: 'Info@hotpistonz.com',
  address: 'Hot Pistonz Garage - Dubai Investment Park - 1 - near Agility Round About - Dubai - United Arab Emirates',
  addressShort: 'Dubai Investment Park 1, near Agility Round About, Dubai',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Hot+Pistonz+Garage+Dubai+Investment+Park',
  hours: 'Available 24/7, including holidays',
  footerAbout:
    'Hot Pistonz Garage is your trusted destination for comprehensive car repair and automotive care in Dubai Investment Park. We specialize in all car repairs, including luxury cars, and provide professional services 24/7, even on holidays.',
};

export const wa = (text) => `${business.whatsapp}?text=${encodeURIComponent(text)}`;

// Header menu — same structure as the live site
export const nav = [
  { to: '/', label: 'Home' },
  { to: '/about-us', label: 'About Us' },
  { to: '/our-services', label: 'Our Services', menu: 'services' },
  { to: '/brand-specialist', label: 'Brand Specialist', menu: 'brands' },
  { to: '/areas-we-cover', label: 'Area We Cover', menu: 'areas' },
  { to: '/car-brands', label: 'Car Brands' },
  { to: '/contact-us', label: 'Contact Us' },
];

export const brandSpecialist = {
  german: ['Audi', 'BMW', 'Volkswagen', 'Mercedes', 'Porsche', 'Maybach', 'Ford', 'Opel', 'Abt Sportsline', 'Alpina', 'Isdera', 'Borgward'],
  other: ['Luxury Cars', 'Sports Cars'],
};

export const areas = [
  'Dubai Investment Park', 'Discovery Garden', 'Green Community', 'Al Furjan',
  'Jebel Ali', 'Jumeirah Village Circle', 'Jumeirah Village Triangle', 'Al Barsha',
  'Dubai Production City', 'Jebel Ali Hills', 'DAMAC Hills', 'Emirates Hills',
  'Dubai Industrial City', 'Dubai Media City', 'Dubai Logistics City', 'Dubai Marina',
];

export { imageUrl as img } from '../imageStore';

// Each marque re-themes the accent colour and switches the home hero image.
export const marques = [
  { id: 'all', name: 'All Marques', accent: '#F28C28', origin: 'Every marque', models: 'German, luxury & sports cars' },
  { id: 'mercedes', name: 'Mercedes', accent: '#A9BCCC', origin: 'Stuttgart, Germany', models: 'A-Class to S-Class, AMG, G-Class' },
  { id: 'bmw', name: 'BMW', accent: '#2F7BE0', origin: 'Munich, Germany', models: '3 to 7 Series, X range, M cars' },
  { id: 'audi', name: 'Audi', accent: '#E0242E', origin: 'Ingolstadt, Germany', models: 'A4 to A8, Q range, RS, e-tron GT' },
  { id: 'rangerover', name: 'Range Rover', accent: '#7FA37A', origin: 'Solihull, UK', models: 'Range Rover, Sport, Velar, Evoque' },
  { id: 'bentley', name: 'Bentley', accent: '#4E9C7A', origin: 'Crewe, UK', models: 'Continental GT, Flying Spur, Bentayga' },
  { id: 'maserati', name: 'Maserati', accent: '#3E6BD6', origin: 'Modena, Italy', models: 'Quattroporte, Ghibli, Levante' },
  { id: 'jaguar', name: 'Jaguar', accent: '#C9A86A', origin: 'Coventry, UK', models: 'XF, XE, F-Pace, F-Type' },
  { id: 'lexus', name: 'Lexus', accent: '#B9C2CC', origin: 'Nagoya, Japan', models: 'LX, GX, RX, ES, LS' },
  { id: 'ford', name: 'Ford', accent: '#2C7BE5', origin: 'Dearborn, USA', models: 'F-150 Raptor, Explorer, Mustang' },
];

// ---------- Home page (live copy) ----------
export const home = {
  hero: {
    title: 'Precision Service for Performance & Luxury Vehicles',
    text: 'Experience uncompromised performance and reliability with Hot Pistonz Garage. Our skilled technicians deliver precision diagnostics, transmission servicing, engine overhauling, and complete automotive care using quality components and professional service standards.',
    button: 'Explore Our Services',
  },
  about: {
    title: 'Hot Pistonz Garage',
    text: 'We are specialists in all car repairs, including luxury car repairs, offering professional solutions to keep your vehicle running smoothly and looking its best. With experienced technicians, the latest tools and technology, and a commitment to excellence, we provide reliable automotive services with a focus on getting every job done right the first time. Available 24/7, including holidays, we are always ready to help with your vehicle repair and maintenance needs.',
    button: 'Know More About Us',
  },
  services: {
    kicker: 'What we do',
    title: "Let Us Restore Your Vehicle's Performance!",
    text: 'From routine maintenance to advanced repairs, Hot Pistonz Garage provides comprehensive automotive services for all cars, including luxury vehicles.',
    button: 'See more',
    // The six cards on the live home page
    cards: [
      { slug: 'auto-engine-oil-change-service-in-dubai', title: 'Auto Engine Oil & Filter', text: 'We provide complete oil change services, including conventional, synthetic blend, full synthetic, and high-mileage oil changes for different vehicle needs.' },
      { slug: 'auto-transmission-service-gear-oil-filter-gear-oil-chamber-gasket', title: 'Auto Transmission Service / Gear Oil / Gear Oil Filter / Gear Oil Chamber Gasket', text: 'Auto Transmission Service: Complete transmission care with gear oil, filter, and gasket replacement for smooth performance.' },
      { slug: 'auto-electrical-services', title: 'Auto Electrical & Mechanical Services', text: 'Expert auto electrical diagnostics, repairs, and installations to keep your vehicle’s electrical systems performing at their best.' },
      { slug: 'auto-transmission-overhauling', title: 'Auto Transmission Overhauling', text: 'Comprehensive transmission overhauling services to keep your vehicle’s transmission running smoothly and efficiently.' },
      { slug: 'auto-roof-service', title: 'Auto Roof Service', text: 'Expert auto roof repair and maintenance to keep your vehicle’s roof in excellent condition and appearance.' },
      // Live card repeats the roof text by mistake; this line is from the tyre page itself.
      { slug: 'auto-tire-service', title: 'Auto Tire Service', text: 'We provide comprehensive tire services to keep your vehicle safe, smooth, and road-ready.' },
    ],
  },
  why: {
    kicker: 'Why Choose Us',
    title: 'Built on Quality & Trust',
    text: 'At Hot Pistonz Garage, we combine experienced technicians, modern tools, and comprehensive automotive services to provide reliable car care whenever you need it.',
    items: [
      { icon: 'check', title: 'Complete Car Choice' },
      { icon: 'truck', title: 'Pick Up & Drop Off Service' },
      { icon: 'gauge', title: 'Car Checked & Maintained Regularly' },
      { icon: 'clock', title: '24 Hours Ready' },
    ],
  },
  // Live site shows "0" for these. Fill in the real numbers; a stat with value null is hidden.
  stats: [
    { label: 'Year Of Experience', value: null },
    { label: 'Professional Care', value: '100%' },
    { label: 'Team Expert', value: null },
    { label: 'Auto Services', value: '14+' },
  ],
  testimonials: {
    kicker: 'Testimonial',
    title: 'What Our Customer Says',
  },
  contact: {
    title: 'Your Car, Our Expertise',
    button: 'Contact For Service',
  },
};

export const testimonials = [
  { name: 'Sarah D.', text: "I highly recommend Car Repair & Auto Service for their exceptional expertise and professionalism. They fixed my car's transmission issue efficiently, and now it runs smoothly. Their team provided top-notch service and made the entire experience hassle-free." },
  { name: 'Mark T.', text: "I'm extremely satisfied with the service I received from Car Repair & Auto Service. They were able to diagnose and fix the electrical problem in my car quickly. The team was knowledgeable, friendly, and went above and beyond to ensure my vehicle was back on the road in no time." },
  { name: 'Jennifer K.', text: "Car Repair & Auto Service exceeded my expectations with their exceptional service. They provided a detailed analysis of my car's engine problem and repaired it within the estimated time. Their expertise and commitment to customer satisfaction are commendable." },
];

// ---------- About page (live copy) ----------
export const about = {
  title: 'Your Trusted Partner for Complete Automotive Solutions',
  intro: [
    'At Hot Pistonz Garage, we are dedicated to providing reliable and professional automotive care solutions to keep your vehicle performing at its best. With a team of experienced technicians and advanced tools, we offer complete vehicle maintenance, repairs, diagnostics, and customization services under one roof.',
    'From routine servicing and tire solutions to mechanical repairs, electrical diagnostics, ECU services, and body care, we ensure every vehicle receives quality attention and expert workmanship. Our commitment to excellence, customer satisfaction, and innovative solutions makes us a trusted partner for all your automotive needs.',
  ],
  experienceLabel: 'Years Of Experience',
  experienceValue: null, // fill in the real number
  vmvTitle: 'Trust Your Car to Our Skilled Technicians!',
  vmv: [
    { icon: 'eye', title: 'Our Vision', text: 'To become a leading provider of Car Repair & Auto Service known for technical expertise, superior service quality, and high customer satisfaction.' },
    { icon: 'target', title: 'Our Mission', text: 'Deliver high-quality car repair services using the latest technology and efficient processes.' },
    { icon: 'flag', title: 'Our Value', text: "Reliable Solutions for Your Vehicle's Performance. Prioritize customer satisfaction by delivering friendly, professional, and transparent services." },
  ],
};

// ---------- Our Services page ----------
export const servicesPage = { title: 'Our Services', sub: 'Driven by Excellence, Powered by Expertise' };

// ---------- Car Brands page ----------
export const carBrands = {
  title: 'Car Brands',
  sub: 'Explore the Brands We Service — Expert Care for Every Drive.',
  brands: ['Mercedes', 'Range Rover', 'Lexus', 'Ford', 'BMW', 'Jaguar', 'Audi', 'Maserati', 'Bentley'],
};

// ---------- Contact page ----------
export const contactPage = {
  title: 'Contact Us',
  sub: 'Let’s Connect and Bring Your Ideas to Life.',
  formTitle: 'Send us a message',
  infoTitle: 'Connect Us',
  infoText: 'Have a project in mind or need more information? Get in touch with us today, and let’s create the right solution for your business.',
};

// Footer link groups (live site)
export const footerServices = [
  ['Auto Accessories', '/auto-accessories'],
  ['Auto Tire Services', '/auto-tire-service'],
  ['Auto Roof Service', '/auto-roof-service'],
  ['Auto Engine Oil & Filter', '/auto-engine-oil-change-service-in-dubai'],
  ['Auto Fleet Services & Maintenance', '/auto-fleet-service-and-maintenance'],
];
export const footerCompany = [
  ['About Us', '/about-us'], ['Our Services', '/our-services'], ['Car Brands', '/car-brands'], ['Contact Us', '/contact-us'],
];

export const timeSlots = ['Morning (8–12)', 'Afternoon (12–4)', 'Evening (4–8)', 'Night (8–12)'];
