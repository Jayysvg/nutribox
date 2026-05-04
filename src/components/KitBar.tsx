import { CheckCircle2 } from "lucide-react";
import { CartItem, Kit } from "@/types";
import { calcKitDiscount, calcSubtotal, formatBRL } from "@/lib/pricing";
import { Button } from "@/components/ui/button";

interface KitBarProps {
  kit: Kit;
  selected: CartItem[];
  selectedCount: number;
  onConfirm: () => void;
}

export const KitBar = ({ kit, selected, selectedCount, onConfirm }: KitBarProps) => {
  const subtotal = calcSubtotal(selected);
  const discount = calcKitDiscount(subtotal, kit);
  const total = subtotal - discount;
  const isComplete = selectedCount === kit.size;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-card/95 backdrop-blur-xl border-t-2 border-primary shadow-elevated animate-slide-up">
      <div className="container py-4 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative w-14 h-14 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
            <span className="font-display font-extrabold text-primary-foreground text-lg">
              {selectedCount}/{kit.size}
            </span>
          </div>
          <div className="min-w-0">
            <p className="font-display font-bold text-sm leading-tight">
              {kit.label} · {Math.round(kit.discount * 100)}% OFF
            </p>
            <p className="text-xs text-muted-foreground">
              {isComplete ? "Kit completo! Pronto para adicionar." : `Selecione mais ${kit.size - selectedCount} marmita(s)`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            {discount > 0 && (
              <p className="text-xs text-muted-foreground line-through">{formatBRL(subtotal)}</p>
            )}
            <p className="font-display font-extrabold text-xl text-primary leading-none">
              {formatBRL(total)}
            </p>
          </div>
          <Button
            onClick={onConfirm}
            disabled={!isComplete}
            size="lg"
            className="rounded-full gradient-primary shadow-soft gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            Adicionar Kit
          </Button>
        </div>
      </div>
    </div>
  );
};
