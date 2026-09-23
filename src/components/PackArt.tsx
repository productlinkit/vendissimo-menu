import type { Product } from "../lib/products";

function Label({ p, y, size, len }: { p: Product; y: number; size: number; len: number }) {
  return (
    <text
      x="50" y={y} textAnchor="middle" textLength={len} lengthAdjust="spacingAndGlyphs"
      fontFamily="Noto Sans, sans-serif" fontWeight="700" fontSize={size} fill={p.ink}
    >
      {p.mark}
    </text>
  );
}

/** Gambar kemasan bawaan, dipakai selama foto asli produk belum ada. */
export default function PackArt({ p }: { p: Product }) {
  let body: JSX.Element;
  switch (p.shape) {
    case "can":
      body = (<><rect x="30" y="16" width="40" height="68" rx="9" fill="#fff" /><rect x="30" y="16" width="40" height="9" rx="4.5" fill="#E7E3EE" /><Label p={p} y={56} size={11} len={32} /></>);
      break;
    case "tube":
      body = (<><rect x="32" y="12" width="36" height="78" rx="7" fill="#fff" /><ellipse cx="50" cy="13" rx="18" ry="5" fill="#E7E3EE" /><Label p={p} y={56} size={10} len={28} /></>);
      break;
    case "bottle":
      body = (<><path d="M44 12h12v8c0 4 8 7 8 14v46a6 6 0 0 1-6 6H42a6 6 0 0 1-6-6V34c0-7 8-10 8-14z" fill="#fff" /><rect x="42" y="8" width="16" height="7" rx="3" fill="#E7E3EE" /><Label p={p} y={58} size={10} len={24} /></>);
      break;
    case "bag":
      body = (<><path d="M22 24h56l-4 12 4 12-4 12 4 12H22l4-12-4-12 4-12z" fill="#fff" /><Label p={p} y={58} size={12} len={44} /></>);
      break;
    case "box":
      body = (<><rect x="24" y="22" width="52" height="56" rx="6" fill="#fff" /><path d="M24 34h52" stroke="#E7E3EE" strokeWidth="3" /><Label p={p} y={60} size={12} len={42} /></>);
      break;
    case "bar":
      body = (<g transform="rotate(-8 50 50)"><rect x="30" y="18" width="40" height="64" rx="5" fill="#fff" /><Label p={p} y={54} size={11} len={32} /></g>);
      break;
    case "cup":
      body = (<><path d="M30 30h40l-5 48a6 6 0 0 1-6 5H41a6 6 0 0 1-6-5z" fill="#fff" /><ellipse cx="50" cy="29" rx="23" ry="7" fill="#E7E3EE" /><Label p={p} y={62} size={11} len={30} /></>);
      break;
    default:
      body = (<><circle cx="50" cy="50" r="30" fill="#fff" /><circle cx="50" cy="50" r="24" fill="none" stroke="#E7E3EE" strokeWidth="3" /><Label p={p} y={56} size={13} len={36} /></>);
  }
  return (<svg className="pack" viewBox="0 0 100 100" aria-hidden="true">{body}</svg>);
}
