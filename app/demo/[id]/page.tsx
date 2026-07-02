import Link from "next/link";
import { notFound } from "next/navigation";
import { APPS, getApp } from "@/lib/catalog/apps";
import { PhoneFrame } from "@/components/simulator/PhoneFrame";
import { APP_REGISTRY } from "@/components/apps/registry";
import { CtaWhatsApp } from "@/components/site/CtaWhatsApp";
import { PriceBadge } from "@/components/site/PriceBadge";

export function generateStaticParams() {
  return APPS.map((a) => ({ id: a.id }));
}

export default async function DemoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const modelo = getApp(id);
  if (!modelo) notFound();

  const AppComp = APP_REGISTRY[id];

  return (
    <main className="min-h-screen">
      {/* Barra de navegação no mobile (o app cobre a tela abaixo dela) */}
      <div className="md:hidden fixed inset-x-0 top-0 z-30 flex h-11 items-center justify-between border-b border-black/5 bg-white px-4">
        <Link href="/" className="text-sm font-medium text-ink" style={{ color: modelo.accent }}>
          ← modelos
        </Link>
        <span className="text-xs text-ink-faint">{modelo.nome} · demonstração</span>
      </div>

      <div className="bg-grid relative">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-10 md:grid-cols-2 md:items-center md:py-16">
          {/* Painel de venda */}
          <div className="order-2 md:order-1">
            <Link href="/" className="text-sm text-paper/60 transition hover:text-paper">
              ← voltar aos modelos
            </Link>
            <span
              className="mt-5 inline-block rounded-full px-2.5 py-1 text-xs font-medium"
              style={{ backgroundColor: `${modelo.accent}22`, color: modelo.accent }}
            >
              {modelo.nicho}
            </span>
            <h1 className="mt-3 font-display text-display-md text-paper">{modelo.nome}</h1>
            <p className="mt-4 max-w-md text-paper/70">{modelo.descricaoVenda}</p>
            <p className="mt-3 text-sm text-paper/50">
              É uma demonstração. O seu app é nativo, feito sob medida com a sua marca.
            </p>
            <div className="mt-6">
              <CtaWhatsApp texto={modelo.ctaWhats} />
            </div>
            <div className="mt-6">
              <PriceBadge />
            </div>
          </div>

          {/* Simulador */}
          <div className="order-1 md:order-2">
            {AppComp ? (
              <PhoneFrame accent={modelo.accent}>
                <AppComp accent={modelo.accent} />
              </PhoneFrame>
            ) : (
              <div className="grid h-64 place-items-center rounded-2xl bg-ink-soft ring-1 ring-white/10">
                <p className="text-paper/50">App em construção.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
