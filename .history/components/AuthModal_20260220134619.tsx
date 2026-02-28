import React, { useState } from "react";
import { ArrowRight, Check, X } from "lucide-react";
import { Page } from "@/types";

interface Props {
  onClose: () => void;
  onLoginSuccess: (tokens: any) => void;
  onNavigate: (p: Page) => void;
}

export const AuthModal: React.FC<Props> = ({
  onClose,
  onLoginSuccess,
  onNavigate,
}) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    setLoading(true);
    setError("");

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });

      const data = await response.json();

      if (data.success || data.identity_token) {
        if (isLogin) {
          onLoginSuccess(data);
        } else {
          setIsLogin(true);
          setError("✅ Зарегистрирован! Теперь войдите.");
        }
      } else {
        setError(data.error || "Ошибка сервера");
      }
    } catch {
      setError("Ошибка соединения");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-var(--bg) border border-var(--line) rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-var(--line)">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {isLogin ? "Войти" : "Регистрация"}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-var(--bg-2)">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          <div>
            <input
              type="text"
              placeholder="Логин"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="w-full p-3 bg-var(--bg-2) border border-var(--line) rounded-xl focus:outline-none focus:border-blue-500"
              disabled={loading}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-var(--bg-2) border border-var(--line) rounded-xl focus:outline-none focus:border-blue-500"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={submit}
            disabled={loading || !login || !password}
            className="w-full btn btn-blue flex items-center justify-center gap-2"
          >
            {loading ? (
              "Загрузка..."
            ) : (
              <>
                {isLogin ? "Войти" : "Зарегистрироваться"}
                <ArrowRight size={16} />
              </>
            )}
          </button>

          <div className="text-center text-sm text-var(--t3) pt-2">
            {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 text-blue-400 hover:text-blue-300 font-medium"
              disabled={loading}
            >
              {isLogin ? "Зарегистрироваться" : "Войти"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
