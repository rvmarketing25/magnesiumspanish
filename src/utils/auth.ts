import { AuthData } from '../types/auth';

export const isAuthValid = (): boolean => {
  try {
    const authData = localStorage.getItem('gm.auth');
    if (!authData) return false;
    
    const auth: AuthData = JSON.parse(authData);
    return auth && Date.now() < auth.expiresAt;
  } catch (e) {
    return false;
  }
};

export const login = (email: string, password: string, rememberMe: boolean): boolean => {
  if (password !== 'c789' || !email.trim()) {
    return false;
  }

  const now = Date.now();
  const days = rememberMe ? 30 : 1;
  const authData: AuthData = {
    email: email.trim(),
    ts: now,
    expiresAt: now + days * 24 * 60 * 60 * 1000
  };

  localStorage.setItem('gm.auth', JSON.stringify(authData));
  return true;
};

export const logout = (): void => {
  localStorage.removeItem('gm.auth');
  localStorage.removeItem('gm.redirect');
};

export const getRedirectPath = (): string => {
  const redirect = localStorage.getItem('gm.redirect');
  localStorage.removeItem('gm.redirect');
  return redirect || '/';
};

export const setRedirectPath = (path: string): void => {
  if (path !== '/login') {
    localStorage.setItem('gm.redirect', path);
  }
};

export const getAuthenticatedUser = (): { email: string } | null => {
  try {
    const authData = localStorage.getItem('gm.auth');
    if (!authData) return null;
    
    const auth: AuthData = JSON.parse(authData);
    if (Date.now() >= auth.expiresAt) {
      logout();
      return null;
    }
    
    return { email: auth.email };
  } catch (e) {
    return null;
  }
};