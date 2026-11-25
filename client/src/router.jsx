import { useEffect, useState } from 'react';

// A tiny router (no extra package needed).
// - "path" mode (real site): clean URLs like /about-us, served by Express.
// - "hash" mode (single-file preview): #about-us
/* global __ROUTER_MODE__ */
const MODE = typeof __ROUTER_MODE__ !== 'undefined' ? __ROUTER_MODE__ : 'path';

const toHash = (path) => (path === '/' ? '#home' : '#' + path.replace(/^\//, ''));
export const href = (path) => (MODE === 'hash' ? toHash(path) : path);

export function currentPath() {
  if (MODE === 'hash') {
    const h = window.location.hash.replace(/^#/, '');
    return !h || h === 'home' ? '/' : '/' + h;
  }
  return window.location.pathname.replace(/\/+$/, '') || '/';
}

export function navigate(path) {
  if (MODE === 'hash') {
    window.location.hash = toHash(path);
  } else {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('hp:navigate'));
  }
}

export function useRoute() {
  const [path, setPath] = useState(currentPath);
  useEffect(() => {
    const update = () => {
      setPath(currentPath());
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('popstate', update);
    window.addEventListener('hashchange', update);
    window.addEventListener('hp:navigate', update);
    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener('hashchange', update);
      window.removeEventListener('hp:navigate', update);
    };
  }, []);
  return path;
}

export function Link({ to, onClick, children, ...rest }) {
  return (
    <a
      href={href(to)}
      onClick={(e) => {
        onClick?.(e);
        if (MODE === 'path' && !e.defaultPrevented && !e.metaKey && !e.ctrlKey) {
          e.preventDefault();
          navigate(to);
        }
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

// Lets "Book this service" buttons pre-fill the booking form across pages.
export const prefill = { service: '', marque: '', area: '' };
