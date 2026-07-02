"use client";
import { useState } from "react";
import { AppRuntime, type ScreenApi } from "@/components/simulator/AppRuntime";
import { AppScreen } from "@/components/apps/_ui/AppScreen";
import type { ItemNav } from "@/components/apps/_ui/BottomNav";
import { BarraVoltar, BotaoFavorito, Cabecalho, EstadoVazio, Icone, Tag } from "@/components/apps/_ui/ui";
import { IMOVEIS, DATAS_VISITA, HORARIOS_VISITA, type Imovel } from "@/lib/mock/imobiliaria";
import { formatBRL } from "@/lib/format";

export function LarCertoApp({ accent }: { accent: string }) {
  const [imovelSel, setImovelSel] = useState<Imovel | null>(null);
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [dataVisita, setDataVisita] = useState<string | null>(null);
  const [horaVisita, setHoraVisita] = useState<string | null>(null);

  const toggleFav = (id: string) => setFavoritos((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  return (
    <AppRuntime
      telaInicial="busca"
      render={({ tela, go, openModal }: ScreenApi) => {
        const nav: ItemNav[] = [
          { id: "buscar", label: "Buscar", icone: "buscar", onSelect: () => go("busca") },
          { id: "salvos", label: "Salvos", icone: "coracao", onSelect: () => go("favoritos") },
          {
            id: "perfil",
            label: "Perfil",
            icone: "perfil",
            onSelect: () => openModal("Seu perfil", "No app real, aqui ficam as suas buscas salvas, os alertas de novos imóveis e o contato com o corretor. Nesta demonstração o foco é encontrar e visitar um imóvel."),
          },
        ];

        if (tela === "busca") {
          return (
            <AppScreen statusColor={accent} accent={accent} nav={nav} navAtual="buscar">
              <div className="px-4 pb-4 pt-4 text-white" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}CC)` }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-display text-xl leading-tight">LarCerto</p>
                    <p className="text-[12px] text-white/80">O imóvel certo, na sua mão.</p>
                  </div>
                  <BotaoFavorito ativo={favoritos.length > 0} onToggle={() => go("favoritos")} accent="#FFFFFF" className="h-9 w-9 bg-white/15 text-white" />
                </div>
                <div className="mt-3 flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-ink-faint">
                  <Icone id="buscar" className="h-4 w-4" />
                  <span className="text-[13px]">Bairro, cidade ou tipo</span>
                </div>
                <div className="mt-2.5 flex gap-2">
                  <Chip texto="Comprar" ativo />
                  <Chip texto="2+ quartos" />
                  <Chip texto="Com vaga" />
                </div>
              </div>

              <div className="flex items-center justify-between px-4 pb-1 pt-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-ink-faint">{IMOVEIS.length} imóveis</p>
                <span className="text-[12px] text-ink-faint">Ordenar por relevância</span>
              </div>
              <ul className="space-y-4 px-4 pt-2">
                {IMOVEIS.map((im) => {
                  const fav = favoritos.includes(im.id);
                  return (
                    <li key={im.id} className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                      <button onClick={() => { setImovelSel(im); go("imovel"); }} className="block w-full text-left transition active:scale-[0.99]">
                        <div className="relative">
                          <img src={im.img} alt={im.titulo} loading="lazy" decoding="async" className="h-44 w-full object-cover" />
                          <div className="absolute inset-x-0 bottom-0 h-20" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65), transparent)" }} />
                          {im.tag ? <span className="absolute left-3 top-3"><Tag accent={accent} tone="solid">{im.tag}</Tag></span> : null}
                          <span
                            role="button"
                            tabIndex={0}
                            onClick={(e) => { e.stopPropagation(); toggleFav(im.id); }}
                            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.stopPropagation(); toggleFav(im.id); } }}
                            aria-label={fav ? "remover dos salvos" : "salvar"}
                            className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 shadow-sm backdrop-blur transition active:scale-90"
                          >
                            <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill={fav ? accent : "none"} stroke={fav ? accent : "#8A8A92"} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 20s-7-4.4-7-9.2A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7-2.6c0 4.8-7 9.2-7 9.2Z" />
                            </svg>
                          </span>
                          <p className="absolute bottom-2.5 left-3 font-display text-xl font-semibold text-white drop-shadow">{formatBRL(im.precoCentavos)}</p>
                        </div>
                        <div className="p-3">
                          <p className="text-sm font-semibold text-ink">{im.titulo}</p>
                          <p className="flex items-center gap-1 text-[12px] text-ink-faint"><Icone id="local" className="h-3.5 w-3.5" /> {im.bairro}</p>
                          <div className="mt-2 flex items-center gap-3 border-t border-black/[0.05] pt-2 text-[12px] text-ink-muted">
                            <Spec valor={`${im.quartos}`} rotulo="quartos" />
                            <Spec valor={`${im.banheiros}`} rotulo="banh." />
                            <Spec valor={`${im.metros}`} rotulo="m²" />
                            <Spec valor={`${im.vagas}`} rotulo="vagas" />
                          </div>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="h-4" />
            </AppScreen>
          );
        }

        if (tela === "imovel") {
          if (!imovelSel) return null;
          const favoritado = favoritos.includes(imovelSel.id);
          return (
            <AppScreen
              statusColor={accent}
              accent={accent}
              footer={
                <div className="flex gap-2">
                  <BotaoFavorito ativo={favoritado} onToggle={() => toggleFav(imovelSel.id)} accent={accent} className="h-12 w-14 shrink-0 border border-black/10 bg-white" />
                  <button
                    onClick={() => go("visita")}
                    className="flex-1 rounded-2xl py-3 text-center text-sm font-semibold text-white shadow-lg transition active:scale-[0.99]"
                    style={{ backgroundColor: accent }}
                  >
                    Agendar visita
                  </button>
                </div>
              }
            >
              <BarraVoltar titulo="Detalhe do imóvel" onVoltar={() => go("busca")} accent={accent} />
              <div className="relative">
                <img src={imovelSel.img} alt={imovelSel.titulo} loading="lazy" decoding="async" className="h-60 w-full object-cover" />
                <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
                  <Icone id="imovel" className="h-3.5 w-3.5" /> 3 fotos
                </span>
              </div>
              <div className="px-4 pt-4">
                <p className="font-display text-lg text-ink">{imovelSel.titulo}</p>
                <p className="flex items-center gap-1 text-[13px] text-ink-faint"><Icone id="local" className="h-4 w-4" /> {imovelSel.bairro}</p>
                <p className="mt-2 text-2xl font-bold" style={{ color: accent }}>{formatBRL(imovelSel.precoCentavos)}</p>
                <div className="mt-4 grid grid-cols-4 gap-2">
                  <Caracteristica valor={`${imovelSel.quartos}`} rotulo="Quartos" accent={accent} icone="cama" />
                  <Caracteristica valor={`${imovelSel.banheiros}`} rotulo="Banheiros" accent={accent} icone="banho" />
                  <Caracteristica valor={`${imovelSel.metros}`} rotulo="m²" accent={accent} icone="area" />
                  <Caracteristica valor={`${imovelSel.vagas}`} rotulo="Vagas" accent={accent} icone="vaga" />
                </div>
                <p className="mt-4 text-[13px] leading-relaxed text-ink-faint">
                  Imóvel bem localizado, pronto para morar, com ótima iluminação natural e acabamento de qualidade. Agende uma visita e conheça de perto.
                </p>
              </div>
            </AppScreen>
          );
        }

        if (tela === "favoritos") {
          const favs = IMOVEIS.filter((im) => favoritos.includes(im.id));
          return (
            <AppScreen statusColor={accent} accent={accent} nav={nav} navAtual="salvos">
              <Cabecalho titulo="Imóveis salvos" sub={`${favs.length} ${favs.length === 1 ? "imóvel" : "imóveis"}`} accent={accent} />
              {favs.length === 0 ? (
                <EstadoVazio icone="coracao" titulo="Nenhum imóvel salvo" texto="Toque no coração dos imóveis que você gostar." acao="Ver imóveis" onAcao={() => go("busca")} accent={accent} />
              ) : (
                <ul className="space-y-3 px-4 pt-4">
                  {favs.map((im) => (
                    <li key={im.id} className="flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white p-2.5">
                      <button onClick={() => { setImovelSel(im); go("imovel"); }} className="flex flex-1 items-center gap-3 text-left">
                        <img src={im.img} alt={im.titulo} loading="lazy" decoding="async" className="h-16 w-16 rounded-xl object-cover" />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-ink">{im.titulo}</p>
                          <p className="truncate text-[12px] text-ink-faint">{im.bairro}</p>
                          <p className="text-sm font-bold" style={{ color: accent }}>{formatBRL(im.precoCentavos)}</p>
                        </div>
                      </button>
                      <BotaoFavorito ativo onToggle={() => toggleFav(im.id)} accent={accent} className="h-9 w-9" />
                    </li>
                  ))}
                </ul>
              )}
              <div className="h-4" />
            </AppScreen>
          );
        }

        if (tela === "visita") {
          return (
            <AppScreen
              statusColor={accent}
              accent={accent}
              footer={
                <button
                  disabled={!dataVisita || !horaVisita}
                  onClick={() => go("contato")}
                  className="w-full rounded-2xl py-3 text-center text-sm font-semibold text-white shadow-lg transition active:scale-[0.99] disabled:opacity-40"
                  style={{ backgroundColor: accent }}
                >
                  {dataVisita && horaVisita ? `Confirmar visita · ${dataVisita} ${horaVisita}` : "Escolha dia e horário"}
                </button>
              }
            >
              <BarraVoltar titulo="Agendar visita" onVoltar={() => go("imovel")} accent={accent} />
              <div className="px-4 py-5">
                <p className="text-[13px] text-ink-faint">{imovelSel?.titulo} · {imovelSel?.bairro}</p>
                <p className="mb-2 mt-5 text-[11px] font-bold uppercase tracking-wider text-ink-faint">Escolha o dia</p>
                <div className="grid grid-cols-2 gap-2">
                  {DATAS_VISITA.map((d) => (
                    <button
                      key={d}
                      onClick={() => setDataVisita(d)}
                      className="rounded-xl border py-2.5 text-sm font-semibold transition active:scale-95"
                      style={dataVisita === d ? { borderColor: accent, backgroundColor: `${accent}12`, color: accent } : { borderColor: "rgba(0,0,0,0.1)", color: "#0A0A0B" }}
                    >
                      {d}
                    </button>
                  ))}
                </div>
                <p className="mb-2 mt-5 text-[11px] font-bold uppercase tracking-wider text-ink-faint">Escolha o horário</p>
                <div className="grid grid-cols-4 gap-2">
                  {HORARIOS_VISITA.map((h) => (
                    <button
                      key={h}
                      onClick={() => setHoraVisita(h)}
                      className="rounded-xl border py-2.5 text-sm font-semibold transition active:scale-95"
                      style={horaVisita === h ? { borderColor: accent, backgroundColor: `${accent}12`, color: accent } : { borderColor: "rgba(0,0,0,0.1)", color: "#0A0A0B" }}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
            </AppScreen>
          );
        }

        // contato
        return (
          <AppScreen
            statusColor={accent}
            accent={accent}
            footer={
              <button
                onClick={() => openModal("Solicitação enviada", `Seu contato foi enviado ao corretor responsável por ${imovelSel?.titulo ?? "o imóvel"}. Ele retorna para confirmar a visita.`)}
                className="w-full rounded-2xl py-3 text-center text-sm font-semibold text-white shadow-lg transition active:scale-[0.99]"
                style={{ backgroundColor: accent }}
              >
                Enviar solicitação
              </button>
            }
          >
            <BarraVoltar titulo="Falar com o corretor" onVoltar={() => go("visita")} accent={accent} />
            <div className="px-4 py-5">
              <div className="flex items-center gap-3 rounded-2xl border p-3" style={{ borderColor: `${accent}33`, backgroundColor: `${accent}0A` }}>
                <span className="grid h-9 w-9 place-items-center rounded-full text-white" style={{ backgroundColor: accent }}>
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m5 13 4 4 10-10" /></svg>
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">Visita agendada</p>
                  <p className="text-[12px] text-ink-faint">{imovelSel?.titulo} · {dataVisita ?? "-"} às {horaVisita ?? "-"}</p>
                </div>
              </div>
              <p className="mb-2 mt-5 text-[11px] font-bold uppercase tracking-wider text-ink-faint">Seus dados</p>
              <div className="space-y-2">
                <CampoFake rotulo="Nome" valor="Rafael Damasceno" />
                <CampoFake rotulo="Telefone" valor="(11) 90000-0000" />
                <CampoFake rotulo="Mensagem" valor="Tenho interesse, podem me chamar?" />
              </div>
            </div>
          </AppScreen>
        );
      }}
    />
  );
}

function Chip({ texto, ativo }: { texto: string; ativo?: boolean }) {
  return (
    <span className="rounded-full px-3 py-1 text-[12px] font-semibold" style={{ backgroundColor: ativo ? "#FFFFFF" : "rgba(255,255,255,0.18)", color: ativo ? "#0A0A0B" : "#FFFFFF" }}>
      {texto}
    </span>
  );
}

function Spec({ valor, rotulo }: { valor: string; rotulo: string }) {
  return (
    <span className="flex items-baseline gap-1">
      <span className="font-semibold text-ink">{valor}</span>
      <span>{rotulo}</span>
    </span>
  );
}

function Caracteristica({ valor, rotulo, accent, icone }: { valor: string; rotulo: string; accent: string; icone: "cama" | "banho" | "area" | "vaga" }) {
  return (
    <div className="grid place-items-center gap-1 rounded-xl border border-black/[0.06] bg-paper-soft py-2.5">
      <span style={{ color: accent }}>
        <IconeImovel id={icone} />
      </span>
      <span className="text-sm font-bold text-ink">{valor}</span>
      <span className="text-[10px] text-ink-faint">{rotulo}</span>
    </div>
  );
}

function IconeImovel({ id }: { id: "cama" | "banho" | "area" | "vaga" }) {
  const c = { viewBox: "0 0 24 24", className: "h-5 w-5", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (id === "cama") return (<svg {...c}><path d="M3 18v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5M3 14v4M21 14v4M6 11V8.5A1.5 1.5 0 0 1 7.5 7h9A1.5 1.5 0 0 1 18 8.5V11" /></svg>);
  if (id === "banho") return (<svg {...c}><path d="M4 12h16M6 12V6a2 2 0 0 1 3.4-1.4M5 12v3a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4v-3" /></svg>);
  if (id === "area") return (<svg {...c}><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 4v16M4 9h16" /></svg>);
  return (<svg {...c}><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M9 16V8h4a2.5 2.5 0 0 1 0 5H9" /></svg>);
}

function CampoFake({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="rounded-xl border border-black/10 bg-white px-3 py-2">
      <p className="text-[10px] uppercase tracking-wide text-ink-faint">{rotulo}</p>
      <p className="text-sm text-ink">{valor}</p>
    </div>
  );
}
