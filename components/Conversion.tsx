import React, { useState } from 'react';
import { ArrowUpDown, ChevronDown, Zap, ShieldCheck, CheckCircle2, TrendingUp, Info, RefreshCw } from 'lucide-react';

interface ConversionProps {
  onComplete: () => void;
}

const Conversion: React.FC<ConversionProps> = ({ onComplete }) => {
  const [fromAsset, setFromAsset] = useState({ symbol: 'NGN', name: 'Nigerian Naira', value: '' });
  const [toAsset, setToAsset] = useState({ symbol: 'USDT', name: 'Tether', value: '0.00' });
  const [isSwapping, setIsSwapping] = useState(false);

  const handleSwapOrder = () => {
    setIsSwapping(true);
    const temp = { ...fromAsset };
    setFromAsset({ ...toAsset, value: toAsset.value });
    setToAsset({ ...temp, value: temp.value });
    setTimeout(() => setIsSwapping(false), 500);
  };

  const handleValueChange = (val: string) => {
    setFromAsset(prev => ({ ...prev, value: val }));
    // Mock calculation
    const numericVal = parseFloat(val) || 0;
    const rate = fromAsset.symbol === 'NGN' ? 0.00062 : 1600;
    setToAsset(prev => ({ ...prev, value: (numericVal * rate).toFixed(2) }));
  };

  return (
    <div className="flex flex-col gap-10 pb-32 lg:pb-10 animate-in fade-in duration-700">
      
      {/* Header */}
      <header className="px-2 lg:px-0 flex flex-col gap-2">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center text-[#D4A017]">
             <ArrowUpDown size={24} />
           </div>
           <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Currency Conversion</h1>
              <p className="text-gray-500 text-sm font-medium">Swap between Fiat and Digital Assets instantly</p>
           </div>
        </div>
      </header>

      {/* Main Conversion Interface */}
      <div className="max-w-4xl mx-auto w-full space-y-8">
        
        {/* The Swap Container */}
        <div className="relative space-y-2">
          
          {/* FROM INPUT */}
          <div className="bg-[#0A0A0B] p-8 lg:p-12 rounded-[48px] border border-white/[0.04] shadow-2xl relative overflow-hidden transition-all">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4A017]/5 rounded-full blur-[40px]" />
             
             <div className="flex flex-col gap-6 relative z-10">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">Pay With</span>
                  <span className="text-gray-700 text-[10px] font-bold">Balance: {fromAsset.symbol === 'NGN' ? '₦145,000' : '$2,890'}</span>
                </div>
                
                <div className="flex items-center justify-between gap-4">
                  <input 
                    type="number"
                    placeholder="0.00"
                    value={fromAsset.value}
                    onChange={(e) => handleValueChange(e.target.value)}
                    className="flex-1 bg-transparent border-none text-[48px] lg:text-[64px] font-black text-white focus:outline-none placeholder:text-gray-800 tracking-tighter"
                  />
                  <button className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/5 hover:bg-white/10 transition-all">
                    <div className="w-8 h-8 rounded-full bg-[#121214] border border-white/10 flex items-center justify-center overflow-hidden">
                       <img src={`https://avatar.vercel.sh/${fromAsset.symbol}`} alt="" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-white font-black text-lg">{fromAsset.symbol}</span>
                    <ChevronDown size={18} className="text-gray-600" />
                  </button>
                </div>
             </div>
          </div>

          {/* SWAP BUTTON OVERLAY */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
             <button 
              onClick={handleSwapOrder}
              className={`w-16 h-16 rounded-full bg-white text-black shadow-2xl border-4 border-black flex items-center justify-center transition-all active:scale-90 hover:rotate-180 duration-500 ${isSwapping ? 'rotate-180 scale-90' : ''}`}
             >
                <ArrowUpDown size={24} strokeWidth={3} />
             </button>
          </div>

          {/* TO INPUT */}
          <div className="bg-[#0A0A0B] p-8 lg:p-12 rounded-[48px] border border-white/[0.04] shadow-2xl relative overflow-hidden transition-all">
             <div className="flex flex-col gap-6 relative z-10">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">Receive Asset</span>
                  <div className="flex items-center gap-1.5 text-green-500">
                    <TrendingUp size={12} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">+0.42%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 text-[48px] lg:text-[64px] font-black text-white/40 tracking-tighter">
                    {toAsset.value || '0.00'}
                  </div>
                  <button className="flex items-center gap-3 bg-[#D4A017] px-6 py-3 rounded-2xl shadow-xl transition-all">
                    <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center overflow-hidden">
                       <img src={`https://avatar.vercel.sh/${toAsset.symbol}`} alt="" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-black font-black text-lg">{toAsset.symbol}</span>
                    <ChevronDown size={18} className="text-black/40" />
                  </button>
                </div>
             </div>
          </div>
        </div>

        {/* Swap Details Summary */}
        <div className="bg-white/[0.02] rounded-[40px] border border-white/5 p-8 lg:p-10 space-y-6">
           <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-gray-500 uppercase tracking-widest">Exchange Rate</span>
              <div className="flex items-center gap-2 text-white">
                <span className="text-gray-500">1 {fromAsset.symbol} ≈</span>
                <span>{fromAsset.symbol === 'NGN' ? '0.00062' : '1,600'} {toAsset.symbol}</span>
                <RefreshCw size={12} className="text-[#D4A017] ml-1" />
              </div>
           </div>
           
           <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-gray-500 uppercase tracking-widest">Network Fee</span>
              <span className="text-green-500">0.00% (No Fees)</span>
           </div>

           <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-gray-500 uppercase tracking-widest">Slippage Tolerance</span>
              <span className="text-white">0.5% (Auto)</span>
           </div>

           <div className="h-px bg-white/5 w-full" />

           <div className="flex items-start gap-4 p-5 bg-[#D4A017]/5 rounded-[24px] border border-[#D4A017]/10">
              <Info size={18} className="text-[#D4A017] shrink-0 mt-0.5" />
              <p className="text-[11px] font-medium text-gray-500 leading-relaxed">
                By clicking Confirm, you are initiating a secure atomic swap. Assets are released instantly to your main wallet after internal ledger verification.
              </p>
           </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={onComplete}
          disabled={!fromAsset.value || fromAsset.value === '0'}
          className="w-full h-24 bg-[#D4A017] hover:bg-[#FACC15] rounded-[32px] text-black font-black text-xl shadow-[0_30px_60px_rgba(212,160,23,0.3)] active:scale-[0.98] transition-all flex items-center justify-center gap-4 disabled:opacity-20 disabled:grayscale uppercase tracking-tighter"
        >
          Confirm Conversion
          <Zap size={24} fill="currentColor" />
        </button>

        {/* Security Footnote */}
        <div className="flex items-center justify-center gap-8 opacity-40 py-4">
           <div className="flex items-center gap-2">
             <ShieldCheck size={14} className="text-green-500" />
             <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white">End-to-End Encrypted</span>
           </div>
           <div className="flex items-center gap-2">
             <CheckCircle2 size={14} className="text-[#D4A017]" />
             <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white">Insured Assets</span>
           </div>
        </div>
      </div>

    </div>
  );
};

export default Conversion;