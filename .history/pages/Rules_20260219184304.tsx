import React from "react";
import { ExternalLink } from "lucide-react";

const sections = [
  "Общие правила поведения",
  "PvP и взаимодействие",
  "Постройки и территории",
  "Чат и общение",
  "Администрация",
];

export const Rules: React.FC = () => (
  <div style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: 60 }}>
    <div className="container-sm" style={{ paddingTop: 72, paddingBottom: 80 }}>
      <div style={{ marginBottom: 52 }}>
        <div className="tag" style={{ marginBottom: 14 }}>
          Правила
        </div>
        <h1 style={{ fontSize: 42, fontWeight: 800, marginBottom: 14 }}>
          Кодекс IceTale
        </h1>
        <p style={{ color: "var(--t2)", fontSize: 16, lineHeight: 1.65 }}>
          Документ создаётся вместе с сервером. Следи за обновлениями.
        </p>
      </div>

      {/* Status */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div
          className="card-inner"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 6 }}>
              Документ в разработке
            </div>
            <div style={{ display: "flex", align: "center", gap: 10 }}>
              <div
                style={{ fontSize: 13, color: "var(--t2)", marginBottom: 12 }}
              >
                Готовность:{" "}
                <span style={{ color: "var(--blue)", fontWeight: 600 }}>
                  42%
                </span>
              </div>
            </div>
            <div
              style={{
                width: 220,
                height: 4,
                background: "var(--bg-3)",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "42%",
                  height: "100%",
                  background: "var(--blue)",
                  borderRadius: 4,
                }}
              />
            </div>
          </div>
          <a
            href="https://t.me/icetale"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-blue btn-sm"
            style={{ textDecoration: "none" }}
          >
            Telegram <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Sections preview */}
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {sections.map((s, i) => (
          <div
            key={s}
            style={{
              background: "var(--bg-1)",
              border: "1px solid var(--line)",
              borderRadius: 10,
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              opacity: 0.45,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: 13,
                  color: "var(--t3)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontWeight: 500, fontSize: 15 }}>{s}</span>
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: ".06em",
                textTransform: "uppercase",
                color: "var(--t3)",
                background: "var(--bg-2)",
                border: "1px solid var(--line)",
                padding: "3px 10px",
                borderRadius: 20,
              }}
            >
              Скоро
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
