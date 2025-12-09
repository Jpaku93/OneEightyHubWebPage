import React from 'react';
import { NavItem } from '../types';

interface NavigationProps {
    activeTab: NavItem;
    setActiveTab: (tab: NavItem) => void;
    isNavVisible: boolean;
    isAtTop: boolean;
    onNavClick: (id: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({
    activeTab,
    setActiveTab,
    isNavVisible,
    isAtTop,
    onNavClick
}) => {
    const navItems = [
        { id: NavItem.HOME, label: 'Home' },
        { id: NavItem.HUB, label: 'Hub' },
        { id: NavItem.ABOUT, label: 'About' },
    ];

    return (
        <nav
            className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out
        ${isNavVisible ? 'translate-y-0' : '-translate-y-full'}
        ${isAtTop ? 'bg-transparent' : 'bg-brand-black/80 backdrop-blur-md border-b border-white/10'}
      `}
        >
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <img
                            src="/images/logo-white.png"
                            alt="180 Hub Logo"
                            className="h-12 w-auto object-contain"
                        />
                    </div>

                    {/* Nav Items */}
                    <div className="flex items-center gap-1 md:gap-2">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveTab(item.id);
                                    onNavClick(item.id);
                                }}
                                className={`
                  px-4 py-2 rounded-sm font-bold text-sm uppercase tracking-wider transition-all duration-300
                  ${activeTab === item.id
                                        ? 'bg-brand-lime text-black shadow-lg'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }
                `}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
