
import React from 'react';
import { Apple, ArrowUp, Gift } from 'lucide-react';
import { Transaction } from '../types';

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const getIcon = () => {
    switch (transaction.icon) {
      case 'apple': return <Apple size={22} className="text-white" />;
      case 'arrow-up': return <ArrowUp size={22} className="text-white" />;
      case 'gift': return <Gift size={22} className="text-white" />;
      default: return <Apple size={22} className="text-white" />;
    }
  };

  const isPositive = transaction.amount.startsWith('+');

  return (
    <div className="bg-[#121214] p-5 rounded-[28px] flex items-center gap-5 border border-white/[0.03] active:bg-[#1C1C1E] transition-all cursor-pointer group hover:border-white/10 shadow-sm">
      <div className="w-[56px] h-[56px] bg-[#1C1C1E] rounded-[20px] flex items-center justify-center border border-white/5 transition-all group-hover:scale-105">
        {getIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-white font-bold text-[16px] mb-1 tracking-tight truncate">{transaction.title}</div>
        <div className="text-gray-500 text-[11px] font-bold tracking-widest uppercase opacity-60">{transaction.date}</div>
      </div>
      <div className={`font-bold text-[17px] tracking-tight shrink-0 ${isPositive ? 'text-[#D4A017]' : 'text-white/40'}`}>
        {transaction.amount}
      </div>
    </div>
  );
};

export default TransactionItem;
