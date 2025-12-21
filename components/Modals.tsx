
import React from 'react';
import { Check, X, ArrowLeft, ChevronRight } from 'lucide-react';

interface ModalsProps {
  type: 'success' | 'declined';
  onBack: () => void;
}

const Modals: React.FC<ModalsProps> = ({ type, onBack }) => {
  const isSuccess = type === 'success';

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col p-6 overflow-y-auto">
      <header className="mb-8">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center text-white">
          <ArrowLeft />
        </button>
      </header>

      <div className="flex-1 flex flex-col items-center">
        <div className="text-center font-bold text-xl mb-12">Transaction</div>

        <div className="relative mb-12">
          {/* Pulsing rings */}
          <div className="absolute inset-0 bg-[#EAB308]/20 rounded-full animate-ping scale-150 opacity-20" />
          <div className="absolute inset-0 border border-[#EAB308]/30 rounded-full scale-125" />
          
          <div className={`w-32 h-32 rounded-full flex items-center justify-center ${isSuccess ? 'bg-[#EAB308]' : 'bg-[#EAB308]'}`}>
            {isSuccess ? (
              <Check size={64} className="text-black stroke-[3px]" />
            ) : (
              <X size={64} className="text-black stroke-[3px]" />
            )}
          </div>
          
          {/* Decorative floating dots */}
          <div className="absolute -top-4 right-0 w-3 h-3 bg-[#EAB308]/40 rounded-full" />
          <div className="absolute bottom-4 -left-4 w-4 h-4 bg-[#EAB308]/30 rounded-full" />
        </div>

        <h2 className="text-2xl font-bold mb-2">
          {isSuccess ? 'Transaction Successful!' : 'Transaction Declined!'}
        </h2>
        <p className="text-gray-400 text-sm text-center mb-12 px-8">
          {isSuccess 
            ? 'Funds processed successfully.' 
            : 'Kindly try payment again after Five Minutes'}
        </p>

        {isSuccess ? (
          <div className="w-full space-y-6 px-4">
             <div className="flex justify-between text-xs font-bold">
               <div className="flex flex-col gap-2">
                 <span className="text-[#EAB308] uppercase">From:</span>
                 <span className="text-white">Main Wallet</span>
               </div>
               <div className="flex flex-col gap-1 items-end">
                 <span className="text-[#EAB308] uppercase">To:</span>
                 <span className="text-white">Abubakar Ahmed</span>
                 <span className="text-gray-500">GT Bank</span>
                 <span className="text-gray-500">**** 20</span>
               </div>
             </div>
             <div className="h-px bg-white/10 w-full" />
             <div className="flex justify-between text-xs font-bold">
               <span className="text-[#EAB308] uppercase">Date:</span>
               <div className="flex flex-col items-end">
                 <span className="text-white">24 Sep 2025</span>
                 <span className="text-gray-500">11:23 AM</span>
               </div>
             </div>
             <button className="w-full text-[#EAB308] text-sm font-bold flex items-center justify-center gap-1 mt-4">
               View transaction details <ChevronRight size={14} />
             </button>
          </div>
        ) : (
          <div className="w-full flex justify-between px-8 text-sm font-bold">
            <span className="text-[#EAB308] uppercase">Reason:</span>
            <span className="text-white">Network Error</span>
          </div>
        )}
      </div>

      <div className="mt-auto pt-10">
        <button
          onClick={onBack}
          className="w-full bg-[#EAB308] py-5 rounded-2xl text-black font-bold text-lg shadow-xl active:scale-95 transition-all"
        >
          {isSuccess ? 'Back to Home Page' : 'Retry Payment'}
        </button>
      </div>
    </div>
  );
};

export default Modals;
