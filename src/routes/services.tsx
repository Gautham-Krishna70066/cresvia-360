import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal, SectionHead } from "@/components/site/Reveal";
import { ServiceEcosystem } from "@/components/site/ServiceEcosystem";
import { CtaBand } from "@/components/site/Footer";
import { SERVICES } from "@/lib/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services - Digital Growth Ecosystem | CRESVIA 360" },
      {
        name: "description",
        content:
          "Strategy, branding, UI/UX, websites, web apps, SEO, marketing, analytics, support and infrastructure - connected into one growth system.",
      },
      { property: "og:title", content: "Services - CRESVIA 360" },
      {
        property: "og:description",
        content: "Not isolated packages. One connected digital growth ecosystem.",
      },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <section className="container-x pb-20 pt-40">
        <SectionHead
          index="Services"
          label="The ecosystem"
          title={
            <>
              Not packages. <em className="text-primary">A system.</em>
            </>
          }
        />
        <Reveal>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            Each capability is useful alone. Connected, they compound. Explore how each one
            contributes to growth.
          </p>
        </Reveal>
        <div className="mt-20">
          <ServiceEcosystem />
        </div>
      </section>
      <section className="container-x section-y border-t border-line">
        <p className="eyebrow mb-10">Full index</p>
        {SERVICES.map((s, i) => (
          <Reveal
            key={s.key}
            className="group grid gap-4 border-t border-line py-8 md:grid-cols-12"
          >
            <span className="font-mono text-xs text-primary md:col-span-1">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-4xl transition-colors group-hover:text-primary md:col-span-4">
              {s.name}
            </h3>
            <p className="text-muted-foreground md:col-span-4">{s.what}</p>
            <p className="text-sm md:col-span-3">→ {s.outcome}</p>
          </Reveal>
        ))}
        <div className="mt-14 flex flex-wrap gap-4">
          <Link to="/contact" search={{ intent: "quote" }} className="btn btn-primary">
            Request a Quote →
          </Link>
          <Link to="/contact" search={{ intent: "consultation" }} className="btn btn-ghost">
            Book a Consultation
          </Link>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
