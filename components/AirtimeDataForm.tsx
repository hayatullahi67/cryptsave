
import React, { useState } from 'react';
// Added Globe to the lucide-react imports
import { ArrowLeft, User, Phone, Zap, ShieldCheck, CheckCircle2, Search, Info, Globe } from 'lucide-react';

interface AirtimeDataFormProps {
  type: 'airtime' | 'data';
  onCancel: () => void;
  onComplete: () => void;
}

const AirtimeDataForm: React.FC<AirtimeDataFormProps> = ({ type, onCancel, onComplete }) => {
  const [phone, setPhone] = useState('');
  const [provider, setProvider] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [airtimeAmount, setAirtimeAmount] = useState('');

  const providers = [
    { name: 'MTN', color: '#FFCC00', text: 'Black' },
    { name: 'Airtel', color: '#ED2127', text: 'White' },
    { name: 'Glo', color: '#4BAE4F', text: 'White' },
    { name: '9Mobile', color: '#006B33', text: 'White' },
  ];

  const airtimeAmounts = ['100', '200', '500', '1000', '2000', '5000'];

  const dataPlans = [
    { id: 1, label: '1.5GB', price: '1200', validity: '30 Days' },
    { id: 2, label: '2GB', price: '1500', validity: '30 Days' },
    { id: 3, label: '3GB', price: '2000', validity: '30 Days' },
    { id: 4, label: '5GB', price: '3000', validity: '30 Days' },
    { id: 5, label: '10GB', price: '5000', validity: '30 Days' },
    { id: 6, label: '40GB', price: '15000', validity: '30 Days' },
  ];

  const handlePhoneChange = (val: string) => {
    if (val.length <= 11) setPhone(val.replace(/\D/g, ''));
  };

  const isComplete = type === 'airtime' 
    ? phone.length >= 10 && airtimeAmount !== '' 
    : phone.length >= 10 && selectedPlan !== null;

  return (
    <div className="h-full w-full bg-black flex flex-col overflow-hidden">
      {/* Header */}
      <header className="px-6 pt-6 pb-4 flex items-center justify-between shrink-0 bg-black/50 backdrop-blur-xl border-b border-white/5 sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={onCancel}
            className="w-10 h-10 -ml-2 flex items-center justify-center text-white active:scale-90 transition-transform"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-white tracking-tight">Buy {type === 'airtime' ? 'Airtime' : 'Data'}</h1>
        </div>
        <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
          <ShieldCheck size={12} className="text-[#D4A017]" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60">Secure Node</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="max-w-3xl mx-auto w-full p-6 space-y-10">
          
          {/* Phone Number Input Section */}
          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">Phone Number</span>
              <button className="text-[#D4A017] flex items-center gap-1.5 text-[11px] font-bold">
                <User size={14} /> Contacts
              </button>
            </div>
            
            <div className="relative group">
              <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#D4A017] transition-all" size={24} />
              <input 
                type="tel"
                placeholder="080 0000 0000"
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                className="w-full h-20 bg-[#121214] rounded-[32px] border border-white/5 pl-16 pr-6 text-2xl font-bold tracking-widest text-white focus:outline-none focus:border-[#D4A017]/40 transition-all placeholder:text-gray-800"
              />
              {phone.length >= 10 && (
                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-green-500">
                  <CheckCircle2 size={24} />
                </div>
              )}
            </div>
          </section>

          {/* Network Provider Section */}
          <section className="space-y-6">
            <span className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">Select Provider</span>
            <div className="grid grid-cols-4 gap-3">
              {providers.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setProvider(idx)}
                  className={`relative flex flex-col items-center justify-center h-24 rounded-[28px] border transition-all duration-300 ${
                    provider === idx 
                    ? 'border-white bg-white/10 scale-[1.05] shadow-xl' 
                    : 'border-white/5 bg-white/[0.02] opacity-50'
                  }`}
                >
                  <div 
                    className="w-10 h-10 rounded-xl mb-2 flex items-center justify-center font-black text-[10px]"
                    style={{ backgroundColor: p.color, color: p.text }}
                  >
                    {p.name}
                  </div>
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">{p.name}</span>
                  {provider === idx && (
                    <div className="absolute top-2 right-2 w-2 h-2 bg-[#D4A017] rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Amount/Plan Selection */}
          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">
                {type === 'airtime' ? 'Amount' : 'Data Plans'}
              </span>
              <div className="flex items-center gap-1.5 opacity-40">
                <Zap size={12} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Instant Activation</span>
              </div>
            </div>

            {type === 'airtime' ? (
              <div className="grid grid-cols-3 gap-4">
                {airtimeAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setAirtimeAmount(amt)}
                    className={`h-16 rounded-[24px] border transition-all flex flex-col items-center justify-center group ${
                      airtimeAmount === amt 
                      ? 'bg-[#D4A017] border-[#D4A017] text-black shadow-lg scale-[1.02]' 
                      : 'bg-[#121214] border-white/5 text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="text-lg font-bold tracking-tight">${amt}</span>
                    <span className={`text-[9px] font-black uppercase tracking-widest opacity-60 ${airtimeAmount === amt ? 'text-black' : 'text-gray-500'}`}>
                      Airtime
                    </span>
                  </button>
                ))}
                <div className="col-span-3 mt-4 relative">
                   <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                   <input 
                    type="number" 
                    placeholder="Other Amount"
                    value={airtimeAmount && !airtimeAmounts.includes(airtimeAmount) ? airtimeAmount : ''}
                    onChange={(e) => setAirtimeAmount(e.target.value)}
                    className="w-full h-16 bg-[#121214] rounded-[24px] border border-white/5 pl-10 pr-6 text-white font-bold focus:outline-none focus:border-[#D4A017]/40 transition-all placeholder:text-gray-700"
                   />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {dataPlans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full p-6 rounded-[32px] border transition-all flex items-center justify-between group ${
                      selectedPlan === plan.id 
                      ? 'bg-white text-black border-white shadow-xl' 
                      : 'bg-[#121214] border-white/5 text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${selectedPlan === plan.id ? 'bg-black/5' : 'bg-white/5'}`}>
                        <Globe size={24} className={selectedPlan === plan.id ? 'text-black' : 'text-[#D4A017]'} />
                      </div>
                      <div className="text-left">
                        <div className="text-lg font-bold tracking-tight">{plan.label} Data</div>
                        <div className={`text-[11px] font-bold ${selectedPlan === plan.id ? 'opacity-50' : 'text-gray-500'}`}>{plan.validity} Validity</div>
                      </div>
                    </div>
                    <div className="text-right">
                       <div className="text-xl font-black tracking-tighter">${plan.price}</div>
                       <div className={`text-[10px] font-bold uppercase tracking-widest ${selectedPlan === plan.id ? 'opacity-50' : 'text-[#D4A017]'}`}>Purchase</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </section>

          <div className="pt-10 pb-20 flex flex-col items-center gap-6">
             <div className="flex items-center gap-2 text-gray-600">
                <Info size={14} />
                <p className="text-[10px] font-bold uppercase tracking-widest">Fee: $0.00 • Network: Automatic</p>
             </div>
             
             <button
               onClick={onComplete}
               disabled={!isComplete}
               className="w-full max-w-sm h-20 bg-[#D4A017] hover:bg-[#EAB308] rounded-[32px] text-black font-black text-lg active:scale-95 transition-all shadow-[0_20px_40px_rgba(212,160,23,0.3)] disabled:opacity-20 disabled:grayscale uppercase tracking-tighter flex items-center justify-center gap-3"
             >
               <span>Proceed to Secure Payment</span>
               <ArrowLeft className="rotate-180" size={20} strokeWidth={3} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirtimeDataForm;
