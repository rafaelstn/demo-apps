"use client";
import Link from "next/link";
import type { CSSProperties, MouseEvent } from "react";
import type { ModeloApp } from "@/lib/catalog/apps";
import { AppPreview } from "@/components/site/AppPreview";

export function ModeloCard({ modelo }: { modelo: ModeloApp }) {
  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <Link
      href={`/demo/${modelo.id}`}
      onMouseMove={onMove}
      className="spotlight group relative block overflow-hidden rounded-2xl border border-white/10 bg-ink-soft p-4 transition duration-300 hover:-translate-y-1 hover:border-[color:var(--card-accent)] hover:shadow-[0_24px_60px_-18px_var(--card-glow)]"
      style={
        {
          "--card-accent": modelo.accent,
          "--card-glow": `${modelo.accent}66`,
          "--spot": `${modelo.accent}26`,
        } as CSSProperties
      }
    >
      <AppPreview modelo={modelo} />

      <div className="mt-4">
        <span
          className="inline-block rounded-full px-2.5 py-1 text-xs font-medium"
          style={{ backgroundColor: `${modelo.accent}22`, color: modelo.accent }}
        >
          {modelo.nicho}
        </span>
        <h3 className="mt-3 font-display text-xl text-paper">{modelo.nome}</h3>
        <p className="mt-1 text-sm text-paper/60">{modelo.tagline}</p>
        <span
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium transition-all group-hover:gap-2"
          style={{ color: modelo.accent }}
        >
          Ver app rodando →
        </span>
      </div>
    </Link>
  );
}
