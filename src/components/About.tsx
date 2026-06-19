import React from 'react';
import { ShieldCheck, Coins, Award, Clock, Star, MapPin } from 'lucide-react';

export default function About() {
  const pillars = [
    {
      icon: <Coins className="w-6 h-6 text-olive" />,
      title: "Asesoría de Compra de Materiales",
      description: "No gaste de más. Leonardo conoce los mejores locales de griferías, cerámicas y corralones en CABA. Lo ayudamos a seleccionar materiales que maximicen el impacto visual dentro de su presupuesto."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-olive" />,
      title: "Puntualidad e Higiene Absoluta",
      description: "Sabemos lo molesto que es vivir en obra. Protegemos sus aberturas, muebles y pisos con film de alta resistencia, barremos y limpiamos todos los días, y cumplimos estrictamente con el cronograma pactado."
    },
    {
      icon: <Award className="w-6 h-6 text-olive" />,
      title: "Atención 100% Directa por Leonardo",
      description: "Trato directo con el constructor de su obra. Sin intermediarios molestos o agencias externas. Leonardo lidera los trabajos presencialmente, coordina el equipo técnico y responde ante cualquier requerimiento."
    },
    {
      icon: <Clock className="w-6 h-6 text-olive" />,
      title: "Cero Modificaciones Sorpresa",
      description: "El precio que pactamos en el contrato físico es el que se abona. Detallamos individualmente cada trabajo de albañilería o plomería para que tenga absoluta transparencia y tranquilidad."
    }
  ];

  return (
    <section id="nosotros" className="py-24 bg-warm text-walnut border-t border-olive/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Header / Intro layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full bg-olive/10 text-olive text-xs font-bold uppercase tracking-wider mb-4">
              <Star className="w-3.5 h-3.5" />
              La Diferencia CERNA
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-walnut leading-tight">
              Trabajo prolijo, trato cercano y honesto.
            </h2>
            <p className="mt-5 text-walnut-light text-base sm:text-md leading-relaxed">
              En <strong className="text-walnut font-bold">CERNA Remodelaciones</strong>, entendemos que una obra no es solo albañilería; es el espacio de su vida. Nos avala una calificación perfecta de <strong className="text-olive font-extrabold">5.0 estrellas sobre 36 testimonios reales</strong> en Buenos Aires.
            </p>
            <p className="mt-4 text-walnut-light text-sm">
              Con base en Palermo (Av. Córdoba 5311), brindamos soluciones integrales de remodelaciones llave en mano con enfoque en departamentos y hogares familiares que buscan durabilidad y una excelente relación precio/calidad.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-olive/10 text-sm text-walnut-light shadow-sm">
                <MapPin className="w-4 h-4 text-olive" />
                <span>Palermo / CABA</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-xl border border-olive/10 text-sm shadow-sm">
                <Star className="w-4 h-4 text-amber-600 fill-amber-600" />
                <span className="text-walnut font-bold">5.0 / 5.0</span>
                <span className="text-walnut-light text-xs">(36 opiniones)</span>
              </div>
            </div>
          </div>

          {/* Feature Badge Grid (6 Cols) */}
          <div className="lg:col-span-6 relative">
            <div className="absolute inset-0 bg-olive-pale/40 rounded-3xl blur-2xl pointer-events-none" />
            <div className="relative bg-white border border-olive/15 rounded-3xl p-6 sm:p-10 shadow-organic grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="text-center p-4 bg-olive-pale/60 rounded-2xl border border-olive/10">
                <span className="font-display text-4xl font-bold text-olive block">36</span>
                <span className="text-xs text-walnut-light mt-1 block">Reseñas de 5 estrellas</span>
              </div>

              <div className="text-center p-4 bg-olive-pale/60 rounded-2xl border border-olive/10">
                <span className="font-display text-4xl font-bold text-olive block">100%</span>
                <span className="text-xs text-walnut-light mt-1 block">Compromiso en Plazos</span>
              </div>

              <div className="text-center p-4 bg-olive-pale/60 rounded-2xl border border-olive/10">
                <span className="font-display text-4xl font-bold text-olive block">+15</span>
                <span className="text-xs text-walnut-light mt-1 block">Años en el Rubro</span>
              </div>

              <div className="text-center p-4 bg-olive-pale/60 rounded-2xl border border-olive/10">
                <span className="font-display text-4xl font-bold text-olive block">0</span>
                <span className="text-xs text-walnut-light mt-1 block">Sorpresas en Gastos</span>
              </div>

            </div>
          </div>

        </div>

        {/* Detailed Pillars List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="about-pillars-grid">
          {pillars.map((pillar, index) => (
            <div 
              key={index} 
              className="p-6 sm:p-8 bg-white border border-olive/12 rounded-2xl hover:border-olive/35 hover:shadow-organic-lg transition-all duration-300 flex items-start gap-5 group"
            >
              <div className="p-3 bg-olive-pale text-olive rounded-xl group-hover:scale-105 transition-transform shrink-0">
                {pillar.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-walnut mb-2">{pillar.title}</h3>
                <p className="text-walnut-light text-sm leading-relaxed">{pillar.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
