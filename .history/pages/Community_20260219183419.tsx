import React from "react";
import { ExternalLink, Youtube, Send } from "lucide-react";

export const Community: React.FC = () => {
  return (
    <div className="py-20 px-4 min-h-screen bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-3 h-px bg-cyan-400"></div>
            <span className="text-cyan-400 text-sm tracking-[6px] font-mono">
              CONNECT WITH THE NORTH
            </span>
            <div className="w-3 h-px bg-cyan-400"></div>
          </div>
          <h1
            className="text-6xl md:text-7xl text-white mb-4 neon-cyan tracking-tighter"
            style={{ fontFamily: '"Press Start 2P"' }}
          >
            СООБЩЕСТВО
          </h1>
          <p className="text-2xl text-slate-400 max-w-md mx-auto">
            Присоединяйся к ледяному братству
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Telegram - BIG HERO CARD */}
          <div className="lg:col-span-2 group relative overflow-hidden pixel-box bg-gradient-to-br from-cyan-500 to-sky-500 border-cyan-300">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-2/5 p-12 flex justify-center bg-black/20">
                <Send
                  size={140}
                  className="text-white drop-shadow-2xl group-hover:rotate-12 transition-transform duration-500"
                />
              </div>
              <div className="p-12 lg:p-16 flex-1">
                <h2
                  className="text-5xl text-white mb-6 tracking-widest"
                  style={{ fontFamily: '"Press Start 2P"' }}
                >
                  TELEGRAM
                </h2>
                <p className="text-white/90 text-2xl leading-relaxed mb-10">
                  Главный пульс сервера. Анонсы, чат с администрацией, розыгрыши
                  и прямые трансляции разработки.
                </p>
                <a
                  href="https://t.me/icetaletg"
                  target="_blank"
                  rel="noreferrer"
                  className="pixel-btn text-2xl px-12 py-5 inline-flex items-center gap-4 group-hover:scale-105 transition-transform"
                >
                  ВОЙТИ В КАНАЛ <ExternalLink size={28} />
                </a>
              </div>
            </div>
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          </div>

          {/* YouTube Card */}
          <div className="pixel-box bg-gradient-to-br from-red-600 to-rose-600 group overflow-hidden border-red-400">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-2/5 p-12 flex items-center justify-center bg-black/30 order-2 lg:order-1">
                <Youtube
                  size={120}
                  className="text-white drop-shadow-2xl group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-12 flex-1 order-1 lg:order-2">
                <h3
                  className="text-4xl text-white mb-6 tracking-widest"
                  style={{ fontFamily: '"Press Start 2P"' }}
                >
                  YOUTUBE
                </h3>
                <p className="text-white/80 text-xl mb-10">
                  Гайды, обзоры обновлений, летсплеи и секреты выживания в мире
                  вечной мерзлоты.
                </p>
                <button className="pixel-btn w-full lg:w-auto text-xl px-10 py-4 bg-white/10 hover:bg-white/20 text-white border-white/40">
                  СМОТРЕТЬ ВИДЕО
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Support Bar */}
        <div className="mt-20 bg-slate-900 border-4 border-cyan-400 p-10 text-center relative overflow-hidden pixel-box">
          <div className="relative z-10">
            <h3
              className="text-4xl text-white mb-8 neon-cyan"
              style={{ fontFamily: '"Press Start 2P"' }}
            >
              НУЖНА ПОМОЩЬ?
            </h3>

            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
              <div className="pixel-box bg-slate-950 p-8 w-full md:w-auto">
                <p className="text-slate-400 text-sm mb-2 tracking-widest">
                  ПОЧТА ПОДДЕРЖКИ
                </p>
                <p className="text-cyan-300 text-2xl font-mono select-all">
                  support@icetale.net
                </p>
              </div>

              <a
                href="https://t.me/IceTaleSupport"
                target="_blank"
                rel="noreferrer"
                className="pixel-btn text-2xl px-12 py-5 flex items-center gap-4 w-full md:w-auto"
              >
                <Send size={28} /> НАПИСАТЬ В TG
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
