
import React, { useState } from 'react';
import { ArrowLeft, Plus, Download, Home, Car, Gift, TrendingUp, ChevronDown } from 'lucide-react';
import TransactionItem from './TransactionItem';
import { MOCK_TRANSACTIONS } from '../constants';

const Wallet: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'main' | 'savings'>('main');
  const allTransactions = [
    ...MOCK_TRANSACTIONS, 
    ...MOCK_TRANSACTIONS, 
    ...MOCK_TRANSACTIONS
  ];

  return (
    <div className="h-full flex flex-col bg-black lg:bg-transparent pb-32 lg:pb-10">
      {/* Header - Professional Desktop Title */}
      <header className="px-6 lg:px-0 pt-6 lg:pt-2 mb-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 lg:hidden flex items-center justify-center text-white active:scale-90 transition-transform -ml-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl lg:text-[32px] font-bold text-white tracking-tight">Wallet</h1>
        </div>
        
        {/* Desktop Search/Action Area Placeholder */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="text-[13px] font-bold text-gray-500 bg-[#1C1C1E] px-4 py-2 rounded-full border border-white/5">
            Updated just now
          </div>
        </div>
      </header>

      {/* Premium Tab Switcher - Centered for Mobile, Left Aligned for Desktop */}
      <div className="px-6 lg:px-0 mb-12">
        <div className="bg-[#0F0F10] p-1.5 rounded-[24px] flex max-w-md lg:max-w-[400px] border border-white/5 shadow-2xl">
          <button
            onClick={() => setActiveTab('main')}
            className={`flex-1 py-4 rounded-[20px] font-bold text-[14px] transition-all duration-500 ease-out ${
              activeTab === 'main' 
              ? 'bg-[#D4A017] text-black shadow-[0_10px_20px_rgba(212,160,23,0.3)]' 
              : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            Main Wallet
          </button>
          <button
            onClick={() => setActiveTab('savings')}
            className={`flex-1 py-4 rounded-[20px] font-bold text-[14px] transition-all duration-500 ease-out ${
              activeTab === 'savings' 
              ? 'bg-[#D4A017] text-black shadow-[0_10px_20px_rgba(212,160,23,0.3)]' 
              : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            Savings Wallet
          </button>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="flex-1 px-6 lg:px-0">
        {activeTab === 'main' ? (
          <div className="space-y-12">
            {/* Balance and Actions - Premium Desktop Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Primary Balance Card */}
              <div className="lg:col-span-8 bg-[#D4A017] rounded-[48px] p-10 lg:p-12 text-black relative overflow-hidden shadow-[0_25px_50px_-12px_rgba(212,160,23,0.4)] flex flex-col justify-center min-h-[260px] group">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 group-hover:bg-white/30 transition-all duration-700" />
                
                <span className="text-black/60 text-[13px] font-bold uppercase tracking-[0.2em] mb-3">Available Balance</span>
                <div className="text-[54px] lg:text-[72px] font-bold text-white tracking-tighter leading-tight mb-6 drop-shadow-sm">$2,890.76</div>
                
                <div className="flex flex-wrap gap-4">
                  <div className="inline-flex items-center gap-2 bg-black/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-[13px] font-bold text-white shadow-lg">
                    <TrendingUp size={16} />
                    <span>+$34.89</span>
                    <span className="opacity-60 font-medium text-[11px] ml-1">Today's Profit</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                <button className="flex-1 bg-white hover:bg-gray-100 rounded-[32px] p-6 text-black flex flex-col items-center justify-center gap-2 active:scale-[0.97] transition-all shadow-xl border border-white group">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                    <Plus size={24} className="text-white" strokeWidth={3} />
                  </div>
                  <span className="font-bold text-[16px]">Add Funds</span>
                </button>
                <button className="flex-1 bg-[#1C1C1E] hover:bg-[#252528] rounded-[32px] p-6 text-white flex flex-col items-center justify-center gap-2 active:scale-[0.97] transition-all shadow-lg border border-white/5 group">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                    <Download size={22} className="text-white" />
                  </div>
                  <span className="font-bold text-[16px]">Withdraw to Bank</span>
                </button>
              </div>
            </div>

            {/* Split Activity Layout - Desktop Professionalism */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-8">
              {/* Left: Interactive Ring Progress */}
              <div className="lg:col-span-6">
                <h2 className="text-[20px] font-bold text-white mb-8 tracking-tight">Savings Activity</h2>
                <div className="bg-[#0A0A0B] rounded-[56px] border border-white/[0.04] p-12 lg:p-16 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group min-h-[480px]">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#D4A017]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  
                  <div className="relative w-64 h-64 lg:w-80 lg:h-80 transform transition-transform duration-700 hover:scale-105">
                    <div className="absolute inset-0 bg-[#D4A017]/10 rounded-full blur-[80px] opacity-40 group-hover:opacity-60 transition-all" />
                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-[0_0_15px_rgba(212,160,23,0.2)]">
                      <circle cx="50" cy="50" r="44" stroke="#161618" strokeWidth="9" fill="none" />
                      <circle 
                        cx="50" cy="50" r="44" 
                        stroke="#D4A017" strokeWidth="9" fill="none" 
                        strokeDasharray="185 276.4" strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                       <span className="text-white font-bold text-[36px] lg:text-[42px] tracking-tighter mb-1">$2,890.76</span>
                       <span className="text-gray-500 text-[11px] font-bold uppercase tracking-[0.2em] opacity-60">Overall Savings</span>
                    </div>
                  </div>
                  
                  <div className="mt-12 flex gap-8">
                    <div className="text-center">
                      <div className="text-white font-bold text-[18px]">72%</div>
                      <div className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mt-1">Goal Reached</div>
                    </div>
                    <div className="w-px h-10 bg-white/10" />
                    <div className="text-center">
                      <div className="text-[#D4A017] font-bold text-[18px]">+$450</div>
                      <div className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mt-1">This Month</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Recent Activity Scroll List */}
              <div className="lg:col-span-6">
                <div className="flex justify-between items-center mb-8 px-2">
                  <h2 className="text-[20px] font-bold text-white tracking-tight">Recent Activity</h2>
                  <button className="text-[14px] font-bold text-[#D4A017] hover:underline transition-all">See all</button>
                </div>
                <div className="lg:h-[480px] overflow-y-auto pr-4 space-y-4 custom-scrollbar scroll-smooth">
                  {allTransactions.map((tx, idx) => (
                    <TransactionItem key={`${tx.id}-${idx}`} transaction={tx} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Savings Goals Tab - Professional Grid */
          <div className="space-y-12">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
              <div>
                <h2 className="text-[24px] font-bold text-white tracking-tight mb-2">Savings Goals</h2>
                <p className="text-gray-500 text-[15px]">You have 4 active saving goals this month.</p>
              </div>
              <button className="bg-[#D4A017] text-black font-bold px-8 py-4 rounded-[20px] shadow-xl active:scale-95 transition-all flex items-center gap-2">
                <Plus size={20} strokeWidth={3} />
                <span>Create New Goal</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'House Rent', amt: '$9,000 left', icon: Home, val: 65, days: '12 days left' },
                { label: 'New Car', amt: '$29,000 left', icon: Car, val: 35, days: '204 days left' },
                { label: 'Vacation', amt: '$3,400 left', icon: Gift, val: 80, days: '5 days left' },
                { label: 'Retirement', amt: '$120,000 left', icon: TrendingUp, val: 15, days: '3200 days left' },
              ].map((goal, i) => (
                <div key={i} className="flex flex-col gap-6 p-8 bg-[#0F0F10] rounded-[48px] border border-white/5 hover:border-white/10 hover:bg-[#161618] active:scale-[0.98] transition-all cursor-pointer shadow-2xl group">
                  <div className="flex justify-between items-start">
                    <div className="w-14 h-14 bg-[#1C1C1E] rounded-[20px] flex items-center justify-center text-white border border-white/5 group-hover:scale-110 transition-transform">
                      <goal.icon size={26} />
                    </div>
                    <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{goal.days}</div>
                  </div>
                  
                  <div>
                    <div className="text-[20px] font-bold text-white mb-1">{goal.label}</div>
                    <div className="text-[13px] text-[#D4A017] font-bold tracking-tight">{goal.amt}</div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <span className="text-[12px] text-gray-500 font-bold uppercase tracking-wider">Progress</span>
                      <span className="text-white font-bold text-sm">{goal.val}%</span>
                    </div>
                    <div className="h-2 w-full bg-[#1C1C1E] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#D4A017] rounded-full transition-all duration-1000" 
                        style={{ width: `${goal.val}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.01);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(212, 160, 23, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 160, 23, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Wallet;
