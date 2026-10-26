"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * CRESVIA 360 - Kinetic type band (about page)
 * Five huge "WE BUILD GROWTH" rows that spread open and scrub
 * horizontally as you scroll, alternating ivory / teal / outline.
 * Uses the site's font-display; only layout/animation CSS is inline.
 * Requires: gsap (already installed).
 */
export function KineticType() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".kt-row").forEach((r) => {
        const dir = Number(r.dataset["dir"] || 1);
        gsap.fromTo(
          r,
          { x: dir * 300, opacity: 0, scaleY: 0.2 },
          {
            x: dir * -180,
            opacity: 1,
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top 80%", end: "top 10%", scrub: 1 },
          },
        );
        gsap.to(r, {
          x: dir * -700,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 10%", end: "bottom -40%", scrub: 1 },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const PHRASE = "WE BUILD GROWTH - ";
  const rows = ["kt-outline", "", "kt-teal", "", "kt-outline"];

  return (
    <section ref={root} className="kt-root" aria-label="We build growth">
      <style>{CSS}</style>
      {rows.map((cls, i) => (
        <div
          key={i}
          className={`kt-row font-display ${cls}`}
          data-dir={i % 2 ? -1 : 1}
          aria-hidden={i > 0}
        >
          {PHRASE.repeat(6)}
        </div>
      ))}
    </section>
  );
}

/* Layout + animation styling only. Type inherits font-display. */
const CSS = `
.kt-root { height: 100vh; overflow: hidden; display: flex; flex-direction: column;
  justify-content: center; gap: 1vh; }
.kt-row { white-space: nowrap; font-size: clamp(70px, 13vw, 200px); line-height: 1;
  letter-spacing: -0.02em; will-change: transform; }
.kt-teal { color: #00AEBB; }
.kt-outline { color: transparent; -webkit-text-stroke: 2px rgba(232,228,211,.35); }
`;
