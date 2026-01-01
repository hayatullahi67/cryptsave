import React, { useState } from 'react';
import { ArrowLeft, Zap, Tv, ShieldCheck, CheckCircle2, Info, ChevronDown, CreditCard, Landmark, Smartphone } from 'lucide-react';

interface UtilityBillFormProps {
  type: 'electricity' | 'tv';
  onCancel: () => void;
  onComplete: () => void;
}

const UtilityBillForm: React.FC<UtilityBillFormProps> = ({ type, onCancel, onComplete }) => {
  const [step, setStep] = useState(1);
  const [provider, setProvider] = useState<number | null>(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [electricityType, setElectricityType] = useState<'prepaid' | 'postpaid'>('prepaid');
  const [amount, setAmount] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  const electricityProviders = [
    { name: 'EKEDC', location: 'Lagos Island', icon: Zap },
    { name: 'IKEDC', location: 'Ikeja', icon: Zap },
    { name: 'AEDC', location: 'Abuja', icon: Zap },
    { name: 'PHED', location: 'Port Harcourt', icon: Zap },
  ];

  const tvProviders = [
    { name: 'DStv', icon: Tv, color: '#0067B1' },
    { name: 'GOtv', icon: Tv, color: '#E31D2D' },
    { name: 'StarTimes', icon: Tv, color: '#F7941D' },
    { name: 'Showmax', icon: Smartphone, color: '#000000' },
  ];

  const tvPlans = [
    { id: 1, label: 'DStv Compact', price: '12,500' },
    { id: 2, label: 'DStv Premium', price: '29,500' },
    { id: 3, label: 'GOtv Max', price: '5,700' },
    { id: 4, label: 'GOtv Jolli', price: '3,950' },
  ];

  const providers = type === 'electricity' ? electricityProviders : tvProviders;

  const isComplete = type === 'electricity' 
    ? provider !== null && accountNumber.length >= 8 && amount !== '' 
    : provider !== null && accountNumber.length >= 8 && selectedPlan !== null;

  return (
    <div className="h-full w-full bg-black flex flex-col overflow-hidden animate-in fade-in duration-500">
      {/* Header */}
      <header className="px-6 py-6 border-b border-white/5 bg-black/50 backdrop-blur-xl flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button onClick={onCancel} className="p-2 -ml-2 text-white active:scale-90 transition-all">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold tracking-tight text-white capitalize">{type} Payment</h1>
        </div>
        <div className="flex items-center gap-2 bg-[#D4A017]/10 px-4 py-2 rounded-full border border-[#D4A017]/20">
          <ShieldCheck size={14} className="text-[#D4A017]" />
          <span className="text-[10px] font-black uppercase tracking-widest text-[#D4A017]">Verified Portal</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6 lg:p-12">
        <div className="max-w-3xl mx-auto space-y-12">
          
          {/* 1. SELECT PROVIDER */}
          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">Select Service Provider</span>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#D4A017]">
                <Info size={14} />
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {providers.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setProvider(idx)}
                  className={`flex flex-col items-center justify-center p-6 rounded-[32px] border transition-all duration-300 group ${
                    provider === idx 
                    ? 'bg-[#D4A017] border-[#D4A017] text-black shadow-xl scale-[1.05]' 
                    : 'bg-[#121214] border-white/5 text-gray-500 hover:border-white/20'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors ${provider === idx ? 'bg-black/10' : 'bg-white/5 group-hover:bg-white/10'}`}>
                    <p.icon size={24} className={provider === idx ? 'text-black' : 'text-[#D4A017]'} />
                  </div>
                  <span className="text-[12px] font-black uppercase tracking-widest">{p.name}</span>
                </button>
              ))}
            </div>
          </section>

          {/* 2. ACCOUNT DETAILS */}
          <section className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">
                {type === 'electricity' ? 'Meter Number' : 'Smartcard / IUC Number'}
              </span>
              {type === 'electricity' && (
                <div className="flex bg-[#121214] p-1 rounded-full border border-white/5">
                  <button 
                    onClick={() => setElectricityType('prepaid')}
                    className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${electricityType === 'prepaid' ? 'bg-[#D4A017] text-black' : 'text-gray-500'}`}
                  >
                    Prepaid
                  </button>
                  <button 
                    onClick={() => setElectricityType('postpaid')}
                    className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${electricityType === 'postpaid' ? 'bg-[#D4A017] text-black' : 'text-gray-500'}`}
                  >
                    Postpaid
                  </button>
                </div>
              )}
            </div>
            
            <div className="relative group">
              <CreditCard className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-[#D4A017] transition-all" size={24} />
              <input 
                type="text"
                placeholder={type === 'electricity' ? "0100 2234 5567" : "1023 4456 789"}
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full h-20 bg-[#121214] border border-white/5 rounded-[32px] pl-16 pr-6 text-xl font-bold tracking-widest text-white focus:outline-none focus:border-[#D4A017]/40 transition-all placeholder:text-gray-800"
              />
              {accountNumber.length >= 8 && (
                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
                   <span className="text-[10px] font-black text-green-500 uppercase tracking-widest hidden md:block">Account Verified</span>
                   <CheckCircle2 size={24} className="text-green-500" />
                </div>
              )}
            </div>
          </section>

          {/* 3. SPECIFY PLAN / AMOUNT */}
          <section className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 delay-100">
            <span className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">
              {type === 'electricity' ? 'Recharge Amount' : 'Select Subscription Package'}
            </span>

            {type === 'electricity' ? (
              <div className="grid grid-cols-3 gap-4">
                {['1000', '2000', '5000', '10000', '20000'].map(amt => (
                   <button 
                    key={amt}
                    onClick={() => setAmount(amt)}
                    className={`h-16 rounded-[24px] border transition-all flex flex-col items-center justify-center ${
                      amount === amt ? 'bg-[#D4A017] border-[#D4A017] text-black' : 'bg-[#121214] border-white/5 text-white'
                    }`}
                   >
                     <span className="text-lg font-bold tracking-tight">${amt}</span>
                   </button>
                ))}
                <div className="col-span-3 lg:col-span-1">
                   <input 
                    type="number" 
                    placeholder="Other Amount"
                    value={amount && !['1000', '2000', '5000', '10000', '20000'].includes(amount) ? amount : ''}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full h-16 bg-[#121214] border border-white/5 rounded-[24px] px-6 text-white font-bold focus:outline-none focus:border-[#D4A017]/40"
                   />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tvPlans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`p-6 rounded-[32px] border transition-all flex items-center justify-between group ${
                      selectedPlan === plan.id ? 'bg-white text-black border-white shadow-xl' : 'bg-[#121214] border-white/5 text-white'
                    }`}
                  >
                    <div className="text-left">
                      <p className="font-black text-[14px] leading-tight mb-1">{plan.label}</p>
                      <p className={`text-[10px] font-bold ${selectedPlan === plan.id ? 'opacity-50' : 'text-[#D4A017]'}`}>${plan.price}</p>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${selectedPlan === plan.id ? 'border-black/10' : 'border-white/5'}`}>
                      <ChevronDown size={14} className={selectedPlan === plan.id ? 'text-black' : 'text-gray-700'} />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* SUBMIT BUTTON */}
          <div className="pt-8 pb-12 flex flex-col items-center gap-6">
             <div className="flex items-center gap-3 p-5 bg-[#D4A017]/5 rounded-[24px] border border-[#D4A017]/10 w-full max-w-xl">
               <Zap size={18} className="text-[#D4A017] shrink-0" />
               <p className="text-[11px] font-bold text-gray-400 leading-relaxed">
                 Utility payments are processed via CryptSave Secure Escrow nodes. Tokens/Receipts are generated instantly.
               </p>
             </div>

             <button
               onClick={onComplete}
               disabled={!isComplete}
               className="w-full max-w-sm h-20 bg-[#D4A017] hover:bg-[#EAB308] rounded-[32px] text-black font-black text-lg active:scale-95 transition-all shadow-[0_20px_40px_rgba(212,160,23,0.3)] disabled:opacity-20 disabled:grayscale uppercase tracking-widest"
             >
               Proceed to Payment
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UtilityBillForm;