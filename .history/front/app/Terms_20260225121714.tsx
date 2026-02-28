import React, { useState } from "react";
import {
  FileText,
  ChevronDown,
  ShieldOff,
  Globe,
  Lock,
  Scale,
  AlertTriangle,
  User,
  BookOpen,
} from "lucide-react";

const SECTIONS = [
  {
    id: "s1",
    num: "1",
    title: "Definitions",
    color: "#a78bfa",
    icon: <BookOpen size={17} strokeWidth={1.8} />,
    items: [
      {
        id: "1.1",
        text: "Platform — the website and associated services operated by the Administration, accessible via the domain designated by the Administration.",
      },
      {
        id: "1.2",
        text: "User — any individual who accesses, browses, or uses the Platform in any way whatsoever.",
      },
      {
        id: "1.3",
        text: "Administration — self-employed individual Galuzo Artem Mikhailovich (INN: 502505389890), the rights holder and lawful administrator of the Platform.",
      },
      {
        id: "1.4",
        text: "Virtual Goods — intangible digital items including in-game ranks, privileges, cosmetics, and any other non-physical products offered through the Platform.",
      },
      {
        id: "1.5",
        text: "Agreement — this User Agreement in its current published version, constituting a public offer pursuant to applicable law.",
      },
      { id: "1.6", text: "Parties — the User and the Administration jointly." },
    ],
  },
  {
    id: "s2",
    num: "2",
    title: "Acceptance & Scope",
    color: "#34d399",
    icon: <FileText size={17} strokeWidth={1.8} />,
    items: [
      {
        id: "2.1",
        text: "This Agreement constitutes a public offer. By accessing or using the Platform in any manner, the User automatically accepts all terms of this Agreement in full without reservation.",
      },
      {
        id: "2.2",
        text: "If the User does not agree with any provision of this Agreement, the User must immediately cease all use of the Platform.",
      },
      {
        id: "2.3",
        text: "The Administration reserves the right to amend this Agreement at any time without prior notice. Continued use of the Platform after amendments constitutes acceptance of the updated terms. The User is solely responsible for regularly reviewing this Agreement.",
      },
      {
        id: "2.4",
        text: "This Agreement applies globally to all Users regardless of their country of residence. By using the Platform, international Users acknowledge that local consumer protection laws of their jurisdiction may not apply and that this Agreement takes precedence to the maximum extent permitted by law.",
      },
      {
        id: "2.5",
        text: "The User confirms they are of legal age in their jurisdiction and legally entitled to enter into binding agreements. Minors must obtain parental or guardian consent prior to any purchase.",
      },
    ],
  },
  {
    id: "s3",
    num: "3",
    title: "Platform Purpose & Use",
    color: "#60a5fa",
    icon: <Globe size={17} strokeWidth={1.8} />,
    items: [
      {
        id: "3.1",
        text: "The Platform provides Users with the ability to browse information about virtual goods, in-game services, server rules, and community content related to the Pixel game project.",
      },
      {
        id: "3.2",
        text: "The User agrees to use the Platform solely for its intended purposes and in full compliance with this Agreement, applicable law, and all published rules.",
      },
      {
        id: "3.3",
        text: "The User must not attempt unauthorized access to any part of the Platform or any connected systems; use bots, scrapers, automated tools, or any means not explicitly provided by the Platform; impersonate the Administration, staff, or any other person; post materials on behalf of third parties without authorization.",
      },
      {
        id: "3.4",
        text: "The Administration reserves the right to suspend, restrict, or terminate the User's access to the Platform at any time, for any reason or for no stated reason, without prior notice, without liability, and without obligation to provide any explanation or compensation.",
      },
      {
        id: "3.5",
        text: "The Administration may, at its sole discretion and without notice: modify, update, or discontinue any features or content of the Platform; perform maintenance causing temporary unavailability; alter the design, structure, or functionality of the Platform.",
      },
      {
        id: "3.6",
        text: "The Administration collects and stores IP addresses and technical session data for security, fraud prevention, and service improvement purposes.",
      },
    ],
  },
  {
    id: "s4",
    num: "4",
    title: "User Obligations",
    color: "#fb923c",
    icon: <User size={17} strokeWidth={1.8} />,
    items: [
      {
        id: "4.1",
        text: "The User agrees to provide accurate information when making purchases, including correct in-game nickname and server selection. The Administration bears no responsibility for errors attributable to the User.",
      },
      {
        id: "4.2",
        text: "The User agrees not to use the Platform or purchased Services for any purpose prohibited by applicable law, including but not limited to fraud, money laundering, or facilitating illegal activity.",
      },
      {
        id: "4.3",
        text: "The User agrees to comply with all server rules, game rules, and community guidelines published on the Platform.",
      },
      {
        id: "4.4",
        text: "The User agrees not to resell, transfer, share, or distribute purchased Virtual Goods or account access to third parties.",
      },
      {
        id: "4.5",
        text: "The User agrees not to initiate chargebacks or payment reversals for Services that were validly delivered. Such actions constitute a breach of this Agreement and will result in immediate permanent suspension and potential legal action.",
      },
      {
        id: "4.6",
        text: "The User agrees to indemnify and hold harmless the Administration from any claims, damages, or liabilities arising from the User's breach of this Agreement or misuse of the Platform.",
      },
    ],
  },
  {
    id: "s5",
    num: "5",
    title: "Intellectual Property",
    color: "#ec4899",
    icon: <Lock size={17} strokeWidth={1.8} />,
    items: [
      {
        id: "5.1",
        text: "All content on the Platform — including but not limited to design, graphics, text, logos, software, and Virtual Goods — is the intellectual property of the Administration and/or its licensors.",
      },
      {
        id: "5.2",
        text: "The User receives no license, copyright, or other intellectual property rights in any Platform content through use of the Platform or purchase of Virtual Goods.",
      },
      {
        id: "5.3",
        text: "Purchased Virtual Goods constitute a limited, personal, non-exclusive, non-transferable, revocable license to access specific in-game features. This license may be revoked at any time by the Administration without compensation.",
      },
      {
        id: "5.4",
        text: "The User must not copy, reproduce, distribute, modify, or create derivative works from any Platform content without prior written consent from the Administration.",
      },
    ],
  },
  {
    id: "s6",
    num: "6",
    title: "Liability & Disclaimers",
    color: "#f43f5e",
    icon: <ShieldOff size={17} strokeWidth={1.8} />,
    items: [
      {
        id: "6.1",
        text: "The Platform and all Services are provided on an 'AS IS' and 'AS AVAILABLE' basis. The Administration makes no warranties of any kind, express or implied.",
      },
      {
        id: "6.2",
        text: "The Administration does not warrant that: the Platform will operate without interruption or errors; results of using the Platform will meet the User's expectations; virtual goods will retain any specific value or functionality over time.",
      },
      {
        id: "6.3",
        text: "The Administration shall not be liable for any indirect, incidental, consequential, punitive, or exemplary damages, including lost profits, loss of data, or loss of goodwill, even if advised of the possibility of such damages.",
      },
      {
        id: "6.4",
        text: "The Administration's total liability to any User under any circumstances is strictly limited to the amount paid by that User for the specific disputed Service in the 30 days preceding the claim.",
      },
      {
        id: "6.5",
        text: "The Administration is not liable for force majeure events including natural disasters, acts of war, epidemics, government actions, DDoS attacks, infrastructure failures, or any other event outside the Administration's reasonable control.",
      },
      {
        id: "6.6",
        text: "The Administration is not responsible for the actions or omissions of third-party payment providers, internet service providers, or other third-party services used in connection with the Platform.",
      },
      {
        id: "6.7",
        text: "The Administration is not liable for any loss, damage, or harm resulting from the User's reliance on any information published on the Platform, including prices, feature descriptions, or promotional materials.",
      },
      {
        id: "6.8",
        text: "The User accepts full personal responsibility for all risks associated with the use of the Platform and the purchase of Virtual Goods, acknowledging the inherently transient nature of digital gaming products.",
      },
    ],
  },
  {
    id: "s7",
    num: "7",
    title: "Governing Law",
    color: "#06b6d4",
    icon: <Scale size={17} strokeWidth={1.8} />,
    items: [
      {
        id: "7.1",
        text: "This Agreement shall be governed by the laws of the Russian Federation. Any disputes arising from this Agreement shall be resolved through negotiation, and if unresolved, through competent courts of the Russian Federation.",
      },
      {
        id: "7.2",
        text: "If any provision of this Agreement is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.",
      },
      {
        id: "7.3",
        text: "The Administration's failure to enforce any provision of this Agreement shall not constitute a waiver of that provision.",
      },
    ],
  },
  {
    id: "s8",
    num: "8",
    title: "Administration Details",
    color: "#8b5cf6",
    icon: <FileText size={17} strokeWidth={1.8} />,
    items: [
      {
        id: "8.1",
        text: "Self-Employed Individual: Galuzo Artem Mikhailovich",
      },
      { id: "8.2", text: "INN (Tax ID): 502505389890" },
      {
        id: "8.3",
        text: "Contact: via official support channels listed on the Platform",
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

export const Terms: React.FC = () => {
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
                Terms of <span className="dim">Service</span>
                <br />
                Agreement
              </h1>
              <p className="l-hero-p">
                User Agreement governing access to and use of the Pixel
                Platform. By using this site in any way you unconditionally
                accept every clause of this Agreement.
              </p>
              <div className="l-meta">
                <span className="l-chip">
                  <AlertTriangle size={9} />
                  Legally binding
                </span>
                <span className="l-chip">Administration: Galuzo A.M.</span>
                <span className="l-chip">INN 502505389890</span>
                <span className="l-chip">Global · English</span>
              </div>
            </div>

            <div style={{ marginBottom: 18 }}>
              <div className="sh-title">Agreement Sections</div>
              <div className="sh-sub">// Applies to all users worldwide</div>
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
                        animationDelay: `${idx * 45}ms`,
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
