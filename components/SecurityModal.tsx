import React, { useState, useEffect, useRef } from 'react';
import { Fingerprint, CheckCircle2, Shield, Lock, Delete, Info } from 'lucide-react';

interface SecurityModalProps {
  isOpen: boolean;
  mode: 'verify' | 'enroll';
  onClose: () => void;
  onSuccess: () => void;
  isFaceIdEnabled: boolean;
  correctPin: string;
}

const SecurityModal: React.FC<SecurityModalProps> = ({ isOpen, mode, onClose, onSuccess, isFaceIdEnabled, correctPin }) => {
  const [authMethod, setAuthMethod] = useState<'face' | 'pin'>(isFaceIdEnabled ? 'face' : 'pin');
  const [status, setStatus] = useState<'idle' | 'initializing' | 'scanning' | 'verifying' | 'success' | 'failed'>('idle');
  const [pin, setPin] = useState('');
  const [enrollStep, setEnrollStep] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const enrollInstructions = [
    "Center your face",
    "Turn head right",
    "Turn head left",
    "Look up and down",
    "Completed"
  ];

  useEffect(() => {
    if (isOpen) {
      if (mode === 'enroll') {
        setAuthMethod('face');
        runFaceIdSequence();
      } else if (isFaceIdEnabled && authMethod === 'face') {
        runFaceIdSequence();
      } else {
        setStatus('idle');
      }
    } else {
      stopCamera();
      setStatus('idle');
      setPin('');
      setEnrollStep(0);
    }
  }, [isOpen, mode, isFaceIdEnabled, authMethod]);

  const runFaceIdSequence = async () => {
    setStatus('initializing');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) videoRef.current.srcObject = stream;
      
      if (mode === 'enroll') {
        let step = 0;
        const interval = setInterval(() => {
          step++;
          setEnrollStep(step);
          if (step === 1) setStatus('scanning');
          if (step === 4) {
            clearInterval(interval);
            setStatus('verifying');
            setTimeout(() => {
              setStatus('success');
              setTimeout(() => {
                onSuccess();
                stopCamera();
              }, 1200);
            }, 1500);
          }
        }, 1500);
      } else {
        setTimeout(() => setStatus('scanning'), 600);
        setTimeout(() => setStatus('verifying'), 2000);
        setTimeout(() => {
          setStatus('success');
          setTimeout(() => {
            onSuccess();
            stopCamera();
          }, 800);
        }, 3000);
      }
    } catch (err) {
      console.error("Biometric initialization failed:", err);
      setStatus('failed');
      setAuthMethod('pin');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(t => t.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleKeypad = (val: string) => {
    if (status === 'success') return;
    if (val === 'delete') {
      setPin(prev => prev.slice(0, -1));
      setStatus('idle');
    } else if (pin.length < 4) {
      const newPin = pin + val;
      setPin(newPin);
      if (newPin.length === 4) {
        if (newPin === correctPin) {
          setStatus('success');
          setTimeout(onSuccess, 600);
        } else {
          setStatus('failed');
          setTimeout(() => {
            setPin('');
            setStatus('idle');
          }, 800);
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/98 backdrop-blur-2xl" onClick={onClose} />
      
      {/* Container - PORTABLE 80% HEIGHT VERSION */}
      <div className="relative w-full max-w-[360px] max-h-[90vh] bg-[#050505] rounded-[48px] border border-white/5 shadow-2xl overflow-hidden flex flex-col items-center py-6">
        
        {/* Progress Tracker (Enrollment only) */}
        {mode === 'enroll' && status !== 'success' && status !== 'idle' && (
          <div className="absolute top-0 inset-x-0 h-1 flex gap-1 px-8 mt-2 z-50">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className={`flex-1 rounded-full transition-all duration-500 ${enrollStep > i ? 'bg-[#D4A017]' : 'bg-white/10'}`} />
            ))}
          </div>
        )}

        <div className="w-full flex flex-col items-center justify-between h-full">
          {/* Header - Compacted */}
          <header className="text-center mb-4 w-full px-8">
            <div className={`w-12 h-12 rounded-xl mx-auto flex items-center justify-center mb-4 transition-all duration-500 ${
              status === 'success' ? 'bg-green-500 text-black scale-105 shadow-[0_0_30px_rgba(34,197,94,0.3)]' : 
              status === 'failed' ? 'bg-red-500 text-white animate-shake' : 
              'bg-[#121214] border border-white/5 text-[#D4A017]'
            }`}>
              {status === 'success' ? <CheckCircle2 size={24} strokeWidth={3} /> : 
               status === 'failed' ? <Shield size={24} /> : 
               authMethod === 'face' ? <Fingerprint size={24} strokeWidth={2.2} /> :
               <Lock size={24} strokeWidth={2.2} />}
            </div>
            
            <h2 className="text-[22px] font-black text-white tracking-tight mb-1">
              {status === 'success' ? 'Verified' : 
               status === 'failed' ? 'Denied' : 
               mode === 'enroll' ? 'Face Enroll' : 
               authMethod === 'face' ? 'Biometric Scan' : 'Security PIN'}
            </h2>
            <p className="text-gray-500 text-[8px] font-black uppercase tracking-[0.4em] opacity-60">
               {status === 'scanning' ? 'Processing...' : 
                status === 'verifying' ? 'Encrypting...' :
                mode === 'enroll' ? 'Mapping Vectors' : 'Secure Vault Mode'}
            </p>
          </header>

          {/* Body Area - Strict Center */}
          <div className="w-full px-8 flex flex-col items-center justify-center relative flex-1 min-h-0">
            {authMethod === 'face' ? (
              <div className="relative w-56 h-56 flex items-center justify-center animate-in zoom-in duration-500">
                <div className="absolute inset-0 rounded-full border border-white/[0.03] animate-spin-slow" />
                <div className="absolute inset-[-8px] rounded-full border-t-2 border-[#D4A017] opacity-20 animate-spin-fast" />

                <div className="relative w-40 h-40 rounded-[50px] overflow-hidden border-2 border-white/10 bg-black/40">
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover grayscale brightness-50 contrast-125" />
                  <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)] animate-mesh-pulse" />
                  {(status === 'scanning' || status === 'verifying') && (
                    <div className="absolute inset-x-0 h-[3px] bg-[#D4A017] shadow-[0_0_20px_#D4A017] animate-scan-laser top-0 z-30" />
                  )}
                </div>

                <div className="absolute -bottom-8 inset-x-0 text-center">
                  <span className="text-[9px] font-black text-white uppercase tracking-widest opacity-80">
                    {mode === 'enroll' ? enrollInstructions[enrollStep] : 'Scanning Biometric...'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="w-full space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                {/* PIN Dots Area */}
                <div className="flex justify-center gap-5 mb-2">
                  {[0, 1, 2, 3].map(i => (
                    <div 
                      key={i} 
                      className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${
                        pin.length > i 
                        ? 'bg-white border-white scale-110 shadow-[0_0_12px_rgba(255,255,255,0.4)]' 
                        : status === 'failed' ? 'border-red-500 animate-shake' : 'border-white/10'
                      }`} 
                    />
                  ))}
                </div>

                {/* Keypad Grid - COMPACT VERSION */}
                <div className="grid grid-cols-3 gap-y-2 gap-x-10 max-w-[260px] mx-auto">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'delete'].map((key) => (
                    <button
                      key={key}
                      disabled={!key && key !== '0'}
                      onClick={() => key && handleKeypad(key)}
                      className={`h-12 flex items-center justify-center text-[30px] font-black transition-all active:scale-[0.8] select-none rounded-xl ${
                        key === 'delete' ? 'text-gray-500 hover:text-white' : 
                        !key ? 'pointer-events-none' :
                        'text-white hover:bg-white/[0.03]'
                      }`}
                    >
                      {key === 'delete' ? <Delete size={22} strokeWidth={2.5} className="opacity-60" /> : key}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer - COMPACT */}
          <footer className="mt-6 w-full px-10">
            {mode === 'verify' && (
              <button 
                onClick={() => {
                  if (authMethod === 'face') {
                    stopCamera();
                    setAuthMethod('pin');
                  } else if (isFaceIdEnabled) {
                    setAuthMethod('face');
                  }
                }}
                className="w-full h-12 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-center gap-3 text-white font-black text-[9px] uppercase tracking-[0.2em] active:scale-[0.98] transition-all"
              >
                {authMethod === 'face' ? <Lock size={14} /> : <Fingerprint size={14} className="text-[#D4A017]" />}
                {authMethod === 'face' ? 'Security PIN' : 'Face ID'}
              </button>
            )}
            {mode === 'enroll' && (
              <div className="flex items-center gap-2 p-3 bg-white/[0.03] border border-white/5 rounded-2xl text-gray-500 text-[8px] font-bold uppercase tracking-widest leading-tight text-center">
                 <Info size={12} className="text-[#D4A017] shrink-0" />
                 <span>Scanning vectors. Stay steady for 8 seconds.</span>
              </div>
            )}
          </footer>
        </div>
      </div>

      <style>{`
        @keyframes scan-laser {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan-laser {
          animation: scan-laser 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes mesh-pulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(1.02); }
        }
        .animate-mesh-pulse {
          animation: mesh-pulse 4s ease-in-out infinite;
        }
        .animate-spin-slow { animation: spin 12s linear infinite; }
        .animate-spin-fast { animation: spin 3s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-8px); } 75% { transform: translateX(8px); } }
        .animate-shake { animation: shake 0.12s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default SecurityModal;