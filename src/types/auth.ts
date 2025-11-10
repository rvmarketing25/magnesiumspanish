export interface AuthData {
  email: string;
  ts: number;
  expiresAt: number;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}