import { useState } from "react";
import { z } from "zod";
import { SERVICES, waLink, openEmail } from "@/lib/site";

const schema = z.object({
  name: z.string().trim().min(2, "Please share your name").max(100),
  company: z.string().trim().max(120).optional(),
  email: z.string().trim().email("Enter a valid email").max(200),
  phone: z.string().trim().max(30).optional(),
  businessType: z.string().max(60).optional(),
  website: z.string().trim().max(200).optional(),
  services: z.array(z.string()).min(1, "Choose at least one"),
  budget: z.string().min(1, "Choose a range"),
  timeline: z.string().min(1, "Choose a timeline"),
  goal: z.string().trim().min(5, "Tell us where you want to go").max(300),
  description: z.string().trim().max(2000).optional(),
});
type Data = z.infer<typeof schema>;
type Errors = Partial<Record<keyof Data, string>>;

const BUSINESS = ["Startup", "SME", "Established company", "Personal brand", "E-commerce", "Other"];
const BUDGETS = ["Under ₹50k", "₹50k – ₹1.5L", "₹1.5L – ₹5L", "₹5L+", "Not sure yet"];
const TIMELINES = ["ASAP", "1–2 months", "3–6 months", "Flexible"];

const STEPS = [
  { label: "Direction", fields: ["goal", "services"] as const },
  { label: "Scope", fields: ["budget", "timeline"] as const },
  { label: "You", fields: ["name", "email"] as const },
];

