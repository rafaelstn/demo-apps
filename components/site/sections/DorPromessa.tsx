import { Reveal } from "@/components/site/Reveal";

/**
 * Faixa de dor/promessa logo abaixo do hero. Fundo levemente diferente
 * (ink-soft) com hairline em cima e embaixo pra separar do hero e da
 * próxima faixa. Texto centralizado, leitura rápida.
 */
export function DorPromessa() {
  return (
    <section className="border-y border-white/10 bg-ink-soft/60">
      <div className="mx-auto max-w-3xl px-5 py-16 text-center md:py-20">
        <Reveal>
          <h2 className="font-display text-display-md text-paper">
            Seu cliente vive no celular. O seu negócio precisa estar lá.
          </h2>
        </Reveal>
        <Reveal delay={90}>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-paper/70">
            Site não fideliza, aplicativo sim. Com o app do seu negócio na tela inicial do cliente, você vende de novo,
            sem pagar comissão para aplicativo de terceiro.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
