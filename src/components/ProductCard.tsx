import { Check, Plus } from "lucide-react";
import { Product } from "@/types";
import { formatBRL } from "@/lib/pricing";
import { CATEGORY_LABELS } from "@/data/products";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onAdd: (p: Product) => void;
  selectable?: boolean;
  selected?: boolean;
  onToggleSelect?: (p: Product) => void;
  disabled?: boolean;
}

export const ProductCard = ({
  product, onAdd, selectable, selected, onToggleSelect, disabled,
}: ProductCardProps) => {
  const handleClick = () => {
    if (selectable) onToggleSelect?.(product);
    else onAdd(product);
  };

  return (
    <article
      className={cn(
        "group relative bg-card rounded-[var(--radius)] border-2 p-5 transition-smooth cursor-pointer overflow-hidden",
        selected
          ? "border-primary shadow-glow scale-[1.02]"
          : "border-border hover:border-primary/40 hover:shadow-soft hover:-translate-y-0.5",
        disabled && !selected && "opacity-50 cursor-not-allowed pointer-events-none"
      )}
      onClick={handleClick}
    >
      {selected && (
        <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center animate-pop-in z-10">
          <Check className="w-4 h-4" strokeWidth={3} />
        </div>
      )}

      <div className="flex items-start justify-between mb-3">
        <div className="text-5xl group-hover:scale-110 transition-smooth">{product.emoji}</div>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-muted text-muted-foreground">
          {CATEGORY_LABELS[product.category]}
        </span>
      </div>

      <h3 className="font-display font-bold text-base leading-tight mb-1.5">{product.name}</h3>
      <p className="text-xs text-muted-foreground mb-4 line-clamp-2 min-h-[32px]">
        {product.description}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{product.calories} kcal</p>
          <p className="font-display font-extrabold text-lg text-primary leading-none mt-0.5">
            {formatBRL(product.price)}
          </p>
        </div>
        {!selectable && (
          <button
            onClick={(e) => { e.stopPropagation(); onAdd(product); }}
            className="w-9 h-9 rounded-full gradient-primary text-primary-foreground flex items-center justify-center shadow-soft hover:scale-110 transition-smooth"
            aria-label="Adicionar ao carrinho"
          >
            <Plus className="w-4 h-4" strokeWidth={3} />
          </button>
        )}
      </div>
    </article>
  );
};