export function InquiryForm({ intent }: { intent?: string | undefined }) {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [d, setD] = useState<Data>({
    name: "",
    company: "",
    email: "",
    phone: "",
    businessType: "",
    website: "",
    services: [],
    budget: "",
    timeline: "",
    goal: "",
    description: "",
  });
  const set = <K extends keyof Data>(k: K, v: Data[K]) => {
    setD((x) => ({ ...x, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = (fields: readonly (keyof Data)[]) => {
    const r = schema.safeParse(d);
    if (r.success) return true;
    const errs: Errors = {};
    for (const i of r.error.issues) {
      const k = i.path[0] as keyof Data;
      if (fields.includes(k) && !errs[k]) errs[k] = i.message;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const message = () =>
    [
      `New ${intent === "consultation" ? "consultation request" : intent === "quote" ? "quote request" : "project inquiry"} - CRESVIA 360`,
      `Name: ${d.name}${d.company ? ` (${d.company})` : ""}`,
      `Email: ${d.email}`,
      d.phone && `Phone: ${d.phone}`,
      d.businessType && `Business: ${d.businessType}`,
      d.website && `Website: ${d.website}`,
      `Services: ${d.services.join(", ")}`,
      `Budget: ${d.budget}`,
      `Timeline: ${d.timeline}`,
      `Goal: ${d.goal}`,
      d.description && `Details: ${d.description}`,
    ]
      .filter(Boolean)
      .join("\n");

  const submit = (via: "email" | "whatsapp") => {
    if (!validate(Object.keys(schema.shape) as (keyof Data)[])) return;
    setStatus("sending");
    const body = message();
    setTimeout(() => {
      if (via === "whatsapp") window.open(waLink(body), "_blank", "noopener,noreferrer");
      else openEmail("Project inquiry - " + d.name, body);
      setStatus("done");
    }, 500);
  };

  if (status === "done") {
    return (
      <div className="animate-in fade-in duration-700 py-10" role="status">
        <p className="eyebrow mb-4 text-primary">Inquiry ready</p>
        <h3 className="font-display text-big">
          Thank you, {d.name.split(" ")[0]}. The path starts here.
        </h3>
        <p className="mt-4 max-w-lg text-muted-foreground">
          Your message has been prepared in your email or WhatsApp app - just hit send. We reply
          within one business day.
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setStep(0);
          }}
          className="btn btn-ghost mt-8"
        >
          Start another inquiry
        </button>
      </div>
    );
  }

  const Err = ({ k }: { k: keyof Data }) =>
    errors[k] ? (
      <p className="mt-2 text-sm text-destructive" role="alert">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (step < 2) {
          if (validate(STEPS[step]!.fields)) setStep(step + 1);
        } else submit("email");
      }}
    >
      <ol className="mb-12 flex gap-3" aria-label="Form progress">
        {STEPS.map((s, i) => (
          <li key={s.label} className="flex-1">
            <div
              className={`h-px transition-colors duration-500 ${i <= step ? "bg-primary" : "bg-border"}`}
            />
            <p
              className={`mt-3 font-mono text-micro uppercase tracking-[0.2em] ${i === step ? "text-foreground" : "text-muted-foreground"}`}
            >
              0{i + 1} / {s.label}
            </p>
          </li>
        ))}
      </ol>

      <div key={step} className="animate-in fade-in slide-in-from-right-4 space-y-10 duration-500">
        {step === 0 && (
          <>
            <div>
              <label htmlFor="goal" className="font-display text-3xl">
                Where does your business need to go?
              </label>
              <input
                id="goal"
                className="field mt-3"
                placeholder="e.g. Launch online and start getting direct bookings"
                value={d.goal}
                onChange={(e) => set("goal", e.target.value)}
              />
              <Err k="goal" />
            </div>
            <fieldset>
              <legend className="font-display text-3xl">What could help get you there?</legend>
              <div className="mt-5 flex flex-wrap gap-2">
                {SERVICES.map((s) => {
                  const on = d.services.includes(s.name);
                  return (
                    <button
                      type="button"
                      key={s.key}
                      aria-pressed={on}
                      className="chip"
                      onClick={() =>
                        set(
                          "services",
                          on ? d.services.filter((x) => x !== s.name) : [...d.services, s.name],
                        )
                      }
                    >
                      {s.name}
                    </button>
                  );
                })}
                <button
                  type="button"
                  aria-pressed={d.services.includes("Not sure")}
                  className="chip"
                  onClick={() =>
                    set(
                      "services",
                      d.services.includes("Not sure")
                        ? d.services.filter((x) => x !== "Not sure")
                        : [...d.services, "Not sure"],
                    )
                  }
                >
                  Not sure - advise me
                </button>
              </div>
              <Err k="services" />
            </fieldset>
          </>
        )}

        {step === 1 && (
          <>
            {[
              ["budget", "Project budget", BUDGETS],
              ["timeline", "Timeline", TIMELINES],
              ["businessType", "Business type (optional)", BUSINESS],
            ].map(([k, label, opts]) => (
              <fieldset key={k as string}>
                <legend className="font-display text-3xl">{label as string}</legend>
                <div className="mt-5 flex flex-wrap gap-2">
                  {(opts as string[]).map((o) => (
                    <button
                      type="button"
                      key={o}
                      aria-pressed={d[k as "budget"] === o}
                      className="chip"
                      onClick={() => set(k as "budget", o)}
                    >
                      {o}
                    </button>
                  ))}
                </div>
                <Err k={k as keyof Data} />
              </fieldset>
            ))}
            <div>
              <label htmlFor="website" className="eyebrow">
                Current website (optional)
              </label>
              <input
                id="website"
                className="field"
                placeholder="https://"
                value={d.website}
                onChange={(e) => set("website", e.target.value)}
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="grid gap-8 sm:grid-cols-2">
              {(
                [
                  ["name", "Name *", "text"],
                  ["company", "Company", "text"],
                  ["email", "Email *", "email"],
                  ["phone", "Phone / WhatsApp", "tel"],
                ] as const
              ).map(([k, l, t]) => (
                <div key={k}>
                  <label htmlFor={k} className="eyebrow">
                    {l}
                  </label>
                  <input
                    id={k}
                    type={t}
                    className="field"
                    value={d[k] ?? ""}
                    onChange={(e) => set(k, e.target.value)}
                    autoComplete={k === "company" ? "organization" : k === "phone" ? "tel" : k}
                  />
                  <Err k={k} />
                </div>
              ))}
            </div>
            <div>
              <label htmlFor="description" className="eyebrow">
                Anything else we should know?
              </label>
              <textarea
                id="description"
                rows={4}
                className="field resize-none"
                value={d.description}
                onChange={(e) => set("description", e.target.value)}
              />
            </div>
          </>
        )}
      </div>

      <div className="mt-14 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className={`text-sm text-muted-foreground link-line ${step === 0 ? "invisible" : ""}`}
        >
          ← Back
        </button>
        <div className="flex flex-wrap gap-3">
          {step === 2 && (
            <button
              type="button"
              onClick={() => submit("whatsapp")}
              disabled={status === "sending"}
              className="btn btn-ghost"
            >
              Send via WhatsApp
            </button>
          )}
          <button type="submit" disabled={status === "sending"} className="btn btn-primary">
            {status === "sending" ? "Preparing…" : step < 2 ? "Continue →" : "Send Inquiry →"}
          </button>
        </div>
      </div>
    </form>
  );
}
