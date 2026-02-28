import React, { useState, useEffect, useRef } from "react";
import { X, ArrowRight } from "lucide-react";

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
    id: "ping",
    name: "Ping",
    tagline: "Establish your first connection",
    prices: { month: 0.99, quarter: 2.49, forever: 5.99 },
    color: "#60a5fa",
    icon: "/img/ranks/ping.png",
    description:
      "The starting point in the Pixel universe. Basic privileges and a unique chat prefix.",
    commands: ["/kit ping", "/hat", "/ping"],
    perks: [
      "Prefix [Ping]",
      "Reserved slot",
      "3 Homes",
      "Blue nickname",
      "Kit every 3 days",
    ],
  },
  {
    id: "packet",
    name: "Packet",
    tagline: "Transmit your presence",
    prices: { month: 1.99, quarter: 4.99, forever: 9.99 },
    color: "#34d399",
    icon: "/img/ranks/packet.png",
    description:
      "A solid packet of data. Better survival capabilities and exclusive commands.",
    commands: ["/kit packet", "/hat", "/feed", "/craft"],
    perks: [
      "Prefix [Packet]",
      "5 Homes",
      "Green nickname",
      "Kit every 2 days",
      "/feed once a day",
    ],
  },
  {
    id: "protocol",
    name: "Protocol",
    tagline: "Define the rules of engagement",
    prices: { month: 2.99, quarter: 7.99, forever: 14.99 },
    color: "#a78bfa",
    icon: "/img/ranks/protocol.png",
    description:
      "Follow the protocol. Increased storage and access to stealth mechanics.",
    commands: ["/kit protocol", "/vanish", "/feed", "/heal"],
    perks: [
      "Prefix [Protocol]",
      "7 Homes",
      "/vanish (Stealth)",
      "/heal access",
      "Daily kit",
    ],
  },
  {
    id: "script",
    name: "Script",
    tagline: "Automate your victory",
    prices: { month: 3.99, quarter: 9.99, forever: 19.99 },
    color: "#fb923c",
    icon: "/img/ranks/script.png",
    description:
      "Write your own destiny. Scripts give you the power to bypass standard limits.",
    commands: ["/kit script", "/fly (lobby)", "/back", "/ec"],
    perks: [
      "Prefix [Script]",
      "10 Homes",
      "Fly in lobby",
      "Keep inventory on death",
      "Enderchest /ec",
    ],
  },
  {
    id: "kernel",
    name: "Kernel",
    tagline: "Access the core functionality",
    prices: { month: 5.99, quarter: 14.99, forever: 29.99 },
    color: "#f43f5e",
    icon: "/img/ranks/kernel.png",
    description:
      "Deep system access. The Kernel rank unlocks flight in the survival world.",
    commands: ["/kit kernel", "/fly", "/speed", "/heal", "/back"],
    perks: [
      "Prefix [Kernel]",
      "15 Homes",
      "Fly in survival",
      "/speed up to 3",
      "High queue priority",
    ],
  },
  {
    id: "cipher",
    name: "Cipher",
    tagline: "Encrypt your movements",
    prices: { month: 7.99, quarter: 19.99, forever: 39.99 },
    color: "#8b5cf6",
    icon: "/img/ranks/cipher.png",
    description:
      "Unreadable by enemies. Access to God mode and inventory inspection.",
    commands: ["/kit cipher", "/fly", "/god", "/invsee", "/repair"],
    perks: [
      "Prefix [Cipher]",
      "20 Homes",
      "/god mode",
      "Inspect inventories /invsee",
      "Item repair /repair",
    ],
  },
  {
    id: "quantum",
    name: "Quantum",
    tagline: "Exist in multiple states",
    prices: { month: 11.99, quarter: 29.99, forever: 59.99 },
    color: "#06b6d4",
    icon: "/img/ranks/quantum.png",
    description:
      "Bend reality. Quantum users can change time and weather to their will.",
    commands: ["/kit quantum", "/fly", "/god", "/ptime", "/pweather", "/nick"],
    perks: [
      "Prefix [Quantum]",
      "Change nickname /nick",
      "Personal time /ptime",
      "Personal weather",
      "Quantum particles",
    ],
  },
  {
    id: "core",
    name: "Core",
    tagline: "The heart of the machine",
    prices: { month: 17.99, quarter: 44.99, forever: 89.99 },
    color: "#eab308",
    icon: "/img/ranks/core.png",
    description:
      "Pure processing power. Unrestricted access to almost all player features.",
    commands: ["/kit core", "/fly", "/god", "/tppos", "/tp", "/socialspy"],
    perks: [
      "Prefix [Core]",
      "Unlimited Homes",
      "Teleport by coords",
      "Social spy",
      "Core aura effect",
    ],
  },
  {
    id: "overclock",
    name: "Overclock",
    tagline: "Push beyond the limits",
    prices: { month: 24.99, quarter: 59.99, forever: 129.99 },
    color: "#ec4899",
    icon: "/img/ranks/overclock.png",
    description:
      "Running at maximum frequency. Unmatched perks and supreme server priority.",
    commands: ["/kit overclock", "/fly", "/god", "/sudo", "/top", "/v"],
    perks: [
      "Prefix [Overclock]",
      "Force commands /sudo",
      "Teleport to top /top",
      "Max priority",
      "Overclocked kits",
    ],
  },
  {
    id: "singularity",
    name: "Singularity",
    tagline: "Become one with the system",
    prices: { month: 49.99, quarter: 119.99, forever: 249.99 },
    color: "#f87171",
    icon: "/img/ranks/singularity.png",
    description:
      "The ultimate tier. You are the anomaly, possessing the highest level of authority and prestige.",
    commands: ["/kit singularity", "ALL COMMANDS"],
    perks: [
      "Prefix [Singularity]",
      "All previous commands",
      "VIP event access",
      "Unique singularity particle",
      "Direct dev support",
    ],
  },
];

