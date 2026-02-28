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
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main>{renderPage()}</main>
      <Footer />
      <LoreKeeper />
    </div>
  );
}

export default App;
