// Every image slot on the site, grouped for the dashboard's Images tab.
// `name` matches a file in client/public/images (the built-in default).
const marqueHero = (id, label) => ({ name: `hero-${id}`, label: `Home hero: ${label}`, where: `Home banner when ${label} is selected`, size: '1600 × 1000 (also used on Car Brands page)', wide: true });

import { specialistBrands } from './specialist';

export const imageGroups = [
  {
    title: 'Logo & video',
    slots: [
      { name: 'logo', label: 'Logo', where: 'Header, footer, dashboard', size: 'PNG/WebP with transparent background, ~600 × 160', kind: 'logo' },
      { name: 'logo-light', label: 'Logo (white version)', where: 'Footer on dark background (optional)', size: 'PNG/WebP, transparent', kind: 'logo' },
      { name: 'hero-video', label: 'Home banner video', where: 'Plays muted behind the home headline (replaces the image)', size: 'MP4/WebM, 10–30 s, 1920 × 1080, under 50 MB', kind: 'video', wide: true },
    ],
  },
  {
    title: 'Home hero',
    slots: [
      { name: 'hero', label: 'Home hero: default', where: 'Home banner (All marques)', size: '2400 × 1350', wide: true },
      marqueHero('mercedes', 'Mercedes'), marqueHero('bmw', 'BMW'), marqueHero('audi', 'Audi'),
      marqueHero('rangerover', 'Range Rover'), marqueHero('bentley', 'Bentley'), marqueHero('maserati', 'Maserati'),
      marqueHero('jaguar', 'Jaguar'), marqueHero('lexus', 'Lexus'), marqueHero('ford', 'Ford'),
    ],
  },
  {
    title: 'Page banners & backgrounds',
    slots: [
      { name: 'hero-alt', label: 'Booking & CTA background', where: 'Book a Service, call-to-action bands', size: '2400 × 1350', wide: true },
      { name: 'banner-silver', label: 'Banner: silver', where: 'About Us, Book a Service, German brands', size: '2400 × 900', wide: true },
      { name: 'banner-black', label: 'Banner: black', where: 'Contact, service pages, Luxury brands', size: '2400 × 900', wide: true },
      { name: 'banner-red', label: 'Banner: red', where: 'Our Services, Sports brands', size: '2400 × 900', wide: true },
      { name: 'banner-yellow', label: 'Banner: yellow', where: 'Car Brands', size: '2400 × 900', wide: true },
      { name: 'banner-blue', label: 'Banner: blue', where: 'Areas We Cover, Fleet page', size: '2400 × 900', wide: true },
      { name: 'supercar', label: 'Process background', where: '"From your driveway and back" section', size: '2400 × 1200', wide: true },
    ],
  },
  {
    title: 'Service images',
    slots: [
      { name: 'oil', label: 'Engine Oil & Filter', where: 'Oil service page & cards', size: '1600 × 1000' },
      { name: 'gears', label: 'Transmission', where: 'Transmission service + overhaul, About', size: '1600 × 1000' },
      { name: 'engine', label: 'Mechanical / engine', where: 'Mechanical page, Home intro', size: '1000 × 1250' },
      { name: 'circuit', label: 'Electrical', where: 'Electrical page', size: '1600 × 1000' },
      { name: 'fleet', label: 'Fleet service', where: 'Fleet service page & cards', size: '1600 × 1000' },
      { name: 'speed', label: 'Speed limiter', where: 'Speed limiter page', size: '1600 × 1000' },
      { name: 'roof', label: 'Roof service', where: 'Roof page', size: '1600 × 1000' },
      { name: 'tyre', label: 'Tyre service', where: 'Tyre page', size: '1600 × 1000' },
      { name: 'wash', label: 'Washing & cleaning', where: 'Washing page', size: '1000 × 1200' },
      { name: 'paint', label: 'Detailing', where: 'Detailing page & cards', size: '1000 × 1200' },
      { name: 'spray', label: 'Denting & painting', where: 'Denting & painting page', size: '1600 × 1000' },
      { name: 'tint', label: '3M tinting', where: 'Tinting page', size: '1600 × 1000' },
      { name: 'interior', label: 'Interior / accessories', where: 'Accessories page, About', size: '1000 × 1200' },
    ],
  },
  {
    title: 'Brand Specialist pages',
    slots: specialistBrands.map((b) => ({ name: `brand-${b.slug}`, label: b.name, where: `Brand Specialist: ${b.name} page`, size: '1600 × 1000', fallback: b.image })),
  },
  {
    title: 'Details',
    slots: [
      { name: 'mechanic', label: 'Wheel & brakes', where: 'About Us', size: '1000 × 1200' },
      { name: 'cockpit', label: 'Dashboard / gauge', where: 'Home intro (small image)', size: '900 × 900' },
    ],
  },
];
