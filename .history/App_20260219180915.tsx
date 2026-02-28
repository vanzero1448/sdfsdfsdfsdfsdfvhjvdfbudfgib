import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Donate } from "./pages/Donate";
import { Community } from "./pages/Community";
import { Rules } from "./pages/Rules";
import { Footer } from "./components/Footer";
import { LoreKeeper } from "./components/LoreKeeper";
import { Snow } from "./components/Snow";
import { Page } from "./types";
import "./index,css";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME:
        return <Home onNavigate={setCurrentPage} />;
      case Page.DONATE:
        return <Donate />;
      case Page.COMMUNITY:
        return <Community />;
      case Page.RULES:
        return <Rules />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div
      className="scanlines"
      style={{
        minHeight: "100vh",
        background: "var(--bg-void)",
        position: "relative",
      }}
    >
      {/* Global snow layer */}
      <Snow />

      {/* Global subtle radial bg */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,60,120,0.12) 0%, transparent 60%)",
          zIndex: 0,
        }}
      />

      {/* Global grid */}
      <div
        className="fixed inset-0 pointer-events-none grid-bg opacity-20"
        style={{ zIndex: 0 }}
      />

      {/* Main content */}
      <div className="relative" style={{ zIndex: 2 }}>
        <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />

        <main style={{ minHeight: "calc(100vh - 80px)" }}>{renderPage()}</main>

        <Footer />
      </div>

      {/* AI Chat */}
      <div style={{ position: "relative", zIndex: 50 }}>
        <LoreKeeper />
      </div>
    </div>
  );
}

export default App;
