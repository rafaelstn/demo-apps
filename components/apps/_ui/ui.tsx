/**
 * Peças visuais compartilhadas pelos 6 apps demo: ícones em SVG (para a bottom
 * nav e microdetalhes), selo de avaliação com estrela e tag/badge.
 * Nada de emoji: SVG dá o acabamento de app real.
 */
import type { SVGProps } from "react";

export type IconeId =
  | "inicio"
  | "buscar"
  | "sacola"
  | "coracao"
  | "agenda"
  | "perfil"
  | "servicos"
  | "cupom"
  | "carteira"
  | "extrato"
  | "cartao"
  | "treino"
  | "aulas"
  | "imovel"
  | "estrela"
  | "relogio"
  | "local"
  | "etiqueta"
  | "entrega"
  | "presente"
  | "raio"
  | "mais";

const P = (props: SVGProps<SVGSVGElement>) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

/* Conjunto de ícones traçados, estilo linha (consistentes entre si). */
export function Icone({ id, className = "h-[22px] w-[22px]" }: { id: IconeId; className?: string }) {
  const c = { className } as SVGProps<SVGSVGElement>;
  switch (id) {
    case "inicio":
      return (
        <svg {...P(c)}>
          <path d="M4 10.5 12 4l8 6.5" />
          <path d="M6 9.5V20h12V9.5" />
          <path d="M10 20v-5h4v5" />
        </svg>
      );
    case "buscar":
      return (
        <svg {...P(c)}>
          <circle cx="11" cy="11" r="6.5" />
          <path d="m20 20-3.2-3.2" />
        </svg>
      );
    case "sacola":
      return (
        <svg {...P(c)}>
          <path d="M6 8h12l-1 12H7L6 8Z" />
          <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        </svg>
      );
    case "coracao":
      return (
        <svg {...P(c)}>
          <path d="M12 20s-7-4.4-7-9.2A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7-2.6c0 4.8-7 9.2-7 9.2Z" />
        </svg>
      );
    case "agenda":
      return (
        <svg {...P(c)}>
          <rect x="4" y="5.5" width="16" height="15" rx="2.5" />
          <path d="M4 9.5h16M8 3.5v4M16 3.5v4" />
        </svg>
      );
    case "perfil":
      return (
        <svg {...P(c)}>
          <circle cx="12" cy="8.5" r="3.5" />
          <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
        </svg>
      );
    case "servicos":
      return (
        <svg {...P(c)}>
          <path d="M4 6h16M4 12h16M4 18h10" />
        </svg>
      );
    case "cupom":
      return (
        <svg {...P(c)}>
          <path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h13A1.5 1.5 0 0 1 20 8.5V10a2 2 0 0 0 0 4v1.5A1.5 1.5 0 0 1 18.5 17h-13A1.5 1.5 0 0 1 4 15.5V14a2 2 0 0 0 0-4V8.5Z" />
          <path d="M14 7v10" strokeDasharray="1.5 2" />
        </svg>
      );
    case "carteira":
      return (
        <svg {...P(c)}>
          <rect x="4" y="6" width="16" height="12" rx="2.5" />
          <path d="M4 10h16" />
          <circle cx="16.5" cy="14" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "cartao":
      return (
        <svg {...P(c)}>
          <rect x="3.5" y="6" width="17" height="12" rx="2.5" />
          <path d="M3.5 10h17M7 14.5h4" />
        </svg>
      );
    case "extrato":
      return (
        <svg {...P(c)}>
          <path d="M6 3.5h9l3.5 3.5V20.5H6V3.5Z" />
          <path d="M14.5 3.5V7H18M9 12h6M9 15.5h4" />
        </svg>
      );
    case "treino":
      return (
        <svg {...P(c)}>
          <path d="M4.5 9v6M7.5 7.5v9M16.5 7.5v9M19.5 9v6M7.5 12h9" />
        </svg>
      );
    case "aulas":
      return (
        <svg {...P(c)}>
          <rect x="4" y="5" width="16" height="14" rx="2.5" />
          <path d="M9.5 9.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "imovel":
      return (
        <svg {...P(c)}>
          <path d="M4 11 12 5l8 6" />
          <path d="M6 10v10h12V10" />
          <path d="M10 20v-6h4v6" />
        </svg>
      );
    case "relogio":
      return (
        <svg {...P(c)}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4.5l3 1.8" />
        </svg>
      );
    case "local":
      return (
        <svg {...P(c)}>
          <path d="M12 21s6-5.2 6-10a6 6 0 0 0-12 0c0 4.8 6 10 6 10Z" />
          <circle cx="12" cy="11" r="2.2" />
        </svg>
      );
    case "etiqueta":
      return (
        <svg {...P(c)}>
          <path d="M4 4h7l9 9-7 7-9-9V4Z" />
          <circle cx="8" cy="8" r="1.3" fill="currentColor" stroke="none" />
        </svg>
      );
    case "entrega":
      return (
        <svg {...P(c)}>
          <path d="M3 6.5h10.5v9H3zM13.5 9.5h3.6L21 12.9v2.6h-7.5" />
          <circle cx="7" cy="17.4" r="1.6" />
          <circle cx="17" cy="17.4" r="1.6" />
        </svg>
      );
    case "presente":
      return (
        <svg {...P(c)}>
          <rect x="4" y="8.5" width="16" height="3.5" rx="1" />
          <path d="M5.5 12v7.5h13V12M12 8.5v11" />
          <path d="M12 8.5C10.4 8.5 8 8.2 8 6.4A2 2 0 0 1 12 6a2 2 0 0 1 4 .4c0 1.8-2.4 2.1-4 2.1Z" />
        </svg>
      );
    case "raio":
      return (
        <svg {...P(c)}>
          <path d="M13 3 5 13h6l-1 8 8-10h-6l1-8Z" />
        </svg>
      );
    case "mais":
      return (
        <svg {...P(c)}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "estrela":
      return (
        <svg {...P({ ...c, fill: "currentColor", stroke: "none" })}>
          <path d="m12 4 2.35 4.76 5.26.77-3.8 3.7.9 5.24L12 16.98 7.09 18.47l.9-5.24-3.8-3.7 5.26-.77L12 4Z" />
        </svg>
      );
    default:
      return null;
  }
}

/* Selo de avaliação: estrela cheia + nota. */
export function Rating({
  nota,
  className = "",
  color = "#F59E0B",
}: {
  nota: number;
  className?: string;
  color?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <Icone id="estrela" className="h-3.5 w-3.5" />
      <span className="text-[12px] font-semibold tabular-nums" style={{ color }}>
        {nota.toFixed(1).replace(".", ",")}
      </span>
    </span>
  );
}

/* Avatar de iniciais: gradiente sutil na cor accent, ring branco e sombra leve.
 * Acabamento premium para pessoas sem foto (evita emoji e stock genérico). */
export function Monograma({
  nome,
  accent,
  className = "h-12 w-12",
  textClassName = "text-[15px]",
}: {
  nome: string;
  accent: string;
  className?: string;
  textClassName?: string;
}) {
  const iniciais =
    nome
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((parte) => parte[0]?.toUpperCase() ?? "")
      .join("") || "?";
  return (
    <span
      aria-hidden
      className={`grid shrink-0 place-items-center rounded-full font-semibold leading-none text-white shadow-[0_2px_6px_rgba(0,0,0,0.12)] ring-2 ring-white ${className}`}
      style={{ background: `linear-gradient(140deg, ${accent}, ${accent}B3)` }}
    >
      <span className={`${textClassName} tracking-tight`}>{iniciais}</span>
    </span>
  );
}

/* Cabeçalho colorido de tela interna (gradiente sutil na cor accent). */
export function Cabecalho({
  titulo,
  sub,
  accent,
  acao,
}: {
  titulo: string;
  sub?: string;
  accent: string;
  acao?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3 px-4 pb-3 pt-4 text-white" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}D9)` }}>
      <div className="min-w-0">
        <p className="font-display text-lg leading-tight">{titulo}</p>
        {sub ? <p className="mt-0.5 truncate text-[12px] text-white/85">{sub}</p> : null}
      </div>
      {acao}
    </div>
  );
}

/* Barra de topo com voltar, para telas de detalhe/fluxo. Fica colada no topo do
 * corpo com scroll (logo abaixo da StatusBar), na cor accent. */
export function BarraVoltar({
  titulo,
  onVoltar,
  accent,
  acao,
}: {
  titulo: string;
  onVoltar: () => void;
  accent: string;
  acao?: React.ReactNode;
}) {
  return (
    <div className="sticky top-0 z-10 flex items-center gap-2 px-3 py-3 text-white" style={{ backgroundColor: accent }}>
      <button
        aria-label="voltar"
        onClick={onVoltar}
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full transition active:scale-90 hover:bg-white/15"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 5-7 7 7 7" />
        </svg>
      </button>
      <span className="flex-1 truncate font-display text-[15px]">{titulo}</span>
      {acao}
    </div>
  );
}

/* Estado vazio padrão (ícone + título + texto + ação). */
export function EstadoVazio({
  icone,
  titulo,
  texto,
  acao,
  onAcao,
  accent,
}: {
  icone: IconeId;
  titulo: string;
  texto: string;
  acao: string;
  onAcao: () => void;
  accent: string;
}) {
  return (
    <div className="grid place-items-center px-8 py-16 text-center">
      <div>
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-black/[0.04] text-ink-faint">
          <Icone id={icone} className="h-6 w-6" />
        </div>
        <p className="mt-3 text-sm font-semibold text-ink">{titulo}</p>
        <p className="mt-1 text-[13px] text-ink-faint">{texto}</p>
        <button onClick={onAcao} className="mt-4 text-sm font-semibold" style={{ color: accent }}>
          {acao}
        </button>
      </div>
    </div>
  );
}

/* Botão de favoritar (coração). Preenchido quando ativo, contorno quando não. */
export function BotaoFavorito({
  ativo,
  onToggle,
  accent,
  className = "",
}: {
  ativo: boolean;
  onToggle: () => void;
  accent: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={ativo ? "remover dos favoritos" : "favoritar"}
      aria-pressed={ativo}
      onClick={onToggle}
      className={`grid place-items-center rounded-full transition active:scale-90 ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px]"
        fill={ativo ? accent : "none"}
        stroke={ativo ? accent : "currentColor"}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 20s-7-4.4-7-9.2A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7-2.6c0 4.8-7 9.2-7 9.2Z" />
      </svg>
    </button>
  );
}

/* Tag/badge com acabamento suave (fundo translúcido na cor accent). */
export function Tag({
  children,
  accent,
  tone = "solid",
}: {
  children: React.ReactNode;
  accent: string;
  tone?: "solid" | "soft" | "glass";
}) {
  if (tone === "glass") {
    return (
      <span className="rounded-full bg-black/45 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur">
        {children}
      </span>
    );
  }
  if (tone === "soft") {
    return (
      <span
        className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
        style={{ backgroundColor: `${accent}1A`, color: accent }}
      >
        {children}
      </span>
    );
  }
  return (
    <span
      className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm"
      style={{ backgroundColor: accent }}
    >
      {children}
    </span>
  );
}
