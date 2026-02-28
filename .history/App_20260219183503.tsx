import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Donate } from "./pages/Donate";
import { Community } from "./pages/Community";
import { Rules } from "./pages/Rules";
import { Footer } from "./components/Footer";
import { LoreKeeper } from "./components/LoreKeeper";
import { Page } from "./types";

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
    <div className="min-h-screen bg-slate-950 text-white flex flex-col relative overflow-hidden">
      {/* Global scanlines + subtle grid */}
      <div className="scanlines"></div>
      <div
        className="fixed inset-0 z-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.6'%3E%3Cpath d='M0 30h60M30 0v60'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />

      <main className="flex-grow z-10 relative pt-20">{renderPage()}</main>

      <Footer />
      <LoreKeeper />
    </div>
  );
}

export default App;
