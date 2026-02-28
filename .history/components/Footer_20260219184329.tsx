import React from "react";

export const Footer: React.FC = () => (
  <footer className="footer">
    <div className="container">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div
            className="logo-icon"
            style={{ width: 26, height: 26, fontSize: 12 }}
          >
            ❄
          </div>
          <span className="logo-text" style={{ fontSize: 14 }}>
            Ice<span>Tale</span>
          </span>
        </div>
        <div
          style={{
            display: "flex",
            gap: 20,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {["Правила", "Оферта", "Приватность"].map((l) => (
            <a
              key={l}
              href="#"
              style={{
                fontSize: 13,
                color: "var(--t3)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--t2)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--t3)")}
            >
              {l}
            </a>
          ))}
        </div>
        <p style={{ fontSize: 13, color: "var(--t3)" }}>
          © 2024 IceTale. Все права защищены.
        </p>
      </div>
    </div>
  </footer>
);
