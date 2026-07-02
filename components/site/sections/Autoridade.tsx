import { Reveal } from "@/components/site/Reveal";

/**
 * Faixa de autoridade real (sem depoimento inventado): a DamaTech desenvolve
 * para instituições financeiras e órgãos públicos. Fundo em destaque com um
 * halo accent sutil, dois selos "Banco" e "Governo" como prova de padrão.
 */

function Selo({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-ink px-4 py-2 text-sm font-medium text-paper/85">
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}

export function Autoridade() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-0 h-64 w-[70%] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle at 50% 30%, rgba(37,99,235,0.28), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-3xl px-5 py-16 text-center md:py-24">
        <Reveal>
          <h2 className="font-display text-display-md text-paper">
            A mesma engenharia que roda em banco e governo.
          </h2>
        </Reveal>
        <Reveal delay={90}>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-paper/70">
            A DamaTech desenvolve sistemas para instituições financeiras e órgãos públicos. O seu app é feito com o mesmo
            padrão de qualidade, segurança e cuidado.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Selo>Instituições financeiras</Selo>
            <Selo>Órgãos públicos</Selo>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
