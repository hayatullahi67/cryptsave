
import React, { useRef, useEffect, useState } from 'react';
import { ArrowLeft, Image as ImageIcon, Zap, ZapOff, Info } from 'lucide-react';

interface ScanPaymentProps {
  onBack: () => void;
  onComplete: () => void;
}

const ScanPayment: React.FC<ScanPaymentProps> = ({ onBack, onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCamera, setHasCamera] = useState<boolean | null>(null);
  const [isFlashOn, setIsFlashOn] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasCamera(true);
      } catch (err) {
        console.error("Error accessing camera:", err);
        setHasCamera(false);
      }
    }

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleGalleryClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Simulate scanning logic
      setTimeout(onComplete, 1000);
    }
  };

  return (
    <div className="relative w-full h-full bg-black overflow-hidden flex flex-col">
      {/* Live Camera Feed / Simulation */}
      <div className="absolute inset-0 z-0">
        {hasCamera === true ? (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full h-full object-cover grayscale-[0.3]"
          />
        ) : hasCamera === false ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#0A0A0B] p-10 text-center">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
               <ZapOff size={32} className="text-gray-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Camera Access Denied</h3>
            <p className="text-gray-500 text-sm max-w-xs">Please enable camera permissions in your settings to use the scan feature.</p>
          </div>
        ) : (
          <div className="w-full h-full bg-[#050505] animate-pulse" />
        )}
      </div>

      {/* Dark Overlay with Cutout */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="w-full h-full flex flex-col">
           {/* Top part */}
           <div className="flex-1 bg-black/60 backdrop-blur-[2px]" />
           
           <div className="flex h-[280px] lg:h-[350px]">
             {/* Left part */}
             <div className="flex-1 bg-black/60 backdrop-blur-[2px]" />
             
             {/* The Cutout Window */}
             <div className="w-[280px] lg:w-[350px] relative pointer-events-auto">
                {/* Gold L-Brackets */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#D4A017] rounded-tl-xl" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#D4A017] rounded-tr-xl" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#D4A017] rounded-bl-xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#D4A017] rounded-br-xl" />
                
                {/* Scanning Animation Line */}
                <div className="absolute inset-x-2 h-[2px] bg-gradient-to-r from-transparent via-[#D4A017] to-transparent shadow-[0_0_15px_#D4A017] animate-scan-line top-0 opacity-80" />
                
                {/* Subtle Inner Glow */}
                <div className="absolute inset-0 bg-[#D4A017]/5 rounded-xl border border-white/5" />
             </div>

             {/* Right part */}
             <div className="flex-1 bg-black/60 backdrop-blur-[2px]" />
           </div>

           {/* Bottom part */}
           <div className="flex-1 bg-black/60 backdrop-blur-[2px]" />
        </div>
      </div>

      {/* UI Controls */}
      <div className="relative z-20 flex flex-col h-full">
        {/* Header */}
        <div className="p-6 flex items-center justify-between">
           <button 
             onClick={onBack}
             className="w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white active:scale-90 transition-all"
           >
             <ArrowLeft size={24} />
           </button>
           
           <div className="flex flex-col items-center">
             <span className="text-white font-black uppercase text-[10px] tracking-[0.4em] mb-1">Secure Scan</span>
             <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">Live Engine</span>
             </div>
           </div>

           <button 
             onClick={() => setIsFlashOn(!isFlashOn)}
             className={`w-12 h-12 rounded-2xl backdrop-blur-xl border border-white/10 flex items-center justify-center transition-all ${isFlashOn ? 'bg-[#D4A017] text-black shadow-[0_0_20px_#D4A017]' : 'bg-black/40 text-white'}`}
           >
             <Zap size={22} className={isFlashOn ? 'fill-current' : ''} />
           </button>
        </div>

        {/* Scan Message */}
        <div className="mt-auto mb-10 text-center px-10">
          <p className="text-white font-bold text-lg mb-2">Align QR Code</p>
          <p className="text-gray-400 text-sm max-w-xs mx-auto mb-12">Position the vendor's QR code within the frame to initiate secure payment.</p>
          
          <div className="flex flex-col gap-4 max-w-sm mx-auto">
            <button 
              onClick={handleGalleryClick}
              className="w-full h-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[24px] flex items-center justify-center gap-3 text-white font-bold active:scale-95 transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#D4A017] group-hover:bg-[#D4A017] group-hover:text-black transition-all">
                <ImageIcon size={18} />
              </div>
              <span>Upload from Gallery</span>
            </button>
            <input 
              ref={fileInputRef} 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileChange} 
            />
            
            <div className="flex items-center justify-center gap-2 opacity-40">
               <Info size={14} />
               <span className="text-[10px] font-black uppercase tracking-widest">End-to-End Encrypted</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar for safe area */}
        <div className="h-10 shrink-0" />
      </div>

      <style>{`
        @keyframes scan-line {
          0% { top: 0; }
          100% { top: calc(100% - 2px); }
        }
        .animate-scan-line {
          animation: scan-line 2.5s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  );
};

export default ScanPayment;
