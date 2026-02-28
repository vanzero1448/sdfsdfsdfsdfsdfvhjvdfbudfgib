import React from "react";
import { Page } from "../types";
import { ExternalLink, Play } from "lucide-react";

interface HomeProps {
  onNavigate: (page: Page) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-[#1a1c2c] border-b-4 border-black pb-12">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-[url('/img/view.jpeg')] bg-cover bg-center opacity-40 contrast-125"
            style={{ imageRendering: "pixelated" }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-black/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-8">
          <div className="mb-8 inline-block pixel-box px-8 py-6 bg-slate-900/80 shadow-[12px_12px_0px_rgba(0,0,0,0.5)] backdrop-blur-sm">
            <h1 className="text-5xl md:text-7xl lg:text-8xl text-white text-shadow-pixel mb-4 leading-snug tracking-wide">
              ICE<span className="text-cyan-400">TALE</span>
            </h1>
            <p className="text-xl md:text-3xl text-cyan-200 tracking-widest font-bold">
              [ Hytale Server ]
            </p>
          </div>

          <div className="mb-12 max-w-3xl mx-auto bg-black/60 p-6 border-4 border-white/10 backdrop-blur-md shadow-2xl">
            <p className="text-gray-200 text-xl md:text-2xl leading-relaxed font-mono">
              {">"} Мир вечной мерзлоты и магии.
              <br />
              {">"} Построй свою крепость.
              <br />
              {">"} Стань легендой севера.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => onNavigate(Page.DONATE)}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-2xl font-bold text-white transition-all duration-200 bg-cyan-600 border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:bg-cyan-500 active:translate-y-1 active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            >
              НАЧАТЬ ИГРУ
            </button>
            <a
              href="https://t.me/icetaletg"
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-2xl font-bold text-white transition-all duration-200 bg-slate-700 border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:bg-slate-600 active:translate-y-1 active:shadow-[2px_2px_0px_rgba(0,0,0,1)] no-underline gap-3"
            >
              TELEGRAM <ExternalLink size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* Servers Section */}
      <section className="py-24 px-4 relative bg-[#0f172a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl text-white mb-8 text-shadow-pixel">
              ВЫБЕРИ РЕЖИМ
            </h2>
            <div className="h-2 w-32 bg-cyan-600 mx-auto mb-2"></div>
            <div className="h-2 w-16 bg-cyan-600 mx-auto"></div>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-5xl pixel-box bg-[#1e293b] p-0 flex flex-col md:flex-row overflow-hidden group hover:border-cyan-400 transition-colors duration-300">
              <div className="md:w-2/5 bg-black/40 border-b-4 md:border-b-0 md:border-r-4 border-black p-10 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-[url('/img/survival.png')] bg-cover bg-center blur-md opacity-20"></div>
                <img
                  src="/img/survival.jpg"
                  alt="Survival Logo"
                  className="relative z-10 w-60 h-48 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform duration-500"
                  style={{ imageRendering: "pixelated" }}
                />
              </div>

              <div className="flex-1 p-8 md:p-12 flex flex-col justify-between items-start bg-gradient-to-br from-slate-800 to-slate-900">
                <div className="w-full">
                  <div className="flex justify-between items-start w-full mb-4">
                    <h3
                      className="text-3xl md:text-4xl text-yellow-400 mb-2 leading-tight"
                      style={{ fontFamily: '"Press Start 2P"' }}
                    >
                      SURVIVAL ONE
                    </h3>
                  </div>

                  <div className="space-y-3 mb-8 text-gray-300 text-lg md:text-xl">
                    <p>Погрузись в суровый мир выживания. </p>
                    <ul className="space-y-2 ml-1">
                      <li className="flex items-center gap-2">
                        <span className="text-cyan-400">{">"}</span> Уникальная
                        генерация мира
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-cyan-400">{">"}</span> Система
                        кланов и земель
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-cyan-400">{">"}</span> Магические
                        посохи и артефакты
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="w-full flex flex-col sm:flex-row gap-4 pt-4 border-t-4 border-black/20">
                  <button className="flex-1 px-6 py-4 bg-green-600 hover:bg-green-500 text-white border-4 border-black font-bold text-xl uppercase tracking-wider shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2">
                    <Play size={24} fill="currentColor" />
                    ИГРАТЬ
                  </button>
                  <button className="px-6 py-4 bg-slate-700 hover:bg-slate-600 text-white border-4 border-black font-bold text-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all">
                    ПОДРОБНЕЕ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
