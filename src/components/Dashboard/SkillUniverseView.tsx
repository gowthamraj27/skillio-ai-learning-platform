import React from 'react';
import { OnboardingData } from '../../types/onboarding';
import { Zap, CheckCircle2, Star } from 'lucide-react';

interface SkillUniverseViewProps {
  data: OnboardingData;
}

export const SkillUniverseView: React.FC<SkillUniverseViewProps> = ({ data }) => {
  const existingSkills = data.skills?.filter(s => s !== 'Beginner / None yet') || [];
  const career = data.careerInterests?.[0] || 'Software Development';

  return (
    <div className="flex flex-col gap-5 pb-8 animate-pop-in">
      {/* Header */}
      <div className="bg-[#FFFCF8] border-2 border-[#E9DFFF] rounded-3xl p-5 shadow-[0_4px_16px_rgba(121,86,216,0.06)]">
        <div className="flex items-center gap-2 mb-1">
          <Zap className="w-5 h-5 text-[#7956D8]" />
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#302747]">
            Skill Progress & Competency Map
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[#5D5473] font-medium">
          A transparent overview of your declared skills and the recommended competencies for {career}.
        </p>
      </div>

      {/* Grid of Categorized Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Identified Skills Card */}
        <div className="bg-[#FFFCF8] border-2 border-[#E9DFFF] rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-sm font-extrabold text-[#065F46]">
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
            <span>Profile-Declared Skills ({existingSkills.length})</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {existingSkills.length > 0 ? (
              existingSkills.map((s) => (
                <div
                  key={s}
                  className="px-3 py-1.5 rounded-xl bg-[#DDF3E8] border border-[#A7F3D0] text-[#065F46] font-bold text-xs"
                >
                  ✓ {s}
                </div>
              ))
            ) : (
              <span className="text-xs text-[#5D5473]">Starting fresh! Complete learning tracks to add verified skills.</span>
            )}
          </div>
        </div>

        {/* Target Milestone Competencies */}
        <div className="bg-[#FFFCF8] border-2 border-[#E9DFFF] rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-sm font-extrabold text-[#FF914D]">
            <Star className="w-4 h-4 text-[#FF914D]" />
            <span>Upcoming Industry Targets</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {['Algorithmic Thinking', 'Clean Code Architecture', 'Git Collaboration', 'Cloud Deployment', 'Testing & CI/CD'].map((s) => (
              <div
                key={s}
                className="px-3 py-1.5 rounded-xl bg-[#FFE1D2]/30 border border-dashed border-[#f0c3ad] text-[#FF914D] font-bold text-xs"
              >
                ⭐ {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
