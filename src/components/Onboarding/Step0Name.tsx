import React, { useState } from 'react';
import { OnboardingData } from '../../types/onboarding';
import { User, Sparkles } from 'lucide-react';

interface Step0NameProps {
  data: OnboardingData;
  onChange: (updates: Partial<OnboardingData>) => void;
  onSubmit: () => void;
}

export const Step0Name: React.FC<Step0NameProps> = ({
  data,
  onChange,
  onSubmit,
}) => {
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit();
    }
  };

  const nameVal = data.name || '';

  return (
    <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-md mx-auto animate-pop-in">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFE1D2] text-[#FF914D] text-[10px] sm:text-xs font-extrabold uppercase tracking-wider mb-1.5 border border-[#f0c3ad]">
          <Sparkles className="w-3 h-3" />
          First, Let's Meet!
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#302747] tracking-tight">
          What should I call you?
        </h2>
        <p className="mt-0.5 text-xs font-medium text-[#5D5473]">
          Blobby will personalize your learning adventure and dashboard greeting.
        </p>
      </div>

      {/* Name Input Field */}
      <div className="relative">
        <div className="flex items-center gap-1.5 mb-1.5 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-[#7956D8]">
          <User className="w-3.5 h-3.5 text-[#FF914D]" />
          <span>Your Name or Nickname</span>
        </div>
        <input
          type="text"
          value={nameVal}
          onChange={(e) => {
            onChange({ name: e.target.value });
            setHasInteracted(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="e.g. Arjun, Maya, Alex, Sophia..."
          autoFocus
          className="w-full px-4 py-3 sm:py-3.5 rounded-2xl bg-[#FFFCF8] border-2 border-[#E9DFFF] text-[#302747] placeholder:text-[#8F86A5] text-base sm:text-lg font-bold shadow-sm focus:outline-none focus:border-[#7956D8] focus:ring-4 focus:ring-[#7956D8]/20 transition-all text-center sm:text-left"
        />
        <div className="mt-1.5 flex justify-between text-[11px] text-[#8F86A5] font-medium px-1">
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-[#F3EDFF] text-[#7956D8] font-mono font-bold">Enter ↵</kbd> to continue</span>
          <span>{nameVal.length}/30</span>
        </div>
      </div>

      {/* Dynamic Mini Encouragement when typing */}
      {nameVal.trim().length > 0 && hasInteracted && (
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#7956D8] bg-[#F3EDFF] border border-[#E9DFFF] py-1.5 px-3 rounded-xl animate-pop-in">
          <span>✨</span>
          <span>Awesome! Nice to meet you, {nameVal.trim()}!</span>
        </div>
      )}
    </div>
  );
};
