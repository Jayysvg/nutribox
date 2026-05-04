import { Kit, Product } from "@/types";

export const PRODUCTS: Product[] = [
  { id: "p1", name: "Frango Grelhado & Batata Doce", description: "Peito de frango temperado com ervas, batata doce e brócolis no vapor.", price: 24.9, category: "fitness", emoji: "🍗", calories: 420 },
  { id: "p2", name: "Salmão ao Limão Siciliano", description: "Salmão grelhado, arroz integral e legumes salteados.", price: 34.9, category: "fitness", emoji: "🐟", calories: 510 },
  { id: "p3", name: "Strogonoff de Frango", description: "Strogonoff cremoso com arroz branco e batata palha.", price: 26.9, category: "tradicional", emoji: "🍛", calories: 620 },
  { id: "p4", name: "Feijoada Light", description: "Feijoada com cortes magros, arroz, couve e farofa crocante.", price: 28.9, category: "tradicional", emoji: "🫘", calories: 680 },
  { id: "p5", name: "Lasanha de Berinjela", description: "Camadas de berinjela, molho de tomate rústico e queijo gratinado.", price: 25.9, category: "vegetariano", emoji: "🍆", calories: 480 },
  { id: "p6", name: "Risoto de Cogumelos", description: "Arroz arbóreo cremoso com mix de cogumelos frescos.", price: 27.9, category: "vegetariano", emoji: "🍄", calories: 520 },
  { id: "p7", name: "Carne de Panela com Purê", description: "Patinho cozido lentamente com purê de mandioquinha.", price: 27.9, category: "tradicional", emoji: "🥘", calories: 590 },
  { id: "p8", name: "Wrap de Frango Low Carb", description: "Wrap de couve com frango desfiado, cream cheese e tomate.", price: 22.9, category: "lowcarb", emoji: "🌯", calories: 340 },
  { id: "p9", name: "Omelete de Espinafre", description: "Omelete fofo com espinafre, queijo branco e tomate cereja.", price: 19.9, category: "lowcarb", emoji: "🍳", calories: 290 },
  { id: "p10", name: "Tilápia com Quinoa", description: "Filé de tilápia grelhado com quinoa e legumes assados.", price: 29.9, category: "fitness", emoji: "🐠", calories: 440 },
  { id: "p11", name: "Curry de Grão-de-bico", description: "Grão-de-bico ao curry com leite de coco e arroz basmati.", price: 24.9, category: "vegetariano", emoji: "🍲", calories: 510 },
  { id: "p12", name: "Picadinho com Arroz e Feijão", description: "Picadinho de carne com arroz branco, feijão carioca e ovo.", price: 26.9, category: "tradicional", emoji: "🍱", calories: 650 },
];

export const KITS: Kit[] = [
  { size: 5, discount: 0.05, label: "Kit Experiência" },
  { size: 8, discount: 0.10, label: "Kit Semana" },
  { size: 10, discount: 0.15, label: "Kit Família" },
];

export const CATEGORY_LABELS: Record<string, string> = {
  todos: "Todos",
  fitness: "Fitness",
  tradicional: "Tradicional",
  vegetariano: "Vegetariano",
  lowcarb: "Low Carb",
};
