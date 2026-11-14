import React, { useState } from 'react';
import { OnboardingData } from '../../types/onboarding';
import { Check, Plus, Sparkles, X } from 'lucide-react';

interface Step3SkillsProps {
  data: OnboardingData;
  onChange: (updates: Partial<OnboardingData>) => void;
}

const DEFAULT_SKILLS = [
  { id: 'Python', label: 'Python', icon: '🐍' },
  { id: 'C++', label: 'C++', icon: '⚡' },
  { id: 'Java', label: 'Java', icon: '☕' },
  { id: 'Web Development', label: 'Web Development', icon: '🌐' },
  { id: 'Communication', label: 'Communication', icon: '💬' },
  { id: 'Problem Solving', label: 'Problem Solving', icon: '🧩' },
  { id: 'Machine Learning', label: 'Machine Learning', icon: '🧠' },
  { id: 'Beginner / None yet', label: 'Beginner / None yet', icon: '🌱', isExclusive: true },
];

export const Step3Skills: React.FC<Step3SkillsProps> = ({
  data,
  onChange,
}) => {
  const [customSkill, setCustomSkill] = useState('');
  const currentSkills = data.skills || [];

  const handleToggle = (skillLabel: string, isExclusive?: boolean) => {
    if (isExclusive) {
      if (currentSkills.includes(skillLabel)) {
        onChange({ skills: [] });
      } else {
        onChange({ skills: [skillLabel] });
      }
      return;
    }

    const clean = currentSkills.filter(s => s !== 'Beginner / None yet');
    if (clean.includes(skillLabel)) {
      onChange({ skills: clean.filter(s => s !== skillLabel) });
    } else {
      onChange({ skills: [...clean, skillLabel] });
    }
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customSkill.trim();
    if (!trimmed) return;

    const clean = currentSkills.filter(s => s !== 'Beginner / None yet');
    if (!clean.includes(trimmed)) {
      onChange({ skills: [...clean, trimmed] });
    }
    setCustomSkill('');
  };

  const handleRemoveCustom = (skillName: string) => {
    onChange({ skills: currentSkills.filter(s => s !== skillName) });
  };

  return (
    <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#302747] tracking-tight">
          What skills do you already have?
        </h2>
        <p className="mt-0.5 text-xs font-medium text-[#5D5473]">
          Select the tools or abilities you have used, or add your own!
        </p>
      </div>

      {/* Selectable Skill Chips */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
        {DEFAULT_SKILLS.map((skill) => {
          const isSelected = currentSkills.includes(skill.label);
          return (
            <button
              key={skill.id}
              type="button"
              onClick={() => handleToggle(skill.label, skill.isExclusive)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border-2 font-bold text-xs sm:text-sm transition-all select-none ${
                isSelected
                  ? 'border-[#7956D8] bg-[#F3EDFF] text-[#7956D8] shadow-[0_3px_0_0_#6542BC] -translate-y-0.5'
                  : skill.isExclusive
                  ? 'border-dashed border-[#A78BFA] bg-[#FAF7FF] text-[#5D5473] hover:border-[#7956D8] hover:bg-[#F3EDFF]/50'
                  : 'border-[#E9DFFF] bg-[#FFFFFF] text-[#302747] hover:border-[#A78BFA] hover:bg-[#FAF7FF] hover:-translate-y-0.5 hover:shadow-purple-card'
              }`}
            >
              <span className="text-sm sm:text-base">{skill.icon}</span>
              <span>{skill.label}</span>
              {isSelected && (
                <span className="w-3.5 h-3.5 rounded-full bg-[#7956D8] text-white flex items-center justify-center ml-0.5 shadow-sm">
                  <Check className="w-2 h-2 stroke-[3]" />
                </span>
              )}
            </button>
          );
        })}

        {/* User Added Custom Skills */}
        {currentSkills
          .filter(s => !DEFAULT_SKILLS.some(d => d.label === s))
          .map((custom) => (
            <span
              key={custom}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-[#7956D8] bg-[#F3EDFF] text-[#7956D8] font-bold text-xs sm:text-sm shadow-[0_2px_0_0_#6542BC] animate-pop-in"
            >
              <Sparkles className="w-3 h-3 text-[#A78BFA]" />
              <span>{custom}</span>
              <button
                type="button"
                onClick={() => handleRemoveCustom(custom)}
                className="hover:text-[#6542BC] ml-1 p-0.5"
                title="Remove skill"
              >
                <X className="w-3 h-3 stroke-[3]" />
              </button>
            </span>
          ))}
      </div>

      {/* Add Custom Skill Form */}
      <form onSubmit={handleAddCustom} className="flex gap-2 max-w-md mx-auto w-full mt-1">
        <input
          type="text"
          value={customSkill}
          onChange={(e) => setCustomSkill(e.target.value)}
          placeholder="Add custom skill (e.g. React, SQL, Figma)..."
          className="flex-1 px-3.5 py-2 rounded-xl bg-[#FFFFFF] border-2 border-[#E9DFFF] text-[#302747] placeholder:text-[#8F86A5] text-xs sm:text-sm font-semibold shadow-sm focus:outline-none focus:border-[#7956D8] focus:ring-4 focus:ring-[#7956D8]/15"
        />
        <button
          type="submit"
          disabled={!customSkill.trim()}
          className="px-3.5 py-2 rounded-xl bg-[#7956D8] text-white font-bold text-xs sm:text-sm shadow-playful-purple-sm hover:bg-[#6542BC] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 transition-all shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>
      </form>
    </div>
  );
};
