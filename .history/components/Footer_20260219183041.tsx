import React from "react";

export const Footer: React.FC = () => (
  <footer
    style={{
      background: "#fff",
      borderTop: "1px solid var(--border)",
      padding: "2.5rem 1.5rem",
    }}
  >
    <div
      style={{
        maxWidth: 960,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.25rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: 6,
            background: "linear-gradient(135deg, #2a9dc4, #1a7a99)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: ".85rem",
          }}
        >
          ❄
        </div>
        <span
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontWeight: 800,
            fontSize: "1rem",
            color: "#1a2c3d",
            letterSpacing: ".08em",
          }}
        >
          ICE<span style={{ color: "#2a9dc4" }}>TALE</span>
        </span>
      </div>
      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        {["Правила", "Оферта", "Приватность"].map((l, i) => (
          <React.Fragment key={l}>
            <a href="#" className="footer-link">
              {l}
            </a>
            {i < 2 && (
              <span style={{ color: "#d0dde9", fontSize: ".7rem" }}>•</span>
            )}
          </React.Fragment>
        ))}
      </div>
      <p style={{ fontSize: ".82rem", color: "#8aaabb" }}>
        © 2024 IceTale Server. Все права защищены.
      </p>
    </div>
  </footer>
);
