import React, { useState } from 'react';
import { User, Mail, Lock, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface SignupProps {
  onSignup: () => void;
  onGoToLogin: () => void;
}

const Signup: React.FC<SignupProps> = ({ onSignup, onGoToLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSignup();
    }, 1500);
  };

  return (
    <div className="min-h-full bg-[#050505] flex flex-col p-8 lg:p-20 relative overflow-hidden animate-in fade-in slide-in-from-right-10 duration-1000">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4A017]/[0.04] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-md w-full mx-auto flex flex-col h-full">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-[#D4A017] rounded-2xl flex items-center justify-center text-black shadow-lg">
               <ShieldCheck size={26} strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">Crypt<span className="text-[#D4A017]">Save</span></span>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter mb-4 leading-none">Security First.</h1>
          <p className="text-gray-500 font-bold text-sm tracking-tight leading-relaxed">Join 2M+ users protecting their future.</p>
        </header>

        <form onSubmit={handleSignup} className="space-y-6 flex-1">
          <div className="grid grid-cols-1 gap-6">
            <div className="relative">
              <input 
                type="text" required placeholder=" "
                className="w-full h-20 bg-white/[0.03] border border-white/5 rounded-[32px] pl-16 pr-6 text-white font-bold text-lg focus:outline-none focus:border-[#D4A017]/40 focus:bg-white/[0.05] transition-all peer"
              />
              <label className="absolute left-16 top-1/2 -translate-y-1/2 text-gray-700 font-bold text-sm pointer-events-none transition-all peer-focus:top-4 peer-focus:text-[10px] peer-focus:text-[#D4A017] peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-4 peer-[:not(:placeholder-shown)]:text-[10px]">Full Name</label>
              <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-700 peer-focus:text-[#D4A017] transition-colors" size={22} />
            </div>

            <div className="relative">
              <input 
                type="email" required placeholder=" "
                className="w-full h-20 bg-white/[0.03] border border-white/5 rounded-[32px] pl-16 pr-6 text-white font-bold text-lg focus:outline-none focus:border-[#D4A017]/40 focus:bg-white/[0.05] transition-all peer"
              />
              <label className="absolute left-16 top-1/2 -translate-y-1/2 text-gray-700 font-bold text-sm pointer-events-none transition-all peer-focus:top-4 peer-focus:text-[10px] peer-focus:text-[#D4A017] peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-4 peer-[:not(:placeholder-shown)]:text-[10px]">Work Email</label>
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-700 peer-focus:text-[#D4A017] transition-colors" size={22} />
            </div>

            <div className="relative">
              <input 
                type="password" required placeholder=" "
                className="w-full h-20 bg-white/[0.03] border border-white/5 rounded-[32px] pl-16 pr-6 text-white font-bold text-lg focus:outline-none focus:border-[#D4A017]/40 focus:bg-white/[0.05] transition-all peer"
              />
              <label className="absolute left-16 top-1/2 -translate-y-1/2 text-gray-700 font-bold text-sm pointer-events-none transition-all peer-focus:top-4 peer-focus:text-[10px] peer-focus:text-[#D4A017] peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-4 peer-[:not(:placeholder-shown)]:text-[10px]">Create Password</label>
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-700 peer-focus:text-[#D4A017] transition-colors" size={22} />
            </div>
          </div>

          <div className="flex items-center gap-3 p-6 bg-white/[0.02] rounded-[28px] border border-white/5">
             <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                <CheckCircle2 size={20} />
             </div>
             <p className="text-[11px] font-bold text-gray-500 leading-snug">
               Bank-grade encryption (AES-256) enabled for your personal data and financial assets.
             </p>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full h-20 bg-white text-black font-black text-lg rounded-[32px] shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-4"
          >
            {isLoading ? (
              <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Initialize Account
                <ArrowRight size={22} strokeWidth={3} />
              </>
            )}
          </button>
        </form>

        <footer className="mt-auto pt-12 text-center">
          <p className="text-gray-500 font-bold text-sm">
            Already have an account? <button onClick={onGoToLogin} className="text-[#D4A017] font-black hover:underline uppercase tracking-widest ml-1">Sign In</button>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Signup;