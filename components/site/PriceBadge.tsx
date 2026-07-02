import Link from "next/link";

export function PriceBadge() {
  return (
    <div className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full bg-ink-soft ring-1 ring-white/10 px-4 py-2 text-xs text-paper/80">
      <span className="font-display text-sm text-paper">a partir de R$ 5.000</span>
      <span aria-hidden className="text-paper/30">·</span>
      <span>apps nativos</span>
      <span aria-hidden className="text-paper/30">·</span>
      <span>código-fonte incluso</span>
      <span aria-hidden className="text-paper/30">·</span>
      <Link href="/regulamento" className="text-accent underline underline-offset-2 hover:text-accent-soft">
        consulte o regulamento
      </Link>
    </div>
  );
}