const PERIOD_LABELS = {
  month: "1 Month",
  quarter: "3 Months",
  forever: "Lifetime",
};

const PERIODS = ["month", "quarter", "forever"] as const;
type PeriodType = (typeof PERIODS)[number];

export const Donate: React.FC = () => {
  const [selected, setSelected] = useState<Rank | null>(null);

  // State for Main Switcher
  const [period, setPeriod] = useState<PeriodType>("forever");
  const mainTabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [mainIndicator, setMainIndicator] = useState({
    transform: "translateX(0)",
    width: 0,
    opacity: 0,
  });

  // State for Modal Switcher
  const [modalPeriod, setModalPeriod] = useState<PeriodType>("forever");
  const modalTabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [modalIndicator, setModalIndicator] = useState({
    transform: "translate(0, 0)",
    width: 0,
    height: 0,
    opacity: 0,
  });

  // Update Main Liquid Indicator
  useEffect(() => {
    const updateMainIndicator = () => {
      const activeIndex = PERIODS.indexOf(period);
      const activeTab = mainTabsRef.current[activeIndex];
      if (activeTab) {
        setMainIndicator({
          transform: `translateX(${activeTab.offsetLeft}px)`,
          width: activeTab.offsetWidth,
          opacity: 1,
        });
      }
    };
    updateMainIndicator();
    window.addEventListener("resize", updateMainIndicator);
    return () => window.removeEventListener("resize", updateMainIndicator);
  }, [period]);

  // Update Modal Liquid Indicator
  useEffect(() => {
    const updateModalIndicator = () => {
      if (!selected) return;
      const activeIndex = PERIODS.indexOf(modalPeriod);
      const activeTab = modalTabsRef.current[activeIndex];
      if (activeTab) {
        setModalIndicator({
          transform: `translate(${activeTab.offsetLeft}px, ${activeTab.offsetTop}px)`,
          width: activeTab.offsetWidth,
          height: activeTab.offsetHeight,
          opacity: 1,
        });
      }
    };
    // Timeout to ensure DOM has rendered inside the modal before calculating coords
    setTimeout(updateModalIndicator, 0);
    window.addEventListener("resize", updateModalIndicator);
    return () => window.removeEventListener("resize", updateModalIndicator);
  }, [modalPeriod, selected]);

  return (
    <>
      <style>
        {`
          .ranks-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
            gap: 12px;
          }

          /* Apple-style Liquid Morphing transitions */
          .liquid-container {
            position: relative;
            display: flex;
            gap: 4px;
            background: var(--bg-2);
            border: 1px solid var(--line);
            border-radius: 10px;
            padding: 4px;
            width: fit-content;
          }

          .liquid-indicator {
            position: absolute;
            top: 4px;
            bottom: 4px;
            background: var(--blue);
            border-radius: 7px;
            transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            z-index: 0;
            left: 0;
          }

          .liquid-btn {
            position: relative;
            z-index: 1;
            padding: 7px 18px;
            border-radius: 7px;
            border: none;
            background: transparent;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
            font-family: 'Inter', sans-serif;
            transition: color 0.3s ease;
          }

          .modal-liquid-indicator {
            position: absolute;
            border-radius: 10px;
            transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            z-index: 0;
            left: 0;
            top: 0;
            pointer-events: none;
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
          <div style={{ maxWidth: 560, marginBottom: 48 }}>
            <div className="tag" style={{ marginBottom: 14 }}>
              Store
            </div>
            <h1
              style={{
                fontSize: 40,
                fontWeight: 800,
                marginBottom: 12,
                letterSpacing: "-0.03em",
              }}
            >
              Server Ranks
            </h1>
            <p style={{ color: "var(--t2)", fontSize: 15, lineHeight: 1.65 }}>
              Support the development of Pixel and unlock unique abilities.
              Click on a rank to learn more.
            </p>
          </div>

          {/* MAIN LIQUID SWITCHER */}
          <div className="liquid-container" style={{ marginBottom: 36 }}>
            <div className="liquid-indicator" style={mainIndicator} />
            {PERIODS.map((p, index) => (
              <button
                key={p}
                ref={(el) => (mainTabsRef.current[index] = el)}
                onClick={() => setPeriod(p)}
                className="liquid-btn"
                style={{ color: period === p ? "#fff" : "var(--t2)" }}
              >
                {PERIOD_LABELS[p]}
              </button>
            ))}
          </div>

          {/* GRID */}
          <div className="ranks-grid">
            {RANKS.map((rank) => (
              <div
                key={rank.id}
                onClick={() => {
                  setSelected(rank);
                  setModalPeriod(period); // Sync modal with main switcher
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
                  display: "flex",
                  flexDirection: "column",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    rank.color;
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

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ flex: 1 }}>
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
                          (e.currentTarget as HTMLImageElement).style.display =
                            "none";
                        }}
                      />
                    </div>

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
                        ${rank.prices[period]}
                      </span>
                      <span
                        style={{
                          fontSize: 13,
                          color: "var(--t3)",
                          fontWeight: 500,
                        }}
                      >
                        /{" "}
                        {period === "month"
                          ? "mo"
                          : period === "quarter"
                            ? "3 mo"
                            : "lifetime"}
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: 8,
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
                      Details <ArrowRight size={13} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MODAL */}
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
              <div
                style={{
                  height: 3,
                  background: selected.color,
                  borderRadius: "20px 20px 0 0",
                }}
              />

              <div style={{ padding: "28px" }}>
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

                {/* MODAL LIQUID SWITCHER */}
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
                    Select period
                  </div>

                  <div
                    style={{
                      position: "relative",
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: 8,
                    }}
                  >
                    {/* Modal Morphing Box Indicator */}
                    <div
                      className="modal-liquid-indicator"
                      style={{
                        ...modalIndicator,
                        background: `${selected.color}1a`,
                        border: `1.5px solid ${selected.color}66`,
                      }}
                    />

                    {PERIODS.map((p, index) => (
                      <button
                        key={p}
                        ref={(el) => (modalTabsRef.current[index] = el)}
                        onClick={() => setModalPeriod(p)}
                        style={{
                          position: "relative",
                          zIndex: 1,
                          padding: "10px 8px",
                          borderRadius: 10,
                          cursor: "pointer",
                          fontFamily: "Inter, sans-serif",
                          background: "transparent",
                          border: "1px solid transparent", // Keep border space reserved
                          color:
                            modalPeriod === p ? selected.color : "var(--t2)",
                          transition: "color 0.3s ease",
                          textAlign: "center",
                        }}
                      >
                        {/* Static border for unselected state to match sizing */}
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            borderRadius: 10,
                            border: "1px solid var(--line)",
                            zIndex: -1,
                            opacity: modalPeriod === p ? 0 : 1,
                            transition: "opacity 0.3s",
                          }}
                        />
                        <div
                          style={{
                            fontSize: 18,
                            fontWeight: 800,
                            letterSpacing: "-0.03em",
                          }}
                        >
                          <span style={{ fontSize: 14, fontWeight: 600 }}>
                            $
                          </span>
                          {selected.prices[p]}
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
                    Features
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
                    Commands
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
                  }}
                >
                  Purchase · ${selected.prices[modalPeriod]}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
