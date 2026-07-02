"use client";
import { useState } from "react";
import { AppRuntime, type ScreenApi } from "@/components/simulator/AppRuntime";
import {
  PONTOS_ATUAIS,
  META_PONTOS,
  RECOMPENSA_META,
  SELOS_TOTAL,
  SELOS_PREENCHIDOS,
  CUPONS,
  MOVIMENTACOES,
  type Cupom,
} from "@/lib/mock/fidelidade";
import { formatData } from "@/lib/format";

export function ClubeApp({ accent }: { accent: string }) {
  const [cupomSel, setCupomSel] = useState<Cupom | null>(null);
  const [resgatados, setResgatados] = useState<string[]>([]);

  const faltam = Math.max(META_PONTOS - PONTOS_ATUAIS, 0);
  const progresso = Math.min(PONTOS_ATUAIS / META_PONTOS, 1);

  return (
    <AppRuntime
      telaInicial="saldo"
      render={({ tela, go, openModal }: ScreenApi) => {
        const TopBar = ({ titulo, voltarPara }: { titulo: string; voltarPara?: string }) => (
          <div className="sticky top-0 z-10 flex items-center gap-3 px-4 py-3.5 text-white" style={{ backgroundColor: accent }}>
            {voltarPara && (
              <button aria-label="voltar" onClick={() => go(voltarPara)} className="text-lg leading-none">
                ←
              </button>
            )}
            <span className="font-display text-base">{titulo}</span>
          </div>
        );

        if (tela === "saldo") {
          return (
            <div className="pb-8">
              <div className="px-4 pb-6 pt-6 text-white" style={{ backgroundColor: accent }}>
                <p className="font-display text-base">Clube+</p>
                <p className="mt-4 text-5xl font-semibold leading-none">{PONTOS_ATUAIS.toLocaleString("pt-BR")}</p>
                <p className="mt-1 text-sm text-white/80">pontos acumulados</p>
                <div className="mt-5">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/25">
                    <div className="h-full rounded-full bg-white" style={{ width: `${progresso * 100}%` }} />
                  </div>
                  <p className="mt-2 text-xs text-white/85">
                    Faltam {faltam.toLocaleString("pt-BR")} pts para {RECOMPENSA_META}.
                  </p>
                </div>
              </div>
              <div className="px-4 pt-4">
                <Atalho emoji="🎟️" titulo="Minha carteirinha" sub="Selos para o próximo brinde" onClick={() => go("carteirinha")} />
                <Atalho emoji="🏷️" titulo="Meus cupons" sub={`${CUPONS.length} disponíveis para resgate`} onClick={() => go("cupons")} />
                <Atalho emoji="📜" titulo="Histórico" sub="Pontos acumulados e resgatados" onClick={() => go("historico")} />
              </div>
            </div>
          );
        }

        if (tela === "carteirinha") {
          return (
            <div className="pb-8">
              <TopBar titulo="Minha carteirinha" voltarPara="saldo" />
              <div className="px-4 py-5">
                <div className="rounded-2xl p-5 text-white" style={{ backgroundColor: accent }}>
                  <p className="text-sm text-white/85">Cartão fidelidade</p>
                  <p className="font-display text-lg">A cada 10 selos, 1 brinde</p>
                  <div className="mt-4 grid grid-cols-5 gap-3">
                    {Array.from({ length: SELOS_TOTAL }).map((_, i) => (
                      <div
                        key={i}
                        className="grid aspect-square place-items-center rounded-full text-base"
                        style={{
                          backgroundColor: i < SELOS_PREENCHIDOS ? "#FFFFFF" : "rgba(255,255,255,0.18)",
                          color: i < SELOS_PREENCHIDOS ? accent : "rgba(255,255,255,0.6)",
                        }}
                      >
                        {i < SELOS_PREENCHIDOS ? "★" : "☆"}
                      </div>
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-center text-sm text-ink-faint">
                  {SELOS_PREENCHIDOS} de {SELOS_TOTAL} selos. Faltam {SELOS_TOTAL - SELOS_PREENCHIDOS} para o brinde.
                </p>
              </div>
            </div>
          );
        }

        if (tela === "cupons") {
          return (
            <div className="pb-8">
              <TopBar titulo="Meus cupons" voltarPara="saldo" />
              <ul className="px-4 pt-4">
                {CUPONS.map((c) => {
                  const jaResgatado = resgatados.includes(c.id);
                  return (
                    <li key={c.id} className="mb-3 flex items-center gap-3 rounded-2xl border border-black/5 bg-paper-soft p-4">
                      <div className="grid h-12 w-12 place-items-center rounded-xl bg-black/5 text-2xl">{c.emoji}</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-ink">{c.titulo}</p>
                        <p className="text-xs text-ink-faint">{c.descricao}</p>
                        <p className="mt-0.5 text-xs font-semibold" style={{ color: accent }}>
                          {c.custoPontos} pts
                        </p>
                      </div>
                      <button
                        disabled={jaResgatado}
                        onClick={() => {
                          setCupomSel(c);
                          go("resgatar");
                        }}
                        className={
                          jaResgatado
                            ? "cursor-default rounded-lg bg-black/5 px-3 py-1.5 text-xs font-medium text-ink-faint"
                            : "rounded-lg px-3 py-1.5 text-xs font-medium text-white"
                        }
                        style={jaResgatado ? undefined : { backgroundColor: accent }}
                      >
                        {jaResgatado ? "Resgatado" : "Resgatar"}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        }

        if (tela === "resgatar") {
          if (!cupomSel) return null;
          return (
            <div className="pb-8">
              <TopBar titulo="Confirmar resgate" voltarPara="cupons" />
              <div className="px-4 py-6 text-center">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-black/5 text-4xl">{cupomSel.emoji}</div>
                <p className="mt-4 font-display text-lg text-ink">{cupomSel.titulo}</p>
                <p className="mt-1 text-sm text-ink-faint">{cupomSel.descricao}</p>
                <p className="mt-3 text-sm">
                  Custo: <span className="font-semibold" style={{ color: accent }}>{cupomSel.custoPontos} pts</span>
                </p>
                <button
                  onClick={() => {
                    setResgatados((r) => (r.includes(cupomSel.id) ? r : [...r, cupomSel.id]));
                    openModal(
                      "Cupom resgatado",
                      `${cupomSel.titulo} já está disponível na sua carteira. Apresente no caixa para usar.`,
                    );
                    go("cupons");
                  }}
                  className="mt-6 w-full rounded-xl py-3 text-center font-medium text-white"
                  style={{ backgroundColor: accent }}
                >
                  Confirmar resgate
                </button>
              </div>
            </div>
          );
        }

        // historico
        return (
          <div className="pb-8">
            <TopBar titulo="Histórico" voltarPara="saldo" />
            <ul className="pt-2">
              {MOVIMENTACOES.map((m) => {
                const acumulado = m.tipo === "acumulados";
                return (
                  <li key={m.id} className="flex items-center gap-3 border-b border-black/5 px-4 py-3">
                    <span
                      className="grid h-9 w-9 place-items-center rounded-full text-sm"
                      style={{ backgroundColor: acumulado ? `${accent}1A` : "rgba(0,0,0,0.05)", color: acumulado ? accent : "#5A5A62" }}
                    >
                      {acumulado ? "＋" : "－"}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm text-ink">{m.descricao}</p>
                      <p className="text-xs text-ink-faint">{formatData(m.data)}</p>
                    </div>
                    <span className="text-sm font-semibold" style={{ color: acumulado ? accent : "#5A5A62" }}>
                      {acumulado ? "+" : "-"}
                      {m.pontos} pts
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="px-4 pt-3 text-xs text-ink-faint">Movimentações mais recentes primeiro.</p>
          </div>
        );
      }}
    />
  );
}

function Atalho({ emoji, titulo, sub, onClick }: { emoji: string; titulo: string; sub: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="mb-3 flex w-full items-center gap-3 rounded-2xl border border-black/5 bg-paper-soft p-4 text-left">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-black/5 text-xl">{emoji}</div>
      <div className="flex-1">
        <p className="text-sm font-medium text-ink">{titulo}</p>
        <p className="text-xs text-ink-faint">{sub}</p>
      </div>
      <span className="text-lg text-ink-faint">›</span>
    </button>
  );
}
