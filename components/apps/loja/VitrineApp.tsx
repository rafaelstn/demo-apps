"use client";
import { useMemo, useState } from "react";
import { AppRuntime, type ScreenApi } from "@/components/simulator/AppRuntime";
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

  const toggleFav = (id: string) =>
    setFavoritos((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  return (
    <AppRuntime
      telaInicial="vitrine"
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

        if (tela === "vitrine") {
          return (
            <div className="pb-24">
              <div className="px-4 pb-4 pt-5 text-white" style={{ backgroundColor: accent }}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-display text-xl">Vitrine</p>
                    <p className="text-sm text-white/80">Sua loja aberta 24 horas.</p>
                  </div>
                  <button
                    onClick={() => go("favoritos")}
                    aria-label="favoritos"
                    className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-base"
                  >
                    {favoritos.length > 0 ? "❤️" : "🤍"}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 px-4 pt-4">
                {PRODUTOS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelecionado(p);
                      go("produto");
                    }}
                    className="overflow-hidden rounded-2xl border border-black/5 text-left"
                  >
                    <div className="grid h-28 place-items-center text-4xl" style={{ backgroundColor: p.cor }}>
                      {p.emoji}
                    </div>
                    <div className="p-2.5">
                      <p className="truncate text-sm font-medium text-ink">{p.nome}</p>
                      <p className="mt-0.5 text-sm font-semibold" style={{ color: accent }}>
                        {formatBRL(p.precoCentavos)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
              {qtdTotal > 0 && (
                <button
                  onClick={() => go("carrinho")}
                  className="fixed inset-x-4 bottom-4 z-20 flex items-center justify-between rounded-xl px-4 py-3 text-white shadow-lg md:absolute"
                  style={{ backgroundColor: accent }}
                >
                  <span className="text-sm font-medium">Ver carrinho ({qtdTotal})</span>
                  <span className="text-sm font-semibold">{formatBRL(total)}</span>
                </button>
              )}
            </div>
          );
        }

        if (tela === "produto") {
          if (!selecionado) return null;
          const favoritado = favoritos.includes(selecionado.id);
          return (
            <div className="pb-28">
              <TopBar titulo="Produto" voltarPara="vitrine" />
              <div className="grid h-56 place-items-center text-7xl" style={{ backgroundColor: selecionado.cor }}>
                {selecionado.emoji}
              </div>
              <div className="px-4 py-5">
                <p className="font-display text-lg text-ink">{selecionado.nome}</p>
                <p className="mt-1 text-sm text-ink-faint">{selecionado.descricao}</p>
                <p className="mt-3 text-2xl font-semibold" style={{ color: accent }}>
                  {formatBRL(selecionado.precoCentavos)}
                </p>
              </div>
              <div className="fixed inset-x-4 bottom-4 z-20 flex gap-2 md:absolute">
                <button
                  onClick={() => toggleFav(selecionado.id)}
                  aria-label="favoritar"
                  className="grid w-14 place-items-center rounded-xl border border-black/10 bg-white text-lg shadow-lg"
                >
                  {favoritado ? "❤️" : "🤍"}
                </button>
                <button
                  onClick={() => {
                    add(selecionado);
                    go("carrinho");
                  }}
                  className="flex-1 rounded-xl py-3 text-center font-medium text-white shadow-lg"
                  style={{ backgroundColor: accent }}
                >
                  Adicionar ao carrinho
                </button>
              </div>
            </div>
          );
        }

        if (tela === "carrinho") {
          return (
            <div className="pb-28">
              <TopBar titulo="Seu carrinho" voltarPara="vitrine" />
              {carrinho.length === 0 ? (
                <div className="grid place-items-center px-8 py-16 text-center">
                  <div>
                    <p className="text-4xl">🛒</p>
                    <p className="mt-3 text-sm text-ink-faint">Seu carrinho está vazio.</p>
                    <button onClick={() => go("vitrine")} className="mt-4 text-sm font-medium" style={{ color: accent }}>
                      Ver produtos
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <ul>
                    {carrinho.map((l) => (
                      <li key={l.produto.id} className="flex items-center gap-3 border-b border-black/5 px-4 py-3">
                        <div className="grid h-11 w-11 place-items-center rounded-xl text-xl" style={{ backgroundColor: l.produto.cor }}>
                          {l.produto.emoji}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-ink">{l.produto.nome}</p>
                          <p className="text-xs text-ink-faint">{formatBRL(l.produto.precoCentavos)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button aria-label="menos" onClick={() => dec(l.produto.id)} className="grid h-7 w-7 place-items-center rounded-lg bg-black/5">
                            −
                          </button>
                          <span className="w-4 text-center text-sm">{l.qtd}</span>
                          <button aria-label="mais" onClick={() => add(l.produto)} className="grid h-7 w-7 place-items-center rounded-lg text-white" style={{ backgroundColor: accent }}>
                            +
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between px-4 py-4 text-base font-semibold text-ink">
                    <span>Total</span>
                    <span>{formatBRL(total)}</span>
                  </div>
                  <button
                    onClick={() => go("checkout")}
                    className="fixed inset-x-4 bottom-4 z-20 rounded-xl py-3 text-center font-medium text-white shadow-lg md:absolute"
                    style={{ backgroundColor: accent }}
                  >
                    Finalizar compra
                  </button>
                </>
              )}
            </div>
          );
        }

        if (tela === "checkout") {
          return (
            <div className="pb-28">
              <TopBar titulo="Checkout" voltarPara="carrinho" />
              <div className="space-y-5 px-4 py-5">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-faint">Endereço de entrega</p>
                  <div className="space-y-2">
                    <CampoFake rotulo="Rua e número" valor="Av. Paulista, 1000" />
                    <div className="flex gap-2">
                      <CampoFake rotulo="Bairro" valor="Bela Vista" />
                      <CampoFake rotulo="CEP" valor="01310-100" />
                    </div>
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-faint">Forma de pagamento</p>
                  <div className="space-y-2">
                    <OpcaoPagamento rotulo="Cartão de crédito" detalhe="Final 4242" ativo accent={accent} />
                    <OpcaoPagamento rotulo="Pix" detalhe="Aprovação na hora" accent={accent} />
                  </div>
                </div>
                <div className="flex justify-between border-t border-black/5 pt-3 text-base font-semibold text-ink">
                  <span>Total</span>
                  <span>{formatBRL(total)}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  openModal(
                    "Compra confirmada",
                    "Seu pedido foi registrado e você receberá o código de rastreio. No app real, o pagamento é processado com segurança.",
                  );
                  setCarrinho([]);
                  go("vitrine");
                }}
                className="fixed inset-x-4 bottom-4 z-20 rounded-xl py-3 text-center font-medium text-white shadow-lg md:absolute"
                style={{ backgroundColor: accent }}
              >
                Confirmar compra
              </button>
            </div>
          );
        }

        // favoritos
        const favs = PRODUTOS.filter((p) => favoritos.includes(p.id));
        return (
          <div className="pb-8">
            <TopBar titulo="Favoritos" voltarPara="vitrine" />
            {favs.length === 0 ? (
              <div className="grid place-items-center px-8 py-16 text-center">
                <div>
                  <p className="text-4xl">🤍</p>
                  <p className="mt-3 text-sm text-ink-faint">Nenhum favorito ainda.</p>
                  <button onClick={() => go("vitrine")} className="mt-4 text-sm font-medium" style={{ color: accent }}>
                    Explorar produtos
                  </button>
                </div>
              </div>
            ) : (
              <ul>
                {favs.map((p) => (
                  <li key={p.id} className="flex items-center gap-3 border-b border-black/5 px-4 py-3">
                    <button
                      onClick={() => {
                        setSelecionado(p);
                        go("produto");
                      }}
                      className="flex flex-1 items-center gap-3 text-left"
                    >
                      <div className="grid h-11 w-11 place-items-center rounded-xl text-xl" style={{ backgroundColor: p.cor }}>
                        {p.emoji}
                      </div>
                      <div>
                        <p className="text-sm text-ink">{p.nome}</p>
                        <p className="text-xs font-semibold" style={{ color: accent }}>
                          {formatBRL(p.precoCentavos)}
                        </p>
                      </div>
                    </button>
                    <button onClick={() => toggleFav(p.id)} aria-label="remover dos favoritos" className="text-lg">
                      ❤️
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      }}
    />
  );
}

function CampoFake({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="flex-1 rounded-xl border border-black/10 px-3 py-2">
      <p className="text-[10px] uppercase tracking-wide text-ink-faint">{rotulo}</p>
      <p className="text-sm text-ink">{valor}</p>
    </div>
  );
}

function OpcaoPagamento({ rotulo, detalhe, ativo, accent }: { rotulo: string; detalhe: string; ativo?: boolean; accent: string }) {
  return (
    <div
      className="flex items-center justify-between rounded-xl border px-3 py-2.5"
      style={{ borderColor: ativo ? accent : "rgba(0,0,0,0.1)" }}
    >
      <div>
        <p className="text-sm font-medium text-ink">{rotulo}</p>
        <p className="text-xs text-ink-faint">{detalhe}</p>
      </div>
      <span
        className="grid h-5 w-5 place-items-center rounded-full text-[10px] text-white"
        style={{ backgroundColor: ativo ? accent : "#D6D6D0" }}
      >
        {ativo ? "✓" : ""}
      </span>
    </div>
  );
}
