import { Link } from "@tanstack/react-router";
import { CONTACT, NAV, SERVICES, waLink, mailtoLink, onEmailClick } from "@/lib/site";
import { Reveal } from "./Reveal";
import logo from "@/assets/cresvia360-logo.svg";

export function CtaBand() {
  return (
    <section className="section-y relative overflow-hidden border-t border-line">
      <div className="absolute inset-0 bg-glow" aria-hidden />
      <div className="container-x relative">
        <Reveal>
          <p className="eyebrow mb-8">Let's move forward</p>
          <h2 className="font-display text-mega max-w-6xl">
            Ready to move <em className="text-primary">forward?</em>
          </h2>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link to="/contact" className="btn btn-primary">
              Start a Project <span aria-hidden>→</span>
            </Link>
            <Link to="/contact" search={{ intent: "consultation" }} className="btn btn-ghost">
              Book a Consultation
            </Link>
            <a href={waLink()} target="_blank" rel="noreferrer" className="btn btn-ghost">
              WhatsApp Us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line pb-10 pt-20">
      <div className="container-x grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="h-12 w-12" />
            <p className="font-display text-5xl">
              CRESVIA <span className="font-mono text-lg text-primary align-top">360</span>
            </p>
          </div>
          <p className="mt-3 text-muted-foreground">The Path of Growth.</p>
          <p className="mt-8 max-w-sm text-sm text-muted-foreground">
            Your growth is our growth. A digital growth studio helping businesses move from
            potential to performance.
          </p>
        </div>
        <div className="md:col-span-2">
          <p className="eyebrow mb-5">Navigate</p>
          <ul className="space-y-2.5 text-sm">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="link-line">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow mb-5">Services</p>
          <ul className="grid grid-cols-2 gap-2.5 text-sm text-muted-foreground">
            {SERVICES.map((s) => (
              <li key={s.key}>
                <Link to="/services" className="link-line hover:text-foreground">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="eyebrow mb-5">Contact</p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href={mailtoLink()} onClick={onEmailClick} className="link-line">
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a href={waLink()} target="_blank" rel="noreferrer" className="link-line">
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="link-line"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="link-line"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-x mt-20 flex flex-wrap justify-between gap-4 border-t border-line pt-6 font-mono text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} CRESVIA 360. All rights reserved.</span>
        <span>Crescere + Via - The Path of Growth</span>
      </div>
    </footer>
  );
}
