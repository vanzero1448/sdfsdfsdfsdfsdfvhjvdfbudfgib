import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t-4 border-cyan-400 py-12 relative z-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center bg-cyan-400/10 border-2 border-cyan-400 rounded-full">
            <img
              src="/img/ice.png"
              alt="Logo"
              className="w-10 h-10 object-contain drop-shadow-[0_0_15px_#67e8f9]"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
          <span
            className="text-3xl font-black tracking-tighter text-white neon-cyan"
            style={{ fontFamily: '"Press Start 2P"' }}
          >
            ICE<span className="text-cyan-400">TALE</span>
          </span>
        </div>

        <div className="text-slate-400 text-lg text-center md:text-right font-mono">
          <p>&copy; 2024–2026 IceTale Server. Все права защищены.</p>
          <div className="mt-4 flex flex-wrap justify-center md:justify-end gap-4">
            <a
              href="#"
              className="hover:text-cyan-400 hover:underline decoration-2 underline-offset-4 transition-colors"
            >
              Правила
            </a>
            <span className="text-slate-700">|</span>
            <a
              href="#"
              className="hover:text-cyan-400 hover:underline decoration-2 underline-offset-4 transition-colors"
            >
              Оферта
            </a>
            <span className="text-slate-700">|</span>
            <a
              href="#"
              className="hover:text-cyan-400 hover:underline decoration-2 underline-offset-4 transition-colors"
            >
              Приватность
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
