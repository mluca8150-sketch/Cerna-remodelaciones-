import React from 'react';
import { Star, Phone, ShieldCheck, Award, MessageCircle } from 'lucide-react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section 
      id="inicio" 
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 bg-warm overflow-hidden"
    >
      {/* Decorative Blur Spots to evoke organic sunlight/depth */}
      <div className="absolute top-1/4 left-5 w-72 h-72 bg-olive-pale/30 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-5 w-96 h-96 bg-olive/5 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text and Actions (7 Cols to maintain balance) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left" id="hero-text-pane">
            
            {/* Elegant Trust Badge */}
            <div className="inline-flex self-start items-center gap-2 px-4 py-2 rounded-full bg-white border border-olive/10 shadow-organic mb-6 animate-fade-in">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-olive opacity-50"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-olive"></span>
              </span>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-walnut">
                <span className="text-yellow-600 font-extrabold font-mono">★★★★★</span>
                <span>5.0 (36 Reseñas reales en Google Maps)</span>
              </div>
            </div>

            {/* Serif Heading */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-walnut leading-[1.12] tracking-tight mb-6">
              Transformamos su hogar con <br />
              <span className="italic text-olive font-serif">calidad</span>, prolijidad <br className="hidden sm:inline" />
              y responsabilidad.
            </h1>

            {/* Subtext */}
            <p className="text-md sm:text-lg text-walnut-light leading-relaxed mb-8 max-w-2xl">
              En <span className="text-walnut font-bold">CERNA Remodelaciones</span> reciclamos cocinas, baños y departamentos completos en CABA. Coordinación profesional a cargo de <span className="text-olive font-semibold">Leonardo</span>, garantizando presupuestos justos, plazos firmes y asesoramiento experto sin cargo.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <button
                onClick={() => onNavigate('cotizador')}
                className="px-8 py-4 bg-olive hover:bg-olive-dark text-white font-bold text-base rounded-full transition-all shadow-md hover:shadow-olive/20 text-center cursor-pointer"
              >
                Calcular Presupuesto Online
              </button>
              <a
                href="https://wa.me/5491125180072?text=Hola%20Leonardo,%20vi%20su%20web%20y%20me%20gustar%C3%ADa%20consultar%20por%20una%20remodelaci%C3%B3n"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white hover:bg-olive-pale text-walnut border border-olive/20 font-bold text-base rounded-full transition-all flex items-center justify-center gap-3.5 shadow-sm"
              >
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                <span>Chateá con Leo</span>
              </a>
            </div>

            {/* Localized Pillars (Re-themed boxes with soft organic card shadow) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-olive/10 max-w-2xl">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-olive/5 shadow-organic hover:border-olive/10 transition-colors">
                <h3 className="text-sm font-bold text-olive">Presupuestos Justos</h3>
                <p className="text-xs text-walnut-light mt-1">Materiales con el mejor precio del mercado.</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-olive/5 shadow-organic hover:border-olive/10 transition-colors">
                <h3 className="text-sm font-bold text-olive">Trabajo Prolijo</h3>
                <p className="text-xs text-walnut-light mt-1">Especialistas en cocinas y terminaciones finas.</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-olive/5 shadow-organic hover:border-olive/10 transition-colors">
                <h3 className="text-sm font-bold text-olive">Trato Directo</h3>
                <p className="text-xs text-walnut-light mt-1">Leonardo lidera su obra sin intermediarios.</p>
              </div>
            </div>

          </div>

          {/* Right Column: Stunning Framed Picture and Stickers (5 Cols) */}
          <div className="lg:col-span-5 relative w-full h-full min-h-[420px] lg:block" id="hero-image-pane">
            <div className="relative h-full w-full bg-stone-100 rounded-[30px] sm:rounded-[40px] overflow-hidden border-8 border-white shadow-organic-lg aspect-4/3 lg:aspect-auto lg:min-h-[500px]">
              
              <img
                src="/src/assets/images/hero_remodel_1781879639513.jpg"
                alt="Proyecto Cerna Palermo"
                className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Tint overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-walnut-dark/40 via-transparent to-transparent pointer-events-none" />

              {/* Top-Right Sticker: 100% Pactado rotate */}
              <div className="absolute top-4 right-4 animate-bounce duration-5000">
                <div className="bg-olive text-white p-3 rounded-full w-20 h-20 flex flex-col items-center justify-center text-center shadow-lg transform rotate-12 border border-white/20">
                  <span className="text-xs font-extrabold leading-none">100%</span>
                  <span className="text-[9px] uppercase tracking-widest leading-tight mt-0.5">Pactado</span>
                </div>
              </div>

              {/* Bottom Framed Glass Testimonial snippet */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-walnut/70 backdrop-blur-md p-5 rounded-2xl border border-white/10 text-white">
                  <p className="italic mb-3 serif text-sm select-none leading-relaxed">
                    "Leo realiza un trabajo muy prolijo, de calidad y con precios justos. Muy recomendable prolijidad."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-olive-light/50 flex items-center justify-center font-bold text-xs">
                      H
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-none">Héctor 'Tito' Dubon</p>
                      <p className="text-[10px] opacity-70 mt-0.5 leading-none">Local Guide · 330 reseñas</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
