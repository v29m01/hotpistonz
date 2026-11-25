// Lightweight inline SVG icon set (no icon library needed).
const paths = {
  oil: 'M8 3h5l1 3H7zM6 6h9v3l3 2v8H5v-8l1-2zM9 13h5',
  gear: 'M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM12 2v3M12 19v3M4.9 4.9 7 7M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1',
  overhaul: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4zM18 18h3M19.5 16.5v3',
  wrench: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z',
  bolt: 'M13 2 4 14h7l-1 8 9-12h-7z',
  gauge: 'M4 18a8 8 0 1 1 16 0M12 18l4-6M7 14h.01M17 14h.01M12 9v.01',
  paint: 'M9 8h6v13H9zM10 8V5h4v3M17 4h.01M19 6h.01M17 8h.01M20 3h.01',
  roof: 'M3 16l2.5-6h13L21 16M2 16h20v3H2zM8 10l1.5-4h5L16 10',
  tint: 'M4 5h16v13H4zM4 18 20 5M9 18l11-9',
  sparkle: 'M12 3l1.8 4.7L18.5 9.5 13.8 11.3 12 16l-1.8-4.7L5.5 9.5l4.7-1.8zM19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z',
  wash: 'M12 3s-5.5 6-5.5 10a5.5 5.5 0 0 0 11 0C17.5 9 12 3 12 3zM9.5 13.5a2.5 2.5 0 0 0 2.5 2.5',
  tire: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 3v5M12 16v5M3 12h5M16 12h5',
  fleet: 'M2 14l2-5h9l2 5v4H2zM5 18v1.5M12 18v1.5M15 10h4l3 4v4h-5',
  wheel: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM12 14v7M3.6 10.6l6.4 1M20.4 10.6l-6.4 1',
  check: 'M4 12l5 5L20 6',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
  pin: 'M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zM12 7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z',
  mail: 'M3 5h18v14H3zM3 6l9 7 9-7',
  clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6 6 18',
  quote: 'M7 7h4v5c0 3-1.5 4.5-4 5M14 7h4v5c0 3-1.5 4.5-4 5',
  chat: 'M4 5h16v11H9l-5 4z',
  chevron: 'M6 9l6 6 6-6',
  'chevron-r': 'M9 6l6 6-6 6',
  target: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z',
  eye: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  flag: 'M5 21V4M5 4h11l-2 4 2 4H5',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z',
  alert: 'M12 3l10 18H2zM12 10v5M12 18h.01',
  upload: 'M12 16V4M7 9l5-5 5 5M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3',
  play: 'M7 4v16l13-8z',
  truck: 'M2 6h11v10H2zM13 10h4l3 3v3h-7M6 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z',
};

export default function Icon({ name, size = 24, stroke = 1.5, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name] || paths.wrench} />
    </svg>
  );
}
