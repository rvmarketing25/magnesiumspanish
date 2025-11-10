import React, { useEffect, useState } from 'react';
import { isAuthValid, setRedirectPath } from '../utils/auth';

interface AuthGuardProps {
  children: React.ReactNode;
  currentPath: string;
  onRedirectToLogin: () => void;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  currentPath, 
  onRedirectToLogin 
}) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthValid();
      
      if (!authenticated && currentPath !== '/login') {
        setRedirectPath(currentPath);
        onRedirectToLogin();
        return;
      }
      
      setIsAuthenticated(authenticated);
      setIsChecking(false);
    };

    checkAuth();
  }, [currentPath, onRedirectToLogin]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  if (currentPath === '/login') {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return null; // Redirect has already been done
  }

  return <>{children}</>;
};