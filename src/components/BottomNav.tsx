import React from 'react';
import { Home, Play, Grid3X3, Settings } from 'lucide-react';
import { TOKENS } from '../utils/tokens';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Principal', icon: Home },
    { id: 'continue', label: 'Continuar viendo', icon: Play },
    { id: 'content', label: 'Más contenido', icon: Grid3X3 },
    { id: 'settings', label: 'Configuración', icon: Settings },
  ];

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-white border-t px-2 py-2"
      style={{
        height: '64px',
        borderColor: TOKENS.color.border,
        paddingBottom: 'env(safe-area-inset-bottom, 8px)'
      }}
    >
      <div className="flex justify-around">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className="flex flex-col items-center px-3 py-2 rounded-lg min-w-0 flex-1 mx-1 transition-all"
              style={{
                backgroundColor: isActive ? TOKENS.color.primary : TOKENS.color.base,
                color: isActive ? TOKENS.color.base : TOKENS.color.text,
                borderRadius: TOKENS.radius.sm
              }}
              aria-label={label}
            >
              <Icon size={20} className="mb-1 flex-shrink-0" />
              <span className="text-xs font-medium truncate w-full text-center leading-tight">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};