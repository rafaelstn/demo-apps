export type TelaId = string;

export type ModeloApp = {
  id: string;
  nicho: string;
  nome: string;
  tagline: string;
  descricaoVenda: string;
  accent: string;
  telas: TelaId[];
  ctaWhats: string;
};

export const APPS: ModeloApp[] = [
  {
    id: "delivery",
    nicho: "Delivery e Restaurante",
    nome: "SaborJá",
    tagline: "Seu cardápio no bolso do cliente.",
    descricaoVenda:
      "O cliente pede em segundos e acompanha a entrega. Você vende sem depender de aplicativo de terceiro que come a sua margem.",
    accent: "#F97316",
    telas: ["cardapio", "carrinho", "acompanhar", "sucesso"],
    ctaWhats: "Quero um app de Delivery para o meu restaurante",
  },
  {
    id: "agendamento",
    nicho: "Agendamento",
    nome: "HoraCerta",
    tagline: "Sua agenda cheia, sem WhatsApp lotado.",
    descricaoVenda:
      "Salão, barbearia ou clínica: o cliente marca sozinho o horário disponível. Você para de perder tempo confirmando no chat.",
    accent: "#2563EB",
    telas: ["servicos", "profissional", "horario", "confirmacao", "meus"],
    ctaWhats: "Quero um app de Agendamento para o meu negócio",
  },
  {
    id: "loja",
    nicho: "Loja e Catálogo",
    nome: "Vitrine",
    tagline: "Sua loja aberta 24 horas.",
    descricaoVenda:
      "Catálogo com carrinho e favoritos. O cliente compra do sofá e você vende fora do horário da loja física.",
    accent: "#7C3AED",
    telas: ["vitrine", "produto", "carrinho", "checkout", "favoritos"],
    ctaWhats: "Quero um app de Loja para o meu comércio",
  },
  {
    id: "fidelidade",
    nicho: "Fidelidade e Cashback",
    nome: "Clube+",
    tagline: "Cliente que volta, cliente que rende.",
    descricaoVenda:
      "Pontos, selos e cupons no celular do cliente. Ele volta mais e gasta mais para bater a próxima recompensa.",
    accent: "#059669",
    telas: ["saldo", "carteirinha", "cupons", "resgatar", "historico"],
    ctaWhats: "Quero um app de Fidelidade para os meus clientes",
  },
  {
    id: "academia",
    nicho: "Academia e Estúdio",
    nome: "TreinoApp",
    tagline: "Aula reservada é aluno presente.",
    descricaoVenda:
      "Grade de aulas, reserva de vaga e check-in pelo celular. Menos falta, mais controle de lotação.",
    accent: "#DC2626",
    telas: ["grade", "aula", "reservar", "checkin", "treino"],
    ctaWhats: "Quero um app para a minha academia ou estúdio",
  },
  {
    id: "imobiliaria",
    nicho: "Imobiliária",
    nome: "LarCerto",
    tagline: "O imóvel certo, na mão do cliente.",
    descricaoVenda:
      "Busca de imóveis com fotos, favoritos e agendamento de visita. O lead chega qualificado até você.",
    accent: "#0891B2",
    telas: ["busca", "imovel", "favoritos", "visita", "contato"],
    ctaWhats: "Quero um app para a minha imobiliária",
  },
];

export function getApp(id: string): ModeloApp | undefined {
  return APPS.find((a) => a.id === id);
}
