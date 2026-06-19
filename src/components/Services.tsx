import React, { useState } from 'react';
import { servicesData } from '../data';
import { Clock, Check, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';

interface ServicesProps {
  onSelectProject: (projectType: string) => void;
}

export default function Services({ onSelectProject }: ServicesProps) {
  const [activeTab, setActiveTab] = useState(servicesData[0].id);

  const selectedService = servicesData.find(item => item.id === activeTab) || servicesData[0];

  return (
    <section id="servicios" className="py-24 bg-white border-t border-olive/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full bg-olive/10 text-olive text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Nuestras Soluciones
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-walnut tracking-tight">
            Reformas Integrales de Alta Calidad
          </h2>
          <p className="mt-4 text-base sm:text-lg text-walnut-light">
            Trabajamos con materiales seleccionados y personal propio calificado para asegurar terminaciones de excelencia, plazos firmes y una prolijidad insuperable.
          </p>
        </div>

        {/* Tab Buttons for Desktop */}
        <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-2 mb-12 max-w-4xl mx-auto" id="services-tabs">
          {servicesData.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveTab(service.id)}
              className={`flex-1 px-5 py-4 rounded-full font-bold text-sm transition-all text-center flex items-center justify-center gap-2 border cursor-pointer ${
                activeTab === service.id
                  ? 'bg-olive text-white border-olive shadow-organic'
                  : 'bg-warm hover:bg-olive-pale text-walnut-light border-olive/10 hover:border-olive/20'
              }`}
            >
              <span>{service.title}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Showcase */}
        <div 
          className="bg-white rounded-3xl border border-olive/15 overflow-hidden shadow-organic-lg transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0"
          id="service-showcase-panel"
        >
          {/* Visual Showcase (6 Cols) */}
          <div className="lg:col-span-6 relative aspect-16/10 lg:aspect-auto min-h-[350px] lg:min-h-[480px]">
            <img
              src={selectedService.image}
              alt={selectedService.title}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500 hover:scale-101"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-warm/80 via-transparent to-transparent lg:hidden" />
          </div>

          {/* Details Panel (6 Cols) */}
          <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between">
            <div>
              {/* Duration Info and Title */}
              <div className="flex items-center gap-2 text-olive font-semibold text-sm mb-3">
                <Clock className="w-4 h-4" />
                <span>Tiempo de ejecución aproximado: {selectedService.durationWeeksRange}</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-walnut mb-4">
                {selectedService.title}
              </h3>
              <p className="text-walnut-light text-base leading-relaxed mb-8">
                {selectedService.longDescription}
              </p>

              {/* Highlights Bullet List */}
              <h4 className="text-xs font-bold uppercase tracking-wider text-walnut-light mb-4 font-mono">
                ¿Qué incluye nuestro servicio?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                {selectedService.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-olive/10 text-olive flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-walnut text-sm">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA action tailored code */}
            <div className="pt-6 border-t border-olive/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-walnut-light">Garantía certificada por escrito de mano de obra</p>
                <p className="text-sm font-semibold text-walnut mt-0.5">Asesoramiento comercial premium</p>
              </div>
              <button
                onClick={() => onSelectProject(selectedService.id.replace('srv-', ''))}
                className="px-6 py-3 bg-olive hover:bg-olive-dark text-white font-bold text-sm rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-olive/10"
              >
                <span>Cotizar Proyecto</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Added Value: material guidelines block with Leonardo */}
        <div className="mt-12 bg-olive-pale/60 rounded-2xl border border-olive/10 p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-olive/10 text-olive flex items-center justify-center shrink-0 border border-olive/20 shadow-xs">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-walnut">¿No sabe dónde comprar los cerámicos o griferías?</h4>
              <p className="text-sm text-walnut-light mt-1">
                Lo acompañamos. Leonardo conoce de primera mano los mejores comercios con precios mayoristas en Buenos Aires. Ahorre hasta un 30% en materiales.
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <span className="text-xs text-olive font-mono font-bold italic">¡Asesoría 100% gratuita!</span>
          </div>
        </div>

      </div>
    </section>
  );
}
