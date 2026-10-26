import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { NAV, waLink } from "@/lib/site";
import logo from "@/assets/cresvia360-logo.svg";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-1" aria-label="CRESVIA 360 home">
      <img src={logo} alt="" className="h-10 w-10" />
      <span className="font-display text-2xl tracking-tight">CRESVIA</span>
      <span className="font-mono text-xs text-primary">360</span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y > lastY && y > 80) setHidden(true);
      else if (y < lastY) setHidden(false);
      lastY = y;
    };
    const onMove = (e: MouseEvent) => {
      if (e.clientY < 80) setHidden(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${hidden && !open ? "-translate-y-full" : "translate-y-0"} ${scrolled ? "border-b border-line bg-background/80 backdrop-blur-md" : ""}`}
      >
        <div className="container-x flex h-20 items-center justify-between">
          <Logo />
          <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="link-line text-sm text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "!text-foreground" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/contact" className="btn btn-primary hidden !py-2.5 md:inline-flex">
              Start a Project
            </Link>
            <button
              onClick={() => setOpen((o) => !o)}
              className="relative z-50 flex h-11 w-11 items-center justify-center md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span
                className={`absolute h-px w-6 bg-foreground transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-1"}`}
              />
              <span
                className={`absolute h-px w-6 bg-foreground transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-1"}`}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-background transition-[clip-path] duration-700 md:hidden ${open ? "[clip-path:circle(150%_at_100%_0)]" : "pointer-events-none [clip-path:circle(0%_at_100%_0)]"}`}
        aria-hidden={!open}
      >
        <div className="container-x flex h-full flex-col justify-between pb-10 pt-28">
          <nav className="flex flex-col gap-2" aria-label="Mobile">
            {[{ to: "/", label: "Home" }, ...NAV].map((n, i) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-line py-3 font-display text-5xl transition-all duration-700"
                style={{
                  transitionDelay: open ? `${150 + i * 60}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "none" : "translateY(20px)",
                }}
              >
                <span className="font-mono text-xs text-primary">0{i + 1}</span>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3">
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn btn-primary justify-center"
            >
              Start a Project
            </Link>
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost justify-center"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
