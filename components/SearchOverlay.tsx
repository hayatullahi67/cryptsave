import React, { useState, useEffect, useRef } from 'react';
import { X, Search, ArrowRight, History } from 'lucide-react';
import { MOCK_TRANSACTIONS } from '../constants';
import TransactionItem from './TransactionItem';
import { Transaction } from '../types';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTransaction?: (tx: Transaction) => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, onSelectTransaction }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const handleSelect = (tx: Transaction) => {
    onSelectTransaction?.(tx);
    onClose();
  };

  if (!isOpen) return null;

  const results = query.trim() 
    ? MOCK_TRANSACTIONS.filter(t => t.title.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div className="fixed inset-0 z-[100] flex flex-col animate-in fade-in duration-300">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-[24px]" 
        onClick={onClose} 
      />
      
      {/* Content */}
      <div className="relative flex-1 flex flex-col px-6 pt-12 lg:pt-24 max-w-4xl mx-auto w-full">
        {/* Header/Input */}
        <div className="relative group">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-[#D4A017] opacity-60 group-focus-within:opacity-100 transition-all" size={32} strokeWidth={2.5} />
          <input 
            ref={inputRef}
            type="text"
            placeholder="Search transactions, bills..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-none text-white text-[32px] lg:text-[48px] font-bold pl-12 focus:outline-none placeholder:text-gray-700 tracking-tighter"
          />
          <button 
            onClick={onClose}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-500 hover:text-white transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Results Area */}
        <div className="mt-12 lg:mt-20 flex-1 overflow-y-auto no-scrollbar pb-12">
          {query.trim() === '' ? (
            <div className="space-y-10">
              <div>
                <h3 className="text-gray-500 text-[11px] font-black uppercase tracking-[0.3em] mb-6">Recent Searches</h3>
                <div className="flex flex-wrap gap-3">
                  {['Apple Pay', 'Withdrawal', 'Netflix', 'Bonus'].map(term => (
                    <button 
                      key={term}
                      onClick={() => setQuery(term)}
                      className="flex items-center gap-2 bg-white/5 px-6 py-3 rounded-2xl border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all font-bold text-sm"
                    >
                      <History size={14} />
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-end">
                <h3 className="text-gray-500 text-[11px] font-black uppercase tracking-[0.3em]">Search Results ({results.length})</h3>
                {results.length > 0 && (
                  <button className="text-[12px] font-bold text-[#D4A017] flex items-center gap-1 group">
                    View detailed history <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
              
              <div className="space-y-3">
                {results.length > 0 ? (
                  results.map(tx => <TransactionItem key={tx.id} transaction={tx} onSelect={handleSelect} />)
                ) : (
                  <div className="py-20 flex flex-col items-center justify-center opacity-40">
                    <Search size={48} className="mb-4 text-gray-500" />
                    <p className="text-white font-bold text-lg">No results for "{query}"</p>
                    <p className="text-gray-500 text-sm mt-1">Try searching for different keywords</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;