import { Leaf, Snowflake, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-marmitas.jpg";

export const Hero = () => (
  <section className="relative overflow-hidden gradient-hero text-primary-foreground">
    {/* Decorative background */}
    <div
      className="absolute inset-0 opacity-[0.07] pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    />
    <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />
    <div className="absolute -bottom-40 -right-20 w-[28rem] h-[28rem] rounded-full bg-accent/20 blur-3xl pointer-events-none" />

    <div className="container relative py-14 md:py-20 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
      {/* Copy */}
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-foreground/15 backdrop-blur text-xs font-semibold uppercase tracking-wider mb-5 border border-primary-foreground/20">
          <Snowflake className="w-3.5 h-3.5" />
          Frescor congelado · Pronto em 6 min
        </span>
        <h2 className="font-display font-extrabold text-4xl md:text-6xl leading-[1.02] tracking-tight mb-5">
          Monte sua semana de refeições <span className="text-secondary">saudáveis</span> em minutos.
        </h2>
        <p className="text-lg md:text-xl text-primary-foreground/85 mb-8 max-w-xl leading-relaxed">
          Praticidade, sabor e economia — tudo no seu controle. Marmitas balanceadas, sem conservantes, com até <span className="font-bold text-secondary">15% OFF</span> nos kits.
        </p>

        <div className="flex flex-wrap items-center gap-3 mb-8">
          <Button
            size="lg"
            asChild
            className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-elevated h-12 px-7 font-bold"
          >
            <a href="#cardapio">Montar meu kit</a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="rounded-full bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground h-12 px-6"
          >
            <a href="#cardapio">Ver cardápio</a>
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
              ))}
            </div>
            <span className="font-semibold">4.9</span>
            <span className="text-primary-foreground/70">· +12 mil clientes</span>
          </div>
          <Feature icon={<Leaf className="w-4 h-4" />} text="Sem conservantes" />
          <Feature icon={<Truck className="w-4 h-4" />} text="Entrega refrigerada" />
        </div>
      </div>

      {/* Visual */}
      <div className="relative hidden lg:block">
        <div className="absolute -inset-4 bg-secondary/30 rounded-[2rem] blur-2xl" />
        <div className="relative rounded-[2rem] overflow-hidden shadow-elevated border-4 border-primary-foreground/10 rotate-2 hover:rotate-0 transition-smooth">
          <img
            src={heroImage}
            alt="Marmitas saudáveis variadas: frango grelhado, salmão e pratos vegetarianos"
            width={1280}
            height={1024}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Floating cards */}
        <div className="absolute -bottom-5 -left-5 bg-card text-foreground rounded-2xl shadow-elevated px-4 py-3 flex items-center gap-3 animate-pop-in">
          <div className="w-10 h-10 rounded-full gradient-warm flex items-center justify-center">
            <Star className="w-5 h-5 text-accent-foreground fill-accent-foreground" />
          </div>
          <div>
            <p className="font-display font-extrabold text-sm leading-none">+15% OFF</p>
            <p className="text-xs text-muted-foreground">no Kit Família</p>
          </div>
        </div>
        <div className="absolute -top-4 -right-4 bg-card text-foreground rounded-2xl shadow-elevated px-4 py-3 flex items-center gap-3 animate-pop-in">
          <div className="w-10 h-10 rounded-full bg-success/15 flex items-center justify-center">
            <Truck className="w-5 h-5 text-success" />
          </div>
          <div>
            <p className="font-display font-extrabold text-sm leading-none">Entrega amanhã</p>
            <p className="text-xs text-muted-foreground">em até 24h</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Feature = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-foreground/10 backdrop-blur border border-primary-foreground/20">
    {icon}
    <span className="font-medium">{text}</span>
  </div>
);
