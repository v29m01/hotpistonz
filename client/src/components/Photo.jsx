import { useEffect, useState } from 'react';
import { imageUrl, useImages } from '../imageStore';

// Image with an elegant dark fallback if the file is missing.
export default function Photo({ name, alt = '', className = '', eager = false }) {
  useImages(); // re-render when an image is uploaded
  const src = imageUrl(name);
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  return (
    <div className={`photo ${failed ? 'photo--empty' : ''} ${className}`}>
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
