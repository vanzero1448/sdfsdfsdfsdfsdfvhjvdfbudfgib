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
      "Полёт /fly",
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
      <div style={{ maxWidth: 480, marginBottom: 48 }}>
        <div className="tag" style={{ marginBottom: 14 }}>
          Магазин
        </div>
        <h1 style={{ fontSize: 40, fontWeight: 800, marginBottom: 12 }}>
          Привилегии
        </h1>
        <p style={{ color: "var(--t2)", fontSize: 15, lineHeight: 1.65 }}>
          Поддержи развитие IceTale и получи постоянные права.
        </p>
      </div>

      <div
        style={{
          background: "rgba(234,179,8,0.07)",
          border: "1px solid rgba(234,179,8,0.18)",
          borderRadius: 8,
          padding: "10px 16px",
          fontSize: 14,
          color: "rgba(234,179,8,0.85)",
          marginBottom: 28,
          display: "inline-block",
        }}
      >
        ⚠ Магазин откроется с запуском сервера
      </div>

      {/* Equal-height grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 14,
          alignItems: "stretch",
        }}
      >
        {ranks.map((rank) => {
          const m = META[rank.id];
          return (
            <div
              key={rank.id}
              className={`rank-card rank-${rank.id}`}
              style={{ "--rc": m.color } as React.CSSProperties}
            >
              <div className="rank-card-top" />
              <div
                style={{
                  padding: "22px 22px 24px",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 16,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: m.color,
                        textTransform: "uppercase",
                        letterSpacing: ".07em",
                        marginBottom: 3,
                      }}
                    >
                      {m.label}
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 700 }}>
                      [{rank.name}]
                    </div>
                  </div>
                  {rank.popular && (
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: ".05em",
                        textTransform: "uppercase",
                        background: "#818cf8",
                        color: "#fff",
                        padding: "3px 9px",
                        borderRadius: 20,
                      }}
                    >
                      Хит
                    </span>
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 3,
                    marginBottom: 20,
                  }}
                >
                  <span
                    style={{
                      fontSize: 34,
                      fontWeight: 700,
                      letterSpacing: "-0.04em",
                      color: m.color,
                    }}
                  >
                    {rank.price}
                  </span>
                  <span
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "var(--t3)",
                    }}
                  >
                    ₽
                  </span>
                </div>

                <div style={{ flex: 1, marginBottom: 20 }}>
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

      <div className="card" style={{ marginTop: 28 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
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
                padding: "22px 24px",
                borderRight: i < 2 ? "1px solid var(--line)" : "none",
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
              }}
            >
              <span style={{ fontSize: 20 }}>{x.icon}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 3 }}>
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
