import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Page, NavItem } from "../types";

interface Props {
  currentPage: Page;
  onNavigate: (p: Page) => void;
}

const LINKS: NavItem[] = [
  { label: "Home", page: Page.HOME },
  { label: "Store", page: Page.DONATE },
  { label: "Rules", page: Page.RULES },
  { label: "Community", page: Page.COMMUNITY },
];

export const Navbar: React.FC<Props> = ({ currentPage, onNavigate }) => {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (p: Page) => {
    onNavigate(p);
    setOpen(false);
  };

  return (
    <nav className={`navbar ${solid ? "solid" : ""}`}>
      <div className="navbar-inner">
        {/* Логотип (только картинка, без текста) */}
        <button
          className="logo"
          onClick={() => go(Page.HOME)}
          style={{
            padding: 0,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src="/img/ice.png"
            alt="Pixel Logo"
            style={{ width: 50, height: 200, objectFit: "contain" }}
          />
        </button>

        <div className="nav-links">
          {LINKS.map((l) => (
            <button
              key={l.page}
              className={`nav-link ${currentPage === l.page ? "active" : ""}`}
              onClick={() => go(l.page)}
            >
              {l.label}
            </button>
          ))}
          <div className="nav-sep" />
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div className="online-dot" />
            <span style={{ fontSize: 13, color: "var(--t2)", fontWeight: 500 }}>
              Online
            </span>
          </div>
        </div>

        <button className="nav-mobile-btn" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="nav-mobile-menu">
          {LINKS.map((l) => (
            <button
              key={l.page}
              className={`nav-mobile-link ${currentPage === l.page ? "active" : ""}`}
              onClick={() => go(l.page)}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};
