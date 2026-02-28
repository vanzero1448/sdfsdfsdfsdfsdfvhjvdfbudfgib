const BASE = "/api/auth";

export interface AuthTokens {
  success: boolean;
  identity_token: string;
  session_token: string;
  uuid: string;
}

export interface AuthError {
  error: string;
}

async function request<T>(url: string, body: object): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Server error");
  return data;
}

export const authApi = {
  login: (login: string, password: string) =>
    request<AuthTokens>(`${BASE}/login`, { login, password }),

  register: (login: string, password: string) =>
    request<{ success: boolean; uuid: string; message: string }>(
      `${BASE}/register`,
      { login, password },
    ),

  refreshTokens: (token: string) =>
    request<AuthTokens>(`${BASE}/tokens`, { token }),
};
