import React from 'react';
import { Rank } from '../types';
import { Check, Star, Zap, Crown } from 'lucide-react';

const ranks: Rank[] = [
  {
    id: 'vip',
    name: 'VIP',
    price: 199,
    color: 'bg-green-600',
    features: [
      'Префикс [VIP]',
      'Резервный слот',
      'Кит: Старт',
      'Полет в лобби',
      '5 регионов'
    ]
  },
  {
    id: 'premium',
    name: 'PREMIUM',
    price: 499,
    color: 'bg-purple-600',
    popular: true,
    features: [
      'Все права VIP',
      'Префикс [Premium]',
      'Сохранение вещей',
      'Команда /feed',
      'Команда /heal',
      '10 регионов'
    ]
  },
  {
    id: 'legend',
    name: 'LEGEND',
    price: 999,
    color: 'bg-orange-500',
    features: [
      'Все права Premium',
      'Цветной ник',
      'Полет в мире /fly',
      'Свои варпы',
      'Приоритет в тикетах',
      '∞ регионов'
    ]
  }
];

export const Donate: React.FC = () => {
  return (
    <div className="py-12 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl text-white mb-6 text-shadow-pixel">МАГАЗИН СЕРВЕРА</h1>
          <p className="text-2xl text-gray-400 max-w-2xl mx-auto bg-slate-900 border-2 border-slate-700 p-4">
            Покупка привилегий помогает серверу жить и развиваться.
          </p>
        </div>

        {/* Removed items-start to allow stretching */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {ranks.map((rank) => (
            <div key={rank.id} className="relative group w-full h-full">
              {rank.popular && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-yellow-400 text-black border-4 border-black px-4 py-2 font-bold text-lg animate-bounce">
                    ХИТ!
                  </div>
                </div>
              )}
              
              <div className={`pixel-box p-0 h-full flex flex-col ${rank.popular ? 'border-yellow-400 shadow-[12px_12px_0px_rgba(250,204,21,0.2)]' : ''}`}>
                
                {/* Header */}
                <div className={`${rank.color} p-6 border-b-4 border-black text-center relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 p-2 opacity-20">
                    {rank.id === 'vip' && <Star size={64} />}
                    {rank.id === 'premium' && <Zap size={64} />}
                    {rank.id === 'legend' && <Crown size={64} />}
                  </div>
                  <h3 className="text-3xl text-white text-shadow-pixel mb-2" style={{ fontFamily: '"Press Start 2P", cursive' }}>
                    {rank.name}
                  </h3>
                  <div className="inline-block bg-black/30 px-4 py-1 rounded-none border-2 border-black/50">
                    <span className="text-3xl font-bold text-white">{rank.price}₽</span>
                  </div>
                </div>

                {/* Features */}
                <div className="p-8 bg-slate-800 flex-grow flex flex-col justify-between">
                  <ul className="space-y-4 mb-8">
                    {rank.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-300 text-xl">
                        <div className="mt-1">
                          <div className="w-4 h-4 bg-green-500 border-2 border-black flex items-center justify-center">
                            <Check size={10} className="text-black" strokeWidth={4} />
                          </div>
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="w-full pixel-btn py-3 text-xl">
                    КУПИТЬ
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