"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { formatBRL } from "@/lib/format";
import { CARDAPIO, TAXA_ENTREGA_CENTAVOS } from "@/lib/mock/delivery";

/**
 * Celular flutuante do hero com um app de delivery rodando ao vivo.
 * As 4 telas do fluxo (cardápio, carrinho, acompanhar, sucesso) avançam
 * sozinhas em loop, com cara de app sendo TOCADO: um ponteiro de toque
 * aparece sobre o botão de ação da tela, dá o ripple, e aí a tela troca
 * (cross-fade + um leve push), como uma navegação de app real, nao um
 * slideshow.
 *
 * Cada tela tem uma STATUS BAR simulada (hora + ícones) no topo, na cor do
 * app, pra o notch do aparelho ficar sobre ela e o conteúdo comecar abaixo,
 * sem colidir com a pílula do notch.
 *
 * Respeita prefers-reduced-motion: sem movimento e sem toque, mostra só a
 * primeira tela, estática.
 *
 * Mock visual próprio e leve (nao instancia o app real), pra manter a home
 * fluida. O accent do conteúdo é o laranja do nicho de delivery; o halo ao
 * redor do aparelho fica na cor accent da marca (azul DamaTech).
 */

const LARANJA = "#F97316"; // accent do nicho delivery
const TELAS = 4;
const INTERVALO_MS = 2600; // tempo de cada tela
const TOQUE_ANTES_MS = 650; // quanto antes da troca o toque aparece

// Itens do cardápio usados no mock (reaproveita o mock real de delivery).
const burger = CARDAPIO.find((i) => i.id === "burger")!;
const batata = CARDAPIO.find((i) => i.id === "batata")!;
const refri = CARDAPIO.find((i) => i.id === "refri")!;
const subtotalMock = burger.precoCentavos + batata.precoCentavos + refri.precoCentavos;
const totalMock = subtotalMock + TAXA_ENTREGA_CENTAVOS;

// Foto real de cada item (reforça o realismo do app no hero).
const FOTO: Record<string, string> = {
  burger: "/img/delivery/burger.jpg",
  batata: "/img/delivery/batata.jpg",
  refri: "/img/delivery/refri.jpg",
};

function ThumbItem({ id }: { id: string }) {
  return (
    <img
      src={FOTO[id]}
      alt=""
      loading="lazy"
      decoding="async"
      className="h-9 w-9 shrink-0 rounded-xl object-cover"
    />
  );
}

/* Status bar simulada no topo de cada tela (hora + sinal/wifi/bateria). */
function StatusBar() {
  return (
    <div
      className="flex shrink-0 items-center justify-between px-4 pb-1 pt-2 text-[10px] font-medium text-white"
      style={{ backgroundColor: LARANJA }}
    >
      <span className="tabular-nums">9:41</span>
      <span className="flex items-center gap-1.5" aria-hidden>
        {/* Sinal */}
        <svg viewBox="0 0 18 12" className="h-2.5 w-auto" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="0.5" />
          <rect x="5" y="5" width="3" height="7" rx="0.5" />
          <rect x="10" y="2.5" width="3" height="9.5" rx="0.5" />
          <rect x="15" y="0" width="3" height="12" rx="0.5" opacity="0.5" />
        </svg>
        {/* Wi-Fi */}
        <svg viewBox="0 0 16 12" className="h-2.5 w-auto" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M2 4.5a9 9 0 0 1 12 0" />
          <path d="M4.2 7a6 6 0 0 1 7.6 0" />
          <path d="M8 9.6h.01" strokeWidth="2" />
        </svg>
        {/* Bateria */}
        <span className="flex items-center gap-0.5">
          <span className="flex h-2.5 w-4 items-center rounded-[2px] border border-white/80 p-[1px]">
            <span className="h-full w-3/4 rounded-[1px] bg-white" />
          </span>
          <span className="h-1 w-0.5 rounded-r-sm bg-white/80" />
        </span>
      </span>
    </div>
  );
}

/* Cabeçalho colorido do app (logo abaixo da status bar, mesma cor). */
function AppHeader({ titulo, sub }: { titulo: string; sub?: string }) {
  return (
    <div className="shrink-0 px-4 pb-3 pt-1 text-white" style={{ backgroundColor: LARANJA }}>
      <p className="font-display text-lg leading-tight">{titulo}</p>
      {sub ? <p className="text-[11px] text-white/85">{sub}</p> : null}
    </div>
  );
}

function TopBar({ titulo }: { titulo: string }) {
  return (
    <div className="flex shrink-0 items-center gap-2 px-4 pb-3 pt-1 text-white" style={{ backgroundColor: LARANJA }}>
      <span className="text-base leading-none">←</span>
      <span className="font-display text-[13px]">{titulo}</span>
    </div>
  );
}

