import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        background: "rgba(4, 8, 15, 0.95)",
        borderTop: "1px solid rgba(0, 212, 255, 0.12)",
      }}
    >
      <div className="ice-divider" />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span
              className="font-orb font-black tracking-widest"
              style={{
                color: "var(--cyan-ice)",
                fontSize: "1.2rem",
                textShadow: "0 0 15px rgba(0,212,255,0.4)",
              }}
            >
              ICETALE
            </span>
            <span
              className="font-mono text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              © 2024 IceTale Server. Все права защищены.
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {["Правила", "Оферта", "Приватность"].map((link, i) => (
              <React.Fragment key={link}>
                <a href="#" className="footer-link hover:text-sky-400">
                  {link}
                </a>
                {i < 2 && (
                  <span
                    style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}
                  >
                    ❄
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Version */}
          <div
            className="font-mono text-xs px-3 py-1"
            style={{
              color: "var(--text-muted)",
              border: "1px solid rgba(0,212,255,0.1)",
              background: "rgba(0,212,255,0.03)",
            }}
          >
            v1.0.0 — ALPHA
          </div>
        </div>
      </div>
    </footer>
  );
};
