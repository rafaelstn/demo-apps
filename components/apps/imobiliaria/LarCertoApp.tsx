"use client";
import { useState } from "react";
import { AppRuntime, type ScreenApi } from "@/components/simulator/AppRuntime";
import { IMOVEIS, DATAS_VISITA, HORARIOS_VISITA, type Imovel } from "@/lib/mock/imobiliaria";
import { formatBRL } from "@/lib/format";

export function LarCertoApp({ accent }: { accent: string }) {
  const [imovelSel, setImovelSel] = useState<Imovel | null>(null);
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [dataVisita, setDataVisita] = useState<string | null>(null);
  const [horaVisita, setHoraVisita] = useState<string | null>(null);

  const toggleFav = (id: string) =>
    setFavoritos((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  return (
    <AppRuntime
      telaInicial="busca"
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

        if (tela === "busca") {
          return (
            <div className="pb-8">
              <div className="px-4 pb-5 pt-5 text-white" style={{ backgroundColor: accent }}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-display text-xl">LarCerto</p>
                    <p className="text-sm text-white/80">O imóvel certo, na sua mão.</p>
                  </div>
                  <button
                    onClick={() => go("favoritos")}
                    aria-label="favoritos"
                    className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-base"
                  >
                    {favoritos.length > 0 ? "❤️" : "🤍"}
                  </button>
                </div>
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-white/95 px-3 py-2.5">
                  <span className="text-ink-faint">🔎</span>
                  <span className="text-sm text-ink-faint">Bairro, cidade ou tipo</span>
                </div>
                <div className="mt-2.5 flex gap-2">
                  <Chip texto="Comprar" ativo />
                  <Chip texto="2+ quartos" />
                  <Chip texto="Com vaga" />
                </div>
              </div>
              <ul className="px-4 pt-4">
                {IMOVEIS.map((im) => (
                  <li key={im.id} className="mb-3 overflow-hidden rounded-2xl border border-black/5">
                    <button onClick={() => { setImovelSel(im); go("imovel"); }} className="w-full text-left">
                      <div className="grid h-32 place-items-center text-5xl" style={{ backgroundColor: im.cor }}>
                        {im.emoji}
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-medium text-ink">{im.titulo}</p>
                        <p className="text-xs text-ink-faint">{im.bairro}</p>
                        <div className="mt-1.5 flex items-center justify-between">
                          <span className="text-base font-semibold" style={{ color: accent }}>
                            {formatBRL(im.precoCentavos)}
                          </span>
                          <span className="text-xs text-ink-faint">
                            {im.quartos} quartos · {im.metros} m²
                          </span>
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        if (tela === "imovel") {
          if (!imovelSel) return null;
          const favoritado = favoritos.includes(imovelSel.id);
          return (
            <div className="pb-28">
              <TopBar titulo="Detalhe do imóvel" voltarPara="busca" />
              <div className="grid h-52 place-items-center text-7xl" style={{ backgroundColor: imovelSel.cor }}>
                {imovelSel.emoji}
              </div>
              <div className="flex gap-1.5 px-4 pt-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="grid h-14 flex-1 place-items-center rounded-lg border border-black/5 text-xl" style={{ backgroundColor: imovelSel.cor }}>
                    {imovelSel.emoji}
                  </div>
                ))}
              </div>
              <div className="px-4 pt-4">
                <p className="font-display text-lg text-ink">{imovelSel.titulo}</p>
                <p className="text-sm text-ink-faint">{imovelSel.bairro}</p>
                <p className="mt-2 text-2xl font-semibold" style={{ color: accent }}>
                  {formatBRL(imovelSel.precoCentavos)}
                </p>
                <div className="mt-4 grid grid-cols-4 gap-2">
                  <Caracteristica emoji="🛏️" valor={`${imovelSel.quartos}`} rotulo="Quartos" />
                  <Caracteristica emoji="🛁" valor={`${imovelSel.banheiros}`} rotulo="Banheiros" />
                  <Caracteristica emoji="📐" valor={`${imovelSel.metros}`} rotulo="m²" />
                  <Caracteristica emoji="🚗" valor={`${imovelSel.vagas}`} rotulo="Vagas" />
                </div>
              </div>
              <div className="fixed inset-x-4 bottom-4 z-20 flex gap-2 md:absolute">
                <button
                  onClick={() => toggleFav(imovelSel.id)}
                  aria-label="favoritar"
                  className="grid w-14 place-items-center rounded-xl border border-black/10 bg-white text-lg shadow-lg"
                >
                  {favoritado ? "❤️" : "🤍"}
                </button>
                <button
                  onClick={() => go("visita")}
                  className="flex-1 rounded-xl py-3 text-center font-medium text-white shadow-lg"
                  style={{ backgroundColor: accent }}
                >
                  Agendar visita
                </button>
              </div>
            </div>
          );
        }

        if (tela === "favoritos") {
          const favs = IMOVEIS.filter((im) => favoritos.includes(im.id));
          return (
            <div className="pb-8">
              <TopBar titulo="Imóveis salvos" voltarPara="busca" />
              {favs.length === 0 ? (
                <div className="grid place-items-center px-8 py-16 text-center">
                  <div>
                    <p className="text-4xl">🏠</p>
                    <p className="mt-3 text-sm text-ink-faint">Nenhum imóvel salvo.</p>
                    <button onClick={() => go("busca")} className="mt-4 text-sm font-medium" style={{ color: accent }}>
                      Ver imóveis
                    </button>
                  </div>
                </div>
              ) : (
                <ul>
                  {favs.map((im) => (
                    <li key={im.id} className="flex items-center gap-3 border-b border-black/5 px-4 py-3">
                      <button onClick={() => { setImovelSel(im); go("imovel"); }} className="flex flex-1 items-center gap-3 text-left">
                        <div className="grid h-12 w-12 place-items-center rounded-xl text-2xl" style={{ backgroundColor: im.cor }}>
                          {im.emoji}
                        </div>
                        <div>
                          <p className="text-sm text-ink">{im.titulo}</p>
                          <p className="text-xs text-ink-faint">{im.bairro}</p>
                          <p className="text-xs font-semibold" style={{ color: accent }}>
                            {formatBRL(im.precoCentavos)}
                          </p>
                        </div>
                      </button>
                      <button onClick={() => toggleFav(im.id)} aria-label="remover dos salvos" className="text-lg">
                        ❤️
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        }

        if (tela === "visita") {
          return (
            <div className="pb-28">
              <TopBar titulo="Agendar visita" voltarPara="imovel" />
              <div className="px-4 py-5">
                <p className="text-sm text-ink-faint">{imovelSel?.titulo} · {imovelSel?.bairro}</p>
                <p className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wide text-ink-faint">Escolha o dia</p>
                <div className="grid grid-cols-2 gap-2">
                  {DATAS_VISITA.map((d) => (
                    <button
                      key={d}
                      onClick={() => setDataVisita(d)}
                      className="rounded-xl border py-2.5 text-sm font-medium"
                      style={
                        dataVisita === d
                          ? { borderColor: accent, backgroundColor: `${accent}12`, color: accent }
                          : { borderColor: "rgba(0,0,0,0.1)", color: "#0A0A0B" }
                      }
                    >
                      {d}
                    </button>
                  ))}
                </div>
                <p className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wide text-ink-faint">Escolha o horário</p>
                <div className="grid grid-cols-4 gap-2">
                  {HORARIOS_VISITA.map((h) => (
                    <button
                      key={h}
                      onClick={() => setHoraVisita(h)}
                      className="rounded-xl border py-2.5 text-sm font-medium"
                      style={
                        horaVisita === h
                          ? { borderColor: accent, backgroundColor: `${accent}12`, color: accent }
                          : { borderColor: "rgba(0,0,0,0.1)", color: "#0A0A0B" }
                      }
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
              <button
                disabled={!dataVisita || !horaVisita}
                onClick={() => go("contato")}
                className="fixed inset-x-4 bottom-4 z-20 rounded-xl py-3 text-center font-medium text-white shadow-lg transition disabled:opacity-40 md:absolute"
                style={{ backgroundColor: accent }}
              >
                {dataVisita && horaVisita ? `Confirmar visita · ${dataVisita} ${horaVisita}` : "Escolha dia e horário"}
              </button>
            </div>
          );
        }

        // contato
        return (
          <div className="pb-28">
            <TopBar titulo="Falar com o corretor" voltarPara="visita" />
            <div className="px-4 py-5">
              <div className="rounded-2xl border border-black/5 bg-paper-soft p-4">
                <p className="text-sm font-medium text-ink">Visita agendada</p>
                <p className="text-xs text-ink-faint">
                  {imovelSel?.titulo} · {dataVisita ?? "-"} às {horaVisita ?? "-"}
                </p>
              </div>
              <p className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wide text-ink-faint">Seus dados</p>
              <div className="space-y-2">
                <CampoFake rotulo="Nome" valor="Rafael Damasceno" />
                <CampoFake rotulo="Telefone" valor="(11) 90000-0000" />
                <CampoFake rotulo="Mensagem" valor="Tenho interesse, podem me chamar?" />
              </div>
            </div>
            <button
              onClick={() =>
                openModal(
                  "Solicitação enviada",
                  `Seu contato foi enviado ao corretor responsável por ${imovelSel?.titulo ?? "o imóvel"}. Ele retorna para confirmar a visita.`,
                )
              }
              className="fixed inset-x-4 bottom-4 z-20 rounded-xl py-3 text-center font-medium text-white shadow-lg md:absolute"
              style={{ backgroundColor: accent }}
            >
              Enviar solicitação
            </button>
          </div>
        );
      }}
    />
  );
}

function Chip({ texto, ativo }: { texto: string; ativo?: boolean }) {
  return (
    <span
      className="rounded-full px-3 py-1 text-xs font-medium"
      style={{ backgroundColor: ativo ? "#FFFFFF" : "rgba(255,255,255,0.18)", color: ativo ? "#0A0A0B" : "#FFFFFF" }}
    >
      {texto}
    </span>
  );
}

function Caracteristica({ emoji, valor, rotulo }: { emoji: string; valor: string; rotulo: string }) {
  return (
    <div className="grid place-items-center rounded-xl border border-black/5 bg-paper-soft py-2.5">
      <span className="text-lg">{emoji}</span>
      <span className="mt-1 text-sm font-semibold text-ink">{valor}</span>
      <span className="text-[10px] text-ink-faint">{rotulo}</span>
    </div>
  );
}

function CampoFake({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="rounded-xl border border-black/10 px-3 py-2">
      <p className="text-[10px] uppercase tracking-wide text-ink-faint">{rotulo}</p>
      <p className="text-sm text-ink">{valor}</p>
    </div>
  );
}
