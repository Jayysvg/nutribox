import { Package, Sparkles, X } from "lucide-react";
import { Kit } from "@/types";
import { KITS } from "@/data/products";
import { cn } from "@/lib/utils";

interface KitSelectorProps {
  activeKit: Kit | null;
  selectedCount: number;
  onSelectKit: (kit: Kit | null) => void;
}

export const KitSelector = ({ activeKit, selectedCount, onSelectKit }: KitSelectorProps) => {
  return (
    <section className="container py-10">
      <div className="bg-card rounded-[calc(var(--radius)+4px)] border-2 border-border p-6 md:p-8 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl gradient-warm flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-xl md:text-2xl tracking-tight">
                Monte seu kit e economize
              </h2>
              <p className="text-sm text-muted-foreground">
                Escolha o tamanho, selecione as marmitas e ganhe desconto.
              </p>
            </div>
          </div>

          {activeKit && (
            <div className="flex items-center gap-3 bg-primary/5 rounded-full px-4 py-2 border border-primary/20">
              <span className="font-display font-bold text-primary">
                {selectedCount}/{activeKit.size}
              </span>
              <span className="text-xs text-muted-foreground">selecionadas</span>
              <button
                onClick={() => onSelectKit(null)}
                className="ml-2 text-muted-foreground hover:text-destructive transition-smooth"
                aria-label="Cancelar kit"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {KITS.map((kit) => {
            const isActive = activeKit?.size === kit.size;
            return (
              <button
                key={kit.size}
                onClick={() => onSelectKit(isActive ? null : kit)}
                className={cn(
                  "relative text-left p-5 rounded-2xl border-2 transition-smooth overflow-hidden",
                  isActive
                    ? "border-primary gradient-primary text-primary-foreground shadow-glow scale-[1.02]"
                    : "border-border bg-background hover:border-primary/40 hover:-translate-y-0.5"
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <Package className={cn("w-6 h-6", isActive ? "text-primary-foreground" : "text-primary")} />
                  <span className={cn(
                    "text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full",
                    isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-secondary text-secondary-foreground"
                  )}>
                    -{Math.round(kit.discount * 100)}%
                  </span>
                </div>
                <p className="font-display font-extrabold text-2xl leading-none mb-1">
                  {kit.size} marmitas
                </p>
                <p className={cn("text-sm", isActive ? "text-primary-foreground/85" : "text-muted-foreground")}>
                  {kit.label}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
