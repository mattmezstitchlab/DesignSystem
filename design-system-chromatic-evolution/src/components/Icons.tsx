import type { CSSProperties, ReactNode } from 'react';

export function Flower({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg className={`flower ${className}`} viewBox="0 0 48 48" fill="currentColor" aria-hidden="true" style={style}>
      <ellipse cx="24" cy="24" rx="5.5" ry="22" />
      <ellipse cx="24" cy="24" rx="5.5" ry="22" transform="rotate(45 24 24)" />
      <ellipse cx="24" cy="24" rx="5.5" ry="22" transform="rotate(90 24 24)" />
      <ellipse cx="24" cy="24" rx="5.5" ry="22" transform="rotate(135 24 24)" />
    </svg>
  );
}

const paths: Record<string, ReactNode> = {
  arrow: <path d="M4 12h16m-7-7 7 7-7 7" />,
  diagonal: <path d="M5 19 19 5M5 5h14v14" />,
  down: <path d="m6 9 6 6 6-6" />,
  check: <path d="m5 12 4 4L19 6" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  copy: <><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h4" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></>,
  moon: <path d="M20.7 13.3A9 9 0 0 1 10.7 3.3 9 9 0 1 0 20.7 13.3Z" />,
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4m10-4v4M3 10h18" /></>,
  music: <><path d="M9 18V5l12-3v13M9 9l12-3" /><ellipse cx="6" cy="18" rx="3" ry="3" /><ellipse cx="18" cy="15" rx="3" ry="3" /></>,
  pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  mail: <><rect x="2" y="5" width="20" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>,
  spark: <path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z" />,
  people: <><circle cx="8" cy="6" r="3" /><path d="M2 21v-4a6 6 0 0 1 12 0v4m3-9a5 5 0 0 1 5 5v4M17 3a3 3 0 0 1 0 6" /></>,
  camera: <><path d="M8 5 9 2h6l1 3h4a2 2 0 0 1 2 2v13H2V7a2 2 0 0 1 2-2Z" /><circle cx="12" cy="12" r="4" /></>,
  chat: <><path d="M5 3h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H9l-6 3V5a2 2 0 0 1 2-2Z" /><path d="M7 10h.01M12 10h.01M17 10h.01" /></>,
  edit: <><path d="m14 5 5 5M4 20l5-1L22 6l-5-5L4 14Z" /><path d="M10 3H4a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h15a2 2 0 0 0 2-2v-6" /></>,
  phone: <><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M11 18h2" /></>,
  download: <><path d="M12 3v12m-5-5 5 5 5-5M4 16v4h16v-4" /></>,
  reset: <><path d="M3 10a9 9 0 1 1 2 8M3 3v7h7" /></>,
  book: <><path d="M12 5v16M12 5C9 2 5 2 2 3v16c4-1 7-1 10 2 3-3 6-3 10-2V3c-3-1-7-1-10 2Z" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5m0-9v.1" /></>,
};

export function Icon({ name = 'arrow', className = '', size = 20 }: { name?: string; className?: string; size?: number }) {
  return <svg className={`icon ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] ?? paths.arrow}</svg>;
}

export function Brand({ footer = false }: { footer?: boolean }) {
  return <a className={`brand ${footer ? 'brand-footer' : ''}`} href="#accueil" aria-label="LE MONDE AIME - accueil"><Flower /><span>LE MONDE<br />AIME<sup>&reg;</sup></span></a>;
}