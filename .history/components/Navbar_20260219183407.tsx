import React, { useState } from 'react';
import { Page, NavItem } from '../types';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navItems: NavItem[] = [
  { label: 'Главная', page: Page.HOME },
  { label: 'Магазин', page: Page.DONATE },
  { label: 'Правила', page: Page.RULES },
  { label: 'Сообщество', page: Page.COMMUNITY },
];

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/95 backdrop-blur-md border-b-4 border-cyan-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo - ICE GLOW */}
          <div 
            className="flex-shrink-0 flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform" 
            onClick={() => onNavigate(Page.HOME)}
          >
             <img 
               src="/img/ice.png" 
               alt="IceTale" 
               className="h-14 w-auto object-contain drop-shadow-[0_0_20px_#67e8f9]"
               style={{ imageRendering: 'pixelated' }}
             />
             <div className="hidden sm:block">
               <span className="text-3xl font-black tracking-[-2px] text-white neon-cyan" style={{ fontFamily: '"Press Start 2P"' }}>
                 ICE<span className="text-cyan-400">TALE</span>
               </span>
               <p className="text-[10px] text-cyan-400 -mt-1 tracking-[4px]">Hytale SERVER</p>
             </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => onNavigate(item.page)}
                  className={`px-6 py-2.5 text-lg font-medium transition-all duration-200 border-2 ${
                    currentPage === item.page
                      ? 'bg-cyan-400 text-slate-950 border-cyan-400 shadow-[4px_4px_0px_#000] translate-x-[-2px] translate-y-[-2px]'
                      : 'border-transparent text-slate-300 hover:text-white hover:border-cyan-400/30 hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-3 border-2 border-cyan-400 bg-slate-900 hover:bg-cyan-400 hover:text-slate-950 transition-all"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Frosted */}
      {isOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-lg border-b-4 border-cyan-400">
          <div className="px-4 py-6 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-6 py-5 text-2xl border-l-4 transition-all ${
                  currentPage === item.page
                    ? 'border-cyan-