import { imageUrl, useImages } from '../imageStore';

// Uses the uploaded logo if there is one (dashboard → Images → Logo),
// otherwise a text wordmark. "logo-light" is an optional version for dark backgrounds.
export default function Logo({ light = false }) {
  useImages();
  const src = (light && imageUrl('logo-light')) || imageUrl('logo');
  if (src) return <span className={`logo logo--img ${light ? 'logo--light' : ''}`}><img src={src} alt="Hot Pistonz Garage" /></span>;
  return (
    <span className={`logo ${light ? 'logo--light' : ''}`}>
      <span className="logo__mark" aria-hidden="true">
        <svg viewBox="0 0 32 32" width="22" height="22">
          <rect x="8" y="4" width="16" height="11" rx="1.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
          <path d="M16 15v6" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="16" cy="24" r="3.6" fill="none" stroke="currentColor" strokeWidth="2.2" />
        </svg>
      </span>
      <span className="logo__text">
        HOT<b>PISTONZ</b>
      </span>
    </span>
  );
}
