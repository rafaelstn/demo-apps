"use client";
import { useState } from "react";
import { AppRuntime, type ScreenApi } from "@/components/simulator/AppRuntime";
import { AppScreen } from "@/components/apps/_ui/AppScreen";
import type { ItemNav } from "@/components/apps/_ui/BottomNav";
import { BarraVoltar, Cabecalho, EstadoVazio, Icone, Monograma, Rating, Tag } from "@/components/apps/_ui/ui";
import {
  SERVICOS,
  PROFISSIONAIS,
  HORARIOS_OCUPADOS,
  CAPA_SALAO,
  gerarHorarios,
  type Servico,
  type Profissional,
} from "@/lib/mock/agendamento";
import { formatBRL } from "@/lib/format";

type Agendamento = { id: string; servico: Servico; profissional: Profissional; horario: string };

export function HoraCertaApp({ accent }: { accent: string }) {
  const [servico, setServico] = useState<Servico | null>(null);
  const [profissional, setProfissional] = useState<Profissional | null>(null);
  const [horario, setHorario] = useState<string | null>(null);
  const [meus, setMeus] = useState<Agendamento[]>([]);

  const horarios = gerarHorarios();
  const ocupados = new Set(HORARIOS_OCUPADOS);
  const livres = horarios.filter((h) => !ocupados.has(h));
  // Próxima janela livre de cada profissional (coerente entre telas).
  const proximaDe = (idProfissional: string) => {
    const i = PROFISSIONAIS.findIndex((p) => p.id === idProfissional);
    return livres[i] ?? livres[0] ?? null;
  };
  // Agrupa a grade do dia em períodos, com contagem de vagas livres.
  const periodos = [
    { id: "manha", nome: "Manhã", faixa: (h: number) => h < 12 },
    { id: "tarde", nome: "Tarde", faixa: (h: number) => h >= 12 && h < 18 },
    { id: "noite", nome: "Noite", faixa: (h: number) => h >= 18 },
  ].map((p) => {
    const slots = horarios.filter((h) => p.faixa(Number(h.slice(0, 2))));
    return { ...p, slots, vagas: slots.filter((h) => !ocupados.has(h)).length };
  }).filter((p) => p.slots.length > 0);

  return (
    <AppRuntime
      telaInicial="servicos"
      render={({ tela, go, openModal }: ScreenApi) => {
        const nav: ItemNav[] = [
          { id: "servicos", label: "Serviços", icone: "servicos", onSelect: () => go("servicos") },
          { id: "agenda", label: "Agenda", icone: "agenda", onSelect: () => go("meus") },
          {
            id: "perfil",
            label: "Perfil",
            icone: "perfil",
            onSelect: () => openModal("Seu perfil", "No app real, aqui ficam os seus dados, o histórico de atendimentos e as suas preferências. Nesta demonstração o foco é marcar um horário."),
          },
        ];

        if (tela === "servicos") {
          return (
            <AppScreen statusColor={accent} accent={accent} nav={nav} navAtual="servicos">
              <div className="relative">
                <img src={CAPA_SALAO} alt="Ambiente do salão" loading="lazy" decoding="async" className="h-40 w-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.78), rgba(0,0,0,0.05))" }} />
                <button
                  onClick={() => go("meus")}
                  className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-[12px] font-medium text-white backdrop-blur transition active:scale-95"
                >
                  <Icone id="agenda" className="h-3.5 w-3.5" /> Agenda ({meus.length})
                </button>
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <Tag accent={accent} tone="glass">Aberto hoje</Tag>
                  <p className="mt-1.5 font-display text-2xl leading-tight">HoraCerta</p>
                  <div className="mt-1 flex items-center gap-3 text-[12px] text-white/90">
                    <Rating nota={4.9} color="#FDE68A" />
                    <span className="flex items-center gap-1"><Icone id="local" className="h-3.5 w-3.5" /> Centro</span>
                  </div>
                </div>
              </div>

              <p className="px-4 pb-1 pt-4 text-[11px] font-bold uppercase tracking-wider text-ink-faint">Escolha o serviço</p>
              <ul className="space-y-3 px-4 pt-1">
                {SERVICOS.map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => {
                        setServico(s);
                        go("profissional");
                      }}
                      className="flex w-full items-center gap-3 rounded-2xl border border-black/[0.06] bg-white p-2.5 text-left shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition active:scale-[0.99]"
                    >
                      <div className="relative shrink-0">
                        <img src={s.img} alt={s.nome} loading="lazy" decoding="async" className="h-16 w-16 rounded-xl object-cover" />
                        {s.tag ? <span className="absolute left-1 top-1"><Tag accent={accent} tone="solid">{s.tag}</Tag></span> : null}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-ink">{s.nome}</p>
                        <p className="mt-0.5 flex items-center gap-1 text-[12px] text-ink-faint">
                          <Icone id="relogio" className="h-3.5 w-3.5" /> {s.duracao}
                        </p>
                        <p className="mt-1 text-sm font-bold" style={{ color: accent }}>{formatBRL(s.precoCentavos)}</p>
                      </div>
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-white" style={{ backgroundColor: accent }}>
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 5 7 7-7 7" /></svg>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="h-4" />
            </AppScreen>
          );
        }

        if (tela === "profissional") {
          return (
            <AppScreen statusColor={accent} accent={accent}>
              <BarraVoltar titulo="Escolha o profissional" onVoltar={() => go("servicos")} accent={accent} />
              {servico ? (
                <div className="flex items-center gap-3 border-b border-black/[0.05] px-4 py-3">
                  <img src={servico.img} alt={servico.nome} loading="lazy" decoding="async" className="h-11 w-11 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-faint">Serviço escolhido</p>
                    <p className="truncate text-sm font-semibold text-ink">{servico.nome}</p>
                  </div>
                  <div className="text-right">
                    <p className="flex items-center justify-end gap-1 text-[12px] text-ink-faint"><Icone id="relogio" className="h-3.5 w-3.5" /> {servico.duracao}</p>
                    <p className="text-sm font-bold" style={{ color: accent }}>{formatBRL(servico.precoCentavos)}</p>
                  </div>
                </div>
              ) : null}
              <p className="px-4 pb-1 pt-4 text-[11px] font-bold uppercase tracking-wider text-ink-faint">Com quem você quer marcar</p>
              <ul className="space-y-3 px-4 pt-1">
                {PROFISSIONAIS.map((p) => {
                  const prox = proximaDe(p.id);
                  return (
                    <li key={p.id}>
                      <button
                        onClick={() => {
                          setProfissional(p);
                          go("horario");
                        }}
                        className="flex w-full items-center gap-3 rounded-2xl border border-black/[0.06] bg-white p-3 text-left shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition active:scale-[0.99]"
                      >
                        <Monograma nome={p.nome} accent={accent} />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="truncate text-sm font-semibold text-ink">{p.nome}</p>
                            <Rating nota={p.rating} className="shrink-0" />
                          </div>
                          <p className="mt-0.5 truncate text-[12px] text-ink-faint">{p.especialidade}</p>
                          {prox ? (
                            <p className="mt-1.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold" style={{ backgroundColor: `${accent}12`, color: accent }}>
                              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} /> Livre às {prox}
                            </p>
                          ) : null}
                        </div>
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-white" style={{ backgroundColor: accent }}>
                          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 5 7 7-7 7" /></svg>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="h-4" />
            </AppScreen>
          );
        }

        if (tela === "horario") {
          return (
            <AppScreen statusColor={accent} accent={accent}>
              <BarraVoltar titulo="Escolha o horário" onVoltar={() => go("profissional")} accent={accent} />

              {/* Resumo do que foi escolhido, sempre visível no topo da tela. */}
              <div className="px-4 pt-4">
                <div className="flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white p-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  {profissional ? <Monograma nome={profissional.nome} accent={accent} className="h-11 w-11" textClassName="text-sm" /> : null}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-semibold text-ink">{profissional?.nome}</p>
                      {profissional ? <Rating nota={profissional.rating} className="shrink-0" /> : null}
                    </div>
                    <p className="mt-0.5 flex items-center gap-1.5 truncate text-[12px] text-ink-faint">
                      {servico?.nome}
                      <span className="inline-flex items-center gap-1"><Icone id="relogio" className="h-3.5 w-3.5" /> {servico?.duracao}</span>
                    </p>
                  </div>
                  <span className="shrink-0 text-sm font-bold" style={{ color: accent }}>{servico ? formatBRL(servico.precoCentavos) : "-"}</span>
                </div>
              </div>

              {periodos.map((per) => (
                <div key={per.id} className="px-4 pt-5">
                  <div className="flex items-baseline justify-between">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-ink-faint">{per.nome}</p>
                    <span className="text-[11px] font-medium text-ink-faint">
                      {per.vagas > 0 ? `${per.vagas} ${per.vagas === 1 ? "horário livre" : "horários livres"}` : "Sem vagas"}
                    </span>
                  </div>
                  <div className="mt-2.5 grid grid-cols-3 gap-2.5">
                    {per.slots.map((h) => {
                      const indisponivel = ocupados.has(h);
                      return (
                        <button
                          key={h}
                          disabled={indisponivel}
                          onClick={() => {
                            setHorario(h);
                            go("confirmacao");
                          }}
                          className={
                            indisponivel
                              ? "cursor-not-allowed rounded-xl border border-black/5 bg-black/[0.04] py-2.5 text-sm text-ink-faint line-through"
                              : "rounded-xl border py-2.5 text-sm font-semibold text-ink transition active:scale-95"
                          }
                          style={indisponivel ? undefined : { borderColor: `${accent}40`, backgroundColor: `${accent}08` }}
                        >
                          {h}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
              <p className="flex items-center gap-1.5 px-4 pt-4 text-[12px] text-ink-faint">
                <span className="inline-block h-2.5 w-2.5 rounded-sm bg-black/[0.08]" /> Horários riscados já estão ocupados.
              </p>
              <div className="h-4" />
            </AppScreen>
          );
        }

        if (tela === "confirmacao") {
          return (
            <AppScreen
              statusColor={accent}
              accent={accent}
              footer={
                <button
                  onClick={() => {
                    if (!servico || !profissional || !horario) return;
                    setMeus((m) => [{ id: `ag-${Date.now()}`, servico, profissional, horario }, ...m]);
                    setServico(null);
                    setProfissional(null);
                    setHorario(null);
                    go("meus");
                  }}
                  className="w-full rounded-2xl py-3 text-center text-sm font-semibold text-white shadow-lg transition active:scale-[0.99]"
                  style={{ backgroundColor: accent }}
                >
                  Confirmar agendamento
                </button>
              }
            >
              <BarraVoltar titulo="Confirmar agendamento" onVoltar={() => go("horario")} accent={accent} />
              <div className="px-4 py-5">
                <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  {/* Cabeçalho do serviço com foto e faixa de destaque na cor accent. */}
                  <div className="relative">
                    {servico ? <img src={servico.img} alt={servico.nome} loading="lazy" decoding="async" className="h-28 w-full object-cover" /> : null}
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72), rgba(0,0,0,0.05))" }} />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3 text-white">
                      <div>
                        <Tag accent={accent} tone="glass">Hoje, {horario ?? "-"}</Tag>
                        <p className="mt-1.5 font-display text-lg leading-tight">{servico?.nome}</p>
                      </div>
                      <span className="flex items-center gap-1 text-[12px] text-white/90"><Icone id="relogio" className="h-3.5 w-3.5" /> {servico?.duracao}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-3 pb-3">
                      {profissional ? <Monograma nome={profissional.nome} accent={accent} className="h-10 w-10" textClassName="text-[13px]" /> : null}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-ink">{profissional?.nome}</p>
                        <p className="truncate text-[12px] text-ink-faint">{profissional?.especialidade}</p>
                      </div>
                      {profissional ? <Rating nota={profissional.rating} className="shrink-0" /> : null}
                    </div>
                    <Linha rotulo="Data" valor={`Hoje, ${horario ?? "-"}`} />
                    <Linha rotulo="Pagamento" valor="No local" />
                    <div className="mt-2 flex items-center justify-between border-t border-black/[0.06] pt-3">
                      <span className="text-sm font-bold text-ink">Total</span>
                      <span className="text-base font-bold" style={{ color: accent }}>{servico ? formatBRL(servico.precoCentavos) : "-"}</span>
                    </div>
                  </div>
                </div>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-[12px] text-ink-faint">
                  <Icone id="relogio" className="h-3.5 w-3.5" /> Você pode cancelar até 2h antes sem custo.
                </p>
              </div>
            </AppScreen>
          );
        }

        // meus
        return (
          <AppScreen statusColor={accent} accent={accent} nav={nav} navAtual="agenda">
            <Cabecalho titulo="Meus agendamentos" sub={meus.length > 0 ? `${meus.length} marcado(s)` : undefined} accent={accent} />
            {meus.length === 0 ? (
              <EstadoVazio icone="agenda" titulo="Nenhum agendamento ainda" texto="Escolha um serviço e marque o seu horário." acao="Marcar um horário" onAcao={() => go("servicos")} accent={accent} />
            ) : (
              <ul className="space-y-3 px-4 pt-4">
                {meus.map((a) => (
                  <li key={a.id} className="rounded-2xl border border-black/[0.06] bg-white p-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                    <div className="flex items-center gap-3">
                      <img src={a.servico.img} alt={a.servico.nome} loading="lazy" decoding="async" className="h-14 w-14 rounded-xl object-cover" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-sm font-semibold text-ink">{a.servico.nome}</p>
                          <span className="inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide" style={{ backgroundColor: `${accent}14`, color: accent }}>
                            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} /> Confirmado
                          </span>
                        </div>
                        <p className="mt-1 flex items-center gap-1.5 text-[12px] text-ink-faint">
                          <Monograma nome={a.profissional.nome} accent={accent} className="h-5 w-5" textClassName="text-[9px]" />
                          {a.profissional.nome}
                          <span className="inline-flex items-center gap-1"><Icone id="relogio" className="h-3.5 w-3.5" /> Hoje, {a.horario}</span>
                        </p>
                      </div>
                      <span className="shrink-0 text-sm font-bold" style={{ color: accent }}>{formatBRL(a.servico.precoCentavos)}</span>
                    </div>
                    <button
                      onClick={() => {
                        setMeus((m) => m.filter((x) => x.id !== a.id));
                        openModal("Agendamento cancelado", `O horário de ${a.servico.nome} com ${a.profissional.nome} às ${a.horario} foi cancelado e a vaga liberada.`);
                      }}
                      className="mt-3 w-full rounded-xl border border-black/10 py-2 text-sm font-semibold text-ink transition active:scale-[0.99]"
                    >
                      Cancelar
                    </button>
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

function Linha({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="flex justify-between py-1.5 text-sm">
      <span className="text-ink-faint">{rotulo}</span>
      <span className="font-semibold text-ink">{valor}</span>
    </div>
  );
}
