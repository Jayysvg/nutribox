import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PRODUCTS, CATEGORY_LABELS } from "@/data/products";
import { Product } from "@/types";
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

export const ProductList = ({
  onAdd, selectionMode, selectedIds, onToggleSelect, selectionFull,
}: ProductListProps) => {
  const [category, setCategory] = useState<string>("todos");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat = category === "todos" || p.category === category;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [category, search]);

  return (
    <section id="cardapio" className="container py-12 md:py-16">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Cardápio</p>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight">
            Escolha sua marmita favorita
          </h2>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-11 rounded-full bg-muted border-transparent focus-visible:bg-card"
          />
        </div>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={cn(
              "px-5 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-smooth border-2",
              category === cat
                ? "gradient-primary text-primary-foreground border-transparent shadow-soft"
                : "bg-card text-foreground border-border hover:border-primary/40"
            )}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">Nenhuma marmita encontrada 🔍</p>
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
