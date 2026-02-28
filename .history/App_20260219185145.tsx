import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Donate } from "./pages/Donate";
import { Community } from "./pages/Community";
import { Rules } from "./pages/Rules";
import { Page } from "./types";

export default function App() {
  const [page, setPage] = useState<Page>(Page.HOME);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const render = () => {
    switch (page) {
      case Page.HOME:
        return <Home onNavigate={setPage} />;
      case Page.DONATE:
        return <Donate />;
      case Page.COMMUNITY:
        return <Community />;
      case Page.RULES:
        return <Rules />;
      default:
        return <Home onNavigate={setPage} />;
    }
  };

  return (
    <>
      <Navbar currentPage={page} onNavigate={setPage} />
      <main>{render()}</main>
      <Footer />
    </>
  );
}
