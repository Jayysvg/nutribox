import { Goal, Kit, Product } from "@/types";

export const PRODUCTS: Product[] = [
  { id: "p1", name: "Frango Grelhado & Batata Doce", description: "Peito de frango temperado com ervas, batata doce e brócolis no vapor.", price: 24.9, category: "fitness", image: "/images/frango.jpeg", calories: 420, protein: 38, rating: 4.9, reviews: 412, popular: true, goals: ["emagrecimento", "massa"] },
  { id: "p2", name: "Salmão ao Limão Siciliano", description: "Salmão grelhado, arroz integral e legumes salteados.", price: 34.9, category: "fitness", image: "/images/salmao.png", calories: 510, protein: 34, rating: 4.8, reviews: 287, popular: true, goals: ["massa", "equilibrio"] },
  { id: "p3", name: "Strogonoff de Frango", description: "Strogonoff cremoso com arroz branco e batata palha.", price: 26.9, category: "tradicional", image: "/images/strogonoff.jpg", calories: 620, protein: 28, rating: 4.7, reviews: 521, goals: ["equilibrio"] },
  { id: "p4", name: "Feijoada Light", description: "Feijoada com cortes magros, arroz, couve e farofa crocante.", price: 28.9, category: "tradicional", image: "/images/feijoada.jpg", calories: 680, protein: 32, rating: 4.6, reviews: 198, goals: ["equilibrio", "massa"] },
  { id: "p5", name: "Lasanha de Berinjela", description: "Camadas de berinjela, molho de tomate rústico e queijo gratinado.", price: 25.9, category: "vegetariano", image:"/images/lasanha.jpg", calories: 480, protein: 22, rating: 4.7, reviews: 156, goals: ["emagrecimento", "equilibrio"] },
  { id: "p6", name: "Risoto de Cogumelos", description: "Arroz arbóreo cremoso com mix de cogumelos frescos.", price: 27.9, category: "vegetariano", image:"/images/risoto de cogumelos.webp", calories: 520, protein: 18, rating: 4.8, reviews: 142, goals: ["equilibrio"] },
  { id: "p7", name: "Carne de Panela com Purê", description: "Patinho cozido lentamente com purê de mandioquinha.", price: 27.9, category: "tradicional", image:"/images/carne de panela.jpg", calories: 590, protein: 36, rating: 4.9, reviews: 364, popular: true, goals: ["massa", "equilibrio"] },
  { id: "p8", name: "Wrap de Frango Low Carb", description: "Wrap de couve com frango desfiado, cream cheese e tomate.", price: 22.9, category: "lowcarb", image:"/images/wrap.webp", calories: 340, protein: 30, rating: 4.7, reviews: 219, goals: ["emagrecimento", "lowcarb"] },
  { id: "p9", name: "Omelete de Espinafre", description: "Omelete fofo com espinafre, queijo branco e tomate cereja.", price: 19.9, category: "lowcarb", image:"/images/omelete.jpg", calories: 290, protein: 24, rating: 4.6, reviews: 173, goals: ["emagrecimento", "lowcarb"] },
  { id: "p10", name: "Tilápia com Quinoa", description: "Filé de tilápia grelhado com quinoa e legumes assados.", price: 29.9, category: "fitness", image:"images/tilapia com quinoa.webp", calories: 440, protein: 35, rating: 4.8, reviews: 201, goals: ["emagrecimento", "massa"] },
  { id: "p11", name: "Curry de Grão-de-bico", description: "Grão-de-bico ao curry com leite de coco e arroz basmati.", price: 24.9, category: "vegetariano", image:"/images/curry.jpg", calories: 510, protein: 20, rating: 4.7, reviews: 134, goals: ["equilibrio"] },
  { id: "p12", name: "Picadinho com Arroz e Feijão", description: "Picadinho de carne com arroz branco, feijão carioca e ovo.", price: 26.9, category: "tradicional", image:"/images/picadinho.png", calories: 650, protein: 34, rating: 4.8, reviews: 298, goals: ["massa", "equilibrio"] },
];

export const KITS: Kit[] = [
  { size: 5, discount: 0.05, label: "Kit Experiência", tagline: "Perfeito para experimentar" },
  { size: 8, discount: 0.10, label: "Kit Semana", tagline: "Cobre a semana toda" },
  { size: 10, discount: 0.15, label: "Kit Família", tagline: "Maior economia" },
];

export const CATEGORY_LABELS: Record<string, string> = {
  todos: "Todos",
  fitness: "Fitness",
  tradicional: "Tradicional",
  vegetariano: "Vegetariano",
  lowcarb: "Low Carb",
};

export const GOAL_LABELS: Record<Goal | "todos", string> = {
  todos: "Todos os objetivos",
  emagrecimento: "Emagrecimento",
  massa: "Ganho de massa",
  lowcarb: "Low carb",
  equilibrio: "Equilíbrio",
};
