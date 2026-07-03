"use client";
import { useMemo, useState } from "react";
import { AppRuntime, type ScreenApi } from "@/components/simulator/AppRuntime";
import { AppScreen } from "@/components/apps/_ui/AppScreen";
import type { ItemNav } from "@/components/apps/_ui/BottomNav";
import { BarraVoltar, BotaoFavorito, Cabecalho, EstadoVazio, Icone, Rating, Tag } from "@/components/apps/_ui/ui";
import { PRODUTOS, type Produto } from "@/lib/mock/loja";
import { formatBRL } from "@/lib/format";

type Linha = { produto: Produto; qtd: number };

export function VitrineApp({ accent }: { accent: string }) {
  const [selecionado, setSelecionado] = useState<Produto | null>(null);
  const [carrinho, setCarrinho] = useState<Linha[]>([]);
  const [favoritos, setFavoritos] = useState<string[]>([]);

  const qtdTotal = carrinho.reduce((s, l) => s + l.qtd, 0);
  const total = useMemo(() => carrinho.reduce((s, l) => s + l.produto.precoCentavos * l.qtd, 0), [carrinho]);

  const add = (p: Produto) =>
    setCarrinho((ls) => {
      const ex = ls.find((l) => l.produto.id === p.id);
      if (ex) return ls.map((l) => (l.produto.id === p.id ? { ...l, qtd: l.qtd + 1 } : l));
      return [...ls, { produto: p, qtd: 1 }];
    });

  const dec = (id: string) =>
    setCarrinho((ls) => ls.flatMap((l) => (l.produto.id === id ? (l.qtd > 1 ? [{ ...l, qtd: l.qtd - 1 }] : []) : [l])));

  const toggleFav = (id: string) => setFavoritos((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  return (
    <AppRuntime
      telaInicial="vitrine"
      render={({ tela, go, openModal }: ScreenApi) => {
        const nav: ItemNav[] = [
          { id: "inicio", label: "Início", icone: "inicio", onSelect: () => go("vitrine") },
          { id: "buscar", label: "Buscar", icone: "buscar", onSelect: () => openModal("Buscar produtos", "No app real, aqui o cliente busca por nome, categoria ou marca. Nesta demonstração a vitrine já mostra o catálogo completo.") },
          { id: "sacola", label: "Sacola", icone: "sacola", onSelect: () => go("carrinho") },
          { id: "favoritos", label: "Favoritos", icone: "coracao", onSelect: () => go("favoritos") },
        ];

        if (tela === "vitrine") {
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
                    <span className="text-sm font-bold">{formatBRL(total)}</span>
                  </button>
                ) : undefined
              }
            >
              <div className="px-4 pb-4 pt-4 text-white" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}CC)` }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-display text-xl leading-tight">Vitrine</p>
                    <p className="text-[12px] text-white/80">Sua loja aberta 24 horas.</p>
                  </div>
                  <BotaoFavorito ativo={favoritos.length > 0} onToggle={() => go("favoritos")} accent="#FFFFFF" className="h-9 w-9 bg-white/15 text-white" />
                </div>
                <div className="mt-3 flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-ink-faint">
                  <Icone id="buscar" className="h-4 w-4" />
                  <span className="text-[13px]">Buscar na loja</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 px-4 pt-4">
                {PRODUTOS.map((p) => {
                  const fav = favoritos.includes(p.id);
                  return (
                    <article
                      key={p.id}
                      className="relative overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                    >
                      {/* Botão de navegação cobre o card; o favoritar é irmão, por cima. */}
                      <button
                        onClick={() => {
                          setSelecionado(p);
                          go("produto");
                        }}
                        aria-label={`Ver ${p.nome}`}
                        className="block w-full text-left transition active:scale-[0.98]"
                      >
                        <div className="relative">
                          <img
                            src={p.img}
                            alt={p.nome}
                            loading="lazy"
                            decoding="async"
                            className="h-32 w-full object-cover"
                          />
                          {p.tag ? (
                            <span className="absolute left-2 top-2">
                              <Tag accent={accent} tone="solid">{p.tag}</Tag>
                            </span>
                          ) : null}
                        </div>
                        <div className="p-2.5">
                          <p className="truncate text-[13px] font-semibold text-ink">{p.nome}</p>
                          {p.rating ? <Rating nota={p.rating} className="mt-0.5" /> : null}
                          <div className="mt-1 flex items-baseline gap-1.5">
                            <span className="text-sm font-bold" style={{ color: accent }}>
                              {formatBRL(p.precoCentavos)}
                            </span>
                            {p.precoDeCentavos ? (
                              <span className="text-[11px] text-ink-faint line-through">{formatBRL(p.precoDeCentavos)}</span>
                            ) : null}
                          </div>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleFav(p.id)}
                        aria-label={fav ? "remover dos favoritos" : "favoritar"}
                        aria-pressed={fav}
                        className="absolute right-2 top-2 z-10 grid h-7 w-7 place-items-center rounded-full bg-white/90 shadow-sm backdrop-blur transition active:scale-90"
                      >
                        <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill={fav ? accent : "none"} stroke={fav ? accent : "#8A8A92"} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 20s-7-4.4-7-9.2A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7-2.6c0 4.8-7 9.2-7 9.2Z" />
                        </svg>
                      </button>
                    </article>
                  );
                })}
              </div>
              <div className="h-4" />
            </AppScreen>
          );
        }

        if (tela === "produto") {
          if (!selecionado) return null;
          const favoritado = favoritos.includes(selecionado.id);
          return (
            <AppScreen
              statusColor={accent}
              accent={accent}
              footer={
                <div className="flex gap-2">
                  <BotaoFavorito
                    ativo={favoritado}
                    onToggle={() => toggleFav(selecionado.id)}
                    accent={accent}
                    className="h-12 w-14 shrink-0 border border-black/10 bg-white"
                  />
                  <button
                    onClick={() => {
                      add(selecionado);
                      go("carrinho");
                    }}
                    className="flex-1 rounded-2xl py-3 text-center text-sm font-semibold text-white shadow-lg transition active:scale-[0.99]"
                    style={{ backgroundColor: accent }}
                  >
                    Adicionar à sacola
                  </button>
                </div>
              }
            >
              <BarraVoltar titulo={selecionado.nome} onVoltar={() => go("vitrine")} accent={accent} />
              <img
                src={selecionado.img}
                alt={selecionado.nome}
                loading="lazy"
                decoding="async"
                className="h-64 w-full object-cover"
              />
              <div className="px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-display text-lg text-ink">{selecionado.nome}</p>
                  {selecionado.rating ? <Rating nota={selecionado.rating} className="mt-1 shrink-0" /> : null}
                </div>
                <p className="mt-1 text-[13px] leading-relaxed text-ink-faint">{selecionado.descricao}</p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-bold" style={{ color: accent }}>
                    {formatBRL(selecionado.precoCentavos)}
                  </span>
                  {selecionado.precoDeCentavos ? (
                    <span className="text-sm text-ink-faint line-through">{formatBRL(selecionado.precoDeCentavos)}</span>
                  ) : null}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Entrega rápida", "Troca grátis", "Compra segura"].map((v) => (
                    <span key={v} className="flex items-center gap-1 rounded-full bg-black/[0.04] px-2.5 py-1 text-[11px] font-medium text-ink-faint">
                      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke={accent} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m5 13 4 4 10-10" /></svg>
                      {v}
                    </span>
                  ))}
                </div>
              </div>
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
                carrinho.length > 0 ? (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm font-bold text-ink">
                      <span>Total</span>
                      <span className="tabular-nums">{formatBRL(total)}</span>
                    </div>
                    <button
                      onClick={() => go("checkout")}
                      className="w-full rounded-2xl py-3 text-center text-sm font-semibold text-white shadow-lg transition active:scale-[0.99]"
                      style={{ backgroundColor: accent }}
                    >
                      Finalizar compra
                    </button>
                  </div>
                ) : undefined
              }
            >
              <Cabecalho titulo="Sua sacola" sub="Vitrine" accent={accent} />
              {carrinho.length === 0 ? (
                <EstadoVazio icone="sacola" titulo="Sua sacola está vazia" texto="Explore a vitrine e adicione produtos." acao="Ver produtos" onAcao={() => go("vitrine")} accent={accent} />
              ) : (
                <ul className="space-y-3 px-4 pt-3">
                  {carrinho.map((l) => (
                    <li key={l.produto.id} className="flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white p-2.5">
                      <img src={l.produto.img} alt={l.produto.nome} loading="lazy" decoding="async" className="h-14 w-14 rounded-xl object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-ink">{l.produto.nome}</p>
                        <p className="text-sm font-bold" style={{ color: accent }}>{formatBRL(l.produto.precoCentavos)}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button aria-label="menos" onClick={() => dec(l.produto.id)} className="grid h-7 w-7 place-items-center rounded-full bg-black/5 transition active:scale-90">−</button>
                        <span className="w-4 text-center text-sm font-semibold tabular-nums">{l.qtd}</span>
                        <button aria-label="mais" onClick={() => add(l.produto)} className="grid h-7 w-7 place-items-center rounded-full text-white transition active:scale-90" style={{ backgroundColor: accent }}>+</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <div className="h-4" />
            </AppScreen>
          );
        }

        if (tela === "checkout") {
          return (
            <AppScreen
              statusColor={accent}
              accent={accent}
              footer={
                <button
                  onClick={() => {
                    openModal(
                      "Compra confirmada",
                      "Seu pedido foi registrado e você receberá o código de rastreio. No app real, o pagamento é processado com segurança.",
                    );
                    setCarrinho([]);
                    go("vitrine");
                  }}
                  className="w-full rounded-2xl py-3 text-center text-sm font-semibold text-white shadow-lg transition active:scale-[0.99]"
                  style={{ backgroundColor: accent }}
                >
                  Confirmar compra · {formatBRL(total)}
                </button>
              }
            >
              <BarraVoltar titulo="Checkout" onVoltar={() => go("carrinho")} accent={accent} />
              <div className="space-y-5 px-4 py-5">
                <div>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-ink-faint">Endereço de entrega</p>
                  <div className="space-y-2">
                    <CampoFake rotulo="Rua e número" valor="Av. Paulista, 1000" />
                    <div className="flex gap-2">
                      <CampoFake rotulo="Bairro" valor="Bela Vista" />
                      <CampoFake rotulo="CEP" valor="01310-100" />
                    </div>
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-ink-faint">Forma de pagamento</p>
                  <div className="space-y-2">
                    <OpcaoPagamento rotulo="Cartão de crédito" detalhe="Final 4242" ativo accent={accent} />
                    <OpcaoPagamento rotulo="Pix" detalhe="Aprovação na hora" accent={accent} />
                  </div>
                </div>
                <div className="flex justify-between border-t border-black/[0.06] pt-3 text-sm font-bold text-ink">
                  <span>Total</span>
                  <span className="tabular-nums">{formatBRL(total)}</span>
                </div>
              </div>
            </AppScreen>
          );
        }

        // favoritos
        const favs = PRODUTOS.filter((p) => favoritos.includes(p.id));
        return (
          <AppScreen statusColor={accent} accent={accent} nav={nav} navAtual="favoritos">
            <Cabecalho titulo="Favoritos" sub={`${favs.length} ${favs.length === 1 ? "item salvo" : "itens salvos"}`} accent={accent} />
            {favs.length === 0 ? (
              <EstadoVazio icone="coracao" titulo="Nenhum favorito ainda" texto="Toque no coração dos produtos que você amar." acao="Explorar produtos" onAcao={() => go("vitrine")} accent={accent} />
            ) : (
              <ul className="space-y-3 px-4 pt-3">
                {favs.map((p) => (
                  <li key={p.id} className="flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white p-2.5">
                    <button
                      onClick={() => {
                        setSelecionado(p);
                        go("produto");
                      }}
                      className="flex flex-1 items-center gap-3 text-left"
                    >
                      <img src={p.img} alt={p.nome} loading="lazy" decoding="async" className="h-14 w-14 rounded-xl object-cover" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-ink">{p.nome}</p>
                        <p className="text-sm font-bold" style={{ color: accent }}>{formatBRL(p.precoCentavos)}</p>
                      </div>
                    </button>
                    <BotaoFavorito ativo onToggle={() => toggleFav(p.id)} accent={accent} className="h-9 w-9" />
                  </li>
                ))}
              </ul>
            )}
            <div className="h-4" />
          </AppScreen>
        );
      }}
    />
  );
}

function CampoFake({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="flex-1 rounded-xl border border-black/10 bg-white px-3 py-2">
      <p className="text-[10px] uppercase tracking-wide text-ink-faint">{rotulo}</p>
      <p className="text-sm text-ink">{valor}</p>
    </div>
  );
}

function OpcaoPagamento({ rotulo, detalhe, ativo, accent }: { rotulo: string; detalhe: string; ativo?: boolean; accent: string }) {
  return (
    <div
      className="flex items-center justify-between rounded-xl border px-3 py-2.5"
      style={{ borderColor: ativo ? accent : "rgba(0,0,0,0.1)", backgroundColor: ativo ? `${accent}0A` : "#fff" }}
    >
      <div>
        <p className="text-sm font-medium text-ink">{rotulo}</p>
        <p className="text-xs text-ink-faint">{detalhe}</p>
      </div>
      <span className="grid h-5 w-5 place-items-center rounded-full text-white" style={{ backgroundColor: ativo ? accent : "#D6D6D0" }}>
        {ativo ? (
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 13 4 4 10-10" /></svg>
        ) : null}
      </span>
    </div>
  );
}
