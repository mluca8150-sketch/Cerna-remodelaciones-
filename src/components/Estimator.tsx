import React, { useState, useEffect } from 'react';
import { ESTIMATOR_TIERS, US_BLUE_EXCHANGE_RATE, neighborhoodList } from '../data';
import { Calculator, Sparkles, AlertCircle, RefreshCw, MessageSquare } from 'lucide-react';

interface EstimatorProps {
  initialProjectType?: string;
  onSendEstimateToContact: (data: {
    projectType: string;
    area: number;
    quality: string;
    totalUSD: number;
  }) => void;
}

export default function Estimator({ initialProjectType, onSendEstimateToContact }: EstimatorProps) {
  const [projectTypeId, setProjectTypeId] = useState(initialProjectType || 'kitchen');
  const [area, setArea] = useState(10);
  const [qualityId, setQualityId] = useState('Standard');
  const [currency, setCurrency] = useState<'USD' | 'ARS'>('USD');
  const [customExchangeRate, setCustomExchangeRate] = useState(US_BLUE_EXCHANGE_RATE);

  // Sync initial project type when loaded dynamically from service click
  useEffect(() => {
    if (initialProjectType) {
      setProjectTypeId(initialProjectType);
      // set matching default areas
      if (initialProjectType === 'bathroom') setArea(5);
      else if (initialProjectType === 'apartment') setArea(45);
      else if (initialProjectType === 'painting') setArea(30);
      else setArea(10);
    }
  }, [initialProjectType]);

  const activeProject = ESTIMATOR_TIERS.projectTypes.find(t => t.id === projectTypeId) || ESTIMATOR_TIERS.projectTypes[0];
  const activeQuality = ESTIMATOR_TIERS.qualities.find(q => q.id === qualityId) || ESTIMATOR_TIERS.qualities[0];

  // Align area to project limits when type changes
  const handleTypeChange = (typeId: string) => {
    setProjectTypeId(typeId);
    const targetProj = ESTIMATOR_TIERS.projectTypes.find(t => t.id === typeId);
    if (targetProj) {
      if (area < targetProj.minSqm) {
        setArea(targetProj.minSqm);
      }
    }
  };

  const calculatedUSD = Math.round(activeProject.basePriceSqmUSD * area * activeQuality.multiplier);
  const calculatedARS = calculatedUSD * customExchangeRate;

  // Labor & Materials rough ratio split (approx. 45% Labor, 55% Materials)
  const laborUSD = Math.round(calculatedUSD * 0.45);
  const materialsUSDMin = Math.round(calculatedUSD * 0.4);
  const materialsUSDMax = Math.round(calculatedUSD * 0.6);

  const getWhatsAppURL = () => {
    const text = `Hola Leonardo! Estuve usando el cotizador web de CERNA Remodelaciones y me gustaría conversar sobre mi reforma.
*Proyecto:* ${activeProject.name}
*Superficie:* ${area} m²
*Calidad de Materiales:* ${activeQuality.name}
*Estimación Aproximada:* USD $${calculatedUSD.toLocaleString('de-DE')} (${currency === 'ARS' ? `ARS $${calculatedARS.toLocaleString('de-DE')}` : 'Fijado en USD Blue'})
¿Tienen disponibilidad para coordinar una visita técnica sin cargo?`;
    
    return `https://wa.me/5491125180072?text=${encodeURIComponent(text)}`;
  };

  const handleApplyToForm = () => {
    onSendEstimateToContact({
      projectType: activeProject.name,
      area,
      quality: activeQuality.name,
      totalUSD: calculatedUSD,
    });
  };

  return (
    <section id="cotizador" className="py-24 bg-warm text-walnut border-t border-olive/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full bg-olive/10 text-olive text-xs font-bold uppercase tracking-wider mb-4">
            <Calculator className="w-3.5 h-3.5" />
            Presupuesto Transparente
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-walnut">
            Cotizador Inteligente de Obras
          </h2>
          <p className="mt-4 text-base sm:text-lg text-walnut-light">
            Obtenga un aproximado al instante del costo de la mano de obra y guía de materiales para su reforma en Buenos Aires. Sin sorpresas, con valores actualizados en USD Blue y Pesos.
          </p>
        </div>

        {/* Workspace Estimator Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Input (7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-olive/15 rounded-3xl p-6 sm:p-8 shadow-organic">
            
            {/* Project Selection Grid */}
            <div className="mb-8">
              <label className="block text-sm font-bold uppercase tracking-wider text-olive font-mono mb-4">
                1. Seleccioná el Tipo de Reforma
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="estimator-project-selector">
                {ESTIMATOR_TIERS.projectTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleTypeChange(type.id)}
                    className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between cursor-pointer ${
                      projectTypeId === type.id
                        ? 'bg-olive-pale border-olive text-walnut shadow-sm'
                        : 'bg-white border-olive/10 hover:border-olive/20 text-walnut-light'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-base block text-walnut">{type.name}</span>
                      <span className="text-xs text-walnut-light mt-1 block leading-snug">{type.desc}</span>
                    </div>
                    <span className="text-[11px] text-olive font-bold mt-3 font-mono">
                      Base: USD ${type.basePriceSqmUSD}/m²
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Slider Area */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3 text-sm">
                <label className="font-bold uppercase tracking-wider text-olive font-mono">
                  2. Superficie aproximada (m²)
                </label>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-display font-bold text-walnut text-right">{area}</span>
                  <span className="text-walnut-light font-medium">m²</span>
                </div>
              </div>
              <input
                type="range"
                min={activeProject.minSqm}
                max={200}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-2 bg-olive-pale rounded-lg appearance-none cursor-pointer accent-olive"
              />
              <div className="flex items-center justify-between text-xs text-walnut-light mt-1.5 font-mono">
                <span>Superficie mínima recomendada: {activeProject.minSqm} m²</span>
                <span>Máx: 200 m²</span>
              </div>
            </div>

            {/* Quality selection tier list */}
            <div className="mb-8" id="estimator-quality-selector">
              <label className="block text-sm font-bold uppercase tracking-wider text-olive font-mono mb-4">
                3. Tipo de Terminación o Calidad
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {ESTIMATOR_TIERS.qualities.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setQualityId(tier.id)}
                    className={`p-3.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center cursor-pointer ${
                      qualityId === tier.id
                        ? 'bg-olive-pale border-olive text-walnut shadow-sm'
                        : 'bg-white border-olive/10 hover:border-olive/20 text-walnut-light'
                    }`}
                  >
                    <span className="font-bold text-sm block">{tier.name}</span>
                    <span className="text-[10px] font-mono mt-1 text-olive">
                      Factor x{tier.multiplier}
                    </span>
                  </button>
                ))}
              </div>
              
              {/* Quality Description Card */}
              <div className="mt-4 p-4 rounded-xl bg-warm border border-olive/10 text-xs text-walnut-light leading-relaxed">
                <span className="font-bold text-olive uppercase tracking-wider block font-mono text-[10px] mb-1">
                  Gama elegida: {activeQuality.name}
                </span>
                {activeQuality.details}
              </div>
            </div>

            {/* Config: Exchange Rate controller (extremely Argentine context!) */}
            <div className="pt-4 border-t border-olive/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-walnut-light">Dólar Blue Referencia:</span>
                <div className="flex items-center gap-1 text-xs font-mono font-bold text-emerald-700">
                  <span>1 USD = $ {customExchangeRate} ARS</span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-warm p-1 rounded-full border border-olive/10" id="estimator-currency-selector">
                <button
                  onClick={() => setCurrency('USD')}
                  className={`px-4 py-1 text-xs rounded-full font-bold transition-all ${
                    currency === 'USD' ? 'bg-olive text-white' : 'text-walnut-light hover:text-walnut'
                  }`}
                >
                  USD Blue
                </button>
                <button
                  onClick={() => setCurrency('ARS')}
                  className={`px-4 py-1 text-xs rounded-full font-bold transition-all ${
                    currency === 'ARS' ? 'bg-olive text-white' : 'text-walnut-light hover:text-walnut'
                  }`}
                >
                  Pesos ARS
                </button>
              </div>
            </div>

          </div>

          {/* Results Sidebar Output Presentation Card (5 Cols) */}
          <div className="lg:col-span-5 bg-white border border-olive/15 rounded-3xl p-6 sm:p-8 shadow-organic-lg relative overflow-hidden" id="estimator-result-card">
            
            {/* Small decorative blur */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-olive/5 rounded-full blur-2xl pointer-events-none" />

            <span className="text-xs uppercase font-extrabold tracking-wider font-mono text-olive block mb-2">
              Estimación de Obra
            </span>
            <h3 className="text-2xl font-display font-semibold text-walnut mb-6">
              Resumen Presupuestario
            </h3>

            {/* Display Budget Main Number Block */}
            <div className="p-6 rounded-2xl bg-olive-pale border border-olive/15 mb-6 text-center">
              <span className="text-xs text-walnut-light block font-mono mb-1.5">Total Estimado de Obra</span>
              {currency === 'USD' ? (
                <div>
                  <div className="text-4xl sm:text-5xl font-display font-bold text-olive">
                    USD ${calculatedUSD.toLocaleString('de-DE')}
                  </div>
                  <span className="text-xs text-walnut-light mt-1.5 block font-mono leading-none">
                    ~ ARS ${(calculatedUSD * customExchangeRate).toLocaleString('de-DE')}
                  </span>
                </div>
              ) : (
                <div>
                  <div className="text-3xl sm:text-4xl font-display font-bold text-olive leading-none">
                    ARS ${calculatedARS.toLocaleString('de-DE')}
                  </div>
                  <span className="text-xs text-walnut-light mt-2 block font-mono">
                    Equivalente a USD ${calculatedUSD.toLocaleString('de-DE')} Blue
                  </span>
                </div>
              )}
            </div>

            {/* Budget Cost Breakdown */}
            <div className="space-y-4 mb-8">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-walnut-light font-mono border-b border-olive/10 pb-2">
                Desglose Estimado Sugerido
              </h4>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-walnut-light">Mano de obra (CERNA):</span>
                <span className="font-bold text-walnut">
                  {currency === 'USD' ? `USD $${laborUSD.toLocaleString('de-DE')}` : `ARS $${(laborUSD * customExchangeRate).toLocaleString('de-DE')}`}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-walnut-light">Materiales sugeridos (Referencial):</span>
                <span className="font-bold text-walnut">
                  {currency === 'USD' 
                    ? `USD $${materialsUSDMin.toLocaleString('de-DE')} - $${materialsUSDMax.toLocaleString('de-DE')}`
                    : `ARS $${(materialsUSDMin * customExchangeRate).toLocaleString('de-DE')} - $${(materialsUSDMax * customExchangeRate).toLocaleString('de-DE')}`}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-walnut-light">Tiempo de obra estimado:</span>
                <span className="font-bold text-olive">
                  {projectTypeId === 'kitchen' ? '2-4 semanas' : projectTypeId === 'bathroom' ? '2-3 semanas' : projectTypeId === 'apartment' ? '4-8 semanas' : '1-2 semanas'}
                </span>
              </div>
            </div>

            {/* Disclaimers */}
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-olive-pale border border-olive/10 text-[11px] text-walnut-light leading-normal mb-8">
              <AlertCircle className="w-4 h-4 text-olive shrink-0 mt-0.5" />
              <span>
                Este cotizador es referencial para CABA. El precio definitivo se determina en la visita de relevamiento técnico presencial realizada por Leonardo sin cargo.
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              <a
                href={getWhatsAppURL()}
                target="_blank"
                rel="noopener noreferrer"
                id="estimator-whatsapp-send"
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 hover:scale-[1.01] text-white font-bold rounded-full transition-all flex items-center justify-center gap-3 shadow-md shadow-emerald-500/10 text-base"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Enviar cotización por WhatsApp</span>
              </a>

              <button
                onClick={handleApplyToForm}
                id="estimator-form-send"
                className="w-full py-3 bg-white hover:bg-olive-pale text-walnut font-bold text-sm rounded-full transition-all border border-olive/20"
              >
                Cargar en Formulario de Contacto
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
