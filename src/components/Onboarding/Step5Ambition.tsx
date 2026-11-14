import React from 'react';
import { OnboardingData } from '../../types/onboarding';
import { Sparkles, Target } from 'lucide-react';

interface Step5AmbitionProps {
  data: OnboardingData;
  onChange: (updates: Partial<OnboardingData>) => void;
  onSubmit: () => void;
}

const SUGGESTED_GOALS = [
  '🎯 Land a high-growth tech internship this year',
  '🚀 Build and ship an AI product that real users love',
  '🧠 Master modern full-stack web development',
  '🏆 Win an upcoming major hackathon',
  '💼 Transition into a software engineering role',
  '🌟 Publish an open-source project with active users',
];

export const Step5Ambition: React.FC<Step5AmbitionProps> = ({
  data,
  onChange,
  onSubmit,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#302747] tracking-tight">
          What is one thing you really want to achieve?
        </h2>
        <p className="mt-0.5 text-xs font-medium text-[#5D5473]">
          Type your dream milestone or tap one of the suggested goals below.
        </p>
      </div>

      {/* Main Text Input */}
      <div className="relative">
        <div className="flex items-center gap-1.5 mb-1.5 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-[#7956D8]">
          <Target className="w-3.5 h-3.5" />
          <span>Your North Star Goal</span>
        </div>
        <input
          type="text"
          value={data.ambition || ''}
          onChange={(e) => onChange({ ambition: e.target.value })}
          onKeyDown={handleKeyDown}
          placeholder="e.g. Land a remote software internship, build an AI app..."
          autoFocus
          className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-[#FFFFFF] border-2 border-[#E9DFFF] text-[#302747] placeholder:text-[#8F86A5] text-sm sm:text-base font-bold shadow-sm focus:outline-none focus:border-[#7956D8] focus:ring-4 focus:ring-[#7956D8]/20 transition-all"
        />
        <div className="mt-1 flex justify-between text-[11px] text-[#8F86A5] font-medium px-1">
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-[#F3EDFF] text-[#7956D8] font-mono font-bold">Enter ↵</kbd> to save</span>
          <span>{(data.ambition || '').length}/100</span>
        </div>
      </div>

      {/* Suggested Quick Goals in 2 columns */}
      <div>
        <label className="block text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-[#7956D8] mb-1.5">
          Or pick from suggested ambitions:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SUGGESTED_GOALS.map((goal) => {
            const isPicked = data.ambition === goal;
            return (
              <button
                key={goal}
                type="button"
                onClick={() => onChange({ ambition: goal })}
                className={`text-left px-3 py-2 rounded-xl border-2 text-xs font-bold transition-all truncate ${
                  isPicked
                    ? 'border-[#7956D8] bg-[#F3EDFF] text-[#7956D8] shadow-[0_2px_0_0_#6542BC] -translate-y-0.5'
                    : 'border-[#E9DFFF] bg-[#FFFFFF] text-[#302747] hover:border-[#A78BFA] hover:bg-[#FAF7FF] hover:-translate-y-0.5 hover:shadow-purple-card'
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <Sparkles className="w-3 h-3 text-[#A78BFA] shrink-0" />
                  <span className="truncate">{goal}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
