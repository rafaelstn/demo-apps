import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CtaWhatsApp } from "@/components/site/CtaWhatsApp";
import { REGULAMENTO, REGULAMENTO_INTRO, REGULAMENTO_VIGENCIA } from "@/lib/legal/regulamento";

export const metadata: Metadata = {
  title: "Regulamento da Oferta · Damatech",
  description: "Termos e condições comerciais da oferta de desenvolvimento de aplicativos nativos da DamaTech.",
};

export default function RegulamentoPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-prose px-5 py-16">
        <p className="font-display text-xs uppercase tracking-[0.22em] text-accent">DamaTech</p>
        <h1 className="mt-3 font-display text-display-md text-paper">Regulamento da Oferta</h1>
        <p className="mt-1 text-sm text-paper/50">
          Desenvolvimento de aplicativos nativos sob medida · {REGULAMENTO_VIGENCIA}
        </p>
        <p className="mt-6 text-paper/70">{REGULAMENTO_INTRO}</p>

        <div className="mt-10 space-y-10">
          {REGULAMENTO.map((secao) => (
            <section key={secao.n}>
              <h2 className="font-display text-lg text-paper">
                {secao.n}. {secao.titulo}
              </h2>
              <div className="mt-3 space-y-3">
                {secao.blocos.map((bloco, i) =>
                  bloco.tipo === "p" ? (
                    <p key={i} className="text-sm leading-relaxed text-paper/70">
                      {bloco.texto}
                    </p>
                  ) : (
                    <ul key={i} className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-paper/70">
                      {bloco.itens.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  )
                )}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-ink-soft ring-1 ring-white/10 p-6 text-center">
          <p className="text-paper/80">Ficou com alguma dúvida sobre a oferta?</p>
          <div className="mt-4 flex justify-center">
            <CtaWhatsApp texto="Tenho uma dúvida sobre o regulamento da oferta de aplicativos" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
