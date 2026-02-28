export interface User {
  id: string;
  uuid: string;
  login: string;
  password: string;
}

export interface LauncherTokens {
  success: boolean;
  identity_token: string;
  session_token: string;
  uuid: string;
}
