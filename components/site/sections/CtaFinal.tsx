import { Reveal } from "@/components/site/Reveal";
import { CtaWhatsApp } from "@/components/site/CtaWhatsApp";

/**
 * CTA final antes do footer. Fecha a página com o pedido de ação principal e
 * o selo de preço logo abaixo. Fundo com halo accent sutil pra dar peso ao
 * último toque.
 */
export function CtaFinal() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-ink-soft/60">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-72 w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.22), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-3xl px-5 py-20 text-center md:py-28">
        <Reveal>
          <h2 className="font-display text-display-md text-paper">Pronto para ter o app do seu negócio?</h2>
        </Reveal>
        <Reveal delay={90}>
          <p className="mx-auto mt-4 max-w-xl text-lg text-paper/70">
            Fale com a gente agora e receba o seu orçamento.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <div className="mt-8 flex justify-center">
            <CtaWhatsApp texto="Quero criar o app do meu negócio com a DamaTech" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
