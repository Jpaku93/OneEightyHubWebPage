import React from 'react';
import { NavItem } from '../types';

interface NavigationProps {
  activeTab: NavItem;
  setActiveTab: (tab: NavItem) => void;
  isNavVisible: boolean;
  isAtTop: boolean;
  onNavClick?: (id: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab, isNavVisible, isAtTop, onNavClick }) => {

  const handleClick = (key: string) => {
    setActiveTab(NavItem[key as keyof typeof NavItem]);
    if (onNavClick) {
      onNavClick(key.toLowerCase());
    }
  };

  const getRoutePath = (key: string): string => {
    if (key === 'HOME') return '/';
    if (key === 'HUB') return '/hub';
    if (key === 'ABOUT') return '/about';
    return '/';
  };

  return (
    <>
      {/* Top Nav Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 h-24 flex items-center justify-between px-8 md:px-12 z-50 transition-all duration-300 transform ${isNavVisible ? 'translate-y-0' : '-translate-y-full'
          } ${!isAtTop ? 'bg-brand-black/95 backdrop-blur-md border-b border-white/10 shadow-xl' : 'bg-transparent'
          }`}
      >
        <div className={`absolute inset-0 bg-gradient-to-b from-black/80 to-transparent pointer-events-none transition-opacity duration-500 ${!isAtTop ? 'opacity-0' : 'opacity-100'}`} />

        <a
          href="/"
          onClick={(e) => { e.preventDefault(); handleClick('HOME'); }}
          className="flex flex-col items-center leading-none select-none cursor-pointer relative z-10"
        >
          <span className="font-display font-bold text-2xl tracking-tighter text-white">180</span>
          <span className="font-display font-bold text-2xl tracking-tighter text-brand-purple">HUB</span>
        </a>

        <div className="flex items-center gap-8 relative z-10">
          <div className="hidden md:flex gap-8">
            {Object.keys(NavItem)
              .filter((key) => key !== 'ADMIN')
              .map((key) => (
                <a
                  key={key}
                  href={getRoutePath(key)}
                  onClick={(e) => { e.preventDefault(); handleClick(key); }}
                  className={`text-sm font-bold uppercase tracking-widest transition-all ${activeTab === key ? 'text-brand-orange' : 'text-gray-300 hover:text-white'
                    }`}
                >
                  {key}
                </a>
              ))}
          </div>

          <button className="bg-brand-purple/20 border border-brand-purple text-brand-purple px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-brand-purple hover:text-white transition-all shadow-[0_0_15px_rgba(139,0,255,0.3)] hover:shadow-[0_0_25px_rgba(139,0,255,0.6)]">
            Join The Crew
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navigation;