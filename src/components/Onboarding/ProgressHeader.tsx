import React from 'react';
import { ArrowLeft, RotateCcw, Award } from 'lucide-react';

interface ProgressHeaderProps {
  currentStep: number;
  totalSteps: number;
  chapterTitle: string;
  chapterBadge: string;
  canGoBack: boolean;
  onBack: () => void;
  onReset: () => void;
}

export const ProgressHeader: React.FC<ProgressHeaderProps> = ({
  currentStep,
  totalSteps,
  chapterTitle,
  chapterBadge,
  canGoBack,
  onBack,
  onReset,
}) => {
  const progressPercent = Math.min(100, Math.round(((currentStep + 1) / totalSteps) * 100));

  return (
    <header className="w-full bg-[#FFF8EA]/90 backdrop-blur-md sticky top-0 z-40 border-b border-[#302747]/10 py-3.5 px-4 md:px-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-2.5">
        {/* Top Row: Brand & Action Controls */}
        <div className="flex items-center justify-between">
          {/* Left: Back Button & Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              disabled={!canGoBack}
              className={`p-2 rounded-2xl border-2 transition-all flex items-center justify-center ${
                canGoBack
                  ? 'border-[#302747]/15 bg-[#FFFDF7] text-[#302747] hover:border-[#7956D8] hover:text-[#7956D8] shadow-playful-sm active:translate-y-0.5 active:shadow-none'
                  : 'border-transparent text-[#302747]/30 cursor-not-allowed opacity-50'
              }`}
              title="Go back to previous question"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Brand Logo */}
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-2xl bg-[#7956D8] flex items-center justify-center shadow-playful-purple-sm">
                <span className="text-white font-extrabold text-lg tracking-tight">S</span>
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-[#302747]">
                  SKILL<span className="text-[#7956D8]">IO</span>
                </span>
                <span className="hidden sm:inline-block ml-2 text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#FFD45C] text-[#302747] border border-[#e0b83e]">
                  Stage 1: Onboarding
                </span>
              </div>
            </div>
          </div>

          {/* Right: Milestone Badge & Reset Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#FFFDF7] border border-[#302747]/15 text-xs font-bold text-[#5D5473] shadow-playful-sm">
              <Award className="w-4 h-4 text-[#FF914D]" />
              <span>{chapterBadge}</span>
              <span className="text-[#302747]/30">•</span>
              <span className="text-[#7956D8]">{chapterTitle}</span>
            </div>

            <button
              onClick={onReset}
              className="p-2 rounded-2xl border border-[#302747]/10 bg-[#FFFDF7] text-[#5D5473] hover:text-[#FF914D] hover:border-[#FF914D]/40 transition-colors shadow-playful-sm"
              title="Reset onboarding and start over"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Row: Gamified Progress Bar */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-3 rounded-full bg-[#302747]/10 p-0.5 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#7956D8] via-[#FF914D] to-[#FFD45C] transition-all duration-500 ease-out shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-extrabold text-[#302747] min-w-16 text-right tabular-nums">
            {currentStep + 1} / {totalSteps} ({progressPercent}%)
          </span>
        </div>
      </div>
    </header>
  );
};
