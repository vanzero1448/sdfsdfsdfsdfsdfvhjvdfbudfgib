import React from "react";
import {
  ExternalLink,
  ShieldAlert,
  Swords,
  Hammer,
  MessageSquare,
  Gavel,
  AlertTriangle,
} from "lucide-react";

interface Rule {
  id: string;
  text: string;
  punishment?: string;
}

interface RuleSection {
  title: string;
  icon: React.ReactNode;
  rules: Rule[];
}

const RULES_DATA: RuleSection[] = [
  {
    title: "1. Administration & Donators",
    icon: <Gavel size={20} />,
    rules: [
      {
        id: "1.1",
        text: "The Administration reserves the right to modify, add, or remove these rules at any time without prior notification. Playing on the server implies automatic agreement.",
      },
      {
        id: "1.2",
        text: "Absolute Authority: The Administration has the absolute right to mute, kick, or permanently ban any regular player's account without warning and without explaining the reasons.",
        punishment: "At Admin's Discretion",
      },
      {
        id: "1.3",
        text: "Discussing, criticizing, or publicly questioning the actions of the Administration is strictly prohibited. The Administration's word is final.",
        punishment: "Mute 24h ➔ Permanent Ban",
      },
      {
        id: "1.4",
        text: "Donator Protection: Unlike regular players, players who have purchased a rank CANNOT be banned without a clearly stated reason and evidence of the rule violation.",
      },
      {
        id: "1.5",
        text: "No Refunds: All store purchases are strictly final. Attempting a forced chargeback via bank or PayPal will result in an immediate global ban.",
        punishment: "Permanent Blacklist",
      },
    ],
  },
  {
    title: "2. General Conduct & Fair Play",
    icon: <ShieldAlert size={20} />,
    rules: [
      {
        id: "2.1",
        text: "The use of third-party software, cheats, hacked clients, scripts, or macros that provide an unfair gameplay advantage is strictly prohibited.",
        punishment: "30 Day Ban ➔ Permanent Ban",
      },
      {
        id: "2.2",
        text: "Exploiting game mechanics, duping items, or abusing server bugs is forbidden. All bugs must be reported to the staff immediately.",
        punishment: "7 Day Ban + Wipe ➔ Permanent Ban",
      },
      {
        id: "2.3",
        text: "Bypassing a ban or mute using secondary accounts (alt-evading).",
        punishment: "Permanent IP & Hardware Ban",
      },
      {
        id: "2.4",
        text: "Impersonating server staff or administrators to deceive other players.",
        punishment: "Permanent Ban",
      },
    ],
  },
  {
    title: "3. Chat & Communication",
    icon: <MessageSquare size={20} />,
    rules: [
      {
        id: "3.1",
        text: "Spamming, flooding the chat, excessive use of CAPS, and begging for items/ranks.",
        punishment: "Mute 1h ➔ 12h",
      },
      {
        id: "3.2",
        text: "Extreme toxicity, harassment, bullying, and any form of discrimination or hate speech.",
        punishment: "Mute 24h ➔ 7 Days",
      },
      {
        id: "3.3",
        text: "Advertising other servers, discord communities, or third-party services.",
        punishment: "Permanent Ban",
      },
      {
        id: "3.4",
        text: "Doxxing (sharing personal real-life information of others) or threatening the real-life safety of players or staff.",
        punishment: "Permanent Blacklist + Report to authorities",
      },
    ],
  },
  {
    title: "4. PvP & Interaction",
    icon: <Swords size={20} />,
    rules: [
      {
        id: "4.1",
        text: "Combat logging (disconnecting from the server while in active PvP combat).",
        punishment: "Instant death + item loss (Automated)",
      },
      {
        id: "4.2",
        text: "Trapping players in unbreakable zones or continuously killing new players at spawn (Spawn-killing).",
        punishment: "Warn ➔ 3 Day Ban",
      },
      {
        id: "4.3",
        text: "Scamming players during agreed-upon trades or stealing items during drop-trades.",
        punishment: "7 Day Ban + Inventory Rollback",
      },
    ],
  },
  {
    title: "5. Building & Territories",
    icon: <Hammer size={20} />,
    rules: [
      {
        id: "5.1",
        text: "Griefing protected areas (bypassing claims) or heavily griefing the landscape around another player's base.",
        punishment: "14 Day Ban + Area Rollback",
      },
      {
        id: "5.2",
        text: "Building lag machines, infinite redstone loops, or anything designed to intentionally crash the server.",
        punishment: "Permanent IP Ban",
      },
      {
        id: "5.3",
        text: "Creating inappropriate builds (offensive symbols, 18+ structures) in public view.",
        punishment: "7 Day Ban + Build Removal",
      },
    ],
  },
];

