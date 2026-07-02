"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { APPS } from "@/lib/catalog/apps";
import { APP_REGISTRY } from "@/components/apps/registry";

/**
 * Celular flutuante do hero que mostra a VARIEDADE de apps da DamaTech.
 * Em vez de um único mock de delivery, ele cicla entre os 6 modelos reais do
 * catálogo (delivery, agendamento, loja, fidelidade, academia, imobiliária),
 * renderizando a tela inicial de cada app de verdade (a mesma que roda nas
 * demos, com status bar, fotos, cards e bottom nav).
 *
 * A cada ~3,2s troca para o próximo app do catálogo, em loop. A troca é um
 * cross-fade (fade-out do atual, troca, fade-in do novo) com um leve push de
 * escala, nunca um slide lateral. Só um app fica montado por vez: ao trocar de
 * id, o wrapper com key remonta e o app anterior é desmontado (leve para a home).
 *
 * ENCAIXE: o frame do hero é mais estreito que o das demos. O app é desenhado
 * num canvas do tamanho real da demo (332x696) e recebe um scale proporcional
 * (medido com ResizeObserver) para caber inteiro no frame, sem cortar conteúdo
 * e com a bottom nav sempre visível. Como a escala é uniforme, a proporção de
 * celular e a nitidez do layout (texto vetorial) se mantêm.
 *
 * O halo, o drop-shadow e os dots assumem a cor accent do app atual, dando a
 * sensação de que o aparelho "veste" cada segmento. Respeita
 * prefers-reduced-motion: não cicla, mostra o app de delivery estático.
 */

const HOLD_MS = 3000; // tempo que cada app fica na tela
const FADE_MS = 320; // duração do fade-out antes de trocar (casa com a transição CSS)

// Canvas de desenho do app = área útil real do PhoneFrame das demos
// (h-[720px] w-[356px] com p-3 => 332x696). Renderizar aqui e escalar mantém
// o hero pixel-fiel à demo polida, só que menor.
const SCREEN_W = 332;
const SCREEN_H = 696;

// Rótulo curto do nicho para o selo "ao vivo" (primeira palavra do nicho).
function nichoCurto(nicho: string): string {
  return nicho.split(" ")[0];
}

// Hex do accent + alpha (para o drop-shadow colorido do aparelho).
function comAlpha(hex: string, alpha: string): string {
  return `${hex}${alpha}`;
}

export function HeroPhone() {
  const reduzido = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [visivel, setVisivel] = useState(true); // true = app na tela; false = fazendo fade-out
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const swapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Escala do app para caber no frame estreito do hero (medida do container real).
  const telaRef = useRef<HTMLDivElement | null>(null);
  const [escala, setEscala] = useState(0.72);

  useEffect(() => {
    const el = telaRef.current;
    if (!el) return;
    const medir = () => {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) {
        setEscala(Math.min(r.width / SCREEN_W, r.height / SCREEN_H));
      }
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Ciclo de troca entre apps. Reduced-motion: não cicla.
  useEffect(() => {
    if (reduzido) return;
    let ativo = true;

    const ciclo = () => {
      holdTimer.current = setTimeout(() => {
        if (!ativo) return;
        setVisivel(false); // inicia o fade-out do app atual
        swapTimer.current = setTimeout(() => {
          if (!ativo) return;
          setIdx((v) => (v + 1) % APPS.length); // troca de app (remonta, desmonta o anterior)
          setVisivel(true); // fade-in do novo app
          ciclo();
        }, FADE_MS);
      }, HOLD_MS);
    };

    ciclo();
    return () => {
      ativo = false;
      if (holdTimer.current) clearTimeout(holdTimer.current);
      if (swapTimer.current) clearTimeout(swapTimer.current);
    };
  }, [reduzido]);

  const atual = reduzido ? 0 : idx;
  const app = APPS[atual];
  const AppComp = APP_REGISTRY[app.id];
  const accent = app.accent;

  return (
    <div className="flex flex-col items-center">
      {/* Selo "ao vivo" com o nicho do app atual mudando junto */}
      <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-ink-soft px-3 py-1.5 text-[11px] text-paper/70 ring-1 ring-white/10">
        <span
          className="live-dot h-1.5 w-1.5 rounded-full transition-colors duration-500"
          style={{ backgroundColor: accent }}
          aria-hidden
        />
        <span>Ao vivo</span>
        <span className="text-paper/30" aria-hidden>
          ·
        </span>
        <span
          className="font-medium text-paper/90 transition-opacity duration-300"
          style={{ opacity: visivel ? 1 : 0 }}
        >
          App de {nichoCurto(app.nicho)}
        </span>
      </div>

      {/* Palco com halo e perspectiva */}
      <div className="relative">
        {/* Halo base na cor da marca (azul) com pulso suave */}
        <div
          aria-hidden
          className="hero-glow absolute left-1/2 top-1/2 -z-10 h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, rgba(37,99,235,0.42), transparent 62%)",
          }}
        />
        {/* Camada quente que assume o accent do app atual e transiciona a cor */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -z-10 h-[108%] w-[108%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-35 blur-3xl transition-colors duration-700"
          style={{ backgroundColor: accent }}
        />

        {/* Inclinação/perspectiva sutil (só em telas md+), endireita no hover */}
        <div className="transition-transform duration-700 ease-out md:[transform:perspective(1400px)_rotateY(-9deg)_rotateX(3deg)] md:hover:[transform:perspective(1400px)_rotateY(0deg)_rotateX(0deg)]">
          {/* Flutuação vertical */}
          <div
            className="hero-float relative h-[520px] w-[254px] rounded-[2.6rem] bg-black p-2.5 ring-1 ring-white/15 transition-[filter] duration-700 sm:h-[548px] sm:w-[268px]"
            style={{ filter: `drop-shadow(0 40px 80px ${comAlpha(accent, "59")})` } as CSSProperties}
          >
            {/* Notch */}
            <div className="absolute left-1/2 top-2.5 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />

            {/* Tela: app real escalado para caber, com cross-fade + leve push na troca */}
            <div
              ref={telaRef}
              className="relative h-full w-full overflow-hidden rounded-[2rem] bg-white"
              aria-hidden
            >
              {/* Slot estável que faz o fade/push (não remonta) */}
              <div
                className="pointer-events-none absolute inset-0 ease-out"
                style={{
                  opacity: visivel ? 1 : 0,
                  transform: visivel ? "scale(1)" : "scale(0.985)",
                  transition: `opacity ${FADE_MS}ms ease-out, transform ${FADE_MS}ms ease-out`,
                }}
              >
                {/* Canvas do app em tamanho de demo, centralizado e escalado para caber.
                    key={atual} => remonta ao trocar de app (só um montado por vez). */}
                <div
                  key={atual}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    width: SCREEN_W,
                    height: SCREEN_H,
                    transform: `translate(-50%, -50%) scale(${escala})`,
                    transformOrigin: "center center",
                  }}
                >
                  <AppComp accent={accent} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dots: um por app, indicam qual está na tela, na cor accent do app atual */}
      <div className="mt-6 flex items-center gap-1.5" aria-hidden>
        {APPS.map((a, k) => (
          <span
            key={a.id}
            className="h-1.5 rounded-full transition-all duration-500"
            style={{
              width: k === atual ? 18 : 6,
              backgroundColor: k === atual ? accent : "rgba(255,255,255,0.22)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
