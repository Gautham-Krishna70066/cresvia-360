import { createFileRoute } from "@tanstack/react-router";
import { Reveal, SectionHead } from "@/components/site/Reveal";
import { KineticType } from "@/components/site/KineticType";
import { CtaBand } from "@/components/site/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About - The Team Behind CRESVIA 360" },
      {
        name: "description",
        content:
          "A young, ambitious studio of strategists, designers and engineers. Your growth is our growth.",
      },
      { property: "og:title", content: "About - CRESVIA 360" },
      {
        property: "og:description",
        content: "Meet the founders behind CRESVIA 360 and the philosophy that drives the studio.",
      },
    ],
  }),
  component: About,
});

// Placeholder founder profiles - replace with real names and bios.
// photo: path like "/founders/name.jpg" (file in public/founders/). linkedin: full profile URL.
// Until set, the portrait card keeps its initials and the LinkedIn link stays hidden.
const TEAM = [
  {
    initials: "F1",
    name: "Founder Name",
    role: "Co-founder · Strategy & Brand",
    bio: "Leads discovery and positioning - translating business ambition into a clear digital direction.",
    skills: ["Brand strategy", "Positioning", "Client partnerships"],
    photo: "" as string,
    linkedin: "" as string,
  },
  {
    initials: "F2",
    name: "Founder Name",
    role: "Co-founder · Design",
    bio: "Shapes the visual and experience systems that make every product feel considered.",
    skills: ["UI/UX", "Art direction", "Design systems"],
    photo: "" as string,
    linkedin: "" as string,
  },
  {
    initials: "F3",
    name: "Founder Name",
    role: "Co-founder · Engineering",
    bio: "Builds fast, scalable, accessible products on modern web technology.",
    skills: ["Full-stack", "Performance", "Infrastructure"],
    photo: "" as string,
    linkedin: "" as string,
  },
];

function About() {
  return (
    <>
      <section className="container-x pb-20 pt-40">
        <SectionHead
          index="About"
          label="Who we are"
          title={
            <>
              Young. Ambitious. <em className="text-primary">Deliberate.</em>
            </>
          }
        />
        <Reveal className="mt-12 grid gap-8 text-lg text-muted-foreground md:grid-cols-2">
          <p>
            CRESVIA 360 was founded on a simple belief: businesses with real potential deserve
            digital foundations that match it.
          </p>
          <p>
            We're a new studio - so instead of claiming a history, we let the work, the process and
            the way we partner speak for us.
          </p>
        </Reveal>
      </section>

      <section className="container-x section-y border-t border-line">
        <p className="eyebrow mb-12">The founders</p>
        <div className="grid gap-px bg-line md:grid-cols-3">
          {TEAM.map((t, i) => (
            <Reveal key={i} delay={i * 120} className="group bg-background p-8">
              {t.photo ? (
                <img
                  src={t.photo}
                  alt={t.name}
                  loading="lazy"
                  className="aspect-[4/5] w-full rounded-md object-cover"
                />
              ) : (
                <div className="flex aspect-[4/5] items-end justify-between rounded-md bg-surface bg-glow p-6 transition-colors">
                  <span className="font-display text-8xl text-foreground/20 transition-colors group-hover:text-primary">
                    {t.initials}
                  </span>
                  <span className="eyebrow">Portrait soon</span>
                </div>
              )}
              <h3 className="mt-8 font-display text-3xl">{t.name}</h3>
              <p className="mt-1 text-sm text-primary">{t.role}</p>
              <p className="mt-4 text-muted-foreground">{t.bio}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {t.skills.map((s) => (
                  <li key={s} className="rounded-full border border-border px-3 py-1 text-xs">
                    {s}
                  </li>
                ))}
              </ul>
              {t.linkedin && (
                <a
                  href={t.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="link-line mt-6 inline-block text-sm"
                >
                  LinkedIn ↗
                </a>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      <KineticType />

      <section className="section-y border-t border-line text-center">
        <div className="container-x">
          <Reveal>
            <h2 className="font-display text-mega">
              You grow → <em className="text-primary">we grow.</em>
            </h2>
            <p className="mx-auto mt-10 max-w-xl text-lg text-muted-foreground">
              We measure our success by yours. That's why we invest in long-term relationships, not
              one-off projects.
            </p>
          </Reveal>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
