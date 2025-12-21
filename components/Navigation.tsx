
import React from 'react';
import { Home, Wallet, Scan, Clock, User } from 'lucide-react';
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
    { icon: Scan, view: 'scan' as AppView, label: 'Scan Pay' },
    { icon: Clock, view: 'history' as AppView, label: 'History' },
    { icon: User, view: 'profile' as AppView, label: 'Profile' },
  ];

  if (isDesktop) {
    return (
      <nav className="flex flex-col w-full px-6 py-12 h-full">
        {/* Logo */}
        <div className="mb-14 px-2">
          <span className="text-2xl font-bold tracking-tight text-white flex items-center gap-0.5">
            Crypt<span className="text-[#D4A017]">Save</span>
          </span>
        </div>
        
        {/* Menu Items */}
        <div className="space-y-3 flex-1">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = currentView === item.view;
            
            return (
              <button
                key={idx}
                onClick={() => setView(item.view)}
                className={`w-full flex items-center gap-4 px-5 py-[14px] rounded-[20px] transition-all duration-300 group ${
                  isActive 
                  ? 'bg-[#D4A017] text-black shadow-[0_8px_16px_rgba(212,160,23,0.2)]' 
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={20} className={`${isActive ? 'stroke-[2.5px]' : 'stroke-[1.5px]'}`} />
                <span className="font-bold text-[15px] tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Desktop Profile Card (Bottom) */}
        <div className="mt-auto">
          <div className="bg-[#1C1C1E] p-4 rounded-[28px] flex items-center gap-3 border border-white/5 hover:bg-[#252528] transition-all cursor-pointer">
             <div className="w-11 h-11 rounded-full overflow-hidden border border-white/10 shrink-0">
                <img src="https://picsum.photos/seed/abubakar/100/100" alt="Avatar" className="w-full h-full object-cover" />
             </div>
             <div className="flex flex-col min-w-0">
               <span className="text-white text-sm font-bold truncate">Abubakar Ahmed</span>
               <span className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mt-0.5">Premium Plan</span>
             </div>
          </div>
        </div>
      </nav>
    );
  }

  // Mobile Navigation remains "Perfect"
  return (
    <div className="fixed bottom-0 left-0 w-full bg-black/90 backdrop-blur-2xl border-t border-white/5 flex justify-around items-center h-[90px] px-6 z-50">
      {navItems.map((item, idx) => {
        const Icon = item.icon;
        const isActive = currentView === item.view;

        if (item.label === 'Scan Pay') {
          return (
            <button
              key={idx}
              onClick={() => setView(item.view)}
              className="bg-[#D4A017] p-[18px] rounded-full -translate-y-6 shadow-[0_10px_20px_rgba(212,160,23,0.4)] active:scale-90 transition-all border-4 border-black"
            >
              <Icon className="text-black w-6 h-6 stroke-[3px]" />
            </button>
          );
        }

        return (
          <button
            key={idx}
            onClick={() => setView(item.view)}
            className={`flex flex-col items-center transition-all duration-300 relative ${isActive ? 'text-[#D4A017]' : 'text-gray-600'}`}
          >
            <Icon size={24} className={isActive ? 'stroke-[2.5px]' : 'stroke-[1.5px]'} />
            {isActive && (
              <div className="absolute -bottom-3 w-1.5 h-1.5 rounded-full bg-[#D4A017] shadow-[0_0_8px_rgba(212,160,23,0.8)]" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Navigation;
