export type Servico = {
  id: string;
  nome: string;
  duracao: string;
  precoCentavos: number;
  img: string;
  tag?: string;
};

export type Profissional = {
  id: string;
  nome: string;
  especialidade: string;
  rating: number;
};

export const SERVICOS: Servico[] = [
  { id: "corte", nome: "Corte", duracao: "45 min", precoCentavos: 4000, img: "/img/agendamento/corte.jpg", tag: "Mais pedido" },
  { id: "barba", nome: "Barba", duracao: "30 min", precoCentavos: 3000, img: "/img/agendamento/barba.jpg" },
  { id: "combo", nome: "Combo corte + barba", duracao: "1h10", precoCentavos: 6000, img: "/img/agendamento/corte.jpg", tag: "Combo" },
  { id: "coloracao", nome: "Coloração", duracao: "1h30", precoCentavos: 12000, img: "/img/agendamento/coloracao.jpg" },
];

export const PROFISSIONAIS: Profissional[] = [
  { id: "bruno", nome: "Bruno Martins", especialidade: "Especialista em cortes", rating: 4.9 },
  { id: "camila", nome: "Camila Reis", especialidade: "Coloração e tratamento", rating: 4.8 },
  { id: "diego", nome: "Diego Souza", especialidade: "Barba e navalha", rating: 5.0 },
];

// Foto de capa do salão (banner do topo).
export const CAPA_SALAO = "/img/agendamento/salao.jpg";

export const HORARIOS_OCUPADOS = ["09:30", "11:00", "13:00", "15:30", "16:00"];

export function gerarHorarios(): string[] {
  const out: string[] = [];
  for (let h = 9; h <= 18; h++) {
    out.push(`${String(h).padStart(2, "0")}:00`);
    if (h < 18) out.push(`${String(h).padStart(2, "0")}:30`);
  }
  return out;
}
