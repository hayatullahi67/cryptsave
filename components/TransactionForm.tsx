
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Delete, Smartphone, Landmark, Wallet, 
  CreditCard, Apple, ShieldCheck, Zap, Globe, 
  Info, ChevronRight, CheckCircle2, Cpu
} from 'lucide-react';

interface TransactionFormProps {
  type: 'save' | 'withdraw';
  onCancel: () => void;
  onComplete: (success: boolean) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ type, onCancel, onComplete }) => {
  const [amount, setAmount] = useState('0');
  const [method, setMethod] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (amount !== '0') {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 300);
      return () => clearTimeout(timer);
    }
  }, [amount]);

  const handleKeypad = (val: string) => {
    if (val === 'delete') {
      setAmount(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
    } else if (val === '.') {
      if (!amount.includes('.')) setAmount(prev => prev + '.');
    } else {
      setAmount(prev => prev === '0' ? val : prev + val);
    }
  };

  const quickAmounts = ['100', '500', '1000', '5000'];

  const methods = type === 'save' 
    ? [
        { label: 'Main Wallet', icon: Wallet, meta: 'Balance: $12.4k', speed: 'Instant' },
        { label: 'Apple Pay', icon: Apple, meta: 'Verified Account', speed: 'Instant' },
        { label: 'Bank Transfer', icon: Landmark, meta: 'Chase Bank', speed: '2-3 Days' },
        { label: 'Credit Card', icon: CreditCard, meta: 'Visa **** 4421', speed: 'Instant' }
      ]
    : [
        { label: 'Checking Account', icon: Landmark, meta: 'Primary Bank', speed: '1-2 Days' },
        { label: 'Visa Card', icon: CreditCard, meta: 'Debit **** 8890', speed: 'Instant' },
        { label: 'PayPal', icon: Globe, meta: 'ahmed@me.com', speed: 'Instant' },
        { label: 'Crypto Node', icon: Cpu, meta: 'USDT Network', speed: '5 Mins' }
      ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-0 lg:p-10">
      
      {/* THE VAULT TERMINAL CONTAINER */}
      <div className="w-full h-full lg:h-auto lg:max-w-[1100px] flex flex-col bg-[#050505] lg:rounded-[40px] lg:border lg:border-white/10 lg:shadow-[0_0_100px_rgba(212,160,23,0.15)] relative overflow-hidden">
        
        {/* Terminal Top Bar */}
        <div className="flex items-center justify-between px-6 lg:px-10 py-5 bg-white/[0.02] border-b border-white/5 relative z-20">
          <button 
            onClick={onCancel}
            className="flex items-center gap-2 text-gray-400 hover:text-[#D4A017] transition-all group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Exit Terminal</span>
          </button>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2">
              <Zap size={14} className="text-[#D4A017]" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">Latency: 14ms</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
              <ShieldCheck size={12} className="text-green-500" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60">AES-256 Encrypted</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row flex-1 relative overflow-hidden">
          
          {/* LEFT PANEL: Transaction Input */}
          <div className="flex-1 p-6 lg:p-14 flex flex-col border-r border-white/5 bg-black/20">
            <div className="mb-12 text-center lg:text-left relative">
               <div className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4">
                 Specify {type === 'save' ? 'Deposit' : 'Withdrawal'} Amount
               </div>
               
               <div className="flex items-baseline justify-center lg:justify-start relative">
                 <div className={`absolute -inset-10 bg-[#D4A017] blur-[100px] opacity-10 transition-all ${isTyping ? 'scale-110 opacity-20' : 'scale-100'}`} />
                 <span className="text-3xl lg:text-5xl font-black text-[#D4A017] mr-3">$</span>
                 <span className="text-[70px] lg:text-[100px] font-black tracking-tighter tabular-nums leading-none">
                   {amount}
                 </span>
                 <span className={`w-1 h-12 lg:h-16 bg-[#D4A017] ml-3 rounded-full animate-pulse transition-opacity ${amount === '0' ? 'opacity-100' : 'opacity-0'}`} />
               </div>

               <div className="flex flex-wrap gap-2 mt-8 justify-center lg:justify-start">
                 {quickAmounts.map(val => (
                   <button 
                    key={val}
                    onClick={() => setAmount(val)}
                    className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-[11px] font-black text-gray-400 hover:border-[#D4A017] hover:text-white transition-all active:scale-95"
                   >
                     +${val}
                   </button>
                 ))}
               </div>
            </div>

            <div className="grid grid-cols-3 gap-y-6 gap-x-12 lg:gap-x-16 max-w-sm mx-auto lg:mx-0 mt-auto pb-8 lg:pb-0">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'delete'].map((key) => (
                <button
                  key={key}
                  onClick={() => handleKeypad(key)}
                  className="h-10 flex items-center justify-center text-2xl lg:text-3xl font-bold text-white/80 hover:text-[#D4A017] active:scale-75 transition-all"
                >
                  {key === 'delete' ? <Delete size={24} className="opacity-40" /> : key}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT PANEL: Execution Path & Summary */}
          <div className="w-full lg:w-[440px] bg-white/[0.015] flex flex-col relative overflow-hidden">
            
            <div className="p-6 lg:p-10 flex flex-col flex-1 min-h-0 overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">Execution Path</span>
                <Info size={14} className="text-gray-700" />
              </div>

              {/* FIXED SCROLL AREA: Now correctly handles horizontal overflow for all methods */}
              <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible lg:overflow-y-auto pb-6 lg:pb-0 snap-x lg:snap-none custom-scrollbar-minimal">
                {methods.map((m, idx) => {
                  const Icon = m.icon;
                  const isActive = method === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setMethod(idx)}
                      className={`flex-shrink-0 w-[260px] lg:w-full p-5 rounded-[28px] border transition-all duration-300 text-left flex items-center gap-4 snap-center ${
                        isActive 
                        ? 'bg-white text-black border-white shadow-xl scale-[1.02]' 
                        : 'bg-white/5 border-white/[0.05] text-white hover:bg-white/10'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                        isActive ? 'bg-black/5' : 'bg-white/5'
                      }`}>
                        <Icon size={24} className={isActive ? 'text-black' : 'text-white'} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-[14px] leading-tight truncate">{m.label}</p>
                        <p className={`text-[10px] font-bold opacity-50`}>{m.meta}</p>
                      </div>
                      <div className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md shrink-0 ${
                        isActive ? 'bg-black/5' : 'bg-white/5 text-[#D4A017]'
                      }`}>
                        {m.speed}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Bottom Summary Section */}
            <div className="p-6 lg:p-10 space-y-8 bg-black/60 border-t border-white/5 mt-auto relative z-10 flex flex-col items-center">
               <div className="w-full space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-gray-500">Service Fee</span>
                    <span className="text-green-500">0.00%</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-gray-500">Security Check</span>
                    <span className="text-white">Passed</span>
                  </div>
                  <div className="h-px bg-white/5 w-full" />
                  <div className="flex justify-between items-end pt-2">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Confirmed Total</span>
                      <span className="text-3xl font-black text-white">${amount}</span>
                    </div>
                    <CheckCircle2 size={32} className="text-[#D4A017] opacity-20" />
                  </div>
               </div>

               {/* REFINED ACTION BUTTON */}
               <button
                onClick={() => onComplete(true)} 
                disabled={amount === '0' || amount === '0.'}
                className="w-[92%] h-22 lg:h-24 bg-[#D4A017] hover:bg-[#FACC15] rounded-[32px] text-black font-black text-[17px] active:scale-95 transition-all shadow-[0_20px_60px_rgba(212,160,23,0.3)] disabled:opacity-20 disabled:grayscale uppercase tracking-tighter"
              >
                Proceed to Secure {type === 'save' ? 'Deposit' : 'Withdrawal'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar-minimal::-webkit-scrollbar {
          height: 4px;
          width: 4px;
        }
        .custom-scrollbar-minimal::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.02);
        }
        .custom-scrollbar-minimal::-webkit-scrollbar-thumb {
          background: rgba(212, 160, 23, 0.3);
          border-radius: 10px;
        }
      `}</style>

      {/* Corporate Footnote */}
      <div className="hidden lg:flex items-center gap-10 mt-12 opacity-10 grayscale">
        <div className="flex items-center gap-2">
          <Globe size={12} />
          <span className="text-[9px] font-black uppercase tracking-[0.4em]">Multi-Region Infrastructure</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck size={12} />
          <span className="text-[9px] font-black uppercase tracking-[0.4em]">PCI DSS Certified</span>
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;
