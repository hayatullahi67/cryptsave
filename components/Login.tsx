import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Fingerprint, Eye, EyeOff, ShieldCheck, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
  onGoToSignup: () => void;
  onQuickFaceLogin: () => void;
  isFaceIdEnrolled: boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin, onGoToSignup, onQuickFaceLogin, isFaceIdEnrolled }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1200);
  };

  return (
    <div className="min-h-full bg-[#050505] flex flex-col p-8 lg:p-20 relative overflow-hidden animate-in fade-in duration-1000">
      {/* Premium Background Effects */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#D4A017]/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-white/[0.02] rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-md w-full mx-auto flex flex-col h-full">
        <header className="mb-14">
          <div className="flex items-center gap-3 mb-12 group cursor-pointer">
            <div className="w-12 h-12 bg-[#D4A017] rounded-2xl flex items-center justify-center text-black shadow-[0_0_30px_rgba(212,160,23,0.3)] group-hover:scale-110 transition-transform duration-500">
               <ShieldCheck size={26} strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">Crypt<span className="text-[#D4A017]">Save</span></span>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter mb-4 leading-none">Elevate Your<br />Wealth.</h1>
          <p className="text-gray-500 font-bold text-sm tracking-tight leading-relaxed">Sign in to your secure digital vault.</p>
        </header>

        <form onSubmit={handleLogin} className="space-y-8 flex-1">
          <div className="space-y-2">
            <div className="relative">
              <input 
                type="email" 
                required
                className="w-full h-20 bg-white/[0.03] border border-white/5 rounded-[32px] pl-16 pr-6 text-white font-bold text-lg focus:outline-none focus:border-[#D4A017]/40 focus:bg-white/[0.05] transition-all placeholder:text-gray-800 peer"
                placeholder=" "
              />
              <label className="absolute left-16 top-1/2 -translate-y-1/2 text-gray-700 font-bold text-sm pointer-events-none transition-all peer-focus:top-4 peer-focus:text-[10px] peer-focus:text-[#D4A017] peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-4 peer-[:not(:placeholder-shown)]:text-[10px]">Email Address</label>
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-700 peer-focus:text-[#D4A017] transition-colors" size={22} />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                required
                className="w-full h-20 bg-white/[0.03] border border-white/5 rounded-[32px] pl-16 pr-16 text-white font-bold text-lg focus:outline-none focus:border-[#D4A017]/40 focus:bg-white/[0.05] transition-all placeholder:text-gray-800 peer"
                placeholder=" "
              />
              <label className="absolute left-16 top-1/2 -translate-y-1/2 text-gray-700 font-bold text-sm pointer-events-none transition-all peer-focus:top-4 peer-focus:text-[10px] peer-focus:text-[#D4A017] peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-4 peer-[:not(:placeholder-shown)]:text-[10px]">Password</label>
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-700 peer-focus:text-[#D4A017] transition-colors" size={22} />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-700 hover:text-white transition-all"
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>
            <div className="flex justify-end pr-4">
              <button type="button" className="text-[11px] font-black text-[#D4A017] uppercase tracking-widest hover:underline">Forgot Password?</button>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-4">
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full h-20 bg-[#D4A017] hover:bg-[#FACC15] text-black font-black text-lg rounded-[32px] shadow-[0_20px_50px_rgba(212,160,23,0.3)] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Sign In to Vault
                  <ArrowRight size={22} strokeWidth={3} />
                </>
              )}
            </button>

            <div className="relative">
              <button 
                type="button"
                onClick={onQuickFaceLogin}
                className={`w-full h-20 border rounded-[32px] flex items-center justify-center gap-4 text-white font-black text-sm uppercase tracking-widest transition-all active:scale-95 group overflow-hidden ${
                  isFaceIdEnrolled 
                  ? 'bg-white/[0.05] border-white/10 hover:bg-white/10' 
                  : 'bg-red-500/[0.02] border-red-500/10 opacity-60 grayscale'
                }`}
              >
                 <div className="relative">
                    <Fingerprint size={28} className={`${isFaceIdEnrolled ? 'text-[#D4A017] animate-pulse' : 'text-gray-700'}`} />
                    {isFaceIdEnrolled && (
                      <div className="absolute inset-0 bg-[#D4A017]/20 blur-lg rounded-full animate-ping" />
                    )}
                 </div>
                 <span>Quick Face Login</span>
                 
                 {isFaceIdEnrolled && (
                   <div className="absolute inset-x-0 bottom-0 h-1 bg-[#D4A017]/20">
                     <div className="h-full bg-[#D4A017] animate-loading-bar w-1/3" />
                   </div>
                 )}
              </button>
              
              {!isFaceIdEnrolled && (
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 whitespace-nowrap">
                   <AlertCircle size={12} className="text-red-500/60" />
                   <span className="text-[9px] font-bold text-gray-700 uppercase tracking-widest">Face ID Not Enrolled</span>
                </div>
              )}
            </div>
          </div>
        </form>

        <footer className="mt-auto pt-12 text-center">
          <p className="text-gray-500 font-bold text-sm">
            New to CryptSave? <button onClick={onGoToSignup} className="text-[#D4A017] font-black hover:underline uppercase tracking-widest ml-1">Create Account</button>
          </p>
        </footer>
      </div>
      
      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        .animate-loading-bar {
          animation: loading-bar 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;