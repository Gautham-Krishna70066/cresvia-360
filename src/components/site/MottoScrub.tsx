"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ScrollTrigger pins this section. Its cleanup must run BEFORE React removes the
   section's DOM on page leave, otherwise React's removeChild crashes (NotFoundError).
   useLayoutEffect cleanup runs before DOM removal; useEffect cleanup runs after. */
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * CRESVIA 360 - Motto scrub
 * Pinned typography sequence replacing the static philosophy band.
 * POTENTIAL -> PERFORMANCE -> GROWTH trail -> "Your growth is our growth."
 * Uses the site's existing type classes (font-display, eyebrow, text-primary,
 * text-muted-foreground, text-mega, text-lg) - no new fonts, no new copy.
 * Requires: npm i gsap
 */
export function MottoScrub() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>(".ms-word");
      words.forEach((w) => gsap.set(w, { top: "50%", yPercent: -50, xPercent: 110 }));
      gsap.set(".ms-w1", { xPercent: 20 });
      gsap.to(".ms-tag", { opacity: 1, duration: 0.6, stagger: 0.2 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => (window.innerWidth < 480 ? "+=160%" : window.innerWidth < 992 ? "+=210%" : "+=280%"),
          invalidateOnRefresh: true,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(".ms-w1", { xPercent: -140, ease: "none", duration: 3 })
        .fromTo(".ms-w2", { xPercent: 110 }, { xPercent: 8, ease: "none", duration: 3 }, "<")
        .to(".ms-w2", { xPercent: -150, ease: "none", duration: 3 })
        .fromTo(".ms-w3", { xPercent: 110 }, { xPercent: -30, ease: "none", duration: 3 }, "<")
        .to(".ms-w3", { xPercent: -80, ease: "none", duration: 2 })
        .to(words, { opacity: 0, duration: 0.6 }, ">-0.4")
        .fromTo(
          ".ms-resolve",
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }
        )
        .to({}, { duration: 1 });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="ms-root border-t border-line" aria-label="Philosophy">
      <style>{CSS}</style>
      <p className="eyebrow ms-tag ms-tag-tl">CRESVIA 360</p>
      <p className="eyebrow ms-tag ms-tag-br">07 / Philosophy</p>

      <div className="ms-word ms-w1 font-display">POTENTIAL</div>
      <div className="ms-word ms-w2 font-display ms-fill">PERFORMANCE</div>
      <div className="ms-word ms-w3 font-display ms-outline">GROWTH&nbsp;&nbsp;GROWTH&nbsp;&nbsp;GROWTH</div>

      <div className="ms-resolve">
        <h2 className="font-display text-mega">
          Your growth
          <br />
          is <em className="text-primary">our growth.</em>
        </h2>
        <p className="ms-sub text-lg text-muted-foreground">
          You improve → you grow → the relationship deepens → we grow. We're not interested in
          one-off transactions. We're building long-term partnerships.
        </p>
      </div>
    </section>
  );
}

/* Layout + animation styling only. All typography inherits the site's classes. */
const CSS = `
.ms-root { position: relative; height: 100vh; overflow: hidden; background: #031211; }
.ms-tag { position: absolute; margin: 0; opacity: 0; }
.ms-tag-tl { top: 12vh; left: 8vw; }
.ms-tag-br { bottom: 12vh; right: 8vw; }
.ms-word { position: absolute; left: 0; white-space: nowrap;
  font-size: clamp(120px, 26vw, 400px); line-height: .95; will-change: transform; }
.ms-fill { background: linear-gradient(110deg, #00AEBB 0%, #E8E4D3 45%, #00AEBB 90%);
  background-size: 250% 100%; -webkit-background-clip: text; background-clip: text;
  color: transparent; animation: msSheen 5s linear infinite; }
.ms-outline { color: transparent; -webkit-text-stroke: 2px rgba(0,174,187,.55); }
.ms-resolve { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 26px;
  align-items: center; justify-content: center; text-align: center; opacity: 0; padding: 0 6vw; }
.ms-sub { margin: 0; max-width: 560px; }
@keyframes msSheen { to { background-position: 250% 0; } }
`;