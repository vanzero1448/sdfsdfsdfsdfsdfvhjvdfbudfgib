import React, { useState, useEffect, useRef } from "react";
import {
  X,
  ArrowRight,
  Crown,
  Check,
  Zap,
  Package,
  ChevronRight,
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════════ */

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
      "The entry point of the Pixel universe. Unique chat presence and survival utilities to get you started.",
    commands: ["/back", "/heal", "/clearinv", "/trash", "/afk", "/kit ping"],
    perks: [
      "[Ping] chat prefix",
      "Neon-styled messages",
      "3 Home points",
      "/back — return to death",
      "/heal (5 min cooldown)",
      "/clearinv & /trash",
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
      "A solid packet of data. Better survival tools and server-wide broadcasting at your fingertips.",
    commands: [
      "/fly",
      "/freecam",
      "/bc",
      "/ignore",
      "/bonus_packet",
      "/repair",
      "/kit packet",
    ],
    perks: [
      "[Packet] chat prefix",
      "5 Home points",
      "Flight /fly",
      "Free camera /freecam",
      "Server broadcast /bc",
      "Item repair (5 min CD)",
      "$25K money bonus",
      "All Ping privileges",
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
      "Follow the protocol. Access god mode, inventory inspection, and the legendary moonwalk animation.",
    commands: [
      "/god",
      "/inv",
      "/moonwalk",
      "/neardeath",
      "/seen",
      "/bonus_protocol",
      "/clearchat",
      "/repair all",
    ],
    perks: [
      "[Protocol] chat prefix",
      "7 Home points",
      "God mode /god",
      "View player inventories /inv",
      "Moonwalk animation",
      "/seen — last login",
      "$50K money bonus",
      "Repair all items",
      "Custom prefix on Lifetime",
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
      "Write your own destiny. Gamemode switching, global chat clear, and player IP info at a glance.",
    commands: [
      "/gmc",
      "/gma",
      "/clearchat",
      "/bonus_script",
      "/ipinfo",
      "/kit script",
    ],
    perks: [
      "[Script] chat prefix",
      "10 Home points",
      "Creative /gmc & Survival /gma",
      "Clear global chat",
      "$100K money bonus",
      "Player IP /ipinfo",
      "All previous privileges",
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
      "Deep system access. Damage players, grant flight, phase through walls, and teleport by gaze.",
    commands: [
      "/hurt",
      "/fly (others)",
      "/thru",
      "/jump",
      "/freeze_me",
      "/bonus_kernel",
    ],
    perks: [
      "[Kernel] chat prefix",
      "15 Home points",
      "Damage players /hurt (30m CD)",
      "Grant others flight (30m CD)",
      "Phase through walls /thru",
      "Teleport by gaze /jump",
      "$200K money bonus",
      "Self-freeze /freeze_me",
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
      "Unreadable by enemies. God-gift other players, surveil inventories, and create your own server warp.",
    commands: [
      "/god (others)",
      "/freeze",
      "/socialspy",
      "/setwarp",
      "/bonus_cipher",
    ],
    perks: [
      "[Cipher] chat prefix",
      "25 Home points",
      "God mode for others (30m CD)",
      "Freeze players /freeze",
      "Social spy /socialspy",
      "Own warp /setwarp",
      "$300K money bonus",
      "All previous privileges",
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
      "Bend reality. Full teleport authority, admin chat access, and player moderation rights.",
    commands: ["/tp (full)", "/a", "/mute", "/kick", "/kit quantum"],
    perks: [
      "[Quantum] chat prefix",
      "Full teleport /tp",
      "Admin chat /a",
      "Mute players /mute",
      "Kick players /kick",
      "Quantum particle effect",
      "All previous privileges",
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
      "Pure processing power. WorldEdit selection tools and temporary ban authority — near-total server control.",
    commands: ["/set", "/pos1", "/pos2", "/tempban", "/kit core"],
    perks: [
      "[Core] chat prefix",
      "Unlimited homes",
      "WorldEdit /set /pos1 /pos2",
      "Temporary ban /tempban",
      "Core aura effect",
      "All previous privileges",
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
      "Running at maximum frequency. Unmatched privileges and supreme server priority.",
    commands: ["/kit overclock", "/fly", "/god", "/sudo", "/top", "/v"],
    perks: [
      "[Overclock] chat prefix",
      "Force commands /sudo",
      "Teleport top /top",
      "Maximum server priority",
      "Overclocked kit drops",
      "Overclock particle effect",
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
      "The final tier. Every command on the server, VIP event access, and a direct line to the developers.",
    commands: ["/kit singularity", "ALL COMMANDS"],
    perks: [
      "[Singularity] chat prefix",
      "Every server command",
      "VIP event access",
      "Unique singularity particle",
      "Direct developer support",
      "Custom Discord role",
    ],
  },
];

const STARTER_PACKS = [
  {
    id: "s1",
    name: "Novice",
    label: "STARTER",
    tagline: "The perfect first step",
    price: 5,
    color: "#60a5fa",
    img: "/img/starter/s1.png",
    includes: [
      "Ping rank — 3 Months",
      "Exclusive Novice Kit",
      "Novice cosmetic set",
      "500 starter coins",
    ],
  },
  {
    id: "s2",
    name: "Pro",
    label: "POPULAR",
    tagline: "Hit the ground running",
    price: 12,
    color: "#34d399",
    img: "/img/starter/s2.png",
    includes: [
      "Packet rank — Lifetime",
      "Exclusive Pro Kit",
      "Pro cosmetic set",
      "2,500 starter coins",
    ],
  },
  {
    id: "s3",
    name: "Sponsor",
    label: "BEST VALUE",
    tagline: "Support and dominate",
    price: 24,
    color: "#a78bfa",
    img: "/img/starter/s3.png",
    includes: [
      "Protocol rank — Lifetime",
      "Exclusive Sponsor Kit",
      "Sponsor cosmetic set",
      "7,500 starter coins",
    ],
  },
];

const COSMETICS = [
  {
    id: "pet_ember",
    name: "Ember Dragon",
    type: "Pet",
    price: 4.99,
    color: "#f43f5e",
    icon: "/img/cosmetics/ember_dragon.png",
    description:
      "A miniature dragon companion that trails ember particles in your wake.",
    rarity: "Legendary",
  },
];

const PERIOD_LABELS = {
  month: "1 Month",
  quarter: "3 Months",
  forever: "Lifetime",
};
const PERIODS = ["month", "quarter", "forever"] as const;
type PeriodType = (typeof PERIODS)[number];

/* ══════════════════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════════════════ */
export const Donate: React.FC = () => {
  const [selected, setSelected] = useState<Rank | null>(null);
  const [period, setPeriod] = useState<PeriodType>("forever");
  const [modalPeriod, setModalPeriod] = useState<PeriodType>("forever");
  const [tab, setTab] = useState<"ranks" | "cosmetics">("ranks");

  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [pill, setPill] = useState({ x: 0, w: 0 });
  const mTabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [mPill, setMPill] = useState({ x: 0, y: 0, w: 0, h: 0 });

  useEffect(() => {
    const i = PERIODS.indexOf(period);
    const el = tabsRef.current[i];
    if (el) setPill({ x: el.offsetLeft, w: el.offsetWidth });
  }, [period]);

  useEffect(() => {
    const update = () => {
      const i = PERIODS.indexOf(modalPeriod);
      const el = mTabsRef.current[i];
      if (el)
        setMPill({
          x: el.offsetLeft,
          y: el.offsetTop,
          w: el.offsetWidth,
          h: el.offsetHeight,
        });
    };
    setTimeout(update, 10);
  }, [modalPeriod, selected]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oxanium:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg:   #07070b;
          --s1:   #0b0b11;
          --s2:   #0f0f16;
          --s3:   #14141e;
          --w:    rgba(255,255,255,.055);
          --w2:   rgba(255,255,255,.1);
          --w3:   rgba(255,255,255,.16);
          --t1:   #eaeaf4;
          --t2:   #76769a;
          --t3:   #40405a;
          --fh:   'Oxanium', sans-serif;
          --fb:   'DM Sans', sans-serif;
          --fm:   'IBM Plex Mono', monospace;
        }

        html, body {
          background: var(--bg); color: var(--t1);
          font-family: var(--fb); -webkit-font-smoothing: antialiased;
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: var(--w2); border-radius: 2px; }

        .store { min-height: 100vh; background: var(--bg); position: relative; }

        /* subtle noise */
        .store::before {
          content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          background-repeat: repeat; background-size: 300px 300px;
          opacity: .018;
        }
        .store::after {
          content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(var(--w) 1px, transparent 1px),
            linear-gradient(90deg, var(--w) 1px, transparent 1px);
          background-size: 80px 80px; opacity: .5;
        }

        .z1 { position: relative; z-index: 1; }
        .cx { max-width: 1180px; margin: 0 auto; padding: 0 28px; }

        /* ─── HERO ─── */
        .hero { padding: 96px 0 60px; position: relative; overflow: visible; }
        .hero-layout { display: flex; align-items: flex-end; justify-content: space-between; gap: 0; }
        .hero-text { flex: 1; min-width: 0; }
        .hero-img-wrap {
          flex-shrink: 0; position: relative; width: 340px; margin-bottom: -60px;
          display: flex; align-items: flex-end; justify-content: center;
          pointer-events: none; user-select: none;
        }
        @media(max-width: 760px){ .hero-img-wrap { display: none; } }
        .hero-char {
          width: 300px; height: auto; object-fit: contain;
          position: relative; z-index: 2;
          filter: drop-shadow(0 40px 60px rgba(0,0,0,.7));
          animation: heroFloat 4s ease-in-out infinite;
        }
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .hero-char-glow {
          position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
          width: 200px; height: 60px; border-radius: 50%;
          background: rgba(124,92,252,.18); filter: blur(28px);
          z-index: 1; animation: glowPulse 4s ease-in-out infinite;
        }
        @keyframes glowPulse {
          0%, 100% { opacity: .5; transform: translateX(-50%) scaleX(1); }
          50% { opacity: .9; transform: translateX(-50%) scaleX(1.15); }
        }
        .eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--fm); font-size: 10px; color: var(--t3);
          letter-spacing: .15em; text-transform: uppercase; margin-bottom: 22px;
        }
        .eyebrow-line { width: 24px; height: 1px; background: var(--w3); }
        .hero-title {
          font-family: var(--fh); font-size: clamp(42px, 6.5vw, 76px);
          font-weight: 800; line-height: .94; letter-spacing: -.035em;
          margin-bottom: 22px; color: var(--t1);
        }
        .hero-title .dim { color: rgba(255,255,255,.15); }
        .hero-body { font-size: 14px; color: var(--t2); line-height: 1.8; max-width: 380px; }

        /* ─── SECTION NAV ─── */
        .snav { display: flex; border-bottom: 1px solid var(--w); margin-bottom: 56px; }
        .snav-btn {
          font-family: var(--fb); font-size: 13px; font-weight: 600; letter-spacing: .01em;
          padding: 13px 22px; border: none; background: transparent; cursor: pointer;
          color: var(--t3); position: relative; transition: color .2s;
        }
        .snav-btn.on { color: var(--t1); }
        .snav-btn.on::after {
          content: ''; position: absolute; bottom: -1px; left: 0; right: 0; height: 1px;
          background: var(--t1);
        }

        /* ─── BATTLE PASS ─── */
        .bp {
          border: 1px solid var(--w); border-radius: 14px; overflow: hidden;
          background: var(--s1); margin-bottom: 72px; cursor: pointer;
          transition: border-color .3s;
        }
        .bp:hover { border-color: rgba(124,92,252,.35); }
        .bp-topline { height: 1px; background: rgba(124,92,252,.7); }
        .bp-layout { display: grid; grid-template-columns: 1fr 200px; }
        @media(max-width: 640px){ .bp-layout { grid-template-columns: 1fr; } }
        .bp-left { padding: 38px 42px; }
        .bp-right {
          border-left: 1px solid var(--w); display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 14px; padding: 36px 28px;
        }
        @media(max-width:640px){
          .bp-right { border-left: none; border-top: 1px solid var(--w); padding: 28px; }
        }
        .bp-chip {
          display: inline-flex; align-items: center; gap: 5px;
          font-family: var(--fm); font-size: 9px; letter-spacing: .16em;
          text-transform: uppercase; color: var(--t3); border: 1px solid var(--w2);
          border-radius: 4px; padding: 3px 9px; margin-bottom: 14px;
        }
        .bp-h { font-family: var(--fh); font-size: 30px; font-weight: 800; letter-spacing: -.03em; margin-bottom: 10px; }
        .bp-p { font-size: 13px; color: var(--t2); line-height: 1.75; max-width: 440px; margin-bottom: 24px; }
        .bp-tags { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 28px; }
        .bp-tag {
          display: flex; align-items: center; gap: 7px;
          border: 1px solid var(--w); border-radius: 5px; padding: 5px 12px;
          font-size: 11px; color: var(--t2);
        }
        .bp-dot { width: 4px; height: 4px; border-radius: 50%; background: rgba(124,92,252,.8); flex-shrink: 0; }
        .bp-cta {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 20px; border-radius: 7px; cursor: pointer;
          border: 1px solid rgba(124,92,252,.3); background: rgba(124,92,252,.09);
          font-family: var(--fb); font-size: 13px; font-weight: 600; color: #b4a4ff;
          transition: background .2s, border-color .2s;
        }
        .bp-cta:hover { background: rgba(124,92,252,.17); border-color: rgba(124,92,252,.55); }
        .bp-img { width: 80px; height: 80px; object-fit: contain; }
        .bp-price { font-family: var(--fh); font-size: 50px; font-weight: 800; letter-spacing: -.05em; line-height: 1; color: var(--t1); }
        .bp-plabel { font-family: var(--fm); font-size: 9px; letter-spacing: .12em; text-transform: uppercase; color: var(--t3); margin-top: 4px; text-align: center; }

        /* ─── SECTION HEADER ─── */
        .sh { display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: 16px; margin-bottom: 18px; }
        .sh-title { font-family: var(--fh); font-size: 17px; font-weight: 700; letter-spacing: -.015em; }
        .sh-sub { font-family: var(--fm); font-size: 10px; color: var(--t3); margin-top: 5px; letter-spacing: .06em; }
        .div { height: 1px; background: var(--w); margin-bottom: 26px; }

        /* ─── PERIOD SWITCHER ─── */
        .psw {
          position: relative; display: inline-flex;
          background: var(--s2); border: 1px solid var(--w);
          border-radius: 7px; padding: 3px; gap: 2px;
        }
        .psw-bg {
          position: absolute; top: 3px; bottom: 3px; left: 0;
          background: var(--s3); border: 1px solid var(--w2); border-radius: 5px;
          transition: transform .45s cubic-bezier(.34,1.4,.64,1), width .35s cubic-bezier(.34,1.4,.64,1);
          pointer-events: none;
        }
        .psw-btn {
          position: relative; z-index: 1; padding: 7px 16px; border: none;
          background: transparent; cursor: pointer; font-family: var(--fb);
          font-size: 12px; font-weight: 600; border-radius: 4px;
          transition: color .25s; white-space: nowrap;
        }

        /* ─── STARTER PACKS ─── */
        .sp-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 12px; margin-bottom: 72px;
        }
        @media(max-width: 760px){ .sp-grid { grid-template-columns: 1fr; } }

        .sp-card {
          background: var(--s1); border: 1px solid var(--w);
          border-radius: 14px; overflow: hidden; cursor: pointer;
          display: flex; flex-direction: column;
          transition: border-color .25s, transform .32s cubic-bezier(.34,1.2,.64,1);
        }
        .sp-card:hover { transform: translateY(-6px); }

        .sp-img-zone {
          position: relative; background: var(--s2);
          border-bottom: 1px solid var(--w);
          display: flex; align-items: center; justify-content: center;
          padding: 40px 24px 32px; min-height: 190px;
        }
        .sp-glow {
          position: absolute; width: 120px; height: 120px; border-radius: 50%;
          filter: blur(48px); opacity: .16; top: 50%; left: 50%;
          transform: translate(-50%,-50%); pointer-events: none;
        }
        .sp-kit-img { width: 110px; height: 110px; object-fit: contain; position: relative; z-index: 1; }
        .sp-badge {
          position: absolute; top: 12px; right: 12px;
          font-family: var(--fm); font-size: 8px; font-weight: 600; letter-spacing: .13em;
          text-transform: uppercase; padding: 3px 8px; border-radius: 3px; border: 1px solid;
        }

        .sp-body { padding: 22px 22px 24px; flex: 1; display: flex; flex-direction: column; }
        .sp-name { font-family: var(--fh); font-size: 22px; font-weight: 800; letter-spacing: -.025em; margin-bottom: 4px; }
        .sp-tagline { font-size: 11px; color: var(--t3); margin-bottom: 20px; letter-spacing: .01em; }
        .sp-price-row { margin-bottom: 20px; }
        .sp-price { font-family: var(--fh); font-size: 42px; font-weight: 800; letter-spacing: -.04em; line-height: 1; }
        .sp-price sup { font-size: 18px; vertical-align: top; margin-top: 9px; display: inline-block; opacity: .6; }
        .sp-list { display: flex; flex-direction: column; gap: 9px; flex: 1; margin-bottom: 22px; }
        .sp-item { display: flex; align-items: center; gap: 9px; font-size: 12px; color: var(--t2); }
        .sp-btn {
          width: 100%; padding: 12px; border-radius: 7px; border: 1px solid;
          font-family: var(--fb); font-size: 13px; font-weight: 600; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 7px;
          background: transparent; transition: opacity .2s; letter-spacing: .01em;
        }
        .sp-btn:hover { opacity: .75; }

        /* ─── RANKS GRID ─── */
        .rg { display: grid; grid-template-columns: repeat(auto-fill, minmax(205px, 1fr)); gap: 10px; margin-bottom: 72px; }

        .rc {
          background: var(--s1); border: 1px solid var(--w);
          border-radius: 12px; padding: 20px; cursor: pointer; position: relative;
          overflow: hidden; display: flex; flex-direction: column;
          transition: border-color .25s, transform .32s cubic-bezier(.34,1.2,.64,1);
        }
        .rc:hover { transform: translateY(-4px); }
        .rc-bar { position: absolute; top: 0; left: 0; right: 0; height: 1px; }
        .rc-img { width: 40px; height: 40px; object-fit: contain; margin-bottom: 14px; }
        .rc-name { font-family: var(--fh); font-size: 14px; font-weight: 800; letter-spacing: -.01em; margin-bottom: 3px; }
        .rc-tag { font-size: 11px; color: var(--t3); line-height: 1.55; margin-bottom: 18px; min-height: 34px; }
        .rc-price { font-family: var(--fh); font-size: 26px; font-weight: 800; letter-spacing: -.03em; line-height: 1; margin-top: auto; margin-bottom: 14px; }
        .rc-period { font-family: var(--fm); font-size: 10px; color: var(--t3); font-weight: 400; }
        .rc-cta {
          width: 100%; padding: 9px; border-radius: 7px; border: 1px solid var(--w);
          background: transparent; font-family: var(--fb); font-size: 11px; font-weight: 600;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;
          color: var(--t3); transition: border-color .2s, color .2s;
        }
        .rc:hover .rc-cta { border-color: var(--w2); color: var(--t2); }

        /* ─── COSMETICS ─── */
        .cg { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; margin-bottom: 72px; }

        .cc {
          background: var(--s1); border: 1px solid var(--w); border-radius: 14px;
          overflow: hidden; cursor: pointer;
          transition: border-color .25s, transform .32s cubic-bezier(.34,1.2,.64,1);
        }
        .cc:hover { transform: translateY(-5px); }
        .cc-img-zone {
          position: relative; background: var(--s2);
          border-bottom: 1px solid var(--w);
          display: flex; align-items: center; justify-content: center;
          padding: 36px 24px 28px; min-height: 165px;
        }
        .cc-glow { position: absolute; width: 80px; height: 80px; border-radius: 50%; filter: blur(32px); opacity: .2; }
        .cc-img { width: 72px; height: 72px; object-fit: contain; position: relative; z-index: 1; }
        .cc-rarity {
          position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%);
          font-family: var(--fm); font-size: 8px; font-weight: 600; letter-spacing: .13em;
          text-transform: uppercase; padding: 2px 8px; border-radius: 3px; border: 1px solid;
          white-space: nowrap;
        }
        .cc-body { padding: 18px; }
        .cc-type { font-family: var(--fm); font-size: 9px; letter-spacing: .13em; text-transform: uppercase; color: var(--t3); margin-bottom: 5px; }
        .cc-name { font-family: var(--fh); font-size: 16px; font-weight: 800; letter-spacing: -.02em; margin-bottom: 7px; }
        .cc-desc { font-size: 11px; color: var(--t3); line-height: 1.65; margin-bottom: 16px; }
        .cc-price { font-family: var(--fh); font-size: 24px; font-weight: 800; letter-spacing: -.03em; margin-bottom: 14px; }
        .cc-btn {
          width: 100%; padding: 10px; border-radius: 7px; border: 1px solid;
          font-family: var(--fb); font-size: 12px; font-weight: 600; cursor: pointer;
          background: transparent; transition: opacity .2s;
        }
        .cc-btn:hover { opacity: .7; }

        .soon-card {
          background: var(--s1); border: 1px solid var(--w); border-radius: 14px;
          min-height: 260px; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 10px; color: var(--t3);
        }
        .soon-label { font-family: var(--fm); font-size: 9px; letter-spacing: .14em; text-transform: uppercase; }

        /* ─── MODAL ─── */
        .ov {
          position: fixed; inset: 0; z-index: 800;
          background: rgba(0,0,0,.9); backdrop-filter: blur(18px);
          display: flex; align-items: center; justify-content: center; padding: 20px;
          animation: fo .18s ease;
        }
        @keyframes fo { from { opacity: 0 } to { opacity: 1 } }
        @keyframes su { from { opacity: 0; transform: translateY(22px) scale(.97) } to { opacity: 1; transform: none } }

        .modal {
          background: var(--s1); border: 1px solid var(--w);
          border-radius: 18px; width: 100%; max-width: 520px;
          max-height: 90vh; overflow-y: auto; position: relative;
          animation: su .28s cubic-bezier(.34,1.1,.64,1); scrollbar-width: none;
        }
        .modal::-webkit-scrollbar { display: none; }
        .m-stripe { height: 1px; border-radius: 18px 18px 0 0; }
        .m-pad { padding: 26px; }
        .m-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 14px; margin-bottom: 22px; }
        .m-close {
          background: var(--s2); border: 1px solid var(--w); border-radius: 7px;
          padding: 6px; cursor: pointer; color: var(--t3); line-height: 1;
          transition: border-color .2s; flex-shrink: 0;
        }
        .m-close:hover { border-color: var(--w2); color: var(--t2); }
        .m-rname { font-family: var(--fh); font-size: 26px; font-weight: 800; letter-spacing: -.03em; }
        .m-rtag { font-size: 12px; color: var(--t3); margin-top: 4px; }
        .m-desc {
          font-size: 13px; color: var(--t2); line-height: 1.75;
          padding: 14px 16px; background: var(--s2); border: 1px solid var(--w);
          border-radius: 8px; margin-bottom: 22px;
        }
        .m-lbl { font-family: var(--fm); font-size: 9px; font-weight: 600; letter-spacing: .13em; text-transform: uppercase; color: var(--t3); margin-bottom: 10px; }

        .m-pg { position: relative; display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; margin-bottom: 22px; }
        .m-indicator {
          position: absolute; top: 0; left: 0; border-radius: 8px; z-index: 0; pointer-events: none;
          transition: transform .45s cubic-bezier(.34,1.4,.64,1), width .35s cubic-bezier(.34,1.4,.64,1), height .35s ease;
        }
        .m-pbtn {
          position: relative; z-index: 1; padding: 13px 8px; border-radius: 8px;
          cursor: pointer; font-family: var(--fb);
          border: 1px solid var(--w); background: var(--s2);
          text-align: center; transition: color .22s, border-color .22s;
        }
        .m-pnum { font-family: var(--fh); font-size: 20px; font-weight: 800; letter-spacing: -.03em; }
        .m-plbl { font-size: 10px; color: var(--t3); margin-top: 2px; }

        .m-perks { display: flex; flex-direction: column; gap: 2px; margin-bottom: 20px; }
        .m-perk { display: flex; align-items: center; gap: 10px; padding: 9px 12px; background: var(--s2); border-radius: 7px; font-size: 13px; }
        .m-dot { width: 4px; height: 4px; border-radius: 50%; flex-shrink: 0; }

        .m-cmds { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 24px; }
        .m-cmd {
          font-family: var(--fm); font-size: 11px; padding: 4px 9px;
          background: var(--s2); border: 1px solid var(--w); border-radius: 5px;
        }

        .m-buy {
          width: 100%; padding: 14px; border-radius: 10px; border: none;
          font-family: var(--fh); font-size: 16px; font-weight: 800; letter-spacing: -.01em;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
          color: #000; transition: filter .2s;
        }
        .m-buy:hover { filter: brightness(1.1); }

        /* stagger animations */
        .rc, .sp-card, .cc { animation: cardIn .4s ease both; }
        @keyframes cardIn { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: none } }
      `}</style>

      <div className="store">
        <div className="z1">
          <div className="cx">
            {/* ── HERO ── */}
            <div className="hero">
              <div className="hero-layout">
                <div className="hero-text">
                  <div className="eyebrow">
                    <div className="eyebrow-line" />
                    Official Store
                    <div className="eyebrow-line" />
                  </div>
                  <h1 className="hero-title">
                    Power up your
                    <br />
                    <span className="dim">Pixel</span> account
                  </h1>
                  <p className="hero-body">
                    Support the server, unlock real advantages, and make your
                    mark on the world. Every purchase directly funds
                    development.
                  </p>
                </div>
                <div className="hero-img-wrap">
                  <div className="hero-char-glow" />
                  <img
                    className="hero-char"
                    src="/img/herodonate.png"
                    alt="hero"
                    onError={(e) => {
                      (e.currentTarget as any).style.display = "none";
                    }}
                  />
                </div>
              </div>
            </div>

            {/* ── NAV ── */}
            <nav className="snav">
              <button
                className={`snav-btn${tab === "ranks" ? " on" : ""}`}
                onClick={() => setTab("ranks")}
              >
                Ranks & Packs
              </button>
              <button
                className={`snav-btn${tab === "cosmetics" ? " on" : ""}`}
                onClick={() => setTab("cosmetics")}
              >
                Cosmetics
              </button>
            </nav>

            {tab === "ranks" && (
              <>
                {/* ── BATTLE PASS ── */}
                <div className="bp">
                  <div className="bp-topline" />
                  <div className="bp-layout">
                    <div className="bp-left">
                      <div className="bp-chip">
                        <Zap size={9} />
                        Season Pass
                      </div>
                      <h2 className="bp-h">Battle Pass</h2>
                      <p className="bp-p">
                        Unlock 50+ tiers of exclusive seasonal rewards,
                        cosmetics, and challenges. The highest-value purchase on
                        the server — full stop.
                      </p>
                      <div className="bp-tags">
                        {[
                          "50+ tier rewards",
                          "Exclusive BP cosmetics",
                          "XP multiplier",
                          "Seasonal challenges",
                          "Season support badge",
                        ].map((t) => (
                          <div key={t} className="bp-tag">
                            <div className="bp-dot" />
                            {t}
                          </div>
                        ))}
                      </div>
                      <button className="bp-cta">
                        <Crown size={13} />
                        Get Battle Pass
                        <ArrowRight size={13} />
                      </button>
                    </div>
                    <div className="bp-right">
                      <img
                        className="bp-img"
                        src="/img/ranks/bp.png"
                        alt="bp"
                        onError={(e) => {
                          (e.currentTarget as any).style.display = "none";
                        }}
                      />
                      <div>
                        <div className="bp-price">$7</div>
                        <div className="bp-plabel">
                          One-time · Current Season
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── STARTER PACKS ── */}
                <div className="sh">
                  <div>
                    <div className="sh-title">Starter Packs</div>
                    <div className="sh-sub">
                      // Bundled value — the smartest first purchase
                    </div>
                  </div>
                </div>
                <div className="div" />

                <div className="sp-grid">
                  {STARTER_PACKS.map((pk, idx) => (
                    <div
                      key={pk.id}
                      className="sp-card"
                      style={{ animationDelay: `${idx * 80}ms` }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          pk.color + "44";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "var(--w)";
                      }}
                    >
                      <div className="sp-img-zone">
                        <div
                          className="sp-glow"
                          style={{ background: pk.color }}
                        />
                        <img
                          className="sp-kit-img"
                          src={pk.img}
                          alt={pk.name}
                          onError={(e) => {
                            (e.currentTarget as any).style.display = "none";
                          }}
                        />
                        <div
                          className="sp-badge"
                          style={{
                            color: pk.color,
                            borderColor: pk.color + "40",
                            background: pk.color + "0c",
                          }}
                        >
                          {pk.label}
                        </div>
                      </div>
                      <div className="sp-body">
                        <div className="sp-name">{pk.name}</div>
                        <div className="sp-tagline">{pk.tagline}</div>
                        <div className="sp-price-row">
                          <div className="sp-price" style={{ color: pk.color }}>
                            <sup>$</sup>
                            {pk.price}
                          </div>
                        </div>
                        <div className="sp-list">
                          {pk.includes.map((item) => (
                            <div key={item} className="sp-item">
                              <Check
                                size={11}
                                color={pk.color}
                                strokeWidth={2.5}
                                style={{ flexShrink: 0 }}
                              />
                              {item}
                            </div>
                          ))}
                        </div>
                        <button
                          className="sp-btn"
                          style={{
                            borderColor: pk.color + "44",
                            color: pk.color,
                          }}
                        >
                          Purchase Pack <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ── RANKS ── */}
                <div className="sh">
                  <div>
                    <div className="sh-title">Server Ranks</div>
                    <div className="sh-sub">// Permanent account upgrades</div>
                  </div>
                  <div className="psw">
                    <div
                      className="psw-bg"
                      style={{
                        transform: `translateX(${pill.x}px)`,
                        width: pill.w,
                      }}
                    />
                    {PERIODS.map((p, i) => (
                      <button
                        key={p}
                        ref={(el) => {
                          tabsRef.current[i] = el;
                        }}
                        onClick={() => setPeriod(p)}
                        className="psw-btn"
                        style={{
                          color: period === p ? "var(--t1)" : "var(--t2)",
                        }}
                      >
                        {PERIOD_LABELS[p]}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="div" />

                <div className="rg">
                  {RANKS.map((r, idx) => (
                    <div
                      key={r.id}
                      className="rc"
                      style={{ animationDelay: `${idx * 40}ms` }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          r.color + "40";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "var(--w)";
                      }}
                      onClick={() => {
                        setSelected(r);
                        setModalPeriod(period);
                      }}
                    >
                      <div className="rc-bar" style={{ background: r.color }} />
                      <img
                        className="rc-img"
                        src={r.icon}
                        alt={r.name}
                        onError={(e) => {
                          (e.currentTarget as any).style.display = "none";
                        }}
                      />
                      <div className="rc-name">{r.name}</div>
                      <div className="rc-tag">{r.tagline}</div>
                      <div className="rc-price" style={{ color: r.color }}>
                        ${r.prices[period]}
                        <div className="rc-period">
                          /{" "}
                          {period === "month"
                            ? "month"
                            : period === "quarter"
                              ? "3 months"
                              : "lifetime"}
                        </div>
                      </div>
                      <button className="rc-cta">
                        View Details <ChevronRight size={11} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ── COSMETICS TAB ── */}
            {tab === "cosmetics" && (
              <>
                <div className="sh">
                  <div>
                    <div className="sh-title">Cosmetics</div>
                    <div className="sh-sub">
                      // Purely visual · no gameplay impact
                    </div>
                  </div>
                </div>
                <div className="div" />
                <div className="cg">
                  {COSMETICS.map((c, idx) => (
                    <div
                      key={c.id}
                      className="cc"
                      style={{ animationDelay: `${idx * 60}ms` }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          c.color + "44";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "var(--w)";
                      }}
                    >
                      <div className="cc-img-zone">
                        <div
                          className="cc-glow"
                          style={{ background: c.color }}
                        />
                        <img
                          className="cc-img"
                          src={c.icon}
                          alt={c.name}
                          onError={(e) => {
                            (e.currentTarget as any).style.display = "none";
                          }}
                        />
                        <div
                          className="cc-rarity"
                          style={{
                            color: c.color,
                            borderColor: c.color + "40",
                            background: c.color + "0c",
                          }}
                        >
                          {c.rarity}
                        </div>
                      </div>
                      <div className="cc-body">
                        <div className="cc-type">{c.type}</div>
                        <div className="cc-name">{c.name}</div>
                        <div className="cc-desc">{c.description}</div>
                        <div className="cc-price" style={{ color: c.color }}>
                          ${c.price}
                        </div>
                        <button
                          className="cc-btn"
                          style={{
                            borderColor: c.color + "44",
                            color: c.color,
                          }}
                        >
                          Add to Account
                        </button>
                      </div>
                    </div>
                  ))}
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="soon-card">
                      <Package size={20} strokeWidth={1.2} />
                      <div className="soon-label">Coming Soon</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── MODAL ── */}
      {selected && (
        <div className="ov" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="m-stripe" style={{ background: selected.color }} />
            <div className="m-pad">
              <div className="m-top">
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <img
                    src={selected.icon}
                    alt={selected.name}
                    style={{ width: 52, height: 52, objectFit: "contain" }}
                    onError={(e) => {
                      (e.currentTarget as any).style.display = "none";
                    }}
                  />
                  <div>
                    <div className="m-rname" style={{ color: selected.color }}>
                      {selected.name}
                    </div>
                    <div className="m-rtag">{selected.tagline}</div>
                  </div>
                </div>
                <button className="m-close" onClick={() => setSelected(null)}>
                  <X size={15} />
                </button>
              </div>

              <div className="m-desc">{selected.description}</div>

              <div className="m-lbl">Select duration</div>
              <div className="m-pg">
                <div
                  className="m-indicator"
                  style={{
                    transform: `translate(${mPill.x}px, ${mPill.y}px)`,
                    width: mPill.w,
                    height: mPill.h,
                    background: selected.color + "12",
                    border: `1px solid ${selected.color}40`,
                  }}
                />
                {PERIODS.map((p, i) => (
                  <button
                    key={p}
                    ref={(el) => {
                      mTabsRef.current[i] = el;
                    }}
                    onClick={() => setModalPeriod(p)}
                    className="m-pbtn"
                    style={{
                      color: modalPeriod === p ? selected.color : "var(--t2)",
                      borderColor:
                        modalPeriod === p ? "transparent" : undefined,
                    }}
                  >
                    <div className="m-pnum">${selected.prices[p]}</div>
                    <div className="m-plbl">{PERIOD_LABELS[p]}</div>
                  </button>
                ))}
              </div>

              <div className="m-lbl">Included features</div>
              <div className="m-perks">
                {selected.perks.map((pk) => (
                  <div key={pk} className="m-perk">
                    <div
                      className="m-dot"
                      style={{ background: selected.color }}
                    />
                    <span style={{ color: "var(--t1)" }}>{pk}</span>
                  </div>
                ))}
              </div>

              <div className="m-lbl">Commands</div>
              <div className="m-cmds">
                {selected.commands.map((cmd) => (
                  <code
                    key={cmd}
                    className="m-cmd"
                    style={{ color: selected.color }}
                  >
                    {cmd}
                  </code>
                ))}
              </div>

              <button className="m-buy" style={{ background: selected.color }}>
                <Crown size={14} />
                Purchase {selected.name} · ${selected.prices[modalPeriod]}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
