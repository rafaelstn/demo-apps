import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <img src="/logo-symbol.svg" alt="" aria-hidden className="h-8 w-8 rounded-lg" />
          <span className="font-display text-lg tracking-tight text-paper">DamaTech</span>
        </Link>
        <a
          href="https://damatechsolutions.com.br"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-paper/70 transition hover:text-paper"
        >
          Site principal
        </a>
      </div>
    </header>
  );
}
