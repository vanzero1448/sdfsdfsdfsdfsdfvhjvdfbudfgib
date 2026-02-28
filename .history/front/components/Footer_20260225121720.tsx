import React from "react";

// Adjust these imports/types to match your router setup
// e.g. import { Link } from "react-router-dom";
// For now using <a> tags — replace href with your route paths

const NAV_LINKS = [
  { label: "Rules", href: "/rules" },
  { label: "Community", href: "/community" },
  { label: "Public Offer", href: "/offer" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export const Footer: React.FC = () => (
  <>
    <style>{`
@import url('https://fonts.googleapis.com/css2?family=Oxanium:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;600&display=swap');
:root{
  --bg:#07070b;--s1:#0b0b11;--s2:#0f0f16;
  --w:rgba(255,255,255,.055);--w2:rgba(255,255,255,.1);
  --t1:#eaeaf4;--t2:#76769a;--t3:#40405a;
  --fh:'Oxanium',sans-serif;--fb:'DM Sans',sans-serif;--fm:'IBM Plex Mono',monospace;
}
.footer{
  position:relative;
  background:var(--s1);
  border-top:1px solid var(--w);
  z-index:10;
}
.footer::before{
  content:'';position:absolute;top:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.06),transparent);
}
.footer-inner{
  max-width:1180px;margin:0 auto;padding:40px 28px 32px;
  display:flex;flex-direction:column;align-items:center;gap:24px;
}
.footer-logo{
  display:flex;align-items:center;justify-content:center;
  opacity:.9;transition:opacity .2s;
}
.footer-logo:hover{opacity:1}
.footer-logo img{width:72px;height:72px;object-fit:contain}

.footer-nav{
  display:flex;flex-wrap:wrap;justify-content:center;gap:2px;
}
.footer-link{
  font-family:var(--fb);font-size:12px;font-weight:500;
  color:var(--t3);text-decoration:none;
  padding:5px 12px;border-radius:6px;
  transition:color .2s,background .2s;
}
.footer-link:hover{color:var(--t2);background:var(--s2)}

.footer-sep{
  width:100%;height:1px;background:var(--w);max-width:400px;
}

.footer-bottom{
  display:flex;flex-direction:column;align-items:center;gap:6px;
}
.footer-copy{
  font-family:var(--fm);font-size:10px;color:var(--t3);
  letter-spacing:.06em;text-align:center;
}
.footer-legal{
  font-family:var(--fm);font-size:9px;color:var(--t3);
  letter-spacing:.04em;text-align:center;opacity:.6;
}
`}</style>

    <footer className="footer">
      <div className="footer-inner">
        {/* Logo */}
        <a className="footer-logo" href="/">
          <img src="/img/ice.png" alt="Pixel" />
        </a>

        {/* Nav */}
        <nav className="footer-nav">
          {NAV_LINKS.map((l) => (
            <a key={l.label} className="footer-link" href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="footer-sep" />

        {/* Bottom */}
        <div className="footer-bottom">
          <div className="footer-copy">
            Pixel. by OnePay. &nbsp;·&nbsp; All rights reserved
          </div>
          <div className="footer-legal">
            Self-employed: Galuzo A.M. · INN 502505389890 · Digital services
            only · No physical goods
          </div>
        </div>
      </div>
    </footer>
  </>
);
