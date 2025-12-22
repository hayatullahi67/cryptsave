import React, { useEffect } from 'react';
import { X, Bell, Zap, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import { AppNotification } from '../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const notifications: AppNotification[] = [
    {
      id: '1',
      title: 'Deposit Received',
      description: 'Your Apple Pay deposit of $482.09 was successful.',
      time: '2 mins ago',
      type: 'success',
      read: false
    },
    {
      id: '2',
      title: 'Security Alert',
      description: 'New login detected from a Chrome browser on Windows.',
      time: '1 hour ago',
      type: 'warning',
      read: false
    },
    {
      id: '3',
      title: 'Price Update',
      description: 'Bitcoin (BTC) has reached a new monthly high of $68.4k.',
      time: '4 hours ago',
      type: 'info',
      read: true
    },
    {
      id: '4',
      title: 'Saving Milestone',
      description: 'Congratulations! You reached 72% of your House Rent goal.',
      time: 'Yesterday',
      type: 'success',
      read: true
    }
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-[110] bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={onClose}
      />
      
      {/* Drawer */}
      <aside 
        className={`fixed top-0 right-0 z-[120] w-full max-w-[400px] h-screen bg-[#080808] border-l border-white/5 shadow-[-40px_0_100px_rgba(0,0,0,0.6)] transform transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-8 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D4A017]/10 flex items-center justify-center text-[#D4A017]">
                <Bell size={20} />
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">Notifications</h2>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center text-gray-500 hover:text-white transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-4">
            {notifications.map((notif) => (
              <div 
                key={notif.id}
                className={`p-5 rounded-[28px] border transition-all cursor-pointer group ${
                  notif.read 
                  ? 'bg-transparent border-white/[0.03] hover:border-white/10' 
                  : 'bg-white/[0.02] border-[#D4A017]/20 shadow-lg shadow-[#D4A017]/5'
                }`}
              >
                <div className="flex gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    notif.type === 'success' ? 'bg-green-500/10 text-green-500' :
                    notif.type === 'warning' ? 'bg-red-500/10 text-red-500' :
                    'bg-blue-500/10 text-blue-500'
                  }`}>
                    {notif.type === 'success' ? <CheckCircle2 size={18} /> : 
                     notif.type === 'warning' ? <ShieldCheck size={18} /> : 
                     <Zap size={18} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-[14px] text-white tracking-tight">{notif.title}</h3>
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{notif.time}</span>
                    </div>
                    <p className="text-gray-500 text-[13px] leading-relaxed line-clamp-2">{notif.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-8 border-t border-white/5">
            <button className="w-full h-14 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-100 active:scale-[0.98] transition-all">
              Mark all as read
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default NotificationDrawer;