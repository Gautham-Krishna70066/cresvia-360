import { createFileRoute, Link } from "@tanstack/react-router";
import { Intro } from "@/components/site/Intro";
import { MottoScrub } from "@/components/site/MottoScrub";
import { GrowthPath } from "@/components/site/GrowthPath";
import { Reveal, SectionHead } from "@/components/site/Reveal";
import { ServiceEcosystem } from "@/components/site/ServiceEcosystem";
import { ProjectCard } from "@/components/site/ProjectCard";
import { CtaBand } from "@/components/site/Footer";
import { PROCESS, PROJECTS, STAGES } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CRESVIA 360 - From Potential to Performance" },
      {
        name: "description",
        content:
          "A digital growth studio. Strategy, design, websites, web apps, SEO and marketing - built to move your business from potential to performance.",
      },
      { property: "og:title", content: "CRESVIA 360 - From Potential to Performance" },
      {
        property: "og:description",
        content:
          "Tell us where your business needs to go. We'll build the digital foundation that gets you there.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Intro />
      {/* HERO */}
      <section className="relative overflow-hidden pt-32 md:pt-40">
        <div className="absolute inset-0 bg-glow" aria-hidden />
        <div className="container-x relative grid items-end gap-12 pb-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-8 flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
                The path of growth
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="font-display text-mega">
                From potential
                <br />
                to <em className="text-primary">performance.</em>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 max-w-xl text-lg text-muted-foreground">
                CRESVIA 360 is a digital growth studio. Tell us where your business needs to go -
                we'll build the digital foundation that helps you get there.
              </p>
            </Reveal>
            <Reveal delay={300} className="mt-10 flex flex-wrap gap-4">
              <Link to="/contact" className="btn btn-primary">
                Start a Project <span aria-hidden>→</span>
              </Link>
              <Link to="/work" className="btn btn-ghost">
                Explore Our Work
              </Link>
            </Reveal>
          </div>
          <Reveal delay={200} className="lg:col-span-5">
            <GrowthPath />
          </Reveal>
        </div>
        <div className="container-x flex justify-between border-t border-line py-5 font-mono text-micro uppercase tracking-[0.2em] text-muted-foreground">
          <span>Scroll to explore ↓</span>
          <span className="hidden sm:inline">Crescere + Via</span>
          <span>360° perspective</span>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="section-y">
        <div className="container-x">
          <SectionHead
            index="01"
            label="The name"
            title={
              <>
                A name that is also <em className="text-primary">a promise.</em>
              </>
            }
          />
          <div className="mt-20 grid border-t border-line md:grid-cols-3">
            {[
              ["CRES", "Growth.", "From the Latin crescere - to grow, to rise, to become more."],
              [
                "VIA",
                "The path.",
                "The way forward. Growth isn't luck; it's a direction you build.",
              ],
              [
                "360",
                "Every angle.",
                "Brand, product, visibility, performance - growth from all sides.",
              ],
            ].map(([w, m, d], i) => (
              <Reveal
                key={w}
                delay={i * 120}
                className="border-b border-line py-10 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"
              >
                <p className="font-display text-7xl md:text-8xl">{w}</p>
                <p className="mt-4 text-xl text-primary">{m}</p>
                <p className="mt-3 max-w-xs text-muted-foreground">{d}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-20 max-w-3xl">
            <p className="font-display text-big">
              CRESVIA - <em>The Path of Growth.</em> We grow only when the businesses we work with
              grow. That's not a slogan; it's how we measure ourselves.
            </p>
          </Reveal>
        </div>
      </section>

      {/* TRANSFORMATION */}
      <section className="section-y border-t border-line">
        <div className="container-x">
          <SectionHead index="02" label="The transformation" title="Four states. One direction." />
          <div className="mt-20 space-y-0">
            {STAGES.map((s, i) => (
              <Reveal
                key={s.n}
                className="group grid items-end gap-6 border-t border-line py-10 md:grid-cols-12"
              >
                <span className="font-mono text-sm text-primary md:col-span-1">{s.n}</span>
                <h3
                  className="font-display text-huge transition-transform duration-700 group-hover:translate-x-3 md:col-span-6"
                  style={{ paddingLeft: `${i * 4}%` }}
                >
                  {s.t}
                </h3>
                <p className="text-lg text-muted-foreground md:col-span-4 md:col-start-9">{s.d}</p>
                <div
                  className="h-px bg-primary transition-all duration-1000 md:col-span-12"
                  style={{ width: `${25 * (i + 1)}%` }}
                  aria-hidden
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE REALLY DO */}
      <section className="section-y border-t border-line">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow mb-6">03 / What we really do</p>
            <h2 className="font-display text-huge">We don't start with the website.</h2>
            <h2 className="font-display text-huge italic text-muted-foreground">
              We start with where you want to go.
            </h2>
          </Reveal>
          <Reveal delay={150} className="space-y-6 text-lg lg:col-span-4 lg:col-start-9 lg:pt-24">
            <p>
              A website, an app, a brand, SEO, analytics, marketing - they're tools. On their own,
              each is just a deliverable.
            </p>
            <p>
              We connect them into a single growth strategy, so every piece pushes the business in
              the same direction.
            </p>
            <Link to="/services" className="btn btn-ghost">
              See how it connects →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-y">
        <div className="container-x">
          <SectionHead
            index="04"
            label="Capabilities"
            title={
              <>
                One ecosystem. <em className="text-primary">Built for growth.</em>
              </>
            }
          />
          <div className="mt-20">
            <ServiceEcosystem />
          </div>
        </div>
      </section>

      {/* WORK */}
      <section className="section-y border-t border-line">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead index="05" label="Concept work" title="Explore the work." />
            <Link to="/work" className="btn btn-ghost">
              All concept projects →
            </Link>
          </div>
          <p className="mt-6 max-w-xl text-sm text-muted-foreground">
            These are CRESVIA concept projects - self-initiated explorations that show how we think
            and build. Client work will join them here.
          </p>
          <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2">
            {PROJECTS.slice(0, 4).map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 120} className={i % 2 ? "md:mt-24" : ""}>
                <ProjectCard p={p} i={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS PREVIEW */}
      <section className="section-y border-t border-line">
        <div className="container-x">
          <SectionHead index="06" label="Process" title="The path, step by step." />
          <div className="mt-16 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-6">
            {PROCESS.map((s, i) => (
              <Reveal
                key={s.n}
                delay={i * 80}
                className="bg-background p-6 transition-colors hover:bg-surface"
              >
                <p className="font-mono text-xs text-primary">{s.n}</p>
                <p className="mt-10 font-display text-3xl">{s.t}</p>
                <p className="mt-3 text-sm text-muted-foreground">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY - pinned motto scrub */}
      <MottoScrub />

      <CtaBand />
    </>
  );
}
