import React, { useState } from 'react';
import { User, Bell, Palette, Video, Wifi, Trash2, FileText, Shield, Info } from 'lucide-react';
import { clearAllProgress } from '../utils/progress';
import { logout } from '../utils/auth';

export const SettingsPage: React.FC = () => {
  const [wifiOnly, setWifiOnly] = useState(false);

  const handleClearProgress = () => {
    if (window.confirm('¿Estás seguro de que quieres borrar todo el progreso? Esta acción no se puede deshacer.')) {
      clearAllProgress();
      window.location.reload();
    }
  };

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar tu sesión?')) {
      logout();
      window.location.reload();
    }
  };

  const SettingCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
  }> = ({ icon, title, children }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-blue-600">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen pb-20 pt-4">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-blue-600 mb-8">Configuración</h1>
        
        <div className="space-y-6">
          {/* Account */}
          <SettingCard icon={<User size={20} />} title="Cuenta">
            <div className="space-y-3">
              <button className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="text-gray-700">Perfil</span>
                <span className="text-gray-400">›</span>
              </button>
              <button className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <Bell size={16} className="text-gray-600" />
                  <span className="text-gray-700">Notificaciones</span>
                </div>
                <span className="text-gray-400">›</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full p-3 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Trash2 size={16} />
                <span>Cerrar sesión</span>
              </button>
            </div>
          </SettingCard>

          {/* Preferences */}
          <SettingCard icon={<Palette size={20} />} title="Preferencias">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Tema</span>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 rounded-full bg-gray-100 border"></div>
                  <span className="text-gray-600">Claro</span>
                  <span className="text-gray-400">/</span>
                  <div className="w-4 h-4 rounded-full bg-blue-600"></div>
                  <span className="text-blue-600 font-medium">Azul #004AAD</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Video size={16} className="text-gray-600" />
                  <span className="text-gray-700">Calidad de video</span>
                </div>
                <span className="text-gray-600 text-sm">Automática</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Wifi size={16} className="text-gray-600" />
                  <span className="text-gray-700">Descargar solo con Wi-Fi</span>
                </div>
                <button
                  onClick={() => setWifiOnly(!wifiOnly)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    wifiOnly ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      wifiOnly ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <button
                onClick={handleClearProgress}
                className="flex items-center gap-3 w-full p-3 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Trash2 size={16} />
                <span>Borrar progreso</span>
              </button>
            </div>
          </SettingCard>

          {/* About */}
          <SettingCard icon={<Info size={20} />} title="Acerca de">
            <div className="space-y-3">
              <button className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText size={16} className="text-gray-600" />
                  <span className="text-gray-700">Términos de Uso</span>
                </div>
                <span className="text-gray-400">›</span>
              </button>
              <button className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <Shield size={16} className="text-gray-600" />
                  <span className="text-gray-700">Política de Privacidad</span>
                </div>
                <span className="text-gray-400">›</span>
              </button>
              <div className="flex items-center justify-between p-3">
                <span className="text-gray-700">Versión</span>
                <span className="text-gray-600 text-sm">1.0.1</span>
              </div>
            </div>
          </SettingCard>
        </div>
      </div>
    </div>
  );
};