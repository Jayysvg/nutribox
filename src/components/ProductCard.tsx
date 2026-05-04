import { Flame, Plus, Star, Check, Trophy } from "lucide-react";
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

const CATEGORY_BADGE: Record<string, string> = {
  fitness: "bg-primary/10 text-primary border-primary/20",
  tradicional: "bg-accent/10 text-accent border-accent/20",
  vegetariano: "bg-success/10 text-success border-success/20",
  lowcarb: "bg-secondary/15 text-secondary-foreground border-secondary/30",
};

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
        "group relative bg-card rounded-2xl border p-5 transition-smooth cursor-pointer overflow-hidden flex flex-col",
        selected
          ? "border-primary border-2 shadow-glow scale-[1.02] ring-4 ring-primary/10"
          : "border-border hover:border-primary/30 hover:shadow-elevated hover:-translate-y-1",
        disabled && !selected && "opacity-40 cursor-not-allowed pointer-events-none"
      )}
      onClick={handleClick}
    >
      {/* Selected check */}
      {selected && (
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center animate-pop-in z-10 shadow-soft">
          <Check className="w-4 h-4" strokeWidth={3} />
        </div>
      )}

      {/* Popular badge */}
      {product.popular && !selected && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-accent to-secondary text-accent-foreground text-[10px] font-extrabold uppercase tracking-wider shadow-soft">
          <Trophy className="w-3 h-3" /> Mais pedido
        </div>
      )}

      {/* Visual */}
      <div className="relative h-28 rounded-xl bg-gradient-to-br from-muted to-muted/40 mb-4 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: "radial-gradient(circle at 30% 30%, hsl(var(--primary) / 0.15), transparent 50%)",
        }} />
        <span className="text-6xl group-hover:scale-110 transition-smooth drop-shadow-lg">{product.emoji}</span>
        <span className={cn(
          "absolute bottom-2 left-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border backdrop-blur",
          CATEGORY_BADGE[product.category]
        )}>
          {CATEGORY_LABELS[product.category]}
        </span>
      </div>

      {/* Title + rating */}
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <h3 className="font-display font-bold text-base leading-tight flex-1">{product.name}</h3>
      </div>

      <div className="flex items-center gap-2 mb-2 text-xs">
        <div className="flex items-center gap-0.5 text-accent">
          <Star className="w-3.5 h-3.5 fill-accent" />
          <span className="font-bold text-foreground">{product.rating}</span>
        </div>
        <span className="text-muted-foreground">({product.reviews})</span>
        <span className="text-muted-foreground">·</span>
        <span className="flex items-center gap-1 text-muted-foreground font-medium">
          <Flame className="w-3 h-3 text-accent" /> {product.calories} kcal
        </span>
      </div>

      <p className="text-xs text-muted-foreground mb-4 line-clamp-2 min-h-[32px] flex-1">
        {product.description}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
            {product.protein}g proteína
          </p>
          <p className="font-display font-extrabold text-xl text-primary leading-none mt-0.5">
            {formatBRL(product.price)}
          </p>
        </div>
        {!selectable && (
          <button
            onClick={(e) => { e.stopPropagation(); onAdd(product); }}
            className="w-10 h-10 rounded-full gradient-primary text-primary-foreground flex items-center justify-center shadow-soft hover:scale-110 hover:shadow-glow transition-smooth"
            aria-label="Adicionar ao carrinho"
          >
            <Plus className="w-5 h-5" strokeWidth={3} />
          </button>
        )}
      </div>
    </article>
  );
};
