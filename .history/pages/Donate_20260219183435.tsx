import React from "react";
import { Rank } from "../types";
import { Check, Star, Zap, Crown } from "lucide-react";

const ranks: Rank[] = [
  {
    id: "vip",
    name: "VIP",
    price: 199,
    color: "from-emerald-500 to-teal-500",
    features: [
      "Префикс [VIP]",
      "Резервный слот",
      "Кит: Старт",
      "Полет в лобби",
      "5 регионов",
    ],
  },
  {
    id: "premium",
    name: "PREMIUM",
    price: 499,
    color: "from-violet-500 to-fuchsia-500",
    popular: true,
    features: [
      "Всё от VIP",
      "Префикс [Premium]",
      "Сохранение шмота",
      "/feed и /heal",
      "10 регионов",
    ],
  },
  {
    id: "legend",
    name: "LEGEND",
    price: 999,
    color: "from-amber-500 to-orange-500",
    features: [
      "Всё от Premium",
      "Цветной ник",
      "Полёт по миру",
      "Свои варпы",
      "∞ регионов",
    ],
  },
];

export const Donate: React.FC = () => {
  return (
    <div className="py-20 px-4 min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1
            className="text-6xl md:text-7xl text-white mb-6 neon-cyan tracking-[-3px]"
            style={{ fontFamily: '"Press Start 2P"' }}
          >
            МАГАЗИН
          </h1>
          <p className="text-3xl text-slate-400 max-w-2xl mx-auto">
            Купи привилегию — поддержи вечную мерзлоту
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {ranks.map((rank, index) => (
            <div
              key={rank.id}
              className={`relative group ${rank.popular ? "md:scale-110 md:-mt-6 z-10" : ""}`}
            >
              {rank.popular && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-yellow-400 text-slate-950 border-4 border-black px-8 py-2 font-black text-xl tracking-widest shadow-xl animate-bounce">
                  ЛЕГЕНДАРНЫЙ ХИТ
                </div>
              )}

              <div
                className={`pixel-box h-full flex flex-col overflow-hidden border-cyan-400/50 group-hover:border-cyan-400 transition-all duration-300`}
              >
                {/* Header Gradient */}
                <div
                  className={`bg-gradient-to-br ${rank.color} p-8 text-center relative`}
                >
                  <div className="absolute top-6 right-6 opacity-30">
                    {rank.id === "vip" && <Star size={72} />}
                    {rank.id === "premium" && <Zap size={72} />}
                    {rank.id === "legend" && <Crown size={72} />}
                  </div>
                  <h3
                    className="text-4xl text-white tracking-widest mb-3"
                    style={{ fontFamily: '"Press Start 2P"' }}
                  >
                    {rank.name}
                  </h3>
                  <div className="inline-block bg-black/40 px-8 py-2 border-2 border-white/30">
                    <span className="text-5xl font-black text-white drop-shadow-md">
                      {rank.price}₽
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="p-8 bg-slate-900 flex-1 flex flex-col">
                  <ul className="space-y-5 mb-12 text-lg text-slate-200">
                    {rank.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <div className="mt-1 w-6 h-6 bg-cyan-400 border-2 border-black flex items-center justify-center flex-shrink-0">
                          <Check
                            size={14}
                            className="text-slate-950"
                            strokeWidth={4}
                          />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="pixel-btn w-full py-6 text-2xl mt-auto">
                    КУПИТЬ ЗА {rank.price}₽
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
