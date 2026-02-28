import React from "react";
import { Rank } from "../types";

const ranks: Rank[] = [
  {
    id: "vip",
    name: "VIP",
    price: 199,
    color: "bg-green-600",
    features: [
      "Префикс [VIP]",
      "Резервный слот",
      "Кит: Старт",
      "Полет в лобби",
      "5 регионов",
    ],
  },
  {
    id: "premium",
    name: "PREMIUM",
    price: 499,
    color: "bg-purple-600",
    popular: true,
    features: [
      "Все права VIP",
      "Префикс [Premium]",
      "Сохранение вещей",
      "Команда /feed",
      "Команда /heal",
      "10 регионов",
    ],
  },
  {
    id: "legend",
    name: "LEGEND",
    price: 999,
    color: "bg-orange-500",
    features: [
      "Все права Premium",
      "Цветной ник",
      "Полет /fly",
      "Свои варпы",
      "Приоритет в тикетах",
      "∞ регионов",
    ],
  },
];

const META: Record<string, { color: string; icon: string; subtitle: string }> =
  {
    vip: { color: "#27ae7a", icon: "⬡", subtitle: "Базовый" },
    premium: { color: "#6c5ce7", icon: "★", subtitle: "Популярный" },
    legend: { color: "#e07d2a", icon: "♦", subtitle: "Элитный" },
  };

export const Donate: React.FC = () => {
  return (
    <div
      style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: 80 }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "4rem 1.5rem" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <span
            className="section-label"
            style={{ marginBottom: "1rem", display: "inline-flex" }}
          >
            Поддержать сервер
          </span>
        </div>
        <div style={{ textAlign: "center", marginBottom: "0.75rem" }}>
          <h1 className="page-title">Магазин</h1>
        </div>
        <p
          style={{
            textAlign: "center",
            color: "#4a6880",
            marginBottom: "2.5rem",
            maxWidth: 480,
            margin: "0 auto 2.5rem",
          }}
        >
          Покупка привилегий помогает серверу жить и развиваться. Все права —
          навсегда.
        </p>

        {/* Notice */}
        <div
          style={{
            background: "#fff8e6",
            border: "1px solid #f0d080",
            borderRadius: 12,
            padding: ".85rem 1.2rem",
            textAlign: "center",
            fontSize: ".9rem",
            color: "#8a6820",
            marginBottom: "2.5rem",
          }}
        >
          ⚠️ Магазин откроется вместе с запуском сервера
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {ranks.map((rank, i) => {
            const m = META[rank.id];
            return (
              <div
                key={rank.id}
                className={`rank-card rank-${rank.id}`}
                style={{
                  padding: "2rem 1.75rem",
                  animationDelay: `${i * 0.12}s`,
                }}
              >
                {rank.popular && (
                  <div style={{ position: "absolute", top: 18, right: 18 }}>
                    <span className="badge-popular">Хит!</span>
                  </div>
                )}

                {/* Icon */}
                <div
                  style={{
                    fontSize: "2.5rem",
                    color: m.color,
                    marginBottom: "0.75rem",
                    lineHeight: 1,
                  }}
                >
                  {m.icon}
                </div>

                {/* Subtitle */}
                <div
                  style={{
                    fontSize: ".75rem",
                    fontWeight: 600,
                    color: m.color,
                    textTransform: "uppercase",
                    letterSpacing: ".08em",
                    marginBottom: ".4rem",
                    opacity: 0.8,
                  }}
                >
                  {m.subtitle}
                </div>

                {/* Name */}
                <div
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontWeight: 700,
                    fontSize: "1.4rem",
                    color: "#1a2c3d",
                    marginBottom: ".25rem",
                  }}
                >
                  [{rank.name}]
                </div>

                {/* Price */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 4,
                    marginBottom: "1.5rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Orbitron, sans-serif",
                      fontWeight: 800,
                      fontSize: "2.2rem",
                      color: m.color,
                    }}
                  >
                    {rank.price}
                  </span>
                  <span
                    style={{ color: m.color, fontWeight: 600, opacity: 0.8 }}
                  >
                    ₽
                  </span>
                </div>

                <div
                  style={{
                    height: 1,
                    background: `linear-gradient(90deg, ${m.color}33, transparent)`,
                    marginBottom: "1.25rem",
                  }}
                />

                {/* Features */}
                <div style={{ flex: 1, marginBottom: "1.5rem" }}>
                  {rank.features.map((f) => (
                    <div
                      key={f}
                      className="feat"
                      style={{ "--rc": m.color } as React.CSSProperties}
                    >
                      {f}
                    </div>
                  ))}
                </div>

                {/* Button */}
                <button
                  style={{
                    width: "100%",
                    padding: ".75rem",
                    background: `${m.color}14`,
                    border: `1.5px solid ${m.color}55`,
                    borderRadius: 10,
                    color: m.color,
                    fontWeight: 700,
                    fontSize: ".9rem",
                    cursor: "pointer",
                    transition: "all .2s",
                    letterSpacing: ".04em",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      `${m.color}26`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      `${m.color}14`;
                  }}
                >
                  Скоро
                </button>
              </div>
            );
          })}
        </div>

        {/* Info strip */}
        <div
          style={{
            marginTop: "2.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.5rem",
            background: "#fff",
            border: "1px solid var(--border)",
            borderRadius: 16,
            padding: "2rem",
          }}
        >
          {[
            {
              icon: "⚡",
              title: "Моментально",
              desc: "Активация сразу после оплаты",
            },
            { icon: "♾️", title: "Навсегда", desc: "Без сроков и ограничений" },
            {
              icon: "🛡️",
              title: "Безопасно",
              desc: "Защищённые платёжные системы",
            },
          ].map((x) => (
            <div key={x.title} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", marginBottom: ".5rem" }}>
                {x.icon}
              </div>
              <div
                style={{
                  fontWeight: 700,
                  color: "#1a2c3d",
                  marginBottom: ".3rem",
                }}
              >
                {x.title}
              </div>
              <div style={{ fontSize: ".85rem", color: "#8aaabb" }}>
                {x.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
