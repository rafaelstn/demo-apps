"use client";
import { useMemo, useState } from "react";
import { AppRuntime, type ScreenApi } from "@/components/simulator/AppRuntime";
import { CARDAPIO, TAXA_ENTREGA_CENTAVOS, type ItemCardapio } from "@/lib/mock/delivery";
import { formatBRL } from "@/lib/format";

type Linha = { item: ItemCardapio; qtd: number };

export function DeliveryApp({ accent }: { accent: string }) {
  const [linhas, setLinhas] = useState<Linha[]>([]);

  const subtotal = useMemo(() => linhas.reduce((s, l) => s + l.item.precoCentavos * l.qtd, 0), [linhas]);
  const qtdTotal = linhas.reduce((s, l) => s + l.qtd, 0);
  const total = subtotal > 0 ? subtotal + TAXA_ENTREGA_CENTAVOS : 0;

  const add = (item: ItemCardapio) =>
    setLinhas((ls) => {
      const ex = ls.find((l) => l.item.id === item.id);
      if (ex) return ls.map((l) => (l.item.id === item.id ? { ...l, qtd: l.qtd + 1 } : l));
      return [...ls, { item, qtd: 1 }];
    });

  const dec = (id: string) =>
    setLinhas((ls) => ls.flatMap((l) => (l.item.id === id ? (l.qtd > 1 ? [{ ...l, qtd: l.qtd - 1 }] : []) : [l])));

  const categorias = useMemo(() => Array.from(new Set(CARDAPIO.map((i) => i.categoria))), []);

  return (
    <AppRuntime
      telaInicial="cardapio"
      render={({ tela, go }: ScreenApi) => {
        const TopBar = ({ titulo, voltar }: { titulo: string; voltar?: boolean }) => (
          <div className="sticky top-0 z-10 flex items-center gap-3 px-4 py-3.5 text-white" style={{ backgroundColor: accent }}>
            {voltar && (
              <button aria-label="voltar" onClick={() => go("cardapio")} className="text-lg leading-none">
                ←
              </button>
            )}
            <span className="font-display text-base">{titulo}</span>
          </div>
        );

        if (tela === "cardapio") {
          return (
            <div className="pb-24">
              <div className="px-4 pb-4 pt-5 text-white" style={{ backgroundColor: accent }}>
                <p className="font-display text-xl">SaborJá</p>
                <p className="text-sm text-white/80">Entrega em ~30 min · aberto agora</p>
              </div>
              {categorias.map((cat) => (
                <div key={cat}>
                  <p className="px-4 pb-1 pt-4 text-xs font-semibold uppercase tracking-wide text-ink-faint">{cat}</p>
                  <ul>
                    {CARDAPIO.filter((i) => i.categoria === cat).map((i) => {
                      const linha = linhas.find((l) => l.item.id === i.id);
                      return (
                        <li key={i.id} className="flex items-center gap-3 border-b border-black/5 px-4 py-3">
                          <div className="grid h-12 w-12 place-items-center rounded-xl bg-black/5 text-2xl">{i.emoji}</div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-ink">{i.nome}</p>
                            <p className="text-xs text-ink-faint">{i.desc}</p>
                            <p className="mt-0.5 text-sm font-semibold" style={{ color: accent }}>
                              {formatBRL(i.precoCentavos)}
                            </p>
                          </div>
                          {linha ? (
                            <div className="flex items-center gap-2">
                              <button aria-label="menos" onClick={() => dec(i.id)} className="grid h-7 w-7 place-items-center rounded-lg bg-black/5 text-ink">
                                −
                              </button>
                              <span className="w-4 text-center text-sm text-ink">{linha.qtd}</span>
                              <button aria-label="mais" onClick={() => add(i)} className="grid h-7 w-7 place-items-center rounded-lg text-white" style={{ backgroundColor: accent }}>
                                +
                              </button>
                            </div>
                          ) : (
                            <button onClick={() => add(i)} className="rounded-lg px-3 py-1.5 text-sm font-medium text-white" style={{ backgroundColor: accent }}>
                              Adicionar
                            </button>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
              {qtdTotal > 0 && (
                <button
                  onClick={() => go("carrinho")}
                  className="fixed inset-x-4 bottom-4 z-20 flex items-center justify-between rounded-xl px-4 py-3 text-white shadow-lg md:absolute"
                  style={{ backgroundColor: accent }}
                >
                  <span className="text-sm font-medium">Ver carrinho ({qtdTotal})</span>
                  <span className="text-sm font-semibold">{formatBRL(subtotal)}</span>
                </button>
              )}
            </div>
          );
        }

        if (tela === "carrinho") {
          return (
            <div className="pb-28">
              <TopBar titulo="Seu carrinho" voltar />
              {linhas.length === 0 ? (
                <div className="grid place-items-center px-8 py-16 text-center">
                  <div>
                    <p className="text-4xl">🛒</p>
                    <p className="mt-3 text-sm text-ink-faint">Seu carrinho está vazio.</p>
                    <button onClick={() => go("cardapio")} className="mt-4 text-sm font-medium" style={{ color: accent }}>
                      Ver cardápio
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <ul>
                    {linhas.map((l) => (
                      <li key={l.item.id} className="flex items-center gap-3 border-b border-black/5 px-4 py-3">
                        <span className="text-xl">{l.item.emoji}</span>
                        <div className="flex-1">
                          <p className="text-sm text-ink">{l.item.nome}</p>
                          <p className="text-xs text-ink-faint">{formatBRL(l.item.precoCentavos)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button aria-label="menos" onClick={() => dec(l.item.id)} className="grid h-7 w-7 place-items-center rounded-lg bg-black/5">
                            −
                          </button>
                          <span className="w-4 text-center text-sm">{l.qtd}</span>
                          <button aria-label="mais" onClick={() => add(l.item)} className="grid h-7 w-7 place-items-center rounded-lg text-white" style={{ backgroundColor: accent }}>
                            +
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="space-y-1 px-4 py-4 text-sm">
                    <div className="flex justify-between text-ink-faint">
                      <span>Subtotal</span>
                      <span>{formatBRL(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-ink-faint">
                      <span>Taxa de entrega</span>
                      <span>{formatBRL(TAXA_ENTREGA_CENTAVOS)}</span>
                    </div>
                    <div className="flex justify-between pt-1 text-base font-semibold text-ink">
                      <span>Total</span>
                      <span>{formatBRL(total)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => go("acompanhar")}
                    className="fixed inset-x-4 bottom-4 z-20 rounded-xl py-3 text-center font-medium text-white md:absolute"
                    style={{ backgroundColor: accent }}
                  >
                    Finalizar pedido
                  </button>
                </>
              )}
            </div>
          );
        }

        if (tela === "acompanhar") {
          const etapas = ["Pedido recebido", "Em preparo", "Saiu para entrega", "Entregue"];
          const atual = 1;
          return (
            <div>
              <TopBar titulo="Acompanhar pedido" />
              <div className="px-4 py-5">
                <p className="text-sm text-ink-faint">Pedido #2048 · chega em ~28 min</p>
                <ol className="mt-5 space-y-5">
                  {etapas.map((etapa, idx) => (
                    <li key={etapa} className="flex items-center gap-3">
                      <span
                        className="grid h-7 w-7 place-items-center rounded-full text-xs text-white"
                        style={{ backgroundColor: idx <= atual ? accent : "#D6D6D0" }}
                      >
                        {idx <= atual ? "✓" : idx + 1}
                      </span>
                      <span className={idx <= atual ? "text-sm font-medium text-ink" : "text-sm text-ink-faint"}>{etapa}</span>
                    </li>
                  ))}
                </ol>
                <button onClick={() => go("sucesso")} className="mt-8 w-full rounded-xl py-3 text-center font-medium text-white" style={{ backgroundColor: accent }}>
                  Marcar como entregue
                </button>
              </div>
            </div>
          );
        }

        // sucesso
        return (
          <div className="grid h-full place-items-center p-8 text-center">
            <div>
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full text-2xl text-white" style={{ backgroundColor: accent }}>
                ✓
              </div>
              <p className="mt-4 font-display text-lg text-ink">Pedido entregue!</p>
              <p className="mt-1 text-sm text-ink-faint">É assim que o seu cliente pede, sem depender de app de terceiro.</p>
              <button
                onClick={() => {
                  setLinhas([]);
                  go("cardapio");
                }}
                className="mt-6 text-sm font-medium"
                style={{ color: accent }}
              >
                Fazer outro pedido
              </button>
            </div>
          </div>
        );
      }}
    />
  );
}
