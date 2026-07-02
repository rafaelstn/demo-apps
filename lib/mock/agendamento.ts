export type Servico = {
  id: string;
  nome: string;
  duracao: string;
  precoCentavos: number;
  emoji: string;
};

export type Profissional = {
  id: string;
  nome: string;
  especialidade: string;
  emoji: string;
};

export const SERVICOS: Servico[] = [
  { id: "corte", nome: "Corte", duracao: "45 min", precoCentavos: 4000, emoji: "✂️" },
  { id: "barba", nome: "Barba", duracao: "30 min", precoCentavos: 3000, emoji: "🧔" },
  { id: "combo", nome: "Combo corte + barba", duracao: "1h10", precoCentavos: 6000, emoji: "💈" },
  { id: "coloracao", nome: "Coloração", duracao: "1h30", precoCentavos: 12000, emoji: "🎨" },
];

export const PROFISSIONAIS: Profissional[] = [
  { id: "bruno", nome: "Bruno", especialidade: "Especialista em cortes", emoji: "💇" },
  { id: "camila", nome: "Camila", especialidade: "Coloração e tratamento", emoji: "🎨" },
  { id: "diego", nome: "Diego", especialidade: "Barba e navalha", emoji: "🪒" },
];

export const HORARIOS_OCUPADOS = ["09:30", "11:00", "13:00", "15:30", "16:00"];

export function gerarHorarios(): string[] {
  const out: string[] = [];
  for (let h = 9; h <= 18; h++) {
    out.push(`${String(h).padStart(2, "0")}:00`);
    if (h < 18) out.push(`${String(h).padStart(2, "0")}:30`);
  }
  return out;
}
