import { createFileRoute } from "@tanstack/react-router";
import { Reveal, SectionHead } from "@/components/site/Reveal";
import { ProjectCard } from "@/components/site/ProjectCard";
import { CtaBand } from "@/components/site/Footer";
import { PROJECTS } from "@/lib/site";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Work - CRESVIA 360 Concept Projects" },
      {
        name: "description",
        content:
          "Concept projects across e-commerce, healthcare, AI, hospitality, personal brands and local business.",
      },
      { property: "og:title", content: "Work - CRESVIA 360" },
      {
        property: "og:description",
        content:
          "Self-initiated concept projects that show how CRESVIA 360 thinks, designs and builds.",
      },
    ],
  }),
  component: Work,
});

function Work() {
  return (
    <>
      <section className="container-x pb-20 pt-40">
        <SectionHead
          index="Work"
          label="Cresvia concepts"
          title={
            <>
              Ideas, built to <em className="text-primary">perform.</em>
            </>
          }
        />
        <Reveal>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            Every project below is a clearly labelled concept - an exploration across a different
            industry and capability. No invented clients, no invented numbers. Just the work.
          </p>
        </Reveal>
        <div className="mt-20 grid gap-x-8 gap-y-20 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 120} className={i % 2 ? "md:mt-24" : ""}>
              <ProjectCard p={p} i={i} />
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
