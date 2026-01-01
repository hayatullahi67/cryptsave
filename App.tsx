import React, { useState } from 'react';
import { AppView, Transaction } from './types';
import Layout from './components/Layout';
import Onboarding from './components/Onboarding';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Wallet from './components/Wallet';
import Profile from './components/Profile';
import Settings from './components/Settings';
import History from './components/History';
import Modals from './components/Modals';
import TransactionForm from './components/TransactionForm';
import CreateGoalForm from './components/CreateGoalForm';
import SearchOverlay from './components/SearchOverlay';
import NotificationDrawer from './components/NotificationDrawer';
import ScanPayment from './components/ScanPayment';
import ReceiptView from './components/ReceiptView';
import AirtimeDataForm from './components/AirtimeDataForm';
import UtilityBillForm from './components/UtilityBillForm';
import TransferForm from './components/TransferForm';
import Exchange from './components/Exchange';
import P2PChat from './components/P2PChat';
import SecurityModal from './components/SecurityModal';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('onboarding');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  
  // Security State - Dual Layer (PIN + Biometrics)
  const [userPin, setUserPin] = useState('1234');
  const [isFaceIdEnrolled, setIsFaceIdEnrolled] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [securityMode, setSecurityMode] = useState<'verify' | 'enroll'>('verify');
  const [onSecuritySuccess, setOnSecuritySuccess] = useState<(() => void) | null>(null);

  const handleTransactionSelect = (tx: Transaction) => {
    setSelectedTransaction(tx);
    setCurrentView('view-receipt');
  };

  const triggerSecurityCheck = (onSuccess: () => void) => {
    setSecurityMode('verify');
    setOnSecuritySuccess(() => onSuccess);
    setIsSecurityModalOpen(true);
  };

  const startFaceIdEnrollment = () => {
    setSecurityMode('enroll');
    setOnSecuritySuccess(() => {
      setIsFaceIdEnrolled(true);
      setIsSecurityModalOpen(false);
    });
    setIsSecurityModalOpen(true);
  };

  const handleQuickFaceLogin = () => {
    // Check if Face ID is enrolled before attempting to verify for login
    setSecurityMode('verify');
    setOnSecuritySuccess(() => {
      setCurrentView('home');
    });
    setIsSecurityModalOpen(true);
  };

  const renderView = () => {
    switch (currentView) {
      case 'onboarding':
        return <Onboarding onStart={() => setCurrentView('login')} />;
      case 'login':
        return (
          <Login 
            onLogin={() => setCurrentView('home')} 
            onGoToSignup={() => setCurrentView('signup')} 
            onQuickFaceLogin={handleQuickFaceLogin}
            isFaceIdEnrolled={isFaceIdEnrolled}
          />
        );
      case 'signup':
        return <Signup onSignup={() => setCurrentView('home')} onGoToLogin={() => setCurrentView('login')} />;
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
      case 'exchange':
        return <Exchange onStartTrade={(merchant, mode, asset) => {
          setCurrentView('p2p-chat');
        }} />;
      case 'p2p-chat':
        return <P2PChat 
            merchant={null}
            tradeMode="buy"
            asset="USDT"
            onBack={() => setCurrentView('exchange')}
            onComplete={() => triggerSecurityCheck(() => setCurrentView('success'))}
          />;
      case 'history':
        return <History onBack={() => setCurrentView('home')} onSelectTransaction={handleTransactionSelect} />;
      case 'scan':
        return <ScanPayment onBack={() => setCurrentView('home')} onComplete={() => triggerSecurityCheck(() => setCurrentView('success'))} />;
      case 'profile':
        return <Profile onLogout={() => setCurrentView('onboarding')} onGoToSettings={() => setCurrentView('settings')} />;
      case 'settings':
        return (
          <Settings 
            onBack={() => setCurrentView('profile')} 
            faceIdEnabled={isFaceIdEnrolled}
            onStartEnrollment={startFaceIdEnrollment}
            onDisableFaceId={() => setIsFaceIdEnrolled(false)}
            userPin={userPin}
            setUserPin={setUserPin}
          />
        );
      case 'save-funds':
      case 'withdraw-funds':
        return <TransactionForm 
            type={currentView === 'save-funds' ? 'save' : 'withdraw'} 
            onCancel={() => setCurrentView('wallet')} 
            onComplete={(success) => success ? triggerSecurityCheck(() => setCurrentView('success')) : setCurrentView('declined')} 
          />;
      case 'transfer-funds':
        return <TransferForm onCancel={() => setCurrentView('home')} onComplete={() => triggerSecurityCheck(() => setCurrentView('success'))} />;
      case 'buy-airtime':
      case 'buy-data':
        return <AirtimeDataForm type={currentView === 'buy-airtime' ? 'airtime' : 'data'} onCancel={() => setCurrentView('home')} onComplete={() => triggerSecurityCheck(() => setCurrentView('success'))} />;
      case 'buy-electricity':
      case 'buy-tv':
        return <UtilityBillForm type={currentView === 'buy-electricity' ? 'electricity' : 'tv'} onCancel={() => setCurrentView('home')} onComplete={() => triggerSecurityCheck(() => setCurrentView('success'))} />;
      case 'create-goal':
        return <CreateGoalForm onCancel={() => setCurrentView('wallet')} onComplete={() => setCurrentView('success')} />;
      case 'view-receipt':
        return selectedTransaction ? <ReceiptView transaction={selectedTransaction} onBack={() => setCurrentView('history')} /> : <Dashboard onSeeAll={() => setCurrentView('history')} onAction={(type) => setCurrentView(type)} />;
      case 'success':
      case 'declined':
        return <Modals type={currentView} onBack={() => setCurrentView('home')} />;
      default:
        return <Onboarding onStart={() => setCurrentView('login')} />;
    }
  };

  const immersiveViews: AppView[] = ['onboarding', 'login', 'signup', 'success', 'declined', 'save-funds', 'withdraw-funds', 'create-goal', 'scan', 'view-receipt', 'buy-airtime', 'buy-data', 'buy-electricity', 'buy-tv', 'transfer-funds', 'p2p-chat'];
  
  return (
    <>
      {immersiveViews.includes(currentView) ? (
        <div className="min-h-screen w-full bg-[#000000] flex justify-center items-center overflow-x-hidden">
          <div className="w-full h-screen lg:max-w-screen-xl lg:h-[92vh] lg:rounded-[40px] relative overflow-y-auto no-scrollbar shadow-2xl lg:border lg:border-white/5 bg-black">
            {renderView()}
          </div>
        </div>
      ) : (
        <Layout currentView={currentView} setView={setCurrentView}>{renderView()}</Layout>
      )}
      
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} onSelectTransaction={handleTransactionSelect} />
      <NotificationDrawer isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
      
      <SecurityModal 
        isOpen={isSecurityModalOpen} 
        mode={securityMode}
        onClose={() => setIsSecurityModalOpen(false)} 
        onSuccess={() => {
          if (onSecuritySuccess) onSecuritySuccess();
          setIsSecurityModalOpen(false);
        }}
        isFaceIdEnabled={isFaceIdEnrolled}
        correctPin={userPin}
      />
    </>
  );
};

export default App;