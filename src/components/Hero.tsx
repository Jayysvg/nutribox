import { Leaf, Truck, Zap } from "lucide-react";

export const Hero = () => (
  <section className="relative overflow-hidden gradient-hero text-primary-foreground">
    <div className="absolute inset-0 opacity-10" style={{
      backgroundImage: "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)",
      backgroundSize: "60px 60px",
    }} />
    <div className="container relative py-16 md:py-24">
      <div className="max-w-2xl">
        <span className="inline-block px-3 py-1 rounded-full bg-primary-foreground/15 backdrop-blur text-xs font-semibold uppercase tracking-wider mb-5">
          🥬 Frescor congelado · Pronto em 6 min
        </span>
        <h2 className="font-display font-extrabold text-4xl md:text-6xl leading-[1.05] tracking-tight mb-5">
          Comida de verdade, <span className="text-secondary">do seu jeito.</span>
        </h2>
        <p className="text-lg md:text-xl text-primary-foreground/85 mb-8 max-w-xl">
          Monte seu kit de marmitas congeladas e economize até 15%. Sem conservantes, com sabor de comida feita em casa.
        </p>
        <div className="flex flex-wrap gap-5 text-sm">
          <Feature icon={<Zap className="w-4 h-4" />} text="Pronto em minutos" />
          <Feature icon={<Leaf className="w-4 h-4" />} text="Ingredientes frescos" />
          <Feature icon={<Truck className="w-4 h-4" />} text="Entrega refrigerada" />
        </div>
      </div>
    </div>
  </section>
);

const Feature = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur border border-primary-foreground/20">
    {icon}
    <span className="font-medium">{text}</span>
  </div>
);
