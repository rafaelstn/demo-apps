import { APPS } from "@/lib/catalog/apps";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PriceBadge } from "@/components/site/PriceBadge";
import { CtaWhatsApp } from "@/components/site/CtaWhatsApp";
import { ModeloCard } from "@/components/site/ModeloCard";
import { HeroPhone } from "@/components/site/HeroPhone";

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative">
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
              <div className="mt-7 flex justify-center md:justify-start">
                <PriceBadge />
              </div>
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

        <section className="mx-auto max-w-6xl px-5 pb-10">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {APPS.map((m) => (
              <ModeloCard key={m.id} modelo={m} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
