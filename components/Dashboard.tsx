import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';
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

  return (
    <div className="flex flex-col pb-28 lg:pb-0">
      {/* Header Section */}
      <header className="flex justify-between items-start mb-12 lg:mb-16">
        {/* Mobile Header */}
        <div className="flex lg:hidden items-center gap-3">
          <div className="w-12 h-12 rounded-[16px] overflow-hidden border border-white/10 shadow-lg bg-[#1C1C1E]">
            <img src="https://picsum.photos/seed/abubakar/100/100" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-[10px] font-medium uppercase tracking-widest">Hey!</span>
            <span className="text-white font-bold text-[16px] tracking-tight">Abubakar Ahmed</span>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block">
          <h1 className="text-[32px] font-bold tracking-tight text-white leading-tight">Financial Overview</h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">Manage your wealth effortlessly</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2.5 lg:gap-4">
          <button 
            onClick={onOpenSearch}
            className="w-11 h-11 lg:w-12 lg:h-12 rounded-2xl bg-[#121214] flex items-center justify-center text-white border border-white/5 active:scale-95 lg:hover:bg-[#1C1C1E] transition-all"
          >
            <Search size={20} className="opacity-70" />
          </button>
          <button 
            onClick={onOpenNotifications}
            className="w-11 h-11 lg:w-12 lg:h-12 rounded-2xl bg-[#121214] flex items-center justify-center text-white border border-white/5 active:scale-95 lg:hover:bg-[#1C1C1E] transition-all relative"
          >
            <Bell size={20} className="opacity-70" />
            <span className="absolute top-3.5 right-3.5 lg:top-4 lg:right-4 w-2 h-2 bg-[#D4A017] rounded-full border-2 border-[#121214]" />
          </button>
        </div>
      </header>

      {/* Total Balance Section */}
      <section className="text-center mb-16 lg:mb-24">
        <div className="text-gray-500 text-[11px] font-bold tracking-[0.3em] uppercase mb-4 opacity-60">TOTAL BALANCE</div>
        <div className="text-[60px] lg:text-[100px] font-bold text-white tracking-tighter leading-none mb-10 flex items-start justify-center">
          $7,890.09
        </div>
        
        <div className="flex justify-center gap-4 px-2 lg:px-0">
          <button 
            onClick={() => onAction('save-funds')}
            className="flex-1 lg:flex-none lg:w-[220px] bg-[#D4A017] hover:bg-[#EAB308] h-[58px] rounded-[24px] text-black font-bold text-[15px] transition-all active:scale-95 shadow-[0_15px_30px_rgba(212,160,23,0.2)]"
          >
            Activate saving
          </button>
          <button 
            onClick={() => onAction('withdraw-funds')}
            className="flex-1 lg:flex-none lg:w-[220px] bg-white hover:bg-gray-100 h-[58px] rounded-[24px] text-black font-bold text-[15px] transition-all active:scale-95"
          >
            Withdraw
          </button>
        </div>
      </section>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-7 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[20px] font-bold text-white tracking-tight">Statistics</h2>
            <button className="flex items-center gap-2 bg-[#121214] px-4 py-2 rounded-xl border border-white/5 text-[12px] text-gray-400 font-bold hover:text-white transition-all">
              This Week <ChevronDown size={14} className="opacity-60" />
            </button>
          </div>
          <div className="bg-[#0A0A0B] rounded-[40px] border border-white/[0.04] p-8 lg:p-10 shadow-2xl relative overflow-hidden group min-h-[340px] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4A017]/[0.03] to-transparent pointer-events-none" />
            <StatGraph />
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[20px] font-bold text-white tracking-tight">Recent Transactions</h2>
            <button 
              onClick={onSeeAll}
              className="text-[14px] font-bold text-gray-500 hover:text-[#D4A017] transition-all"
            >
              See all
            </button>
          </div>
          <div className="space-y-3 lg:max-h-[400px] lg:overflow-y-auto no-scrollbar pr-1">
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