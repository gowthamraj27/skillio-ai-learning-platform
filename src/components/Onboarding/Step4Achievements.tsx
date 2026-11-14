import React from 'react';
import { OnboardingData } from '../../types/onboarding';
import { Check } from 'lucide-react';

interface Step4AchievementsProps {
  data: OnboardingData;
  onChange: (updates: Partial<OnboardingData>) => void;
}

const ACHIEVEMENT_OPTIONS = [
  { id: 'Personal / Course Projects', label: 'Personal or Course Projects', icon: '💻', desc: 'Built web apps, scripts, or apps' },
  { id: 'Hackathons', label: 'Hackathons Attended or Won', icon: '🏆', desc: 'Competed in rapid team sprint builds' },
  { id: 'Internships', label: 'Internships / Tech Work', icon: '💼', desc: 'Real-world software or industry experience' },
  { id: 'Certifications', label: 'Technical Certifications', icon: '📜', desc: 'AWS, Google Cloud, Meta, Coursera, etc.' },
  { id: 'Open Source', label: 'Open Source Contributions', icon: '🌐', desc: 'Contributed code to public repositories' },
  { id: 'None yet', label: 'None yet (Excited to build my first!)', icon: '🌱', desc: 'Clean slate ready for action', isExclusive: true },
];

export const Step4Achievements: React.FC<Step4AchievementsProps> = ({
  data,
  onChange,
}) => {
  const selectedTypes = data.achievementTypes || [];

  const handleToggle = (opt: typeof ACHIEVEMENT_OPTIONS[0]) => {
    if (opt.isExclusive) {
      if (selectedTypes.includes(opt.id)) {
        onChange({ achievementTypes: [] });
      } else {
        onChange({ achievementTypes: [opt.id] });
      }
      return;
    }

    const clean = selectedTypes.filter(t => t !== 'None yet');
    if (clean.includes(opt.id)) {
      onChange({ achievementTypes: clean.filter(t => t !== opt.id) });
    } else {
      onChange({ achievementTypes: [...clean, opt.id] });
    }
  };

  return (
    <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#F3EDFF] text-[#7956D8] text-[10px] sm:text-xs font-extrabold uppercase tracking-wider mb-1 border border-[#E9DFFF]">
          Optional Step
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#302747] tracking-tight">
          What have you worked on so far?
        </h2>
        <p className="mt-0.5 text-xs font-medium text-[#5D5473]">
          Select any achievements that apply, or tell Blobby a bit more.
        </p>
      </div>

      {/* Achievement Checkbox Grid in responsive columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
        {ACHIEVEMENT_OPTIONS.map((item) => {
          const isSelected = selectedTypes.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleToggle(item)}
              className={`flex items-start gap-2.5 p-2.5 rounded-xl border-2 text-left transition-all duration-200 ${
                isSelected
                  ? 'border-[#7956D8] bg-[#F3EDFF] text-[#7956D8] shadow-[0_3px_0_0_#6542BC] -translate-y-0.5'
                  : item.isExclusive
                  ? 'border-dashed border-[#A78BFA] bg-[#FAF7FF] text-[#5D5473] hover:border-[#7956D8]'
                  : 'border-[#E9DFFF] bg-[#FFFFFF] text-[#302747] hover:border-[#A78BFA] hover:bg-[#FAF7FF] hover:-translate-y-0.5 hover:shadow-purple-card'
              }`}
            >
              <span className="text-xl select-none shrink-0">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="font-extrabold text-xs sm:text-sm tracking-tight leading-snug">
                  {item.label}
                </div>
                <div className={`text-[10px] sm:text-[11px] mt-0.5 truncate ${isSelected ? 'text-[#7956D8] font-medium' : 'text-[#5D5473]'}`}>
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

      {/* Optional Free-Form Achievement Details */}
      <div className="p-2.5 sm:p-3 rounded-xl bg-[#FFFFFF] border-2 border-[#E9DFFF] shadow-sm flex flex-col gap-1">
        <label className="text-[11px] sm:text-xs font-bold text-[#7956D8]">
          Want to share details about a favorite project or achievement? (Optional)
        </label>
        <textarea
          rows={2}
          value={data.achievementsDetail || ''}
          onChange={(e) => onChange({ achievementsDetail: e.target.value })}
          placeholder="e.g. Built a full-stack e-commerce site, runner-up in hackathon, AWS certified..."
          className="w-full p-2 rounded-xl bg-[#FAF7FF] border border-[#E9DFFF] text-[#302747] placeholder:text-[#8F86A5] text-xs sm:text-sm focus:outline-none focus:border-[#7956D8] focus:ring-2 focus:ring-[#7956D8]/20 transition-all resize-none"
        />
      </div>
    </div>
  );
};
