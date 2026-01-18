import React from 'react';
import { ArrowLeft, Building2, ShieldCheck, Cpu, Globe, Scale, Info, CheckCircle2 } from 'lucide-react';

interface AboutUsProps {
  onBack: () => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ onBack }) => {
  return (
    <div className="h-full bg-black flex flex-col animate-in fade-in slide-in-from-right-10 duration-700 overflow-y-auto no-scrollbar pb-32">
      {/* Header */}
      <header className="px-6 py-10 flex items-center gap-6 border-b border-white/5 sticky top-0 bg-black/80 backdrop-blur-3xl z-20">
        <button 
          onClick={onBack} 
          className="w-12 h-12 rounded-2xl bg-white/[0.03] flex items-center justify-center text-white active:scale-90 transition-all border border-white/5"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-2xl font-black text-white tracking-tighter">About CryptSave</h1>
          <p className="text-gray-500 text-[9px] font-black uppercase tracking-[0.4em]">Corporate Profile</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto w-full p-6 lg:p-14 space-y-12">
        
        {/* Company Ownership Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-4 text-[#D4A017]">
            <Building2 size={24} />
            <h2 className="text-lg font-bold tracking-tight uppercase tracking-widest text-[13px]">Ownership & Operation</h2>
          </div>
          <div className="bg-[#0A0A0B] p-8 lg:p-10 rounded-[40px] border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4A017]/[0.03] rounded-full blur-[60px] pointer-events-none" />
            <p className="text-gray-400 text-[15px] leading-relaxed font-medium">
              <span className="text-white font-bold">CryptSave</span> is owned and operated by <span className="text-white font-bold">Solution Digital Trades</span>, a digital enterprise engaged in the development and operation of technology-driven platforms that facilitate user participation in digital services and financial-related activities.
            </p>
          </div>
        </section>

        {/* Strategic Focus Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-4 text-[#D4A017]">
            <Cpu size={24} />
            <h2 className="text-lg font-bold tracking-tight uppercase tracking-widest text-[13px]">Strategic Focus</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#121214] p-8 rounded-[32px] border border-white/5">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <Globe size={16} className="text-[#D4A017]" />
                Digital Utilities
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Solution Digital Trades focuses on designing and managing online products that enable users to engage in value-added digital activities such as advertising interaction, digital gaming, and trading tools.
              </p>
            </div>
            <div className="bg-[#121214] p-8 rounded-[32px] border border-white/5">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#D4A017]" />
                Efficiency Support
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Our platforms are structured to enhance user engagement, spending efficiency, and access to digital utilities, facilitating smooth participation in digital services.
              </p>
            </div>
          </div>
        </section>

        {/* Regulatory Disclaimer Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-4 text-red-500">
            <Scale size={24} />
            <h2 className="text-lg font-bold tracking-tight uppercase tracking-widest text-[13px]">Regulatory Disclaimer</h2>
          </div>
          <div className="bg-red-500/[0.02] p-8 lg:p-10 rounded-[40px] border border-red-500/10 space-y-6">
            <p className="text-gray-400 text-[14px] leading-relaxed">
              The company does not provide guaranteed investment returns, asset management services, or banking functions unless expressly authorized by applicable regulatory bodies. 
            </p>
            <div className="h-px bg-white/5 w-full" />
            <p className="text-gray-400 text-[14px] leading-relaxed italic">
              All user rewards, incentives, and benefits offered on its platforms are activity-based, promotional, or utility-driven and are subject to clearly defined terms and conditions.
            </p>
          </div>
        </section>

        {/* Commitment Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-4 text-[#D4A017]">
            <ShieldCheck size={24} />
            <h2 className="text-lg font-bold tracking-tight uppercase tracking-widest text-[13px]">Our Commitment</h2>
          </div>
          <div className="bg-[#D4A017]/[0.05] p-8 lg:p-10 rounded-[40px] border border-[#D4A017]/10 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-20 h-20 rounded-full bg-[#D4A017] flex items-center justify-center text-black shrink-0 shadow-2xl">
              <ShieldCheck size={40} strokeWidth={2.5} />
            </div>
            <p className="text-gray-400 text-[14px] leading-relaxed">
              Solution Digital Trades is committed to operating in compliance with applicable laws and regulations, implementing robust security measures, maintaining transparency in platform operations, and providing a fair and responsible user experience. Where required, the company engages relevant partners and licensed service providers to support regulated services.
            </p>
          </div>
        </section>

        {/* Bottom Banner */}
        <footer className="pt-10 flex flex-col items-center text-center gap-4">
          <div className="flex items-center gap-2 opacity-30">
            <Info size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Official Enterprise Documentation</span>
          </div>
          <p className="text-gray-700 text-[10px] font-bold uppercase tracking-widest">
            © 2024 Solution Digital Trades. All Rights Reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AboutUs;