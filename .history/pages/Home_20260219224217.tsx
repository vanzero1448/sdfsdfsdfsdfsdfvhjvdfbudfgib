import React, { useState } from "react";
import { Copy, Check, ArrowRight, ExternalLink } from "lucide-react";
import { Page } from "../types";

interface Props {
  onNavigate: (p: Page) => void;
}

export const Home: React.FC<Props> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText("play.icetale.net").catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50%       { transform: translateY(-14px) rotate(1deg); }
        }
        .survival-img {
          animation: float 5s ease-in-out infinite;
          filter: drop-shadow(0 20px 40px rgba(59,130,246,0.25));
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg">
        <img src="" alt=""/>
        </div>
        <div className="hero-scrim" />

        <div className="container hero-content" style={{ width: "100%" }}>
          <div style={{ maxWidth: 600 }}>
            <div className="fade-in d1" style={{ marginBottom: 24 }}>
              <div className="status-pill">
                <div className="online-dot" />
                <span style={{ color: "var(--t2)" }}>
                  Сервер работает · Hytale Alpha
                </span>
              </div>
            </div>

            <h1
              className="fade-up d2"
              style={{
                fontSize: 72,
                fontWeight: 800,
                color: "#fff",
                marginBottom: 20,
                lineHeight: 1.05,
              }}
            >
              Мир
              <br />
              вечного
              <br />
              <span style={{ color: "var(--blue)" }}>льда</span>
            </h1>

            <p
              className="fade-up d3"
              style={{
                fontSize: 17,
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.7,
                marginBottom: 36,
                maxWidth: 460,
              }}
            >
              Строй крепости, собирай кланы, исследуй магию севера. IceTale —
              Hytale-сервер нового поколения.
            </p>

            <div
              className="fade-up d4"
              style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
            >
              <button
                className="btn btn-blue btn-lg"
                onClick={() => onNavigate(Page.DONATE)}
              >
                Начать играть <ArrowRight size={16} />
              </button>
              <button className="btn btn-ghost btn-lg" onClick={copy}>
                {copied ? (
                  <>
                    <Check size={15} /> Скопировано
                  </>
                ) : (
                  <>
                    <Copy size={15} /> play.icetale.net
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            opacity: 0.35,
          }}
        >
          <div
            style={{
              width: 1,
              height: 48,
              background: "linear-gradient(to bottom, white, transparent)",
            }}
          />
        </div>
      </section>

      {/* ── MODES ── */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div style={{ marginBottom: 36 }}>
            <div className="tag" style={{ marginBottom: 12 }}>
              Игровые режимы
            </div>
            <h2 style={{ fontSize: 34, fontWeight: 700 }}>Выбери режим игры</h2>
          </div>

          {/* Server card */}
          <div
            className="card"
            style={{ marginBottom: 12, overflow: "visible" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 0,
              }}
            >
              {/* Floating image side */}
              <div
                style={{
                  width: 220,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "24px 16px 24px 28px",
                }}
              >
                <img
                  src="/img/survival.jpg"
                  alt="Survival ONE"
                  className="survival-img"
                  style={{
                    width: "100%",
                    maxWidth: 170,
                    height: "auto",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>

              {/* Divider */}
              <div
                style={{
                  width: 1,
                  alignSelf: "stretch",
                  background: "var(--line)",
                  flexShrink: 0,
                }}
              />

              {/* Content */}
              <div style={{ flex: 1, padding: "24px 28px", minWidth: 220 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 10,
                  }}
                >
                  <div className="pill">Доступен</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700 }}>
                    Survival ONE
                  </h3>
                </div>

                <p
                  style={{
                    color: "var(--t2)",
                    fontSize: 14,
                    lineHeight: 1.65,
                    marginBottom: 20,
                  }}
                >
                  Хардкорное выживание с уникальной генерацией мира, магическими
                  артефактами и системой кланов.
                </p>

                {/* Slots */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{
                      background: "var(--bg-2)",
                      border: "1px solid var(--line)",
                      borderRadius: 8,
                      padding: "8px 16px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      minWidth: 80,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 22,
                        fontWeight: 700,
                        color: "var(--t1)",
                        letterSpacing: "-0.04em",
                        lineHeight: 1,
                      }}
                    >
                      500
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: "var(--t3)",
                        textTransform: "uppercase",
                        letterSpacing: ".07em",
                        marginTop: 3,
                      }}
                    >
                      слотов
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button
                    className="btn btn-blue btn-sm"
                    onClick={() => onNavigate(Page.DONATE)}
                  >
                    Играть <ArrowRight size={13} />
                  </button>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => onNavigate(Page.COMMUNITY)}
                  >
                    Подробнее
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Coming soon */}
          <div
            style={{
              border: "1px dashed rgba(255,255,255,0.07)",
              borderRadius: 12,
              padding: "14px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "var(--t3)",
            }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>
                Новый режим
              </div>
              <div style={{ fontSize: 13 }}>В разработке</div>
            </div>
            <div style={{ fontSize: 18, opacity: 0.3 }}>···</div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          background: "var(--bg-1)",
          padding: "72px 0",
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div className="tag" style={{ marginBottom: 14 }}>
            Присоединяйся
          </div>
          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>
            Готов начать?
          </h2>
          <p
            style={{
              color: "var(--t2)",
              fontSize: 15,
              marginBottom: 28,
              maxWidth: 360,
            }}
          >
            Купи привилегию и поддержи развитие сервера.
          </p>
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <button
              className="btn btn-blue btn-lg"
              onClick={() => onNavigate(Page.DONATE)}
            >
              В магазин
            </button>
            <a
              href="https://t.me/icetale"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-lg"
              style={{ textDecoration: "none" }}
            >
              Telegram <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
