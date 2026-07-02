export type ItemCardapio = {
  id: string;
  nome: string;
  desc: string;
  precoCentavos: number;
  categoria: string;
  emoji: string;
};

export const CARDAPIO: ItemCardapio[] = [
  { id: "burger", nome: "Burger da Casa", desc: "Pão brioche, 180g, cheddar e bacon", precoCentavos: 3290, categoria: "Lanches", emoji: "🍔" },
  { id: "veggie", nome: "Veggie Supreme", desc: "Grão-de-bico, queijo e salada", precoCentavos: 2990, categoria: "Lanches", emoji: "🥗" },
  { id: "batata", nome: "Batata Rústica", desc: "Porção com alecrim e maionese da casa", precoCentavos: 1890, categoria: "Acompanhamentos", emoji: "🍟" },
  { id: "refri", nome: "Refrigerante Lata", desc: "350ml bem gelado", precoCentavos: 690, categoria: "Bebidas", emoji: "🥤" },
  { id: "suco", nome: "Suco Natural", desc: "Laranja ou maracujá, 400ml", precoCentavos: 1190, categoria: "Bebidas", emoji: "🧃" },
];

export const TAXA_ENTREGA_CENTAVOS = 599;
