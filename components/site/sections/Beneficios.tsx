import { Reveal } from "@/components/site/Reveal";
import { SecaoTitulo } from "@/components/site/sections/SecaoTitulo";

/**
 * "O que você recebe": grade de 6 benefícios com ícone linear na cor accent,
 * título e uma linha de apoio. Cards com ring sutil e leve elevação no hover.
 * Ícones em SVG inline (stroke currentColor) pra herdar a cor accent.
 */

type IconeProps = { className?: string };

function IconeCelular({ className }: IconeProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
    </svg>
  );
}

function IconeCodigo({ className }: IconeProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="m8 7-5 5 5 5" />
      <path d="m16 7 5 5-5 5" />
      <path d="M13.5 4 10.5 20" />
    </svg>
  );
}

function IconeLupa({ className }: IconeProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20.5 20.5-4-4" />
    </svg>
  );
}

function IconeLoja({ className }: IconeProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M4 9.5h16l-1 10.5H5L4 9.5Z" />
      <path d="M8 9.5V7a4 4 0 0 1 8 0v2.5" />
    </svg>
  );
}

function IconeEscudo({ className }: IconeProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M12 2.5 20 5v6c0 5-3.4 8.3-8 10.5C7.4 19.3 4 16 4 11V5l8-2.5Z" />
      <path d="m9 11.5 2 2 4-4" />
    </svg>
  );
}

function IconeMedida({ className }: IconeProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M14.5 4.5 19.5 9.5" />
      <path d="M3 21l1.5-5L16 4.5a2.1 2.1 0 0 1 3 3L7.5 19 3 21Z" />
    </svg>
  );
}

const BENEFICIOS = [
  { Icone: IconeCelular, titulo: "App nativo Android e iOS", texto: "Publicado na sua marca, na loja e no celular do cliente." },
  { Icone: IconeCodigo, titulo: "Código-fonte incluso", texto: "O app é seu. Nada de ficar refém de ninguém." },
  { Icone: IconeLupa, titulo: "UI/UX completo", texto: "Desenho pensado para converter, não só para ser bonito." },
  { Icone: IconeLoja, titulo: "Publicação na Google Play", texto: "A gente publica para você, sem custo adicional de serviço." },
  { Icone: IconeEscudo, titulo: "1 mês de suporte e garantia", texto: "Entregamos, acompanhamos e corrigimos o que precisar." },
  { Icone: IconeMedida, titulo: "Feito sob medida", texto: "Do seu jeito, para o seu segmento, com a sua cara." },
];

export function Beneficios() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <SecaoTitulo kicker="O que você recebe" titulo="Um app de verdade, e ele é seu." />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {BENEFICIOS.map(({ Icone, titulo, texto }, i) => (
          <Reveal key={titulo} as="div" delay={(i % 3) * 80}>
            <div className="group h-full rounded-2xl border border-white/10 bg-ink-soft p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/50">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20">
                <Icone className="h-[22px] w-[22px]" />
              </span>
              <h3 className="mt-4 font-display text-lg text-paper">{titulo}</h3>
              <p className="mt-1.5 text-sm text-paper/60">{texto}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
