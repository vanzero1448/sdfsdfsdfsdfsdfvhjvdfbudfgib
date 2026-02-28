import React from 'react';
import { ExternalLink, Youtube, Send } from 'lucide-react';

export const Community: React.FC = () => {
  return (
    <div className="py-12 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl text-white mb-6 text-shadow-pixel">СООБЩЕСТВО</h1>
          <div className="bg-[#2a2d42] border-4 border-black p-4 inline-block transform -rotate-1 shadow-[8px_8px_0px_rgba(0,0,0,0.5)]">
            <p className="text-2xl text-cyan-400">
              Следи за новостями!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Telegram Big Card */}
          <div className="col-span-1 md:col-span-2 pixel-box bg-[#229ED9] group hover:-translate-y-1 transition-transform">
            <div className="flex flex-col md:flex-row">
               <div className="md:w-1/3 bg-black/10 flex items-center justify-center p-8 border-b-4 md:border-b-0 md:border-r-4 border-black">
                 <Send size={80} className="text-white drop-shadow-md group-hover:scale-110 transition-transform" />
               </div>
               <div className="p-8 md:p-12 flex-1 flex flex-col justify-center items-start">
                 <h2 className="text-3xl text-white mb-4" style={{ fontFamily: '"Press Start 2P"' }}>TELEGRAM</h2>
                 <p className="text-white/90 text-2xl mb-8">
                   Главный канал сервера. Анонсы, общение с администрацией и новости разработки.
                 </p>
                 <a href="https://t.me/icetaletg" target="_blank" rel="noreferrer" className="bg-white text-[#229ED9] border-4 border-black px-8 py-4 text-2xl font-bold hover:bg-gray-100 shadow-[4px_4px_0px_rgba(0,0,0,0.5)] active:translate-y-1 active:shadow-[2px_2px_0px_rgba(0,0,0,0.5)] transition-all inline-flex items-center gap-2">
                   ПЕРЕЙТИ В КАНАЛ <ExternalLink size={20} />
                 </a>
               </div>
            </div>
          </div>

          {/* YouTube Card */}
          <div className="col-span-1 md:col-span-2 pixel-box bg-[#FF0000] p-0 flex flex-col md:flex-row group hover:-translate-y-1 transition-transform">
            <div className="md:w-1/3 bg-black/10 flex items-center justify-center p-8 border-b-4 md:border-b-0 md:border-r-4 border-black order-1 md:order-2">
                 <Youtube size={80} className="text-white drop-shadow-md group-hover:rotate-6 transition-transform" />
            </div>
            <div className="p-8 md:p-12 flex-1 flex flex-col justify-center items-start order-2 md:order-1">
              <h3 className="text-2xl text-white font-bold mb-4" style={{ fontFamily: '"Press Start 2P"' }}>YOUTUBE</h3>
              <p className="text-white/80 text-xl mb-8">
                Гайды по модам, обзоры обновлений и летсплеи от администрации.
              </p>
              <button className="w-full md:w-auto bg-black/20 hover:bg-black/30 text-white border-4 border-white/50 px-6 py-3 text-xl font-bold shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">
                СМОТРЕТЬ ВИДЕО
              </button>
            </div>
          </div>

        </div>

        {/* Contacts */}
        <div className="mt-16 bg-slate-800 border-4 border-black p-10 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-3xl text-white mb-8" style={{ fontFamily: '"Press Start 2P"' }}>СВЯЗЬ С НАМИ</h3>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="pixel-box bg-slate-900 p-6 w-full md:w-auto">
                 <p className="text-gray-400 text-sm mb-2 uppercase tracking-wider">Почта поддержки</p>
                 <p className="text-cyan-400 text-xl font-mono select-all">support@icetale.net</p>
              </div>

              <div className="hidden md:block w-px h-16 bg-gray-600"></div>

              <a href="https://t.me/IceTaleSupport" target="_blank" rel="noreferrer" className="w-full md:w-auto pixel-btn pixel-btn-secondary px-8 py-4 flex items-center justify-center gap-3 shadow-[6px_6px_0px_rgba(0,0,0,0.5)]">
                <Send size={24} />
                НАПИСАТЬ В TG
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};