import React, { useState, useEffect } from "react";
import { Page, NavItem } from "../types";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navItems: NavItem[] = [
  { label: "Главная", page: Page.HOME },
  { label: "Магазин", page: Page.DONATE },
  { label: "Правила", page: Page.RULES },
  { label: "Форум", page: Page.COMMUNITY },
];

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(4, 8, 15, 0.96)"
          : "linear-gradient(180deg, rgba(4,8,15,0.9) 0%, transparent 100%)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled
          ? "1px solid rgba(0, 212, 255, 0.15)"
          : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.5)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNavigate(Page.HOME)}
          className="flex items-center gap-3 group"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              background: "linear-gradient(135deg, #00d4ff, #0077aa)",
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              boxShadow: "0 0 15px rgba(0,212,255,0.5)",
              transition: "box-shadow 0.3s",
              flexShrink: 0,
            }}
            className="group-hover:shadow-[0_0_25px_rgba(0,212,255,0.8)]"
          />
          <span
            className="font-orb font-black text-white tracking-widest"
            style={{
              fontSize: "1.3rem",
              letterSpacing: "0.25em",
              textShadow: "0 0 20px rgba(0,212,255,0.4)",
            }}
          >
            ICETALE
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`nav-link ${currentPage === item.page ? "active" : ""}`}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              {item.label}
            </button>
          ))}
          <div
            style={{
              width: 1,
              height: 24,
              background: "rgba(0,212,255,0.2)",
              margin: "0 8px",
            }}
          />
          <div className="flex items-center gap-2">
            <div className="pulse-dot" />
            <span
              className="font-mono text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              ONLINE
            </span>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          style={{
            background: "rgba(4, 8, 15, 0.98)",
            borderTop: "1px solid rgba(0,212,255,0.15)",
          }}
        >
          {navItems.map((item, i) => (
            <button
              key={item.page}
              onClick={() => {
                onNavigate(item.page);
                setIsOpen(false);
              }}
              className="w-full text-left px-6 py-4 font-pixel text-xl tracking-wider transition-colors"
              style={{
                background: "none",
                border: "none",
                borderBottom: "1px solid rgba(0,212,255,0.08)",
                color:
                  currentPage === item.page
                    ? "var(--cyan-ice)"
                    : "var(--text-secondary)",
                cursor: "pointer",
                animationDelay: `${i * 0.05}s`,
              }}
            >
              <span style={{ color: "var(--cyan-dim)", marginRight: "0.5rem" }}>
                ❄
              </span>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};
