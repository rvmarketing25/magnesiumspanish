import React from 'react';
import { Module, Bonus } from '../data/content';
import { TOKENS } from '../utils/tokens';

interface ModuleCardProps {
  module: Module | Bonus;
  onClick: () => void;
  buttonText: string;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, onClick, buttonText }) => {
  const isImageCover = module.cover.startsWith('/') || module.cover.startsWith('http');

  return (
    <div
      className="bg-white overflow-hidden transition-transform hover:transform hover:-translate-y-0.5 cursor-pointer flex flex-col"
      style={{
        height: `${TOKENS.size.cardH}px`,
        backgroundColor: TOKENS.color.base,
        border: `1px solid ${TOKENS.color.border}`,
        borderRadius: TOKENS.radius.md,
        boxShadow: TOKENS.shadow.card
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 10px 28px rgba(0,0,0,0.10)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = TOKENS.shadow.card;
      }}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: `${TOKENS.size.coverRatioW}/${TOKENS.size.coverRatioH}`,
          backgroundColor: isImageCover ? 'transparent' : TOKENS.color.primary
        }}
      >
        {isImageCover ? (
          <img
            src={module.cover}
            alt={module.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            <div className="flex items-center justify-center text-white p-4 w-full h-full">
              <h3
                className="text-center font-bold leading-tight"
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: TOKENS.color.base
                }}
              >
                {module.title}
              </h3>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          </>
        )}
      </div>
      <div 
        className="flex flex-col flex-1"
        style={{ 
          padding: TOKENS.space.md,
          gap: `${TOKENS.space.xs}px`
        }}
      >
        <h4 
          className="overflow-hidden"
          style={{
            fontSize: '18px',
            fontWeight: 700,
            color: TOKENS.color.text,
            lineHeight: 1.25,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {module.title}
        </h4>
        <p 
          className="overflow-hidden"
          style={{
            fontSize: '14px',
            color: '#666',
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {module.description}
        </p>
        <button
          onClick={onClick}
          className="w-full font-medium transition-colors hover:opacity-90 mt-auto"
          style={{
            height: '44px',
            backgroundColor: TOKENS.color.primary,
            color: TOKENS.color.base,
            fontWeight: 600,
            borderRadius: TOKENS.radius.lg,
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};