export const Rules: React.FC = () => (
  <div style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: 60 }}>
    <div className="container-sm" style={{ paddingTop: 72, paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ marginBottom: 52 }}>
        <div className="tag" style={{ marginBottom: 14 }}>
          Rules & Terms
        </div>
        <h1 style={{ fontSize: 42, fontWeight: 800, marginBottom: 14 }}>
          Pixel Code of Conduct
        </h1>
        <p style={{ color: "var(--t2)", fontSize: 16, lineHeight: 1.65 }}>
          By joining the Pixel server, you automatically agree to abide by these
          rules. Ignorance of the rules does not excuse you from responsibility.
        </p>
      </div>

      {/* Status Card */}
      <div className="card" style={{ marginBottom: 40 }}>
        <div
          className="card-inner"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <div
              style={{
                fontWeight: 600,
                fontSize: 16,
                marginBottom: 6,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <AlertTriangle size={18} color="var(--blue)" />
              Document Status: Enforced
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{ fontSize: 13, color: "var(--t2)", marginBottom: 12 }}
              >
                All rules are currently active. Completion:{" "}
                <span style={{ color: "var(--blue)", fontWeight: 600 }}>
                  100%
                </span>
              </div>
            </div>
            <div
              style={{
                width: 220,
                height: 4,
                background: "var(--bg-3)",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "var(--blue)",
                  borderRadius: 4,
                  boxShadow: "0 0 10px var(--blue)",
                }}
              />
            </div>
          </div>
          <a
            href="https://t.me/pixel"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-blue btn-sm"
            style={{ textDecoration: "none" }}
          >
            Telegram <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Rules Rendering */}
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        {RULES_DATA.map((section, idx) => (
          <div key={idx}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 16,
                paddingBottom: 10,
                borderBottom: "1px solid var(--line)",
              }}
            >
              <div style={{ color: "var(--blue)", display: "flex" }}>
                {section.icon}
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--t1)" }}>
                {section.title}
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {section.rules.map((rule) => (
                <div
                  key={rule.id}
                  style={{
                    background: "var(--bg-1)",
                    border: "1px solid var(--line)",
                    borderRadius: 10,
                    padding: "16px 20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 14,
                      alignItems: "flex-start",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 800,
                        fontSize: 14,
                        color: "var(--blue)",
                        fontVariantNumeric: "tabular-nums",
                        marginTop: 2,
                      }}
                    >
                      {rule.id}
                    </span>
                    <span
                      style={{
                        fontWeight: 500,
                        fontSize: 15,
                        color: "var(--t1)",
                        lineHeight: 1.5,
                      }}
                    >
                      {rule.text}
                    </span>
                  </div>

                  {rule.punishment && (
                    <div style={{ paddingLeft: 38 }}>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          letterSpacing: ".04em",
                          textTransform: "uppercase",
                          color: "#ef4444", // Красный цвет
                          background: "rgba(239, 68, 68, 0.1)",
                          border: "1px solid rgba(239, 68, 68, 0.2)",
                          padding: "4px 10px",
                          borderRadius: 6,
                          display: "inline-block",
                        }}
                      >
                        Punishment: {rule.punishment}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
