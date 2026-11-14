import React, { useState } from 'react';
import { OnboardingData } from '../../types/onboarding';
import { Blobby } from '../Blobby/Blobby';
import { 
  Sparkles, 
  GraduationCap, 
  Target, 
  Code2, 
  Trophy, 
  CheckCircle2, 
  Edit3, 
  Compass,
  ArrowRight
} from 'lucide-react';

interface CompletionSceneProps {
  data: OnboardingData;
  onEditStep: (stepNumber: number) => void;
  onExploreJourney: () => void;
}

export const CompletionScene: React.FC<CompletionSceneProps> = ({
  data,
  onEditStep,
  onExploreJourney,
}) => {
  const [showNextStageModal, setShowNextStageModal] = useState(false);

  const handleExploreClick = () => {
    onExploreJourney();
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-3 sm:gap-4 pb-4 animate-pop-in">
      {/* Blobby Celebrating at the Top */}
      <div className="flex flex-col items-center">
        <Blobby expression="celebrating" size="md" />
      </div>

      {/* Encouraging Headline */}
      <div className="text-center max-w-lg">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F3EDFF] text-[#7956D8] text-[10px] sm:text-xs font-extrabold uppercase tracking-wider mb-1 border border-[#E9DFFF]">
          <Sparkles className="w-3 h-3 text-[#A78BFA]" />
          Onboarding Completed
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#302747] tracking-tight">
          “Awesome! I’ve got a better idea of who you are. Let’s build your next level!”
        </h1>
        <p className="mt-0.5 text-xs text-[#5D5473] font-medium">
          Here is your compact profile summary. You can review or tweak any answer before taking off!
        </p>
      </div>

      {/* COMPACT SUMMARY CARD IN PURPLE IDENTITY */}
      <div className="w-full rounded-2xl bg-[#FFFFFF] border-2 border-[#7956D8] shadow-[0_6px_0_0_#6542BC] overflow-hidden">
        {/* Card Header Strip: Gradient across purples */}
        <div className="bg-gradient-to-r from-[#6542BC] via-[#7956D8] to-[#A78BFA] px-4 py-2 text-white flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-base">🪪</span>
            <span className="font-extrabold text-xs uppercase tracking-wider">
              SKILLIO Student Identity
            </span>
          </div>
          <span className="text-[10px] font-bold text-white bg-white/20 px-2 py-0.5 rounded-full border border-white/20">
            5 of 5 Verified
          </span>
        </div>

        {/* 5 Summary Rows with Edit Action */}
        <div className="p-3 sm:p-4 flex flex-col gap-2.5 divide-y divide-[#E9DFFF]">
          {/* Row 1: Education */}
          <div className="flex items-start justify-between gap-3 pt-0.5">
            <div className="flex items-start gap-2">
              <GraduationCap className="w-3.5 h-3.5 text-[#7956D8] shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#7956D8] block">
                  Education
                </span>
                <span className="text-xs font-bold text-[#302747]">
                  {data.educationLevel || 'Not specified'} 
                  {data.degreeCourse ? ` • ${data.degreeCourse}` : ''}
                  {data.yearOfStudy ? ` (${data.yearOfStudy})` : ''}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(1)}
              className="text-[11px] font-bold text-[#7956D8] hover:text-[#6542BC] hover:underline flex items-center gap-0.5 shrink-0"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>

          {/* Row 2: Career Interests */}
          <div className="flex items-start justify-between gap-3 pt-2">
            <div className="flex items-start gap-2">
              <Compass className="w-3.5 h-3.5 text-[#7956D8] shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#7956D8] block mb-0.5">
                  Interests
                </span>
                <div className="flex flex-wrap gap-1">
                  {data.careerInterests && data.careerInterests.length > 0 ? (
                    data.careerInterests.map((interest) => (
                      <span
                        key={interest}
                        className="px-2 py-0.5 rounded-md bg-[#F3EDFF] text-[#7956D8] border border-[#E9DFFF] text-[10px] font-bold"
                      >
                        {interest}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-[#5D5473]">Still exploring</span>
                  )}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(2)}
              className="text-[11px] font-bold text-[#7956D8] hover:text-[#6542BC] hover:underline flex items-center gap-0.5 shrink-0"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>

          {/* Row 3: Skills */}
          <div className="flex items-start justify-between gap-3 pt-2">
            <div className="flex items-start gap-2">
              <Code2 className="w-3.5 h-3.5 text-[#7956D8] shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#7956D8] block mb-0.5">
                  Skills
                </span>
                <div className="flex flex-wrap gap-1">
                  {data.skills && data.skills.length > 0 ? (
                    data.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-[#F3EDFF] text-[#7956D8] border border-[#E9DFFF] text-[10px] font-bold"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-[#5D5473]">Beginner / None yet</span>
                  )}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(3)}
              className="text-[11px] font-bold text-[#7956D8] hover:text-[#6542BC] hover:underline flex items-center gap-0.5 shrink-0"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>

          {/* Row 4: Achievements */}
          <div className="flex items-start justify-between gap-3 pt-2">
            <div className="flex items-start gap-2">
              <Trophy className="w-3.5 h-3.5 text-[#A78BFA] shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#7956D8] block mb-0.5">
                  Achievements
                </span>
                <div className="flex flex-wrap gap-1">
                  {data.achievementTypes && data.achievementTypes.length > 0 ? (
                    data.achievementTypes.map((ach) => (
                      <span
                        key={ach}
                        className="px-2 py-0.5 rounded-md bg-[#FAF7FF] text-[#302747] border border-[#E9DFFF] text-[10px] font-bold"
                      >
                        {ach}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-[#5D5473]">Starting fresh (optional)</span>
                  )}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(4)}
              className="text-[11px] font-bold text-[#7956D8] hover:text-[#6542BC] hover:underline flex items-center gap-0.5 shrink-0"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>

          {/* Row 5: Ambition */}
          <div className="flex items-start justify-between gap-3 pt-2">
            <div className="flex items-start gap-2">
              <Target className="w-3.5 h-3.5 text-[#7956D8] shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#7956D8] block">
                  Goal
                </span>
                <span className="text-xs font-extrabold text-[#302747] block truncate">
                  {data.ambition || 'Build awesome skills with SKILLIO'}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(5)}
              className="text-[11px] font-bold text-[#7956D8] hover:text-[#6542BC] hover:underline flex items-center gap-0.5 shrink-0"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-4 py-2.5 bg-[#FAF7FF] border-t-2 border-[#E9DFFF] flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#5D5473]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Active for your learning session</span>
          </div>

          <button
            type="button"
            onClick={handleExploreClick}
            className="w-full sm:w-auto btn-tactile-primary px-6 py-2.5 text-xs sm:text-sm flex items-center justify-center gap-1.5"
          >
            <span>Explore My Learning Journey</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Simple Placeholder Transition Modal */}
      {showNextStageModal && (
        <div className="fixed inset-0 z-50 bg-[#302747]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-pop-in">
          <div className="bg-[#FFFFFF] border-3 border-[#7956D8] rounded-2xl max-w-sm w-full p-5 shadow-[0_16px_36px_rgba(121,86,216,0.25)] flex flex-col items-center text-center">
            <Blobby expression="proud" size="sm" />

            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F3EDFF] text-[#7956D8] text-[10px] font-extrabold uppercase mt-2 mb-1 border border-[#E9DFFF]">
              🎉 Stage 1 Complete
            </div>

            <h3 className="text-xl font-extrabold text-[#302747]">
              Next Level Unlocked!
            </h3>

            <p className="text-xs font-medium text-[#5D5473] mt-1 mb-4">
              Blobby has mapped your responses into a personalized learning journey. Ready for dashboard integration!
            </p>

            <button
              type="button"
              onClick={() => setShowNextStageModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#7956D8] text-white font-extrabold text-xs shadow-playful-purple-sm hover:bg-[#6542BC] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Back to Summary
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
