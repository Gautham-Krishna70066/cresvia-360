import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CONTACT, waLink, mailtoLink, onEmailClick } from "@/lib/site";

const TILTS: number[] = [-10, 7, -5];

type FallingCard = {
  label: string;
  title: string;
  body: string;
  href: string;
  external?: boolean;
  onClick?: (e: { preventDefault: () => void }) => void;
  cls: string;
};

export function FallingCards() {
  const ref = useRef<HTMLDivElement>(null);

  const cards: FallingCard[] = [
    {
      label: "Fastest",
      title: "WhatsApp",
      body: "Message us directly. Replies within hours, not days.",
      href: waLink(),
      external: true,
      cls: "bg-[#00AEBB] text-[#031211]",
    },
    {
      label: "Classic",
      title: "Email",
      body: `${CONTACT.email} - tell us where your business needs to go.`,
      href: mailtoLink(),
      onClick: onEmailClick,
      cls: "bg-[#E8E4D3] text-[#031211]",
    },
    {
      label: "Detailed",
      title: "Brief form",
      body: "Tell us where your business needs to go. We come back with a plan.",
      href: "#inquiry-form",
      cls: "border border-[#00AEBB]/40 bg-[#0A2422] text-[#E8E4D3]",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray<HTMLElement>(".falling-card");
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        // Reduced motion: show the final resting state, no drop or scrub.
        els.forEach((el, i) => gsap.set(el, { y: 0, rotation: TILTS[i] ?? 0, opacity: 1 }));
        return;
      }
      els.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: -window.innerHeight * 0.9, rotation: (TILTS[i] ?? 0) * 3, opacity: 0 },
          {
            y: 0,
            rotation: TILTS[i] ?? 0,
            opacity: 1,
            ease: "bounce.out",
            duration: 1.1,
            delay: i * 0.18,
            scrollTrigger: { trigger: ref.current, start: "top 65%" },
          },
        );
        gsap.to(el, {
          rotation: (TILTS[i] ?? 0) * 0.4,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top 40%", end: "bottom top", scrub: 1 },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="mt-24 flex flex-wrap items-center justify-center gap-8">
      {cards.map((card) => (
        <a
          key={card.title}
          href={card.href}
          onClick={card.onClick}
          {...(card.external ? { target: "_blank", rel: "noreferrer" } : {})}
          className={`falling-card flex min-h-[300px] w-full max-w-[300px] flex-col justify-between rounded-md p-8 shadow-2xl will-change-transform sm:w-[300px] ${card.cls}`}
        >
          <span>
            <span className="eyebrow block opacity-70">{card.label}</span>
            <span className="font-display mt-3 block text-3xl">{card.title}</span>
          </span>
          <span className="mt-10 block text-sm leading-relaxed opacity-80">{card.body}</span>
        </a>
      ))}
    </div>
  );
}
