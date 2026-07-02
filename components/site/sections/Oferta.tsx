import { Reveal } from "@/components/site/Reveal";
import { CtaWhatsApp } from "@/components/site/CtaWhatsApp";

/**
 * Faixa de oferta/preço: o momento de fechar. Card destacado com borda accent,
 * preço em display, bullets de garantia com check e o CTA principal do
 * WhatsApp.
 */

const BULLETS = [
  "Pagamento facilitado",
  "Código-fonte incluso",
  "1 mês de suporte e correções",
  "Publicação na Google Play inclusa",
];

function Check() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden>
      <path d="m4 10.5 4 4 8-9" />
    </svg>
  );
}

export function Oferta() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-accent/30 bg-ink-soft p-8 md:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-70 blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.35), transparent 70%)" }}
          />
          <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="font-display text-xs uppercase tracking-[0.22em] text-accent">A oferta</p>
              <h2 className="mt-3 font-display text-display-md text-paper">
                Tenha o app do seu negócio a partir de R$ 5.000
              </h2>
              <ul className="mt-7 space-y-3">
                {BULLETS.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-paper/80">
                    <Check />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-ink p-8 text-center">
              <p className="text-sm text-paper/60">A partir de</p>
              <p className="font-display text-5xl text-paper">R$ 5.000</p>
              <p className="text-sm text-paper/60">pagamento facilitado</p>
              <div className="mt-2 w-full">
                <CtaWhatsApp texto="Quero o app do meu negócio, a partir de R$ 5.000" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
