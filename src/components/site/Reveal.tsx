import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";

export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Fail-visible: without IntersectionObserver, show content immediately.
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

export function SectionHead({
  index,
  label,
  title,
  className = "",
}: {
  index: string;
  label: string;
  title: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <p className="eyebrow mb-6">
        <span className="text-primary">{index}</span> / {label}
      </p>
      <h2 className="font-display text-huge max-w-5xl">{title}</h2>
    </Reveal>
  );
}
