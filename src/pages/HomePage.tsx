import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { modulesUnified } from '../data/content';
import { ModuleCard } from '../components/ModuleCard';
import { TOKENS } from '../utils/tokens';

interface HomePageProps {
  onModuleClick: (id: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onModuleClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = 280; // Largura aproximada do card
      const gap = TOKENS.space.md; // Gap entre cards
      const scrollAmount = cardWidth + gap;
      
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div 
      className="pb-20 pt-6"
      style={{ 
        paddingLeft: TOKENS.space.md,
        paddingRight: TOKENS.space.md
      }}
    >
      <div 
        className="mx-auto"
        style={{ maxWidth: TOKENS.container.max }}
      >
        {/* Cabeçalho do carrossel */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p 
              className="text-lg font-semibold"
              style={{ color: '#666' }}
            >
              Módulos y bonos disponibles
            </p>
          </div>
          
          {/* Navigation buttons - visible only on desktop */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full bg-white border transition-all hover:shadow-md"
              style={{
                borderColor: TOKENS.color.border,
                color: TOKENS.color.primary
              }}
              aria-label="Anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full bg-white border transition-all hover:shadow-md"
              style={{
                borderColor: TOKENS.color.border,
                color: TOKENS.color.primary
              }}
              aria-label="Siguiente"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel container */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide pb-4"
            style={{
              gap: `${TOKENS.space.md}px`,
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitScrollbar: { display: 'none' }
            }}
          >
            {modulesUnified.map((module) => (
              <div 
                key={module.id} 
                className="flex-shrink-0"
                style={{ width: '280px' }}
              >
                <ModuleCard
                  module={module}
                  onClick={() => onModuleClick(module.id)}
                  buttonText={module.id === 'm1' ? "Ver módulo" : "Ver bono"}
                />
              </div>
            ))}
          </div>
          
          {/* Edge gradients to indicate scroll (desktop only) */}
          <div 
            className="hidden md:block absolute left-0 top-0 bottom-4 w-8 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, rgba(249,250,251,1), rgba(249,250,251,0))'
            }}
          />
          <div 
            className="hidden md:block absolute right-0 top-0 bottom-4 w-8 pointer-events-none"
            style={{
              background: 'linear-gradient(to left, rgba(249,250,251,1), rgba(249,250,251,0))'
            }}
          />
        </div>

        {/* Scroll indicator for mobile */}
        <div className="md:hidden text-center mt-4">
          <p 
            className="text-xs"
            style={{ color: '#999' }}
          >
            ← Desliza para ver más →
          </p>
        </div>
      </div>
    </div>
  );
};