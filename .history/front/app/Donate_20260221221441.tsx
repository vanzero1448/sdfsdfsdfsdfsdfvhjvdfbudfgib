import React from "react";
import {
  ShieldAlert,
  MessageSquare,
  Gamepad2,
  CreditCard,
  Scale,
} from "lucide-react";

interface RuleItem {
  id: string;
  text: string;
  punishment?: string;
}

interface RuleSection {
  title: string;
  icon: React.ReactNode;
  rules: RuleItem[];
}

const RULES_DATA: RuleSection[] = [
  {
    title: "1. General & Administration",
    icon: <ShieldAlert size={20} />,
    rules: [
      {
        id: "1.1",
        text: "The Administration reserves the right to modify, add, or remove these rules at any time without prior notification. Playing on the server implies automatic agreement.",
      },
      {
        id: "1.2",
        text: "The Administration has the absolute right to mute, kick, or permanently ban any regular player's account without warning and without explaining the reasons.",
        punishment: "Absolute Authority",
      },
      {
        id: "1.3",
        text: "Discussing, criticizing, or publicly questioning the actions of the Administration is strictly prohibited. The Administration's word is final.",
        punishment: "Mute 24h ➔ Permanent Ban",
      },
      {
        id: "1.4",
        text: "The Administration is not responsible for items, progress, or currency lost due to server restarts, bugs, rollbacks, or account wipes.",
      },
    ],
  },
  {
    title: "2. Chat & Player Conduct",
    icon: <MessageSquare size={20} />,
    rules: [
      {
        id: "2.1",
        text: "Treat other players with basic respect. Extreme toxicity, harassment, and discrimination are not tolerated.",
        punishment: "Mute 2h ➔ 7 Days",
      },
      {
        id: "2.2",
        text: "Spamming, flooding, caps abuse, and advertising other servers or third-party services are strictly forbidden.",
        punishment: "Mute 1h ➔ Permanent IP Ban (for Ads)",
      },
      {
        id: "2.3",
        text: "Doxxing (sharing personal information of others) or threatening the real-life safety of players or staff.",
        punishment: "Permanent Blacklist",
      },
    ],
  },
  {
    title: "3. Gameplay & Fair Play",
    icon: <Gamepad2 size={20} />,
    rules: [
      {
        id: "3.1",
        text: "The use of third-party software, cheats, scripts, or macros that provide an unfair advantage is strictly prohibited.",
        punishment: "30 Day Ban ➔ Permanent Ban",
      },
      {
        id: "3.2",
        text: "Exploiting game mechanics, duping items, or abusing server bugs is forbidden. You must report bugs to the staff.",
        punishment: "7 Day Ban + Wipe ➔ Permanent Ban",
      },
      {
        id: "3.3",
        text: "Bypassing a ban or mute using secondary accounts (alt-evading).",
        punishment: "Permanent Ban on all accounts",
      },
    ],
  },
  {
    title: "4. Purchases & Donators",
    icon: <CreditCard size={20} />,
    rules: [
      {
        id: "4.1",
        text: "No Immunity: Donators are subject to the exact same gameplay rules as regular players. Breaking rules will result in a ban regardless of money spent.",
      },
      {
        id: "4.2",
        text: "Donator Protection: Unlike regular players (Rule 1.2), players who have purchased a rank cannot be banned without a clearly stated reason and evidence of the violation.",
      },
      {
        id: "4.3",
        text: "No Refunds: All sales are strictly final. Refunds or chargebacks will not be issued under any circumstances (including bans or server wipes). Attempting a forced chargeback will result in a ban.",
        punishment: "Permanent Blacklist",
      },
      {
        id: "4.4",
        text: "The Administration reserves the right to modify, add, or remove the perks, names, and prices of any donator ranks at any time.",
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
          <Scale size={14} style={{ marginRight: 6 }} /> Code of Conduct
        </div>
        <h1
          style={{
            fontSize: 42,
            fontWeight: 800,
            marginBottom: 14,
            letterSpacing: "-0.02em",
          }}
        >
          Server Rules
        </h1>
        <p style={{ color: "var(--t2)", fontSize: 16, lineHeight: 1.65 }}>
          By playing on the Pixel server, you automatically agree to these
          terms. Ignorance of the rules does not excuse you from responsibility.
        </p>
      </div>

      {/* Rules List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {RULES_DATA.map((section, idx) => (
          <div
            key={idx}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            {/* Section Title */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                borderBottom: "1px solid var(--line)",
                paddingBottom: 12,
              }}
            >
              <div style={{ color: "var(--blue)", display: "flex" }}>
                {section.icon}
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--t1)" }}>
                {section.title}
              </h2>
            </div>

            {/* Rules in Section */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {section.rules.map((rule) => (
                <div
                  key={rule.id}
                  style={{
                    background: "var(--bg-1)",
                    border: "1px solid var(--line)",
                    borderRadius: 12,
                    padding: "16px 20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
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
                    <div style={{ display: "flex", paddingLeft: 38 }}>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          letterSpacing: ".03em",
                          color: "#ef4444",
                          background: "rgba(239, 68, 68, 0.1)",
                          border: "1px solid rgba(239, 68, 68, 0.2)",
                          padding: "4px 10px",
                          borderRadius: 6,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
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
