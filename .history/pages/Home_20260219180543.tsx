import React, { useEffect, useState } from "react";
import { Page } from "../types";
import { ExternalLink, ChevronRight } from "lucide-react";

interface HomeProps {
  onNavigate: (page: Page) => void;
}

const SERVER_IP = "play.icetale.net";

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((p) => p + 1), 500);
    return () => clearInterval(t);
  }, []);

  const handleCopyIP = () => {
    navigator.clipboard.writeText(SERVER_IP).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ background: "var(--bg-void)" }}>
      {/* ===== HERO ===== */}
      <section
        className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
        style={{ paddingTop: 80 }}
      >
        {/* Background layers */}
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,100,160,0.15) 0%, transparent 70%)," +
              "radial-gradient(ellipse 40% 30% at 20% 80%, rgba(0,60,100,0.1) 0%, transparent 60%)," +
              "radial-gradient(ellipse 40% 30% at 80% 20%, rgba(0,60,100,0.08) 0%, transparent 60%)",
          }}
        />

        {/* Decorative hex rings */}
        {[200, 350, 500].map((size, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              width: size,
              height: size,
              border: `1px solid rgba(0,212,255,${0.06 - i * 0.015})`,
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              animation: `spin ${30 + i * 15}s linear infinite ${i % 2 === 0 ? "" : "reverse"}`,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}

        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl">
          {/* Subtitle tag */}
          <div
            className="fade-up font-pixel text-lg tracking-widest mb-6 px-6 py-2"
            style={{
              color: "var(--cyan-ice)",
              border: "1px solid rgba(0,212,255,0.25)",
              background: "rgba(0,212,255,0.05)",
              clipPath:
                "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
            }}
          >
            ❄ HYTALE SERVER — ALPHA ❄
          </div>

          {/* Main title */}
          <h1 className="hero-title fade-up delay-1 mb-4">ICETALE</h1>

          {/* Tagline */}
          <p
            className="fade-up delay-2 font-mono text-lg mb-10 max-w-xl"
            style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}
          >
            Мир вечной мерзлоты и магии. Построй крепость. Стань легендой
            севера.
          </p>

          {/* Terminal block */}
          <div
            className="fade-up delay-3 w-full max-w-md mb-10 px-6 py-4 text-left"
            style={{
              background: "rgba(4,8,15,0.8)",
              border: "1px solid rgba(0,212,255,0.2)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              className="flex items-center gap-2 mb-3"
              style={{
                borderBottom: "1px solid rgba(0,212,255,0.1)",
                paddingBottom: "0.5rem",
              }}
            >
              {["#e74c3c", "#f39c12", "#2ecc71"].map((c) => (
                <div
                  key={c}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: c,
                  }}
                />
              ))}
              <span
                className="font-mono text-xs ml-2"
                style={{ color: "var(--text-muted)" }}
              >
                icetale.terminal
              </span>
            </div>
            {[
              ["Режим", "Survival ONE"],
              ["Версия", "Hytale Alpha"],
              ["IP", SERVER_IP],
              ["Статус", "● ONLINE"],
            ].map(([label, val]) => (
              <div key={label} className="terminal-line">
                <span className="terminal-prompt">{">"}</span>
                <span
                  style={{ color: "var(--text-muted)", marginRight: "0.5rem" }}
                >
                  {label}:
                </span>
                <span
                  className="terminal-value"
                  style={
                    label === "Статус"
                      ? { color: "var(--green-rank)" }
                      : undefined
                  }
                >
                  {val}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="fade-up delay-4 flex flex-wrap gap-4 justify-center">
            <button
              className="btn-ice text-xl"
              onClick={() => onNavigate(Page.DONATE)}
            >
              ❄ НАЧАТЬ ИГРУ
            </button>
            <button className="btn-outline-ice text-xl" onClick={handleCopyIP}>
              {copied ? "✓ СКОПИРОВАНО" : "⊕ КОПИРОВАТЬ IP"}
            </button>
            <a
              href="https://t.me/icetale"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-ice text-xl flex items-center gap-2"
              style={{ textDecoration: "none" }}
            >
              TELEGRAM <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          style={{ opacity: 0.4 }}
        >
          <div
            className="font-mono text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            SCROLL
          </div>
          <div
            style={{
              width: 1,
              height: 40,
              background:
                "linear-gradient(to bottom, rgba(0,212,255,0.5), transparent)",
              animation: "pulse 2s infinite",
            }}
          />
        </div>
      </section>

      {/* ===== SERVERS SECTION ===== */}
      <section
        className="py-24 px-6"
        style={{
          background:
            "linear-gradient(180deg, var(--bg-void) 0%, var(--bg-deep) 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="page-header mb-2" data-text="ВЫБЕРИ РЕЖИМ">
              ВЫБЕРИ РЕЖИМ
            </div>
            <p
              className="font-mono text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              — Доступные игровые режимы сервера —
            </p>
          </div>

          {/* Mode card */}
          <div
            className="ice-card animated-border relative overflow-hidden"
            style={{
              padding: "3rem",
              background:
                "linear-gradient(135deg, var(--bg-card) 0%, #0a1828 100%)",
            }}
          >
            {/* Corner decoration */}
            <div
              className="absolute top-0 right-0 font-pixel text-6xl"
              style={{
                color: "rgba(0,212,255,0.05)",
                lineHeight: 1,
                padding: "0.5rem",
              }}
            >
              ❄
            </div>

            <div className="flex flex-col lg:flex-row gap-10 items-start">
              {/* Mode info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    style={{
                      background:
                        "linear-gradient(135deg, var(--cyan-ice), var(--cyan-dim))",
                      padding: "0.3rem 0.8rem",
                      clipPath:
                        "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                    }}
                  >
                    <span className="font-pixel text-sm tracking-widest text-black">
                      AVAILABLE
                    </span>
                  </div>
                  <div className="pulse-dot" />
                </div>

                <h2
                  className="font-orb font-bold mb-3"
                  style={{
                    fontSize: "2.2rem",
                    color: "white",
                    letterSpacing: "0.1em",
                  }}
                >
                  SURVIVAL ONE
                </h2>
                <p
                  className="font-mono mb-6"
                  style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}
                >
                  Погрузись в суровый мир выживания с уникальными механиками,
                  магическими артефактами и системой кланов.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                  {[
                    "Уникальная генерация мира",
                    "Система кланов и земель",
                    "Магические посохи и артефакты",
                    "PvP-арены и рейды",
                    "Кастомные боссы",
                    "Экономика и торговля",
                  ].map((feat) => (
                    <div
                      key={feat}
                      className="feature-item"
                      style={
                        {
                          "--rank-color": "var(--cyan-ice)",
                        } as React.CSSProperties
                      }
                    >
                      {feat}
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 flex-wrap">
                  <button
                    className="btn-ice text-lg"
                    onClick={() => onNavigate(Page.DONATE)}
                  >
                    ИГРАТЬ
                  </button>
                  <button
                    className="btn-outline-ice text-lg flex items-center gap-2"
                    onClick={() => onNavigate(Page.COMMUNITY)}
                  >
                    ПОДРОБНЕЕ <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* Stats panel */}
              <div className="flex flex-col gap-3 w-full lg:w-48">
                {[
                  { label: "ОНЛАЙН", value: "—", desc: "игроков" },
                  { label: "СЛОТЫ", value: "500", desc: "максимум" },
                  { label: "UPTIME", value: "99.9%", desc: "стабильность" },
                  { label: "ВЕРСИЯ", value: "α", desc: "Hytale" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-3"
                    style={{
                      background: "rgba(0,0,0,0.3)",
                      border: "1px solid rgba(0,212,255,0.12)",
                    }}
                  >
                    <div
                      className="font-pixel text-xs tracking-widest mb-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {stat.label}
                    </div>
                    <div
                      className="font-orb font-bold text-2xl"
                      style={{ color: "var(--cyan-ice)" }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="font-mono text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {stat.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Coming soon card */}
          <div
            className="mt-6 p-6 flex items-center justify-between"
            style={{
              background: "rgba(0,0,0,0.3)",
              border: "1px dashed rgba(0,212,255,0.15)",
              opacity: 0.6,
            }}
          >
            <div>
              <div
                className="font-pixel text-xl tracking-widest"
                style={{ color: "var(--text-muted)" }}
              >
                ??? — В РАЗРАБОТКЕ
              </div>
              <div
                className="font-mono text-sm mt-1"
                style={{ color: "var(--text-muted)" }}
              >
                Новый режим — скоро
              </div>
            </div>
            <div
              className="font-pixel text-3xl"
              style={{ color: "rgba(0,212,255,0.2)" }}
            >
              ⠿
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
