import React from "react";
import { Rank } from "../types";

const ranks: Rank[] = [
  {
    id: "vip",
    name: "VIP",
    price: 199,
    color: "",
    features: [
      "Префикс [VIP]",
      "Резервный слот",
      "Кит: Старт",
      "Полёт в лобби",
      "5 регионов",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 499,
    color: "",
    popular: true,
    features: [
      "Все права VIP",
      "Префикс [Premium]",
      "Сохранение вещей",
      "/feed и /heal",
      "10 регионов",
      "Приоритет входа",
    ],
  },
  {
    id: "legend",
    name: "Legend",
    price: 999,
    color: "",
    features: [
      "Все права Premium",
      "Цветной ник",
      "Полёт в мире /fly",
      "Свои варпы",
      "Приоритет в тикетах",
      "∞ регионов",
    ],
  },
];

const META: Record<string, { color: string; label: string }> = {
  vip: { color: "#22c55e", label: "Базовый" },
  premium: { color: "#818cf8", label: "Популярный" },
  legend: { color: "#f97316", label: "Элитный" },
};

export const Donate: React.FC = () => (
  <div style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: 60 }}>
    <div className="container" style={{ paddingTop: 72, paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ maxWidth: 520, marginBottom: 56 }}>
        <div className="tag" style={{ marginBottom: 14 }}>
          Магазин
        </div>
        <h1 style={{ fontSize: 42, fontWeight: 800, marginBottom: 14 }}>
          Привилегии сервера
        </h1>
        <p style={{ color: "var(--t2)", fontSize: 16, lineHeight: 1.65 }}>
          Поддержи развитие IceTale и получи постоянные права. Всё активируется
          сразу после оплаты.
        </p>
      </div>

      {/* Notice */}
      <div
        style={{
          background: "rgba(234,179,8,0.08)",
          border: "1px solid rgba(234,179,8,0.2)",
          borderRadius: 10,
          padding: "12px 18px",
          fontSize: 14,
          color: "rgba(234,179,8,0.9)",
          marginBottom: 32,
          display: "inline-block",
        }}
      >
        ⚠ Магазин откроется с запуском сервера
      </div>

      {/* Cards */}
      <div className="grid-3" style={{ alignItems: "start" }}>
        {ranks.map((rank) => {
          const m = META[rank.id];
          return (
            <div key={rank.id} className={`rank-card rank-${rank.id}`}>
              <div className="rank-card-top" />
              <div style={{ padding: "24px 24px 28px" }}>
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: m.color,
                        textTransform: "uppercase",
                        letterSpacing: ".06em",
                        marginBottom: 4,
                      }}
                    >
                      {m.label}
                    </div>
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 700,
                        color: "var(--t1)",
                      }}
                    >
                      [{rank.name}]
                    </div>
                  </div>
                  {rank.popular && (
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: ".06em",
                        textTransform: "uppercase",
                        background: "#818cf8",
                        color: "#fff",
                        padding: "4px 10px",
                        borderRadius: 20,
                      }}
                    >
                      Хит
                    </span>
                  )}
                </div>

                {/* Price */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 4,
                    marginBottom: 24,
                  }}
                >
                  <span className="rank-price" style={{ color: m.color }}>
                    {rank.price}
                  </span>
                  <span className="rank-currency">₽</span>
                </div>

                {/* Features */}
                <div style={{ marginBottom: 24 }}>
                  {rank.features.map((f) => (
                    <div key={f} className="rank-feat">
                      <div className="rank-feat-check">✓</div>
                      {f}
                    </div>
                  ))}
                </div>

                <button className="rank-btn">Скоро</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer info */}
      <div className="card" style={{ marginTop: 32 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 0,
          }}
        >
          {[
            {
              icon: "⚡",
              title: "Моментально",
              desc: "Активация сразу после оплаты",
            },
            { icon: "∞", title: "Навсегда", desc: "Без срока действия" },
            {
              icon: "🔒",
              title: "Безопасно",
              desc: "Защищённые платёжные системы",
            },
          ].map((x, i) => (
            <div
              key={x.title}
              style={{
                padding: "24px 28px",
                borderRight: i < 2 ? "1px solid var(--line)" : "none",
                display: "flex",
                gap: 14,
                alignItems: "flex-start",
              }}
            >
              <span style={{ fontSize: 22, lineHeight: 1 }}>{x.icon}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>
                  {x.title}
                </div>
                <div style={{ fontSize: 13, color: "var(--t2)" }}>{x.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
