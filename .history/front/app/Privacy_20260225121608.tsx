import React, { useState } from "react";
import {
  Shield,
  ChevronDown,
  Eye,
  Lock,
  Database,
  Globe,
  UserCheck,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

const SECTIONS = [
  {
    id: "s1",
    num: "1",
    title: "Definitions",
    color: "#a78bfa",
    icon: <Shield size={17} strokeWidth={1.8} />,
    items: [
      {
        id: "1.1",
        text: "Administration — self-employed individual Galuzo Artem Mikhailovich (INN: 502505389890), acting as the personal data operator for the Platform.",
      },
      {
        id: "1.2",
        text: "Personal Data — any information that directly or indirectly identifies or can identify a natural person (data subject).",
      },
      {
        id: "1.3",
        text: "Processing — any operation performed on Personal Data, including collection, recording, organization, accumulation, storage, clarification, extraction, use, transfer, anonymization, blocking, deletion, or destruction, whether automated or manual.",
      },
      {
        id: "1.4",
        text: "User — any individual who accesses or uses the Platform in any manner.",
      },
      {
        id: "1.5",
        text: "Cookies — small data files stored on the User's device by the web browser upon visiting the Platform.",
      },
      {
        id: "1.6",
        text: "Platform — the website and associated services operated by the Administration.",
      },
    ],
  },
  {
    id: "s2",
    num: "2",
    title: "General Provisions",
    color: "#34d399",
    icon: <Eye size={17} strokeWidth={1.8} />,
    items: [
      {
        id: "2.1",
        text: "This Privacy Policy (hereinafter — Policy) describes how the Administration collects, uses, stores, and protects Personal Data of Users of the Platform.",
      },
      {
        id: "2.2",
        text: "By accessing or using the Platform in any manner, the User automatically consents to the collection and processing of their Personal Data as described in this Policy.",
      },
      {
        id: "2.3",
        text: "If the User does not consent to this Policy, they must immediately cease all use of the Platform.",
      },
      {
        id: "2.4",
        text: "This Policy applies globally to all Users regardless of their country of residence. International Users acknowledge that their data may be processed in the Russian Federation and that Russian data protection legislation applies.",
      },
      {
        id: "2.5",
        text: "The Administration reserves the right to amend this Policy at any time without prior notice. Continued use of the Platform constitutes acceptance of any updated Policy. The User is responsible for reviewing the Policy periodically.",
      },
    ],
  },
  {
    id: "s3",
    num: "3",
    title: "Data We Collect",
    color: "#60a5fa",
    icon: <Database size={17} strokeWidth={1.8} />,
    items: [
      {
        id: "3.1",
        text: "Upon purchase or registration, the Administration may collect: in-game nickname; email address (if provided); payment transaction identifiers (not full card data); purchase history and selected products.",
      },
      {
        id: "3.2",
        text: "Automatically upon visiting the Platform, the Administration collects: IP address; browser type and version; operating system; pages visited and time spent; referral sources; device identifiers; session cookies and similar technical data.",
      },
      {
        id: "3.3",
        text: "Cookies are used for: maintaining session state; analyzing usage patterns; fraud prevention; improving Platform functionality. The User may disable cookies in their browser settings, which may result in reduced Platform functionality.",
      },
      {
        id: "3.4",
        text: "The Administration does not intentionally collect Personal Data from individuals under 18 years of age. If such data is inadvertently collected, it will be deleted upon discovery.",
      },
      {
        id: "3.5",
        text: "The Administration does not collect sensitive Personal Data such as health information, political opinions, religious beliefs, or biometric data.",
      },
    ],
  },
  {
    id: "s4",
    num: "4",
    title: "Purpose of Processing",
    color: "#fb923c",
    icon: <UserCheck size={17} strokeWidth={1.8} />,
    items: [
      {
        id: "4.1",
        text: "Personal Data is processed for the following purposes: identification of Users to fulfill purchase orders; activation and management of in-game privileges; provision of customer support; prevention of fraud, abuse, and unauthorized access; improvement of the Platform's functionality and user experience; compliance with applicable legal obligations.",
      },
      {
        id: "4.2",
        text: "The Administration processes data on the following legal bases: performance of the digital services contract; legitimate interests of the Administration (security, fraud prevention, analytics); compliance with legal obligations; the User's consent where specifically requested.",
      },
      {
        id: "4.3",
        text: "The Administration will not use Personal Data for purposes incompatible with those stated in this Policy without obtaining additional consent from the User.",
      },
    ],
  },
  {
    id: "s5",
    num: "5",
    title: "Data Storage & Security",
    color: "#f43f5e",
    icon: <Lock size={17} strokeWidth={1.8} />,
    items: [
      {
        id: "5.1",
        text: "Personal Data is stored for as long as necessary to fulfill the purposes described in this Policy, or as required by applicable law, whichever is longer.",
      },
      {
        id: "5.2",
        text: "The Administration implements reasonable technical and organizational security measures to protect Personal Data against unauthorized access, loss, alteration, or disclosure.",
      },
      {
        id: "5.3",
        text: "Despite these measures, no internet transmission or electronic storage method is 100% secure. The Administration cannot guarantee absolute security of Personal Data and shall not be liable for breaches outside its reasonable control.",
      },
      {
        id: "5.4",
        text: "If a data security incident occurs that affects User Personal Data, the Administration will take reasonable steps to notify affected Users as required by applicable law.",
      },
      {
        id: "5.5",
        text: "The User is responsible for maintaining the confidentiality of any account credentials and for all activity conducted through their account.",
      },
    ],
  },
  {
    id: "s6",
    num: "6",
    title: "Data Sharing & Transfers",
    color: "#eab308",
    icon: <Globe size={17} strokeWidth={1.8} />,
    items: [
      {
        id: "6.1",
        text: "The Administration does not sell, rent, or trade Personal Data to third parties for commercial purposes.",
      },
      {
        id: "6.2",
        text: "Personal Data may be shared with third-party service providers who assist in operating the Platform (e.g., payment processors, hosting providers, analytics services) strictly for operational purposes and subject to appropriate data protection agreements.",
      },
      {
        id: "6.3",
        text: "Personal Data may be disclosed to competent state authorities upon lawful request in accordance with applicable legislation.",
      },
      {
        id: "6.4",
        text: "In the event of a business transfer, merger, or acquisition, User Personal Data may be transferred as part of that transaction, subject to the same protections described in this Policy.",
      },
      {
        id: "6.5",
        text: "International transfers of Personal Data outside the Russian Federation shall be conducted in compliance with applicable law, including verification that the receiving jurisdiction provides adequate protection for data subjects.",
      },
      {
        id: "6.6",
        text: "Cookie and analytics data collected through the Platform is not shared with third parties for advertising purposes.",
      },
    ],
  },
  {
    id: "s7",
    num: "7",
    title: "User Rights",
    color: "#06b6d4",
    icon: <UserCheck size={17} strokeWidth={1.8} />,
    items: [
      {
        id: "7.1",
        text: "Users have the right to: request information about what Personal Data the Administration holds about them; request correction of inaccurate Personal Data; request deletion of Personal Data (subject to legal retention requirements); withdraw consent to data processing where consent is the legal basis.",
      },
      {
        id: "7.2",
        text: "To exercise any of these rights, the User must submit a written request through the official support channels specified on the Platform.",
      },
      {
        id: "7.3",
        text: "The Administration will respond to valid requests within 30 calendar days. The Administration reserves the right to verify the identity of the requestor before fulfilling any data-related request.",
      },
      {
        id: "7.4",
        text: "Certain data may be retained even after a deletion request where required by law or for legitimate business purposes such as fraud prevention.",
      },
    ],
  },
  {
    id: "s8",
    num: "8",
    title: "Cookies Policy",
    color: "#ec4899",
    icon: <Eye size={17} strokeWidth={1.8} />,
    items: [
      {
        id: "8.1",
        text: "The Platform uses cookies and similar tracking technologies to enhance the User experience and collect analytics data.",
      },
      {
        id: "8.2",
        text: "Types of cookies used: strictly necessary cookies (required for Platform operation); analytics cookies (usage statistics and performance monitoring); functional cookies (remembering preferences and session state).",
      },
      {
        id: "8.3",
        text: "The User can manage or disable cookies through their browser settings. Disabling necessary cookies may impair Platform functionality. Disabling analytics cookies will not affect core Platform features.",
      },
      {
        id: "8.4",
        text: "Cookie data is retained on the User's device until manually deleted or until browser session expiry, depending on cookie type.",
      },
    ],
  },
  {
    id: "s9",
    num: "9",
    title: "Amendments & Contact",
    color: "#8b5cf6",
    icon: <RefreshCw size={17} strokeWidth={1.8} />,
    items: [
      {
        id: "9.1",
        text: "The Administration may update this Privacy Policy at any time. The updated Policy takes effect immediately upon publication on the Platform. Continued use of the Platform after changes constitutes acceptance of the updated Policy.",
      },
      {
        id: "9.2",
        text: "For questions, requests, or concerns regarding this Privacy Policy or Personal Data processing, Users may contact the Administration through official support channels listed on the Platform.",
      },
      {
        id: "9.3",
        text: "Self-Employed Individual: Galuzo Artem Mikhailovich, INN: 502505389890",
      },
    ],
  },
];

const LEGAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Oxanium:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#07070b;--s1:#0b0b11;--s2:#0f0f16;--s3:#14141e;--w:rgba(255,255,255,.055);--w2:rgba(255,255,255,.1);--w3:rgba(255,255,255,.18);--t1:#eaeaf4;--t2:#76769a;--t3:#40405a;--fh:'Oxanium',sans-serif;--fb:'DM Sans',sans-serif;--fm:'IBM Plex Mono',monospace;}
html,body{background:var(--bg);color:var(--t1);font-family:var(--fb);-webkit-font-smoothing:antialiased}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:var(--w2);border-radius:2px}
.legal-page{min-height:100vh;background:var(--bg);position:relative}
.legal-page::before{content:'';position:fixed;inset:0;pointer-events:none;z-index:0;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");background-size:300px 300px;opacity:.018}
.legal-page::after{content:'';position:fixed;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(var(--w) 1px,transparent 1px),linear-gradient(90deg,var(--w) 1px,transparent 1px);background-size:80px 80px;opacity:.5}
.z1{position:relative;z-index:1}.cx{max-width:900px;margin:0 auto;padding:0 28px}
.l-hero{padding:80px 0 52px}
.eyebrow{display:inline-flex;align-items:center;gap:10px;font-family:var(--fm);font-size:10px;color:var(--t3);letter-spacing:.15em;text-transform:uppercase;margin-bottom:18px}
.eyebrow-line{width:22px;height:1px;background:var(--w3)}
.l-hero-h{font-family:var(--fh);font-size:clamp(32px,5.5vw,58px);font-weight:800;line-height:.96;letter-spacing:-.03em;margin-bottom:16px;color:var(--t1)}
.l-hero-h .dim{color:rgba(255,255,255,.12)}
.l-hero-p{font-size:13px;color:var(--t2);line-height:1.75;max-width:500px;margin-bottom:28px}
.l-meta{display:flex;flex-wrap:wrap;gap:8px}
.l-chip{display:inline-flex;align-items:center;gap:6px;font-family:var(--fm);font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--t3);border:1px solid var(--w2);border-radius:5px;padding:4px 10px;background:var(--s2)}
.sh-title{font-family:var(--fh);font-size:16px;font-weight:700;letter-spacing:-.015em}
.sh-sub{font-family:var(--fm);font-size:10px;color:var(--t3);margin-top:4px;letter-spacing:.06em}
.div{height:1px;background:var(--w);margin-bottom:24px}
.l-sections{display:flex;flex-direction:column;gap:8px;margin-bottom:80px}
.l-sec{background:var(--s1);border:1px solid var(--w);border-radius:12px;overflow:hidden;transition:border-color .25s;animation:lci .35s ease both}
@keyframes lci{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:none}}
.l-sec.open{border-color:var(--lc,var(--w2))}
.l-sec-bar{height:1px;transition:background .3s}
.l-sec-head{display:flex;align-items:center;gap:14px;padding:16px 20px;cursor:pointer;transition:background .2s;user-select:none}
.l-sec-head:hover{background:var(--s2)}
.l-sec-icon{width:34px;height:34px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;border:1px solid;transition:box-shadow .25s}
.l-sec.open .l-sec-icon{box-shadow:0 0 14px var(--ls,transparent)}
.l-sec-num{font-family:var(--fm);font-size:9px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--t3);margin-bottom:2px}
.l-sec-title{font-family:var(--fh);font-size:14px;font-weight:800;letter-spacing:-.015em}
.l-sec-cnt{font-family:var(--fm);font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--t3);border:1px solid var(--w);background:var(--s2);padding:2px 7px;border-radius:4px;margin-left:auto;flex-shrink:0}
.l-sec-chev{color:var(--t3);flex-shrink:0;transition:transform .3s cubic-bezier(.34,1.2,.64,1)}
.l-sec.open .l-sec-chev{transform:rotate(180deg)}
.l-sec-body{overflow:hidden;max-height:0;transition:max-height .4s cubic-bezier(.4,0,.2,1)}
.l-sec.open .l-sec-body{max-height:3000px}
.l-items{border-top:1px solid var(--w)}
.l-item{display:flex;gap:14px;padding:14px 20px;border-bottom:1px solid var(--w);transition:background .15s}
.l-item:last-child{border-bottom:none}
.l-item:hover{background:var(--s2)}
.l-item-id{font-family:var(--fm);font-size:11px;font-weight:600;letter-spacing:.04em;flex-shrink:0;margin-top:2px;min-width:26px}
.l-item-text{font-size:13px;color:var(--t2);line-height:1.7}
`;

export const Privacy: React.FC = () => {
  const [open, setOpen] = useState<string | null>(null);
  const toggle = (id: string) => setOpen(open === id ? null : id);

  return (
    <>
      <style>{LEGAL_CSS}</style>
      <div className="legal-page">
        <div className="z1">
          <div className="cx">
            <div className="l-hero">
              <div className="eyebrow">
                <div className="eyebrow-line" />
                Legal
                <div className="eyebrow-line" />
              </div>
              <h1 className="l-hero-h">
                Privacy <span className="dim">Policy</span>
              </h1>
              <p className="l-hero-p">
                This Policy explains how the Pixel Platform collects, processes,
                stores, and protects your personal data. By using the Platform
                you consent to this Policy in full.
              </p>
              <div className="l-meta">
                <span className="l-chip">
                  <AlertTriangle size={9} />
                  GDPR-aware
                </span>
                <span className="l-chip">152-ФЗ compliant</span>
                <span className="l-chip">Administration: Galuzo A.M.</span>
                <span className="l-chip">Global · English</span>
              </div>
            </div>

            <div style={{ marginBottom: 18 }}>
              <div className="sh-title">Policy Sections</div>
              <div className="sh-sub">
                // Your data rights and our obligations
              </div>
            </div>
            <div className="div" />

            <div className="l-sections">
              {SECTIONS.map((sec, idx) => {
                const isOpen = open === sec.id;
                return (
                  <div
                    key={sec.id}
                    className={`l-sec${isOpen ? " open" : ""}`}
                    style={
                      {
                        "--lc": sec.color + "44",
                        "--ls": sec.color + "35",
                        animationDelay: `${idx * 40}ms`,
                      } as React.CSSProperties
                    }
                  >
                    <div
                      className="l-sec-bar"
                      style={{
                        background: isOpen
                          ? `linear-gradient(90deg,${sec.color}70,transparent)`
                          : "transparent",
                      }}
                    />
                    <div className="l-sec-head" onClick={() => toggle(sec.id)}>
                      <div
                        className="l-sec-icon"
                        style={{
                          background: sec.color + "10",
                          borderColor: sec.color + "30",
                          color: sec.color,
                        }}
                      >
                        {sec.icon}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="l-sec-num">Section {sec.num}</div>
                        <div className="l-sec-title">{sec.title}</div>
                      </div>
                      <div className="l-sec-cnt">
                        {sec.items.length} clauses
                      </div>
                      <div className="l-sec-chev">
                        <ChevronDown size={15} />
                      </div>
                    </div>
                    <div className="l-sec-body">
                      <div className="l-items">
                        {sec.items.map((item) => (
                          <div key={item.id} className="l-item">
                            <span
                              className="l-item-id"
                              style={{ color: sec.color }}
                            >
                              {item.id}
                            </span>
                            <span className="l-item-text">{item.text}</span>
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
