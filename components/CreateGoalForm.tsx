import React, { useState } from 'react';
import { 
  ArrowLeft, Delete, Home, Car, Gift, 
  Plane, Smartphone, Heart, Plus, Target,
  CheckCircle2, Info, Sparkles
} from 'lucide-react';

interface CreateGoalFormProps {
  onCancel: () => void;
  onComplete: () => void;
}

const CreateGoalForm: React.FC<CreateGoalFormProps> = ({ onCancel, onComplete }) => {
  const [step, setStep] = useState(1);
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('0');
  const [selectedIcon, setSelectedIcon] = useState(0);

  const icons = [
    { id: 'home', icon: Home, label: 'Property' },
    { id: 'car', icon: Car, label: 'Vehicle' },
    { id: 'gift', icon: Gift, label: 'Gifts' },
    { id: 'travel', icon: Plane, label: 'Travel' },
    { id: 'tech', icon: Smartphone, label: 'Gadgets' },
    { id: 'health', icon: Heart, label: 'Wellness' }
  ];

  const handleKeypad = (val: string) => {
    if (val === 'delete') {
      setTargetAmount(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
    } else if (val === '.') {
      if (!targetAmount.includes('.')) setTargetAmount(prev => prev + '.');
    } else {
      setTargetAmount(prev => prev === '0' ? val : prev + val);
    }
  };

  const isNextDisabled = () => {
    if (step === 1) return goalName.trim().length < 2;
    if (step === 2) return targetAmount === '0' || targetAmount === '0.';
    return false;
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-0 lg:p-10">
      {/* THE TERMINAL CONTAINER - Now with overflow support */}
      <div className="w-full h-full lg:h-auto lg:max-h-[90vh] lg:max-w-[1000px] flex flex-col bg-[#050505] lg:rounded-[48px] lg:border lg:border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.8)] relative overflow-y-auto no-scrollbar animate-in fade-in zoom-in-95 duration-500">
        
        {/* Decorative Background Elements */}
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-[#D4A017]/[0.05] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-[#D4A017]/[0.02] rounded-full blur-[80px] pointer-events-none" />

        {/* Top Header - Fixed at top of the scrollable container */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-6 lg:px-10 py-6 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl">
          <button 
            onClick={step > 1 ? () => setStep(step - 1) : onCancel}
            className="flex items-center gap-2 text-gray-500 hover:text-white transition-all group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{step > 1 ? 'Back' : 'Cancel'}</span>
          </button>
          
          <div className="flex gap-1.5">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${step === i ? 'w-8 bg-[#D4A017]' : 'w-1.5 bg-white/10'}`} />
            ))}
          </div>

          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#D4A017]">
             <Sparkles size={16} />
          </div>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row relative z-10">
          
          {/* Main Interaction Area */}
          <div className="flex-1 p-8 lg:p-16 flex flex-col justify-center border-r border-white/5 min-h-[500px]">
            {step === 1 && (
              <div className="animate-in slide-in-from-bottom-8 duration-500">
                <span className="text-[#D4A017] text-[11px] font-black uppercase tracking-[0.4em] mb-4 block">New Mission</span>
                <h2 className="text-[40px] lg:text-[54px] font-black tracking-tighter leading-none mb-12">What are you<br />saving for?</h2>
                
                <div className="space-y-12">
                  <div className="relative group">
                    <input 
                      type="text"
                      placeholder="Goal Name (e.g. Dream Home)"
                      value={goalName}
                      onChange={(e) => setGoalName(e.target.value)}
                      className="w-full bg-transparent border-none text-[32px] font-bold text-white focus:outline-none placeholder:text-gray-800 tracking-tight"
                    />
                    <div className="h-px w-full bg-white/5 mt-4 group-focus-within:bg-[#D4A017] transition-all" />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {icons.map((item, idx) => {
                      const Icon = item.icon;
                      const isActive = selectedIcon === idx;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setSelectedIcon(idx)}
                          className={`p-6 rounded-[32px] border flex flex-col items-center gap-3 transition-all ${
                            isActive 
                            ? 'bg-[#D4A017] border-[#D4A017] text-black shadow-xl shadow-[#D4A017]/10' 
                            : 'bg-white/5 border-white/5 text-gray-500 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                          <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in slide-in-from-bottom-8 duration-500 flex flex-col items-center lg:text-center w-full">
                <span className="text-[#D4A017] text-[11px] font-black uppercase tracking-[0.4em] mb-4 block text-center">Target Amount</span>
                <div className="mb-12 w-full flex flex-col items-center">
                   <div className="flex items-baseline relative justify-center">
                     <span className="text-4xl lg:text-5xl font-black text-[#D4A017] mr-3">$</span>
                     <span className="text-[60px] lg:text-[100px] font-black tracking-tighter leading-none tabular-nums">{targetAmount}</span>
                     <div className="w-1 h-16 bg-[#D4A017] ml-4 animate-pulse rounded-full" />
                   </div>
                   <p className="text-gray-500 font-bold mt-4 text-center">Estimated time to reach goal: <span className="text-white">Calculating...</span></p>
                </div>

                <div className="grid grid-cols-3 gap-y-10 gap-x-12 max-w-sm mx-auto w-full">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'delete'].map((key) => (
                    <button
                      key={key}
                      onClick={() => handleKeypad(key)}
                      className="h-12 w-full flex items-center justify-center text-3xl font-bold text-white/80 hover:text-[#D4A017] active:scale-75 transition-all"
                    >
                      {key === 'delete' ? <Delete size={26} className="opacity-40" /> : key}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-in slide-in-from-bottom-8 duration-500 text-center flex flex-col items-center w-full">
                <div className="w-24 h-24 bg-[#D4A017] rounded-[32px] flex items-center justify-center text-black mb-10 shadow-2xl shrink-0">
                   {React.createElement(icons[selectedIcon].icon, { size: 48, strokeWidth: 2.5 })}
                </div>
                <h2 className="text-[40px] lg:text-[48px] font-black tracking-tighter leading-tight mb-8 text-white text-center">Review your Goal</h2>
                <div className="space-y-6 max-w-md w-full mb-10">
                   <div className="bg-white/5 p-6 rounded-[28px] border border-white/5 flex justify-between items-center transition-all hover:bg-white/[0.08]">
                      <span className="text-gray-500 text-[12px] font-black uppercase tracking-widest">Goal Name</span>
                      <span className="text-white font-bold text-lg">{goalName}</span>
                   </div>
                   <div className="bg-white/5 p-6 rounded-[28px] border border-white/5 flex justify-between items-center transition-all hover:bg-white/[0.08]">
                      <span className="text-gray-500 text-[12px] font-black uppercase tracking-widest">Target Amount</span>
                      <span className="text-[#D4A017] font-bold text-2xl">${targetAmount}</span>
                   </div>
                   <div className="flex items-center gap-3 p-5 bg-[#D4A017]/5 rounded-[24px] border border-[#D4A017]/10 text-left">
                      <Info size={18} className="text-[#D4A017] shrink-0" />
                      <p className="text-[11px] font-bold text-gray-400 leading-snug">Funds will be automatically locked until the target saving goal is successfully met.</p>
                   </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Summary/Action Panel - Fixed on Desktop, scrolls on Mobile */}
          <div className="w-full lg:w-[380px] bg-white/[0.02] p-8 lg:p-12 flex flex-col justify-end lg:sticky lg:bottom-0">
             <div className="space-y-12">
                <div className="space-y-6 hidden lg:block">
                   <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black border transition-all ${step >= 1 ? 'bg-[#D4A017] text-black border-[#D4A017]' : 'border-white/20 text-gray-500'}`}>1</div>
                      <span className={`text-[12px] font-black uppercase tracking-widest ${step >= 1 ? 'text-white' : 'text-gray-600'}`}>Definition</span>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black border transition-all ${step >= 2 ? 'bg-[#D4A017] text-black border-[#D4A017]' : 'border-white/20 text-gray-500'}`}>2</div>
                      <span className={`text-[12px] font-black uppercase tracking-widest ${step >= 2 ? 'text-white' : 'text-gray-600'}`}>Targeting</span>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black border transition-all ${step >= 3 ? 'bg-[#D4A017] text-black border-[#D4A017]' : 'border-white/20 text-gray-500'}`}>3</div>
                      <span className={`text-[12px] font-black uppercase tracking-widest ${step >= 3 ? 'text-white' : 'text-gray-600'}`}>Activation</span>
                   </div>
                </div>

                <div className="h-px bg-white/5 hidden lg:block" />

                <button
                  onClick={step < 3 ? () => setStep(step + 1) : onComplete}
                  disabled={isNextDisabled()}
                  className="w-full h-20 bg-[#D4A017] hover:bg-[#FACC15] rounded-[28px] text-black font-black text-lg shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-3 group disabled:opacity-20 disabled:grayscale mb-10 lg:mb-0"
                >
                  <span>{step < 3 ? 'Next Phase' : 'Confirm Goal'}</span>
                  <CheckCircle2 size={22} className="group-hover:scale-110 transition-transform" />
                </button>
             </div>
          </div>
        </div>
        
        {/* Mobile Spacer to ensure padding at bottom of scroll */}
        <div className="h-10 lg:hidden shrink-0" />
      </div>
    </div>
  );
};

export default CreateGoalForm;