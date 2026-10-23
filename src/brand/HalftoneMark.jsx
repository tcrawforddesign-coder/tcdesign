import { useId } from "react";
import { Link } from "react-router-dom";

// The Travis Crawford halftone monogram: a T set inside an open C, drawn in
// dots that grow as they near the red point in the opening.
const POINTS = (() => {
  const pts = [];
  for (let a = 40; a <= 320; a += 20) {
    const r = (a * Math.PI) / 180;
    pts.push([100 + 78 * Math.cos(r), 100 + 78 * Math.sin(r)]);
  }
  [56, 78, 100, 122, 144].forEach((x) => pts.push([x, 66]));
  [88, 110, 132, 154].forEach((y) => pts.push([100, y]));
  return pts;
})();

function radiusFor([x, y], weight) {
  const d = Math.hypot(x - 174, y - 100);
  const base = 9.5 - d * 0.042;
  // "heavy" keeps the smallest dots legible at nav and favicon sizes.
  if (weight === "heavy") return Math.min(10.5, Math.max(4.6, base * 1.3));
  return Math.max(3.2, base);
}

const TONES = {
  light: { from: "#5B8FC9", to: "#2F5D8C", point: "#CF3326" },
  soft: { from: "#7FB0E0", to: "#3F72AE", point: "#CF3326" },
  dark: { from: "#DCE9F3", to: "#7FB0E0", point: "#CF3326" },
  white: { from: "#FFFFFF", to: "#FFFFFF", point: "#111214" },
};

export default function HalftoneMark({ size = 40, tone = "light", weight = "heavy", title, className = "", style }) {
  const id = useId().replace(/:/g, "");
  const colors = TONES[tone] ?? TONES.light;
  const labelled = Boolean(title);

  return (
    <svg
      className={className}
      style={style}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      role={labelled ? "img" : undefined}
      aria-label={labelled ? title : undefined}
      aria-hidden={labelled ? undefined : true}
      focusable="false"
    >
      <defs>
        <linearGradient id={`tc-mark-${id}`} gradientUnits="userSpaceOnUse" x1="20" y1="100" x2="190" y2="100">
          <stop offset="0" stopColor={colors.from} />
          <stop offset="1" stopColor={colors.to} />
        </linearGradient>
      </defs>
      <g fill={`url(#tc-mark-${id})`}>
        {POINTS.map((p) => (
          <circle key={`${p[0].toFixed(1)}-${p[1].toFixed(1)}`} cx={p[0].toFixed(1)} cy={p[1].toFixed(1)} r={radiusFor(p, weight).toFixed(1)} />
        ))}
      </g>
      <circle cx="174" cy="100" r={weight === "heavy" ? 12 : 11} fill={colors.point} />
    </svg>
  );
}

export function LogoPill({ to = "/", className = "", ...rest }) {
  return (
    <Link to={to} className={`tc-logo-pill tc-glass ${className}`} {...rest}>
      <HalftoneMark size={44} />
      <span className="tc-logo-word">
        Travis Crawford<span className="tc-dot">.</span>
      </span>
    </Link>
  );
}
