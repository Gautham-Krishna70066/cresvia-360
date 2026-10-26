"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/site/Reveal";
import { PROCESS } from "@/lib/site";
import imgDiscover from "@/assets/process/discover.jpg";
import imgDefine from "@/assets/process/define.jpg";
import imgDesign from "@/assets/process/design.jpg";
import imgDevelop from "@/assets/process/develop.jpg";
import imgDeploy from "@/assets/process/deploy.jpg";
import imgGrow from "@/assets/process/grow.jpg";

gsap.registerPlugin(ScrollTrigger);

const DETAIL = [
  "Workshops and research into your business model, customers, competitors and ambition.",
  "We agree on goals, priorities, scope and how success will be measured.",
  "Brand direction, information architecture, wireframes and high-fidelity interface design.",
  "Engineering on a modern, fast, accessible stack - with regular reviews along the way.",
  "QA, launch, analytics setup and performance tuning before and after go-live.",
  "Ongoing optimisation, support and new initiatives guided by real data.",
];

const IMAGES = [imgDiscover, imgDefine, imgDesign, imgDevelop, imgDeploy, imgGrow];

/**
 * CRESVIA 360 - Process path
 * Curved teal spine that draws itself as you scroll (desktop);
 * the original straight line stays on mobile. Steps alternate off
 * the spine, each with its generated image revealing in.
 * Requires: gsap (already installed).
 */
export function ProcessPath() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const path = root.current?.querySelector<SVGPathElement>(".pp-curve-path");
      if (path) {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      gsap.utils.toArray<HTMLElement>(".pp-dot").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            ease: "back.out(2.5)",
            scrollTrigger: { trigger: el, start: "top 78%" },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".pp-img").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 1.08, y: 40 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="container-x section-y relative">
      {/* Straight spine - mobile only (unchanged from before) */}
      <div
        className="absolute bottom-0 left-[calc(clamp(1.25rem,4vw,3.5rem)+11px)] top-0 w-px bg-line md:hidden"
        aria-hidden
      />

      {/* Curved spine - desktop, draws on scroll */}
      <svg
        className="absolute inset-0 hidden h-full w-full md:block"
        viewBox="0 0 100 600"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          className="pp-curve-path"
          d="M50,0 C80,25 80,75 50,100 C20,125 20,175 50,200 C80,225 80,275 50,300 C20,325 20,375 50,400 C80,425 80,475 50,500 C20,525 20,575 50,600"
          fill="none"
          stroke="#00AEBB"
          strokeOpacity="0.55"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {PROCESS.map((s, i) => (
        <Reveal
          key={s.n}
          className={`relative mb-20 grid gap-6 pl-12 md:grid-cols-2 md:pl-0 ${i % 2 ? "" : ""}`}
        >
          <span
            className="pp-dot absolute left-[5px] top-3 h-3.5 w-3.5 rounded-full border-2 border-primary bg-background md:left-1/2 md:-translate-x-1/2"
            aria-hidden
          />
          <div className={i % 2 ? "md:col-start-2 md:pl-16" : "md:pr-16 md:text-right"}>
            <div className="pp-img mb-8 overflow-hidden rounded-xl border border-line">
              <img
                src={IMAGES[i]}
                alt={`${s.t} - abstract artwork`}
                className="aspect-[16/10] w-full object-cover"
                loading="lazy"
              />
            </div>
            <p className="font-mono text-xs text-primary">
              {s.n} / {s.t.toUpperCase()}
            </p>
            <h2 className="mt-4 font-display text-huge">{s.t}</h2>
            <p className="mt-4 text-lg">{s.d}</p>
            <p className="mt-3 text-muted-foreground">{DETAIL[i]}</p>
          </div>
        </Reveal>
      ))}
    </section>
  );
}
