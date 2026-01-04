import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Tv, Gamepad2, Apple, PlayCircle, Coins, ShieldCheck, ChevronRight, Info, CheckCircle2, Zap, Delete } from 'lucide-react';

interface GiftCardFormProps {
  onCancel: () => void;
  onComplete: () => void;
}

const GiftCardForm: React.FC<GiftCardFormProps> = ({ onCancel, onComplete }) => {
  const [mode, setMode] = useState<'buy' | 'sell'>('buy');
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [sellCode, setSellCode] = useState('');

  const brands = [
    { name: 'Amazon', icon: ShoppingCart, color: '#FF9900' },
    { name: 'Apple', icon: Apple, color: '#FFFFFF' },
    { name: 'Netflix', icon: Tv, color: '#E50914' },
    { name: 'Steam', icon: Gamepad2, color: '#1b2838' },
    { name: 'Google Play', icon: PlayCircle, color: '#34A853' },
    { name: 'Razer Gold', icon: Coins, color: '#00FF00' },
  ];

  const denominations = ['10', '25', '50', '100', '200', '500'];

  const isBuyReady = selectedBrand !== null && amount !== '';
  const isSellReady = selectedBrand !== null && sellCode.length > 8 && amount !== '';

  return (
    <div className="h-full w-full bg-black flex flex-col overflow-hidden animate-in fade-in duration-500">
      {/* Header */}
      <header className="px-6 py-6 border-b border-white/5 bg-black/50 backdrop-blur-xl flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button onClick={onCancel} className="p-2 -ml-2 text-white active:scale-90 transition-all">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold tracking-tight text-white">Gift Card Hub</h1>
        </div>
        <div className="flex items-center gap-2 bg-[#D4A017]/10 px-4 py-2 rounded-full border border-[#D4A017]/20">
          <ShieldCheck size={14} className="text-[#D4A017]" />
          <span className="text-[10px] font-black uppercase tracking-widest text-[#D4A017]">Escrow Secure</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6 lg:p-12">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Mode Toggle */}
          <div className="flex bg-[#121214] p-1.5 rounded-[28px] border border-white/5 shadow-2xl">
            <button 
              onClick={() => { setMode('buy'); setSelectedBrand(null); setAmount(''); }}
              className={`flex-1 py-4 rounded-[22px] font-black text-[12px] uppercase tracking-widest transition-all ${mode === 'buy' ? 'bg-[#D4A017] text-black shadow-lg' : 'text-gray-500'}`}
            >
              Buy Gift Card
            </button>
            <button 
              onClick={() => { setMode('sell'); setSelectedBrand(null); setAmount(''); }}
              className={`flex-1 py-4 rounded-[22px] font-black text-[12px] uppercase tracking-widest transition-all ${mode === 'sell' ? 'bg-white text-black shadow-lg' : 'text-gray-500'}`}
            >
              Sell Gift Card
            </button>
          </div>

          {/* 1. SELECT BRAND */}
          <section className="space-y-6">
            <span className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] block ml-4">Select Global Brand</span>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {brands.map((b, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedBrand(idx)}
                  className={`flex items-center gap-4 p-5 rounded-[32px] border transition-all duration-300 group text-left ${
                    selectedBrand === idx 
                    ? 'bg-white border-white text-black shadow-2xl scale-[1.02]' 
                    : 'bg-[#0A0A0B] border-white/5 text-white hover:border-white/20'
                  }`}
                >
                  <div 
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                      selectedBrand === idx ? 'bg-black text-white' : 'bg-white/5 text-[#D4A017]'
                    }`}
                  >
                    <b.icon size={24} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-black tracking-tight">{b.name}</span>
                    <span className={`text-[9px] font-bold uppercase tracking-widest opacity-40`}>Global Store</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* 2. SPECIFY AMOUNT / CODE */}
          {selectedBrand !== null && (
            <div className="space-y-12 animate-in slide-in-from-bottom-6 duration-500">
              
              {mode === 'buy' ? (
                <section className="space-y-6">
                  <span className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] block ml-4">Card Denomination</span>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                    {denominations.map(amt => (
                      <button
                        key={amt}
                        onClick={() => setAmount(amt)}
                        className={`h-16 rounded-[22px] border transition-all flex flex-col items-center justify-center ${
                          amount === amt ? 'bg-[#D4A017] border-[#D4A017] text-black shadow-lg' : 'bg-[#121214] border-white/5 text-white'
                        }`}
                      >
                        <span className="text-lg font-black tracking-tighter">${amt}</span>
                      </button>
                    ))}
                  </div>
                </section>
              ) : (
                <section className="space-y-10">
                  <div className="space-y-6">
                    <span className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] block ml-4">Card Face Value</span>
                    <div className="relative group">
                       <input 
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full h-20 bg-[#121214] border border-white/5 rounded-[32px] px-10 text-3xl font-black text-white focus:outline-none focus:border-[#D4A017]/40 transition-all placeholder:text-gray-800"
                       />
                       <span className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-500 font-bold uppercase tracking-widest">USD</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <span className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] block ml-4">Card Secret Code</span>
                    <div className="relative group">
                       <input 
                        type="text"
                        placeholder="XXXX-XXXX-XXXX-XXXX"
                        value={sellCode}
                        onChange={(e) => setSellCode(e.target.value.toUpperCase())}
                        className="w-full h-20 bg-[#121214] border border-white/5 rounded-[32px] px-10 text-xl font-bold tracking-[0.2em] text-[#D4A017] focus:outline-none focus:border-[#D4A017]/40 transition-all placeholder:text-gray-800"
                       />
                    </div>
                  </div>
                </section>
              )}

              {/* Summary Section */}
              <section className="p-8 lg:p-10 bg-[#0A0A0B] rounded-[48px] border border-white/5 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A017]/[0.05] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                 
                 <div className="relative z-10 space-y-8">
                    <div className="flex justify-between items-end">
                       <div className="flex flex-col">
                         <span className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                           {mode === 'buy' ? 'Estimated Total' : 'Estimated Valuation'}
                         </span>
                         <div className="flex items-baseline gap-2">
                           <span className="text-[40px] font-black text-white tracking-tighter">
                             ${mode === 'buy' ? amount || '0' : (parseFloat(amount || '0') * 0.92).toFixed(2)}
                           </span>
                           <span className="text-gray-500 font-bold uppercase text-xs tracking-widest">USD</span>
                         </div>
                       </div>
                       <div className="text-right hidden md:block">
                         <div className="flex items-center gap-2 text-green-500 font-bold text-[10px] uppercase tracking-widest mb-1">
                            <CheckCircle2 size={12}/> Verified Rate
                         </div>
                         <span className="text-gray-500 text-[10px] font-bold">1 {brands[selectedBrand].name} = 0.92 USD</span>
                       </div>
                    </div>

                    <div className="h-px bg-white/5" />

                    <div className="flex items-start gap-4 p-5 bg-white/[0.02] rounded-3xl border border-white/5">
                       <Zap size={18} className="text-[#D4A017] shrink-0 mt-0.5" />
                       <p className="text-[11px] font-medium text-gray-500 leading-relaxed">
                         {mode === 'buy' 
                           ? "Code will be delivered instantly to your registered email and CryptSave vault." 
                           : "Payments are released to your main wallet immediately after code verification (usually < 2 mins)."}
                       </p>
                    </div>

                    <button
                      onClick={onComplete}
                      disabled={mode === 'buy' ? !isBuyReady : !isSellReady}
                      className={`w-full h-20 rounded-[32px] font-black text-lg active:scale-[0.98] transition-all shadow-2xl flex items-center justify-center gap-4 disabled:opacity-20 disabled:grayscale ${
                        mode === 'buy' ? 'bg-[#D4A017] text-black' : 'bg-white text-black'
                      }`}
                    >
                      {mode === 'buy' ? `Purchase $${amount} Card` : `Sell for $${(parseFloat(amount || '0') * 0.92).toFixed(2)}`}
                      <ChevronRight size={22} strokeWidth={3} />
                    </button>
                 </div>
              </section>
            </div>
          )}
        </div>
      </div>
      
      {/* Spacer for mobile safe area */}
      <div className="h-10 shrink-0" />
    </div>
  );
};

export default GiftCardForm;