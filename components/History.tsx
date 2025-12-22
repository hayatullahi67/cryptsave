import React, { useState, useMemo } from 'react';
import { ArrowLeft, Filter, Search } from 'lucide-react';
import TransactionItem from './TransactionItem';
import { MOCK_TRANSACTIONS } from '../constants';
import { Transaction } from '../types';

interface HistoryProps {
  onBack: () => void;
  onSelectTransaction?: (tx: Transaction) => void;
}

const History: React.FC<HistoryProps> = ({ onBack, onSelectTransaction }) => {
  const [filter, setFilter] = useState<'all' | 'deposit' | 'withdrawal' | 'reward'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = useMemo(() => {
    return MOCK_TRANSACTIONS.filter(tx => {
      const matchesFilter = filter === 'all' || tx.type === filter;
      const matchesSearch = tx.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery]);

  const filterOptions = [
    { id: 'all', label: 'All Transactions' },
    { id: 'deposit', label: 'Deposits' },
    { id: 'withdrawal', label: 'Withdrawals' },
    { id: 'reward', label: 'Rewards' }
  ];

  return (
    <div className="h-full flex flex-col bg-black">
      {/* Header - Date/Calendar icon removed as requested */}
      <header className="flex items-center justify-between px-6 lg:px-0 pt-6 lg:pt-0 mb-8 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 -ml-2 flex items-center justify-center text-white active:scale-90 transition-transform"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-white tracking-tight">History</h1>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="px-6 lg:px-0 space-y-6 mb-10">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-14 bg-[#121214] rounded-[20px] border border-white/5 pl-12 pr-4 text-white focus:border-[#D4A017]/50 focus:outline-none transition-all placeholder:text-gray-600 font-medium"
          />
        </div>

        {/* Scrollable Filters Container with visible scrollbar */}
        <div className="relative w-full">
          <div className="flex gap-3 overflow-x-auto pb-4 -mx-6 px-6 lg:-mx-0 lg:px-0 flex-nowrap scroll-smooth custom-h-scrollbar">
            {filterOptions.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={`px-8 py-3.5 rounded-full text-[13px] font-bold transition-all whitespace-nowrap border shrink-0 active:scale-95 ${
                  filter === f.id 
                  ? 'bg-[#D4A017] text-black border-[#D4A017] shadow-[0_10px_20px_rgba(212,160,23,0.3)]' 
                  : 'bg-[#121214] text-gray-400 border-white/[0.05] hover:text-white hover:border-white/10'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="flex-1 px-6 lg:px-0 overflow-y-auto no-scrollbar pb-32">
        {filteredTransactions.length > 0 ? (
          <div className="space-y-4">
            {filteredTransactions.map((tx) => (
              <TransactionItem key={tx.id} transaction={tx} onSelect={onSelectTransaction} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 opacity-40">
            <Filter size={48} className="mb-4 text-gray-500" />
            <p className="text-white font-bold">No transactions found</p>
            <p className="text-gray-500 text-sm mt-1">Try changing your filters</p>
          </div>
        )}
      </div>

      <style>{`
        .custom-h-scrollbar::-webkit-scrollbar {
          height: 3px;
        }
        .custom-h-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          margin-left: 24px;
          margin-right: 24px;
          border-radius: 10px;
        }
        .custom-h-scrollbar::-webkit-scrollbar-thumb {
          background: #D4A017;
          border-radius: 10px;
        }
        @media (min-width: 1024px) {
          .custom-h-scrollbar::-webkit-scrollbar-track {
            margin-left: 0;
            margin-right: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default History;