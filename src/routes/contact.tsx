import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Reveal } from "@/components/site/Reveal";
import { InquiryForm } from "@/components/site/InquiryForm";
import { FallingCards } from "@/components/site/FallingCards";
import { CONTACT, waLink, mailtoLink, onEmailClick } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  validateSearch: z.object({ intent: z.enum(["project", "consultation", "quote"]).optional() }),
  head: () => ({
    meta: [
      { title: "Start a Project - Contact CRESVIA 360" },
      {
        name: "description",
        content:
          "Book a consultation, request a quote or message us on WhatsApp. Tell us where your business needs to go.",
      },
      { property: "og:title", content: "Start a Project - CRESVIA 360" },
      {
        property: "og:description",
        content: "Tell us where your business needs to go. We'll build the path.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { intent } = Route.useSearch();
  const title =
    intent === "consultation"
      ? "Book a consultation."
      : intent === "quote"
        ? "Request a quote."
        : "Build something worth growing.";
  return (
    <section className="container-x section-y pt-40">
      <div className="grid gap-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow mb-6">Contact / Let's move forward</p>
          <h1 className="font-display text-huge">{title}</h1>
          <p className="mt-6 text-muted-foreground">
            Three short steps. We reply within one business day.
          </p>
          <div className="mt-12 space-y-px">
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between border-t border-line py-5"
            >
              <span>
                <span className="eyebrow block">Fastest</span>
                <span className="text-lg">WhatsApp us</span>
              </span>
              <span className="text-primary transition-transform group-hover:translate-x-1">↗</span>
            </a>
            <a
              href={mailtoLink()}
              onClick={onEmailClick}
              className="group flex items-center justify-between border-y border-line py-5"
            >
              <span>
                <span className="eyebrow block">Email</span>
                <span className="text-lg">{CONTACT.email}</span>
              </span>
              <span className="text-primary transition-transform group-hover:translate-x-1">↗</span>
            </a>
          </div>
        </Reveal>
        <Reveal
          delay={150}
          className="rounded-md border border-line bg-card p-6 md:p-12 lg:col-span-7 lg:col-start-6"
        >
          <div id="inquiry-form">
            <InquiryForm intent={intent} />
          </div>
        </Reveal>
      </div>
      <FallingCards />
    </section>
  );
}
