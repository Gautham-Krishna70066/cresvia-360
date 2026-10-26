import fashion from "@/assets/work-fashion.jpg";
import health from "@/assets/work-health.jpg";
import ai from "@/assets/work-ai.jpg";
import resort from "@/assets/work-resort.jpg";
import personal from "@/assets/work-personal.jpg";
import restaurant from "@/assets/work-restaurant.jpg";

// Contact details.
export const CONTACT = {
  whatsapp: "918054906030",
  email: "cresvia360@gmail.com",
};

export const waLink = (text = "Hi CRESVIA 360, I'd like to talk about a project.") =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;

const isTouchDevice = () =>
  typeof navigator !== "undefined" && /Android|iPhone|iPad|iPod|Mobi/i.test(navigator.userAgent);

/** mailto: link (kept as the fallback and for phones, which open their mail app). */
export const mailtoLink = (subject = "", body = "") => {
  const q = [
    subject && `subject=${encodeURIComponent(subject)}`,
    body && `body=${encodeURIComponent(body)}`,
  ].filter(Boolean);
  return `mailto:${CONTACT.email}${q.length ? `?${q.join("&")}` : ""}`;
};

/** Gmail web compose, used on desktop so no mail-app chooser appears. */
export const gmailComposeLink = (subject = "", body = "") =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT.email)}` +
  `&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

/** Open email: Gmail compose in a new tab on desktop, mail app on phones. */
export const openEmail = (subject = "", body = "") => {
  if (isTouchDevice()) {
    window.location.href = mailtoLink(subject, body);
  } else {
    const w = window.open(gmailComposeLink(subject, body), "_blank", "noopener,noreferrer");
    if (!w) window.location.href = mailtoLink(subject, body);
  }
};

/** onClick for <a href={mailtoLink()}>: keeps mailto as the no-JS fallback. */
export const onEmailClick = (e: { preventDefault: () => void }) => {
  e.preventDefault();
  openEmail();
};

