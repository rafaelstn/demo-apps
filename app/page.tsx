import { APPS } from "@/lib/catalog/apps";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PriceBadge } from "@/components/site/PriceBadge";
import { CtaWhatsApp } from "@/components/site/CtaWhatsApp";
import { ModeloCard } from "@/components/site/ModeloCard";

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative">
        <section className="relative overflow-hidden">
          <div className="grain pointer-events-none absolute inset-0" />
          <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_35%,transparent_75%)]" />
          <div className="relative mx-auto max-w-6xl px-5 py-24 text-center">
            <p className="font-display text-xs uppercase tracking-[0.22em] text-accent">DamaTech Apps</p>
            <h1 className="mx-auto mt-4 max-w-3xl font-display text-display-lg text-paper">
              Crie o seu aplicativo
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-paper/70">
              Aplicativos nativos sob medida para o seu negócio. Escolha um modelo abaixo e veja rodando de verdade,
              como o seu cliente vai usar.
            </p>
            <div className="mt-7 flex justify-center">
              <PriceBadge />
            </div>
            <div className="mt-8 flex justify-center">
              <CtaWhatsApp texto="Quero criar o meu aplicativo com a DamaTech" />
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
