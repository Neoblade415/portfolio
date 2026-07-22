import React from 'react';
import { cn } from '@/lib/utils';

export interface MacbookProps {
  children?: React.ReactNode;
  className?: string;
  imageSrc?: string;
  videoSrc?: string;
}

export function Macbook({ children, className, imageSrc, videoSrc }: MacbookProps) {
  return (
    <div className={cn("relative w-full max-w-[1200px] mx-auto", className)}>
      {/* Screen Frame */}
      <div className="relative pt-[62.5%] md:pt-[56.25%] bg-[#1a1a1a] rounded-t-xl md:rounded-t-[32px] border-[6px] md:border-[16px] border-[#1a1a1a] shadow-2xl">
        {/* Camera Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] md:w-[120px] h-[12px] md:h-[20px] bg-[#1a1a1a] rounded-b-lg flex items-center justify-center z-20">
            <div className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-[#0a0a0a] border border-[#222]"></div>
        </div>
        
        {/* Screen Content */}
        <div className="absolute inset-0 bg-black overflow-hidden rounded-t-sm md:rounded-t-2xl flex items-center justify-center">
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
      <div className="relative w-[114%] -ml-[7%] h-[12px] md:h-[24px] bg-[#4a4a4a] rounded-b-xl md:rounded-b-3xl rounded-t-sm shadow-2xl flex flex-col items-center overflow-hidden border-t border-[#666]">
        {/* Base Gradient/Shine */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
        {/* Trackpad indentation (conceptual) */}
        <div className="relative w-[15%] h-[4px] md:h-[8px] bg-[#333] rounded-b-md shadow-inner"></div>
      </div>
    </div>
  );
}
