import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

interface SpeechBubbleProps {
  message: string;
  isReaction?: boolean;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
  className?: string;
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  message,
  isReaction = false,
  soundEnabled = false,
  onToggleSound,
  className = ''
}) => {
  return (
    <div className={`relative max-w-xl w-full ${className}`}>
      {/* Speech Bubble Card with Warm Off-White and Peach / Purple Palette */}
      <div 
        className={`relative p-3.5 sm:p-4 rounded-3xl transition-all duration-200 ${
          isReaction 
            ? 'bg-[#FFFCF8] border-2 border-[#FF914D] shadow-[0_4px_0_0_#e6742d]' 
            : 'bg-[#FFFCF8] border-2 border-[#E9DFFF] shadow-[0_4px_0_0_#FFE1D2] hover:border-[#7956D8] hover:shadow-[0_4px_0_0_#E9DFFF]'
        }`}
      >
        {/* Top Header inside Bubble: Badge & Audio Toggle */}
        <div className="flex items-center justify-between mb-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFE1D2] text-[#FF914D] text-[10px] sm:text-xs font-extrabold uppercase tracking-wider border border-[#f0c3ad]">
            <Sparkles className="w-3 h-3 text-[#FF914D]" />
            <span>{isReaction ? 'Blobby Cheering' : 'Blobby Says'}</span>
          </div>

          {onToggleSound && (
            <button
              onClick={onToggleSound}
              type="button"
              className="p-1 rounded-full text-[#5D5473] hover:text-[#7956D8] hover:bg-[#F3EDFF] transition-all"
              title={soundEnabled ? 'Mute sound effects' : 'Enable playful sound effects'}
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-[#7956D8]" />
              ) : (
                <VolumeX className="w-3.5 h-3.5" />
              )}
            </button>
          )}
        </div>

        {/* Message Content */}
        <p className="text-sm sm:text-base font-bold text-[#302747] leading-snug">
          {message}
        </p>

        {/* Pointer Triangle: Left side on desktop */}
        <div className="hidden sm:block absolute top-1/2 -left-2 -translate-y-1/2 w-2 h-4 overflow-hidden pointer-events-none">
          <div 
            className={`w-3 h-3 rotate-45 -translate-x-1.5 translate-y-0.5 border-l-2 border-b-2 ${
              isReaction ? 'bg-[#FFFCF8] border-[#FF914D]' : 'bg-[#FFFCF8] border-[#E9DFFF]'
            }`} 
          />
        </div>
        {/* Pointer Triangle: Bottom on mobile */}
        <div className="sm:hidden absolute -bottom-2.5 left-6 w-5 h-2.5 overflow-hidden pointer-events-none">
          <div 
            className={`w-3 h-3 mx-auto rotate-45 -translate-y-1.5 border-b-2 border-r-2 ${
              isReaction ? 'bg-[#FFFCF8] border-[#FF914D]' : 'bg-[#FFFCF8] border-[#E9DFFF]'
            }`} 
          />
        </div>
      </div>
    </div>
  );
};
