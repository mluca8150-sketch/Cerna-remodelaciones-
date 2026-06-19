import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Estimator from './components/Estimator';
import About from './components/About';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { MessageCircle, X, Check, Star } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [selectedInitialType, setSelectedInitialType] = useState<string>('');
  
  // State for estimate loaded to form
  const [activeEstimate, setActiveEstimate] = useState<{
    projectType: string;
    area: number;
    quality: string;
    totalUSD: number;
  } | null>(null);

  // WhatsApp Floating Badge State
  const [showWaWidget, setShowWaWidget] = useState(false);

  // Navigate to particular structural ID smoothly
  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Handle click on a service card to transition to estimator
  const handleSelectServiceForEstimate = (projId: string) => {
    setSelectedInitialType(projId);
    handleNavigate('cotizador');
  };

  // Handle transfer estimator data to contact inputs
  const handleSendEstimateToContact = (estimate: {
    projectType: string;
    area: number;
    quality: string;
    totalUSD: number;
  }) => {
    setActiveEstimate(estimate);
    handleNavigate('contacto');
  };

  const handleClearEstimate = () => {
    setActiveEstimate(null);
  };

  // Auto detect viewport active section using scroll positions
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'servicios', 'cotizador', 'nosotros', 'reseñas', 'contacto'];
      const scrollPosition = window.scrollY + 180; // offset navbar height

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }

      // Show/Hide Floating WhatsApp bubble after scrolling a bit
      if (window.scrollY > 400) {
        setShowWaWidget(true);
      } else {
        setShowWaWidget(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-warm font-sans selection:bg-olive selection:text-white text-walnut antialiased overflow-x-hidden">
      
      {/* 1. Header / Navigation */}
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

      {/* 2. Hero Presentation */}
      <Hero onNavigate={handleNavigate} />

      {/* 3. Core Remodeling Offerings */}
      <Services onSelectProject={handleSelectServiceForEstimate} />

      {/* 4. Interactive Argentine Budget Calculator Tool */}
      <Estimator 
        initialProjectType={selectedInitialType} 
        onSendEstimateToContact={handleSendEstimateToContact} 
      />

      {/* 5. Values & Team Spotlight with Leonardo */}
      <About />

      {/* 6. True Customer Google Reviews Showcase with filtering */}
      <Reviews />

      {/* 7. Strategic Contact Inquiry Form */}
      <Contact 
        initialEstimateData={activeEstimate} 
        onClearEstimate={handleClearEstimate} 
      />

      {/* 8. Footer component with base info */}
      <Footer onNavigate={handleNavigate} />

      {/* Modern Floating Call To Action Widget (WhatsApp Quick-Link) */}
      <div 
        id="floating-wa-widget"
        className={`fixed bottom-6 right-6 z-40 transition-all duration-300 transform ${
          showWaWidget ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'
        }`}
      >
        <a
          href="https://wa.me/5491125180072?text=Hola%20Leonardo,%20vi%20su%20web%20y%20me%20gustar%C3%ADa%20consultar%20por%20una%20remodelaci%C3%B3n"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-4.5 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full shadow-2xl hover:scale-105 transition-all group"
          id="wa-float-link"
        >
          <div className="relative">
            <MessageCircle className="w-6.5 h-6.5 fill-white/10" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full" />
          </div>
          <div className="text-left hidden sm:block">
            <span className="text-[10px] text-neutral-200 font-medium block uppercase leading-none font-mono">Conversar con Leo</span>
            <span className="text-sm font-bold block leading-tight">Online • Consulta Gratis</span>
          </div>
        </a>
      </div>

    </div>
  );
}
