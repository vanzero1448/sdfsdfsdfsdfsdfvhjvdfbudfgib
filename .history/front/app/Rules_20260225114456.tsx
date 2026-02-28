import React, { useState } from "react";
import {
  ExternalLink,
  ShieldAlert,
  Swords,
  Hammer,
  MessageSquare,
  Gavel,
  AlertTriangle,
  ChevronDown,
} from "lucide-react";

interface Rule {
  id: string;
  text: string;
  punishment?: string;
}

interface RuleSection {
  title: string;
  short: string;
  icon: React.ReactNode;
  color: string;
  rules: Rule[];
}

const RULES_DATA: RuleSection[] = [
  {
    title: "Administration & Donators",
    short: "Admin Authority",
    color: "#a78bfa",
    icon: <Gavel size={18} strokeWidth={1.8} />,
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
        punishment: "Mute 24h → Permanent Ban",
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
    title: "General Conduct & Fair Play",
    short: "Fair Play",
    color: "#f43f5e",
    icon: <ShieldAlert size={18} strokeWidth={1.8} />,
    rules: [
      {
        id: "2.1",
        text: "The use of third-party software, cheats, hacked clients, scripts, or macros that provide an unfair gameplay advantage is strictly prohibited.",
        punishment: "30 Day Ban → Permanent Ban",
      },
      {
        id: "2.2",
        text: "Exploiting game mechanics, duping items, or abusing server bugs is forbidden. All bugs must be reported to the staff immediately.",
        punishment: "7 Day Ban + Wipe → Permanent Ban",
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
    title: "Chat & Communication",
    short: "Communication",
    color: "#34d399",
    icon: <MessageSquare size={18} strokeWidth={1.8} />,
    rules: [
      {
        id: "3.1",
        text: "Spamming, flooding the chat, excessive use of CAPS, and begging for items or ranks.",
        punishment: "Mute 1h → 12h",
      },
      {
        id: "3.2",
        text: "Extreme toxicity, harassment, bullying, and any form of discrimination or hate speech.",
        punishment: "Mute 24h → 7 Days",
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
    title: "PvP & Interaction",
    short: "PvP Rules",
    color: "#fb923c",
    icon: <Swords size={18} strokeWidth={1.8} />,
    rules: [
      {
        id: "4.1",
        text: "Combat logging (disconnecting from the server while in active PvP combat).",
        punishment: "Instant death + item loss (Automated)",
      },
      {
        id: "4.2",
        text: "Trapping players in unbreakable zones or continuously killing new players at spawn (Spawn-killing).",
        punishment: "Warn → 3 Day Ban",
      },
      {
        id: "4.3",
        text: "Scamming players during agreed-upon trades or stealing items during drop-trades.",
        punishment: "7 Day Ban + Inventory Rollback",
      },
    ],
  },
  {
    title: "Building & Territories",
    short: "Building",
    color: "#eab308",
    icon: <Hammer size={18} strokeWidth={1.8} />,
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

export const Rules: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);
  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <>
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Oxanium:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#07070b;--s1:#0b0b11;--s2:#0f0f16;--s3:#14141e;
  --w:rgba(255,255,255,.055);--w2:rgba(255,255,255,.1);--w3:rgba(255,255,255,.18);
  --t1:#eaeaf4;--t2:#76769a;--t3:#40405a;
  --fh:'Oxanium',sans-serif;--fb:'DM Sans',sans-serif;--fm:'IBM Plex Mono',monospace;
}
html,body{background:var(--bg);color:var(--t1);font-family:var(--fb);-webkit-font-smoothing:antialiased}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:var(--w2);border-radius:2px}

.rules-page{min-height:100vh;background:var(--bg);position:relative}
.rules-page::before{content:'';position:fixed;inset:0;pointer-events:none;z-index:0;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  background-size:300px 300px;opacity:.018}
.rules-page::after{content:'';position:fixed;inset:0;pointer-events:none;z-index:0;
  background-image:linear-gradient(var(--w) 1px,transparent 1px),linear-gradient(90deg,var(--w) 1px,transparent 1px);
  background-size:80px 80px;opacity:.5}
.z1{position:relative;z-index:1}
.cx{max-width:1080px;margin:0 auto;padding:0 28px}

/* ── HERO ── */
.r-hero{padding:88px 0 60px}
.r-hero-layout{display:flex;align-items:flex-end;justify-content:space-between}
.r-hero-text{flex:1;min-width:0}
.r-hero-img-wrap{flex-shrink:0;position:relative;width:300px;margin-bottom:-60px;
  display:flex;align-items:flex-end;justify-content:center;pointer-events:none}
@media(max-width:760px){.r-hero-img-wrap{display:none}}
.r-hero-char{width:270px;height:auto;object-fit:contain;position:relative;z-index:2;
  filter:drop-shadow(0 32px 48px rgba(0,0,0,.75));animation:rhfloat 4s ease-in-out infinite}
@keyframes rhfloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
.r-hero-glow{position:absolute;bottom:16px;left:50%;transform:translateX(-50%);
  width:160px;height:44px;border-radius:50%;background:rgba(244,63,94,.14);
  filter:blur(28px);z-index:1;animation:rgpulse 4s ease-in-out infinite}
@keyframes rgpulse{0%,100%{opacity:.5;transform:translateX(-50%) scaleX(1)}50%{opacity:.85;transform:translateX(-50%) scaleX(1.15)}}

.eyebrow{display:inline-flex;align-items:center;gap:10px;font-family:var(--fm);font-size:10px;
  color:var(--t3);letter-spacing:.15em;text-transform:uppercase;margin-bottom:20px}
.eyebrow-line{width:22px;height:1px;background:var(--w3)}
.r-hero-h{font-family:var(--fh);font-size:clamp(38px,6vw,68px);font-weight:800;
  line-height:.94;letter-spacing:-.035em;margin-bottom:20px;color:var(--t1)}
.r-hero-h .dim{color:rgba(255,255,255,.12)}
.r-hero-p{font-size:14px;color:var(--t2);line-height:1.8;max-width:380px}

/* ── STATUS BANNER ── */
.r-status{border:1px solid var(--w);border-radius:14px;background:var(--s1);
  padding:22px 28px;margin-bottom:56px;
  display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
.r-status-left{display:flex;align-items:center;gap:18px}
.r-status-icon{width:44px;height:44px;border-radius:10px;background:rgba(244,63,94,.08);
  border:1px solid rgba(244,63,94,.2);display:flex;align-items:center;justify-content:center;
  color:#f43f5e;flex-shrink:0}
.r-status-title{font-family:var(--fh);font-size:15px;font-weight:700;letter-spacing:-.015em;margin-bottom:4px}
.r-status-sub{font-family:var(--fm);font-size:10px;color:var(--t3);letter-spacing:.06em}
.r-status-bar-wrap{width:160px;height:3px;background:var(--s3);border-radius:3px;overflow:hidden;margin-top:8px}
.r-status-bar{height:100%;background:#f43f5e;border-radius:3px;
  box-shadow:0 0 8px rgba(244,63,94,.5);width:100%}
.r-status-cta{display:inline-flex;align-items:center;gap:7px;padding:10px 18px;border-radius:8px;
  border:1px solid rgba(244,63,94,.28);background:rgba(244,63,94,.07);
  font-family:var(--fb);font-size:13px;font-weight:600;color:#fb7185;
  text-decoration:none;transition:all .2s;cursor:pointer}
.r-status-cta:hover{background:rgba(244,63,94,.14);border-color:rgba(244,63,94,.5)}

/* ── SECTION HEADER ── */
.sh{display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-bottom:18px}
.sh-title{font-family:var(--fh);font-size:17px;font-weight:700;letter-spacing:-.015em}
.sh-sub{font-family:var(--fm);font-size:10px;color:var(--t3);margin-top:5px;letter-spacing:.06em}
.div{height:1px;background:var(--w);margin-bottom:28px}

/* ── RULE SECTIONS (accordion) ── */
.r-sections{display:flex;flex-direction:column;gap:10px;margin-bottom:80px}

.r-sec{background:var(--s1);border:1px solid var(--w);border-radius:14px;overflow:hidden;
  transition:border-color .25s}
.r-sec.open{border-color:var(--sec-color,var(--w2))}

.r-sec-head{
  display:flex;align-items:center;gap:16px;
  padding:18px 22px;cursor:pointer;
  transition:background .2s;
  user-select:none;
}
.r-sec-head:hover{background:var(--s2)}

.r-sec-icon{
  width:38px;height:38px;border-radius:9px;
  display:flex;align-items:center;justify-content:center;
  flex-shrink:0;
  transition:box-shadow .25s;
}
.r-sec.open .r-sec-icon{box-shadow:0 0 16px var(--sec-color-shadow,transparent)}

.r-sec-num{
  font-family:var(--fm);font-size:9px;font-weight:600;
  letter-spacing:.14em;text-transform:uppercase;
  color:var(--t3);margin-bottom:2px;
}
.r-sec-title{font-family:var(--fh);font-size:15px;font-weight:800;letter-spacing:-.015em}
.r-sec-count{
  font-family:var(--fm);font-size:9px;letter-spacing:.1em;text-transform:uppercase;
  color:var(--t3);border:1px solid var(--w);background:var(--s2);
  padding:2px 8px;border-radius:4px;margin-left:auto;flex-shrink:0;
}
.r-sec-chevron{color:var(--t3);flex-shrink:0;transition:transform .3s cubic-bezier(.34,1.2,.64,1)}
.r-sec.open .r-sec-chevron{transform:rotate(180deg)}

/* top bar line */
.r-sec-bar{height:1px}

/* rule list */
.r-sec-body{
  overflow:hidden;
  max-height:0;
  transition:max-height .45s cubic-bezier(.4,0,.2,1);
}
.r-sec.open .r-sec-body{max-height:2000px}

.r-rules-list{
  border-top:1px solid var(--w);
  display:flex;flex-direction:column;
  gap:0;
}

.r-rule{
  display:flex;flex-direction:column;gap:10px;
  padding:16px 22px;
  border-bottom:1px solid var(--w);
  transition:background .18s;
}
.r-rule:last-child{border-bottom:none}
.r-rule:hover{background:var(--s2)}

.r-rule-top{display:flex;align-items:flex-start;gap:14px}
.r-rule-id{
  font-family:var(--fm);font-size:12px;font-weight:600;
  letter-spacing:.04em;flex-shrink:0;margin-top:2px;
  min-width:28px;
}
.r-rule-text{font-size:14px;color:var(--t2);line-height:1.65}

.r-punishment{
  margin-left:42px;
  display:inline-flex;align-items:center;gap:6px;
  font-family:var(--fm);font-size:10px;font-weight:600;
  letter-spacing:.06em;text-transform:uppercase;
  color:#fb7185;
  background:rgba(244,63,94,.07);
  border:1px solid rgba(244,63,94,.2);
  padding:4px 10px;border-radius:5px;
}
.r-punishment::before{
  content:'';width:5px;height:5px;border-radius:50%;
  background:#f43f5e;flex-shrink:0;
  box-shadow:0 0 6px #f43f5e;
}

.rc,.r-sec{animation:ci .35s ease both}
@keyframes ci{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
`}</style>

      <div className="rules-page">
        <div className="z1">
          <div className="cx">
            {/* ── HERO ── */}
            <div className="r-hero">
              <div className="r-hero-layout">
                <div className="r-hero-text">
                  <div className="eyebrow">
                    <div className="eyebrow-line" />
                    Server Rules
                    <div className="eyebrow-line" />
                  </div>
                  <h1 className="r-hero-h">
                    Pixel
                    <br />
                    <span className="dim">Code of</span> Conduct
                  </h1>
                  <p className="r-hero-p">
                    By joining Pixel you automatically agree to these rules.
                    Ignorance does not excuse responsibility. Read carefully.
                  </p>
                </div>
                <div className="r-hero-img-wrap">
                  <div className="r-hero-glow" />
                  <img
                    className="r-hero-char"
                    src="/img/herorules.png"
                    alt="rules hero"
                  />
                </div>
              </div>
            </div>

            {/* ── STATUS BANNER ── */}
            <div className="r-status">
              <div className="r-status-left">
                <div className="r-status-icon">
                  <AlertTriangle size={20} strokeWidth={1.8} />
                </div>
                <div>
                  <div className="r-status-title">
                    Document Status: Enforced
                  </div>
                  <div className="r-status-sub">
                    // All rules are active · v2025 ·{" "}
                    {RULES_DATA.reduce((a, s) => a + s.rules.length, 0)} total
                    rules
                  </div>
                  <div className="r-status-bar-wrap">
                    <div className="r-status-bar" />
                  </div>
                </div>
              </div>
              <a
                href="https://t.me/pixelhyt"
                target="_blank"
                rel="noopener noreferrer"
                className="r-status-cta"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-2.048 9.643c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.463c.537-.194 1.006.131.811.58z" />
                </svg>
                Telegram
                <ExternalLink size={11} />
              </a>
            </div>

            {/* ── RULES LIST ── */}
            <div className="sh">
              <div>
                <div className="sh-title">Rules Sections</div>
                <div className="sh-sub">// Click a section to expand rules</div>
              </div>
            </div>
            <div className="div" />

            <div className="r-sections">
              {RULES_DATA.map((section, idx) => {
                const isOpen = open === idx;
                return (
                  <div
                    key={idx}
                    className={`r-sec${isOpen ? " open" : ""}`}
                    style={
                      {
                        "--sec-color": section.color + "55",
                        "--sec-color-shadow": section.color + "40",
                        animationDelay: `${idx * 60}ms`,
                        borderColor: isOpen ? section.color + "44" : undefined,
                      } as React.CSSProperties
                    }
                  >
                    {/* top accent bar */}
                    <div
                      className="r-sec-bar"
                      style={{
                        background: isOpen
                          ? `linear-gradient(90deg, ${section.color}80, transparent)`
                          : "transparent",
                        transition: "background .3s",
                      }}
                    />

                    {/* header */}
                    <div className="r-sec-head" onClick={() => toggle(idx)}>
                      <div
                        className="r-sec-icon"
                        style={{
                          background: section.color + "12",
                          border: `1px solid ${section.color}30`,
                          color: section.color,
                        }}
                      >
                        {section.icon}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="r-sec-num">Section {idx + 1}</div>
                        <div className="r-sec-title">{section.title}</div>
                      </div>
                      <div className="r-sec-count">
                        {section.rules.length} rules
                      </div>
                      <div className="r-sec-chevron">
                        <ChevronDown size={16} />
                      </div>
                    </div>

                    {/* body */}
                    <div className="r-sec-body">
                      <div className="r-rules-list">
                        {section.rules.map((rule) => (
                          <div key={rule.id} className="r-rule">
                            <div className="r-rule-top">
                              <span
                                className="r-rule-id"
                                style={{ color: section.color }}
                              >
                                {rule.id}
                              </span>
                              <span className="r-rule-text">{rule.text}</span>
                            </div>
                            {rule.punishment && (
                              <div className="r-punishment">
                                {rule.punishment}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
