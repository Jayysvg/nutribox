import { Package, Sparkles, X, Check } from "lucide-react";
import { Kit } from "@/types";
import { KITS } from "@/data/products";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface KitSelectorProps {
  activeKit: Kit | null;
  selectedCount: number;
  onSelectKit: (kit: Kit | null) => void;
}

export const KitSelector = ({ activeKit, selectedCount, onSelectKit }: KitSelectorProps) => {
  const step = !activeKit ? 1 : selectedCount === activeKit.size ? 3 : 2;

  return (
    <section className="container py-10 md:py-14">
      <div className="relative bg-card rounded-3xl border border-border p-6 md:p-8 shadow-soft overflow-hidden">
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

        {/* Header + steps */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 relative">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl gradient-warm flex items-center justify-center flex-shrink-0 shadow-soft">
              <Sparkles className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-secondary-foreground mb-1">
                Economize até 15%
              </p>
              <h2 className="font-display font-extrabold text-xl md:text-2xl tracking-tight">
                Monte seu kit em 3 passos
              </h2>
            </div>
          </div>

          {activeKit && (
            <button
              onClick={() => onSelectKit(null)}
              className="self-start md:self-auto inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-destructive transition-smooth px-3 py-1.5 rounded-full border border-border hover:border-destructive/40"
            >
              <X className="w-3.5 h-3.5" />
              Cancelar kit
            </button>
          )}
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-2 mb-7 text-xs font-semibold">
          <Step n={1} label="Tamanho" active={step >= 1} done={step > 1} />
          <Connector done={step > 1} />
          <Step n={2} label="Marmitas" active={step >= 2} done={step > 2} />
          <Connector done={step > 2} />
          <Step n={3} label="Finalizar" active={step >= 3} done={false} />
        </div>

        {/* Step 1: kits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
          {KITS.map((kit) => {
            const isActive = activeKit?.size === kit.size;
            return (
              <button
                key={kit.size}
                onClick={() => onSelectKit(isActive ? null : kit)}
                className={cn(
                  "relative text-left p-5 rounded-2xl border-2 transition-smooth overflow-hidden group",
                  isActive
                    ? "border-primary gradient-primary text-primary-foreground shadow-glow scale-[1.02]"
                    : "border-border bg-background hover:border-primary/40 hover:-translate-y-1 hover:shadow-soft"
                )}
              >
                {kit.size === 10 && !isActive && (
                  <span className="absolute top-3 right-3 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent text-accent-foreground">
                    Mais economia
                  </span>
                )}
                <div className="flex items-center justify-between mb-3">
                  <Package className={cn("w-6 h-6", isActive ? "text-primary-foreground" : "text-primary")} />
                  <span className={cn(
                    "text-xs font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full",
                    isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-secondary text-secondary-foreground"
                  )}>
                    -{Math.round(kit.discount * 100)}%
                  </span>
                </div>
                <p className="font-display font-extrabold text-2xl leading-none mb-1">
                  {kit.size} marmitas
                </p>
                <p className={cn("text-sm font-semibold", isActive ? "text-primary-foreground/95" : "text-foreground")}>
                  {kit.label}
                </p>
                <p className={cn("text-xs mt-1", isActive ? "text-primary-foreground/75" : "text-muted-foreground")}>
                  {kit.tagline}
                </p>
              </button>
            );
          })}
        </div>

        {/* Step 2 progress */}
        {activeKit && (
          <div className="mt-6 p-4 rounded-2xl bg-primary/5 border border-primary/15 animate-slide-up">
            <div className="flex items-center justify-between mb-2 text-sm">
              <span className="font-semibold">
                <span className="font-display font-extrabold text-primary">{selectedCount}</span>
                <span className="text-muted-foreground"> / {activeKit.size} marmitas selecionadas</span>
              </span>
              {selectedCount === activeKit.size && (
                <span className="inline-flex items-center gap-1 text-success font-bold text-xs">
                  <Check className="w-3.5 h-3.5" /> Kit completo!
                </span>
              )}
            </div>
            <Progress value={(selectedCount / activeKit.size) * 100} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              👇 Role até o cardápio e toque nas marmitas para adicionar ao kit.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

const Step = ({ n, label, active, done }: { n: number; label: string; active: boolean; done: boolean }) => (
  <div className="flex items-center gap-2">
    <div className={cn(
      "w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-extrabold transition-smooth",
      done ? "bg-success text-success-foreground"
        : active ? "gradient-primary text-primary-foreground shadow-soft"
        : "bg-muted text-muted-foreground"
    )}>
      {done ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : n}
    </div>
    <span className={cn(active ? "text-foreground" : "text-muted-foreground")}>
      {label}
    </span>
  </div>
);

const Connector = ({ done }: { done: boolean }) => (
  <div className={cn("flex-1 h-0.5 rounded-full transition-smooth", done ? "bg-success" : "bg-border")} />
);
