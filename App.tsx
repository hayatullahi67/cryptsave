
import React, { useState } from 'react';
import { AppView } from './types';
import Layout from './components/Layout';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import Wallet from './components/Wallet';
import Profile from './components/Profile';
import Modals from './components/Modals';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('onboarding');

  const renderView = () => {
    switch (currentView) {
      case 'onboarding':
        return <Onboarding onStart={() => setCurrentView('home')} />;
      case 'home':
        return <Dashboard />;
      case 'wallet':
        return <Wallet />;
      case 'profile':
        return <Profile onLogout={() => setCurrentView('onboarding')} />;
      case 'success':
      case 'declined':
        return <Modals type={currentView} onBack={() => setCurrentView('home')} />;
      default:
        return <Dashboard />;
    }
  };

  // Special full-page views (Onboarding & Modals)
  if (currentView === 'onboarding' || currentView === 'success' || currentView === 'declined') {
    return (
      <div className="min-h-screen w-full bg-[#000000] flex justify-center items-center overflow-x-hidden p-4 lg:p-0">
        <div className="w-full h-full lg:max-w-screen-xl lg:h-[92vh] lg:rounded-[40px] relative overflow-y-auto no-scrollbar shadow-2xl lg:border lg:border-white/5 bg-black">
          {renderView()}
        </div>
      </div>
    );
  }

  return (
    <Layout currentView={currentView} setView={setCurrentView}>
      {renderView()}
    </Layout>
  );
};

export default App;
