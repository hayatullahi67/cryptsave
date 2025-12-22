import React, { useState } from 'react';
import { ArrowLeft, Landmark, User, Cpu, ChevronRight, CheckCircle2, ShieldCheck, Zap, Delete } from 'lucide-react';

interface TransferFormProps {
  onCancel: () => void;
  onComplete: () => void;
}

const TransferForm: React.FC<TransferFormProps> = ({ onCancel, onComplete }) => {
  const [step, setStep] = useState(1);
  const [type, setType] = useState<'bank' | 'id' | 'crypto'>('bank');
  const [amount, setAmount] = useState('0');
  const [recipient, setRecipient] = useState('');

  const handleKeypad = (val: string) => {
    if (val === 'delete') {
      setAmount(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
    } else if (val === '.') {
      if (!amount.includes('.')) setAmount(prev => prev + '.');
    } else {
      setAmount(prev => prev === '0' ? val : prev + val);
    }
  };

  const isNextDisabled = () => {
    if (step === 1) return recipient.length < 5;
    if (step === 2) return amount === '0' || amount === '0.';
    return false;
  };

  const renderStep1 = () => (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex bg-[#121214] p-1.5 rounded-[24px] border border-white/5">
        {[
          { id: 'bank', label: 'Bank', icon: Landmark },
          { id: 'id', label: 'App ID', icon: User },
          { id: 'crypto', label: 'Crypto', icon: Cpu },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setType(t.id as any)}
            className={`flex-1 py-4 rounded-[20px] flex flex-col items-center gap-2 transition-all ${
              type === t.id ? 'bg-[#D4A017] text-black shadow-lg' : 'text-gray-500'
            }`}
          >
            <t.icon size={20} />
            <span className="text-[10px] font-black uppercase tracking-widest">{t.label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-6">
        <label className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">Recipient Details</label>
        <div className="relative group">
          <input
            type="text"
            placeholder={
              type === 'bank' ? 'Account Number' : 
              type === 'id' ? 'CryptSave @Username' : 'Wallet Address (0x...)'
            }
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full h-20 bg-[#121214] rounded-[32px] border border-white/5 px-8 text-xl font-bold text-white focus:outline-none focus:border-[#D4A017]/40 transition-all placeholder:text-gray-800"
          />
          {recipient.length > 5 && (
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-green-500 flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">Verified</span>
              <CheckCircle2 size={24} />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="flex flex-col items-center text-center space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <span className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">Specify Amount</span>
        <div className="flex items-baseline justify-center mt-6">
          <span className="text-4xl font-black text-[#D4A017] mr-3">$</span>
          <span className="text-[80px] lg:text-[100px] font-black tracking-tighter tabular-nums leading-none">
            {amount}
          </span>
          <div className="w-1 h-12 lg:h-16 bg-[#D4A017] ml-4 animate-pulse rounded-full" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-y-10 gap-x-12 max-w-sm mx-auto w-full">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'delete'].map((key) => (
          <button
            key={key}
            onClick={() => handleKeypad(key)}
            className="h-10 flex items-center justify-center text-3xl font-bold text-white/80 hover:text-[#D4A017] active:scale-75 transition-all"
          >
            {key === 'delete' ? <Delete size={26} className="opacity-40" /> : key}
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-[#0A0A0B] rounded-[48px] p-8 border border-white/[0.05] shadow-2xl space-y-8">
        <div className="flex flex-col items-center gap-4">
           <div className="w-20 h-20 bg-[#D4A017]/10 rounded-[28px] flex items-center justify-center text-[#D4A017]">
             <ShieldCheck size={40} />
           </div>
           <h3 className="text-xl font-bold text-white tracking-tight">Review Transfer</h3>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between p-5 bg-white/5 rounded-2xl border border-white/5">
            <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Recipient</span>
            <span className="text-white font-bold">{recipient}</span>
          </div>
          <div className="flex justify-between p-5 bg-white/5 rounded-2xl border border-white/5">
            <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Network Fee</span>
            <span className="text-green-500 font-bold">$0.00</span>
          </div>
          <div className="flex justify-between p-5 bg-[#D4A017]/5 rounded-2xl border border-[#D4A017]/10">
            <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Total to Send</span>
            <span className="text-[#D4A017] font-bold text-xl">${amount}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl text-[10px] text-gray-500 font-bold leading-relaxed">
          <Zap size={14} className="text-[#D4A017] shrink-0" />
          <span>Transactions are finalized instantly on the CryptSave Secure Node. Ensure the recipient details are correct.</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full w-full bg-black flex flex-col overflow-hidden">
      <header className="px-6 py-6 flex items-center justify-between border-b border-white/5 sticky top-0 z-20 bg-black/80 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <button onClick={step > 1 ? () => setStep(step - 1) : onCancel} className="text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Transfer Funds</h1>
        </div>
        <div className="flex gap-1.5">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${step === i ? 'w-8 bg-[#D4A017]' : 'w-1.5 bg-white/10'}`} />
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6">
        <div className="max-w-xl mx-auto py-10">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>
      </div>

      <footer className="p-8 border-t border-white/5 bg-black">
        <button
          onClick={step < 3 ? () => setStep(step + 1) : onComplete}
          disabled={isNextDisabled()}
          className="w-full max-w-xl mx-auto h-20 bg-[#D4A017] hover:bg-[#FACC15] rounded-[32px] text-black font-black text-lg shadow-2xl flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-20 disabled:grayscale"
        >
          <span>{step === 3 ? 'Confirm & Send' : 'Continue'}</span>
          <ChevronRight size={20} strokeWidth={3} />
        </button>
      </footer>
    </div>
  );
};

export default TransferForm;