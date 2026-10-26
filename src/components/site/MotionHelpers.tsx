import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Site-wide motion helpers (render nothing).
 * 1. Refresh ScrollTrigger once fonts and images have loaded, so pinned
 *    sections measure their final layout.
 * 2. Subtle magnetic hover on primary buttons (.btn-primary) only. Skipped on
 *    touch devices and when the user prefers reduced motion.
 */
export function MotionHelpers() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) document.fonts.ready.then(refresh).catch(() => {});
    if (document.readyState === "complete") refresh();
    else window.addEventListener("load", refresh, { once: true });

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (reduce || touch) {
      return () => window.removeEventListener("load", refresh);
    }

    let active: HTMLElement | null = null;
    // Center is measured while the button is at rest so the math never jitters.
    let cx = 0;
    let cy = 0;

    const release = (el: HTMLElement) => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1.1, 0.4)",
        onComplete: () => {
          el.style.transition = "";
          gsap.set(el, { clearProps: "transform" });
        },
      });
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const el = (e.target as Element | null)?.closest<HTMLElement>(".btn-primary") ?? null;
      if (el !== active) {
        if (active) release(active);
        active = el;
        if (el) {
          gsap.killTweensOf(el);
          gsap.set(el, { x: 0, y: 0 });
          const r = el.getBoundingClientRect();
          cx = r.left + r.width / 2;
          cy = r.top + r.height / 2;
          el.style.transition = "box-shadow 0.4s, background-color 0.4s";
        }
      }
      if (el && !(el as HTMLButtonElement).disabled) {
        const max = 8;
        const dx = Math.max(-max, Math.min(max, (e.clientX - cx) * 0.2));
        const dy = Math.max(-max, Math.min(max, (e.clientY - cy) * 0.2));
        gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: "power3.out", overwrite: "auto" });
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("pointermove", onMove);
      if (active) release(active);
    };
  }, []);

  return null;
}
