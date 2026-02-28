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
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-inner">
        {/* Logo */}
        <button
          onClick={() => onNavigate(Page.HOME)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              background: "linear-gradient(135deg, #2a9dc4, #1a7a99)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "1rem",
              fontWeight: "bold",
              boxShadow: "0 4px 12px rgba(42,157,196,.4)",
              fontFamily: "Orbitron, sans-serif",
            }}
          >
            ❄
          </div>
          <span
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontWeight: 800,
              fontSize: "1.1rem",
              color: "#1a2c3d",
              letterSpacing: ".08em",
            }}
          >
            ICE<span style={{ color: "#2a9dc4" }}>TALE</span>
          </span>
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`nav-link ${currentPage === item.page ? "active" : ""}`}
            >
              {item.label}
            </button>
          ))}
          <div
            style={{
              width: 1,
              height: 20,
              background: "#d0dde9",
              margin: "0 8px",
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div className="pulse-dot" />
            <span
              style={{ fontSize: ".8rem", color: "#8aaabb", fontWeight: 500 }}
            >
              Online
            </span>
          </div>
        </div>

        {/* Mobile */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#4a6880",
            padding: 4,
          }}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div
          style={{
            background: "rgba(238,243,248,.97)",
            backdropFilter: "blur(14px)",
            borderTop: "1px solid #d0dde9",
            padding: "0.5rem 1rem 1rem",
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => {
                onNavigate(item.page);
                setOpen(false);
              }}
              className={`nav-link ${currentPage === item.page ? "active" : ""}`}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: ".7rem 1rem",
                borderRadius: 10,
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};
