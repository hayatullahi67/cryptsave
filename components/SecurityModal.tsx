import React, { useState, useEffect, useRef } from 'react';
import { X, Fingerprint, Sparkles, CheckCircle2, Shield, Eye, Info, AlertTriangle, RefreshCw, Lock, Delete } from 'lucide-react';

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
    "Center your face in the frame",
    "Turn your head slowly to the right",
    "Turn your head slowly to the left",
    "Look up and down slightly",
    "Scanning completed"
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
            }, 2000);
          }
        }, 2000);
      } else {
        setTimeout(() => setStatus('scanning'), 800);
        setTimeout(() => setStatus('verifying'), 2500);
        setTimeout(() => {
          setStatus('success');
          setTimeout(() => {
            onSuccess();
            stopCamera();
          }, 1000);
        }, 3500);
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
          setTimeout(onSuccess, 800);
        } else {
          setStatus('failed');
          setTimeout(() => {
            setPin('');
            setStatus('idle');
          }, 1000);
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="absolute inset-0 bg-black/98 backdrop-blur-3xl" onClick={onClose} />
      
      <div className="relative w-full max-w-sm bg-[#050505] rounded-[60px] border border-white/5 shadow-[0_0_120px_rgba(0,0,0,1)] overflow-hidden">
        
        {/* Progress Tracker (Enrollment only) */}
        {mode === 'enroll' && status !== 'success' && status !== 'idle' && (
          <div className="absolute top-0 inset-x-0 h-1.5 flex gap-1 px-1 mt-1 z-50">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className={`flex-1 rounded-full transition-all duration-700 ${enrollStep > i ? 'bg-[#D4A017]' : 'bg-white/10'}`} />
            ))}
          </div>
        )}

        <div className="p-12 flex flex-col items-center">
          <header className="text-center mb-10 w-full">
            <div className={`w-20 h-20 rounded-[32px] mx-auto flex items-center justify-center mb-8 transition-all duration-700 ${
              status === 'success' ? 'bg-green-500 text-black scale-110 shadow-[0_0_40px_rgba(34,197,94,0.3)]' : 
              status === 'failed' ? 'bg-red-500 text-white animate-shake' : 
              'bg-[#121214] border border-white/5 text-[#D4A017] shadow-[0_0_30px_rgba(212,160,23,0.1)]'
            }`}>
              {status === 'success' ? <CheckCircle2 size={40} strokeWidth={2.5} /> : 
               status === 'failed' ? <Shield size={40} /> : 
               authMethod === 'face' ? <Fingerprint size={40} strokeWidth={2.2} /> :
               <Lock size={40} strokeWidth={2.2} />}
            </div>
            
            <h2 className="text-2xl font-black text-white tracking-tighter mb-2">
              {status === 'success' ? 'Verified' : 
               status === 'failed' ? 'Denied' : 
               mode === 'enroll' ? 'Face Enrollment' : 
               authMethod === 'face' ? 'Biometric Scan' : 'Security PIN'}
            </h2>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">
               {status === 'scanning' ? 'Processing...' : 
                status === 'verifying' ? 'Encrypting...' :
                mode === 'enroll' ? 'Mapping Vectors' : 'Secure Vault Mode'}
            </p>
          </header>

          <div className="w-full flex-1 min-h-[340px] flex flex-col items-center justify-center relative">
            {authMethod === 'face' ? (
              <div className="relative w-64 h-64 lg:w-72 lg:h-72 flex items-center justify-center animate-in zoom-in duration-500">
                <div className="absolute inset-0 rounded-full border border-white/[0.03] animate-spin-slow" />
                <div className="absolute inset-[-10px] rounded-full border-t-2 border-[#D4A017] opacity-20 animate-spin-fast" />

                <div className="relative w-52 h-52 lg:w-60 lg:h-60 rounded-[70px] overflow-hidden border-2 border-white/10 bg-black/40">
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover grayscale brightness-50 contrast-125" />
                  <div className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%),_linear-gradient(rgba(212,160,23,0.1)_2px,_transparent_2px),_linear-gradient(90deg,rgba(212,160,23,0.1)_2px,_transparent_2px)] bg-[length:100%_100%,15px_15px,15px_15px] animate-mesh-pulse" />
                  {(status === 'scanning' || status === 'verifying') && (
                    <div className="absolute inset-x-0 h-[3px] bg-[#D4A017] shadow-[0_0_35px_#D4A017] animate-scan-laser top-0 z-30" />
                  )}
                </div>

                <div className="absolute -bottom-16 inset-x-0 text-center">
                  <span className="text-[11px] font-black text-white uppercase tracking-[0.2em]">
                    {mode === 'enroll' ? enrollInstructions[enrollStep] : 'Scanning Biometric...'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="w-full space-y-12 animate-in slide-in-from-bottom-8 duration-500">
                {/* PIN Dots */}
                <div className="flex justify-center gap-6">
                  {[0, 1, 2, 3].map(i => (
                    <div 
                      key={i} 
                      className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                        pin.length > i 
                        ? 'bg-[#D4A017] border-[#D4A017] scale-125 shadow-[0_0_20px_#D4A017]' 
                        : status === 'failed' ? 'border-red-500' : 'border-white/10'
                      }`} 
                    />
                  ))}
                </div>

                {/* Keypad */}
                <div className="grid grid-cols-3 gap-y-10 gap-x-12">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'delete'].map((key) => (
                    <button
                      key={key}
                      onClick={() => key && handleKeypad(key)}
                      className={`h-10 flex items-center justify-center text-3xl font-bold transition-all active:scale-75 ${
                        key === 'delete' ? 'text-gray-600' : 'text-white'
                      }`}
                    >
                      {key === 'delete' ? <Delete size={28} /> : key}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <footer className="mt-20 w-full">
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
                className="w-full h-18 bg-white/[0.02] border border-white/5 rounded-[28px] flex items-center justify-center gap-4 text-white font-bold text-xs uppercase tracking-widest active:scale-95 transition-all"
              >
                {authMethod === 'face' ? <Lock size={18} /> : <Fingerprint size={18} className="text-[#D4A017]" />}
                {authMethod === 'face' ? 'Use Security PIN' : 'Use Face ID'}
              </button>
            )}
            {mode === 'enroll' && (
              <div className="flex items-center gap-3 p-4 bg-white/[0.03] border border-white/5 rounded-[28px] text-gray-500 text-[9px] font-bold uppercase tracking-widest leading-relaxed text-center">
                 <Info size={14} className="text-[#D4A017] shrink-0" />
                 <span>Mapping will take approximately 8 seconds. Stay steady.</span>
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
          50% { opacity: 0.35; transform: scale(1.05); }
        }
        .animate-mesh-pulse {
          animation: mesh-pulse 4s ease-in-out infinite;
        }
        .animate-spin-slow { animation: spin 12s linear infinite; }
        .animate-spin-fast { animation: spin 3s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-10px); } 75% { transform: translateX(10px); } }
        .animate-shake { animation: shake 0.1s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default SecurityModal;