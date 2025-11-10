import React from 'react';
import { logout } from '../utils/auth';
import { TOKENS } from '../utils/tokens';

interface TopbarProps {
  onLogout: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onLogout }) => {
  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <header 
      className="border-b flex justify-between items-center"
      style={{
        height: '64px',
        backgroundColor: TOKENS.color.primary,
        borderColor: TOKENS.color.border,
        paddingLeft: TOKENS.space.md,
        paddingRight: TOKENS.space.md
      }}
    >
      <h1 
        className="font-bold"
        style={{
          fontSize: '22px',
          fontWeight: 700,
          color: TOKENS.color.base
        }}
      >
        GUÍA DE MAGNESIO
      </h1>
      <button 
        onClick={handleLogout}
        className="font-medium transition-colors hover:opacity-80"
        style={{ color: TOKENS.color.base }}
      >
        Cerrar sesión
      </button>
    </header>
  );
};