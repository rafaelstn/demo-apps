"use client";
import { useMemo, useState } from "react";
import { AppRuntime, type ScreenApi } from "@/components/simulator/AppRuntime";
import { AppScreen } from "@/components/apps/_ui/AppScreen";
import type { ItemNav } from "@/components/apps/_ui/BottomNav";
import { Cabecalho, EstadoVazio, Icone, Rating, Tag } from "@/components/apps/_ui/ui";
import { CARDAPIO, CAPA_RESTAURANTE, TAXA_ENTREGA_CENTAVOS, type ItemCardapio } from "@/lib/mock/delivery";
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
      render={({ tela, go, openModal }: ScreenApi) => {
        const nav: ItemNav[] = [
          { id: "inicio", label: "Início", icone: "inicio", onSelect: () => go("cardapio") },
          { id: "sacola", label: "Sacola", icone: "sacola", onSelect: () => go("carrinho") },
          { id: "pedidos", label: "Pedidos", icone: "agenda", onSelect: () => go("acompanhar") },
          {
            id: "perfil",
            label: "Perfil",
            icone: "perfil",
            onSelect: () =>
              openModal(
                "Seu perfil",
                "No app do seu cliente, aqui ficam os dados, os endereços salvos e o histórico de pedidos. Nesta demonstração o foco é o fluxo de compra.",
              ),
          },
        ];

        const Stepper = ({ id, qtd }: { id: string; qtd: number }) => (
          <div className="flex items-center gap-1.5">
            <button
              aria-label="menos"
              onClick={() => dec(id)}
              className="grid h-7 w-7 place-items-center rounded-full bg-black/5 text-ink transition active:scale-90"
            >
              −
            </button>
            <span className="w-4 text-center text-sm font-semibold text-ink tabular-nums">{qtd}</span>
            <button
              aria-label="mais"
              onClick={() => add(CARDAPIO.find((i) => i.id === id)!)}
              className="grid h-7 w-7 place-items-center rounded-full text-white transition active:scale-90"
              style={{ backgroundColor: accent }}
            >
              +
            </button>
          </div>
        );

        if (tela === "cardapio") {
          return (
            <AppScreen
              statusColor={accent}
              accent={accent}
              nav={nav}
              navAtual="inicio"
              footer={
                qtdTotal > 0 ? (
                  <button
                    onClick={() => go("carrinho")}
                    className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-white shadow-lg transition active:scale-[0.99]"
                    style={{ backgroundColor: accent }}
                  >
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 text-xs tabular-nums">{qtdTotal}</span>
                      Ver sacola
                    </span>
                    <span className="text-sm font-bold">{formatBRL(subtotal)}</span>
                  </button>
                ) : undefined
              }
            >
              {/* Banner do restaurante */}
              <div className="relative">
                <img
                  src={CAPA_RESTAURANTE}
                  alt="Prato em destaque do restaurante"
                  loading="lazy"
                  decoding="async"
                  className="h-40 w-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.78), rgba(0,0,0,0.05))" }} />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <div className="flex items-center gap-2">
                    <Tag accent={accent} tone="glass">Aberto agora</Tag>
                    <span className="text-[11px] text-white/85">Entrega em ~30 min</span>
                  </div>
                  <p className="mt-1.5 font-display text-2xl leading-tight">SaborJá</p>
                  <div className="mt-1 flex items-center gap-3 text-[12px] text-white/90">
                    <Rating nota={4.9} color="#FDE68A" />
                    <span className="flex items-center gap-1">
                      <Icone id="local" className="h-3.5 w-3.5" /> 1,2 km
                    </span>
                    <span>Entrega {formatBRL(TAXA_ENTREGA_CENTAVOS)}</span>
                  </div>
                </div>
              </div>

              {categorias.map((cat) => (
                <div key={cat} className="px-4">
                  <p className="pb-2 pt-5 text-[11px] font-bold uppercase tracking-wider text-ink-faint">{cat}</p>
                  <ul className="space-y-3">
                    {CARDAPIO.filter((i) => i.categoria === cat).map((i) => {
                      const linha = linhas.find((l) => l.item.id === i.id);
                      return (
                        <li key={i.id} className="flex gap-3 rounded-2xl border border-black/[0.06] bg-white p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                          <div className="relative shrink-0">
                            <img
                              src={i.img}
                              alt={i.nome}
                              loading="lazy"
                              decoding="async"
                              className="h-[74px] w-[74px] rounded-xl object-cover"
                            />
                            {i.tag ? (
                              <span className="absolute left-1 top-1">
                                <Tag accent={accent} tone="solid">{i.tag}</Tag>
                              </span>
                            ) : null}
                          </div>
                          <div className="flex min-w-0 flex-1 flex-col">
                            <p className="text-sm font-semibold text-ink">{i.nome}</p>
                            <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-ink-faint">{i.desc}</p>
                            <div className="mt-auto flex items-center justify-between pt-1.5">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold" style={{ color: accent }}>
                                  {formatBRL(i.precoCentavos)}
                                </span>
                                {i.rating ? <Rating nota={i.rating} /> : null}
                              </div>
                              {linha ? (
                                <Stepper id={i.id} qtd={linha.qtd} />
                              ) : (
                                <button
                                  onClick={() => add(i)}
                                  aria-label={`adicionar ${i.nome}`}
                                  className="grid h-8 w-8 place-items-center rounded-full text-white shadow-sm transition active:scale-90"
                                  style={{ backgroundColor: accent }}
                                >
                                  <Icone id="mais" className="h-4 w-4" />
                                </button>
                              )}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
              <div className="h-4" />
            </AppScreen>
          );
        }

        if (tela === "carrinho") {
          return (
            <AppScreen
              statusColor={accent}
              accent={accent}
              nav={nav}
              navAtual="sacola"
              footer={
                linhas.length > 0 ? (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <LinhaTotal label="Subtotal" valor={formatBRL(subtotal)} />
                      <LinhaTotal label="Taxa de entrega" valor={formatBRL(TAXA_ENTREGA_CENTAVOS)} />
                      <LinhaTotal label="Total" valor={formatBRL(total)} forte />
                    </div>
                    <button
                      onClick={() => go("acompanhar")}
                      className="w-full rounded-2xl py-3 text-center text-sm font-semibold text-white shadow-lg transition active:scale-[0.99]"
                      style={{ backgroundColor: accent }}
                    >
                      Finalizar pedido
                    </button>
                  </div>
                ) : undefined
              }
            >
              <Cabecalho titulo="Sua sacola" sub="SaborJá · entrega em ~30 min" accent={accent} />
              {linhas.length === 0 ? (
                <EstadoVazio
                  icone="sacola"
                  titulo="Sua sacola está vazia"
                  texto="Volte ao cardápio e monte o seu pedido."
                  acao="Ver cardápio"
                  onAcao={() => go("cardapio")}
                  accent={accent}
                />
              ) : (
                <ul className="space-y-3 px-4 pt-3">
                  {linhas.map((l) => (
                    <li key={l.item.id} className="flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white p-2.5">
                      <img
                        src={l.item.img}
                        alt={l.item.nome}
                        loading="lazy"
                        decoding="async"
                        className="h-14 w-14 rounded-xl object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-ink">{l.item.nome}</p>
                        <p className="text-sm font-bold" style={{ color: accent }}>
                          {formatBRL(l.item.precoCentavos)}
                        </p>
                      </div>
                      <Stepper id={l.item.id} qtd={l.qtd} />
                    </li>
                  ))}
                </ul>
              )}
              <div className="h-4" />
            </AppScreen>
          );
        }

        if (tela === "acompanhar") {
          const etapas = ["Pedido recebido", "Em preparo", "Saiu para entrega", "Entregue"];
          const atual = 1;
          return (
            <AppScreen
              statusColor={accent}
              accent={accent}
              nav={nav}
              navAtual="pedidos"
              footer={
                <button
                  onClick={() => go("sucesso")}
                  className="w-full rounded-2xl py-3 text-center text-sm font-semibold text-white shadow-lg transition active:scale-[0.99]"
                  style={{ backgroundColor: accent }}
                >
                  Marcar como entregue
                </button>
              }
            >
              <Cabecalho titulo="Acompanhar pedido" sub="Pedido #2048 · chega em ~28 min" accent={accent} />
              <div className="px-4 pt-4">
                <div className="overflow-hidden rounded-2xl border border-black/[0.06]">
                  <img
                    src="/img/delivery/burger.jpg"
                    alt="Seu pedido"
                    loading="lazy"
                    decoding="async"
                    className="h-28 w-full object-cover"
                  />
                </div>
                <ol className="mt-5 space-y-1">
                  {etapas.map((etapa, idx) => {
                    const feito = idx <= atual;
                    const ultimo = idx === etapas.length - 1;
                    return (
                      <li key={etapa} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <span
                            className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold text-white"
                            style={{ backgroundColor: feito ? accent : "#E2E2DE", color: feito ? "#fff" : "#9A9A9F" }}
                          >
                            {feito ? "✓" : idx + 1}
                          </span>
                          {!ultimo ? (
                            <span className="my-0.5 h-6 w-0.5 rounded-full" style={{ backgroundColor: idx < atual ? accent : "#E2E2DE" }} />
                          ) : null}
                        </div>
                        <span className={`pt-1 text-sm ${feito ? "font-semibold text-ink" : "text-ink-faint"}`}>{etapa}</span>
                      </li>
                    );
                  })}
                </ol>
              </div>
              <div className="h-4" />
            </AppScreen>
          );
        }

        // sucesso
        return (
          <AppScreen statusColor={accent} accent={accent} nav={nav} navAtual="pedidos">
            <div className="grid h-full place-items-center p-8 text-center">
              <div>
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full text-white shadow-lg" style={{ backgroundColor: accent }}>
                  <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 13 4 4 10-10" />
                  </svg>
                </div>
                <p className="mt-5 font-display text-xl text-ink">Pedido entregue!</p>
                <p className="mx-auto mt-1.5 max-w-[220px] text-sm text-ink-faint">
                  Total {formatBRL(total || TAXA_ENTREGA_CENTAVOS)}. É assim que o seu cliente pede, sem depender de app de terceiro.
                </p>
                <button
                  onClick={() => {
                    setLinhas([]);
                    go("cardapio");
                  }}
                  className="mt-6 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition active:scale-95"
                  style={{ backgroundColor: accent }}
                >
                  Fazer outro pedido
                </button>
              </div>
            </div>
          </AppScreen>
        );
      }}
    />
  );
}

function LinhaTotal({ label, valor, forte }: { label: string; valor: string; forte?: boolean }) {
  return (
    <div className={`flex justify-between ${forte ? "text-sm font-bold text-ink" : "text-[13px] text-ink-faint"}`}>
      <span>{label}</span>
      <span className="tabular-nums">{valor}</span>
    </div>
  );
}
