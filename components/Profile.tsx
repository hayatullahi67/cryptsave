
import React from 'react';
import { ArrowLeft, Settings, ChevronRight, Pencil, CheckSquare, Lock, LayoutGrid, Gift, Headphones, LogOut } from 'lucide-react';

interface ProfileProps {
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onLogout }) => {
  const menuItems = [
    { icon: Pencil, label: 'Edit Profile' },
    { icon: CheckSquare, label: 'Account Verification', badge: 'Verified' },
    { icon: Lock, label: 'Security' },
    { icon: LayoutGrid, label: 'App Settings' },
    { icon: Gift, label: 'Referral & Rewards' },
    { icon: Headphones, label: 'Support' },
  ];

  return (
    <div className="h-full bg-black overflow-y-auto no-scrollbar flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 pt-6 pb-4 shrink-0">
        <button className="w-10 h-10 -ml-2 flex items-center justify-center text-white active:scale-90 transition-transform">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-bold text-[18px] tracking-tight">Profile</h1>
        <button className="w-10 h-10 -mr-2 flex items-center justify-center text-white active:scale-90 transition-transform">
          <Settings size={22} className="opacity-90" />
        </button>
      </header>

      {/* Profile Info Section */}
      <div className="px-6 py-8 flex items-center gap-5">
        <div className="relative shrink-0">
          <div className="w-[105px] h-[105px] rounded-[30px] overflow-hidden border border-white/10 shadow-xl bg-[#1C1C1E]">
             <img 
               src="https://picsum.photos/seed/profile_ahmed/210/210" 
               alt="Profile" 
               className="w-full h-full object-cover" 
             />
          </div>
          {/* Pencil edit button overlay */}
          <button className="absolute -bottom-1 -right-1 w-9 h-9 bg-[#D4A017] rounded-full border-[3px] border-black flex items-center justify-center active:scale-90 transition-transform shadow-lg">
            <Pencil size={15} className="text-black" strokeWidth={3} />
          </button>
        </div>
        
        <div className="flex-1">
          <h2 className="text-[20px] font-bold text-white tracking-tight mb-0.5">Abubakar Ahmed</h2>
          <p className="text-gray-500 text-[12px] font-medium mb-4 truncate max-w-[170px]">ahmedabubakar12@gmail.com</p>
          <button className="bg-[#D4A017] text-black text-[13px] font-bold px-7 py-2.5 rounded-full active:scale-95 transition-all shadow-[0_8px_20px_rgba(212,160,23,0.25)]">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 px-6 pt-4 space-y-1 pb-32">
        {menuItems.map((item, idx) => (
          <button 
            key={idx} 
            className="w-full flex items-center gap-4 py-[18px] group active:opacity-60 transition-all border-b border-white/[0.04]"
          >
            <div className="w-6 h-6 flex items-center justify-center text-white opacity-90 group-hover:text-[#D4A017] group-hover:opacity-100 transition-all">
              <item.icon size={22} strokeWidth={2.2} />
            </div>
            <span className="flex-1 text-left font-bold text-[15px] text-white tracking-tight">{item.label}</span>
            
            {item.badge ? (
              <div className="bg-[#1C1C1E] px-3.5 py-1.5 rounded-full mr-0.5">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{item.badge}</span>
              </div>
            ) : (
              <ChevronRight size={18} className="text-white/20 group-hover:text-[#D4A017] transition-all" />
            )}
          </button>
        ))}
        
        {/* Logout Button (Matches screenshot gold style) */}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-4 py-6 text-[#D4A017] active:scale-95 transition-all group"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <LogOut size={22} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-[15px] tracking-tight">Logout</span>
        </button>
      </div>

      {/* Bottom Home Indicator Mock */}
      <div className="flex justify-center pb-2 fixed bottom-0 w-full bg-transparent pointer-events-none">
        <div className="w-32 h-1 bg-white/10 rounded-full" />
      </div>
    </div>
  );
};

export default Profile;
