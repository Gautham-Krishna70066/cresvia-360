import { useEffect, useRef, useState } from "react";

/**
 * Hero visual: a field of fragmented columns that align and rise into a coherent
 * ascending path as the visitor scrolls / moves the pointer.
 * Potential (dormant) → Elevation → Performance → Growth (coherent).
 */
const COLS = 28;
const seed = Array.from({ length: COLS }, (_, i) => {
  const r = Math.sin(i * 12.9898) * 43758.5453;
  // Rounded so server and browser Math.sin agree (avoids a hydration mismatch).
  return Math.round((r - Math.floor(r)) * 1e4) / 1e4;
});

export function GrowthPath() {
  const [p, setP] = useState(0.15);
  const [mx, setMx] = useState(0.5);
  const raf = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setP(1);
      return;
    }
    const on = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const v = Math.min(1, 0.15 + window.scrollY / (window.innerHeight * 0.8));
        setP(v);
      });
    };
    const start = setTimeout(() => setP((x) => Math.max(x, 0.45)), 400);
    window.addEventListener("scroll", on, { passive: true });
    return () => {
      clearTimeout(start);
      window.removeEventListener("scroll", on);
    };
  }, []);

  const W = 600,
    H = 520,
    gap = W / COLS;
  const points: [number, number][] = [];

  return (
    <div
      className="relative aspect-[600/520] w-full"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setMx((e.clientX - r.left) / r.width);
      }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-full w-full"
        role="img"
        aria-label="Fragmented columns aligning into a rising path of growth"
      >
        <defs>
          <linearGradient id="col" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--ivory)" stopOpacity="0.55" />
            <stop offset="1" stopColor="var(--ivory)" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="hot" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--teal)" stopOpacity="1" />
            <stop offset="1" stopColor="var(--teal)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* grid */}
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={i}
            x1="0"
            x2={W}
            y1={(H / 8) * i}
            y2={(H / 8) * i}
            stroke="var(--ivory)"
            strokeOpacity="0.05"
          />
        ))}
        {seed.map((s, i) => {
          const t = i / (COLS - 1);
          const target = 40 + Math.pow(t, 1.6) * (H - 120); // coherent ascending form
          const dormant = 20 + s * 140; // fragmented, low
          const hover = Math.exp(-Math.pow((t - mx) * 6, 2)) * 30 * p;
          const h = dormant + (target - dormant) * p + hover;
          const yOff = (1 - p) * (s - 0.5) * 80;
          const x = i * gap + gap * 0.2;
          const y = H - h + yOff;
          points.push([x + gap * 0.3, y]);
          const isHot = p > 0.6 && (i === COLS - 1 || i % 7 === 6);
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={gap * 0.6}
              height={h}
              rx="1"
              fill={isHot ? "url(#hot)" : "url(#col)"}
              style={{
                transition: "all 0.9s cubic-bezier(0.22,1,0.36,1)",
                transitionDelay: `${i * 12}ms`,
              }}
            />
          );
        })}
        <polyline
          points={points.map((q) => q.join(",")).join(" ")}
          fill="none"
          stroke="var(--teal)"
          strokeWidth="1.25"
          strokeOpacity={Math.max(0, (p - 0.35) * 1.6)}
          style={{ transition: "stroke-opacity 0.8s" }}
        />
        {points.length > 0 && (
          <circle
            cx={points[points.length - 1]![0]}
            cy={points[points.length - 1]![1]}
            r="5"
            fill="var(--teal)"
            opacity={p > 0.6 ? 1 : 0}
            className="animate-pulse-dot"
            style={{ transition: "all 0.9s" }}
          />
        )}
      </svg>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between font-mono text-micro uppercase tracking-[0.2em] text-muted-foreground">
        {["Potential", "Elevation", "Performance", "Growth"].map((l, i) => (
          <span
            key={l}
            className={
              p >= 0.15 + i * 0.28 ? "text-primary transition-colors" : "transition-colors"
            }
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
