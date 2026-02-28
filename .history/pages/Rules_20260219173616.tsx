import React from 'react';

export const Rules: React.FC = () => {
  return (
    <div className="py-24 px-4 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl md:text-6xl text-white mb-12 text-shadow-pixel">ПРАВИЛА СЕРВЕРА</h1>
        
        <div className="pixel-box bg-slate-800 p-12 border-white/10">
           <div className="text-6xl mb-6">📜</div>
           <h2 className="text-2xl text-cyan-400 mb-4" style={{ fontFamily: '"Press Start 2P"' }}>РАЗДЕЛ В РАЗРАБОТКЕ</h2>
           <p className="text-gray-300 text-xl font-mono leading-relaxed">
             Кодекс чести IceTale пишется прямо сейчас. <br/>
             Следите за обновлениями в нашем Telegram канале.
           </p>
        </div>
      </div>
    </div>
  );
};