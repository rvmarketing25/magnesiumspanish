import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { login, isAuthValid } from '../utils/auth';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeLeft, setBlockTimeLeft] = useState(0);

  // Verificar se já está autenticado
  useEffect(() => {
    if (isAuthValid()) {
      onLoginSuccess();
    }
  }, [onLoginSuccess]);

  // Timer para desbloqueio
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isBlocked && blockTimeLeft > 0) {
      interval = setInterval(() => {
        setBlockTimeLeft(prev => {
          if (prev <= 1) {
            setIsBlocked(false);
            setAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBlocked, blockTimeLeft]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isBlocked) return;

    setError('');

    const success = login(formData.email, formData.password, true);
    
    if (success) {
      onLoginSuccess();
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= 3) {
        setIsBlocked(true);
        setBlockTimeLeft(10);
        setError('Demasiados intentos. Espera 10s.');
      } else {
        setError('Contraseña incorrecta. Intenta de nuevo.');
      }
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error && !isBlocked) {
      setError('');
    }
  };


  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        background: 'linear-gradient(180deg, #F7FAFF 0%, #FFFFFF 100%)'
      }}
    >
      {/* Título principal */}
      <h1 
        className="text-center mb-8"
        style={{
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          fontSize: 'clamp(22px, 2.6vw, 28px)',
          color: '#1A1A1A'
        }}
      >
        ACCESO A LA GUÍA DE MAGNESIO
      </h1>

      {/* Form card */}
      <div 
        className="w-full"
        style={{
          maxWidth: '420px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E5E5E5',
          borderRadius: '16px',
          boxShadow: '0 12px 32px rgba(0,0,0,0.10)',
          padding: window.innerWidth >= 768 ? '32px' : '24px'
        }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div 
              className="text-sm"
              style={{
                color: '#B00020',
                backgroundColor: '#FDECEC',
                borderRadius: '8px',
                padding: '8px 12px'
              }}
              role="alert"
              aria-live="polite"
            >
              {error}
            </div>
          )}

          {/* Email field */}
          <div>
            <label 
              htmlFor="email"
              className="block text-sm font-medium mb-2"
              style={{ color: '#1A1A1A' }}
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="tucorreo@ejemplo.com"
              className="w-full focus:outline-none"
              style={{
                height: '48px',
                border: '1px solid #E5E5E5',
                borderRadius: '12px',
                padding: '0 14px',
                fontSize: '16px'
              }}
              onFocus={(e) => {
                e.target.style.outline = '2px solid #004AAD';
                e.target.style.outlineOffset = '2px';
              }}
              onBlur={(e) => {
                e.target.style.outline = 'none';
              }}
              required
              disabled={isBlocked}
            />
          </div>

          {/* Password field */}
          <div>
            <label 
              htmlFor="password"
              className="block text-sm font-medium mb-2"
              style={{ color: '#1A1A1A' }}
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="•••••••"
                className="w-full pr-12 focus:outline-none"
                style={{
                  height: '48px',
                  border: '1px solid #E5E5E5',
                  borderRadius: '12px',
                  padding: '0 14px',
                  fontSize: '16px'
                }}
                onFocus={(e) => {
                  e.target.style.outline = '2px solid #004AAD';
                  e.target.style.outlineOffset = '2px';
                }}
                onBlur={(e) => {
                  e.target.style.outline = 'none';
                }}
                required
                disabled={isBlocked}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                disabled={isBlocked}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Login button */}
          <button
            type="submit"
            disabled={isBlocked}
            className="w-full font-bold transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              height: '48px',
              backgroundColor: '#004AAD',
              color: '#FFFFFF',
              borderRadius: '24px',
              border: 'none',
              fontWeight: 700
            }}
          >
            {isBlocked ? `Espera ${blockTimeLeft}s` : 'Ingresar'}
          </button>
        </form>
      </div>

    </div>
  );
};