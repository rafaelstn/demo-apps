import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-10 text-sm text-paper/60">
        <div className="flex flex-col gap-2">
          <img src="/logo-d.svg" alt="DamaTech" className="h-5 w-auto opacity-90 [filter:brightness(0)_invert(1)]" />
          <p>DamaTech Solutions · Guarulhos, SP</p>
        </div>
        <div className="flex gap-5">
          <a href="https://wa.me/5511977953952" target="_blank" rel="noopener noreferrer" className="transition hover:text-paper">
            WhatsApp
          </a>
          <a href="https://damatechsolutions.com.br" target="_blank" rel="noopener noreferrer" className="transition hover:text-paper">
            Site
          </a>
          <Link href="/regulamento" className="transition hover:text-paper">
            Regulamento
          </Link>
        </div>
      </div>
    </footer>
  );
}
