"use client";

import { useEffect, useState } from "react";

/**
 * CRESVIA 360 - "The Path" intro
 * Plays on full page load / first entry only. ~2.9s. Honors prefers-reduced-motion.
 * Skipped on client-side navigation back to home.
 *
 * SSR note: the server ALWAYS renders the intro (import.meta.env.SSR), so the
 * server HTML is deterministic. The play-once flag lives only in the browser's
 * module state: it survives client-side router transitions but resets on a real
 * reload. Hydration therefore always matches.
 * Mount once near the top of the home route: <Intro />
 */
let introPlayed = false;

export function Intro() {
  const [gone, setGone] = useState(() => {
    if (import.meta.env.SSR) return false;
    if (introPlayed) return true;
    introPlayed = true;
    return false;
  });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setGone(true);
      return;
    }
    const t = setTimeout(() => setGone(true), 3200);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  return (
    <div className="intro-root" aria-hidden>
      <style>{INTRO_CSS}</style>
      <div className="intro-veil" />
      <svg className="intro-path" viewBox="0 0 1280 800" preserveAspectRatio="xMidYMid slice">
        <path
          className="intro-travel"
          pathLength={1000}
          d="M-60,400 L530,400 a110,110 0 1 1 220,0 a110,110 0 1 1 -220,0"
        />
      </svg>
      <div className="intro-logo">
        <svg viewBox="-280 -280 560 560">
          <path className="arc arc1" pathLength={1000} d="M180.2 126.1 A220 220 0 1 1 180.2 -126.1" fill="none" stroke="#00AEBB" strokeWidth="22" strokeLinecap="round" />
          <path className="arc arc2" pathLength={1000} d="M122.6 102.8 A160 160 0 1 1 122.6 -102.8" fill="none" stroke="#E8E4D3" strokeWidth="18" strokeLinecap="round" />
          <path className="arc arc3" pathLength={1000} d="M74.2 74.2 A105 105 0 1 1 74.2 -74.2" fill="none" stroke="#00AEBB" strokeWidth="15" strokeLinecap="round" />
        </svg>
        <svg viewBox="-280 -280 560 560">
          <circle className="pulse" fill="none" stroke="#00AEBB" strokeWidth="3" />
          <circle className="dotglow" fill="#00AEBB" opacity=".9" />
          <circle className="dotcore" fill="#00AEBB" />
          <circle className="dotinner" fill="#031211" />
        </svg>
      </div>
    </div>
  );
}

const INTRO_CSS = `
.intro-root { position: fixed; inset: 0; z-index: 9999; pointer-events: none; }
.intro-veil { position: absolute; inset: 0; background: #031211;
  clip-path: circle(150% at 50% 50%);
  will-change: clip-path;
  animation: introIris .65s cubic-bezier(.65,0,.35,1) 2.25s forwards; }
.intro-path { position: absolute; inset: 0; width: 100%; height: 100%; }
.intro-travel { fill: none; stroke: #00AEBB; stroke-width: 3; stroke-linecap: round;
  stroke-dasharray: 1000; stroke-dashoffset: 1000;
  animation: introDraw 1.5s cubic-bezier(.45,.05,.35,1) .2s forwards,
             introFade .35s ease 1.85s forwards; }
.intro-logo { position: absolute; left: 50%; top: 50%; width: min(34vh, 267px); aspect-ratio: 1;
  transform: translate(-50%, -50%); opacity: 0;
  will-change: transform, opacity;
  animation: introLogoIn .3s ease 1.7s forwards,
             introToNav .5s cubic-bezier(.6,0,.3,1) 2.15s forwards; }
.intro-logo svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.intro-logo .arc { stroke-dasharray: 1000; stroke-dashoffset: 1000;
  animation: introArc .45s cubic-bezier(.16,1,.3,1) forwards; }
.intro-logo .arc1 { animation-delay: 1.72s; }
.intro-logo .arc2 { animation-delay: 1.80s; }
.intro-logo .arc3 { animation-delay: 1.88s; }
.intro-logo .dotglow { r: 0; animation: introDotG .35s cubic-bezier(.3,1.6,.5,1) 1.95s forwards; }
.intro-logo .dotcore { r: 0; animation: introDotC .35s cubic-bezier(.3,1.6,.5,1) 1.95s forwards; }
.intro-logo .dotinner { r: 0; animation: introDotI .35s cubic-bezier(.3,1.6,.5,1) 2.02s forwards; }
.intro-logo .pulse { r: 30; opacity: 0; animation: introPulse .6s ease-out 2.05s forwards; }

@keyframes introDraw { to { stroke-dashoffset: 0; } }
@keyframes introFade { to { opacity: 0; } }
@keyframes introArc { to { stroke-dashoffset: 0; } }
@keyframes introDotG { to { r: 38; } }
@keyframes introDotC { to { r: 30; } }
@keyframes introDotI { to { r: 12; } }
@keyframes introPulse { 0% { r: 30; opacity: .7; } 100% { r: 110; opacity: 0; } }
@keyframes introLogoIn { to { opacity: 1; } }
@keyframes introToNav { to { transform: translate(calc(-50vw + 84px), calc(-50vh + 44px)) scale(.13); opacity: 0; } }
@keyframes introIris { to { clip-path: circle(0% at 50% 50%); } }
`;
