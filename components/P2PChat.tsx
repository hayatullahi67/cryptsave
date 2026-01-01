import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Phone, Info, ShieldCheck, 
  Send, Paperclip, MoreVertical, CheckCircle2, 
  Clock, AlertTriangle, ChevronDown, User,
  Zap, Image as ImageIcon, Landmark
} from 'lucide-react';

interface P2PChatProps {
  merchant: any;
  tradeMode: 'buy' | 'sell';
  asset: string;
  onBack: () => void;
  onComplete: () => void;
}

const P2PChat: React.FC<P2PChatProps> = ({ merchant, tradeMode, asset, onBack, onComplete }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: `Hello! I am ready to trade. Please proceed with payment of $500.00 for 500 ${asset}.`, sender: 'merchant', time: '10:02 AM' },
    { id: 2, text: "Security Warning: Do not release assets before confirming payment in your own bank account. CryptSave Escrow is active.", sender: 'system', time: '10:02 AM' }
  ]);
  const [inputText, setInputText] = useState('');
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const newMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
    setInputText('');
    
    // Simple mock response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "Received. Waiting for verification.",
        sender: 'merchant',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 2000);
  };

  return (
    <div className="h-full w-full bg-[#050505] flex flex-col overflow-hidden animate-in fade-in duration-500">
      
      {/* 1. TRADE HEADER */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-black/50 backdrop-blur-xl z-20 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-white hover:text-[#D4A017] transition-all p-2 -ml-2">
            <ArrowLeft size={24} />
          </button>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-white font-bold tracking-tight">{merchant?.merchantName || 'Merchant'}</span>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Order: #CS-889021</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 bg-[#D4A017]/10 px-3 py-1.5 rounded-full border border-[#D4A017]/20">
             <Clock size={14} className="text-[#D4A017]" />
             <span className="text-[12px] font-black text-[#D4A017] tabular-nums">{formatTime(timeLeft)}</span>
           </div>
           <button className="text-gray-500 hover:text-white transition-all"><MoreVertical size={20} /></button>
        </div>
      </header>

      {/* 2. TRADE SUMMARY CARD */}
      <div className="p-4 lg:p-6 bg-[#0A0A0B] border-b border-white/5 shadow-2xl z-10 shrink-0">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#D4A017] border border-white/5 shadow-inner">
               <Zap size={24} />
            </div>
            <div>
              <span className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] block mb-1">You are {tradeMode}ing</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-white">500.00 {asset}</span>
                <span className="text-gray-500 font-bold text-sm">for $500.00 USD</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
             <button onClick={onBack} className="flex-1 md:flex-none px-6 py-3 bg-white/5 border border-white/5 rounded-2xl text-[12px] font-black uppercase tracking-widest text-gray-300 hover:bg-white/10 transition-all">
               Cancel
             </button>
             <button className="flex-1 md:flex-none px-8 py-3 bg-[#1C1C1E] border border-white/5 rounded-2xl text-[12px] font-black uppercase tracking-widest text-white hover:border-[#D4A017]/50 transition-all flex items-center justify-center gap-2">
               Support
               <Info size={14} />
             </button>
          </div>
        </div>
      </div>

      {/* 3. CHAT WINDOW */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6 bg-gradient-to-b from-black to-[#050505]">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 
                msg.sender === 'system' ? 'items-center' : 'items-start'
              }`}
            >
              {msg.sender === 'system' ? (
                <div className="bg-[#D4A017]/5 border border-[#D4A017]/10 px-6 py-3 rounded-2xl flex items-center gap-3 max-w-lg text-center my-4">
                   <AlertTriangle size={16} className="text-[#D4A017]" />
                   <p className="text-[11px] font-bold text-gray-400 leading-snug">{msg.text}</p>
                </div>
              ) : (
                <div className="flex flex-col gap-1.5 max-w-[85%] lg:max-w-[70%]">
                  <div className={`p-5 rounded-[24px] text-[14px] font-medium leading-relaxed shadow-lg ${
                    msg.sender === 'user' 
                    ? 'bg-[#D4A017] text-black rounded-tr-none' 
                    : 'bg-[#121214] text-white rounded-tl-none border border-white/5'
                  }`}>
                    {msg.text}
                  </div>
                  <div className="flex items-center gap-2 px-1">
                    <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">
                      {msg.sender === 'user' ? 'You' : merchant?.merchantName || 'Merchant'} • {msg.time}
                    </span>
                    {msg.sender === 'user' && <CheckCircle2 size={10} className="text-blue-500" />}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* 4. CHAT INPUT & ACTIONS */}
      <div className="p-6 bg-[#080808] border-t border-white/5 relative z-20 shrink-0">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Action Bar */}
          <div className="flex flex-col md:flex-row gap-4">
             <div className="flex-1 bg-white/[0.03] rounded-[28px] border border-white/5 p-4 flex items-center gap-4 hover:bg-white/[0.05] transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#D4A017]/10 flex items-center justify-center text-[#D4A017] border border-[#D4A017]/10">
                   <Landmark size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 mb-0.5 block">Merchant Payment Info</span>
                  <span className="block text-white font-bold text-sm tracking-tight truncate">JP Morgan Chase: 9901 0021 4452</span>
                </div>
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[#D4A017] text-[10px] font-black uppercase tracking-widest transition-all">Copy</button>
             </div>

             <button 
               onClick={onComplete}
               className="w-full md:w-[260px] h-16 bg-white text-black font-black text-[13px] uppercase tracking-widest rounded-[28px] shadow-[0_15px_30px_rgba(255,255,255,0.1)] active:scale-[0.98] transition-all flex items-center justify-center gap-3 hover:bg-gray-100"
             >
               {tradeMode === 'buy' ? 'I Have Paid' : 'Confirm Receipt'}
               <CheckCircle2 size={20} strokeWidth={3} />
             </button>
          </div>

          {/* Text Input */}
          <div className="flex items-center gap-4">
             <button className="w-16 h-16 rounded-[24px] bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-500 hover:text-white transition-all hover:bg-white/5 active:scale-90">
                <Paperclip size={24} />
             </button>
             <div className="flex-1 relative group">
                <input 
                  type="text"
                  placeholder="Send a message to the merchant..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="w-full h-16 bg-[#121214] border border-white/5 rounded-[24px] pl-6 pr-16 text-white text-sm focus:outline-none focus:border-[#D4A017]/40 transition-all placeholder:text-gray-800"
                />
                <button 
                  onClick={handleSendMessage}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-[18px] flex items-center justify-center transition-all ${
                    inputText.trim() ? 'bg-[#D4A017] text-black shadow-lg shadow-[#D4A017]/20 scale-100' : 'bg-white/5 text-gray-700 scale-90'
                  }`}
                >
                  <Send size={20} />
                </button>
             </div>
          </div>
          
          {/* Security Indicator */}
          <div className="flex items-center justify-center gap-6 opacity-30 pb-2">
             <div className="flex items-center gap-1.5"><ShieldCheck size={12}/><span className="text-[8px] font-black uppercase tracking-widest">Escrow Active</span></div>
             <div className="flex items-center gap-1.5"><Zap size={12}/><span className="text-[8px] font-black uppercase tracking-widest">Instant Release</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default P2PChat;