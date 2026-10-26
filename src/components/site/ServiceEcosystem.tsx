import { useState } from "react";
import { SERVICES } from "@/lib/site";

export function ServiceEcosystem() {
  const [active, setActive] = useState(3);
  const s = SERVICES[active]!;
  const R = 42;

  return (
    <div className="grid items-center gap-14 lg:grid-cols-2">
      {/* Orbit (desktop) */}
      <div className="relative mx-auto hidden aspect-square w-full max-w-[560px] lg:block">
        <div className="absolute inset-[8%] rounded-full border border-line" />
        <div className="absolute inset-[24%] rounded-full border border-dashed border-line" />
        <div className="absolute inset-[36%] flex flex-col items-center justify-center rounded-full bg-glow text-center">
          <span className="eyebrow">Centre</span>
          <span className="font-display text-3xl leading-tight">
            Digital
            <br />
            Growth
          </span>
        </div>
        {SERVICES.map((sv, i) => {
          const a = (i / SERVICES.length) * Math.PI * 2 - Math.PI / 2;
          const on = i === active;
          return (
            <button
              key={sv.key}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-pressed={on}
              className="chip absolute -translate-x-1/2 -translate-y-1/2 bg-background"
              style={{ left: `${50 + Math.cos(a) * R}%`, top: `${50 + Math.sin(a) * R}%` }}
            >
              {sv.name}
            </button>
          );
        })}
      </div>

      {/* Chips (mobile) */}
      <div className="flex flex-wrap gap-2 lg:hidden">
        {SERVICES.map((sv, i) => (
          <button
            key={sv.key}
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            className="chip"
          >
            {sv.name}
          </button>
        ))}
      </div>

      <div
        key={s.key}
        className="animate-in fade-in slide-in-from-bottom-4 duration-700"
        aria-live="polite"
      >
        <p className="eyebrow mb-4">
          <span className="text-primary">{String(active + 1).padStart(2, "0")}</span> / {s.name}
        </p>
        <h3 className="font-display text-big">{s.what}</h3>
        <dl className="mt-10 divide-y divide-line border-y border-line">
          {[
            ["Why it matters", s.why],
            ["What CRESVIA does", s.we],
            ["Potential outcome", s.outcome],
          ].map(([k, v]) => (
            <div key={k} className="grid gap-2 py-5 sm:grid-cols-[180px_1fr]">
              <dt className="eyebrow pt-1">{k}</dt>
              <dd className="text-lg">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
