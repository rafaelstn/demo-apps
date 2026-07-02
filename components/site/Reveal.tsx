"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Reveal-on-scroll leve. Aplica um fade + subida sutil quando o bloco entra
 * na viewport (IntersectionObserver, uma vez só). Respeita
 * prefers-reduced-motion: nesse caso o conteúdo já nasce visível, sem
 * transição. No export estático o markup começa visível e o efeito é
 * progressive enhancement no cliente.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visivel, setVisivel] = useState(false);
  const [animar, setAnimar] = useState(false);

  useEffect(() => {
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduzido) {
      setVisivel(true);
      return;
    }
    setAnimar(true);
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisivel(true);
            obs.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const base = animar
    ? `transition-all duration-700 ease-out will-change-transform ${
        visivel ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      }`
    : "";

  return (
    <Tag
      ref={ref as never}
      className={`${base} ${className}`}
      style={animar ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
