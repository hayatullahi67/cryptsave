import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, CreditCard, CheckCircle2, Zap, Globe, Sparkles, Award, Star, Info, Wallet } from 'lucide-react';

interface CardApplicationProps {
  onCancel: () => void;
  onComplete: () => void;
}

const CardApplication: React.FC<CardApplicationProps> = ({ onCancel, onComplete }) => {
  const [tier, setTier] = useState<'virtual' | 'physical'>('physical');
  const [isLoading, setIsLoading] = useState(false);

  const cardTiers = [
    {
      id: 'virtual',
      label: 'Virtual Card',
      price: '$10.00',
      description: 'Instant generation for online spending.',
      features: ['Apple Pay Support', 'Instant Freeze', 'No Monthly Fees']
    },
    {
      id: 'physical',
      label: 'Elite Metal',
      price: '$50.00',
      description: 'Heavy gold-plated physical card.',
      features: ['Global ATM Access', '3% Cashback', 'Airport Lounge Access', 'RFID Protection']
    }
  ];

  const handleApply = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onComplete();
    }, 1500);
  };

  return (
    <div className="h-full bg-black flex flex-col animate-in fade-in duration-1000">
      <header className="px-6 py-10 flex items-center justify-between border-b border-white/5 sticky top-0 bg-black/80 backdrop-blur-3xl z-20 shrink-0">
        <div className="flex items-center gap-6">
          <button onClick={onCancel} className="w-14 h-14 rounded-2xl bg-white/[0.03] flex items-center justify-center text-white active:scale-90 transition-all border border-white/5">
            <ArrowLeft size={28} />
          </button>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter">Elite Card</h1>
            <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.4em]">Card Provisioning</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-3 bg-[#D4A017]/10 px-6 py-2.5 rounded-full border border-[#D4A017]/20">
           <ShieldCheck size={16} className="text-[#D4A017]" />
           <span className="text-[10px] font-black uppercase text-[#D4A017] tracking-widest">Visa Platinum</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6 lg:p-14">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 pb-24">
          
          {/* Left: Card Visualizer */}
          <div className="lg:col-span-5 space-y-12">
            <div className="relative group">
              {/* Card Surface */}
              <div className="aspect-[1.586/1] w-full rounded-[32px] p-10 bg-gradient-to-br from-[#D4A017] via-[#FACC15] to-[#D4A017] text-black shadow-[0_40px_100px_rgba(212,160,23,0.3)] relative overflow-hidden transition-all duration-700 group-hover:scale-[1.02] group-hover:-rotate-1">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                       <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">CryptSave Elite</span>
                       <Zap size={28} className="mt-2" />
                    </div>
                    <div className="w-14 h-10 bg-black/5 rounded-lg backdrop-blur-md flex items-center justify-center border border-black/10">
                      <div className="w-8 h-6 bg-yellow-400/50 rounded flex items-center justify-center text-[6px] font-bold">CHIP</div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-2xl font-mono tracking-widest font-bold">•••• •••• •••• 8890</p>
                    <div className="flex justify-between items-end pt-4">
                      <div className="flex flex-col">
                        <span className="text-[8px] font-black uppercase opacity-60">Card Holder</span>
                        <span className="text-sm font-black uppercase tracking-widest">Abubakar Ahmed</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[8px] font-black uppercase opacity-60">Expires</span>
                        <span className="text-sm font-black uppercase tracking-widest">12/28</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Physical/Virtual Badge */}
              <div className="absolute -bottom-4 -right-4 bg-black border border-white/10 px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-3">
                 <div className="w-10 h-10 bg-[#D4A017] rounded-xl flex items-center justify-center text-black">
                    <Star size={20} fill="currentColor" />
                 </div>
                 <div className="flex flex-col">
                   <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Selected Tier</span>
                   <span className="text-white font-bold tracking-tight">{tier === 'physical' ? 'Elite Metal' : 'Digital Virtual'}</span>
                 </div>
              </div>
            </div>

            <div className="bg-[#080808] p-10 rounded-[48px] border border-white/5 space-y-8">
               <h3 className="text-white font-bold text-lg tracking-tight">Elite Benefits</h3>
               <div className="grid grid-cols-1 gap-6">
                  {[
                    { icon: Globe, label: 'No FX Fees', desc: 'Spend anywhere in the world at real rates.' },
                    { icon: Award, label: '3.0% Cashback', desc: 'Earn crypto rewards on every transaction.' },
                    { icon: ShieldCheck, label: 'Vault Protection', desc: 'Secure your offline funds with hardware-grade keys.' }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center text-[#D4A017] border border-white/5">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm tracking-tight">{item.label}</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Right: Application Process */}
          <div className="lg:col-span-7 space-y-10">
            <section className="space-y-6">
              <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.5em] ml-6 opacity-60">Select Card Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cardTiers.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTier(t.id as any)}
                    className={`p-10 rounded-[48px] border transition-all duration-500 text-left flex flex-col gap-6 relative overflow-hidden group ${
                      tier === t.id 
                      ? 'bg-white text-black border-white shadow-2xl scale-[1.02]' 
                      : 'bg-[#0A0A0B] border-white/5 text-white hover:bg-white/[0.02]'
                    }`}
                  >
                    {tier === t.id && (
                      <div className="absolute top-6 right-6 w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">
                        <CheckCircle2 size={18} />
                      </div>
                    )}
                    
                    <div className="space-y-2">
                       <span className={`text-[11px] font-black uppercase tracking-[0.2em] ${tier === t.id ? 'opacity-50' : 'text-[#D4A017]'}`}>
                         Tier {t.id === 'virtual' ? '01' : '02'}
                       </span>
                       <h4 className="text-2xl font-black tracking-tighter">{t.label}</h4>
                    </div>
                    
                    <div className="space-y-3">
                      {t.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle2 size={14} className={tier === t.id ? 'opacity-40' : 'text-gray-700'} />
                          <span className={`text-xs font-bold ${tier === t.id ? 'opacity-70' : 'text-gray-500'}`}>{f}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-black/5">
                       <span className="text-3xl font-black tracking-tighter">{t.price}</span>
                       <span className="ml-2 text-[10px] font-black uppercase tracking-widest opacity-40">One-time fee</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section className="bg-white/[0.02] p-10 rounded-[48px] border border-white/5 space-y-8">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-[#D4A017]/10 flex items-center justify-center text-[#D4A017]">
                        <Wallet size={24} />
                     </div>
                     <div>
                        <h4 className="text-white font-bold tracking-tight">Payment Method</h4>
                        <p className="text-gray-500 text-xs">CryptSave Main Wallet Balance</p>
                     </div>
                  </div>
                  <div className="text-right">
                    <span className="block text-white font-black text-lg tracking-tight">$7,890.09</span>
                    <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Available</span>
                  </div>
               </div>

               <div className="flex items-start gap-4 p-6 bg-black/40 rounded-3xl border border-white/5">
                  <Info size={18} className="text-[#D4A017] shrink-0 mt-0.5" />
                  <p className="text-[11px] font-medium text-gray-500 leading-relaxed">
                    By clicking Apply, you authorize CryptSave to deduct the one-time provisioning fee from your wallet. Physical cards are processed via DHL Global and typically arrive within 5-7 business days.
                  </p>
               </div>

               <button
                onClick={handleApply}
                disabled={isLoading}
                className="w-full h-24 bg-[#D4A017] hover:bg-[#FACC15] rounded-[32px] text-black font-black text-xl active:scale-[0.98] transition-all shadow-[0_20px_50px_rgba(212,160,23,0.3)] flex items-center justify-center gap-4 group disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Confirm & Pay {tier === 'virtual' ? '$10.00' : '$50.00'}</span>
                    <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
                  </>
                )}
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardApplication;