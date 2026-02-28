import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0b0f19] border-t-4 border-black py-12 relative z-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-3">
           <div className="w-12 h-12 flex items-center justify-center">
             <img 
               src="/img/ice.png" 
               alt="Logo" 
               className="w-full h-full object-contain"
               style={{ imageRendering: 'pixelated' }}
             />
           </div>
           <span className="text-2xl font-black text-gray-200" style={{ fontFamily: '"Press Start 2P"' }}>
             ICE<span className="text-cyan-600">TALE</span>
           </span>
        </div>
        
        <div className="text-gray-500 text-lg text-center md:text-right font-mono">
          <p>&copy; 2024 IceTale Server.</p>
          <div className="mt-4 flex flex-wrap justify-center md:justify-end gap-4">
            <a href="#" className="hover:text-cyan-400 hover:underline decoration-2 underline-offset-4">Правила</a>
            <span className="text-gray-700">|</span>
            <a href="#" className="hover:text-cyan-400 hover:underline decoration-2 underline-offset-4">Оферта</a>
            <span className="text-gray-700">|</span>
            <a href="#" className="hover:text-cyan-400 hover:underline decoration-2 underline-offset-4">Приватность</a>
          </div>
        </div>
      </div>
    </footer>
  );
};