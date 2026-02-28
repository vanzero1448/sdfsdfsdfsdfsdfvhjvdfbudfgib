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
    id: "echo",
    name: "Эхо Льда",
    tagline: "Заставьте других ощущать ваше присутствие",
    prices: { month: 49, quarter: 149, forever: 349 },
    color: "#60a5fa",
    icon: "https://minecraft.wiki/images/Blue_Ice_JE3.png",           // ледяной блок — идеально под «Эхо Льда»
    description: "...",
    commands: ["/kit echo", "/hat", "/ping"],
    perks: [ ... ],
  },
  {
    id: "crystal",
    name: "Кристалл",
    tagline: "Прозрачен для врагов, непробиваем для союзников",
    prices: { month: 99, quarter: 299, forever: 699 },
    color: "#a78bfa",
    icon: "https://minecraft.wiki/images/Amethyst_Cluster_JE2.png",   // фиолетовый кристалл
    description: "...",
    commands: [...],
    perks: [...],
  },
  {
    id: "shadow",
    name: "Тень",
    tagline: "Они не увидят тебя — ты уже рядом",
    prices: { month: 149, quarter: 449, forever: 999 },
    color: "#6b7280",
    icon: "https://minecraft.wiki/images/Black_Concrete_JE1.png",     // чёрный бетон — тёмная тень
    description: "...",
    commands: [...],
    perks: [...],
  },
  {
    id: "snowball",
    name: "Снежок",
    tagline: "Маленький, но способен сдвинуть лавину",
    prices: { month: 199, quarter: 599, forever: 1299 },
    color: "#e2e8f0",
    icon: "https://minecraft.wiki/images/Snowball_JE3_BE3.png",       // настоящий снежок!
    description: "...",
    commands: [...],
    perks: [...],
  },
  {
    id: "vector",
    name: "Вектор",
    tagline: "Ваш путь всегда идёт вперёд",
    prices: { month: 299, quarter: 899, forever: 1999 },
    color: "#34d399",
    icon: "https://minecraft.wiki/images/Arrow_JE2_BE2.png",          // стрелка-вектор
    description: "...",
    commands: [...],
    perks: [...],
  },
  {
    id: "death",
    name: "Смерть",
    tagline: "Там, где ступает Смерть — трава не растёт",
    prices: { month: 399, quarter: 1199, forever: 2599 },
    color: "#f87171",
    icon: "https://minecraft.wiki/images/Wither_Skeleton_Skull_JE2.png", // череп смерти
    description: "...",
    commands: [...],
    perks: [...],
  },
  {
    id: "phoenix",
    name: "Феникс",
    tagline: "Каждое поражение — начало нового рождения",
    prices: { month: 599, quarter: 1799, forever: 3999 },
    color: "#fb923c",
    icon: "https://minecraft.wiki/images/Blaze_Powder_JE2_BE2.png",   // огонь феникса
    description: "...",
    commands: [...],
    perks: [...],
  },
  {
    id: "dragon",
    name: "Дракон",
    tagline: "Небо принадлежит тебе",
    prices: { month: 899, quarter: 2699, forever: 5999 },
    color: "#c084fc",
    icon: "https://minecraft.wiki/images/Dragon_Egg_JE2.png",         // яйцо дракона
    description: "...",
    commands: [...],
    perks: [...],
  },
  {
    id: "storm",
    name: "Буря",
    tagline: "Вы не попадёте в бурю — вы и есть буря",
    prices: { month: 1299, quarter: 3999, forever: 8999 },
    color: "#fbbf24",
    icon: "https://minecraft.wiki/images/Lightning_Rod_JE3.png",      // молния бури
    description: "...",
    commands: [...],
    perks: [...],
  },
  {
    id: "helper",
    name: "Хелпер",
    tagline: "Порядок начинается с тех, кто его поддерживает",
    prices: { month: 2999, quarter: 8999, forever: 19999 },
    color: "#2dd4bf",
    icon: "https://minecraft.wiki/images/Shield_JE2_BE2.png",         // щит помощника
    description: "...",
    commands: [...],
    perks: [...],
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
    <div
      style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: 60 }}
    >
      <div className="container" style={{ paddingTop: 64, paddingBottom: 80 }}>
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
            Поддержи развитие IceTale и получи уникальные возможности. Нажми на
            ранг, чтобы узнать подробнее.
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
            gap: 12,
          }}
        >
          {RANKS.map((rank) => (
            <div
              key={rank.id}
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
                transition: "border-color .2s, transform .2s, box-shadow .2s",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = rank.color;
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(-3px)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  `0 12px 32px rgba(0,0,0,.3)`;
              }}
              onMouseLeave={(e) => {
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
                  height: 2,
                  background: rank.color,
                  opacity: 0.7,
                  borderRadius: "14px 14px 0 0",
                }}
              />

              {/* Logo */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  marginBottom: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={rank.icon}
                  alt={rank.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  onError={(e) => {
                    // fallback circle if image missing
                    (e.currentTarget as HTMLImageElement).style.display =
                      "none";
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
                  ❄
                </div>
              </div>

              {/* Name */}
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "var(--t1)",
                  marginBottom: 4,
                }}
              >
                {rank.name}
              </div>

              {/* Tagline */}
              <div
                style={{
                  fontSize: 12,
                  color: "var(--t3)",
                  lineHeight: 1.5,
                  marginBottom: 16,
                  minHeight: 36,
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
                }}
              >
                <span
                  style={{
                    fontSize: 26,
                    fontWeight: 800,
                    color: rank.color,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {rank.prices[period]}
                </span>
                <span
                  style={{ fontSize: 13, color: "var(--t3)", fontWeight: 500 }}
                >
                  ₽ /{" "}
                  {period === "month"
                    ? "мес"
                    : period === "quarter"
                      ? "3 мес"
                      : "∞"}
                </span>
              </div>

              {/* CTA */}
              <div
                style={{
                  width: "100%",
                  padding: "8px",
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
                Подробнее <ArrowRight size={13} />
              </div>
            </div>
          ))}
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
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 64, height: 64, flexShrink: 0 }}>
                    <img
                      src={selected.icon}
                      alt={selected.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
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
                      style={{ fontSize: 13, color: "var(--t3)", marginTop: 3 }}
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
                  background: "var(--bg-2)",
                  border: "1px solid var(--line)",
                  borderRadius: 10,
                  padding: "14px 16px",
                }}
              >
                {selected.description}
              </p>

              {/* Period picker */}
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
                  Выбери период
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 8,
                  }}
                >
                  {(["month", "quarter", "forever"] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setModalPeriod(p)}
                      style={{
                        padding: "10px 8px",
                        borderRadius: 10,
                        cursor: "pointer",
                        fontFamily: "Inter, sans-serif",
                        background:
                          modalPeriod === p
                            ? `${selected.color}1a`
                            : "var(--bg-2)",
                        border:
                          modalPeriod === p
                            ? `1.5px solid ${selected.color}66`
                            : "1px solid var(--line)",
                        color: modalPeriod === p ? selected.color : "var(--t2)",
                        transition: "all .15s",
                        textAlign: "center",
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
                        {PERIOD_LABELS[p]}
                      </div>
                    </button>
                  ))}
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
                  opacity: 0.7,
                }}
              >
                Скоро доступно · {selected.prices[modalPeriod]} ₽
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
