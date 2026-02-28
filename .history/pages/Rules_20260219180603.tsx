import React from "react";
import { ExternalLink } from "lucide-react";

export const Rules: React.FC = () => {
  return (
    <div
      className="min-h-screen pt-24 pb-16 px-6"
      style={{ background: "var(--bg-void)" }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-block font-pixel text-sm tracking-widest px-4 py-1 mb-4"
            style={{
              color: "var(--text-muted)",
              border: "1px solid rgba(0,212,255,0.15)",
              background: "rgba(0,212,255,0.03)",
            }}
          >
            / КОДЕКС СЕРВЕРА /
          </div>
          <div className="page-header mb-3" data-text="ПРАВИЛА">
            ПРАВИЛА
          </div>
        </div>

        {/* Construction notice */}
        <div
          className="ice-card p-12 text-center fade-up"
          style={{
            background:
              "linear-gradient(135deg, var(--bg-card) 0%, #0a1828 100%)",
          }}
        >
          {/* Animated icon */}
          <div
            className="text-6xl mb-8 inline-block"
            style={{
              animation: "spin 15s linear infinite",
              color: "rgba(0,212,255,0.3)",
            }}
          >
            ❄
          </div>

          <div
            className="font-pixel text-3xl tracking-widest mb-4"
            style={{ color: "var(--cyan-ice)" }}
          >
            В РАЗРАБОТКЕ
          </div>

          <div
            className="font-mono text-sm mb-8 max-w-md mx-auto"
            style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}
          >
            Кодекс чести IceTale создаётся прямо сейчас. Наши правила будут
            справедливыми и понятными для каждого путника.
          </div>

          {/* Progress bar */}
          <div className="max-w-xs mx-auto mb-8">
            <div
              className="flex justify-between font-mono text-xs mb-2"
              style={{ color: "var(--text-muted)" }}
            >
              <span>ПРОГРЕСС</span>
              <span>42%</span>
            </div>
            <div
              style={{
                height: 6,
                background: "rgba(0,212,255,0.1)",
                border: "1px solid rgba(0,212,255,0.15)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: "42%",
                  background:
                    "linear-gradient(90deg, var(--cyan-dim), var(--cyan-ice))",
                  boxShadow: "0 0 10px rgba(0,212,255,0.5)",
                  animation: "pulse 2s ease-in-out infinite",
                }}
              />
            </div>
          </div>

          <a
            href="https://t.me/icetale"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-ice text-lg inline-flex items-center gap-2"
            style={{ textDecoration: "none" }}
          >
            TELEGRAM-КАНАЛ <ExternalLink size={14} />
          </a>
        </div>

        {/* Preview rules (placeholder) */}
        <div className="mt-8 grid gap-4">
          {[
            "Общие правила поведения",
            "PvP и взаимодействие",
            "Постройки и территории",
            "Администрация",
          ].map((section, i) => (
            <div
              key={section}
              className="fade-up flex items-center justify-between p-4"
              style={{
                animationDelay: `${i * 0.1 + 0.3}s`,
                background: "rgba(0,0,0,0.3)",
                border: "1px dashed rgba(0,212,255,0.1)",
                opacity: 0.5,
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="font-pixel text-lg"
                  style={{ color: "var(--text-muted)" }}
                >
                  {String(i + 1).padStart(2, "0")}.
                </span>
                <span
                  className="font-pixel text-lg tracking-wider"
                  style={{ color: "var(--text-muted)" }}
                >
                  {section}
                </span>
              </div>
              <div
                className="font-mono text-xs px-2 py-1"
                style={{
                  color: "var(--text-muted)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                СКОРО
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
