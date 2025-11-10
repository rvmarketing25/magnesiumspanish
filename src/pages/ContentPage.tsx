import React, { useState } from 'react';
import { Sparkles, Clock, Gift } from 'lucide-react';
import { TOKENS } from '../utils/tokens';

interface ContentPageProps {
  onModuleClick: (id: string) => void;
}

export const ContentPage: React.FC<ContentPageProps> = ({ onModuleClick }) => {
  return (
    <div 
      className="min-h-screen pb-20 pt-4"
      style={{
        paddingLeft: TOKENS.space.md,
        paddingRight: TOKENS.space.md
      }}
    >
      <div 
        className="mx-auto"
        style={{ maxWidth: TOKENS.container.max }}
      >
        <h1 
          className="font-bold mb-2"
          style={{
            fontSize: '18px',
            fontWeight: 700,
            color: TOKENS.color.primary
          }}
        >
          MÁS CONTENIDO
        </h1>
        <p 
          className="mb-8"
          style={{ color: '#666' }}
        >
          Contenido exclusivo y especializado para profundizar tu conocimiento.
        </p>
        
        {/* Coming Soon section */}
        <div className="flex items-center justify-center py-16">
          <div 
            className="text-center max-w-lg"
            style={{
              padding: TOKENS.space.xl,
              borderRadius: TOKENS.radius.md,
              backgroundColor: 'rgba(0,74,173,0.05)',
              border: `1px solid rgba(0,74,173,0.1)`
            }}
          >
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{
                backgroundColor: 'rgba(0,74,173,0.1)'
              }}
            >
              <Sparkles 
                size={32} 
                style={{ color: TOKENS.color.primary }}
              />
            </div>
            
            <h2 
              className="font-bold mb-4"
              style={{
                fontSize: '24px',
                fontWeight: 700,
                color: TOKENS.color.text
              }}
            >
              Nuevo Contenido Próximamente
            </h2>
            
            <p 
              className="mb-6 leading-relaxed"
              style={{ 
                color: '#666',
                fontSize: '16px',
                lineHeight: 1.6
              }}
            >
              Estamos preparando contenido exclusivo y especializado para llevar tu conocimiento sobre magnesio al siguiente nivel.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div 
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: TOKENS.color.base,
                  border: `1px solid ${TOKENS.color.border}`
                }}
              >
                <Clock 
                  size={24} 
                  className="mx-auto mb-2"
                  style={{ color: TOKENS.color.primary }}
                />
                <p 
                  className="text-sm font-medium"
                  style={{ color: TOKENS.color.text }}
                >
                  Cursos Avanzados
                </p>
              </div>
              
              <div 
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: TOKENS.color.base,
                  border: `1px solid ${TOKENS.color.border}`
                }}
              >
                <Gift 
                  size={24} 
                  className="mx-auto mb-2"
                  style={{ color: TOKENS.color.primary }}
                />
                <p 
                  className="text-sm font-medium"
                  style={{ color: TOKENS.color.text }}
                >
                  Materiales Exclusivos
                </p>
              </div>
            </div>
            
            <div 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full"
              style={{
                backgroundColor: 'rgba(0,74,173,0.1)',
                color: TOKENS.color.primary,
                fontSize: '14px',
                fontWeight: 600
              }}
            >
              <Clock size={16} />
              En desarrollo
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};