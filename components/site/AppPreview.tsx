import type { ModeloApp } from "@/lib/catalog/apps";

/**
 * Prévia rica e realista da primeira tela de cada app, com foto real.
 * Cada nicho tem um layout próprio (lista de delivery, grade de loja,
 * anúncio de imóvel, grade de aulas, salão, cartão de fidelidade) pra o
 * card parecer um app de verdade, nao um mockup genérico.
 *
 * Estático e pointer-events-none: o card inteiro é o link. Altura fixa
 * (h-52) pra alinhar os cards na grade. Fotos com licença comercial livre
 * em public/img/<nicho>/.
 */

function Foto({ src, className }: { src: string; className?: string }) {
  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      className={`object-cover ${className ?? ""}`}
    />
  );
}

function EstrelaSvg({ className = "h-2.5 w-2.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="m12 4 2.35 4.76 5.26.77-3.8 3.7.9 5.24L12 16.98 7.09 18.47l.9-5.24-3.8-3.7 5.26-.77L12 4Z" />
    </svg>
  );
}

function Estrela({ nota }: { nota: string }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-amber-500">
      <EstrelaSvg />
      {nota}
    </span>
  );
}

/* Delivery: lista estilo app de comida */
function PreviewDelivery({ accent }: { accent: string }) {
  const itens = [
    { img: "/img/delivery/burger.jpg", nome: "Burger da Casa", preco: "R$ 32,90", nota: "4.9" },
    { img: "/img/delivery/pizza.jpg", nome: "Pizza Individual", preco: "R$ 34,90", nota: "4.8" },
    { img: "/img/delivery/batata.jpg", nome: "Batata Rústica", preco: "R$ 18,90", nota: "4.8" },
  ];
  return (
    <>
      <div className="flex items-center justify-between px-3.5 py-2.5 text-white" style={{ backgroundColor: accent }}>
        <span className="font-display text-[13px]">SaborJá</span>
        <span className="inline-flex items-center gap-1 text-[10px] text-white/90"><EstrelaSvg /> 4.9 · ~30 min</span>
      </div>
      <ul className="px-2 py-1">
        {itens.map((it) => (
          <li key={it.nome} className="flex items-center gap-2.5 px-1.5 py-1.5">
            <Foto src={it.img} className="h-11 w-11 shrink-0 rounded-lg" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-medium text-ink">{it.nome}</p>
              <Estrela nota={it.nota} />
            </div>
            <span className="text-[11px] font-semibold" style={{ color: accent }}>
              {it.preco}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

/* Loja: grade de produtos estilo e-commerce */
function PreviewLoja({ accent }: { accent: string }) {
  const produtos = [
    { img: "/img/loja/tenis.jpg", nome: "Tênis Casual", preco: "R$ 299,90" },
    { img: "/img/loja/jaqueta.jpg", nome: "Jaqueta Jeans", preco: "R$ 249,90" },
    { img: "/img/loja/mochila.jpg", nome: "Mochila Urban", preco: "R$ 189,90" },
    { img: "/img/loja/relogio.jpg", nome: "Relógio Slim", preco: "R$ 399,90" },
  ];
  return (
    <>
      <div className="flex items-center justify-between px-3.5 py-2.5 text-white" style={{ backgroundColor: accent }}>
        <span className="font-display text-[13px]">Vitrine</span>
        <span className="text-[10px] text-white/90">Loja aberta 24h</span>
      </div>
      <div className="grid grid-cols-2 gap-2 p-2.5">
        {produtos.map((p) => (
          <div key={p.nome} className="overflow-hidden rounded-lg ring-1 ring-black/5">
            <Foto src={p.img} className="h-14 w-full" />
            <div className="px-2 py-1">
              <p className="truncate text-[10px] font-medium text-ink">{p.nome}</p>
              <p className="text-[10px] font-semibold" style={{ color: accent }}>
                {p.preco}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* Imobiliária: anúncio com foto grande e destaque de preço */
function PreviewImobiliaria({ accent }: { accent: string }) {
  return (
    <>
      <div className="relative">
        <Foto src="/img/imobiliaria/apto.jpg" className="h-28 w-full" />
        <span
          className="absolute bottom-2 left-2 rounded-md px-2 py-1 text-[11px] font-semibold text-white"
          style={{ backgroundColor: accent }}
        >
          R$ 320.000
        </span>
      </div>
      <div className="px-3 py-2.5">
        <p className="text-[12px] font-semibold text-ink">Apto 2 quartos · Centro</p>
        <p className="mt-0.5 text-[10px] text-ink-faint">2 quartos · 1 vaga · 62 m²</p>
        <div className="mt-2 flex items-center gap-2">
          <Foto src="/img/imobiliaria/casa.jpg" className="h-8 w-10 rounded-md" />
          <Foto src="/img/imobiliaria/studio.jpg" className="h-8 w-10 rounded-md" />
          <span className="ml-auto rounded-md px-2 py-1 text-[10px] font-medium text-white" style={{ backgroundColor: accent }}>
            Agendar visita
          </span>
        </div>
      </div>
    </>
  );
}

/* Academia: grade de aulas com foto e vagas */
function PreviewAcademia({ accent }: { accent: string }) {
  const aulas = [
    { img: "/img/academia/spinning.jpg", nome: "Spinning", info: "07:00 · 3 vagas" },
    { img: "/img/academia/funcional.jpg", nome: "Funcional", info: "09:00 · lotada" },
    { img: "/img/academia/yoga.jpg", nome: "Yoga", info: "18:00 · 8 vagas" },
  ];
  return (
    <>
      <div className="flex items-center justify-between px-3.5 py-2.5 text-white" style={{ backgroundColor: accent }}>
        <span className="font-display text-[13px]">TreinoApp</span>
        <span className="text-[10px] text-white/90">Aulas de hoje</span>
      </div>
      <ul className="px-2 py-1">
        {aulas.map((a) => (
          <li key={a.nome} className="flex items-center gap-2.5 px-1.5 py-1.5">
            <Foto src={a.img} className="h-11 w-11 shrink-0 rounded-lg" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-medium text-ink">{a.nome}</p>
              <p className="text-[10px] text-ink-faint">{a.info}</p>
            </div>
            <span className="rounded-md px-2 py-1 text-[10px] font-medium text-white" style={{ backgroundColor: accent }}>
              Reservar
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

/* Agendamento: salão com foto de capa e serviços */
function PreviewAgendamento({ accent }: { accent: string }) {
  const servicos = [
    { img: "/img/agendamento/corte.jpg", nome: "Corte", info: "45 min", preco: "R$ 40" },
    { img: "/img/agendamento/barba.jpg", nome: "Barba", info: "30 min", preco: "R$ 30" },
    { img: "/img/agendamento/coloracao.jpg", nome: "Coloração", info: "1h30", preco: "R$ 120" },
  ];
  return (
    <>
      <div className="relative">
        <Foto src="/img/agendamento/salao.jpg" className="h-16 w-full" />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
          <span className="font-display text-[13px] text-white">HoraCerta</span>
        </div>
      </div>
      <ul className="px-2 py-1">
        {servicos.map((s) => (
          <li key={s.nome} className="flex items-center gap-2.5 px-1.5 py-1">
            <Foto src={s.img} className="h-9 w-9 shrink-0 rounded-lg" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-medium text-ink">{s.nome}</p>
              <p className="text-[10px] text-ink-faint">{s.info}</p>
            </div>
            <span className="text-[11px] font-semibold" style={{ color: accent }}>
              {s.preco}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

/* Fidelidade: cartao de pontos e selos (sem foto) */
function PreviewFidelidade({ accent }: { accent: string }) {
  return (
    <div className="p-3">
      <div
        className="rounded-xl p-3.5 text-white"
        style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)` }}
      >
        <div className="flex items-center justify-between">
          <span className="font-display text-[13px]">Clube+</span>
          <span className="text-[10px] text-white/80">Cartão fidelidade</span>
        </div>
        <p className="mt-2 text-2xl font-semibold leading-none">1.240</p>
        <p className="text-[10px] text-white/85">pontos acumulados</p>
      </div>
      <div className="mt-3">
        <p className="text-[10px] font-medium text-ink-faint">Selos do mês · 7 de 10</p>
        <div className="mt-1.5 flex gap-1">
          {Array.from({ length: 10 }).map((_, k) => (
            <span
              key={k}
              className="h-3.5 w-3.5 rounded-full"
              style={{ backgroundColor: k < 7 ? accent : "#E7E7E3" }}
            />
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between rounded-lg bg-paper-soft px-2.5 py-1.5">
        <span className="inline-flex items-center gap-1 text-[10px] text-ink">
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{ color: accent }}>
            <rect x="4" y="8.5" width="16" height="3.5" rx="1" />
            <path d="M5.5 12v7.5h13V12M12 8.5v11" />
            <path d="M12 8.5C10.4 8.5 8 8.2 8 6.4A2 2 0 0 1 12 6a2 2 0 0 1 4 .4c0 1.8-2.4 2.1-4 2.1Z" />
          </svg>
          R$ 50 de desconto
        </span>
        <span className="text-[10px] font-semibold" style={{ color: accent }}>
          faltam 260 pts
        </span>
      </div>
    </div>
  );
}

const PREVIEWS: Record<string, (props: { accent: string }) => React.ReactNode> = {
  delivery: PreviewDelivery,
  loja: PreviewLoja,
  imobiliaria: PreviewImobiliaria,
  academia: PreviewAcademia,
  agendamento: PreviewAgendamento,
  fidelidade: PreviewFidelidade,
};

export function AppPreview({ modelo }: { modelo: ModeloApp }) {
  const Preview = PREVIEWS[modelo.id];

  return (
    <div
      aria-hidden
      className="pointer-events-none h-52 select-none overflow-hidden rounded-xl bg-white ring-1 ring-black/5"
    >
      {Preview ? (
        <Preview accent={modelo.accent} />
      ) : (
        <div className="grid h-full place-items-center text-ink-faint">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="7" y="3" width="10" height="18" rx="2.5" />
            <path d="M11 18.5h2" />
          </svg>
        </div>
      )}
    </div>
  );
}
