import { useSyncExternalStore } from 'react';

// Uploaded images (from the dashboard) override the built-in defaults in public/images.
let overrides = {};
const listeners = new Set();
const emit = () => listeners.forEach((l) => l());

// Built-in files. Slots listed in MEDIA have no generated default; set a path here
// when a file is added to client/public/media (e.g. logo: 'media/logo.png').
export const MEDIA = { logo: 'media/logo.png', 'logo-light': 'media/logo.png', 'hero-video': null };
export const defaultUrl = (name) => (name in MEDIA ? MEDIA[name] : `images/${name}.jpg`);
export const imageUrl = (name) => overrides[name] || defaultUrl(name);
export const isCustom = (name) => Boolean(overrides[name]);

export function setOverrides(map) { overrides = { ...map }; emit(); }
export function setOverride(name, url) { overrides = { ...overrides, [name]: url }; emit(); }
export function clearOverride(name) { const { [name]: _, ...rest } = overrides; overrides = rest; emit(); }

export function useImages() {
  return useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => listeners.delete(cb); },
    () => overrides
  );
}
