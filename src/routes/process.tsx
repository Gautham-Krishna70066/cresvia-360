import { createFileRoute } from "@tanstack/react-router";
import { SectionHead } from "@/components/site/Reveal";
import { ProcessPath } from "@/components/site/ProcessPath";
import { CtaBand } from "@/components/site/Footer";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Process - Discover to Grow | CRESVIA 360" },
      {
        name: "description",
        content:
          "Discover, Define, Design, Develop, Deploy, Grow - a transparent six-step path from idea to growth.",
      },
      { property: "og:title", content: "Process - CRESVIA 360" },
      {
        property: "og:description",
        content: "A transparent six-step path from potential to performance.",
      },
    ],
  }),
  component: Process,
});

function Process() {
  return (
    <>
      <section className="container-x pb-10 pt-40">
        <SectionHead
          index="Process"
          label="The path starts here"
          title={
            <>
              Six steps. <em className="text-primary">No guesswork.</em>
            </>
          }
        />
      </section>
      <ProcessPath />
      <CtaBand />
    </>
  );
}
