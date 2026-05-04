import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductList } from "@/components/ProductList";
import { KitSelector } from "@/components/KitSelector";
import { KitBar } from "@/components/KitBar";
import { Cart } from "@/components/Cart";
import { OrderSummary } from "@/components/OrderSummary";
import { useCart } from "@/hooks/useCart";
import { CartItem, Kit, Product } from "@/types";
import { totalKitItems } from "@/lib/pricing";
import { toast } from "sonner";

const Index = () => {
  const cart = useCart();
  const [activeKit, setActiveKit] = useState<Kit | null>(null);
  const [kitSelection, setKitSelection] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const selectedIds = useMemo(
    () => new Set(kitSelection.map((i) => i.product.id)),
    [kitSelection]
  );
  const selectedCount = totalKitItems(kitSelection);

  // Toggle product in/out of kit selection. Each product = 1 unit.
  const handleToggleSelect = (product: Product) => {
    if (!activeKit) return;
    const exists = kitSelection.find((i) => i.product.id === product.id);
    if (exists) {
      setKitSelection((prev) => prev.filter((i) => i.product.id !== product.id));
    } else {
      if (selectedCount >= activeKit.size) {
        toast.error(`Limite atingido! O kit comporta apenas ${activeKit.size} marmitas.`);
        return;
      }
      setKitSelection((prev) => [...prev, { product, quantity: 1 }]);
    }
  };

  const handleSelectKit = (kit: Kit | null) => {
    setActiveKit(kit);
    setKitSelection([]);
  };

  const handleConfirmKit = () => {
    cart.addMany(kitSelection);
    toast.success(`Kit adicionado ao carrinho! ${Math.round((activeKit?.discount ?? 0) * 100)}% de desconto aplicado.`);
    setActiveKit(null);
    setKitSelection([]);
  };

  const handleCheckout = () => {
    setCartOpen(false);
    setOrderSuccess(false);
    setSummaryOpen(true);
  };

  const handleConfirmOrder = () => {
    setOrderSuccess(true);
    setTimeout(() => {
      cart.clear();
    }, 300);
  };

  const cartCount = cart.items.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className={activeKit ? "pb-28" : ""}>
      <Header cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />
      <main>
        <Hero />
        <KitSelector
          activeKit={activeKit}
          selectedCount={selectedCount}
          onSelectKit={handleSelectKit}
        />
        <ProductList
          onAdd={(p) => {
            cart.addItem(p);
            toast.success(`${p.name} adicionado!`);
          }}
          selectionMode={!!activeKit}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          selectionFull={activeKit ? selectedCount >= activeKit.size : false}
        />
      </main>

      {activeKit && (
        <KitBar
          kit={activeKit}
          selected={kitSelection}
          selectedCount={selectedCount}
          onConfirm={handleConfirmKit}
        />
      )}

      <Cart
        open={cartOpen}
        onOpenChange={setCartOpen}
        items={cart.items}
        onUpdateQty={cart.updateQty}
        onRemove={cart.removeItem}
        onCheckout={handleCheckout}
      />

      <OrderSummary
        open={summaryOpen}
        onOpenChange={(o) => {
          setSummaryOpen(o);
          if (!o) setOrderSuccess(false);
        }}
        items={cart.items}
        onConfirm={handleConfirmOrder}
        success={orderSuccess}
      />

      <footer className="border-t border-border py-8 mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          <p className="font-display font-bold text-foreground mb-1">MarmitaFit 🥗</p>
          <p>Comida saudável, prática e saborosa. Feito com 💚</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
