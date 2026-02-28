import React from "react";
import { ExternalLink } from "lucide-react";

export const Rules: React.FC = () => {
  return (
    <div
      style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: 80 }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "4rem 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span
            className="section-label"
            style={{ marginBottom: "1rem", display: "inline-flex" }}
          >
            Кодекс сервера
          </span>
          <h1 className="page-title" style={{ marginTop: "1rem" }}>
            Правила
          </h1>
        </div>

        {/* Main card */}
        <div
          className="card"
          style={{
            padding: "3rem",
            textAlign: "center",
            marginBottom: "1.5rem",
          }}
        >
          <div style={{ fontSize: "3.5rem", marginBottom: "1.25rem" }}>📜</div>
          <div
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontWeight: 700,
              fontSize: "1.3rem",
              color: "#1a2c3d",
              marginBottom: ".75rem",
            }}
          >
            В разработке
          </div>
          <p
            style={{
              color: "#4a6880",
              lineHeight: 1.75,
              marginBottom: "2rem",
              maxWidth: 380,
              margin: "0 auto 2rem",
            }}
          >
            Кодекс чести IceTale создаётся прямо сейчас. Следи за обновлениями в
            нашем Telegram-канале.
          </p>

          {/* Progress */}
          <div style={{ maxWidth: 300, margin: "0 auto 2rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: ".8rem",
                color: "#8aaabb",
                marginBottom: ".5rem",
                fontWeight: 500,
              }}
            >
              <span>Готовность</span>
              <span>42%</span>
            </div>
            <div
              style={{
                height: 6,
                background: "#eef3f8",
                borderRadius: 6,
                overflow: "hidden",
                border: "1px solid #d0dde9",
              }}
            >
              <div
                style={{
                  width: "42%",
                  height: "100%",
                  background: "linear-gradient(90deg, #2a9dc4, #5bbedd)",
                  borderRadius: 6,
                }}
              />
            </div>
          </div>

          <a
            href="https://t.me/icetale"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ textDecoration: "none" }}
          >
            Telegram-канал <ExternalLink size={14} />
          </a>
        </div>

        {/* Preview sections */}
        {[
          "Общие правила поведения",
          "PvP и взаимодействие",
          "Постройки и территории",
          "Администрация",
        ].map((s, i) => (
          <div
            key={s}
            className="rule-section"
            style={{ marginBottom: "0.5rem", animationDelay: `${i * 0.08}s` }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  fontWeight: 700,
                  color: "#d0dde9",
                  fontSize: "1.1rem",
                  fontFamily: "Orbitron, sans-serif",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontWeight: 500, color: "#8aaabb" }}>{s}</span>
            </div>
            <span
              style={{
                fontSize: ".75rem",
                fontWeight: 600,
                color: "#a0b8c8",
                background: "#f0f4f8",
                padding: ".2rem .7rem",
                borderRadius: 20,
                border: "1px solid #d0dde9",
              }}
            >
              Скоро
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
