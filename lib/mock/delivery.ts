export type ItemCardapio = {
  id: string;
  nome: string;
  desc: string;
  precoCentavos: number;
  categoria: string;
  img: string;
  tag?: string;
  rating?: number;
};

export const CARDAPIO: ItemCardapio[] = [
  { id: "burger", nome: "Burger da Casa", desc: "Pão brioche, 180g, cheddar e bacon", precoCentavos: 3290, categoria: "Lanches", img: "/img/delivery/burger.jpg", tag: "Mais pedido", rating: 4.9 },
  { id: "veggie", nome: "Veggie Supreme", desc: "Grão-de-bico, queijo e salada", precoCentavos: 2990, categoria: "Lanches", img: "/img/delivery/veggie.jpg", tag: "Novo", rating: 4.7 },
  { id: "pizza", nome: "Pizza Individual", desc: "Massa artesanal, mussarela e manjericão", precoCentavos: 3490, categoria: "Lanches", img: "/img/delivery/pizza.jpg", rating: 4.8 },
  { id: "batata", nome: "Batata Rústica", desc: "Porção com alecrim e maionese da casa", precoCentavos: 1890, categoria: "Acompanhamentos", img: "/img/delivery/batata.jpg", tag: "Mais pedido", rating: 4.8 },
  { id: "frango", nome: "Frango Crocante", desc: "Iscas empanadas com molho da casa", precoCentavos: 2490, categoria: "Acompanhamentos", img: "/img/delivery/frango.jpg", rating: 4.7 },
  { id: "refri", nome: "Suco de Laranja", desc: "Laranja natural espremida na hora, 400ml", precoCentavos: 890, categoria: "Bebidas", img: "/img/delivery/refri.jpg" },
  { id: "suco", nome: "Suco Natural", desc: "Maracujá ou abacaxi, 400ml", precoCentavos: 1190, categoria: "Bebidas", img: "/img/delivery/suco.jpg" },
  { id: "milkshake", nome: "Milkshake", desc: "Chocolate com chantilly e calda", precoCentavos: 1690, categoria: "Sobremesas", img: "/img/delivery/milkshake.jpg", tag: "Novo", rating: 4.9 },
  { id: "brownie", nome: "Brownie da Casa", desc: "Chocolate meio amargo com calda quente", precoCentavos: 1290, categoria: "Sobremesas", img: "/img/delivery/brownie.jpg", rating: 4.8 },
];

// Foto de capa do restaurante (banner do topo do cardápio).
export const CAPA_RESTAURANTE = "/img/delivery/burger.jpg";

export const TAXA_ENTREGA_CENTAVOS = 599;
