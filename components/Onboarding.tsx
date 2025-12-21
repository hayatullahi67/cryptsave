
import React from 'react';
import { ArrowLeftRight, Plus } from 'lucide-react';

interface OnboardingProps {
  onStart: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onStart }) => {
  return (
    <div className="min-h-full flex flex-col p-8 bg-gradient-to-b from-[#2A2600] via-black to-black relative">
      {/* Header Logo */}
      <div className="flex justify-center pt-8 mb-12">
        <span className="text-xl font-bold tracking-tight text-white flex items-center gap-0.5">
          Crypt<span className="text-[#EAB308]">Save</span>
        </span>
      </div>

      {/* Visual Graphics Section */}
      <div className="flex-1 relative mt-4 mb-12">
        <div className="relative w-full h-[320px] max-w-[320px] mx-auto">
          {/* Background Black Card with Bar Chart */}
          <div className="absolute top-4 left-[-20px] w-[240px] h-[160px] bg-black rounded-[32px] p-6 shadow-2xl transform -rotate-[12deg] border border-white/5 z-0 flex flex-col justify-end">
            <div className="text-white/40 text-[10px] mb-2">$400.09</div>
            <div className="flex items-end gap-1.5 h-16">
              <div className="w-2.5 h-[40%] bg-white/20 rounded-full" />
              <div className="w-2.5 h-[80%] bg-white/80 rounded-full" />
              <div className="w-2.5 h-[60%] bg-white/40 rounded-full" />
              <div className="w-2.5 h-[100%] bg-white rounded-full" />
              <div className="w-2.5 h-[70%] bg-white/60 rounded-full" />
            </div>
          </div>

          {/* Front Gold Card */}
          <div className="absolute top-12 right-[-10px] w-[260px] h-[170px] bg-[#D4A017] rounded-[32px] p-6 shadow-2xl z-10 border border-white/10 flex flex-col justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-white rounded-full px-3 py-1.5 flex items-center gap-2 shadow-sm">
                <div className="w-4 h-3 bg-red-600 relative overflow-hidden flex flex-col">
                    <div className="h-1 bg-blue-800 w-1/2" />
                    <div className="flex-1 flex flex-col justify-around py-0.5">
                        <div className="h-[1px] bg-white w-full" />
                        <div className="h-[1px] bg-white w-full" />
                    </div>
                </div>
                <span className="text-[10px] text-black font-bold uppercase tracking-wider">USD</span>
              </div>
            </div>
            
            <div>
              <div className="text-white text-3xl font-bold mb-1 tracking-tight">$50,000.90</div>
              <div className="text-white/80 text-xs font-medium tracking-widest">**** 8890</div>
            </div>
          </div>

          {/* Floating Red Swap Icon */}
          <div className="absolute top-[160px] left-[50px] z-20">
            <div className="w-10 h-10 bg-[#FF0000] rounded-full flex items-center justify-center shadow-lg border-2 border-black active:scale-95 transition-transform">
              <ArrowLeftRight size={16} className="text-white" />
            </div>
          </div>

          {/* Floating Add Money Button */}
          <div className="absolute bottom-[40px] right-[10px] z-20 transform rotate-12">
            <div className="bg-white text-black px-5 py-3 rounded-full flex items-center gap-2 shadow-xl border border-black/5 active:scale-95 transition-transform">
              <Plus size={18} className="stroke-[3px]" />
              <span className="text-sm font-bold">Add money</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-1.5 mb-8">
        <div className="w-2 h-1.5 rounded-full bg-white/20" />
        <div className="w-8 h-1.5 rounded-full bg-white shadow-sm" />
        <div className="w-2 h-1.5 rounded-full bg-white/20" />
      </div>

      {/* Text and CTA */}
      <div className="mb-12">
        <h1 className="text-[40px] font-bold text-white mb-4 leading-[1.1] tracking-tight">
          Smart Wealth,<br />Simplified.
        </h1>
        <p className="text-gray-500 text-lg mb-10 leading-relaxed max-w-[280px]">
          Grow your money effortlessly with tools built for your goals.
        </p>
        <button
          onClick={onStart}
          className="w-full bg-[#D4A017] py-5 rounded-[24px] text-black font-bold text-lg active:scale-95 transition-all shadow-[0_12px_24px_-8px_rgba(212,160,23,0.4)]"
        >
          Get Started
        </button>
      </div>

      {/* Bottom Home Indicator Mock */}
      <div className="flex justify-center pb-6 mt-auto">
        <div className="w-32 h-1.5 bg-white/20 rounded-full" />
      </div>
    </div>
  );
};

export default Onboarding;
