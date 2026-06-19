import React, { useState, useEffect } from 'react';
import { neighborhoodList } from '../data';
import { MessageSquare, Phone, MapPin, CheckCircle, Clock, Trash2 } from 'lucide-react';
import { Inquiry } from '../types';

interface ContactProps {
  initialEstimateData: {
    projectType: string;
    area: number;
    quality: string;
    totalUSD: number;
  } | null;
  onClearEstimate: () => void;
}

export default function Contact({ initialEstimateData, onClearEstimate }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    neighborhood: neighborhoodList[0],
    projectType: 'Cocina Integral',
    details: '',
  });

  const [localComments, setLocalComments] = useState<Inquiry[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync initial estimate data if available
  useEffect(() => {
    if (initialEstimateData) {
      setFormData(prev => ({
        ...prev,
        projectType: initialEstimateData.projectType,
        details: prev.details || `Estimación preliminar cargada: Reforma de ${initialEstimateData.projectType} de ${initialEstimateData.area}m² en calidad ${initialEstimateData.quality}. Estimación aproximada: USD $${initialEstimateData.totalUSD.toLocaleString('de-DE')}.`,
      }));
    }
  }, [initialEstimateData]);

  // Load past queries from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cerna_inquiries');
    if (saved) {
      try {
        setLocalComments(JSON.parse(saved));
      } catch (err) {
        console.error("Error reading saved inquiries", err);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Por favor completa el nombre y teléfono para comunicarnos.");
      return;
    }

    const newInquiry: Inquiry = {
      id: "inq-" + Date.now(),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      neighborhood: formData.neighborhood,
      projectType: formData.projectType,
      sizeSqm: initialEstimateData?.area || 10,
      quality: (initialEstimateData?.quality as any) || 'Standard',
      details: formData.details,
      date: new Date().toLocaleDateString('es-AR'),
      estimatedBudget: initialEstimateData?.totalUSD || undefined,
    };

    const updated = [newInquiry, ...localComments];
    setLocalComments(updated);
    localStorage.setItem('cerna_inquiries', JSON.stringify(updated));

    setIsSuccess(true);
    
    // Clear and reset form
    setFormData({
      name: '',
      phone: '',
      email: '',
      neighborhood: neighborhoodList[0],
      projectType: 'Cocina Integral',
      details: '',
    });
    onClearEstimate();
  };

  const handleDeleteSaved = (id: string) => {
    const updated = localComments.filter(item => item.id !== id);
    setLocalComments(updated);
    localStorage.setItem('cerna_inquiries', JSON.stringify(updated));
  };

  return (
    <section id="contacto" className="py-24 bg-warm text-walnut border-t border-olive/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full bg-olive/10 text-olive text-xs font-bold uppercase tracking-wider mb-4">
            <Phone className="w-3.5 h-3.5" />
            Coordinar Visita Técnica
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-walnut">
            Consulte Sin Cargo
          </h2>
          <p className="mt-4 text-base sm:text-lg text-walnut-light">
            Mándenos su consulta y Leonardo le responderá a la brevedad para despejar dudas o agendar una visita en su propiedad para medir y brindarle un presupuesto exacto por escrito.
          </p>
        </div>

        {/* Outer Layout Context Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Quick info panel (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-olive/12 rounded-2xl p-6 sm:p-8 space-y-6 shadow-organic">
              
              <h3 className="font-display text-lg font-bold text-walnut border-b border-olive/10 pb-3">
                Información de contacto
              </h3>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-olive/10 text-olive shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-walnut-light font-mono uppercase block">WhatsApp / Celular</span>
                  <a href="tel:01125180072" className="text-walnut hover:text-olive font-extrabold text-base transition-colors">
                    011 2518-0072
                  </a>
                  <p className="text-xs text-walnut-light mt-0.5">Lunes a Viernes 8 a. m. a 6 p. m.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-olive/10 text-olive shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-walnut-light font-mono uppercase block">Dirección Base</span>
                  <address className="text-walnut not-italic text-sm font-semibold mt-0.5">
                    Av. Córdoba 5311, Palermo,<br />
                    C1414 Cdad. Autónoma de Buenos Aires
                  </address>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-olive/10 text-olive shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-walnut-light font-mono uppercase block">Horarios de Atención</span>
                  <span className="text-walnut text-sm font-bold mt-0.5 block">
                    Abierto • Cierra a las 18:00
                  </span>
                  <p className="text-xs text-walnut-light mt-0.5">Atención comercial telefónica y visitas pactadas.</p>
                </div>
              </div>

            </div>

            {/* Local Storage queries list (only shows if list isn't empty) */}
            {localComments.length > 0 && (
              <div className="bg-white border border-olive/12 rounded-2xl p-5 shadow-organic" id="saved-queries-panel">
                <div className="flex items-center justify-between border-b border-olive/10 pb-3 mb-4">
                  <h4 className="font-display text-sm font-bold text-walnut">Mis consultas guardadas ({localComments.length})</h4>
                  <span className="text-[10px] text-olive font-mono font-bold">Caché Local</span>
                </div>
                <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
                  {localComments.map((comment) => (
                    <div key={comment.id} className="p-3 bg-warm rounded-xl border border-olive/10 flex items-start justify-between gap-2.5">
                      <div className="min-w-0">
                        <span className="text-[10px] text-walnut-light font-mono block">{comment.date} • {comment.projectType}</span>
                        <p className="text-xs font-bold text-walnut truncate max-w-[200px] mt-0.5">{comment.name}</p>
                        <p className="text-[11px] text-walnut-light truncate mt-0.5 max-w-[210px]">{comment.details}</p>
                        {comment.estimatedBudget && (
                          <span className="inline-block mt-1.5 px-2 py-0.5 bg-olive/10 border border-olive/20 rounded text-[10px] font-bold text-olive font-mono">
                            Estimación: USD ${comment.estimatedBudget.toLocaleString('de-DE')}
                          </span>
                        )}
                      </div>
                      <button 
                        onClick={() => handleDeleteSaved(comment.id)}
                        className="text-walnut-light hover:text-rose-600 transition-colors p-1"
                        title="Borrar consulta"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Form Area panel (8 Cols) */}
          <div className="lg:col-span-8 bg-white border border-olive/15 rounded-3xl p-6 sm:p-10 shadow-organic-lg relative">
            
            {/* Visual indicator of active loaded estimation values */}
            {initialEstimateData && (
              <div className="mb-8 p-4 bg-olive-pale rounded-xl border border-olive/20 flex items-center justify-between gap-4 animate-fade-in" id="loaded-estimate-bubble">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest font-mono text-olive block">
                    ✔ Estimación Cargada Correctamente
                  </span>
                  <p className="text-xs text-walnut-light mt-1">
                    Cargamos su presupuesto estimado de <strong className="text-walnut font-bold">{initialEstimateData.projectType}</strong> con acabados <strong className="text-walnut font-bold">{initialEstimateData.quality}</strong> por <strong className="text-olive font-bold">USD ${initialEstimateData.totalUSD.toLocaleString('de-DE')}</strong> al detalle del mensaje.
                  </p>
                </div>
                <button
                  onClick={onClearEstimate}
                  className="px-3.5 py-1.5 bg-white hover:bg-olive-pale text-walnut-light hover:text-walnut rounded-full text-xs font-bold transition-all border border-olive/15 shrink-0 shadow-xs"
                >
                  Remover
                </button>
              </div>
            )}

            {isSuccess ? (
              <div className="py-12 flex flex-col items-center text-center justify-center animate-fade-in" id="contact-success-screen">
                <div className="w-16 h-16 rounded-full bg-olive/10 text-olive flex items-center justify-center mb-6 border border-olive/20 shadow-xs">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="font-display text-2xl font-bold text-walnut mb-2">¡Mensaje guardado localmente!</h3>
                <p className="text-walnut-light text-sm max-w-md leading-relaxed mb-8">
                  Hemos registrado su consulta correctamente en nuestra base temporal. Leonardo responderá su mensaje a la brevedad.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-2.5 bg-warm hover:bg-olive-pale text-walnut rounded-full text-sm font-semibold transition-colors border border-olive/15 cursor-pointer shadow-xs"
                  >
                    Enviar otro mensaje
                  </button>
                  <a
                    href="https://wa.me/5491125180072"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-sm font-bold transition-colors shadow-md shadow-emerald-500/10"
                  >
                    Escribir por WhatsApp ahora
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} id="contact-inquiry-form" className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-olive font-mono mb-2">
                      Nombre y Apellido *
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      placeholder="Ej. Juan Pérez"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 bg-warm rounded-full border border-olive/15 text-walnut placeholder-walnut-light/60 focus:bg-white focus:border-olive focus:outline-none transition-all text-sm"
                    />
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-olive font-mono mb-2">
                      WhatsApp o Teléfono *
                    </label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      placeholder="Ej. 11 1234 5678"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 bg-warm rounded-full border border-olive/15 text-walnut placeholder-walnut-light/60 focus:bg-white focus:border-olive focus:outline-none transition-all text-sm"
                    />
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Neighborhood Input */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-olive font-mono mb-2">
                      Barrio de residencia (CABA)
                    </label>
                    <div className="relative">
                      <select
                        name="neighborhood"
                        value={formData.neighborhood}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 bg-warm rounded-full border border-olive/15 text-walnut focus:bg-white focus:border-olive focus:outline-none transition-all text-sm appearance-none"
                      >
                        {neighborhoodList.map((place) => (
                          <option key={place} value={place}>
                            {place}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-walnut-light">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                  </div>

                  {/* Project Type Input */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-olive font-mono mb-2">
                      Tipo de obra primordial
                    </label>
                    <div className="relative">
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 bg-warm rounded-full border border-olive/15 text-walnut focus:bg-white focus:border-olive focus:outline-none transition-all text-sm appearance-none"
                      >
                        <option value="Cocina Integral">Remodelación de Cocina</option>
                        <option value="Baño Completo">Remodelación de Baño</option>
                        <option value="Reciclado Completo de Depto">Reciclado de Departamento</option>
                        <option value="Pintura y Reparaciones Menores">Pintura y Reparaciones</option>
                        <option value="Colocación de taparrollos / Otros">Trabajos Menores / Aberturas</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-walnut-light">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-olive font-mono mb-2">
                    Email de contacto (Opcional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Ej. juanperez@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 bg-warm rounded-full border border-olive/15 text-walnut placeholder-walnut-light/60 focus:bg-white focus:border-olive focus:outline-none transition-all text-sm"
                  />
                </div>

                {/* Details TextArea */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-olive font-mono mb-2">
                    Detalles de la reforma, medidas o requerimientos especiales
                  </label>
                  <textarea
                    name="details"
                    rows={4}
                    placeholder="Ej. Me interesaría demoler una de las paredes de la cocina del departamento para conectarla con el comedor comedor. Querría cambiar los cerámicos viejos..."
                    value={formData.details}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-warm rounded-2xl border border-olive/15 text-walnut placeholder-walnut-light/60 focus:bg-white focus:border-olive focus:outline-none transition-all text-sm leading-relaxed resize-none"
                  />
                </div>

                {/* Submit action block */}
                <div className="pt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-olive/10">
                  <div className="flex items-center gap-1.5 text-[11px] text-walnut-light font-mono">
                    <span>* Campos requeridos obligatorios</span>
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-olive hover:bg-olive-dark text-white font-bold rounded-full text-sm transition-all text-center cursor-pointer shadow-sm shadow-olive/10"
                  >
                    Enviar Mensaje Gratuito
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
