import React, { useState } from "react";
import {
  X,
  ArrowRight,
  Zap,
  Star,
  Shield,
  Sword,
  Wind,
  Flame,
  Crown,
  Snowflake,
  Ghost,
  HelpCircle,
  Trophy,
  Map,
  Gift,
} from "lucide-react";

interface Rank {
  id: string;
  name: string;
  tagline: string;
  prices: { month: number; quarter: number; forever: number };
  color: string;
  icon: string;
  commands: string[];
  perks: string[];
  description: string;
}

const RANKS: Rank[] = [
  {
    id: "battlepass",
    name: "Battle Pass",
    tagline: "Сезон I: Ледяное дыхание",
    prices: { month: 300, quarter: 300, forever: 300 }, // Цена фиксирована для всех периодов
    color: "#f59e0b", // Янтарный / Золотой
    icon: "/img/ranks/bp.png",
    description:
      "Глобальное сезонное событие! Выполняйте ежедневные задания, проходите квесты, повышайте уровень пропуска и открывайте эксклюзивные награды, недоступные в обычном магазине.",
    commands: ["/bp", "/quests", "/rewards", "/bp shop"],
    perks: [
      "Доступ к Премиум ветке",
      "Уникальные косметические предметы",
      "Сезонные титулы и валюта",
      "X2 опыт боевого пропуска",
      "Дополнительные слоты квестов",
    ],
  },
  {
    id: "echo",
    name: "Эхо Льда",
    tagline: "Заставьте других ощущать ваше присутствие",
    prices: { month: 49, quarter: 149, forever: 349 },
    color: "#60a5fa",
    icon: "/img/ranks/echo.png",
    description:
      "Начальный ранг для тех, кто делает первый шаг в мире IceTale. Базовые привилегии и уникальный префикс.",
    commands: ["/kit echo", "/hat", "/ping"],
    perks: [
      "Префикс [Эхо]",
      "Резервный слот",
      "3 дома",
      "Цвет ника: синий",
      "Кит раз в 3 дня",
    ],
  },
  {
    id: "crystal",
    name: "Кристалл",
    tagline: "Прозрачен для врагов, непробиваем для союзников",
    prices: { month: 99, quarter: 299, forever: 699 },
    color: "#a78bfa",
    icon: "/img/ranks/crystal.png",
    description:
      "Ранг кристальной чистоты. Расширенные возможности и доступ к эксклюзивным командам.",
    commands: ["/kit crystal", "/hat", "/ping", "/feed"],
    perks: [
      "Префикс [Кристалл]",
      "Резервный слот",
      "5 домов",
      "Цвет ника: фиолетовый",
      "Кит раз в 2 дня",
      "/feed раз в день",
    ],
  },
  {
    id: "shadow",
    name: "Тень",
    tagline: "Они не увидят тебя — ты уже рядом",
    prices: { month: 149, quarter: 449, forever: 999 },
    color: "#6b7280",
    icon: "/img/ranks/shadow.png",
    description:
      "Скрытность и мощь — ваше оружие. Тень движется незаметно, но оставляет след.",
    commands: ["/kit shadow", "/vanish", "/feed", "/heal"],
    perks: [
      "Префикс [Тень]",
      "Резервный слот",
      "7 домов",
      "/vanish (скрытность)",
      "/feed и /heal",
      "Кит раз в день",
    ],
  },
  {
    id: "snowball",
    name: "Снежок",
    tagline: "Маленький, но способен сдвинуть лавину",
    prices: { month: 199, quarter: 599, forever: 1299 },
    color: "#e2e8f0",
    icon: "/img/ranks/snowball.png",
    description:
      "Не стоит недооценивать снежок — он способен разрушить целые крепости.",
    commands: ["/kit snowball", "/feed", "/heal", "/fly (в лобби)", "/back"],
    perks: [
      "Префикс [Снежок]",
      "Приоритет входа",
      "10 домов",
      "Полёт в лобби /fly",
      "Сохранение инвентаря",
      "Кит раз в день",
    ],
  },
  {
    id: "vector",
    name: "Вектор",
    tagline: "Ваш путь всегда идёт вперёд",
    prices: { month: 299, quarter: 899, forever: 1999 },
    color: "#34d399",
    icon: "/img/ranks/vector.png",
    description:
      "Целеустремлённость и скорость. Вектор всегда знает, куда движется.",
    commands: [
      "/kit vector",
      "/fly (в мире)",
      "/speed",
      "/feed",
      "/heal",
      "/back",
    ],
    perks: [
      "Префикс [Вектор]",
      "Высокий приоритет",
      "15 домов",
      "Полёт в мире /fly",
      "/speed до 3",
      "Цветной ник",
    ],
  },
  {
    id: "death",
    name: "Смерть",
    tagline: "Там, где ступает Смерть — трава не растёт",
    prices: { month: 399, quarter: 1199, forever: 2599 },
    color: "#f87171",
    icon: "/img/ranks/death.png",
    description:
      "Один из самых грозных рангов. Враги узнают вас раньше, чем вы появитесь.",
    commands: ["/kit death", "/fly", "/god", "/feed", "/heal", "/invsee"],
    perks: [
      "Префикс [†Смерть†]",
      "Максимальный приоритет",
      "20 домов",
      "/god режим",
      "Просмотр инвентаря /invsee",
      "Своя частица смерти",
    ],
  },
  {
    id: "phoenix",
    name: "Феникс",
    tagline: "Каждое поражение — начало нового рождения",
    prices: { month: 599, quarter: 1799, forever: 3999 },
    color: "#fb923c",
    icon: "/img/ranks/phoenix.png",
    description:
      "Феникс никогда не умирает окончательно. Мощь возрождения в ваших руках.",
    commands: [
      "/kit phoenix",
      "/fly",
      "/god",
      "/back (после смерти)",
      "/craft",
      "/ec",
    ],
    perks: [
      "Префикс [Феникс🔥]",
      "Возврат после смерти /back",
      "Личный крафт /craft",
      "Эндер-сундук /ec",
      "∞ домов",
      "Эффект огня вокруг",
    ],
  },
  {
    id: "dragon",
    name: "Дракон",
    tagline: "Небо принадлежит тебе",
    prices: { month: 899, quarter: 2699, forever: 5999 },
    color: "#c084fc",
    icon: "/img/ranks/dragon.png",
    description:
      "Дракон парит над всеми. Власть над воздухом и землёй в одном ранге.",
    commands: [
      "/kit dragon",
      "/fly",
      "/god",
      "/tppos",
      "/nick",
      "/ptime",
      "/pweather",
    ],
    perks: [
      "Префикс [Дракон🐉]",
      "Смена ника /nick",
      "Личное время /ptime",
      "Личная погода /pweather",
      "Телепорт по координатам",
      "Частицы дракона",
    ],
  },
  {
    id: "storm",
    name: "Буря",
    tagline: "Вы не попадёте в бурю — вы и есть буря",
    prices: { month: 1299, quarter: 3999, forever: 8999 },
    color: "#fbbf24",
    icon: "/img/ranks/storm.png",
    description:
      "Высший игровой ранг. Буря сметает всё на своём пути, оставляя лишь легенды.",
    commands: [
      "/kit storm",
      "/fly",
      "/god",
      "/nick",
      "/socialspy",
      "/top",
      "/sudo",
    ],
    perks: [
      "Префикс [⚡Буря⚡]",
      "Все команды предыдущих",
      "Социальный шпионаж /socialspy",
      "/sudo для игроков",
      "Уникальная молния-частица",
      "VIP-доступ к ивентам",
    ],
  },
  {
    id: "helper",
    name: "Хелпер",
    tagline: "Порядок начинается с тех, кто его поддерживает",
    prices: { month: 2999, quarter: 8999, forever: 19999 },
    color: "#2dd4bf",
    icon: "/img/ranks/helper.png",
    description:
      "Административный статус. Хелперы помогают игрокам и поддерживают порядок на сервере.",
    commands: [
      "/mute",
      "/kick",
      "/warn",
      "/tp",
      "/invsee",
      "/freeze",
      "/check",
    ],
    perks: [
      "Префикс [Helper]",
      "Доступ к модерации",
      "Заморозка игроков /freeze",
      "История нарушений /check",
      "Закрытый Discord-канал",
      "Особый значок в чате",
    ],
  },
];

