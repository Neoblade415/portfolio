import React from 'react';
import { cn } from '@/lib/utils';

export interface MacbookProps {
  children?: React.ReactNode;
  className?: string;
  imageSrc?: string;
  videoSrc?: string;
  variant?: 'default' | 'midnight-pro' | 'space-black';
}

export function Macbook({ children, className, imageSrc, videoSrc, variant = 'default' }: MacbookProps) {
  const isMidnight = variant === 'midnight-pro';
  const isBlack = variant === 'space-black';
  
  // Colors for different variants
  let frameColor = 'bg-[#1a1a1a] border-[#1a1a1a]';
  let notchColor = 'bg-[#1a1a1a]';
  let baseColor = 'bg-[#4a4a4a]';
  let baseBorderColor = 'border-[#666]';
  let trackpadColor = 'bg-[#333]';
  let gradientColor = 'from-white/20';

  if (isMidnight) {
    frameColor = 'bg-[#0f1115] border-[#0f1115]';
    notchColor = 'bg-[#0f1115]';
    baseColor = 'bg-[#141820]';
    baseBorderColor = 'border-[#2a2e38]';
    trackpadColor = 'bg-[#0f1218]';
    gradientColor = 'from-blue-200/10';
  } else if (isBlack) {
    frameColor = 'bg-[#09090b] border-[#09090b]';
    notchColor = 'bg-[#09090b]';
    baseColor = 'bg-[#121214]';
    baseBorderColor = 'border-[#222]';
    trackpadColor = 'bg-[#0a0a0c]';
    gradientColor = 'from-zinc-400/10';
  }

  return (
    <div className={cn("relative w-full max-w-[1200px] mx-auto", className)}>
      {/* Screen Frame */}
      <div className={cn("relative pt-[62.5%] md:pt-[56.25%] rounded-xl md:rounded-[32px] border-[6px] md:border-[10px] shadow-2xl", frameColor)}>
        {/* Camera Notch */}
        <div className={cn("absolute top-0 left-1/2 -translate-x-1/2 w-[90px] md:w-[160px] h-[14px] md:h-[26px] rounded-b-[10px] md:rounded-b-[14px] flex items-center justify-center z-20", notchColor)}>
            <div className="relative flex items-center gap-1.5 md:gap-3">
              {/* Fake ambient light sensor */}
              <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#050505] opacity-50"></div>
              {/* Main Camera Lens */}
              <div className="w-2 h-2 md:w-3.5 md:h-3.5 rounded-full bg-[#050505] border-[0.5px] border-white/10 shadow-inner flex items-center justify-center">
                <div className="w-[1px] h-[1px] md:w-[1.5px] md:h-[1.5px] rounded-full bg-blue-500/60 blur-[0.2px]"></div>
              </div>
              {/* Fake LED Indicator */}
              <div className="w-0.5 h-0.5 md:w-1 md:h-1 rounded-full bg-[#050505]"></div>
            </div>
        </div>
        
        {/* Screen Content */}
        <div className="absolute inset-0 bg-black overflow-hidden rounded-md md:rounded-[22px] flex items-center justify-center">
          {videoSrc ? (
            <video src={videoSrc} autoPlay loop muted playsInline className="w-full h-full object-cover" />
          ) : imageSrc ? (
            <img src={imageSrc} alt="Macbook Screen" className="w-full h-full object-cover" />
          ) : (
            children
          )}
        </div>
      </div>
      
      {/* Keyboard Base */}
      <div className={cn("relative w-[114%] -ml-[7%] h-[12px] md:h-[24px] rounded-b-xl md:rounded-b-3xl rounded-t-sm shadow-2xl flex flex-col items-center overflow-hidden border-t", baseColor, baseBorderColor)}>
        {/* Base Gradient/Shine */}
        <div className={cn("absolute inset-0 bg-gradient-to-b to-transparent", gradientColor)}></div>
        {/* Trackpad indentation (conceptual) */}
        <div className={cn("relative w-[15%] h-[4px] md:h-[8px] rounded-b-md shadow-inner", trackpadColor)}></div>
      </div>
    </div>
  );
}
