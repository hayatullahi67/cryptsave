import React from 'react';
import { Search, Bell, ChevronDown, Smartphone, Globe, Zap, CreditCard, Tv, Gift } from 'lucide-react';
import StatGraph from './StatGraph';
import TransactionItem from './TransactionItem';
import { MOCK_TRANSACTIONS } from '../constants';
import { AppView, Transaction } from '../types';

interface DashboardProps {
  onSeeAll: () => void;
  onAction: (type: AppView) => void;
  onOpenSearch?: () => void;
  onOpenNotifications?: () => void;
  onSelectTransaction?: (tx: Transaction) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  onSeeAll, 
  onAction, 
  onOpenSearch, 
  onOpenNotifications,
  onSelectTransaction
}) => {
  const recentTransactions = MOCK_TRANSACTIONS.slice(0, 5);

  const quickActions = [
    { label: 'Airtime', icon: Smartphone, view: 'buy-airtime' },
    { label: 'Data', icon: Globe, view: 'buy-data' },
    { label: 'Electricity', icon: Zap, view: 'buy-electricity' },
    { label: 'TV Bills', icon: Tv, view: 'buy-tv' },
    { label: 'Crypto Card', icon: CreditCard, view: 'apply-card' },
    { label: 'Gift Card', icon: Gift, view: 'buy-giftcard' },
  ];

  return (
    <div className="flex flex-col pb-28 lg:pb-0 gap-10 lg:gap-16">
      {/* 1. Header Section */}
      <header className="flex justify-between items-center px-2 lg:px-0">
        <div className="flex items-center gap-3">
          <div className="lg:hidden w-11 h-11 rounded-2xl overflow-hidden border border-white/10 bg-[#121214]">
            <img src="https://picsum.photos/seed/abubakar/100/100" alt="Avatar" className="w-full h-full object-cover opacity-80" />
          </div>
          <div className="flex flex-col">
            <h1 className="hidden lg:block text-[28px] font-bold tracking-tight text-white leading-tight">Financial Overview</h1>
            <p className="hidden lg:block text-gray-500 text-sm font-medium">Manage your wealth effortlessly</p>
            
            <span className="lg:hidden text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">Hey!</span>
            <span className="lg:hidden text-white font-bold text-[16px] tracking-tight">Abubakar Ahmed</span>
          </div>
        </div>

        <div className="flex gap-2.5">
          <button 
            onClick={onOpenSearch}
            className="w-11 h-11 lg:w-12 lg:h-12 rounded-2xl bg-[#121214] flex items-center justify-center text-white border border-white/5 active:scale-95 transition-all"
          >
            <Search size={20} className="opacity-60" />
          </button>
          <button 
            onClick={onOpenNotifications}
            className="w-11 h-11 lg:w-12 lg:h-12 rounded-2xl bg-[#121214] flex items-center justify-center text-white border border-white/5 active:scale-95 transition-all relative"
          >
            <Bell size={20} className="opacity-60" />
            <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-[#D4A017] rounded-full border-2 border-[#121214]" />
          </button>
        </div>
      </header>

      {/* 2. Main Balance Section (Centered UI) */}
      <section className="flex flex-col items-center justify-center text-center py-4 lg:py-8 px-2">
        <span className="text-gray-500 text-[11px] lg:text-[12px] font-black tracking-[0.4em] uppercase mb-4 opacity-60">
          TOTAL BALANCE
        </span>
        <div className="text-[60px] lg:text-[100px] font-black text-white tracking-tighter leading-none mb-10 flex items-start justify-center">
          $7,890.09
        </div>
        
        <div className="flex justify-center gap-4 w-full max-w-md">
          <button 
            onClick={() => onAction('save-funds')}
            className="flex-1 bg-[#D4A017] h-[60px] rounded-[24px] text-black font-bold text-[15px] transition-all active:scale-95 shadow-[0_15px_30px_rgba(212,160,23,0.2)]"
          >
            Activate saving
          </button>
          <button 
            onClick={() => onAction('withdraw-funds')}
            className="flex-1 bg-white h-[60px] rounded-[24px] text-black font-bold text-[15px] transition-all active:scale-95 shadow-xl"
          >
            Withdraw
          </button>
        </div>
      </section>

      {/* 3. Quick Services - Updated to strictly 3 columns for portable professional feel */}
      <section className="grid grid-cols-3 gap-3 lg:gap-6 px-2 lg:px-0">
        {quickActions.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button 
              key={idx}
              onClick={() => onAction(item.view as AppView)}
              className="flex flex-col items-center justify-center gap-3 lg:gap-4 bg-[#0A0A0B] border border-white/[0.04] p-4 lg:p-10 rounded-[28px] lg:rounded-[40px] hover:border-[#D4A017]/30 transition-all active:scale-95 group min-w-0 shadow-sm"
            >
              <div className="w-10 h-10 lg:w-16 lg:h-16 rounded-[16px] lg:rounded-[24px] bg-[#121214] flex items-center justify-center text-[#D4A017] group-hover:bg-[#D4A017] group-hover:text-black transition-all border border-white/5 shadow-inner">
                <Icon size={20} className="lg:w-7 lg:h-7" />
              </div>
              <span className="text-white font-bold text-[11px] lg:text-[16px] tracking-tight truncate w-full text-center">
                {item.label}
              </span>
            </button>
          );
        })}
      </section>

      {/* 4. Statistics and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 px-2 lg:px-0">
        {/* Left: Statistics */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-[20px] font-bold text-white tracking-tight">Spending Stats</h2>
            <button className="flex items-center gap-2 bg-[#121214] px-4 py-2 rounded-xl border border-white/5 text-[11px] text-gray-500 font-bold uppercase tracking-widest hover:text-white transition-all">
              Week <ChevronDown size={14} className="opacity-60" />
            </button>
          </div>
          <div className="bg-[#0A0A0B] rounded-[48px] border border-white/[0.04] p-8 shadow-2xl relative overflow-hidden flex items-center justify-center min-h-[360px]">
            <StatGraph />
          </div>
        </div>

        {/* Right: Activity */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-[20px] font-bold text-white tracking-tight">Recent Activity</h2>
            <button 
              onClick={onSeeAll}
              className="text-[13px] font-bold text-gray-500 hover:text-[#D4A017] transition-all"
            >
              See all
            </button>
          </div>
          <div className="space-y-3 lg:max-h-[360px] lg:overflow-y-auto no-scrollbar">
            {recentTransactions.map((tx) => (
              <TransactionItem key={tx.id} transaction={tx} onSelect={onSelectTransaction} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;