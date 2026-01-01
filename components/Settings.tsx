import React, { useState } from 'react';
import { ArrowLeft, Shield, ChevronRight, Fingerprint, ShieldCheck, CheckCircle2, AlertCircle, RefreshCw, Trash2, Key, Info, Lock, Eye, EyeOff } from 'lucide-react';

interface SettingsProps {
  onBack: () => void;
  faceIdEnabled: boolean;
  onStartEnrollment: () => void;
  onDisableFaceId: () => void;
  userPin: string;
  setUserPin: (pin: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ onBack, faceIdEnabled, onStartEnrollment, onDisableFaceId, userPin, setUserPin }) => {
  const [showPin, setShowPin] = useState(false);
  const [isChangingPin, setIsChangingPin] = useState(false);
  const [newPin, setNewPin] = useState('');

  const handleUpdatePin = () => {
    if (newPin.length === 4) {
      setUserPin(newPin);
      setNewPin('');
      setIsChangingPin(false);
    }
  };

  return (
    <div className="h-full bg-black flex flex-col animate-in fade-in duration-1000">
      <header className="px-6 py-10 flex items-center justify-between border-b border-white/5 sticky top-0 bg-black/80 backdrop-blur-3xl z-20 shrink-0">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="w-14 h-14 rounded-2xl bg-white/[0.03] flex items-center justify-center text-white active:scale-90 transition-all border border-white/5 hover:bg-white/[0.05]">
            <ArrowLeft size={28} />
          </button>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter">Vault Terminal</h1>
            <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.4em]">Security Management</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-3 bg-green-500/10 px-6 py-2.5 rounded-full border border-green-500/20">
           <ShieldCheck size={16} className="text-green-500" />
           <span className="text-[10px] font-black uppercase text-green-500 tracking-widest">Shield Active</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6 lg:p-14">
        <div className="max-w-4xl mx-auto space-y-12 pb-24">
          
          {/* Section 1: Biometric Mesh */}
          <section className="space-y-6">
            <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.5em] ml-6 opacity-60">Authentication Layer 01</h3>
            
            <div className={`relative overflow-hidden rounded-[56px] border transition-all duration-700 p-8 lg:p-12 ${
              faceIdEnabled 
              ? 'bg-gradient-to-br from-[#0A0A0B] to-black border-white/5' 
              : 'bg-[#D4A017]/[0.02] border-[#D4A017]/20'
            }`}>
              <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                <div className={`w-24 h-24 rounded-[32px] flex items-center justify-center transition-all duration-700 ${
                  faceIdEnabled ? 'bg-[#D4A017] text-black shadow-2xl' : 'bg-white/5 text-gray-700'
                }`}>
                  <Fingerprint size={48} strokeWidth={2.5} className={faceIdEnabled ? 'animate-pulse' : ''} />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-black text-white mb-2 tracking-tighter">Face ID Recognition</h2>
                  <p className="text-gray-500 font-bold text-sm leading-relaxed mb-6">
                    {faceIdEnabled 
                      ? 'Secure your vault with ultra-fast facial scanning.'
                      : 'Recommended: Enable facial scanning for instant verification.'}
                  </p>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    {faceIdEnabled ? (
                      <button 
                        onClick={onDisableFaceId}
                        className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline"
                      >
                        Remove Biometric Data
                      </button>
                    ) : (
                      <button 
                        onClick={onStartEnrollment}
                        className="bg-[#D4A017] hover:bg-[#FACC15] px-8 py-4 rounded-2xl text-black font-black text-[12px] uppercase tracking-widest transition-all"
                      >
                        Start Face Enrollment
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Vault PIN */}
          <section className="space-y-6">
            <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.5em] ml-6 opacity-60">Authentication Layer 02</h3>
            
            <div className="bg-[#0A0A0B] rounded-[56px] border border-white/5 p-8 lg:p-12 relative overflow-hidden">
               <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                <div className="w-24 h-24 rounded-[32px] bg-white/[0.03] border border-white/5 flex items-center justify-center text-[#D4A017]">
                  <Lock size={40} />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-black text-white mb-2 tracking-tighter">Security Vault PIN</h2>
                  <p className="text-gray-500 font-bold text-sm leading-relaxed mb-6">
                    A 4-digit numeric code required for high-value transfers and withdrawals.
                  </p>
                  
                  {!isChangingPin ? (
                    <div className="flex items-center justify-center md:justify-start gap-6">
                      <div className="flex items-center gap-4 bg-black p-4 rounded-2xl border border-white/5">
                        <span className="text-white font-mono text-xl tracking-[0.5em] font-black">
                          {showPin ? userPin : '••••'}
                        </span>
                        <button onClick={() => setShowPin(!showPin)} className="text-gray-600 hover:text-white transition-colors">
                          {showPin ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      <button 
                        onClick={() => setIsChangingPin(true)}
                        className="text-[10px] font-black text-[#D4A017] uppercase tracking-widest hover:underline"
                      >
                        Change PIN
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col md:flex-row items-center gap-4">
                      <input 
                        type="password"
                        maxLength={4}
                        placeholder="New 4-Digit PIN"
                        value={newPin}
                        onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))}
                        className="bg-black border border-[#D4A017]/50 rounded-2xl px-6 py-4 text-white font-mono tracking-[1em] text-center w-full md:w-[200px] focus:outline-none"
                      />
                      <div className="flex gap-2 w-full md:w-auto">
                        <button 
                          onClick={handleUpdatePin}
                          className="flex-1 md:flex-none bg-white text-black font-black text-[10px] uppercase px-6 py-4 rounded-2xl"
                        >
                          Save
                        </button>
                        <button 
                          onClick={() => setIsChangingPin(false)}
                          className="flex-1 md:flex-none bg-white/5 text-white font-black text-[10px] uppercase px-6 py-4 rounded-2xl"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Educational Footer */}
          <section className="bg-white/[0.02] p-8 rounded-[40px] border border-white/5 flex items-start gap-6">
             <Info className="text-[#D4A017] shrink-0" size={24} />
             <div className="space-y-2">
                <h4 className="text-white font-bold text-sm">How Security Works</h4>
                <p className="text-gray-600 text-xs leading-relaxed">
                  CryptSave uses a hybrid model. Your **Biometric Mesh** is used for convenience and daily access. Your **Vault PIN** acts as a final signature for outgoing funds. Both are encrypted locally using AES-256 protocols.
                </p>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;