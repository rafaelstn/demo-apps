"use client";
import { useState } from "react";
import { AppRuntime, type ScreenApi } from "@/components/simulator/AppRuntime";
import { AppScreen } from "@/components/apps/_ui/AppScreen";
import type { ItemNav } from "@/components/apps/_ui/BottomNav";
import { BarraVoltar, Cabecalho, Icone } from "@/components/apps/_ui/ui";
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

  // Gradiente premium derivado da cor do nicho.
  const grad = `linear-gradient(135deg, ${accent} 0%, #047857 55%, #064E3B 100%)`;

  return (
    <AppRuntime
      telaInicial="saldo"
      render={({ tela, go, openModal }: ScreenApi) => {
        const nav: ItemNav[] = [
          { id: "cartao", label: "Cartão", icone: "cartao", onSelect: () => go("saldo") },
          { id: "carteira", label: "Carteirinha", icone: "carteira", onSelect: () => go("carteirinha") },
          { id: "cupons", label: "Cupons", icone: "cupom", onSelect: () => go("cupons") },
          { id: "extrato", label: "Extrato", icone: "extrato", onSelect: () => go("historico") },
        ];

        if (tela === "saldo") {
          return (
            <AppScreen statusColor={accent} accent={accent} nav={nav} navAtual="cartao">
              <div className="px-4 pb-2 pt-4" style={{ backgroundColor: accent }}>
                <div className="relative overflow-hidden rounded-3xl p-5 text-white shadow-xl" style={{ background: grad }}>
                  {/* brilho decorativo */}
                  <div aria-hidden className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
                  <div aria-hidden className="pointer-events-none absolute -bottom-12 -left-6 h-36 w-36 rounded-full bg-white/5 blur-2xl" />
                  <div className="relative flex items-center justify-between">
                    <p className="font-display text-base tracking-wide">Clube+</p>
                    <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider">Membro ouro</span>
                  </div>
                  <p className="relative mt-5 text-5xl font-semibold leading-none tabular-nums">{PONTOS_ATUAIS.toLocaleString("pt-BR")}</p>
                  <p className="relative mt-1 text-sm text-white/80">pontos acumulados</p>
                  <div className="relative mt-5">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
                      <div className="h-full rounded-full bg-white transition-all" style={{ width: `${progresso * 100}%` }} />
                    </div>
                    <p className="mt-2 text-[12px] text-white/85">
                      Faltam {faltam.toLocaleString("pt-BR")} pts para {RECOMPENSA_META}.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 px-4 pt-4">
                <Atalho icone="carteira" titulo="Minha carteirinha" sub="Selos para o próximo brinde" onClick={() => go("carteirinha")} accent={accent} />
                <Atalho icone="cupom" titulo="Meus cupons" sub={`${CUPONS.length} disponíveis para resgate`} onClick={() => go("cupons")} accent={accent} />
                <Atalho icone="extrato" titulo="Histórico" sub="Pontos acumulados e resgatados" onClick={() => go("historico")} accent={accent} />
              </div>
              <div className="h-4" />
            </AppScreen>
          );
        }

        if (tela === "carteirinha") {
          return (
            <AppScreen statusColor={accent} accent={accent} nav={nav} navAtual="carteira">
              <Cabecalho titulo="Minha carteirinha" accent={accent} />
              <div className="px-4 py-5">
                <div className="relative overflow-hidden rounded-3xl p-5 text-white shadow-xl" style={{ background: grad }}>
                  <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
                  <p className="relative text-sm text-white/85">Cartão fidelidade</p>
                  <p className="relative font-display text-lg">A cada 10 selos, 1 brinde</p>
                  <div className="relative mt-5 grid grid-cols-5 gap-3">
                    {Array.from({ length: SELOS_TOTAL }).map((_, i) => {
                      const cheio = i < SELOS_PREENCHIDOS;
                      return (
                        <div
                          key={i}
                          className="grid aspect-square place-items-center rounded-full text-base"
                          style={{ backgroundColor: cheio ? "#FFFFFF" : "rgba(255,255,255,0.16)", color: cheio ? accent : "rgba(255,255,255,0.7)" }}
                        >
                          <Icone id="estrela" className="h-4 w-4" />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <p className="mt-4 text-center text-sm text-ink-faint">
                  {SELOS_PREENCHIDOS} de {SELOS_TOTAL} selos. Faltam {SELOS_TOTAL - SELOS_PREENCHIDOS} para o brinde.
                </p>
              </div>
            </AppScreen>
          );
        }

        if (tela === "cupons") {
          return (
            <AppScreen statusColor={accent} accent={accent} nav={nav} navAtual="cupons">
              <Cabecalho titulo="Meus cupons" sub={`${CUPONS.length} disponíveis`} accent={accent} />
              <ul className="space-y-3 px-4 pt-4">
                {CUPONS.map((c) => {
                  const jaResgatado = resgatados.includes(c.id);
                  return (
                    <li key={c.id} className="flex items-center gap-3 overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                      <div className="relative grid h-14 w-14 shrink-0 place-items-center rounded-xl text-white shadow-sm" style={{ background: grad }}>
                        <Icone id={c.icone} className="h-6 w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-ink">{c.titulo}</p>
                        <p className="text-[12px] text-ink-faint">{c.descricao}</p>
                        <p className="mt-0.5 text-[12px] font-bold" style={{ color: accent }}>{c.custoPontos} pts</p>
                      </div>
                      <button
                        disabled={jaResgatado}
                        onClick={() => {
                          setCupomSel(c);
                          go("resgatar");
                        }}
                        className={jaResgatado ? "shrink-0 cursor-default rounded-full bg-black/[0.05] px-3 py-1.5 text-[12px] font-semibold text-ink-faint" : "shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-semibold text-white transition active:scale-95"}
                        style={jaResgatado ? undefined : { backgroundColor: accent }}
                      >
                        {jaResgatado ? "Resgatado" : "Resgatar"}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="h-4" />
            </AppScreen>
          );
        }

        if (tela === "resgatar") {
          if (!cupomSel) return null;
          return (
            <AppScreen
              statusColor={accent}
              accent={accent}
              footer={
                <button
                  onClick={() => {
                    setResgatados((r) => (r.includes(cupomSel.id) ? r : [...r, cupomSel.id]));
                    openModal("Cupom resgatado", `${cupomSel.titulo} já está disponível na sua carteira. Apresente no caixa para usar.`);
                    go("cupons");
                  }}
                  className="w-full rounded-2xl py-3 text-center text-sm font-semibold text-white shadow-lg transition active:scale-[0.99]"
                  style={{ backgroundColor: accent }}
                >
                  Confirmar resgate
                </button>
              }
            >
              <BarraVoltar titulo="Confirmar resgate" onVoltar={() => go("cupons")} accent={accent} />
              <div className="px-4 py-6 text-center">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl text-white shadow-md" style={{ background: grad }}>
                  <Icone id={cupomSel.icone} className="h-9 w-9" />
                </div>
                <p className="mt-4 font-display text-lg text-ink">{cupomSel.titulo}</p>
                <p className="mt-1 text-sm text-ink-faint">{cupomSel.descricao}</p>
                <p className="mt-3 text-sm">
                  Custo: <span className="font-bold" style={{ color: accent }}>{cupomSel.custoPontos} pts</span>
                </p>
              </div>
            </AppScreen>
          );
        }

        // historico
        return (
          <AppScreen statusColor={accent} accent={accent} nav={nav} navAtual="extrato">
            <Cabecalho titulo="Histórico" sub="Movimentações recentes primeiro" accent={accent} />
            <ul className="px-4 pt-2">
              {MOVIMENTACOES.map((m) => {
                const acumulado = m.tipo === "acumulados";
                return (
                  <li key={m.id} className="flex items-center gap-3 border-b border-black/[0.05] py-3 last:border-0">
                    <span
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-base font-bold"
                      style={{ backgroundColor: acumulado ? `${accent}14` : "rgba(0,0,0,0.05)", color: acumulado ? accent : "#8A8A92" }}
                    >
                      {acumulado ? "+" : "−"}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-ink">{m.descricao}</p>
                      <p className="text-[12px] text-ink-faint">{formatData(m.data)}</p>
                    </div>
                    <span className="text-sm font-bold tabular-nums" style={{ color: acumulado ? accent : "#8A8A92" }}>
                      {acumulado ? "+" : "-"}
                      {m.pontos} pts
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="h-4" />
          </AppScreen>
        );
      }}
    />
  );
}

function Atalho({ icone, titulo, sub, onClick, accent }: { icone: Parameters<typeof Icone>[0]["id"]; titulo: string; sub: string; onClick: () => void; accent: string }) {
  return (
    <button onClick={onClick} className="flex w-full items-center gap-3 rounded-2xl border border-black/[0.06] bg-white p-3.5 text-left shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition active:scale-[0.99]">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl" style={{ backgroundColor: `${accent}12`, color: accent }}>
        <Icone id={icone} className="h-5 w-5" />
      </span>
      <div className="flex-1">
        <p className="text-sm font-semibold text-ink">{titulo}</p>
        <p className="text-[12px] text-ink-faint">{sub}</p>
      </div>
      <span className="text-ink-faint">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 5 7 7-7 7" /></svg>
      </span>
    </button>
  );
}
