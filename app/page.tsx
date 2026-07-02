import { APPS } from "@/lib/catalog/apps";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CtaWhatsApp } from "@/components/site/CtaWhatsApp";
import { ModeloCard } from "@/components/site/ModeloCard";
import { HeroPhone } from "@/components/site/HeroPhone";
import { Reveal } from "@/components/site/Reveal";
import { SecaoTitulo } from "@/components/site/sections/SecaoTitulo";
import { DorPromessa } from "@/components/site/sections/DorPromessa";
import { Beneficios } from "@/components/site/sections/Beneficios";
import { ComoFunciona } from "@/components/site/sections/ComoFunciona";
import { Autoridade } from "@/components/site/sections/Autoridade";
import { Oferta } from "@/components/site/sections/Oferta";
import { Faq } from "@/components/site/sections/Faq";
import { CtaFinal } from "@/components/site/sections/CtaFinal";

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative">
        {/* 1. HERO */}
        <section className="relative overflow-hidden">
          <div className="grain pointer-events-none absolute inset-0" />
          <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_78%)]" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:gap-8 md:py-24">
            {/* Coluna de texto */}
            <div className="text-center md:text-left">
              <p className="font-display text-xs uppercase tracking-[0.22em] text-accent">DamaTech Apps</p>
              <h1 className="mt-4 font-display text-display-lg text-paper">Crie o seu aplicativo</h1>
              <p className="mx-auto mt-5 max-w-md text-paper/70 md:mx-0">
                Aplicativos nativos sob medida para o seu negócio. Escolha um modelo ao lado e veja rodando de verdade,
                como o seu cliente vai usar.
              </p>
              <div className="mt-8 flex justify-center md:justify-start">
                <CtaWhatsApp texto="Quero criar o meu aplicativo com a DamaTech" />
              </div>
            </div>

            {/* Coluna do celular ao vivo */}
            <div className="flex justify-center md:justify-end">
              <HeroPhone />
            </div>
          </div>
        </section>

        {/* 2. FAIXA DORES/PROMESSA */}
        <DorPromessa />

        {/* 3. O QUE VOCÊ RECEBE */}
        <Beneficios />

        {/* 4. MODELOS (grade existente + cabeçalho de seção) */}
        <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <SecaoTitulo
            kicker="Modelos ao vivo"
            titulo="Veja o app do seu segmento rodando"
            texto="Toque em um modelo e navegue como o seu cliente vai navegar. É demonstração; o seu app é feito sob medida, na sua marca."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {APPS.map((m, i) => (
              <Reveal key={m.id} delay={(i % 3) * 80}>
                <ModeloCard modelo={m} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* 5. COMO FUNCIONA */}
        <ComoFunciona />

        {/* 6. FAIXA DE AUTORIDADE */}
        <Autoridade />

        {/* 7. OFERTA/PREÇO */}
        <Oferta />

        {/* 8. FAQ */}
        <Faq />

        {/* 9. CTA FINAL */}
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
