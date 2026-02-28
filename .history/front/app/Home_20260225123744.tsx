import React, { useState } from "react";
import {
  Copy,
  Check,
  ArrowRight,
  ExternalLink,
  LogIn,
  User,
} from "lucide-react";
import { Page } from "../types";
// Ensure AuthModal is imported in your actual code:
// import { AuthModal } from "./AuthModal";

interface Props {
  onNavigate: (p: Page) => void;
}

export const Home: React.FC<Props> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [launcherTokens, setLauncherTokens] = useState<any>(null);

  const copy = () => {
    navigator.clipboard.writeText("play.pixel.net").catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoginSuccess = (tokens: any) => {
    setLauncherTokens(tokens);
    setShowAuth(false);
  };

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50%       { transform: translateY(-14px) rotate(1deg); }
        }
        .survival-img {
          animation: float 5s ease-in-out infinite;
          filter: drop-shadow(0 20px 40px rgba(59,130,246,0.25));
        }
      `}</style>

      {/* AuthModal - Requires the component to be imported */}
      {showAuth && (
        <div className="auth-modal-placeholder">
          {/* <AuthModal onClose={() => setShowAuth(false)} onLoginSuccess={handleLoginSuccess} onNavigate={onNavigate} /> */}
        </div>
      )}

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg">
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          >
            <source src="/img/fight.mp4" type="video/mp4" />
            <img
              src="/img/view.jpeg"
              alt="Background"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </video>
        </div>
        <div className="hero-scrim" />

        <div className="container hero-content" style={{ width: "100%" }}>
          <div style={{ maxWidth: 600 }}>
            <div className="fade-in d1" style={{ marginBottom: 24 }}>
              <div className="status-pill">
                <div className="online-dot" />
                <span style={{ color: "var(--t2)" }}>
                  Server is online · Hytale
                </span>
              </div>
            </div>

            <h1
              className="fade-up d2"
              style={{
                fontSize: 72,
                fontWeight: 800,
                color: "#fff",
                marginBottom: 20,
                lineHeight: 1.05,
              }}
            >
              First
              <br />
              <span style={{ color: "var(--blue)" }}>and best</span>
            </h1>

            <p
              className="fade-up d3"
              style={{
                fontSize: 17,
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.7,
                marginBottom: 36,
                maxWidth: 460,
              }}
            >
              Build networks, gather factions, explore the system. Pixel is a
              next-generation Hytale server.
            </p>

            <div
              className="fade-up d4"
              style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
            >
              <button
                className="btn btn-blue btn-lg"
                onClick={() => onNavigate(Page.DONATE)}
              >
                Go to Store
                <ArrowRight size={16} />
              </button>

              <button className="btn btn-ghost btn-lg" onClick={copy}>
                {copied ? (
                  <>
                    <Check size={15} /> Copied
                  </>
                ) : (
                  <>
                    <Copy size={15} /> play.pixel.net
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            opacity: 0.35,
          }}
        >
          <div
            style={{
              width: 1,
              height: 48,
              background: "linear-gradient(to bottom, white, transparent)",
            }}
          />
        </div>
      </section>

{/* ── MODES ── */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div style={{ marginBottom: 36 }}>
            <div className="tag" style={{ marginBottom: 12 }}>Game Modes</div>
            <h2 style={{ fontSize: 34, fontWeight: 700 }}>Choose your journey</h2>
          </div>

          {/* SERVER CARD */}
          <div className="card" style={{ marginBottom: 12, overflow: "hidden", padding: 0 }}>
            {/* Top accent bar */}
            <div style={{ height: 2, background: "linear-gradient(90deg, var(--blue), transparent)" }} />

            <div style={{ display: "flex", alignItems: "stretch", flexWrap: "wrap" }}>

              {/* Image zone */}
              <div style={{
                width: 200, flexShrink: 0,
                position: "relative",
                background: "var(--bg-2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "28px 16px",
                overflow: "hidden",
              }}>
                {/* glow */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "radial-gradient(ellipse at 50% 80%, rgba(59,130,246,.12) 0%, transparent 70%)",
                  pointerEvents: "none",
                }} />
                <img
                  src="/img/survival.jpg"
                  alt="Survival ONE"
                  className="survival-img"
                  style={{ width: "100%", maxWidth: 150, height: "auto", objectFit: "contain", position: "relative", zIndex: 1 }}
                />
              </div>

              {/* Divider */}
              <div style={{ width: 1, background: "var(--line)", flexShrink: 0 }} />

              {/* Content */}
              <div style={{ flex: 1, padding: "26px 28px", minWidth: 220, display: "flex", flexDirection: "column", gap: 18 }}>

                {/* Header row */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <div className="pill">Available</div>
                      <span style={{ fontSize: 11, color: "var(--t3)", fontFamily: "var(--mono, monospace)", letterSpacing: ".08em" }}>survival · pve/pvp</span>
                    </div>
                    <h3 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-.02em" }}>Survival ONE</h3>
                  </div>
                  {/* Online badge */}
                  <div style={{
                    display: "flex", alignItems: "center", gap: 7,
                    background: "rgba(34,197,94,.07)", border: "1px solid rgba(34,197,94,.2)",
                    borderRadius: 8, padding: "6px 12px",
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e" }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#22c55e" }}>Online</span>
                  </div>
                </div>

                {/* Description */}
                <p style={{ color: "var(--t2)", fontSize: 14, lineHeight: 1.65, margin: 0 }}>
                  Hardcore survival with unique world generation, technical artifacts, and a complex faction system. Build your empire, forge alliances, and dominate the leaderboard.
                </p>

                {/* Stats row */}
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {[
                    { val: "500",    lbl: "Slots" },
                    { val: "SMP",    lbl: "Mode" },
                    { val: "24/7",   lbl: "Uptime" },
                    { val: "1.0",    lbl: "Season" },
                  ].map(({ val, lbl }) => (
                    <div key={lbl} style={{
                      background: "var(--bg-2)", border: "1px solid var(--line)",
                      borderRadius: 8, padding: "8px 16px",
                      display: "flex", flexDirection: "column", alignItems: "center", minWidth: 64,
                    }}>
                      <span style={{ fontSize: 18, fontWeight: 700, color: "var(--t1)", letterSpacing: "-.035em", lineHeight: 1 }}>{val}</span>
                      <span style={{ fontSize: 10, fontWeight: 600, color: "var(--t3)", textTransform: "uppercase", letterSpacing: ".08em", marginTop: 3 }}>{lbl}</span>
                    </div>
                  ))}
                </div>

                {/* IP row */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 10,
                  background: "var(--bg-2)", border: "1px solid var(--line)",
                  borderRadius: 8, padding: "10px 14px",
                }}>
                  <span style={{ fontSize: 11, color: "var(--t3)", fontFamily: "var(--mono, monospace)", letterSpacing: ".06em", textTransform: "uppercase" }}>IP</span>
                  <span style={{ flex: 1, fontSize: 13, fontWeight: 600, fontFamily: "var(--mono, monospace)", color: "var(--t1)", letterSpacing: ".04em" }}>
                    play.pixel.net
                  </span>
                  <button
                    className="btn btn-ghost btn-sm"
                    style={{ padding: "4px 10px", fontSize: 11 }}
                    onClick={copy}
                  >
                    {copied ? <><Check size={11} /> Copied</> : <><Copy size={11} /> Copy</>}
                  </button>
                </div>

                {/* Action buttons */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button
                    className="btn btn-blue btn-sm"
                    onClick={() => onNavigate(Page.DONATE)}
                  >
                    Go to Store <ArrowRight size={13} />
                  </button>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => setShowHowTo(true)}
                  >
                    <BookOpen size={13} /> How to Play
                  </button>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => onNavigate(Page.COMMUNITY)}
                  >
                    Community
                  </button>
                </div>

              </div>
            </div>
          </div>

          {/* Coming soon */}
          <div style={{
            border: "1px dashed rgba(255,255,255,0.07)", borderRadius: 12,
            padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", color: "var(--t3)",
          }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>New Mode</div>
              <div style={{ fontSize: 13 }}>In development</div>
            </div>
            <div style={{ fontSize: 18, opacity: 0.3 }}>···</div>
          </div>
        </div>
      </section>

      {/* ── HOW TO PLAY MODAL ── */}
      {showHowTo && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 900,
            background: "rgba(0,0,0,.85)", backdropFilter: "blur(18px)",
            display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
            animation: "fo .18s ease",
          }}
          onClick={() => setShowHowTo(false)}
        >
          <div
            style={{
              background: "var(--bg-1)", border: "1px solid var(--line)",
              borderRadius: 18, width: "100%", maxWidth: 560,
              maxHeight: "90vh", overflowY: "auto",
              animation: "su .28s cubic-bezier(.34,1.1,.64,1)",
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Stripe */}
            <div style={{ height: 1, background: "var(--blue)", borderRadius: "18px 18px 0 0" }} />

            <div style={{ padding: "26px 28px" }}>
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                <div>
                  <div style={{ fontFamily: "var(--mono, monospace)", fontSize: 9, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--t3)", marginBottom: 6 }}>// Getting Started</div>
                  <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-.025em" }}>How to Play</h2>
                </div>
                <button
                  onClick={() => setShowHowTo(false)}
                  style={{ background: "var(--bg-2)", border: "1px solid var(--line)", borderRadius: 8, padding: "6px 8px", cursor: "pointer", color: "var(--t3)", lineHeight: 1 }}
                >
                  <X size={15} />
                </button>
              </div>

              {/* Steps */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  {
                    num: "01",
                    title: "Download Hytale",
                    desc: "Get the official Hytale launcher from the Hytale website and install it on your PC.",
                    color: "#60a5fa",
                  },
                  {
                    num: "02",
                    title: "Launch & Log In",
                    desc: "Open the launcher, create or sign in to your Hytale account to get started.",
                    color: "#34d399",
                  },
                  {
                    num: "03",
                    title: "Add Server IP",
                    desc: 'Go to Multiplayer → Add Server and enter the IP: play.pixel.net — then click Save.',
                    color: "#a78bfa",
                    code: "play.pixel.net",
                  },
                  {
                    num: "04",
                    title: "Join & Play",
                    desc: "Select Pixel from your server list and click Join. Welcome to the server!",
                    color: "#fb923c",
                  },
                  {
                    num: "05",
                    title: "Get Perks (optional)",
                    desc: "Visit our Store to unlock ranks, kits, and cosmetics to enhance your experience.",
                    color: "#f43f5e",
                  },
                ].map(step => (
                  <div
                    key={step.num}
                    style={{
                      display: "flex", gap: 16, alignItems: "flex-start",
                      background: "var(--bg-2)", border: "1px solid var(--line)",
                      borderRadius: 10, padding: "14px 16px",
                    }}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                      background: step.color + "12", border: `1px solid ${step.color}30`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--mono, monospace)", fontSize: 11, fontWeight: 700,
                      color: step.color, letterSpacing: ".04em",
                    }}>
                      {step.num}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{step.title}</div>
                      <div style={{ fontSize: 13, color: "var(--t2)", lineHeight: 1.6 }}>{step.desc}</div>
                      {step.code && (
                        <div style={{
                          marginTop: 8, display: "inline-flex", alignItems: "center", gap: 8,
                          background: "var(--bg-3, var(--bg))", border: "1px solid var(--line)",
                          borderRadius: 6, padding: "4px 10px",
                          fontFamily: "var(--mono, monospace)", fontSize: 12,
                          color: step.color, letterSpacing: ".04em",
                        }}>
                          {step.code}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer CTA */}
              <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
                <button className="btn btn-blue btn-sm" style={{ flex: 1 }} onClick={() => { setShowHowTo(false); onNavigate(Page.DONATE); }}>
                  Go to Store <ArrowRight size={13} />
                </button>
                <button className="btn btn-ghost btn-sm" onClick={copy}>
                  {copied ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy IP</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CTA ── */}
      <section
        style={{
          background: "var(--bg-1)",
          padding: "72px 0",
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div className="tag" style={{ marginBottom: 14 }}>
            Join Us
          </div>
          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>
            Ready to start?
          </h2>
          <p
            style={{
              color: "var(--t2)",
              fontSize: 15,
              marginBottom: 28,
              maxWidth: 360,
            }}
          >
            Purchase a rank and support the server's development.
          </p>
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <button
              className="btn btn-blue btn-lg"
              onClick={() => onNavigate(Page.DONATE)}
            >
              Go to Store
            </button>
            <a
              href="https://t.me/pixelhyt"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-lg"
              style={{ textDecoration: "none" }}
            >
              Telegram <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
