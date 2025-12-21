
import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';
import StatGraph from './StatGraph';
import TransactionItem from './TransactionItem';
import { MOCK_TRANSACTIONS } from '../constants';

const Dashboard: React.FC = () => {
  // Multiply transactions to ensure there is plenty of content to scroll
  const allTransactions = [
    ...MOCK_TRANSACTIONS, 
    ...MOCK_TRANSACTIONS, 
    ...MOCK_TRANSACTIONS,
    ...MOCK_TRANSACTIONS
  ];

  return (
    <div className="h-full">
      {/* Header - Aligned for Professional Desktop View */}
      <header className="flex justify-between items-center mb-10 pt-2 px-2">
        <div className="hidden lg:block">
          <h1 className="text-[28px] font-bold tracking-tight text-white">Financial Overview</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your wealth effortlessly</p>
        </div>
        
        {/* Mobile Profile Header */}
        <div className="flex items-center gap-3 lg:hidden">
          <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 shadow-lg bg-[#1C1C1E]">
            <img src="https://picsum.photos/seed/abubakar/100/100" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-[11px] font-bold uppercase tracking-wider">Hey!</span>
            <span className="text-white font-bold text-[15px] tracking-tight">Abubakar Ahmed</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="w-11 h-11 rounded-2xl bg-[#1C1C1E] flex items-center justify-center text-white border border-white/5 active:scale-95 transition-all hover:bg-[#252528] shadow-sm">
            <Search size={20} className="opacity-70" />
          </button>
          <button className="w-11 h-11 rounded-2xl bg-[#1C1C1E] flex items-center justify-center text-white border border-white/5 active:scale-95 transition-all relative hover:bg-[#252528] shadow-sm">
            <Bell size={20} className="opacity-70" />
            <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-[#D4A017] rounded-full border-2 border-[#1C1C1E]" />
          </button>
        </div>
      </header>

      {/* Hero Balance Section */}
      <section className="text-center mb-16 lg:mb-20 py-6">
        <div className="text-gray-500 text-[13px] mb-3 font-bold tracking-[0.2em] uppercase opacity-70">TOTAL BALANCE</div>
        <div className="text-[64px] lg:text-[84px] font-bold text-white mb-10 tracking-tighter leading-none">$7,890.09</div>
        
        {/* High-Fidelity Professional Action Buttons - Side by Side, No Icons, 72px Height */}
        <div className="flex flex-row gap-4 justify-center max-w-lg mx-auto px-4">
          <button className="flex-1 h-[52px] bg-[#D4A017] rounded-full text-black font-bold text-[16px] active:scale-95 transition-all shadow-[0_20px_40px_-12px_rgba(212,160,23,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(212,160,23,0.5)] border-t border-white/30 tracking-tight">
            Activate saving
          </button>
          
          <button className="flex-1 h-[52px] bg-white rounded-full text-black font-bold text-[16px] active:scale-95 transition-all shadow-[0_15px_30px_-10px_rgba(255,255,255,0.15)] hover:bg-gray-50 border-t border-black/5 tracking-tight">
            Withdraw
          </button>
        </div>
      </section>

      {/* Main Grid: Statistics & Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pb-32 items-start">
        {/* Statistics Column */}
        <div className="lg:col-span-7">
          <div className="flex justify-between items-center mb-7 px-2">
            <h2 className="text-[20px] font-bold text-white tracking-tight">Statistics</h2>
            <button className="text-[13px] font-bold text-gray-500 flex items-center gap-1.5 hover:text-white transition-colors py-1.5 px-3 bg-[#1C1C1E] rounded-full border border-white/5">
              This Week <ChevronDown size={14} className="opacity-60" />
            </button>
          </div>
          {/* Fixed height for the Stat box */}
          <div className="bg-[#0A0A0B] p-6 lg:p-10 rounded-[48px] border border-white/[0.04] shadow-2xl relative overflow-hidden group lg:h-[480px] flex flex-col justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#D4A017]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <StatGraph />
          </div>
        </div>

        {/* Recent Transactions Column */}
        <div className="lg:col-span-5">
          <div className="flex justify-between items-center mb-7 px-2">
            <h2 className="text-[20px] font-bold text-white tracking-tight">Recent Transactions</h2>
            <button className="text-[13px] font-bold text-gray-500 hover:text-white transition-colors">See all</button>
          </div>
          
          <div className="lg:h-[480px] overflow-y-auto pr-2 space-y-4 scroll-smooth custom-scrollbar">
            {allTransactions.map((tx, idx) => (
              <TransactionItem key={`${tx.id}-${idx}`} transaction={tx} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* Professional custom scrollbar for the transactions list */
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(212, 160, 23, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 160, 23, 0.6);
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
