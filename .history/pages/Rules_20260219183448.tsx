import React from "react";

export const Rules: React.FC = () => {
  return (
    <div className="min-h-screen py-24 px-4 bg-slate-950 flex items-center justify-center">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-16">
          <div className="mx-auto w-24 h-24 border-4 border-cyan-400 rounded-full flex items-center justify-center mb-8">
            <span className="text-6xl">📜</span>
          </div>
          <h1
            className="text-6xl text-white neon-cyan mb-4"
            style={{ fontFamily: '"Press Start 2P"' }}
          >
            ПРАВИЛА
          </h1>
          <p className="text-cyan-300 text-2xl">
            Кодекс чести северного братства
          </p>
        </div>

        <div className="pixel-box bg-slate-900 p-16 text-center">
          <div className="text-8xl mb-8">❄️</div>
          <h2
            className="text-4xl text-cyan-400 mb-8 tracking-widest"
            style={{ fontFamily: '"Press Start 2P"' }}
          >
            РАЗДЕЛ В РАЗРАБОТКЕ
          </h2>
          <p className="text-slate-300 text-2xl leading-relaxed font-mono">
            Мы пишем самый красивый и честный свод правил в истории Hytale.
            <br />
            <br />
            Следи за обновлениями в Telegram — скоро будет готово!
          </p>
        </div>
      </div>
    </div>
  );
};
