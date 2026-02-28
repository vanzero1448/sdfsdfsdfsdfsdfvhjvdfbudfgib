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
        {/* Логотип без текста */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="/img/ice.png"
            alt="Pixel Logo"
            style={{ width: 28, height: 28, objectFit: "contain" }}
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: 20,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {["Rules", "Terms of Service", "Privacy Policy"].map((l) => (
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
          © 2024 Pixel. .
        </p>
      </div>
    </div>
  </footer>
);
