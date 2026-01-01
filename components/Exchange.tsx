import React, { useState } from 'react';
import { 
  ShieldCheck, CheckCircle2, User, Landmark, 
  CreditCard, Apple, Globe, Search, Filter, 
  ChevronDown, ArrowUpDown, Zap, Award, Star
} from 'lucide-react';
import { AppView } from '../types';

interface MerchantOffer {
  id: string;
  merchantName: string;
  isVerified: boolean;
  trades: number;
  completion: string;
  price: string;
  available: string;
  limitMin: string;
  limitMax: string;
  paymentMethods: string[];
}

interface ExchangeProps {
  onStartTrade: (merchant: MerchantOffer, mode: 'buy' | 'sell', asset: string) => void;
}

const Exchange: React.FC<ExchangeProps> = ({ onStartTrade }) => {
  const [tradeMode, setTradeMode] = useState<'buy' | 'sell'>('buy');
  const [selectedAsset, setSelectedAsset] = useState('USDT');
  const [amountFilter, setAmountFilter] = useState('');

  const assets = ['USDT', 'BTC', 'ETH', 'BNB', 'SOL', 'FDUSD', 'XRP', 'ADA', 'TRX'];

  const mockOffers: MerchantOffer[] = [
    {
      id: '1',
      merchantName: 'GoldStandard_FX',
      isVerified: true,
      trades: 4521,
      completion: '99.8%',
      price: '1.00',
      available: '12,450.00',
      limitMin: '100.00',
      limitMax: '5,000.00',
      paymentMethods: ['Bank Transfer', 'Apple Pay', 'Zelle'],
    },
    {
      id: '2',
      merchantName: 'CryptoKing_Express',
      isVerified: true,
      trades: 1289,
      completion: '98.5%',
      price: '1.02',
      available: '5,000.00',
      limitMin: '50.00',
      limitMax: '2,500.00',
      paymentMethods: ['Bank Transfer', 'Wise'],
    },
    {
      id: '3',
      merchantName: 'SecurePeer_Vault',
      isVerified: false,
      trades: 850,
      completion: '96.2%',
      price: '1.01',
      available: '2,800.50',
      limitMin: '200.00',
      limitMax: '2,800.50',
      paymentMethods: ['Zelle', 'PayPal'],
    },
    {
      id: '4',
      merchantName: 'Ahmed_Trades_Global',
      isVerified: true,
      trades: 15402,
      completion: '100%',
      price: '1.00',
      available: '85,000.00',
      limitMin: '1,000.00',
      limitMax: '50,000.00',
      paymentMethods: ['Bank Transfer', 'Apple Pay'],
    }
  ];

  return (
    <div className="flex flex-col gap-8 pb-32 lg:pb-10 animate-in fade-in duration-500">
      
      {/* 1. PROFESSIONAL HEADER & MODE TOGGLE */}
      <header className="flex flex-col gap-6 px-2 lg:px-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#D4A017] rounded-2xl flex items-center justify-center text-black shadow-lg shadow-[#D4A017]/10">
              <ArrowUpDown size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">P2P Marketplace</h1>
              <p className="text-gray-500 text-sm font-medium">Trade assets directly with verified peers</p>
            </div>
          </div>

          <div className="flex bg-[#121214] p-1.5 rounded-[24px] border border-white/5 w-full md:w-[320px] shadow-2xl">
            <button 
              onClick={() => setTradeMode('buy')}
              className={`flex-1 py-3.5 rounded-[20px] font-black text-[13px] uppercase tracking-widest transition-all ${tradeMode === 'buy' ? 'bg-[#D4A017] text-black shadow-lg shadow-[#D4A017]/10' : 'text-gray-500 hover:text-white'}`}
            >
              Buy
            </button>
            <button 
              onClick={() => setTradeMode('sell')}
              className={`flex-1 py-3.5 rounded-[20px] font-black text-[13px] uppercase tracking-widest transition-all ${tradeMode === 'sell' ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
            >
              Sell
            </button>
          </div>
        </div>

        {/* 2. ASSET SELECTOR & SEARCH */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex gap-2 overflow-x-auto pb-4 custom-h-scrollbar">
            {assets.map((asset) => (
              <button
                key={asset}
                onClick={() => setSelectedAsset(asset)}
                className={`px-8 py-3.5 rounded-full text-[13px] font-black uppercase tracking-widest transition-all border whitespace-nowrap ${
                  selectedAsset === asset 
                  ? 'bg-[#D4A017] text-black border-[#D4A017] shadow-xl shadow-[#D4A017]/10' 
                  : 'bg-[#121214] text-gray-500 border-white/5 hover:border-white/10'
                }`}
              >
                {asset}
              </button>
            ))}
          </div>
          
          <div className="relative group w-full md:w-[300px]">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text"
              placeholder="Filter by amount..."
              value={amountFilter}
              onChange={(e) => setAmountFilter(e.target.value)}
              className="w-full h-14 bg-[#121214] rounded-[24px] border border-white/5 pl-14 pr-6 text-white text-sm font-bold focus:outline-none focus:border-[#D4A017]/40 transition-all placeholder:text-gray-800"
            />
          </div>
        </div>
      </header>

      {/* 3. MERCHANT OFFERS LIST */}
      <div className="flex flex-col gap-4 px-2 lg:px-0">
        <div className="flex items-center justify-between text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mb-2 px-6">
          <span>Advertiser (Verified)</span>
          <span className="hidden md:block">Price & Limit</span>
        </div>

        {mockOffers.map((offer) => (
          <div 
            key={offer.id} 
            className="group relative bg-[#0A0A0B] border border-white/[0.04] p-6 lg:p-8 rounded-[40px] hover:border-[#D4A017]/30 transition-all shadow-2xl overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A017]/[0.02] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
              {/* Left: Merchant Profile */}
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white relative">
                   <User size={28} className="opacity-40" />
                   <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-[#0A0A0B] flex items-center justify-center">
                     <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                   </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-bold text-[17px] tracking-tight">{offer.merchantName}</span>
                    {offer.isVerified && (
                      <div className="w-5 h-5 bg-[#D4A017] rounded-full flex items-center justify-center text-black" title="Verified Merchant">
                        <CheckCircle2 size={12} strokeWidth={3} />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-[11px] font-bold text-gray-500">
                    <span className="flex items-center gap-1"><Award size={12} className="text-[#D4A017]" /> {offer.trades} Trades</span>
                    <span className="w-1 h-1 bg-white/10 rounded-full" />
                    <span className="text-[#D4A017]">{offer.completion} Completion</span>
                  </div>
                </div>
              </div>

              {/* Center: Price & Limits */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 flex-1 lg:max-w-2xl">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Price</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl lg:text-3xl font-black text-white tabular-nums">{offer.price}</span>
                    <span className="text-[12px] font-bold text-gray-600 uppercase">USD</span>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Available / Limit</span>
                  <div className="text-[13px] font-bold text-white tabular-nums mb-1">{offer.available} {selectedAsset}</div>
                  <div className="text-[11px] font-bold text-gray-500 uppercase tracking-tight tabular-nums">
                    ${offer.limitMin} - ${offer.limitMax}
                  </div>
                </div>

                <div className="flex flex-col col-span-2 md:col-span-1">
                  <span className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Payment Methods</span>
                  <div className="flex flex-wrap gap-2">
                    {offer.paymentMethods.map((pm, i) => (
                      <div 
                        key={i} 
                        className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5"
                        title={pm}
                      >
                        {pm === 'Bank Transfer' ? <Landmark size={12} className="text-[#D4A017]" /> : 
                         pm === 'Apple Pay' ? <Apple size={12} /> : 
                         pm === 'Wise' ? <Globe size={12} className="text-blue-400" /> : 
                         <CreditCard size={12} />}
                        <span className="text-[10px] font-bold text-white/80 whitespace-nowrap">{pm}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: CTA Button */}
              <div className="shrink-0 lg:pl-10">
                <button 
                  onClick={() => onStartTrade(offer, tradeMode, selectedAsset)}
                  className={`w-full lg:w-[160px] h-16 rounded-[24px] font-black text-[14px] uppercase tracking-widest transition-all active:scale-[0.98] shadow-2xl flex items-center justify-center gap-2 ${
                    tradeMode === 'buy' 
                    ? 'bg-[#D4A017] text-black shadow-[#D4A017]/10 hover:bg-[#FACC15]' 
                    : 'bg-white text-black hover:bg-gray-100'
                  }`}
                >
                  {tradeMode === 'buy' ? 'Buy' : 'Sell'} {selectedAsset}
                  <Zap size={16} fill="currentColor" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. MARKET FOOTER INFO */}
      <footer className="mt-10 px-6 py-8 bg-[#121214] rounded-[40px] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
            <ShieldCheck size={20} />
          </div>
          <div>
            <span className="block text-white font-bold text-sm">Escrow Secure Trading</span>
            <span className="text-[11px] font-medium text-gray-500">Funds are held in secure CryptSave Escrow during trade</span>
          </div>
        </div>
        
        <div className="flex gap-10 items-center opacity-40">
           <div className="flex flex-col items-center">
             <span className="text-white font-black text-sm tracking-tight">12s</span>
             <span className="text-[9px] uppercase font-bold text-gray-500">Avg. Release</span>
           </div>
           <div className="w-px h-8 bg-white/10" />
           <div className="flex flex-col items-center">
             <span className="text-white font-black text-sm tracking-tight">24/7</span>
             <span className="text-[9px] uppercase font-bold text-gray-500">Support</span>
           </div>
           <div className="w-px h-8 bg-white/10" />
           <div className="flex flex-col items-center">
             <span className="text-white font-black text-sm tracking-tight">0%</span>
             <span className="text-[9px] uppercase font-bold text-gray-500">P2P Fees</span>
           </div>
        </div>
      </footer>

      <style>{`
        .custom-h-scrollbar::-webkit-scrollbar {
          height: 4px;
        }
        .custom-h-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-h-scrollbar::-webkit-scrollbar-thumb {
          background: #D4A017;
          border-radius: 10px;
        }
        .custom-h-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #FACC15;
        }
      `}</style>
    </div>
  );
};

export default Exchange;