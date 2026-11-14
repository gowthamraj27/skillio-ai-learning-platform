import React from 'react';
import { OnboardingData } from '../../types/onboarding';
import { Check } from 'lucide-react';

interface Step2InterestsProps {
  data: OnboardingData;
  onChange: (updates: Partial<OnboardingData>) => void;
}

const CAREER_INTERESTS = [
  { id: 'Artificial Intelligence', label: 'Artificial Intelligence', icon: '🤖', desc: 'LLMs, autonomous agents, neural tech' },
  { id: 'Software Development', label: 'Software Development', icon: '💻', desc: 'Full-stack web, cloud systems, mobile apps' },
  { id: 'Data Science', label: 'Data Science', icon: '📊', desc: 'Analytics, predictive models, insights' },
  { id: 'Cybersecurity', label: 'Cybersecurity', icon: '🛡️', desc: 'Ethical hacking, defense, network safety' },
  { id: 'Robotics', label: 'Robotics', icon: '🦾', desc: 'Hardware, automation, embedded systems' },
  { id: 'Business and Entrepreneurship', label: 'Business and Entrepreneurship', icon: '🚀', desc: 'Tech startups, venture building, leadership' },
  { id: 'Design and Creativity', label: 'Design and Creativity', icon: '🎨', desc: 'UI/UX design, visual identity, interactions' },
  { id: 'Still exploring', label: 'Still exploring', icon: '🧭', desc: 'Keep options open & explore everything', isExclusive: true },
];

export const Step2Interests: React.FC<Step2InterestsProps> = ({
  data,
  onChange,
}) => {
  const selectedInterests = data.careerInterests || [];

  const handleToggle = (item: typeof CAREER_INTERESTS[0]) => {
    if (item.isExclusive) {
      if (selectedInterests.includes(item.id)) {
        onChange({ careerInterests: [] });
      } else {
        onChange({ careerInterests: [item.id] });
      }
      return;
    }

    const clean = selectedInterests.filter(i => i !== 'Still exploring');
    if (clean.includes(item.id)) {
      onChange({ careerInterests: clean.filter(i => i !== item.id) });
    } else {
      onChange({ careerInterests: [...clean, item.id] });
    }
  };

  return (
    <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#302747] tracking-tight">
          What kind of future excites you?
        </h2>
        <p className="mt-0.5 text-xs font-medium text-[#5D5473]">
          Select all the domains that spark your curiosity (choose 1 or more).
        </p>
      </div>

      {/* Floating Career Interest Cards in responsive columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
        {CAREER_INTERESTS.map((item) => {
          const isSelected = selectedInterests.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleToggle(item)}
              className={`flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl border-2 text-left transition-all duration-200 ${
                isSelected
                  ? 'border-[#7956D8] bg-[#F3EDFF] text-[#7956D8] shadow-[0_3px_0_0_#6542BC] -translate-y-0.5'
                  : item.isExclusive
                  ? 'border-dashed border-[#A78BFA] bg-[#FAF7FF] text-[#5D5473] hover:border-[#7956D8] hover:bg-[#F3EDFF]/50'
                  : 'border-[#E9DFFF] bg-[#FFFFFF] text-[#302747] hover:border-[#A78BFA] hover:bg-[#FAF7FF] hover:-translate-y-0.5 hover:shadow-purple-card'
              }`}
            >
              <span className="text-xl sm:text-2xl select-none shrink-0">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="font-extrabold text-xs sm:text-sm tracking-tight leading-snug">
                  {item.label}
                </div>
                <div className={`text-[10px] sm:text-[11px] mt-0.5 truncate ${isSelected ? 'text-[#7956D8] font-semibold' : 'text-[#5D5473]'}`}>
                  {item.desc}
                </div>
              </div>
              {isSelected && (
                <div className="w-4 h-4 rounded-full bg-[#7956D8] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
