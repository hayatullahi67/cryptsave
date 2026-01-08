import React from 'react';
import { Home, Wallet, Scan, Clock, User, ArrowLeftRight } from 'lucide-react';
import { AppView } from '../types';

interface NavigationProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  isDesktop?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView, isDesktop = false }) => {
  const navItems = [
    { icon: Home, view: 'home' as AppView, label: 'Dashboard' },
    { icon: Wallet, view: 'wallet' as AppView, label: 'Wallet' },
    { icon: ArrowLeftRight, view: 'conversion' as AppView, label: 'Conversion' },
    { icon: Scan, view: 'scan' as AppView, label: 'Scan Pay' },
    { icon: Clock, view: 'history' as AppView, label: 'History' },
    { icon: User, view: 'profile' as AppView, label: 'Profile' },
  ];

  if (isDesktop) {
    return (
      <nav className="flex flex-col w-full h-full bg-black py-10">
        {/* Brand Logo */}
        <div className="px-10 mb-14">
          <div className="flex items-center">
            <span className="text-[28px] font-bold tracking-tighter text-white">
              Crypt<span className="text-[#D4A017]">Save</span>
            </span>
          </div>
        </div>
        
        {/* Navigation Menu */}
        <div className="flex-1 px-4 space-y-2">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = currentView === item.view;
            
            return (
              <button
                key={idx}
                onClick={() => setView(item.view)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group relative ${
                  isActive 
                  ? 'bg-[#D4A017] text-black shadow-[0_10px_25px_rgba(212,160,23,0.15)]' 
                  : 'text-gray-500 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                <Icon size={20} className={`${isActive ? 'text-black' : 'opacity-60 group-hover:opacity-100'}`} strokeWidth={isActive ? 2.5 : 2} />
                <span className="font-bold text-[15px] tracking-tight text-left">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* User Profile Card at Bottom */}
        <div className="px-4 mt-auto">
          <button className="w-full flex items-center gap-4 bg-[#121214] p-4 rounded-[28px] border border-white/5 hover:border-white/10 transition-all group">
             <div className="w-11 h-11 rounded-[16px] overflow-hidden border border-white/10 shrink-0">
                <img src="https://picsum.photos/seed/abubakar/100/100" alt="Avatar" className="w-full h-full object-cover" />
             </div>
             <div className="flex flex-col items-start min-w-0">
               <span className="text-white text-[14px] font-bold truncate w-full text-left">Abubakar Ahmed</span>
               <span className="text-gray-500 text-[10px] uppercase font-black tracking-widest">PREMIUM PLAN</span>
             </div>
          </button>
        </div>
      </nav>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-2xl border-t border-white/5 flex justify-around items-center h-[90px] px-4 z-50">
      {navItems.map((item, idx) => {
        const Icon = item.icon;
        const isActive = currentView === item.view;

        if (item.label === 'Scan Pay') {
          return (
            <button
              key={idx}
              onClick={() => setView(item.view)}
              className="bg-[#D4A017] w-16 h-16 rounded-full -translate-y-8 flex items-center justify-center shadow-[0_15px_30px_rgba(212,160,23,0.3)] active:scale-90 transition-all border-4 border-black"
            >
              <Icon className="text-black w-7 h-7 stroke-[2.5px]" />
            </button>
          );
        }

        return (
          <button
            key={idx}
            onClick={() => setView(item.view)}
            className={`flex flex-col items-center gap-1 transition-all duration-300 relative ${isActive ? 'text-[#D4A017]' : 'text-gray-500'}`}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            {isActive && (
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4A017] mt-0.5" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Navigation;