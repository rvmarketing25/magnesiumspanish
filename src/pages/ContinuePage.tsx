import React from 'react';
import { modulesUnified } from '../data/content';
import { getInProgressLessons } from '../utils/progress';
import { TOKENS } from '../utils/tokens';

interface ContinuePageProps {
  onModuleClick: (id: string) => void;
}

export const ContinuePage: React.FC<ContinuePageProps> = ({ onModuleClick }) => {
  const inProgressLessons = getInProgressLessons();

  if (inProgressLessons.length === 0) {
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
            CONTINUAR VIENDO
          </h1>
          <p 
            className="mb-8"
            style={{ color: '#666' }}
          >
            Rastrea tu progreso y retoma tus lecciones de la Guía de Magnesio.
          </p>
          
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div 
                className="text-center"
                style={{
                  maxWidth: '520px',
                  padding: TOKENS.space.xl,
                  borderRadius: TOKENS.radius.md,
                  backgroundColor: 'rgba(0,74,173,0.10)',
                  marginTop: TOKENS.space.xxl
                }}
              >
                <p style={{ color: '#666' }}>
                  Aún no has comenzado ninguna lección. Accede a un módulo en la pestaña Principal para comenzar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          CONTINUE WATCHING
        </h1>
        <p 
          className="mb-8"
          style={{ color: '#666' }}
        >
          Track your progress and resume your Magnesium Guide lessons.
        </p>
        
        <div className="space-y-4">
          {inProgressLessons.map(({ moduleId, lessonId }) => {
            // Find the module and lesson
            const content = modulesUnified.find(m => m.id === moduleId);
            const lesson = content?.lessons?.find(l => l.id === lessonId);
            
            if (!content || !lesson) return null;
            
            return (
              <div 
                key={`${moduleId}-${lessonId}`} 
                className="bg-white"
                style={{
                  backgroundColor: TOKENS.color.base,
                  border: `1px solid ${TOKENS.color.border}`,
                  borderRadius: TOKENS.radius.md,
                  padding: TOKENS.space.lg,
                  boxShadow: TOKENS.shadow.card
                }}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-24 h-36 flex items-center justify-center text-white text-xs font-bold text-center px-2"
                    style={{
                      backgroundColor: TOKENS.color.primary,
                      borderRadius: TOKENS.radius.sm
                    }}
                  >
                    {content.title}
                  </div>
                  <div className="flex-1">
                    <h3 
                      className="text-lg font-semibold mb-1"
                      style={{ color: TOKENS.color.text }}
                    >
                      {lesson.title}
                    </h3>
                    <p 
                      className="text-sm mb-3"
                      style={{ color: '#666' }}
                    >
                      {content.title}
                    </p>
                    <p 
                      className="text-xs mb-4"
                      style={{ color: '#666' }}
                    >
                      Duración: {lesson.duration}
                    </p>
                    <button
                      onClick={() => onModuleClick(moduleId)}
                      className="text-sm font-medium transition-opacity hover:opacity-80"
                      style={{
                        backgroundColor: TOKENS.color.primary,
                        color: TOKENS.color.base,
                        padding: `${TOKENS.space.sm}px ${TOKENS.space.md}px`,
                        borderRadius: TOKENS.radius.lg,
                        border: 'none',
                        cursor: 'pointer'
                      }}
                      aria-label="Reanudar lección"
                    >
                      Reanudar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};