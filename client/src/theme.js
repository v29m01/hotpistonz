import { useSyncExternalStore } from 'react';
import { marques } from './data/content';

// Global "selected marque" — re-themes the accent colour on every page.
let current = 'all';
const listeners = new Set();

function apply(id) {
  const m = marques.find((x) => x.id === id) || marques[0];
  document.documentElement.style.setProperty('--accent', m.accent);
}

export function setMarque(id) {
  current = id;
  apply(id);
  listeners.forEach((l) => l());
}

export function useMarque() {
  const id = useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => listeners.delete(cb); },
    () => current
  );
  return marques.find((m) => m.id === id) || marques[0];
}
