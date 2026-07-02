import Link from "next/link";
import type { ModeloApp } from "@/lib/catalog/apps";

export function ModeloCard({ modelo }: { modelo: ModeloApp }) {
  return (
    <Link
      href={`/demo/${modelo.id}`}
      className="group relative overflow-hidden rounded-2xl bg-ink-soft ring-1 ring-white/10 p-6 transition hover:ring-accent/50"
    >
      <span
        className="inline-block rounded-full px-2.5 py-1 text-xs font-medium"
        style={{ backgroundColor: `${modelo.accent}22`, color: modelo.accent }}
      >
        {modelo.nicho}
      </span>
      <h3 className="mt-4 font-display text-xl text-paper">{modelo.nome}</h3>
      <p className="mt-1 text-sm text-paper/60">{modelo.tagline}</p>
      <span className="mt-5 inline-flex items-center gap-1 text-sm text-accent transition group-hover:gap-2">
        Ver app rodando →
      </span>
    </Link>
  );
}
