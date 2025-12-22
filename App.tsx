
import React, { useState } from 'react';
import { AppView, Transaction } from './types';
import Layout from './components/Layout';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import Wallet from './components/Wallet';
import Profile from './components/Profile';
import History from './components/History';
import Modals from './components/Modals';
import TransactionForm from './components/TransactionForm';
import CreateGoalForm from './components/CreateGoalForm';
import SearchOverlay from './components/SearchOverlay';
import NotificationDrawer from './components/NotificationDrawer';
import ScanPayment from './components/ScanPayment';
import ReceiptView from './components/ReceiptView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('onboarding');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const handleTransactionSelect = (tx: Transaction) => {
    setSelectedTransaction(tx);
    setCurrentView('view-receipt');
  };

  const renderView = () => {
    switch (currentView) {
      case 'onboarding':
        return <Onboarding onStart={() => setCurrentView('home')} />;
      case 'home':
        return (
          <Dashboard 
            onSeeAll={() => setCurrentView('history')} 
            onAction={(type) => setCurrentView(type)}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenNotifications={() => setIsNotifOpen(true)}
            onSelectTransaction={handleTransactionSelect}
          />
        );
      case 'wallet':
        return <Wallet onAction={(type) => setCurrentView(type)} onSelectTransaction={handleTransactionSelect} />;
      case 'history':
        return <History onBack={() => setCurrentView('home')} onSelectTransaction={handleTransactionSelect} />;
      case 'scan':
        return (
          <ScanPayment 
            onBack={() => setCurrentView('home')} 
            onComplete={() => setCurrentView('success')} 
          />
        );
      case 'profile':
        return <Profile onLogout={() => setCurrentView('onboarding')} />;
      case 'save-funds':
        return (
          <TransactionForm 
            type="save" 
            onCancel={() => setCurrentView('wallet')} 
            onComplete={(success) => setCurrentView(success ? 'success' : 'declined')} 
          />
        );
      case 'withdraw-funds':
        return (
          <TransactionForm 
            type="withdraw" 
            onCancel={() => setCurrentView('wallet')} 
            onComplete={(success) => setCurrentView(success ? 'success' : 'declined')} 
          />
        );
      case 'create-goal':
        return (
          <CreateGoalForm 
            onCancel={() => setCurrentView('wallet')}
            onComplete={() => setCurrentView('success')}
          />
        );
      case 'view-receipt':
        return selectedTransaction ? (
          <ReceiptView 
            transaction={selectedTransaction} 
            onBack={() => setCurrentView('history')} 
          />
        ) : <Dashboard onSeeAll={() => setCurrentView('history')} onAction={(type) => setCurrentView(type)} onSelectTransaction={handleTransactionSelect} />;
      case 'success':
      case 'declined':
        return <Modals type={currentView} onBack={() => setCurrentView('wallet')} />;
      default:
        return <Dashboard 
          onSeeAll={() => setCurrentView('history')} 
          onAction={(type) => setCurrentView(type)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenNotifications={() => setIsNotifOpen(true)}
          onSelectTransaction={handleTransactionSelect}
        />;
    }
  };

  const immersiveViews: AppView[] = ['onboarding', 'success', 'declined', 'save-funds', 'withdraw-funds', 'create-goal', 'scan', 'view-receipt'];
  
  const content = immersiveViews.includes(currentView) ? (
    <div className="min-h-screen w-full bg-[#000000] flex justify-center items-center overflow-x-hidden p-0">
      <div className="w-full h-screen lg:max-w-screen-xl lg:h-[92vh] lg:rounded-[40px] relative overflow-y-auto no-scrollbar shadow-2xl lg:border lg:border-white/5 bg-black">
        {renderView()}
      </div>
    </div>
  ) : (
    <Layout currentView={currentView} setView={setCurrentView}>
      {renderView()}
    </Layout>
  );

  return (
    <>
      {content}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} onSelectTransaction={handleTransactionSelect} />
      <NotificationDrawer isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </>
  );
};

export default App;