const PERIOD_LABELS = {
  month: "Месяц",
  quarter: "3 месяца",
  forever: "Навсегда",
};

export const Donate: React.FC = () => {
  const [selected, setSelected] = useState<Rank | null>(null);
  const [period, setPeriod] = useState<"month" | "quarter" | "forever">(
    "forever",
  );
  const [modalPeriod, setModalPeriod] = useState<
    "month" | "quarter" | "forever"
  >("forever");

  return (
    <>
      <style>
        {`
          .ranks-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
            gap: 12px;
          }
          
          /* BattlePass Card Styling */
          .rank-card-battlepass {
            background: linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(20, 20, 20, 1) 100%) !important;
            border: 1px solid rgba(245, 158, 11, 0.4) !important;
            box-shadow: 0 4px 24px rgba(245, 158, 11, 0.15);
          }
          .rank-card-battlepass:hover {
            box-shadow: 0 12px 40px rgba(245, 158, 11, 0.3) !important;
            border-color: #f59e0b !important;
          }

          /* Make BattlePass span 2 columns on desktop */
          @media (min-width: 600px) {
            .rank-card-battlepass {
              grid-column: span 2;
            }
          }
        `}
      </style>
      <div
        style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: 60 }}
      >
        <div
          className="container"
          style={{ paddingTop: 64, paddingBottom: 80 }}
        >
          {/* Header */}
          <div style={{ maxWidth: 560, marginBottom: 48 }}>
            <div className="tag" style={{ marginBottom: 14 }}>
              Магазин
            </div>
            <h1
              style={{
                fontSize: 40,
                fontWeight: 800,
                marginBottom: 12,
                letterSpacing: "-0.03em",
              }}
            >
              Привилегии
            </h1>
            <p style={{ color: "var(--t2)", fontSize: 15, lineHeight: 1.65 }}>
              Поддержи развитие IceTale и получи уникальные возможности. Нажми
              на ранг, чтобы узнать подробнее.
            </p>
          </div>

          {/* Period switcher */}
          <div
            style={{
              display: "flex",
              gap: 4,
              marginBottom: 36,
              background: "var(--bg-2)",
              border: "1px solid var(--line)",
              borderRadius: 10,
              padding: 4,
              width: "fit-content",
            }}
          >
            {(["month", "quarter", "forever"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                style={{
                  padding: "7px 18px",
                  borderRadius: 7,
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: 14,
                  fontFamily: "Inter, sans-serif",
                  background: period === p ? "var(--blue)" : "transparent",
                  color: period === p ? "#fff" : "var(--t2)",
                  transition: "all .2s",
                }}
              >
                {PERIOD_LABELS[p]}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="ranks-grid">
            {RANKS.map((rank) => {
              const isBP = rank.id === "battlepass";
              return (
                <div
                  key={rank.id}
                  className={isBP ? "rank-card-battlepass" : ""}
                  onClick={() => {
                    setSelected(rank);
                    setModalPeriod(period);
                  }}
                  style={{
                    background: "var(--bg-1)",
                    border: `1px solid var(--line)`,
                    borderRadius: 14,
                    padding: "20px",
                    cursor: "pointer",
                    transition:
                      "border-color .2s, transform .2s, box-shadow .2s",
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  onMouseEnter={(e) => {
                    if (isBP) return; // Handled by CSS class
                    (e.currentTarget as HTMLElement).style.borderColor =
                      rank.color;
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(-3px)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      `0 12px 32px rgba(0,0,0,.3)`;
                  }}
                  onMouseLeave={(e) => {
                    if (isBP) return; // Handled by CSS class
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "var(--line)";
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  {/* Top accent line */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: isBP ? 3 : 2,
                      background: rank.color,
                      opacity: isBP ? 1 : 0.7,
                      borderRadius: "14px 14px 0 0",
                      boxShadow: isBP ? `0 0 15px ${rank.color}` : "none",
                    }}
                  />

                  {/* BP Special Content Wrapper */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: isBP ? "row" : "column",
                      height: "100%",
                      justifyContent: "space-between",
                      gap: isBP ? 20 : 0,
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      {/* Logo */}
                      <div
                        style={{
                          width: 52,
                          height: 52,
                          marginBottom: 14,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: isBP ? "flex-start" : "center",
                        }}
                      >
                        <img
                          src={rank.icon}
                          alt={rank.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            filter: isBP
                              ? "drop-shadow(0 0 10px rgba(245,158,11,0.5))"
                              : "none",
                          }}
                          onError={(e) => {
                            (
                              e.currentTarget as HTMLImageElement
                            ).style.display = "none";
                            const next = e.currentTarget
                              .nextElementSibling as HTMLElement;
                            if (next) next.style.display = "flex";
                          }}
                        />
                        <div
                          style={{
                            display: "none",
                            width: 52,
                            height: 52,
                            borderRadius: 12,
                            background: `${rank.color}18`,
                            border: `1px solid ${rank.color}44`,
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 22,
                          }}
                        >
                          {isBP ? <Trophy size={24} /> : "❄"}
                        </div>
                      </div>

                      {/* Name */}
                      <div
                        style={{
                          fontSize: isBP ? 20 : 15,
                          fontWeight: 700,
                          color: isBP ? rank.color : "var(--t1)",
                          marginBottom: 4,
                          textTransform: isBP ? "uppercase" : "none",
                          letterSpacing: isBP ? "0.05em" : "normal",
                        }}
                      >
                        {rank.name}
                      </div>

                      {/* Tagline */}
                      <div
                        style={{
                          fontSize: 12,
                          color: isBP ? "var(--t1)" : "var(--t3)",
                          lineHeight: 1.5,
                          marginBottom: 16,
                          minHeight: isBP ? "auto" : 36,
                          opacity: isBP ? 0.9 : 1,
                        }}
                      >
                        {rank.tagline}
                      </div>

                      {/* Price */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: 3,
                          marginBottom: 14,
                          marginTop: isBP ? "auto" : 0,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 26,
                            fontWeight: 800,
                            color: rank.color,
                            letterSpacing: "-0.04em",
                            textShadow: isBP
                              ? `0 0 20px ${rank.color}44`
                              : "none",
                          }}
                        >
                          {rank.prices[period]}
                        </span>
                        <span
                          style={{
                            fontSize: 13,
                            color: "var(--t3)",
                            fontWeight: 500,
                          }}
                        >
                          ₽ /{" "}
                          {isBP
                            ? "сезон"
                            : period === "month"
                              ? "мес"
                              : period === "quarter"
                                ? "3 мес"
                                : "∞"}
                        </span>
                      </div>
                    </div>

                    {/* Wide Card Extra Decoration / CTA */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        width: isBP ? "40%" : "100%",
                      }}
                    >
                      {isBP && (
                        <div
                          style={{
                            fontSize: 12,
                            color: "var(--t2)",
                            marginBottom: 10,
                            display: "none", // Скрываем на мобильных через CSS если нужно, но здесь flex layout
                            // На десктопе покажем
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                              marginBottom: 4,
                            }}
                          >
                            <Gift size={12} color={rank.color} /> Эксклюзивные
                            скины
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                              marginBottom: 4,
                            }}
                          >
                            <Map size={12} color={rank.color} /> Уникальные
                            квесты
                          </div>
                        </div>
                      )}

                      <div
                        style={{
                          width: "100%",
                          padding: isBP ? "12px" : "8px",
                          borderRadius: 8,
                          border: "none",
                          background: `${rank.color}18`,
                          border: `1px solid ${rank.color}33`,
                          color: rank.color,
                          fontWeight: 600,
                          fontSize: 13,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 6,
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {isBP ? "Открыть пропуск" : "Подробнее"}{" "}
                        <ArrowRight size={13} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── MODAL ── */}
        {selected && (
          <div
            onClick={() => setSelected(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,
              background: "rgba(0,0,0,0.75)",
              backdropFilter: "blur(6px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "var(--bg-1)",
                border: `1px solid ${selected.color}44`,
                borderRadius: 20,
                width: "100%",
                maxWidth: 540,
                maxHeight: "90vh",
                overflow: "auto",
                position: "relative",
                boxShadow: `0 32px 80px rgba(0,0,0,.7), 0 0 0 1px ${selected.color}22`,
              }}
            >
              {/* Top accent */}
              <div
                style={{
                  height: 3,
                  background: selected.color,
                  borderRadius: "20px 20px 0 0",
                  boxShadow:
                    selected.id === "battlepass"
                      ? `0 0 20px ${selected.color}`
                      : "none",
                }}
              />

              <div style={{ padding: "28px" }}>
                {/* Header row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: 24,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 16 }}
                  >
                    <div style={{ width: 64, height: 64, flexShrink: 0 }}>
                      <img
                        src={selected.icon}
                        alt={selected.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          filter:
                            selected.id === "battlepass"
                              ? "drop-shadow(0 0 15px rgba(245,158,11,0.4))"
                              : "none",
                        }}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display =
                            "none";
                        }}
                      />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 22,
                          fontWeight: 800,
                          letterSpacing: "-0.03em",
                          color: selected.color,
                        }}
                      >
                        {selected.name}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: "var(--t3)",
                          marginTop: 3,
                        }}
                      >
                        {selected.tagline}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    style={{
                      background: "var(--bg-2)",
                      border: "1px solid var(--line)",
                      borderRadius: 8,
                      padding: "6px",
                      cursor: "pointer",
                      color: "var(--t2)",
                      lineHeight: 1,
                      flexShrink: 0,
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Description */}
                <p
                  style={{
                    color: "var(--t2)",
                    fontSize: 14,
                    lineHeight: 1.7,
                    marginBottom: 24,
                    background:
                      selected.id === "battlepass"
                        ? `linear-gradient(90deg, ${selected.color}11, transparent)`
                        : "var(--bg-2)",
                    border: "1px solid var(--line)",
                    borderColor:
                      selected.id === "battlepass"
                        ? `${selected.color}33`
                        : "var(--line)",
                    borderRadius: 10,
                    padding: "14px 16px",
                  }}
                >
                  {selected.description}
                </p>

                {/* Period picker (Hidden or modified for BP if desired, but kept for consistent UI structure) */}
                <div style={{ marginBottom: 20 }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: ".07em",
                      color: "var(--t3)",
                      marginBottom: 10,
                    }}
                  >
                    {selected.id === "battlepass" ? "Цена" : "Выбери период"}
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: 8,
                    }}
                  >
                    {(["month", "quarter", "forever"] as const).map((p) => {
                      const isBP = selected.id === "battlepass";
                      return (
                        <button
                          key={p}
                          onClick={() => setModalPeriod(p)}
                          disabled={isBP && p !== "month"} // Optional: lock selection for BP visually or just let them click (price same)
                          style={{
                            padding: "10px 8px",
                            borderRadius: 10,
                            cursor: "pointer",
                            fontFamily: "Inter, sans-serif",
                            background:
                              modalPeriod === p || (isBP && p === "month") // Force highlight first for BP visual simplicity
                                ? `${selected.color}1a`
                                : "var(--bg-2)",
                            border:
                              modalPeriod === p || (isBP && p === "month")
                                ? `1.5px solid ${selected.color}66`
                                : "1px solid var(--line)",
                            color:
                              modalPeriod === p || (isBP && p === "month")
                                ? selected.color
                                : "var(--t2)",
                            transition: "all .15s",
                            textAlign: "center",
                            opacity: isBP && p !== "month" ? 0.5 : 1, // Dim irrelevant options for BP
                          }}
                        >
                          <div
                            style={{
                              fontSize: 18,
                              fontWeight: 800,
                              letterSpacing: "-0.03em",
                            }}
                          >
                            {selected.prices[p]}
                            <span style={{ fontSize: 12, fontWeight: 500 }}>
                              {" "}
                              ₽
                            </span>
                          </div>
                          <div
                            style={{
                              fontSize: 11,
                              fontWeight: 600,
                              marginTop: 2,
                              opacity: 0.8,
                            }}
                          >
                            {isBP ? "Сезон" : PERIOD_LABELS[p]}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Perks */}
                <div style={{ marginBottom: 20 }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: ".07em",
                      color: "var(--t3)",
                      marginBottom: 10,
                    }}
                  >
                    Возможности
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    {selected.perks.map((perk) => (
                      <div
                        key={perk}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "9px 12px",
                          background: "var(--bg-2)",
                          borderRadius: 8,
                          fontSize: 14,
                        }}
                      >
                        <div
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: selected.color,
                            flexShrink: 0,
                            boxShadow:
                              selected.id === "battlepass"
                                ? `0 0 8px ${selected.color}`
                                : "none",
                          }}
                        />
                        <span style={{ color: "var(--t1)" }}>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Commands */}
                <div style={{ marginBottom: 24 }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: ".07em",
                      color: "var(--t3)",
                      marginBottom: 10,
                    }}
                  >
                    Команды
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {selected.commands.map((cmd) => (
                      <code
                        key={cmd}
                        style={{
                          fontSize: 13,
                          fontFamily: "monospace",
                          background: "var(--bg-3)",
                          border: "1px solid var(--line)",
                          padding: "4px 10px",
                          borderRadius: 6,
                          color: selected.color,
                        }}
                      >
                        {cmd}
                      </code>
                    ))}
                  </div>
                </div>

                {/* Buy button */}
                <button
                  style={{
                    width: "100%",
                    padding: "13px",
                    borderRadius: 11,
                    border: "none",
                    background: selected.color,
                    color: "#000",
                    fontWeight: 700,
                    fontSize: 15,
                    cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    transition: "opacity .2s",
                    opacity: 0.9,
                    boxShadow:
                      selected.id === "battlepass"
                        ? `0 4px 20px ${selected.color}66`
                        : "none",
                  }}
                >
                  {selected.id === "battlepass"
                    ? "Активировать пропуск"
                    : "Скоро доступно"}{" "}
                  · {selected.prices[modalPeriod]} ₽
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
