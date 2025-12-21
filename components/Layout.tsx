
import React from 'react';
import Navigation from './Navigation';
import { AppView } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, setView }) => {
  return (
    <div className="min-h-screen w-full bg-[#000000] flex flex-col lg:flex-row overflow-hidden font-sans text-white">
      {/* Professional Sidebar for Desktop */}
      <aside className="hidden lg:flex w-[280px] h-screen bg-[#050505] border-r border-white/5 sticky top-0 shrink-0 z-50">
        <Navigation currentView={currentView} setView={setView} isDesktop={true} />
      </aside>

      {/* Main Professional Dashboard Area */}
      <main className="flex-1 relative h-screen overflow-y-auto no-scrollbar scroll-smooth bg-black lg:bg-[#000000]">
        <div className="max-w-[1200px] mx-auto w-full min-h-full px-4 sm:px-6 lg:px-12 lg:py-10">
          {children}
        </div>
        
        {/* Mobile-Only Navigation Bar */}
        <div className="lg:hidden">
          <Navigation currentView={currentView} setView={setView} isDesktop={false} />
        </div>
      </main>
    </div>
  );
};

export default Layout;
