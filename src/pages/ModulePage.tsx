import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Circle, PlayCircle } from 'lucide-react';
import { modulesUnified } from '../data/content';
import { getLessonStatus, setLessonProgress } from '../utils/progress';
import { TOKENS } from '../utils/tokens';
import { VideoPlayer } from '../components/VideoPlayer';

interface ModulePageProps {
  moduleId: string;
  onBack: () => void;
}

export const ModulePage: React.FC<ModulePageProps> = ({ moduleId, onBack }) => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  
  // Buscar no array unificado
  const content = modulesUnified.find(m => m.id === moduleId);
  
  useEffect(() => {
    if (content?.lessons?.[currentLessonIndex]) {
      const lessonId = content.lessons[currentLessonIndex].id;
      const currentStatus = getLessonStatus(moduleId, lessonId);
      if (currentStatus === 'not_started') {
        setLessonProgress(moduleId, lessonId, 'in_progress');
      }
    }
  }, [moduleId, currentLessonIndex, content]);

  if (!content) {
    return (
      <div className="flex items-center justify-center h-screen pb-20">
        <p className="text-gray-600">Módulo no encontrado</p>
      </div>
    );
  }

  const handleCompleteLesson = () => {
    if (content.lessons?.[currentLessonIndex]) {
      const lessonId = content.lessons[currentLessonIndex].id;
      setLessonProgress(moduleId, lessonId, 'done');
      
      // Automatically advance to next lesson if available
      if (currentLessonIndex < content.lessons.length - 1) {
        setCurrentLessonIndex(currentLessonIndex + 1);
      }
    }
  };

  const canGoNext = content.lessons && currentLessonIndex < content.lessons.length - 1;
  const canGoPrev = currentLessonIndex > 0;

  // Render non-video content
  if (content.type === 'ebook') {
    const pdfLinks: { [key: string]: string } = {
      'b3': 'https://pdf.ac/GHFYpc-XD',
      'b4': 'https://pdf.ac/MjqjMPIY'
    };

    const guideTitles: { [key: string]: string } = {
      'b3': 'Guía Alimentaria',
      'b4': 'Guía de Infusiones'
    };

    const guideDescriptions: { [key: string]: React.ReactNode } = {
      'b3': <>Consulta el <strong>Guía Alimentaria</strong> completo con porciones y recomendaciones prácticas para una nutrición equilibrada.</>,
      'b4': <>Descubre el <strong>Guía de Infusiones</strong> con recetas, preparaciones y beneficios naturales para tu bienestar diario.</>
    };

    const buttonTexts: { [key: string]: string } = {
      'b3': 'Abrir Guía Alimentaria',
      'b4': 'Abrir Guía de Infusiones'
    };

    const pdfLink = pdfLinks[moduleId] || pdfLinks['b3'];
    const guideTitle = guideTitles[moduleId] || guideTitles['b3'];
    const guideDescription = guideDescriptions[moduleId] || guideDescriptions['b3'];
    const buttonText = buttonTexts[moduleId] || buttonTexts['b3'];

    return (
      <div className="min-h-screen pb-20 pt-4">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={onBack}
            className="flex items-center hover:opacity-80 mb-4 transition-opacity"
            style={{ color: TOKENS.color.primary }}
          >
            <ChevronLeft size={20} />
            Volver
          </button>

          <div
            className="mx-auto text-center"
            style={{
              maxWidth: '720px',
              backgroundColor: TOKENS.color.base,
              border: `1px solid ${TOKENS.color.border}`,
              borderRadius: '12px',
              padding: '24px',
              boxShadow: TOKENS.shadow.card
            }}
          >
            <h2
              style={{
                color: TOKENS.color.primary,
                fontWeight: 800,
                marginBottom: '8px',
                fontSize: '20px'
              }}
            >
              {guideTitle}
            </h2>

            <p
              style={{
                color: '#475569',
                marginBottom: '20px',
                fontSize: '16px',
                lineHeight: 1.6
              }}
            >
              {guideDescription}
            </p>

            <a
              href={pdfLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                background: TOKENS.color.primary,
                color: TOKENS.color.base,
                fontWeight: 600,
                padding: '12px 24px',
                borderRadius: '10px',
                textDecoration: 'none',
                transition: 'background 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#003A8F';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = TOKENS.color.primary;
              }}
            >
              {buttonText}
            </a>

            <p
              style={{
                marginTop: '14px',
                fontSize: '13px',
                color: '#64748B',
                lineHeight: 1.5
              }}
            >
              Si el enlace no se abre automáticamente, copia y pega esta dirección en tu navegador:<br/>
              <span style={{ color: TOKENS.color.primary, fontWeight: 600 }}>
                {pdfLink}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (content.type === 'sheet') {
    const sheetUrl = content.assetSlots?.sheetUrl;

    return (
      <div className="min-h-screen pb-20 pt-4">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={onBack}
            className="flex items-center hover:opacity-80 mb-4 transition-opacity"
            style={{ color: TOKENS.color.primary }}
          >
            <ChevronLeft size={20} />
            Volver
          </button>

          <div
            className="mx-auto text-center"
            style={{
              maxWidth: '600px',
              backgroundColor: TOKENS.color.base,
              border: `1px solid ${TOKENS.color.border}`,
              borderRadius: '12px',
              padding: TOKENS.space.xl,
              boxShadow: TOKENS.shadow.card
            }}
          >
            <h2
              className="font-bold mb-3"
              style={{
                fontSize: '20px',
                fontWeight: 700,
                color: TOKENS.color.primary
              }}
            >
              Hoja de Cálculo de Magnesio
            </h2>

            <p
              className="mb-6"
              style={{
                color: '#333',
                fontSize: '16px',
                lineHeight: 1.6
              }}
            >
              Abre la hoja de cálculo en línea para consultar tus niveles y recomendaciones personalizadas.
            </p>

            {sheetUrl ? (
              <a
                href={sheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-semibold transition-all"
                style={{
                  backgroundColor: TOKENS.color.primary,
                  color: TOKENS.color.base,
                  fontWeight: 600,
                  padding: '12px 24px',
                  borderRadius: '8px',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#003A8F';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = TOKENS.color.primary;
                }}
              >
                Abrir Hoja de Cálculo
              </a>
            ) : (
              <button
                disabled
                className="inline-block font-semibold"
                style={{
                  backgroundColor: '#E5E5E5',
                  color: '#999',
                  fontWeight: 600,
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'not-allowed'
                }}
              >
                Enlace no disponible
              </button>
            )}

            <p style={{
              marginTop: 12,
              fontSize: 14,
              color: '#5E6A7A'
            }}>
              <strong>Nota:</strong> para usarla de forma individual, haz clic en
              <em> Archivo {'>'} Hacer una copia </em> en Google Sheets. Así tendrás tu
              propia versión privada.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Render video content
  if (!content.lessons) {
    return (
      <div className="flex items-center justify-center h-screen pb-20">
        <p className="text-gray-600">No se encontraron lecciones</p>
      </div>
    );
  }

  const currentLesson = content.lessons[currentLessonIndex];

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
        <button
          onClick={onBack}
          className="flex items-center hover:opacity-80 mb-4 transition-opacity"
          style={{ color: TOKENS.color.primary }}
        >
          <ChevronLeft size={20} />
          Volver
        </button>
        
        <div 
          className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr]"
          style={{ gap: TOKENS.space.xl }}
        >
          {/* Player */}
          <div className="space-y-4">
            <VideoPlayer youtubeId={currentLesson.youtubeId} />
            
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentLessonIndex(currentLessonIndex - 1)}
                disabled={!canGoPrev}
                className="flex items-center gap-2 px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-80 transition-opacity"
                style={{
                  backgroundColor: TOKENS.color.primary,
                  color: TOKENS.color.base,
                  borderRadius: TOKENS.radius.lg,
                  border: 'none',
                  height: '44px'
                }}
                aria-label="Lección anterior"
              >
                <ChevronLeft size={16} />
                Anterior
              </button>
              
              <button
                onClick={handleCompleteLesson}
                className="flex items-center gap-2 px-6 py-2 hover:opacity-80 transition-opacity"
                style={{
                  backgroundColor: 'transparent',
                  color: TOKENS.color.primary,
                  border: `2px solid ${TOKENS.color.primary}`,
                  borderRadius: TOKENS.radius.lg,
                  height: '44px'
                }}
              >
                <CheckCircle size={16} />
                Completar lección
              </button>
              
              <button
                onClick={() => setCurrentLessonIndex(currentLessonIndex + 1)}
                disabled={!canGoNext}
                className="flex items-center gap-2 px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-80 transition-opacity"
                style={{
                  backgroundColor: TOKENS.color.primary,
                  color: TOKENS.color.base,
                  borderRadius: TOKENS.radius.lg,
                  border: 'none',
                  height: '44px'
                }}
                aria-label="Siguiente lección"
              >
                Siguiente
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
          
          {/* Lesson list */}
          <div 
            className="bg-white"
            style={{
              backgroundColor: TOKENS.color.base,
              border: `1px solid ${TOKENS.color.border}`,
              borderRadius: TOKENS.radius.md,
              padding: TOKENS.space.md,
              boxShadow: TOKENS.shadow.card
            }}
          >
            <h2 
              className="font-bold mb-4"
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: TOKENS.color.primary
              }}
            >
              {content.title}
            </h2>
            <div className="space-y-3">
              {content.lessons.map((lesson, index) => {
                const status = getLessonStatus(moduleId, lesson.id);
                const isActive = index === currentLessonIndex;
                
                return (
                  <div
                    key={lesson.id}
                    onClick={() => setCurrentLessonIndex(index)}
                    className="cursor-pointer transition-colors hover:opacity-80"
                    style={{
                      minHeight: '56px',
                      padding: `${TOKENS.space.sm}px ${TOKENS.space.md}px`,
                      borderRadius: TOKENS.radius.sm,
                      backgroundColor: isActive ? 'rgba(0,74,173,0.10)' : 'transparent',
                      borderLeft: isActive ? `4px solid ${TOKENS.color.primary}` : '4px solid transparent'
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span 
                          className="text-sm font-medium"
                          style={{ color: '#666' }}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        {status === 'done' ? (
                          <CheckCircle size={16} style={{ color: '#10B981' }} />
                        ) : status === 'in_progress' ? (
                          <PlayCircle size={16} style={{ color: TOKENS.color.primary }} />
                        ) : (
                          <Circle size={16} style={{ color: '#9CA3AF' }} />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p 
                          className="text-sm truncate"
                          style={{
                            fontWeight: isActive ? 700 : 500,
                            color: TOKENS.color.text
                          }}
                        >
                          {lesson.title}
                        </p>
                        <p 
                          className="text-xs"
                          style={{ color: '#666' }}
                        >
                          {lesson.duration}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};