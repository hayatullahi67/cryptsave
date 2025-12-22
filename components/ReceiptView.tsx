import React from 'react';
import { ArrowLeft, Download, Share2, ShieldCheck, Printer, CheckCircle2 } from 'lucide-react';
import { Transaction } from '../types';
import { jsPDF } from 'jspdf';

interface ReceiptViewProps {
  transaction: Transaction;
  onBack: () => void;
}

const ReceiptView: React.FC<ReceiptViewProps> = ({ transaction, onBack }) => {
  const isPositive = transaction.amount.startsWith('+');
  const referenceId = `TXN-${transaction.id}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  const handleShare = async () => {
    const text = `CryptSave Receipt\nTransaction: ${transaction.title}\nAmount: ${transaction.amount}\nReference: ${referenceId}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Transaction Receipt', text });
      } catch (err) {
        console.log('Share failed', err);
      }
    } else {
      navigator.clipboard.writeText(text);
      alert('Receipt details copied to clipboard!');
    }
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    
    // Set Theme Color Background (Professional Receipt Layout)
    doc.setFillColor(10, 10, 11); // Dark background
    doc.rect(0, 0, 210, 297, 'F');
    
    // Header Decor
    doc.setFillColor(212, 160, 23); // Gold Decor
    doc.rect(0, 0, 210, 15, 'F');
    
    // Logo Text
    doc.setTextColor(212, 160, 23); // Gold
    doc.setFontSize(26);
    doc.setFont("helvetica", "bold");
    doc.text("CRYPT SAVE", 105, 45, { align: "center" });
    
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text("OFFICIAL TRANSACTION RECORD", 105, 55, { align: "center" });
    
    // Main Amount Pill
    doc.setFillColor(28, 28, 30);
    doc.roundedRect(55, 75, 100, 30, 8, 8, 'F');
    
    doc.setFontSize(42);
    doc.setTextColor(isPositive ? 212 : 255, isPositive ? 160 : 255, isPositive ? 23 : 255);
    doc.text(transaction.amount, 105, 96, { align: "center" });
    
    // Separator
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.05);
    doc.line(40, 120, 170, 120);
    
    // Details Grid
    const startY = 140;
    const spacing = 18;
    
    const rows = [
      { label: "Recipient", value: transaction.title },
      { label: "Date & Time", value: transaction.date },
      { label: "Status", value: "Success / Completed" },
      { label: "Reference ID", value: referenceId },
      { label: "Network Fee", value: "$0.00 (Standard)" }
    ];
    
    doc.setFontSize(12);
    rows.forEach((row, i) => {
      doc.setTextColor(100, 100, 100);
      doc.text(row.label, 40, startY + (i * spacing));
      doc.setTextColor(255, 255, 255);
      doc.text(row.value, 170, startY + (i * spacing), { align: "right" });
    });
    
    // Security Seal
    doc.setFillColor(212, 160, 23, 0.1);
    doc.roundedRect(60, 230, 90, 12, 6, 6, 'F');
    doc.setFontSize(8);
    doc.setTextColor(212, 160, 23);
    doc.text("VERIFIED & ENCRYPTED BY CRYPTSAVE CRYPTO-NODE", 105, 238, { align: "center" });
    
    // Disclaimer
    doc.setTextColor(70, 70, 70);
    doc.setFontSize(7);
    doc.text("This receipt serves as a digital proof of transaction within the CryptSave platform.", 105, 270, { align: "center" });
    doc.text("CryptSave Inc. • 2024 • All Rights Reserved", 105, 275, { align: "center" });
    
    doc.save(`CryptSave_Receipt_${transaction.id}.pdf`);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center py-10 px-6 lg:py-20 overflow-y-auto no-scrollbar">
      <div className="w-full max-w-md flex items-center justify-between mb-10 shrink-0">
        <button 
          onClick={onBack}
          className="w-12 h-12 rounded-2xl bg-[#121214] border border-white/5 flex items-center justify-center text-white active:scale-90 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4A017]">Official Receipt</span>
        <button 
          onClick={() => window.print()}
          className="w-12 h-12 rounded-2xl bg-[#121214] border border-white/5 flex items-center justify-center text-white active:scale-90 transition-all"
        >
          <Printer size={20} className="opacity-60" />
        </button>
      </div>

      <div className="w-full max-w-md bg-[#0A0A0B] rounded-[48px] border border-white/[0.05] shadow-2xl p-8 lg:p-10 flex flex-col items-center relative overflow-hidden shrink-0">
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#D4A017]/10 to-transparent pointer-events-none" />
        
        <div className="relative mb-8 mt-4">
           <div className="w-24 h-24 bg-[#D4A017] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(212,160,23,0.3)]">
              <CheckCircle2 size={42} className="text-black" />
           </div>
        </div>

        <h2 className="text-gray-500 text-[11px] font-black uppercase tracking-[0.3em] mb-2 text-center">TRANSACTION SUCCESSFUL</h2>
        <div className={`text-[48px] lg:text-[56px] font-black tracking-tighter mb-10 ${isPositive ? 'text-[#D4A017]' : 'text-white'}`}>
           {transaction.amount}
        </div>

        <div className="w-full space-y-6 mb-10">
           <div className="flex justify-between items-center text-sm font-bold border-b border-white/[0.03] pb-4">
             <span className="text-gray-500 font-medium">Recipient</span>
             <span className="text-white">{transaction.title}</span>
           </div>
           <div className="flex justify-between items-center text-sm font-bold border-b border-white/[0.03] pb-4">
             <span className="text-gray-500 font-medium">Date & Time</span>
             <span className="text-white">{transaction.date}</span>
           </div>
           <div className="flex justify-between items-center text-sm font-bold border-b border-white/[0.03] pb-4">
             <span className="text-gray-500 font-medium">Status</span>
             <div className="flex items-center gap-1.5 text-green-500">
               <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
               <span>Completed</span>
             </div>
           </div>
           <div className="flex justify-between items-center text-sm font-bold">
             <span className="text-gray-500 font-medium">Ref ID</span>
             <span className="text-[10px] bg-white/5 px-3 py-1.5 rounded-lg text-white/60 font-mono tracking-tight">{referenceId}</span>
           </div>
        </div>

        <div className="flex items-center gap-2 bg-[#D4A017]/5 px-4 py-2 rounded-full border border-[#D4A017]/10 mb-10">
           <ShieldCheck size={14} className="text-[#D4A017]" />
           <span className="text-[9px] font-black uppercase tracking-widest text-[#D4A017]">Encrypted & Verified</span>
        </div>

        <div className="w-full grid grid-cols-2 gap-4">
          <button 
            onClick={handleShare}
            className="h-16 bg-[#1C1C1E] hover:bg-[#252528] border border-white/5 rounded-[24px] flex items-center justify-center gap-3 text-white font-bold transition-all active:scale-95"
          >
            <Share2 size={18} />
            <span>Share</span>
          </button>
          <button 
            onClick={handleDownload}
            className="h-16 bg-white hover:bg-gray-100 rounded-[24px] flex items-center justify-center gap-3 text-black font-bold transition-all active:scale-95 shadow-xl"
          >
            <Download size={18} />
            <span>Save PDF</span>
          </button>
        </div>
      </div>

      <p className="mt-12 text-gray-700 text-[10px] font-bold uppercase tracking-[0.2em] text-center max-w-[280px]">
        This is an automatically generated receipt. For support, contact info@cryptsave.com
      </p>
      
      <div className="h-20 shrink-0" />
    </div>
  );
};

export default ReceiptView;