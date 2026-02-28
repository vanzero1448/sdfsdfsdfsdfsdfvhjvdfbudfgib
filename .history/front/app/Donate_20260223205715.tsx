import React, { useState, useEffect, useRef } from "react";
import {
  X,
  ArrowRight,
  Zap,
  Shield,
  Star,
  Crown,
  Sparkles,
  ChevronRight,
  Check,
  Package,
} from "lucide-react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

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
      "The entry point of the Pixel universe. Basic privileges and a unique chat prefix that sets you apart from the crowd.",
    commands: ["/back", "/heal", "/clearinv", "/trash", "/afk", "/kit ping"],
    perks: [
      "[Ping] chat prefix",
      "Neon-styled messages",
      "3 Home points",
      "Return to death point /back",
      "Self-heal (5 min CD)",
      "Inventory clear & trash bin",
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
      "A solid packet of data. Better survival capabilities and exclusive commands that leave an impression.",
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
      "Server-wide broadcast /bc",
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
      "Follow the protocol. Increased presence and access to exclusive social and survival mechanics.",
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
      "View player inventories",
      "Moonwalk animation",
      "Last seen /seen",
      "$50K money bonus",
      "Repair all items",
      "Custom prefix (Lifetime)",
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
      "Write your own destiny. Scripts give you the power to bypass standard limits and reshape the server.",
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
      "Clear chat globally",
      "$100K money bonus",
      "Player IP info /ipinfo",
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
      "Deep system access. The Kernel rank unlocks advanced player interaction and movement capabilities.",
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
      "Give others flight (30m CD)",
      "Phase through walls /thru",
      "Teleport gaze /jump",
      "$200K money bonus",
      "Self-freeze",
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
      "Unreadable by enemies. Access to God gifting, inventory surveillance, and personal warp creation.",
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
      "Freeze players",
      "Social spy /socialspy",
      "Create own warp /setwarp",
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
      "Bend reality. Quantum members wield full teleport authority, admin chat access, and player moderation.",
    commands: ["/tp (full)", "/a", "/mute", "/kick", "/kit quantum"],
    perks: [
      "[Quantum] chat prefix",
      "Full teleport access /tp",
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
      "Pure processing power. WorldEdit access and temporary ban authority — nearly unrestricted server control.",
    commands: ["/set", "/pos1", "/pos2", "/tempban", "/kit core"],
    perks: [
      "[Core] chat prefix",
      "Unlimited Home points",
      "WorldEdit selection",
      "Temporary ban /tempban",
      "Core aura effect",
      "Max currency bonuses",
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
      "Running at maximum frequency. Unmatched privileges and supreme server priority for the most dedicated players.",
    commands: ["/kit overclock", "/fly", "/god", "/sudo", "/top", "/v"],
    perks: [
      "[Overclock] chat prefix",
      "Force commands /sudo",
      "Teleport to top /top",
      "Max server priority",
      "Overclocked kits",
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
      "The ultimate tier. You are the anomaly — possessing the highest level of authority, prestige, and direct developer access.",
    commands: ["/kit singularity", "ALL COMMANDS"],
    perks: [
      "[Singularity] chat prefix",
      "Every command on the server",
      "VIP event access",
      "Unique singularity particle",
      "Direct developer support",
      "Custom Discord role",
    ],
  },
];

const STARTER_PACKS = [
  {
    id: "starter_novice",
    name: "Novice Pack",
    tagline: "The perfect first step into Pixel",
    price: 5,
    color: "#60a5fa",
    badgeColor: "#60a5fa22",
    icon: "/img/starter/1s.png",
    badge: "STARTER",
    includes: [
      "Ping rank — 3 Months",
      "Exclusive Novice Kit",
      "Novice cosmetic set",
      "500 starter coins",
    ],
    kitImg: "/img/starter/1s.png",
  },
  {
    id: "starter_pro",
    name: "Pro Pack",
    tagline: "Hit the ground running",
    price: 12,
    color: "#34d399",
    badgeColor: "#34d39922",
    icon: "/img/starter/2s.png",
    badge: "POPULAR",
    includes: [
      "Packet rank — Lifetime",
      "Exclusive Pro Kit",
      "Pro cosmetic set",
      "2,500 starter coins",
    ],
    kitImg: "/img/starter/2s.png",
  },
  {
    id: "starter_sponsor",
    name: "Sponsor Pack",
    tagline: "Support the project, own it all",
    price: 24,
    color: "#a78bfa",
    badgeColor: "#a78bfa22",
    icon: "/img/starter/3s.png",
    badge: "BEST VALUE",
    includes: [
      "Protocol rank — Lifetime",
      "Exclusive Sponsor Kit",
      "Sponsor cosmetic set",
      "7,500 starter coins",
    ],
    kitImg: "/img/starter/3s.png",
  },
];

const COSMETICS = [
  {
    id: "pet_dragon",
    name: "Ember Dragon",
    type: "Pet",
    price: 4.99,
    color: "#f43f5e",
    icon: "/img/cosmetics/dragon_pet.png",
    description:
      "A miniature dragon that follows you through the world, breathing ember particles as it soars.",
    rarity: "Legendary",
    rarityColor: "#f43f5e",
  },
];

const PERIOD_LABELS = {
  month: "1 Month",
  quarter: "3 Months",
  forever: "Lifetime",
};
const PERIODS = ["month", "quarter", "forever"] as const;
type PeriodType = (typeof PERIODS)[number];

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
function HexIcon({ color, size = 40 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <polygon
        points="20,2 36,11 36,29 20,38 4,29 4,11"
        fill={color + "18"}
        stroke={color + "55"}
        strokeWidth="1.2"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export const Donate: React.FC = () => {
  const [selected, setSelected] = useState<Rank | null>(null);
  const [period, setPeriod] = useState<PeriodType>("forever");
  const [modalPeriod, setModalPeriod] = useState<PeriodType>("forever");
  const [activeSection, setActiveSection] = useState<"ranks" | "cosmetics">(
    "ranks",
  );
  const [hoveredRank, setHoveredRank] = useState<string | null>(null);

  const mainTabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [mainIndicator, setMainIndicator] = useState({
    transform: "translateX(0)",
    width: 0,
    opacity: 0,
  });
  const modalTabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [modalIndicator, setModalIndicator] = useState({
    transform: "translate(0,0)",
    width: 0,
    height: 0,
    opacity: 0,
  });

  useEffect(() => {
    const update = () => {
      const i = PERIODS.indexOf(period);
      const el = mainTabsRef.current[i];
      if (el)
        setMainIndicator({
          transform: `translateX(${el.offsetLeft}px)`,
          width: el.offsetWidth,
          opacity: 1,
        });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [period]);

  useEffect(() => {
    const update = () => {
      if (!selected) return;
      const i = PERIODS.indexOf(modalPeriod);
      const el = modalTabsRef.current[i];
      if (el)
        setModalIndicator({
          transform: `translate(${el.offsetLeft}px,${el.offsetTop}px)`,
          width: el.offsetWidth,
          height: el.offsetHeight,
          opacity: 1,
        });
    };
    setTimeout(update, 0);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [modalPeriod, selected]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #060609;
          --bg-1: #0c0c12;
          --bg-2: #111118;
          --bg-3: #18181f;
          --line: #1e1e28;
          --line-2: #28283a;
          --t1: #f0f0f8;
          --t2: #8888aa;
          --t3: #55556a;
          --accent: #7c5cfc;
          --font: 'Sora', sans-serif;
          --mono: 'JetBrains Mono', monospace;
        }

        body { background: var(--bg); font-family: var(--font); color: var(--t1); }

        .store-root { min-height: 100vh; background: var(--bg); position: relative; overflow-x: hidden; }

        /* ── Subtle grid bg ── */
        .store-root::before {
          content: '';
          position: fixed; inset: 0; z-index: 0;
          background-image:
            linear-gradient(rgba(124,92,252,.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,92,252,.03) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 1; }

        /* ── HERO ── */
        .hero { padding: 100px 0 60px; }
        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(124,92,252,.1); border: 1px solid rgba(124,92,252,.25);
          border-radius: 100px; padding: 5px 14px; font-size: 11px;
          font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
          color: #a78bfa; margin-bottom: 20px;
        }
        .hero h1 {
          font-size: clamp(36px, 5vw, 62px); font-weight: 800;
          line-height: 1.05; letter-spacing: -.04em; margin-bottom: 16px;
          color: var(--t1);
        }
        .hero h1 span { color: var(--accent); }
        .hero p { color: var(--t2); font-size: 15px; line-height: 1.7; max-width: 440px; }

        /* ── NAV TABS ── */
        .nav-tabs {
          display: flex; gap: 4px;
          background: var(--bg-2); border: 1px solid var(--line);
          border-radius: 12px; padding: 4px; width: fit-content; margin-bottom: 48px;
        }
        .nav-tab {
          padding: 9px 22px; border-radius: 9px; border: none;
          font-family: var(--font); font-size: 14px; font-weight: 600;
          cursor: pointer; transition: all .25s; background: transparent; color: var(--t3);
        }
        .nav-tab.active { background: var(--bg-3); color: var(--t1); box-shadow: 0 2px 12px rgba(0,0,0,.5); }

        /* ── BATTLE PASS ── */
        .bp-card {
          position: relative; border-radius: 20px; padding: 0; overflow: hidden;
          border: 1px solid rgba(124,92,252,.3);
          background: var(--bg-1); margin-bottom: 64px;
          cursor: pointer;
          transition: border-color .3s, transform .3s;
        }
        .bp-card:hover { border-color: rgba(124,92,252,.6); transform: translateY(-2px); }
        .bp-glow {
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 60% 100% at 80% 50%, rgba(124,92,252,.12) 0%, transparent 70%);
        }
        .bp-content { display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 40px; padding: 36px 40px; }
        @media(max-width:640px){ .bp-content { grid-template-columns: 1fr; } }
        .bp-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(124,92,252,.15); border: 1px solid rgba(124,92,252,.3);
          border-radius: 6px; padding: 4px 10px; font-size: 10px;
          font-weight: 700; letter-spacing: .12em; color: #a78bfa;
          text-transform: uppercase; margin-bottom: 12px;
        }
        .bp-title { font-size: 30px; font-weight: 800; letter-spacing: -.03em; margin-bottom: 8px; }
        .bp-desc { color: var(--t2); font-size: 14px; line-height: 1.65; max-width: 460px; margin-bottom: 22px; }
        .bp-perks { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px; }
        .bp-perk {
          display: flex; align-items: center; gap: 6px;
          background: var(--bg-2); border: 1px solid var(--line-2);
          border-radius: 8px; padding: 5px 12px; font-size: 12px;
          font-weight: 500; color: var(--t2);
        }
        .bp-perk .dot { width: 5px; height: 5px; border-radius: 50%; background: #7c5cfc; flex-shrink: 0; }
        .bp-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 24px; border-radius: 10px; border: none;
          background: #7c5cfc; color: #fff; font-family: var(--font);
          font-size: 14px; font-weight: 700; cursor: pointer;
          transition: opacity .2s, transform .2s;
        }
        .bp-btn:hover { opacity: .9; transform: scale(1.02); }
        .bp-price-box {
          background: var(--bg-2); border: 1px solid var(--line-2);
          border-radius: 16px; padding: 28px 32px; text-align: center; flex-shrink: 0;
          min-width: 160px;
        }
        .bp-price { font-size: 44px; font-weight: 800; letter-spacing: -.05em; color: #a78bfa; }
        .bp-price sup { font-size: 20px; vertical-align: top; margin-top: 10px; display: inline-block; }
        .bp-price-label { font-size: 11px; color: var(--t3); margin-top: 4px; font-weight: 600; text-transform: uppercase; letter-spacing: .08em; }
        .bp-img { width: 100px; height: 100px; object-fit: contain; margin-bottom: 12px; }

        /* ── SECTION HEADER ── */
        .section-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 28px; flex-wrap: wrap; gap: 16px; }
        .section-title { font-size: 22px; font-weight: 800; letter-spacing: -.03em; }
        .section-sub { font-size: 13px; color: var(--t2); margin-top: 4px; }
        .section-divider { height: 1px; background: var(--line); margin-bottom: 32px; }

        /* ── PERIOD SWITCHER ── */
        .period-switch {
          position: relative; display: flex; gap: 3px;
          background: var(--bg-2); border: 1px solid var(--line);
          border-radius: 10px; padding: 4px; width: fit-content;
        }
        .period-indicator {
          position: absolute; top: 4px; bottom: 4px;
          background: var(--accent); border-radius: 7px;
          transition: transform .5s cubic-bezier(.34,1.56,.64,1), width .4s cubic-bezier(.34,1.56,.64,1);
          z-index: 0; left: 0;
        }
        .period-btn {
          position: relative; z-index: 1; padding: 7px 16px; border-radius: 7px;
          border: none; background: transparent; cursor: pointer;
          font-weight: 700; font-size: 13px; font-family: var(--font);
          transition: color .3s;
          white-space: nowrap;
        }

        /* ── STARTER PACKS ── */
        .starter-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-bottom: 64px; }
        .starter-card {
          background: var(--bg-1); border: 1px solid var(--line);
          border-radius: 18px; padding: 28px; position: relative; overflow: hidden;
          cursor: pointer; transition: border-color .25s, transform .25s, box-shadow .25s;
        }
        .starter-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,.5); }
        .starter-card .top-line { position: absolute; top: 0; left: 0; right: 0; height: 2px; border-radius: 18px 18px 0 0; }
        .starter-badge {
          display: inline-block; padding: 3px 10px; border-radius: 5px;
          font-size: 9px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase;
          margin-bottom: 16px;
        }
        .starter-kit-img { width: 80px; height: 80px; object-fit: contain; margin-bottom: 16px; }
        .starter-name { font-size: 18px; font-weight: 800; letter-spacing: -.02em; margin-bottom: 4px; }
        .starter-tagline { font-size: 12px; color: var(--t3); margin-bottom: 20px; }
        .starter-price { font-size: 36px; font-weight: 800; letter-spacing: -.04em; margin-bottom: 20px; }
        .starter-price sup { font-size: 16px; vertical-align: top; margin-top: 8px; display: inline-block; }
        .starter-includes { display: flex; flex-direction: column; gap: 7px; margin-bottom: 22px; }
        .starter-item { display: flex; align-items: center; gap: 9px; font-size: 13px; color: var(--t2); }
        .starter-item svg { flex-shrink: 0; }
        .starter-btn {
          width: 100%; padding: 11px; border-radius: 10px; border: none;
          font-family: var(--font); font-size: 14px; font-weight: 700; cursor: pointer;
          transition: opacity .2s; display: flex; align-items: center; justify-content: center; gap: 6px;
        }

        /* ── RANKS GRID ── */
        .ranks-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; margin-bottom: 64px; }
        .rank-card {
          background: var(--bg-1); border: 1px solid var(--line);
          border-radius: 16px; padding: 22px; cursor: pointer; position: relative; overflow: hidden;
          display: flex; flex-direction: column; transition: border-color .25s, transform .25s, box-shadow .25s;
        }
        .rank-card:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(0,0,0,.5); }
        .rank-card .top-accent { position: absolute; top: 0; left: 0; right: 0; height: 2px; border-radius: 16px 16px 0 0; }
        .rank-icon { width: 44px; height: 44px; object-fit: contain; margin-bottom: 14px; }
        .rank-name { font-size: 15px; font-weight: 800; letter-spacing: -.02em; margin-bottom: 3px; }
        .rank-tagline { font-size: 11px; color: var(--t3); line-height: 1.5; margin-bottom: 16px; min-height: 32px; }
        .rank-price { font-size: 28px; font-weight: 800; letter-spacing: -.04em; margin-bottom: 16px; }
        .rank-price small { font-size: 11px; color: var(--t3); font-weight: 500; vertical-align: baseline; }
        .rank-cta {
          margin-top: auto; width: 100%; padding: 8px; border-radius: 8px; border: none;
          font-family: var(--font); font-size: 12px; font-weight: 700; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 5px;
          transition: opacity .2s;
        }
        .rank-cta:hover { opacity: .85; }

        /* ── COSMETICS ── */
        .cosmetics-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; margin-bottom: 64px; }
        .cosmetic-card {
          background: var(--bg-1); border: 1px solid var(--line);
          border-radius: 16px; padding: 24px; cursor: pointer; position: relative; overflow: hidden;
          transition: border-color .25s, transform .25s, box-shadow .25s;
        }
        .cosmetic-card:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(0,0,0,.5); }
        .cosmetic-card .top-accent { position: absolute; top: 0; left: 0; right: 0; height: 2px; border-radius: 16px 16px 0 0; }
        .cosmetic-preview {
          width: 90px; height: 90px; margin: 0 auto 16px; display: flex;
          align-items: center; justify-content: center; border-radius: 12px;
          background: var(--bg-2); border: 1px solid var(--line-2); position: relative;
        }
        .cosmetic-img { width: 64px; height: 64px; object-fit: contain; }
        .cosmetic-rarity {
          position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%);
          padding: 2px 8px; border-radius: 4px; font-size: 9px; font-weight: 800;
          letter-spacing: .1em; text-transform: uppercase; white-space: nowrap;
        }
        .cosmetic-type { font-size: 10px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--t3); margin-bottom: 6px; }
        .cosmetic-name { font-size: 16px; font-weight: 800; letter-spacing: -.02em; margin-bottom: 4px; }
        .cosmetic-desc { font-size: 12px; color: var(--t3); line-height: 1.55; margin-bottom: 16px; }
        .cosmetic-price { font-size: 22px; font-weight: 800; letter-spacing: -.03em; margin-bottom: 14px; }
        .cosmetic-btn {
          width: 100%; padding: 10px; border-radius: 9px; border: none;
          font-family: var(--font); font-size: 13px; font-weight: 700; cursor: pointer;
          transition: opacity .2s;
        }

        /* ── MODAL ── */
        .modal-overlay {
          position: fixed; inset: 0; z-index: 500;
          background: rgba(0,0,0,.85); backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: center; padding: 20px;
          animation: fadeIn .2s ease;
        }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(.97) } to { opacity: 1; transform: none } }
        .modal-box {
          background: var(--bg-1); border-radius: 22px; width: 100%; max-width: 540px;
          max-height: 90vh; overflow: auto; position: relative;
          box-shadow: 0 40px 100px rgba(0,0,0,.8);
          animation: slideUp .3s cubic-bezier(.34,1.1,.64,1);
          scrollbar-width: none;
        }
        .modal-box::-webkit-scrollbar { display: none; }
        .modal-bar { height: 3px; border-radius: 22px 22px 0 0; }
        .modal-body { padding: 28px; }
        .modal-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 24px; }
        .modal-close {
          background: var(--bg-2); border: 1px solid var(--line);
          border-radius: 8px; padding: 7px; cursor: pointer; color: var(--t2);
          line-height: 1; flex-shrink: 0; transition: background .2s;
        }
        .modal-close:hover { background: var(--bg-3); }
        .modal-desc {
          color: var(--t2); font-size: 14px; line-height: 1.7;
          background: var(--bg-2); border: 1px solid var(--line);
          border-radius: 10px; padding: 14px 16px; margin-bottom: 22px;
        }
        .modal-section-label {
          font-size: 10px; font-weight: 700; text-transform: uppercase;
          letter-spacing: .1em; color: var(--t3); margin-bottom: 10px;
        }
        .modal-period-grid {
          position: relative; display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; margin-bottom: 22px;
        }
        .modal-period-indicator {
          position: absolute; border-radius: 10px; z-index: 0; left: 0; top: 0;
          pointer-events: none;
          transition: transform .5s cubic-bezier(.34,1.56,.64,1), width .4s cubic-bezier(.34,1.56,.64,1), height .4s cubic-bezier(.34,1.56,.64,1);
        }
        .modal-period-btn {
          position: relative; z-index: 1; padding: 12px 8px; border-radius: 10px;
          cursor: pointer; font-family: var(--font); background: var(--bg-2);
          border: 1px solid var(--line); text-align: center; transition: color .25s, border-color .25s;
        }
        .modal-period-btn.active { border-color: transparent; }
        .modal-period-price { font-size: 20px; font-weight: 800; letter-spacing: -.03em; }
        .modal-period-label { font-size: 10px; font-weight: 600; opacity: .7; margin-top: 3px; }
        .modal-perks { display: flex; flex-direction: column; gap: 2px; margin-bottom: 20px; }
        .modal-perk { display: flex; align-items: center; gap: 10px; padding: 9px 12px; background: var(--bg-2); border-radius: 8px; font-size: 13px; }
        .modal-perk-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }
        .modal-commands { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 24px; }
        .modal-cmd {
          font-family: var(--mono); font-size: 12px;
          background: var(--bg-3); border: 1px solid var(--line-2);
          padding: 4px 10px; border-radius: 6px;
        }
        .modal-buy {
          width: 100%; padding: 14px; border-radius: 12px; border: none;
          font-family: var(--font); font-size: 15px; font-weight: 800;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: opacity .2s, transform .15s; color: #000; letter-spacing: -.01em;
        }
        .modal-buy:hover { opacity: .92; transform: scale(1.01); }

        /* ── EMPTY STATE ── */
        .coming-soon {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 80px 20px; text-align: center; color: var(--t3); gap: 12px;
        }
        .coming-soon svg { opacity: .3; }

        @media(max-width:640px){
          .starter-grid { grid-template-columns: 1fr; }
          .bp-content { padding: 24px 20px; gap: 24px; }
          .hero { padding: 80px 0 40px; }
        }
      `}</style>

      <div className="store-root">
        <div className="container">
          {/* ── HERO ── */}
          <div className="hero">
            <div className="hero-eyebrow">
              <Zap size={10} />
              Official Store
            </div>
            <h1>
              Upgrade your
              <br />
              <span>Pixel</span> experience
            </h1>
            <p>
              Support the server, unlock powerful abilities, and stand out from
              the crowd. Every purchase directly funds development.
            </p>
          </div>

          {/* ── SECTION NAV ── */}
          <div className="nav-tabs" style={{ marginBottom: 40 }}>
            <button
              className={`nav-tab${activeSection === "ranks" ? " active" : ""}`}
              onClick={() => setActiveSection("ranks")}
            >
              Ranks & Packs
            </button>
            <button
              className={`nav-tab${activeSection === "cosmetics" ? " active" : ""}`}
              onClick={() => setActiveSection("cosmetics")}
            >
              Cosmetics
            </button>
          </div>

          {/* ── RANKS & PACKS SECTION ── */}
          {activeSection === "ranks" && (
            <>
              {/* BATTLE PASS */}
              <div className="bp-card">
                <div className="bp-glow" />
                <div className="bp-content">
                  <div>
                    <div className="bp-badge">
                      <Zap size={9} /> Season Pass
                    </div>
                    <div className="bp-title">Battle Pass</div>
                    <div className="bp-desc">
                      Unlock an entire season of rewards, exclusive cosmetics,
                      bonus currency, and unique challenges. The most
                      value-packed purchase on the server.
                    </div>
                    <div className="bp-perks">
                      {[
                        "50+ Tier rewards",
                        "Exclusive BP cosmetics",
                        "Bonus XP multiplier",
                        "Seasonal challenges",
                        "Priority support",
                      ].map((p) => (
                        <div key={p} className="bp-perk">
                          <div className="dot" />
                          {p}
                        </div>
                      ))}
                    </div>
                    <button className="bp-btn">
                      <img
                        src="/img/ranks/bp.png"
                        alt=""
                        style={{ width: 18, height: 18, objectFit: "contain" }}
                        onError={(e) => {
                          (e.currentTarget as any).style.display = "none";
                        }}
                      />
                      Get Battle Pass · <strong>$7</strong>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                  <div className="bp-price-box">
                    <img
                      className="bp-img"
                      src="/img/ranks/bp.png"
                      alt="Battle Pass"
                      onError={(e) => {
                        (e.currentTarget as any).style.display = "none";
                      }}
                    />
                    <div className="bp-price">
                      <sup>$</sup>7
                    </div>
                    <div className="bp-price-label">One-time</div>
                  </div>
                </div>
              </div>

              {/* STARTER PACKS */}
              <div className="section-header">
                <div>
                  <div className="section-title">Starter Packs</div>
                  <div className="section-sub">
                    Bundled value — the best way to start your journey
                  </div>
                </div>
              </div>
              <div className="section-divider" />

              <div className="starter-grid">
                {STARTER_PACKS.map((pack) => (
                  <div
                    key={pack.id}
                    className="starter-card"
                    style={{
                      borderColor:
                        hoveredRank === pack.id ? pack.color + "55" : undefined,
                    }}
                    onMouseEnter={() => setHoveredRank(pack.id)}
                    onMouseLeave={() => setHoveredRank(null)}
                  >
                    <div
                      className="top-line"
                      style={{ background: pack.color }}
                    />
                    <div
                      className="starter-badge"
                      style={{ background: pack.badgeColor, color: pack.color }}
                    >
                      {pack.badge}
                    </div>
                    <img
                      className="starter-kit-img"
                      src={pack.kitImg}
                      alt={pack.name}
                      onError={(e) => {
                        (e.currentTarget as any).style.display = "none";
                      }}
                    />
                    <div className="starter-name">{pack.name}</div>
                    <div className="starter-tagline">{pack.tagline}</div>
                    <div
                      className="starter-price"
                      style={{ color: pack.color }}
                    >
                      <sup>$</sup>
                      {pack.price}
                    </div>
                    <div className="starter-includes">
                      {pack.includes.map((item) => (
                        <div key={item} className="starter-item">
                          <Check size={13} color={pack.color} />
                          {item}
                        </div>
                      ))}
                    </div>
                    <button
                      className="starter-btn"
                      style={{ background: pack.color, color: "#000" }}
                    >
                      Purchase Pack <ArrowRight size={13} />
                    </button>
                  </div>
                ))}
              </div>

              {/* SERVER RANKS */}
              <div className="section-header">
                <div>
                  <div className="section-title">Server Ranks</div>
                  <div className="section-sub">
                    Permanent upgrades to your account abilities
                  </div>
                </div>
                {/* Period switcher */}
                <div className="period-switch">
                  <div className="period-indicator" style={mainIndicator} />
                  {PERIODS.map((p, i) => (
                    <button
                      key={p}
                      ref={(el) => {
                        mainTabsRef.current[i] = el;
                      }}
                      onClick={() => setPeriod(p)}
                      className="period-btn"
                      style={{ color: period === p ? "#fff" : "var(--t2)" }}
                    >
                      {PERIOD_LABELS[p]}
                    </button>
                  ))}
                </div>
              </div>
              <div className="section-divider" />

              <div className="ranks-grid">
                {RANKS.map((rank) => (
                  <div
                    key={rank.id}
                    className="rank-card"
                    style={{
                      borderColor:
                        hoveredRank === rank.id ? rank.color + "55" : undefined,
                    }}
                    onMouseEnter={() => setHoveredRank(rank.id)}
                    onMouseLeave={() => setHoveredRank(null)}
                    onClick={() => {
                      setSelected(rank);
                      setModalPeriod(period);
                    }}
                  >
                    <div
                      className="top-accent"
                      style={{ background: rank.color }}
                    />
                    <img
                      className="rank-icon"
                      src={rank.icon}
                      alt={rank.name}
                      onError={(e) => {
                        (e.currentTarget as any).style.display = "none";
                      }}
                    />
                    <div className="rank-name">{rank.name}</div>
                    <div className="rank-tagline">{rank.tagline}</div>
                    <div className="rank-price" style={{ color: rank.color }}>
                      ${rank.prices[period]}
                      <small>
                        {" "}
                        /{" "}
                        {period === "month"
                          ? "mo"
                          : period === "quarter"
                            ? "3 mo"
                            : "lifetime"}
                      </small>
                    </div>
                    <button
                      className="rank-cta"
                      style={{
                        background: rank.color + "1a",
                        border: `1px solid ${rank.color}33`,
                        color: rank.color,
                      }}
                    >
                      View Details <ArrowRight size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── COSMETICS SECTION ── */}
          {activeSection === "cosmetics" && (
            <>
              <div className="section-header">
                <div>
                  <div className="section-title">Cosmetics</div>
                  <div className="section-sub">
                    Pets, effects, and more — purely cosmetic
                  </div>
                </div>
              </div>
              <div className="section-divider" />

              <div className="cosmetics-grid">
                {COSMETICS.map((item) => (
                  <div
                    key={item.id}
                    className="cosmetic-card"
                    style={{
                      borderColor:
                        hoveredRank === item.id ? item.color + "55" : undefined,
                    }}
                    onMouseEnter={() => setHoveredRank(item.id)}
                    onMouseLeave={() => setHoveredRank(null)}
                  >
                    <div
                      className="top-accent"
                      style={{ background: item.color }}
                    />
                    <div className="cosmetic-preview">
                      <img
                        className="cosmetic-img"
                        src={item.icon}
                        alt={item.name}
                        onError={(e) => {
                          (e.currentTarget as any).style.display = "none";
                        }}
                      />
                      <div
                        className="cosmetic-rarity"
                        style={{
                          background: item.rarityColor + "22",
                          color: item.rarityColor,
                          border: `1px solid ${item.rarityColor}44`,
                        }}
                      >
                        {item.rarity}
                      </div>
                    </div>
                    <div style={{ marginTop: 20 }}>
                      <div className="cosmetic-type">{item.type}</div>
                      <div className="cosmetic-name">{item.name}</div>
                      <div className="cosmetic-desc">{item.description}</div>
                      <div
                        className="cosmetic-price"
                        style={{ color: item.color }}
                      >
                        ${item.price}
                      </div>
                      <button
                        className="cosmetic-btn"
                        style={{ background: item.color, color: "#000" }}
                      >
                        Add to Account
                      </button>
                    </div>
                  </div>
                ))}

                {/* Coming Soon placeholder */}
                {[1, 2, 3].map((i) => (
                  <div
                    key={`cs-${i}`}
                    className="cosmetic-card"
                    style={{ opacity: 0.4, cursor: "default" }}
                  >
                    <div className="coming-soon" style={{ padding: "40px 0" }}>
                      <Package size={32} />
                      <div style={{ fontSize: 13, fontWeight: 600 }}>
                        Coming Soon
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── RANK MODAL ── */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-bar" style={{ background: selected.color }} />
            <div className="modal-body">
              {/* Header */}
              <div className="modal-header">
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <img
                    src={selected.icon}
                    alt={selected.name}
                    style={{ width: 56, height: 56, objectFit: "contain" }}
                    onError={(e) => {
                      (e.currentTarget as any).style.display = "none";
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontSize: 24,
                        fontWeight: 800,
                        letterSpacing: "-.03em",
                        color: selected.color,
                      }}
                    >
                      {selected.name}
                    </div>
                    <div
                      style={{ fontSize: 12, color: "var(--t3)", marginTop: 3 }}
                    >
                      {selected.tagline}
                    </div>
                  </div>
                </div>
                <button
                  className="modal-close"
                  onClick={() => setSelected(null)}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Description */}
              <div className="modal-desc">{selected.description}</div>

              {/* Period selector */}
              <div className="modal-section-label">Select duration</div>
              <div className="modal-period-grid">
                <div
                  className="modal-period-indicator"
                  style={{
                    ...modalIndicator,
                    background: selected.color + "18",
                    border: `1.5px solid ${selected.color}55`,
                  }}
                />
                {PERIODS.map((p, i) => (
                  <button
                    key={p}
                    ref={(el) => {
                      modalTabsRef.current[i] = el;
                    }}
                    onClick={() => setModalPeriod(p)}
                    className={`modal-period-btn${modalPeriod === p ? " active" : ""}`}
                    style={{
                      color: modalPeriod === p ? selected.color : "var(--t2)",
                    }}
                  >
                    <div className="modal-period-price">
                      ${selected.prices[p]}
                    </div>
                    <div className="modal-period-label">{PERIOD_LABELS[p]}</div>
                  </button>
                ))}
              </div>

              {/* Perks */}
              <div className="modal-section-label">Included features</div>
              <div className="modal-perks">
                {selected.perks.map((perk) => (
                  <div key={perk} className="modal-perk">
                    <div
                      className="modal-perk-dot"
                      style={{ background: selected.color }}
                    />
                    <span style={{ color: "var(--t1)" }}>{perk}</span>
                  </div>
                ))}
              </div>

              {/* Commands */}
              <div className="modal-section-label">Commands</div>
              <div className="modal-commands">
                {selected.commands.map((cmd) => (
                  <code
                    key={cmd}
                    className="modal-cmd"
                    style={{ color: selected.color }}
                  >
                    {cmd}
                  </code>
                ))}
              </div>

              {/* CTA */}
              <button
                className="modal-buy"
                style={{ background: selected.color }}
              >
                <Crown size={15} />
                Purchase {selected.name} · ${selected.prices[modalPeriod]}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
