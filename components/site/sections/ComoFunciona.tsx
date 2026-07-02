import { Reveal } from "@/components/site/Reveal";
import { SecaoTitulo } from "@/components/site/sections/SecaoTitulo";

/**
 * "Como funciona": 3 passos numerados. Empilhados no mobile, horizontais no
 * desktop com um conector sutil entre os números. Número grande em display
 * na cor accent pra dar a sensação de progresso.
 */

const PASSOS = [
  { n: "1", titulo: "Você conta o seu negócio", texto: "Um briefing rápido pelo WhatsApp, sem burocracia." },
  { n: "2", titulo: "A gente desenha e desenvolve", texto: "O app na sua marca, feito sob medida, com você acompanhando." },
  { n: "3", titulo: "Publicamos e você entrega", texto: "Seu app na loja e na mão do seu cliente." },
];

export function ComoFunciona() {
  return (
    <section className="border-y border-white/10 bg-ink-soft/60">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <SecaoTitulo kicker="Como funciona" titulo="Do WhatsApp à loja, em três passos." />

        <ol className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
          {PASSOS.map((p, i) => (
            <Reveal key={p.n} as="li" delay={i * 90}>
              <div className="relative h-full rounded-2xl border border-white/10 bg-ink p-6">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-4xl leading-none text-accent">{p.n}</span>
                  <span aria-hidden className="h-px flex-1 translate-y-[-6px] bg-gradient-to-r from-accent/40 to-transparent" />
                </div>
                <h3 className="mt-4 font-display text-lg text-paper">{p.titulo}</h3>
                <p className="mt-1.5 text-sm text-paper/60">{p.texto}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
