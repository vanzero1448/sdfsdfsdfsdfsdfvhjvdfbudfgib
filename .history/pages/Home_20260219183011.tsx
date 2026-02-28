import React, { useState } from "react";
import { Page } from "../types";
import { ExternalLink, ChevronRight, Copy, Check } from "lucide-react";

interface HomeProps {
  onNavigate: (page: Page) => void;
}

const SERVER_IP = "play.icetale.net";

// Replace this with your actual video URL (mp4) or leave empty to show gradient only
const HERO_VIDEO = ""; // e.g. '/video/hero.mp4' or a CDN link

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);

  const copyIP = () => {
    navigator.clipboard.writeText(SERVER_IP).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Video / fallback */}
        <div className="hero-video-wrap">
          {HERO_VIDEO ? (
            <video autoPlay loop muted playsInline src={HERO_VIDEO} />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(135deg, #c8e6f5 0%, #daeef7 30%, #e8f4fb 60%, #d4e8f5 100%)",
              }}
            />
          )}
        </div>
        <div className="hero-overlay" />

        {/* Floating shapes */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          {[
            { s: 280, x: "8%", y: "15%", op: 0.06 },
            { s: 180, x: "85%", y: "10%", op: 0.05 },
            { s: 320, x: "75%", y: "60%", op: 0.07 },
            { s: 140, x: "15%", y: "70%", op: 0.05 },
          ].map((c, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: c.x,
                top: c.y,
                width: c.s,
                height: c.s,
                borderRadius: "50%",
                background: `radial-gradient(circle, rgba(42,157,196,${c.op}) 0%, transparent 70%)`,
                animation: `float${i % 2 === 0 ? "A" : "B"} ${8 + i * 2}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>

        <style>{`
          @keyframes floatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
          @keyframes floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(20px)} }
        `}</style>

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            padding: "0 1.5rem",
            maxWidth: 700,
            paddingTop: 80,
          }}
        >
          <div className="fade-up d1" style={{ marginBottom: "1.5rem" }}>
            <span className="section-label">❄ Hytale Server — Alpha</span>
          </div>

          <h1
            className="hero-title fade-up d2"
            style={{ marginBottom: "1.2rem" }}
          >
            ICE<span>TALE</span>
          </h1>

          <p
            className="fade-up d3"
            style={{
              fontSize: "1.15rem",
              color: "#4a6880",
              lineHeight: 1.75,
              marginBottom: "2.5rem",
              maxWidth: 520,
              margin: "0 auto 2.5rem",
            }}
          >
            Мир вечной мерзлоты и магии. Строй крепости, собирай кланы и стань
            легендой севера.
          </p>

          <div
            className="fade-up d4"
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              justifyContent: "center",
              marginBottom: "2.5rem",
            }}
          >
            <button
              className="btn btn-primary"
              onClick={() => onNavigate(Page.DONATE)}
            >
              Начать игру
            </button>
            <button className="btn btn-ghost" onClick={copyIP}>
              {copied ? (
                <>
                  <Check size={15} /> Скопировано
                </>
              ) : (
                <>
                  <Copy size={15} /> {SERVER_IP}
                </>
              )}
            </button>
            <a
              href="https://t.me/icetale"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              Telegram <ExternalLink size={14} />
            </a>
          </div>

          {/* Status strip */}
          <div
            className="fade-up d5"
            style={{
              display: "inline-flex",
              gap: 24,
              background: "rgba(255,255,255,.65)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(208,221,233,.8)",
              borderRadius: 14,
              padding: ".75rem 2rem",
            }}
          >
            {[
              ["Режим", "Survival ONE"],
              ["Версия", "Hytale α"],
              ["Статус", "● Online"],
            ].map(([k, v]) => (
              <div key={k} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: ".72rem",
                    color: "#8aaabb",
                    textTransform: "uppercase",
                    letterSpacing: ".06em",
                    fontWeight: 600,
                  }}
                >
                  {k}
                </div>
                <div
                  style={{
                    fontSize: ".9rem",
                    color: k === "Статус" ? "#27ae7a" : "#1a2c3d",
                    fontWeight: 600,
                    marginTop: 2,
                  }}
                >
                  {v}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            opacity: 0.45,
          }}
        >
          <div
            style={{
              width: 1,
              height: 36,
              background: "linear-gradient(to bottom, #2a9dc4, transparent)",
            }}
          />
          <span
            style={{
              fontSize: ".72rem",
              color: "#8aaabb",
              letterSpacing: ".1em",
              textTransform: "uppercase",
            }}
          >
            scroll
          </span>
        </div>
      </section>

      {/* ═══ MODES ═══ */}
      <section style={{ background: "#fff", padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div style={{ marginBottom: "1rem" }}>
              <span className="section-label">Игровые режимы</span>
            </div>
            <h2 className="page-title">Выбери режим</h2>
          </div>

          {/* Main mode card */}
          <div
            className="card"
            style={{
              padding: "2.5rem",
              marginBottom: "1.5rem",
              background: "linear-gradient(135deg, #fff 60%, #eef8fd 100%)",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <span className="section-label">● Доступен</span>
                <h3
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontWeight: 700,
                    fontSize: "1.6rem",
                    color: "#1a2c3d",
                  }}
                >
                  Survival ONE
                </h3>
              </div>

              <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 260 }}>
                  <p
                    style={{
                      color: "#4a6880",
                      lineHeight: 1.75,
                      marginBottom: "1.5rem",
                    }}
                  >
                    Классическое выживание с уникальными механиками, магическими
                    артефактами и системой кланов для командной игры.
                  </p>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "0.25rem 1.5rem",
                      marginBottom: "2rem",
                    }}
                  >
                    {[
                      "Уникальная генерация мира",
                      "Система кланов и земель",
                      "Магические артефакты",
                      "PvP-арены и рейды",
                      "Кастомные боссы",
                      "Экономика и торговля",
                    ].map((f) => (
                      <div
                        key={f}
                        className="feat"
                        style={{ "--rc": "#2a9dc4" } as React.CSSProperties}
                      >
                        {f}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <button
                      className="btn btn-primary"
                      onClick={() => onNavigate(Page.DONATE)}
                    >
                      Играть
                    </button>
                    <button
                      className="btn btn-ghost"
                      onClick={() => onNavigate(Page.COMMUNITY)}
                      style={{ display: "flex", alignItems: "center", gap: 5 }}
                    >
                      Подробнее <ChevronRight size={15} />
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    minWidth: 160,
                  }}
                >
                  {[
                    { label: "Онлайн", value: "—" },
                    { label: "Слоты", value: "500" },
                    { label: "Uptime", value: "99.9%" },
                    { label: "Версия", value: "Alpha" },
                  ].map((s) => (
                    <div key={s.label} className="stat-box">
                      <div className="stat-value">{s.value}</div>
                      <div className="stat-label">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Coming soon */}
          <div
            style={{
              border: "1.5px dashed #d0dde9",
              borderRadius: 14,
              padding: "1.5rem 2rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              opacity: 0.5,
            }}
          >
            <div>
              <div
                style={{ fontWeight: 600, color: "#4a6880", marginBottom: 4 }}
              >
                ??? — В разработке
              </div>
              <div style={{ fontSize: ".85rem", color: "#8aaabb" }}>
                Новый режим появится позже
              </div>
            </div>
            <div style={{ fontSize: "2rem", color: "#d0dde9" }}>⠿</div>
          </div>
        </div>
      </section>
    </div>
  );
};
