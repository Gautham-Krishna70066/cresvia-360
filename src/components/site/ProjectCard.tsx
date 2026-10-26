import { Link } from "@tanstack/react-router";
import { PixelImage } from "@/components/site/PixelImage";
import type { Project } from "@/lib/site";

export function ProjectCard({ p, i, large = false }: { p: Project; i: number; large?: boolean }) {
  return (
    <Link to="/work/$slug" params={{ slug: p.slug }} className="group block">
      <div
        className={`relative overflow-hidden rounded-md bg-surface ${large ? "aspect-[16/10]" : "aspect-[4/3]"}`}
      >
        <PixelImage
          src={p.image}
          alt={`${p.name} concept project - ${p.summary}`}
          width={1536}
          height={1024}
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 rounded-full border border-border bg-background/70 px-3 py-1 font-mono text-micro uppercase tracking-[0.2em] backdrop-blur">
          Cresvia Concept
        </span>
        <span
          className="absolute bottom-4 right-4 flex h-12 w-12 translate-y-3 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
          aria-hidden
        >
          →
        </span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <h3 className="font-display text-3xl">{p.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{p.summary}</p>
        </div>
        <div className="shrink-0 text-right font-mono text-micro uppercase tracking-[0.15em] text-muted-foreground">
          <p className="text-primary">{String(i + 1).padStart(2, "0")}</p>
          <p>{p.industry}</p>
        </div>
      </div>
    </Link>
  );
}
