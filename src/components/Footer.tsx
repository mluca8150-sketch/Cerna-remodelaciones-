import React from 'react';
import { Hammer, Star, MapPin, Phone, Clock, MessageSquare } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer id="site-footer" className="bg-walnut text-white pt-16 pb-8 border-t border-olive/25 relative overflow-hidden">
      
      {/* Tiny overlay flair */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-olive-pale/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-olive/15">
          
          {/* Logo & Intro column (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div 
              onClick={() => onNavigate('inicio')} 
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-9 h-9 bg-olive rounded-xl flex items-center justify-center text-white font-bold shadow-md shadow-olive/20">
                <Hammer className="w-5 h-5" />
              </div>
              <div>
                <span className="font-display font-semibold text-lg tracking-tight text-white block">
                  CERNA
                </span>
                <span className="text-[9px] uppercase tracking-widest text-olive-pale -mt-0.5 block font-mono font-medium">
                  Remodelaciones
                </span>
              </div>
            </div>

            <p className="text-olive-light text-xs sm:text-sm leading-relaxed">
              Reformamos su hogar con la precisión y el estilo que merece. Desde la renovación completa de cocinas y baños hasta el reciclado general de departamentos antiguos en la Ciudad Autónoma de Buenos Aires.
            </p>

            {/* Google Rating */}
            <div className="flex items-center gap-2 pt-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-white">5.0 Estrellas</span>
              <span className="text-olive-light text-xs">• 36 Reseñas Google</span>
            </div>
          </div>

          {/* Quick Links Column (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-olive-pale mb-6 block">
              Secciones
            </h4>
            <ul className="space-y-2.5 text-sm" id="footer-menu-links">
              {[
                { label: 'Inicio', id: 'inicio' },
                { label: 'Nuestros Servicios', id: 'servicios' },
                { label: 'Cotizador de Obras', id: 'cotizador' },
                { label: 'La diferencia CERNA', id: 'nosotros' },
                { label: 'Reseñas de Clientes', id: 'reseñas' },
                { label: 'Contacto / Turnos', id: 'contacto' }
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="text-olive-light hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Operation specifications CABA column (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-olive-pale mb-6 block">
              Oficina y Base Técnica
            </h4>
            
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-olive shrink-0 mt-0.5" />
                <address className="text-olive-light not-italic leading-relaxed">
                  Av. Córdoba 5311, Palermo,<br />
                  C1414 Cdad. Autónoma de Buenos Aires, Argentina.
                </address>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-olive shrink-0" />
                <a href="tel:01125180072" className="text-olive-light hover:text-white transition-colors">
                  011 2518-0072
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-olive shrink-0 mt-0.5" />
                <div>
                  <span className="text-olive-light block">Lunes a Viernes: 8:00 a 18:00 hs</span>
                  <span className="text-olive-light/70 text-xs mt-0.5 block">Sábados: 8:00 a 13:00 hs (Visitas técnicas)</span>
                </div>
              </div>
            </div>
            
            <div className="pt-4 flex items-center gap-2">
              <a 
                href="https://wa.me/5491125180072" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 py-2 px-4 bg-walnut-light/40 border border-olive/12 rounded-xl hover:bg-walnut/70 transition-colors text-xs font-semibold text-white"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Contactar a Leonardo</span>
              </a>
            </div>
          </div>

        </div>

        {/* Legal copy and attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-olive-light/70 gap-4" id="footer-bottom-tier">
          <p>© 2026 CERNA Remodelaciones. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <span className="text-[10px] uppercase tracking-wider text-olive-pale font-mono font-bold">
              Calidad • Prolijidad • Compromiso
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