export const NAV = [
  { to: "/work", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/process", label: "Process" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export type Service = {
  key: string;
  name: string;
  what: string;
  why: string;
  we: string;
  outcome: string;
};
export const SERVICES: Service[] = [
  {
    key: "strategy",
    name: "Strategy",
    what: "Defining where the business needs to go digitally.",
    why: "Without direction, every digital investment is a guess.",
    we: "Map goals, audience and gaps into a clear digital roadmap.",
    outcome: "Every decision ties back to growth.",
  },
  {
    key: "branding",
    name: "Branding",
    what: "Digital identity, visual direction and brand systems.",
    why: "People trust what feels considered and consistent.",
    we: "Craft identity systems built to scale across every touchpoint.",
    outcome: "A brand that's recognised and remembered.",
  },
  {
    key: "uiux",
    name: "UI/UX",
    what: "Interfaces designed around usability, clarity and conversion.",
    why: "Friction quietly costs customers.",
    we: "Research, wireframe and design experiences that feel effortless.",
    outcome: "Visitors understand you faster and act sooner.",
  },
  {
    key: "websites",
    name: "Websites",
    what: "High-performance, responsive, scalable websites.",
    why: "Your website is often your first and most-visited salesperson.",
    we: "Engineer fast, accessible, SEO-ready sites on a modern stack.",
    outcome: "A presence that performs as well as it looks.",
  },
  {
    key: "apps",
    name: "Web Apps",
    what: "Custom digital products and business applications.",
    why: "Off-the-shelf tools rarely fit how you actually work.",
    we: "Design and build tailored platforms, portals and dashboards.",
    outcome: "Operations that run smoother and scale.",
  },
  {
    key: "seo",
    name: "SEO",
    what: "Technical and strategic optimisation for discoverability.",
    why: "If you can't be found, you can't be chosen.",
    we: "Fix technical foundations, structure content, target intent.",
    outcome: "Sustainable visibility for the right searches.",
  },
  {
    key: "marketing",
    name: "Marketing",
    what: "Campaigns and growth-oriented marketing strategies.",
    why: "Great products still need to reach people.",
    we: "Plan and run campaigns tied to measurable goals.",
    outcome: "Attention that converts into demand.",
  },
  {
    key: "analytics",
    name: "Analytics",
    what: "Understanding behaviour and improving the path to customer.",
    why: "What isn't measured can't be improved.",
    we: "Instrument journeys, read the data, run conversion experiments.",
    outcome: "Decisions guided by evidence, not opinion.",
  },
  {
    key: "support",
    name: "Support",
    what: "Continuous improvement, maintenance and technical support.",
    why: "Digital products decay without care.",
    we: "Monitor, update, secure and iterate month after month.",
    outcome: "A foundation that keeps getting better.",
  },
  {
    key: "infra",
    name: "Infrastructure",
    what: "Reliable hosting, domains and digital setup.",
    why: "Downtime and slow servers erode trust.",
    we: "Set up secure, fast hosting, domains, email and deployment.",
    outcome: "It just works - reliably.",
  },
];

export type Project = {
  slug: string;
  name: string;
  industry: string;
  capability: string;
  image: string;
  summary: string;
  challenge: string;
  opportunity: string;
  approach: string;
  design: string;
  development: string;
  experience: string;
  outcome: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "vous",
    name: "VOUS",
    industry: "E-commerce",
    capability: "Brand-led commerce",
    image: fashion,
    summary: "An editorial storefront for a premium fashion label.",
    challenge:
      "Premium fashion labels often sell through generic templates that flatten the brand into a product grid.",
    opportunity:
      "Let the brand's editorial voice lead, with commerce woven in rather than bolted on.",
    approach:
      "We treated the site as a magazine that happens to sell - story first, cart always within reach.",
    design:
      "Dark, cinematic art direction, oversized serif typography and full-bleed campaign imagery.",
    development:
      "Headless commerce architecture with image optimisation and instant page transitions.",
    experience:
      "Lookbooks scroll like spreads; products reveal details on hover; checkout stays three steps.",
    outcome:
      "Conceptual outcome: a storefront that feels like the brand - positioned to raise perceived value and average order size.",
  },
  {
    slug: "nucleon",
    name: "Nucleon",
    industry: "Healthcare",
    capability: "Trust & clarity",
    image: health,
    summary: "A calm, credible digital presence for a modern healthcare company.",
    challenge: "Healthcare sites tend to overwhelm with jargon and dense information.",
    opportunity: "Make complex science approachable without losing credibility.",
    approach:
      "Structured content around audiences - patients, practitioners, partners - each with a clear path.",
    design: "Light ivory surfaces, soft molecular visuals and generous whitespace to signal care.",
    development:
      "Accessible-first build (WCAG AA), structured data for SEO and a modular content system.",
    experience:
      "Visitors self-select their path on landing and reach relevant information within two clicks.",
    outcome:
      "Conceptual outcome: a clearer, more trustworthy first impression that supports enquiries from the right audience.",
  },
  {
    slug: "nexora",
    name: "Nexora AI",
    industry: "Technology",
    capability: "Product UI / Web App",
    image: ai,
    summary: "A product dashboard and marketing site for an AI agent platform.",
    challenge:
      "AI products are hard to explain; dashboards often expose complexity instead of value.",
    opportunity: "Visualise what the AI is doing so users feel in control.",
    approach:
      "Designed the product and marketing site as one system, so the promise matches the product.",
    design:
      "Dark UI with flowing data visualisations in electric teal and calm, legible hierarchy.",
    development:
      "Component-driven web app with real-time data streams and a shared design-token library.",
    experience:
      "A live flow view shows agents working; drill-downs reveal detail only when needed.",
    outcome:
      "Conceptual outcome: faster user understanding and a stronger story for demos and investors.",
  },
  {
    slug: "sea",
    name: "SÉA Resort",
    industry: "Hospitality",
    capability: "Mobile-first booking",
    image: resort,
    summary: "A mobile-first booking experience for a coastal luxury resort.",
    challenge: "Most guests discover resorts on mobile, but booking flows are built for desktop.",
    opportunity: "Make the phone experience feel as calm and premium as the stay itself.",
    approach:
      "Designed mobile-first around one action - check availability - with storytelling around it.",
    design: "Dusk-toned photography, refined serif typography and slow, deliberate motion.",
    development:
      "Lightweight, image-optimised build with booking-engine integration and fast loads on slow networks.",
    experience:
      "A thumb-reachable booking bar persists while guests explore rooms and experiences.",
    outcome:
      "Conceptual outcome: a shorter path from inspiration to direct booking, reducing reliance on third-party platforms.",
  },
  {
    slug: "nicolas-roch",
    name: "Nicolas Roch",
    industry: "Personal Brand",
    capability: "Identity & portfolio",
    image: personal,
    summary: "A personal brand and portfolio for an independent creator.",
    challenge: "Talented professionals often hide behind generic link-in-bio pages.",
    opportunity: "Turn a body of work into a clear, memorable personal brand.",
    approach: "Defined positioning first, then designed a portfolio that tells a single story.",
    design: "Oversized name typography, moody portraiture and a restrained two-colour system.",
    development: "Fast static site with a simple CMS so new work can be published in minutes.",
    experience: "Work is grouped by outcome, not format; enquiries are one tap away throughout.",
    outcome:
      "Conceptual outcome: a stronger professional presence that makes premium positioning credible.",
  },
  {
    slug: "atelier",
    name: "Atelier",
    industry: "Local Business",
    capability: "Local SEO & reservations",
    image: restaurant,
    summary: "A reservation-led website for a premium restaurant.",
    challenge: "Great restaurants lose bookings to outdated sites and PDF menus.",
    opportunity: "Capture local search and turn hunger into reservations.",
    approach: "Prioritised local SEO, a living menu and frictionless reservations.",
    design: "Candle-lit food photography, warm ivory type and an atmospheric dark palette.",
    development:
      "Structured data for local search, editable menu system and reservation integration.",
    experience: "Menu, location and booking are reachable from any screen within one tap.",
    outcome: "Conceptual outcome: better local discoverability and more direct reservations.",
  },
];

export const PROCESS = [
  { n: "01", t: "Discover", d: "Understand the business, audience and ambition." },
  { n: "02", t: "Define", d: "Clarify the problem and the digital direction." },
  { n: "03", t: "Design", d: "Create the visual and experience system." },
  { n: "04", t: "Develop", d: "Build the digital product - fast, accessible, scalable." },
  { n: "05", t: "Deploy", d: "Launch, optimise and measure." },
  { n: "06", t: "Grow", d: "Improve continuously based on data and business needs." },
];

export const STAGES = [
  { n: "01", t: "Potential", d: "Every business starts with something valuable." },
  {
    n: "02",
    t: "Elevation",
    d: "We identify what can be improved and elevate the digital experience.",
  },
  { n: "03", t: "Performance", d: "We design and build experiences that work." },
  {
    n: "04",
    t: "Growth",
    d: "Better digital foundations create opportunities for sustainable growth.",
  },
];