function BotaoAcao({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-auto p-3">
      <div className="rounded-xl py-2.5 text-center text-[13px] font-medium text-white shadow-lg" style={{ backgroundColor: LARANJA }}>
        {children}
      </div>
    </div>
  );
}

function TelaCardapio() {
  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar />
      <AppHeader titulo="SaborJá" sub="Entrega em ~30 min · aberto agora" />
      <p className="px-4 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-wide text-ink-faint">Lanches</p>
      <ul className="px-2">
        {[burger, batata, refri].map((it, idx) => (
          <li key={it.id} className="flex items-center gap-2.5 rounded-xl px-2 py-2">
            <ThumbItem id={it.id} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-medium text-ink">{it.nome}</p>
              <p className="text-[11px] font-semibold" style={{ color: LARANJA }}>
                {formatBRL(it.precoCentavos)}
              </p>
            </div>
            {idx < 2 ? (
              <div className="flex items-center gap-1.5">
                <span className="grid h-6 w-6 place-items-center rounded-lg bg-black/5 text-ink">−</span>
                <span className="w-3 text-center text-[12px] text-ink">1</span>
                <span className="grid h-6 w-6 place-items-center rounded-lg text-white" style={{ backgroundColor: LARANJA }}>
                  +
                </span>
              </div>
            ) : (
              <span className="rounded-lg px-2.5 py-1 text-[11px] font-medium text-white" style={{ backgroundColor: LARANJA }}>
                Adicionar
              </span>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-auto p-3">
        <div className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-white shadow-lg" style={{ backgroundColor: LARANJA }}>
          <span className="text-[12px] font-medium">Ver carrinho (2)</span>
          <span className="text-[12px] font-semibold">{formatBRL(subtotalMock)}</span>
        </div>
      </div>
    </div>
  );
}

function LinhaTotais({ label, valor, forte }: { label: string; valor: string; forte?: boolean }) {
  return (
    <div className={`flex justify-between ${forte ? "text-[13px] font-semibold text-ink" : "text-[12px] text-ink-faint"}`}>
      <span>{label}</span>
      <span>{valor}</span>
    </div>
  );
}

function TelaCarrinho() {
  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar />
      <TopBar titulo="Seu carrinho" />
      <ul className="px-2 pt-1">
        {[burger, refri].map((it) => (
          <li key={it.id} className="flex items-center gap-2.5 border-b border-black/5 px-2 py-2.5">
            <ThumbItem id={it.id} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] text-ink">{it.nome}</p>
              <p className="text-[11px] text-ink-faint">{formatBRL(it.precoCentavos)}</p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="grid h-6 w-6 place-items-center rounded-lg bg-black/5">−</span>
              <span className="w-3 text-center text-[12px]">1</span>
              <span className="grid h-6 w-6 place-items-center rounded-lg text-white" style={{ backgroundColor: LARANJA }}>
                +
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div className="space-y-1 px-4 py-3">
        <LinhaTotais label="Subtotal" valor={formatBRL(burger.precoCentavos + refri.precoCentavos)} />
        <LinhaTotais label="Taxa de entrega" valor={formatBRL(TAXA_ENTREGA_CENTAVOS)} />
        <LinhaTotais label="Total" valor={formatBRL(burger.precoCentavos + refri.precoCentavos + TAXA_ENTREGA_CENTAVOS)} forte />
      </div>
      <BotaoAcao>Finalizar pedido</BotaoAcao>
    </div>
  );
}

function TelaAcompanhar() {
  const etapas = ["Pedido recebido", "Em preparo", "Saiu para entrega", "Entregue"];
  const atual = 2;
  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar />
      <TopBar titulo="Acompanhar pedido" />
      <div className="px-4 py-4">
        <p className="text-[11px] text-ink-faint">Pedido #2048 · chega em ~28 min</p>
        <ol className="mt-4 space-y-4">
          {etapas.map((etapa, idx) => (
            <li key={etapa} className="flex items-center gap-2.5">
              <span
                className="grid h-6 w-6 place-items-center rounded-full text-[11px] text-white"
                style={{ backgroundColor: idx <= atual ? LARANJA : "#D6D6D0" }}
              >
                {idx <= atual ? "✓" : idx + 1}
              </span>
              <span className={idx <= atual ? "text-[12px] font-medium text-ink" : "text-[12px] text-ink-faint"}>{etapa}</span>
            </li>
          ))}
        </ol>
      </div>
      <BotaoAcao>Confirmar recebimento</BotaoAcao>
    </div>
  );
}

function TelaSucesso() {
  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar />
      <div className="grid flex-1 place-items-center px-6 text-center">
        <div>
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full text-xl text-white" style={{ backgroundColor: LARANJA }}>
            ✓
          </div>
          <p className="mt-3 font-display text-base text-ink">Pedido entregue!</p>
          <p className="mt-1 text-[12px] text-ink-faint">Total {formatBRL(totalMock)}. É assim que o seu cliente pede.</p>
        </div>
      </div>
    </div>
  );
}

const PAINEIS = [TelaCardapio, TelaCarrinho, TelaAcompanhar, TelaSucesso];

// Posição do toque simulado sobre o botão de ação de cada tela.
// Todas as telas com ação têm o botão na base; a de sucesso nao recebe toque.
const POS_TOQUE: (CSSProperties | null)[] = [
  { left: "50%", bottom: "26px" }, // cardápio: "Ver carrinho"
  { left: "50%", bottom: "26px" }, // carrinho: "Finalizar pedido"
  { left: "50%", bottom: "26px" }, // acompanhar: "Confirmar recebimento"
  null, // sucesso
];

/* Ponteiro de toque: círculo com ripple, some/aparece perto da troca. */
function Toque({ pos }: { pos: CSSProperties }) {
  return (
    <div className="pointer-events-none absolute z-30 -translate-x-1/2" style={pos} aria-hidden>
      <div className="relative grid place-items-center">
        <span className="tap-ripple absolute h-9 w-9 rounded-full bg-white/70" />
        <span className="tap-dot h-6 w-6 rounded-full border-2 border-white bg-white/35 shadow-[0_2px_10px_rgba(0,0,0,0.35)]" />
      </div>
    </div>
  );
}

export function HeroPhone() {
  const reduzido = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [tocando, setTocando] = useState(false);
  const tapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (reduzido) return;
    let ativo = true;

    const ciclo = () => {
      // Toque aparece um pouco antes da troca de tela.
      tapTimer.current = setTimeout(() => {
        if (ativo) setTocando(true);
      }, INTERVALO_MS - TOQUE_ANTES_MS);
      // Troca de tela e reinicia o ciclo.
      nextTimer.current = setTimeout(() => {
        if (!ativo) return;
        setTocando(false);
        setIdx((v) => (v + 1) % TELAS);
        ciclo();
      }, INTERVALO_MS);
    };

    ciclo();
    return () => {
      ativo = false;
      if (tapTimer.current) clearTimeout(tapTimer.current);
      if (nextTimer.current) clearTimeout(nextTimer.current);
    };
  }, [reduzido]);

  const atual = reduzido ? 0 : idx;
  const posToque = POS_TOQUE[atual];

  return (
    <div className="flex flex-col items-center">
      {/* Selo de app rodando ao vivo */}
      <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-ink-soft px-3 py-1.5 text-[11px] text-paper/70 ring-1 ring-white/10">
        <span className="live-dot h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
        Demonstração ao vivo
      </div>

      {/* Palco com halo e perspectiva */}
      <div className="relative">
        {/* Halo na cor da marca (azul) com um toque quente do app */}
        <div
          aria-hidden
          className="hero-glow absolute left-1/2 top-1/2 -z-10 h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, rgba(37,99,235,0.5), transparent 62%), radial-gradient(circle at 62% 74%, rgba(249,115,22,0.28), transparent 58%)",
          }}
        />

        {/* Inclinação/perspectiva sutil (só em telas md+), endireita no hover */}
        <div className="transition-transform duration-700 ease-out md:[transform:perspective(1400px)_rotateY(-9deg)_rotateX(3deg)] md:hover:[transform:perspective(1400px)_rotateY(0deg)_rotateX(0deg)]">
          {/* Flutuação vertical */}
          <div
            className="hero-float relative h-[520px] w-[254px] rounded-[2.6rem] bg-black p-2.5 ring-1 ring-white/15 sm:h-[548px] sm:w-[268px]"
            style={{ filter: "drop-shadow(0 40px 80px rgba(37,99,235,0.35))" } as CSSProperties}
          >
            {/* Notch */}
            <div className="absolute left-1/2 top-2.5 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
            {/* Tela: telas empilhadas com cross-fade + leve push (navegação de app) */}
            <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-white">
              {PAINEIS.map((Painel, k) => {
                const ativa = k === atual;
                return (
                  <div
                    key={k}
                    className="absolute inset-0 transition-all duration-500 ease-out"
                    style={{
                      opacity: ativa ? 1 : 0,
                      transform: ativa ? "translateX(0)" : "translateX(12px)",
                      zIndex: ativa ? 10 : 0,
                    }}
                    aria-hidden={!ativa}
                  >
                    <Painel />
                  </div>
                );
              })}

              {/* Ponteiro de toque simulado */}
              {!reduzido && tocando && posToque ? <Toque pos={posToque} /> : null}
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de tela atual */}
      <div className="mt-6 flex items-center gap-1.5" aria-hidden>
        {PAINEIS.map((_, k) => (
          <span
            key={k}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: k === atual ? 18 : 6,
              backgroundColor: k === atual ? LARANJA : "rgba(255,255,255,0.22)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
