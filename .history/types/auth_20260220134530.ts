export interface User {
  id: string;
  uuid: string;
  login: string;
  password: string;
}

export interface LauncherTokens {
  success: true;
  identity_token: string;
  session_token: string;
  uuid: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  tokens?: LauncherTokens;
  error?: string;
}
