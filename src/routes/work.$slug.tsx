import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { CtaBand } from "@/components/site/Footer";
import { PROJECTS } from "@/lib/site";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const i = PROJECTS.findIndex((p) => p.slug === params.slug);
    if (i < 0) throw notFound();
    return { project: PROJECTS[i]!, next: PROJECTS[(i + 1) % PROJECTS.length]!, index: i };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [
          { title: "Project not found - CRESVIA 360" },
          { name: "robots", content: "noindex" },
        ],
      };
    const p = loaderData.project;
    return {
      meta: [
        { title: `${p.name} - ${p.industry} Concept | CRESVIA 360` },
        { name: "description", content: p.summary },
        { property: "og:title", content: `${p.name} - CRESVIA 360 Concept` },
        { property: "og:description", content: p.summary },
        { property: "og:type", content: "article" },
      ],
    };
  },
  notFoundComponent: ProjectNotFound,
  component: CaseStudy,
});

function ProjectNotFound() {
  return (
    <div className="container-x pb-32 pt-48">
      <h1 className="font-display text-huge">That project isn't on the path.</h1>
      <Link to="/work" className="btn btn-primary mt-10">
        See all work
      </Link>
    </div>
  );
}

function CaseStudy() {
  const { project: p, next, index } = Route.useLoaderData();
  const chapters = [
    ["Challenge", p.challenge],
    ["Opportunity", p.opportunity],
    ["Approach", p.approach],
    ["Design", p.design],
    ["Development", p.development],
    ["Experience", p.experience],
  ];
  return (
    <>
      <section className="container-x pt-36">
        <Reveal>
          <Link to="/work" className="eyebrow link-line">
            ← All work
          </Link>
          <div className="mt-10 flex flex-wrap gap-3 font-mono text-micro uppercase tracking-[0.2em]">
            <span className="rounded-full bg-primary px-3 py-1 text-primary-foreground">
              Concept Project
            </span>
            <span className="rounded-full border border-border px-3 py-1">{p.industry}</span>
            <span className="rounded-full border border-border px-3 py-1">{p.capability}</span>
          </div>
          <h1 className="mt-8 font-display text-mega">{p.name}</h1>
          <p className="mt-6 max-w-2xl text-xl text-muted-foreground">{p.summary}</p>
        </Reveal>
        <Reveal delay={150} className="mt-16 overflow-hidden rounded-md">
          <img
            src={p.image}
            alt={`${p.name} concept interface`}
            width={1536}
            height={1024}
            className="w-full object-cover"
          />
        </Reveal>
      </section>

      <section className="container-x section-y">
        {chapters.map(([k, v], i) => (
          <Reveal key={k} className="grid gap-6 border-t border-line py-12 md:grid-cols-12">
            <p className="eyebrow md:col-span-3">
              <span className="text-primary">0{i + 1}</span> / {k}
            </p>
            <p className="font-display text-big md:col-span-8">{v}</p>
          </Reveal>
        ))}
        <Reveal className="mt-10 rounded-md border border-primary/40 bg-accent p-8 md:p-12">
          <p className="eyebrow mb-4 !text-primary">07 / Conceptual outcome</p>
          <p className="font-display text-big">{p.outcome.replace("Conceptual outcome: ", "")}</p>
          <p className="mt-6 text-sm text-muted-foreground">
            This is a self-initiated concept. Outcomes describe intended impact, not measured
            results.
          </p>
        </Reveal>
      </section>

      <section className="border-t border-line">
        <Link
          to="/work/$slug"
          params={{ slug: next.slug }}
          className="container-x group flex items-center justify-between gap-6 py-16"
        >
          <div>
            <p className="eyebrow">
              Next project - {String(((index + 1) % 6) + 1).padStart(2, "0")}
            </p>
            <p className="mt-3 font-display text-huge transition-colors group-hover:text-primary">
              {next.name}
            </p>
          </div>
          <span
            className="text-5xl transition-transform duration-500 group-hover:translate-x-3"
            aria-hidden
          >
            →
          </span>
        </Link>
      </section>
      <CtaBand />
    </>
  );
}
