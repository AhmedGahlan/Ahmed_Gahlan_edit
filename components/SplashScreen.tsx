
import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowLogo(true), 300);
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 800);
    }, 3200);
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[250] bg-[#020617] flex items-center justify-center transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative text-center flex flex-col items-center">
        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-600/10 blur-[120px] rounded-full animate-pulse"></div>
        
        <div className={`transition-all duration-1000 transform ${showLogo ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10'}`}>
          <div className="flex flex-col items-center">
            {/* AG Logo Mark */}
            <div className="relative mb-8">
              <div className="w-32 h-32 rounded-[2.5rem] border-2 border-indigo-500/30 flex items-center justify-center relative overflow-hidden glass group shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent"></div>
                <span className="text-6xl font-black gradient-text tracking-tighter select-none">AG</span>
                {/* Orbital lines effect */}
                <div className="absolute inset-0 border border-white/5 rounded-[2.3rem]"></div>
              </div>
              {/* Floating accent stars */}
              <div className="absolute -top-4 -right-4 w-2 h-2 bg-indigo-400 rounded-full animate-ping"></div>
              <div className="absolute -bottom-2 -left-6 w-1.5 h-1.5 bg-rose-400 rounded-full animate-pulse delay-700"></div>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
                أحمد <span className="gradient-text">جهلان</span>
              </h1>
              <p className="text-slate-500 tracking-[0.5em] font-bold text-[10px] md:text-xs uppercase">
                Premium Creative Experience
              </p>
            </div>
          </div>
        </div>

        {/* Loading Progress Bar */}
        <div className="absolute bottom-20 w-40 h-[1.5px] bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-rose-500 animate-[loading_2.8s_ease-in-out_forwards]"></div>
        </div>
      </div>

      <style>{`
        @keyframes loading {
          0% { width: 0%; transform: translateX(-100%); }
          100% { width: 100%; transform: translateX(0%); }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
