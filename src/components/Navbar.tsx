import React, { useState, useEffect } from 'react';
import { Phone, Star, Menu, X, Hammer, MessageSquare } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Inicio', id: 'inicio' },
    { label: 'Servicios', id: 'servicios' },
    { label: 'Cotizador', id: 'cotizador' },
    { label: 'Nosotros', id: 'nosotros' },
    { label: 'Reseñas', id: 'reseñas' },
    { label: 'Contacto', id: 'contacto' },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav
      id="site-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-warm/95 backdrop-blur-md border-b border-olive/10 shadow-organic py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo and Brand Name */}
          <div 
            onClick={() => handleItemClick('inicio')} 
            className="flex items-center gap-2.5 cursor-pointer group"
            id="nav-logo"
          >
            <div className="w-10 h-10 bg-olive rounded-full flex items-center justify-center text-white font-bold shadow-md shadow-olive/10 group-hover:bg-olive-dark transition-colors">
              <Hammer className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="font-display font-bold text-xl tracking-tight text-walnut block">
                CERNA
              </span>
              <span className="text-[10px] uppercase tracking-widest text-olive -mt-1 block font-mono font-bold">
                Remodelaciones
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1" id="nav-desktop-menu">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleItemClick(item.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? 'text-olive bg-olive/10 font-semibold shadow-sm'
                    : 'text-walnut-light hover:text-walnut hover:bg-olive/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Call to Actions / Badges */}
          <div className="hidden lg:flex items-center gap-4" id="nav-desktop-actions">
            <a
              href="https://wa.me/5491125180072?text=Hola%20Leonardo,%20vi%20su%20web%20y%20me%20gustar%C3%ADa%20consultar%20por%20una%20remodelaci%C3%B3n"
              target="_blank"
              rel="noopener noreferrer"
              id="nav-whatsapp-btn"
              className="flex items-center gap-2 px-5 py-2.5 bg-olive hover:bg-olive-dark text-white font-semibold text-sm rounded-full transition-colors shadow-sm shadow-olive/10"
            >
              <Phone className="w-4 h-4" />
              <span>011 2518-0072</span>
            </a>

            <div className="flex items-center gap-1.5 bg-white border border-olive/10 px-3.5 py-2 rounded-full shadow-organic" id="nav-rating-badge">
              <Star className="w-4 h-4 text-amber-600 fill-amber-600" />
              <span className="text-walnut text-sm font-bold">5.0</span>
              <span className="text-walnut-light text-xs">(36 reseñas)</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3" id="nav-mobile-controls">
            <div className="flex items-center gap-1 bg-white border border-olive/10 px-2.5 py-1 rounded-full shadow-sm">
              <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
              <span className="text-walnut text-xs font-bold">5.0</span>
            </div>

            <button
              id="nav-toggle-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-white border border-olive/10 hover:bg-olive-pale text-walnut transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay & Content */}
      <div
        id="nav-mobile-overlay"
        className={`fixed inset-0 top-[60px] bg-warm/98 backdrop-blur-lg z-40 transition-all duration-300 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col p-6 gap-3" id="nav-mobile-menu">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              id={`nav-mob-link-${item.id}`}
              onClick={() => handleItemClick(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-lg font-bold transition-colors flex items-center justify-between ${
                activeSection === item.id
                  ? 'text-olive bg-olive/10'
                  : 'text-walnut-light hover:bg-olive/5 hover:text-walnut'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <span>{item.label}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-olive opacity-0 group-active:opacity-100"></span>
            </button>
          ))}

          <div className="mt-8 pt-6 border-t border-olive/10 flex flex-col gap-4">
            <a
              href="https://wa.me/5491125180072?text=Hola%20Leonardo,%20vi%20su%20web%20y%20me%20gustar%C3%ADa%20consultar%20por%20una%20remodelaci%C3%B3n"
              target="_blank"
              rel="noopener noreferrer"
              id="nav-whatsapp-btn-mobile"
              className="flex items-center justify-center gap-3 w-full py-4 bg-olive hover:bg-olive-dark text-white font-bold rounded-xl text-md transition-colors shadow-sm"
            >
              <Phone className="w-5 h-5" />
              <span>Contactá por WhatsApp</span>
            </a>

            <div className="flex items-center justify-center gap-2 text-walnut-light text-sm">
              <Star className="w-4 h-4 text-amber-600 fill-amber-600" />
              <span className="text-walnut font-bold">5.0 de calificación</span>
              <span>•</span>
              <span>36 reseñas en Google</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
