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
      {/* ── HERO ── */}
      <section className="hero">
        <div
          className="hero-bg"
          style={{ backgroundImage: "url(/img/view.jpeg)" }}
        />
        <div className="hero-scrim" />

        <div className="container hero-content" style={{ width: "100%" }}>
          <div style={{ maxWidth: 640 }}>
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
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.7,
                marginBottom: 36,
                maxWidth: 480,
              }}
            >
              Строй крепости, собирай кланы, исследуй магию севера. IceTale —
              Hytale-сервер нового поколения.
            </p>

            <div
              className="fade-up d4"
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                alignItems: "center",
              }}
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

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            opacity: 0.4,
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
          <div className="section-head">
            <div className="tag" style={{ marginBottom: 14 }}>
              Игровые режимы
            </div>
            <h2 style={{ fontSize: 38, fontWeight: 700, color: "var(--t1)" }}>
              Один мир.
              <br />
              <span style={{ color: "var(--t2)" }}>
                Бесконечные возможности.
              </span>
            </h2>
          </div>

          {/* Active mode */}
          <div className="card" style={{ marginBottom: 12 }}>
            <div
              className="card-inner"
              style={{ display: "flex", gap: 40, flexWrap: "wrap" }}
            >
              <div style={{ flex: 1, minWidth: 260 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 16,
                  }}
                >
                  <div className="pill">Доступен</div>
                  <h3 style={{ fontSize: 22, fontWeight: 700 }}>
                    Survival ONE
                  </h3>
                </div>
                <p
                  style={{
                    color: "var(--t2)",
                    lineHeight: 1.7,
                    marginBottom: 24,
                    fontSize: 15,
                  }}
                >
                  Хардкорное выживание с уникальной генерацией мира, магическими
                  артефактами и полноценной системой кланов для командной игры.
                </p>
                <div style={{ marginBottom: 24 }}>
                  {[
                    "Уникальная генерация мира",
                    "Кланы и захват территорий",
                    "Магические посохи и артефакты",
                    "PvP-арены и рейды",
                    "Кастомные боссы",
                    "Экономика и торговля",
                  ].map((f) => (
                    <div key={f} className="feat-row">
                      {f}
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button
                    className="btn btn-blue"
                    onClick={() => onNavigate(Page.DONATE)}
                  >
                    Играть <ArrowRight size={15} />
                  </button>
                  <button
                    className="btn btn-ghost"
                    onClick={() => onNavigate(Page.COMMUNITY)}
                  >
                    Подробнее
                  </button>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  minWidth: 180,
                }}
              >
                {[
                  ["Онлайн", "—"],
                  ["Слоты", "500"],
                  ["Uptime", "99.9%"],
                  ["Версия", "Alpha"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="stat-item"
                    style={{
                      borderRadius: 10,
                      marginBottom: 8,
                      background: "var(--bg-2)",
                    }}
                  >
                    <div className="stat-label">{k}</div>
                    <div className="stat-value">{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Coming soon */}
          <div
            style={{
              border: "1px dashed rgba(255,255,255,0.08)",
              borderRadius: 14,
              padding: "18px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "var(--t3)",
            }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 3 }}>
                Новый режим
              </div>
              <div style={{ fontSize: 13 }}>
                В разработке · следи за обновлениями
              </div>
            </div>
            <div style={{ fontSize: 22, opacity: 0.3 }}>···</div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          background: "var(--bg-1)",
          padding: "80px 0",
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
          <div className="tag" style={{ marginBottom: 16 }}>
            Присоединяйся
          </div>
          <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12 }}>
            Готов начать?
          </h2>
          <p
            style={{
              color: "var(--t2)",
              fontSize: 16,
              marginBottom: 32,
              maxWidth: 400,
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
