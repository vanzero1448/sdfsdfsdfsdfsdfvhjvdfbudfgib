import React from "react";
import { Page } from "../types";
import { ExternalLink, Play } from "lucide-react";

interface HomeProps {
  onNavigate: (page: Page) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="w-full overflow-hidden">
      {/* HERO - EPIC ICE */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <video
            src="/img/fight.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60 brightness-75"
            style={{ imageRendering: "pixelated" }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0b162d_30%,transparent_80%)]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/70 to-slate-950"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-12">
          <div className="mb-8 inline-block bg-slate-900/80 border-4 border-cyan-400 px-12 py-8 backdrop-blur-md shadow-2xl">
            <h1
              className="text-[5.5rem] md:text-[7rem] lg:text-[8.5rem] leading-none font-black tracking-[-6px] text-white neon-cyan"
              style={{ fontFamily: '"Press Start 2P"' }}
            >
              ICE<span className="text-cyan-400">TALE</span>
            </h1>
            <p className="text-3xl md:text-4xl text-cyan-300 tracking-[8px] mt-2">
              Hytale • SURVIVAL
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-14 bg-black/60 border border-cyan-400/30 p-8 backdrop-blur">
            <p className="font-mono text-2xl leading-relaxed text-slate-200">
              ❄️ Мир вечной зимы
              <br />
              🏰 Построй крепость из льда
              <br />
              ⚔️ Стань легендой Севера
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => onNavigate(Page.DONATE)}
              className="pixel-btn text-3xl px-16 py-7 shadow-[8px_8px_0px_#000] hover:shadow-[12px_12px_0px_#000] active:translate-y-2 transition-all"
            >
              НАЧАТЬ ИГРУ
            </button>
            <a
              href="https://t.me/icetaletg"
              target="_blank"
              rel="noreferrer"
              className="pixel-btn text-3xl px-16 py-7 bg-slate-800 hover:bg-slate-700 shadow-[8px_8px_0px_#000] hover:shadow-[12px_12px_0px_#000] active:translate-y-2 transition-all flex items-center gap-4"
            >
              TELEGRAM <ExternalLink size={32} />
            </a>
          </div>
        </div>

        {/* Subtle snow overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-20 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='8' cy='8' r='2' fill='%23ffffff'/%3E%3Ccircle cx='32' cy='18' r='1.5' fill='%23ffffff'/%3E%3Ccircle cx='22' cy='32' r='2.5' fill='%23ffffff'/%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px",
          }}
        />
      </section>

      {/* SERVERS SECTION - ULTRA COOL */}
      <section className="py-28 px-4 bg-slate-900 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2
              className="text-6xl text-white neon-cyan tracking-widest mb-6"
              style={{ fontFamily: '"Press Start 2P"' }}
            >
              ВЫБЕРИ СВОЙ ЛЁД
            </h2>
            <div className="h-1 w-40 bg-cyan-400 mx-auto"></div>
          </div>

          <div className="max-w-6xl mx-auto pixel-box bg-slate-950 overflow-hidden border-cyan-400 group">
            <div className="flex flex-col lg:flex-row">
              {/* Left visual */}
              <div className="lg:w-5/12 bg-black relative overflow-hidden flex items-center justify-center py-20 lg:py-0">
                <div className="absolute inset-0 bg-[url('/img/survival.png')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity" />
                <img
                  src="/img/survival.jpg"
                  alt="Survival"
                  className="relative z-10 max-h-[420px] object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-700"
                  style={{ imageRendering: "pixelated" }}
                />
              </div>

              {/* Content */}
              <div className="flex-1 p-12 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-slate-900 to-slate-950">
                <h3
                  className="text-5xl text-cyan-400 mb-8 tracking-widest"
                  style={{ fontFamily: '"Press Start 2P"' }}
                >
                  SURVIVAL ONE
                </h3>

                <div className="space-y-6 text-xl text-slate-300">
                  <p>Самый атмосферный выживач в мире Hytale.</p>
                  <ul className="space-y-4 pl-2">
                    <li className="flex gap-3">
                      <span className="text-cyan-400">❄️</span> Уникальная
                      зимняя генерация
                    </li>
                    <li className="flex gap-3">
                      <span className="text-cyan-400">🏰</span> Кланы и огромные
                      земли
                    </li>
                    <li className="flex gap-3">
                      <span className="text-cyan-400">✨</span> Магия льда и
                      древние артефакты
                    </li>
                  </ul>
                </div>

                <div className="mt-12 flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 pixel-btn py-6 text-2xl flex items-center justify-center gap-3">
                    <Play size={32} fill="currentColor" /> ИГРАТЬ СЕЙЧАС
                  </button>
                  <button className="flex-1 border-4 border-white/40 py-6 text-2xl hover:bg-white/10 transition-colors">
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
