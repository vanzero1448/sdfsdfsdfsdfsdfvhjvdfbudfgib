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
  { label: 'Форум', page: Page.COMMUNITY },
];

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0f172a] border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer hover:opacity-90 transition-opacity" onClick={() => onNavigate(Page.HOME)}>
             <img 
               src="public/img/ice.png" 
               alt="IceTale" 
               className="h-16 w-auto object-contain"
               style={{ imageRendering: 'pixelated' }}
             />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => onNavigate(item.page)}
                  className={`px-4 py-2 text-xl transition-all duration-100 border-2 ${
                    currentPage === item.page
                      ? 'bg-cyan-600 text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]'
                      : 'border-transparent text-gray-300 hover:text-white hover:bg-white/5 hover:border-white/20'
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
              className="text-white p-2 border-2 border-black bg-slate-800 hover:bg-slate-700"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#0f172a] border-b-4 border-black">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-3 py-4 text-xl border-b-2 border-slate-800 ${
                  currentPage === item.page
                    ? 'text-cyan-400 bg-slate-900'
                    : 'text-gray-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {'>'} {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};