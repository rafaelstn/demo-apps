export type Aula = {
  id: string;
  nome: string;
  horario: string;
  instrutor: string;
  vagas: number;
  emoji: string;
  img: string;
  duracao: string;
  intensidade: string;
};

export type Exercicio = {
  id: string;
  nome: string;
  series: string;
  grupo: string;
};

export const AULAS: Aula[] = [
  { id: "spinning", nome: "Spinning", horario: "07:00", instrutor: "Renata Alves", vagas: 3, emoji: "🚴", img: "/img/academia/spinning.jpg", duracao: "45 min", intensidade: "Alta" },
  { id: "funcional", nome: "Funcional", horario: "09:00", instrutor: "Marcos Dias", vagas: 0, emoji: "🤸", img: "/img/academia/funcional.jpg", duracao: "50 min", intensidade: "Alta" },
  { id: "yoga", nome: "Yoga", horario: "18:00", instrutor: "Paula Nunes", vagas: 8, emoji: "🧘", img: "/img/academia/yoga.jpg", duracao: "60 min", intensidade: "Leve" },
  { id: "musculacao", nome: "Musculação livre", horario: "Livre", instrutor: "Equipe de plantão", vagas: 20, emoji: "🏋️", img: "/img/academia/musculacao.jpg", duracao: "Livre", intensidade: "Moderada" },
];

// Foto de capa da grade (banner do topo).
export const CAPA_ACADEMIA = "/img/academia/musculacao.jpg";

export const TREINO_DO_DIA: Exercicio[] = [
  { id: "agachamento", nome: "Agachamento", series: "4 x 12", grupo: "Pernas" },
  { id: "supino", nome: "Supino reto", series: "4 x 10", grupo: "Peito" },
  { id: "remada", nome: "Remada curvada", series: "3 x 12", grupo: "Costas" },
  { id: "rosca", nome: "Rosca direta", series: "3 x 15", grupo: "Bíceps" },
  { id: "prancha", nome: "Prancha isométrica", series: "3 x 40s", grupo: "Core" },
];
