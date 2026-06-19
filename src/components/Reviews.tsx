import React, { useState } from 'react';
import { reviewsData } from '../data';
import { Star, Quote, MessageSquare, Search, Sparkles } from 'lucide-react';

export default function Reviews() {
  const [filterTag, setFilterTag] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterKeywords = [
    { id: 'todos', label: 'Todos' },
    { id: 'cocina', label: 'Cocina' },
    { id: 'prolijo', label: 'Prolijidad' },
    { id: 'precio', label: 'Excelente Precio' },
    { id: 'departamento', label: 'Departamento / Reciclado' },
    { id: 'materiales', label: 'Materiales' }
  ];

  const filteredReviews = reviewsData.filter(review => {
    // Exact Tag filter
    const matchesTag = 
      filterTag === 'todos' ||
      (filterTag === 'cocina' && review.text.toLowerCase().includes('cocina')) ||
      (filterTag === 'prolijo' && (review.text.toLowerCase().includes('prolijo') || review.text.toLowerCase().includes('prolijidad'))) ||
      (filterTag === 'precio' && review.text.toLowerCase().includes('precio')) ||
      (filterTag === 'departamento' && (review.text.toLowerCase().includes('depto') || review.text.toLowerCase().includes('departamento') || review.text.toLowerCase().includes('reciclar'))) ||
      (filterTag === 'materiales' && review.text.toLowerCase().includes('materiales'));

    // Search query match
    const matchesSearch = 
      review.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.author.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTag && matchesSearch;
  });

  return (
    <section id="reseñas" className="py-24 bg-warm text-walnut border-t border-olive/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block with Rating Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full bg-olive/10 text-olive text-xs font-bold uppercase tracking-wider mb-4">
              <MessageSquare className="w-3.5 h-3.5" />
              Opiniones de Clientes
            </div>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-walnut">
              Puntaje Perfecto: 5.0 Estrellas
            </h2>
            <p className="mt-3 text-base sm:text-lg text-walnut-light max-w-2xl">
              Nuestra mayor garantía es la recomendación de nuestros clientes. Compartimos fragmentos de textos tal como los escribieron nuestros vecinos reales en Google Maps.
            </p>
          </div>

          {/* Rating Summary Card */}
          <div className="lg:col-span-4 bg-white border border-olive/12 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-organic">
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-amber-600 fill-amber-600" />
              ))}
            </div>
            <div className="text-3xl font-display font-bold text-walnut">
              5.0 <span className="text-sm text-walnut-light font-sans font-normal"> / 5.0</span>
            </div>
            <p className="text-xs text-walnut-light mt-1">Calificación en Google Maps (36 opiniones)</p>
          </div>
        </div>

        {/* Filter and Search Bar controls */}
        <div className="mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-olive/12 shadow-sm" id="reviews-filters-panel">
          {/* Tag filters */}
          <div className="flex flex-wrap gap-1.5" id="reviews-tag-buttons">
            {filterKeywords.map((tag) => (
              <button
                key={tag.id}
                onClick={() => setFilterTag(tag.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filterTag === tag.id
                    ? 'bg-olive text-white shadow-sm'
                    : 'bg-warm hover:bg-olive-pale text-walnut-light border border-olive/10 hover:border-olive/20'
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>

          {/* Search Box inputs */}
          <div className="relative shrink-0 w-full md:w-72" id="reviews-search-box">
            <input
              type="text"
              placeholder="Buscar opinión..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-warm rounded-full text-sm text-walnut placeholder-walnut-light/60 border border-olive/15 focus:outline-none focus:border-olive transition-colors"
            />
            <Search className="w-4 h-4 text-walnut-light/60 absolute left-3.5 top-2.5" />
          </div>
        </div>

        {/* Reviews Grid Display */}
        {filteredReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="reviews-grid">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white border border-olive/12 rounded-2xl p-6 flex flex-col justify-between shadow-organic relative group hover:border-olive/30 transition-all duration-300"
              >
                {/* Visual quote indicator */}
                <Quote className="absolute top-4 right-4 w-12 h-12 text-olive/5 pointer-events-none group-hover:text-olive/10 transition-colors" />

                <div>
                  {/* Author Name and Rating Bar */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-olive rounded-full flex items-center justify-center text-white font-bold block">
                      {review.avatarText}
                    </div>
                    <div>
                      <h4 className="font-bold text-walnut text-sm tracking-tight leading-snug">
                        {review.author}
                      </h4>
                      <span className="text-[11px] text-walnut-light block font-mono">
                        {review.role || 'Usuario de Google Maps'} • {review.date}
                      </span>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                    ))}
                  </div>

                  {/* Content of review */}
                  <p className="text-walnut-light text-sm leading-relaxed italic">
                    "{review.text}"
                  </p>
                </div>

                {/* Owner response box */}
                {review.ownerReply && (
                  <div className="mt-5 pt-4 border-t border-olive/10 bg-olive-pale/40 p-3.5 rounded-xl border border-olive/5">
                    <div className="flex items-center gap-1.5 text-olive font-mono font-bold text-[10px] uppercase mb-1">
                      <Sparkles className="w-3 h-3" />
                      Respuesta de Leonardo (Propietario)
                    </div>
                    <p className="text-[12px] text-walnut-light leading-snug">
                      "{review.ownerReply}"
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white border border-dashed border-olive/20 rounded-2xl">
            <p className="text-walnut-light text-sm">No encontramos opiniones con los filtros seleccionados.</p>
            <button
              onClick={() => { setFilterTag('todos'); setSearchQuery(''); }}
              className="mt-3 text-xs text-olive font-bold underline cursor-pointer"
            >
              Reestablecer filtros
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
