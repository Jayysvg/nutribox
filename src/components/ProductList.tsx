import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { PRODUCTS, CATEGORY_LABELS, GOAL_LABELS } from "@/data/products";
import { Goal, Product } from "@/types";
import { Input } from "@/components/ui/input";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";

interface ProductListProps {
  onAdd: (p: Product) => void;
  selectionMode?: boolean;
  selectedIds?: Set<string>;
  onToggleSelect?: (p: Product) => void;
  selectionFull?: boolean;
}

const CATEGORIES = ["todos", "fitness", "tradicional", "vegetariano", "lowcarb"];
const GOALS: (Goal | "todos")[] = ["todos", "emagrecimento", "massa", "lowcarb", "equilibrio"];

export const ProductList = ({
  onAdd, selectionMode, selectedIds, onToggleSelect, selectionFull,
}: ProductListProps) => {
  const [category, setCategory] = useState<string>("todos");
  const [goal, setGoal] = useState<Goal | "todos">("todos");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat = category === "todos" || p.category === category;
      const matchGoal = goal === "todos" || p.goals.includes(goal);
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchGoal && matchSearch;
    });
  }, [category, goal, search]);

  return (
    <section id="cardapio" className="container py-12 md:py-16">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Cardápio da semana</p>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight">
            Escolha sua marmita favorita
          </h2>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            {filtered.length} opções disponíveis · Atualizado toda semana
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar marmita..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 h-12 rounded-full bg-card border-border shadow-sm focus-visible:ring-primary"
          />
        </div>
      </div>

      <div className="space-y-3 mb-8">
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 md:mx-0 md:px-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "px-5 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-smooth border",
                category === cat
                  ? "gradient-primary text-primary-foreground border-transparent shadow-soft scale-105"
                  : "bg-card text-foreground border-border hover:border-primary/40 hover:-translate-y-0.5"
              )}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold whitespace-nowrap pr-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Objetivo:
          </div>
          {GOALS.map((g) => (
            <button
              key={g}
              onClick={() => setGoal(g)}
              className={cn(
                "px-3.5 py-1.5 rounded-full font-medium text-xs whitespace-nowrap transition-smooth border",
                goal === g
                  ? "bg-secondary text-secondary-foreground border-transparent shadow-sm"
                  : "bg-transparent text-muted-foreground border-border hover:border-secondary/50 hover:text-foreground"
              )}
            >
              {GOAL_LABELS[g]}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground bg-muted/30 rounded-2xl">
          <p className="text-5xl mb-3">🔍</p>
          <p className="text-lg font-semibold">Nenhuma marmita encontrada</p>
          <p className="text-sm">Tente ajustar os filtros ou a busca</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((p) => {
            const isSelected = selectedIds?.has(p.id) ?? false;
            return (
              <ProductCard
                key={p.id}
                product={p}
                onAdd={onAdd}
                selectable={selectionMode}
                selected={isSelected}
                onToggleSelect={onToggleSelect}
                disabled={selectionMode && selectionFull && !isSelected}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};
