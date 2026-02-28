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
      "Полет в мире /fly",
      "Свои варпы",
      "Приоритет в тикетах",
      "∞ регионов",
    ],
  },
];

const RANK_STYLES: Record<
  string,
  { color: string; icon: string; label: string }
> = {
  vip: { color: "var(--green-rank)", icon: "⬡", label: "БАЗОВЫЙ" },
  premium: { color: "var(--purple-rank)", icon: "★", label: "ПОПУЛЯРНЫЙ" },
  legend: { color: "var(--orange-rank)", icon: "♦", label: "ЭЛИТНЫЙ" },
};

export const Donate: React.FC = () => {
  return (
    <div
      className="min-h-screen pt-24 pb-16 px-6"
      style={{ background: "var(--bg-void)" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <div
            className="inline-block font-pixel text-sm tracking-widest px-4 py-1 mb-4"
            style={{
              color: "var(--text-muted)",
              border: "1px solid rgba(0,212,255,0.15)",
              background: "rgba(0,212,255,0.03)",
            }}
          >
            / ПОДДЕРЖАТЬ СЕРВЕР /
          </div>
          <div className="page-header mb-3" data-text="МАГАЗИН">
            МАГАЗИН
          </div>
          <p
            className="font-mono max-w-xl mx-auto"
            style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}
          >
            Покупка привилегий помогает серверу жить и развиваться. Все
            привилегии активируются навсегда.
          </p>
        </div>

        {/* Notice */}
        <div
          className="mb-10 p-3 text-center font-mono text-sm"
          style={{
            background: "rgba(0,212,255,0.04)",
            border: "1px solid rgba(0,212,255,0.12)",
            color: "var(--text-muted)",
          }}
        >
          ⚠ Магазин откроется с запуском сервера. Следи за обновлениями в
          Telegram.
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {ranks.map((rank, i) => {
            const style = RANK_STYLES[rank.id];
            return (
              <div
                key={rank.id}
                className={`rank-${rank.id} rank-card fade-up delay-${i + 2} flex flex-col`}
                style={{
                  animationDelay: `${i * 0.15}s`,
                  padding: "2rem 1.5rem",
                }}
              >
                {/* Popular badge */}
                {rank.popular && (
                  <div className="absolute top-4 right-4">
                    <span className="popular-badge">ХИТ!</span>
                  </div>
                )}

                {/* Icon */}
                <div
                  className="text-5xl mb-4"
                  style={{
                    color: style.color,
                    textShadow: `0 0 20px ${style.color}`,
                  }}
                >
                  {style.icon}
                </div>

                {/* Tier label */}
                <div
                  className="font-pixel text-xs tracking-widest mb-2"
                  style={{ color: style.color, opacity: 0.7 }}
                >
                  {style.label}
                </div>

                {/* Name */}
                <div
                  className="font-orb font-bold mb-1"
                  style={{
                    fontSize: "1.8rem",
                    color: "white",
                    letterSpacing: "0.12em",
                    textShadow: `0 0 20px ${style.color}44`,
                  }}
                >
                  [{rank.name}]
                </div>

                {/* Price */}
                <div className="flex items-end gap-1 mb-6">
                  <span
                    className="font-orb font-black"
                    style={{
                      fontSize: "2.5rem",
                      color: style.color,
                      textShadow: `0 0 15px ${style.color}66`,
                    }}
                  >
                    {rank.price}
                  </span>
                  <span
                    className="font-pixel text-xl mb-1"
                    style={{ color: style.color, opacity: 0.7 }}
                  >
                    ₽
                  </span>
                </div>

                {/* Divider */}
                <div
                  className="mb-5"
                  style={{
                    height: 1,
                    background: `linear-gradient(90deg, ${style.color}44, transparent)`,
                  }}
                />

                {/* Features */}
                <div className="flex-1 flex flex-col gap-1 mb-8">
                  {rank.features.map((feat) => (
                    <div
                      key={feat}
                      className="feature-item"
                      style={
                        { "--rank-color": style.color } as React.CSSProperties
                      }
                    >
                      {feat}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  className="w-full font-pixel text-xl tracking-widest py-3 transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${style.color}22, ${style.color}11)`,
                    border: `2px solid ${style.color}88`,
                    color: style.color,
                    cursor: "pointer",
                    clipPath:
                      "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      `${style.color}33`;
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      `0 0 20px ${style.color}44`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      `linear-gradient(135deg, ${style.color}22, ${style.color}11)`;
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  СКОРО
                </button>
              </div>
            );
          })}
        </div>

        {/* Info block */}
        <div
          className="mt-10 p-6 grid md:grid-cols-3 gap-6"
          style={{
            background: "rgba(0,0,0,0.3)",
            border: "1px solid rgba(0,212,255,0.1)",
          }}
        >
          {[
            {
              icon: "⚡",
              title: "Моментально",
              desc: "Привилегии активируются сразу после оплаты",
            },
            {
              icon: "♾",
              title: "Навсегда",
              desc: "Все права сохраняются без ограничений по времени",
            },
            {
              icon: "🛡",
              title: "Безопасно",
              desc: "Защищённые платёжные системы, поддержка 24/7",
            },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <div className="text-3xl mb-2">{item.icon}</div>
              <div
                className="font-pixel text-lg tracking-wider mb-1"
                style={{ color: "var(--cyan-ice)" }}
              >
                {item.title}
              </div>
              <div
                className="font-mono text-xs"
                style={{ color: "var(--text-muted)" }}
              >
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
