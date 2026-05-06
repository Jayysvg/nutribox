import { ShoppingBag, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const Header = ({ cartCount, onOpenCart }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-2.5">
          
          <div className="flex items-center gap-3">
            <img 
                src="/images/logo.png" 
                alt="NutriBox" 
                className="h-20 md:h-20 object-contain"
              />
          </div>
        </div>

        <Button onClick={onOpenCart} variant="default" size="lg" className="relative gap-2 rounded-full shadow-soft">
          <ShoppingBag className="w-4 h-4" />
          <span className="hidden sm:inline">Carrinho</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center animate-pop-in">
              {cartCount}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
};
