import React, { useState } from "react";
import { FileText, ChevronDown, ShieldOff, CreditCard, Zap, AlertTriangle, Scale, RefreshCw } from "lucide-react";

const SECTIONS = [
  {
    id: "s1",
    num: "1",
    title: "Subject of Agreement",
    color: "#a78bfa",
    icon: <FileText size={17} strokeWidth={1.8} />,
    items: [
      { id: "1.1", text: "This Public Offer (hereinafter — the Offer constitutes an official proposal by the self-employed individual Galuzo Artem Mikhailovich (INN: 502505389890, hereinafter — the Provider) to enter into a Digital Services Agreement on the terms set forth herein." },
      { id: "1.2", text: "The Provider renders services consisting of granting access to digital content in the form of in-game privileges, ranks, cosmetic items, and other virtual goods on the Pixel game servers (hereinafter — the Services")." },
      { id: "1.3", text: "Acceptance of this Offer is deemed to occur upon the Customer performing any payment action directed at purchasing Services through the available payment methods on the Platform." },
      { id: "1.4", text: "By accepting this Offer, the Customer confirms full acquaintance with and unconditional agreement to all terms herein. The Customer acknowledges that virtual goods and in-game privileges are intangible digital products and do not constitute physical goods subject to standard consumer protection regulations governing tangible property." },
      { id: "1.5", text: "The Services are provided on an international basis. Customers located outside the Russian Federation accept that their local consumer protection laws may not apply, and that this Offer is governed exclusively by the terms stated herein and applicable Russian Federation law." },
    ],
  },
  {
    id: "s2",
    num: "2",
    title: "Prices & Payment",
    color: "#34d399",
    icon: <CreditCard size={17} strokeWidth={1.8} />,
    items: [
      { id: "2.1", text: "Prices for Services are displayed on the /donate page of the Platform and may be denominated in USD, EUR, RUB, or other currencies as determined solely by the Provider. Prices may be changed unilaterally at any time without prior notice." },
      { id: "2.2", text: "Payment is processed through available third-party payment systems. The Provider is not responsible for any currency conversion fees, transaction fees, international transfer fees, or taxes imposed by the Customer's bank, payment provider, or local government." },
      { id: "2.3", text: "The Customer bears sole responsibility for all fees, taxes, duties, and levies applicable in their country of residence in connection with the purchase of Services." },
      { id: "2.4", text: "The Provider reserves the right to modify pricing, introduce new pricing tiers, discontinue existing packages, or apply promotional discounts at any time without prior notice or compensation to previously paying customers." },
      { id: "2.5", text: "Any discrepancy between displayed prices and actual charged amounts due to currency conversion, payment processor fees, or exchange rate fluctuations is the sole responsibility of the Customer and their payment provider." },
    ],
  },
  {
    id: "s3",
    num: "3",
    title: "Service Delivery",
    color: "#60a5fa",
    icon: <Zap size={17} strokeWidth={1.8} />,
    items: [
      { id: "3.1", text: "The Provider delivers Services by automatically activating in-game privileges on the selected game server upon successful receipt of payment. Activation typically occurs within a few minutes but the Provider does not guarantee any specific delivery timeframe." },
      { id: "3.2", text: "The Customer must provide an accurate in-game nickname and select the correct server at the time of purchase. The Provider bears absolutely no responsibility for errors caused by the Customer in specifying such information, and no refund or reactivation will be performed in such cases." },
      { id: "3.3", text: "Services are deemed rendered from the moment of privilege activation on the game server. The service is delivered in digital/electronic form and requires no physical delivery." },
      { id: "3.4", text: "The Provider makes no guarantees regarding the continuous availability of game servers, specific game features, commands, or privileges associated with purchased ranks. Game mechanics, features, and commands may be altered, reduced, or removed at any time without compensation." },
      { id: "3.5", text: "The Provider reserves the right to modify, suspend, or permanently discontinue any Services, server features, game modes, or the Platform itself at any time, for any reason, without prior notice and without any obligation to provide compensation or refunds to any Customer." },
    ],
  },
  {
    id: "s4",
    num: "4",
    title: "Rights & Obligations",
    color: "#fb923c",
    icon: <Scale size={17} strokeWidth={1.8} />,
    items: [
      { id: "4.1", text: "The Provider undertakes to render Services to the Customer in accordance with the terms of this Offer to the extent technically feasible and at the Provider's sole discretion." },
      { id: "4.2", text: "The Provider reserves the right to refuse service, cancel orders, suspend or terminate access to Services for any Customer at any time, for any reason or for no stated reason, including but not limited to violations of game rules, suspected fraud, or chargebacks." },
      { id: "4.3", text: "The Provider may modify service conditions, rank benefits, game privileges, or any feature associated with purchased Services at any time without prior notice. Such modifications do not entitle the Customer to any refund, compensation, or extension." },
      { id: "4.4", text: "The Customer undertakes to pay for selected Services and to use them solely for lawful purposes in compliance with all applicable laws and the server rules published on the Platform." },
      { id: "4.5", text: "The Customer acknowledges that purchased Services are personal and non-transferable, and that sharing, selling, or otherwise transferring account privileges to third parties is strictly prohibited and may result in permanent suspension without refund." },
      { id: "4.6", text: "The Customer expressly waives any right to dispute, challenge, or reverse any payment made for Services that were successfully activated, regardless of subsequent changes to server features, rules, or availability." },
    ],
  },
  {
    id: "s5",
    num: "5",
    title: "Liability & Disclaimers",
    color: "#f43f5e",
    icon: <ShieldOff size={17} strokeWidth={1.8} />,
    items: [
      { id: "5.1", text: "The Provider shall not be liable for any inability to use Services due to circumstances beyond the Provider's control, including but not limited to: technical failures of the game server, third-party service outages, actions of third parties, force majeure events, DDoS attacks, power outages, or changes in applicable law." },
      { id: "5.2", text: "The Provider shall not be liable for any data loss, progress loss, game currency loss, or any other in-game loss resulting from server resets, updates, technical failures, or administrative decisions." },
      { id: "5.3", text: "The Provider provides all Services strictly on an 'AS IS' and 'AS AVAILABLE' basis, without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement." },
      { id: "5.4", text: "The Provider's total aggregate liability to any Customer under any circumstances shall not exceed the amount actually paid by that Customer for the specific Service in dispute within the 30 days preceding the claim. Under no circumstances shall the Provider be liable for indirect, incidental, consequential, special, punitive, or exemplary damages." },
      { id: "5.5", text: "The Provider shall not be responsible for any financial losses, lost profits, lost business opportunities, or any other economic damage suffered by the Customer in connection with the use or inability to use the Services." },
      { id: "5.6", text: "By purchasing Services, the Customer acknowledges full understanding that online gaming services are inherently subject to change, interruption, and termination, and that no purchase of virtual goods constitutes any permanent entitlement." },
      { id: "5.7", text: "The Provider shall have the absolute right to ban, mute, suspend, or permanently remove any Customer from the Platform for violations of server rules or at the Provider's sole discretion, with no obligation to provide refunds for any unused portion of purchased privileges." },
      { id: "5.8", text: "The Customer agrees to indemnify, defend, and hold harmless the Provider from any claims, damages, liabilities, costs, or expenses arising from the Customer's use or misuse of the Services, violation of this Offer, or infringement of any third-party rights." },
    ],
  },
  {
    id: "s6",
    num: "6",
    title: "Refunds",
    color: "#eab308",
    icon: <RefreshCw size={17} strokeWidth={1.8} />,
    items: [
      { id: "6.1", text: "All sales of digital Services are final. Refunds are not available once a Service has been successfully activated on the game server, regardless of whether the Customer has used the privilege." },
      { id: "6.2", text: "A refund may be considered exclusively in cases where the Service was not activated within 72 hours of payment due to a technical fault solely attributable to the Provider, and only after the Provider verifies that no activation occurred." },
      { id: "6.3", text: "No refunds will be issued for: incorrectly entered nicknames or server selections; voluntary non-use of privileges; account bans due to rule violations; dissatisfaction with game features; changes to server mechanics; server maintenance periods; or any other reason not covered by clause 6.2." },
      { id: "6.4", text: "Initiating a chargeback, payment dispute, or reversal through a payment provider for any Service that was successfully activated will result in an immediate permanent ban of all accounts associated with the Customer and may result in legal action." },
      { id: "6.5", text: "To request a refund under clause 6.2, the Customer must contact the Provider via the support channels specified on the Platform, providing the payment transaction ID, purchase details, and a description of the issue. The Provider's decision on refund requests is final." },
    ],
  },
  {
    id: "s7",
    num: "7",
    title: "Governing Law & Disputes",
    color: "#06b6d4",
    icon: <Scale size={17} strokeWidth={1.8} />,
    items: [
      { id: "7.1", text: "This Offer and all disputes arising from it shall be governed by and construed in accordance with the laws of the Russian Federation, without regard to conflict of law principles." },
      { id: "7.2", text: "All disputes shall first be subject to negotiation. The Customer must submit a written claim to the Provider and allow 30 calendar days for resolution before initiating any legal proceedings." },
      { id: "7.3", text: "If resolution through negotiation is not achieved, disputes shall be submitted to a court of general jurisdiction at the location of the Provider." },
    ],
  },
  {
    id: "s8",
    num: "8",
    title: "Provider Details",
    color: "#8b5cf6",
    icon: <FileText size={17} strokeWidth={1.8} />,
    items: [
      { id: "8.1", text: "Self-Employed Individual: Galuzo Artem Mikhailovich" },
      { id: "8.2", text: "INN (Tax ID): 502505389890" },
      { id: "8.3", text: "Support contact: available via the Platform's official support channels" },
    ],
  },
];

