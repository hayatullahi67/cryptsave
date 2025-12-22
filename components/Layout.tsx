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
      {/* Sidebar - Desktop Only */}
      <aside className="hidden lg:flex w-[280px] h-screen bg-black border-r border-white/5 sticky top-0 shrink-0 z-50">
        <Navigation currentView={currentView} setView={setView} isDesktop={true} />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative h-screen overflow-y-auto no-scrollbar scroll-smooth bg-black p-0 lg:p-6">
        {/* Sophisticated Background Glow for Desktop */}
        <div className="hidden lg:block absolute top-0 right-0 w-1/2 h-1/2 bg-[#D4A017]/[0.03] blur-[120px] pointer-events-none rounded-full" />
        
        {/* The "Box" Container for Desktop */}
        <div className="relative z-10 w-full min-h-full lg:min-h-0 lg:h-full lg:bg-[#080808] lg:rounded-[48px] lg:border lg:border-white/[0.05] lg:shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-y-auto no-scrollbar">
          <div className="max-w-[1400px] mx-auto w-full px-6 py-6 lg:px-12 lg:py-10">
            {children}
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <Navigation currentView={currentView} setView={setView} isDesktop={false} />
        </div>
      </main>

      <style>{`
        body {
          background-color: #000000;
          color-scheme: dark;
        }
        @media (min-width: 1024px) {
          ::-webkit-scrollbar {
            width: 6px;
          }
          ::-webkit-scrollbar-track {
            background: transparent;
          }
          ::-webkit-scrollbar-thumb {
            background: #1C1C1E;
            border-radius: 10px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #D4A017;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;