const LEGAL_CSS = `
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
.legal-page{min-height:100vh;background:var(--bg);position:relative}
.legal-page::before{content:'';position:fixed;inset:0;pointer-events:none;z-index:0;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  background-size:300px 300px;opacity:.018}
.legal-page::after{content:'';position:fixed;inset:0;pointer-events:none;z-index:0;
  background-image:linear-gradient(var(--w) 1px,transparent 1px),linear-gradient(90deg,var(--w) 1px,transparent 1px);
  background-size:80px 80px;opacity:.5}
.z1{position:relative;z-index:1}
.cx{max-width:900px;margin:0 auto;padding:0 28px}
.l-hero{padding:80px 0 52px}
.eyebrow{display:inline-flex;align-items:center;gap:10px;font-family:var(--fm);font-size:10px;
  color:var(--t3);letter-spacing:.15em;text-transform:uppercase;margin-bottom:18px}
.eyebrow-line{width:22px;height:1px;background:var(--w3)}
.l-hero-h{font-family:var(--fh);font-size:clamp(32px,5.5vw,58px);font-weight:800;
  line-height:.96;letter-spacing:-.03em;margin-bottom:16px;color:var(--t1)}
.l-hero-h .dim{color:rgba(255,255,255,.12)}
.l-hero-p{font-size:13px;color:var(--t2);line-height:1.75;max-width:500px;margin-bottom:28px}
.l-meta{display:flex;flex-wrap:wrap;gap:8px}
.l-chip{display:inline-flex;align-items:center;gap:6px;font-family:var(--fm);font-size:9px;
  letter-spacing:.12em;text-transform:uppercase;color:var(--t3);
  border:1px solid var(--w2);border-radius:5px;padding:4px 10px;background:var(--s2)}
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

export const Offer: React.FC = () => {
  const [open, setOpen] = useState<string | null>(null);
  const toggle = (id: string) => setOpen(open === id ? null : id);

  return (
    <>
      <style>{LEGAL_CSS}</style>
      <div className="legal-page">
        <div className="z1">
          <div className="cx">
            <div className="l-hero">
              <div className="eyebrow"><div className="eyebrow-line" />Legal<div className="eyebrow-line" /></div>
              <h1 className="l-hero-h">Public <span className="dim">Offer</span><br />Agreement</h1>
              <p className="l-hero-p">Digital Services Agreement — governs the purchase of in-game privileges and virtual goods on the Pixel platform. By making a payment you unconditionally accept all terms herein.</p>
              <div className="l-meta">
                <span className="l-chip"><AlertTriangle size={9} />Legally binding</span>
                <span className="l-chip">Self-employed: Galuzo A.M.</span>
                <span className="l-chip">INN 502505389890</span>
                <span className="l-chip">Multi-currency · Global</span>
              </div>
            </div>

            <div style={{ marginBottom: 18 }}>
              <div className="sh-title">Agreement Sections</div>
              <div className="sh-sub">// Read all sections carefully before purchase</div>
            </div>
            <div className="div" />

            <div className="l-sections">
              {SECTIONS.map((sec, idx) => {
                const isOpen = open === sec.id;
                return (
                  <div
                    key={sec.id}
                    className={`l-sec${isOpen ? " open" : ""}`}
                    style={{ "--lc": sec.color + "44", "--ls": sec.color + "35", animationDelay: `${idx * 45}ms` } as React.CSSProperties}
                  >
                    <div className="l-sec-bar" style={{ background: isOpen ? `linear-gradient(90deg,${sec.color}70,transparent)` : "transparent" }} />
                    <div className="l-sec-head" onClick={() => toggle(sec.id)}>
                      <div className="l-sec-icon" style={{ background: sec.color + "10", borderColor: sec.color + "30", color: sec.color }}>
                        {sec.icon}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="l-sec-num">Section {sec.num}</div>
                        <div className="l-sec-title">{sec.title}</div>
                      </div>
                      <div className="l-sec-cnt">{sec.items.length} clauses</div>
                      <div className="l-sec-chev"><ChevronDown size={15} /></div>
                    </div>
                    <div className="l-sec-body">
                      <div className="l-items">
                        {sec.items.map(item => (
                          <div key={item.id} className="l-item">
                            <span className="l-item-id" style={{ color: sec.color }}>{item.id}</span>
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