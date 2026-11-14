import React from 'react';
import { OnboardingData } from '../../types/onboarding';
import { Blobby } from '../Blobby/Blobby';
import { 
  GraduationCap, 
  Compass, 
  Code2, 
  Target, 
  RotateCcw
} from 'lucide-react';

interface ProfileViewProps {
  data: OnboardingData;
  onRetakeOnboarding: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  data,
  onRetakeOnboarding,
}) => {
  return (
    <div className="flex flex-col gap-5 pb-8 animate-pop-in">
      {/* Header Banner with Mascot */}
      <div className="bg-gradient-to-r from-[#6542BC] via-[#7956D8] to-[#A78BFA] rounded-3xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_6px_0_0_#5432a5]">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <Blobby expression="proud" size="sm" />
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#E9DFFF]">
              Official Student Passport
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight">
              {data.name || 'Anonymous Learner'}
            </h1>
            <p className="text-xs text-white/80 mt-0.5">
              Target Career: <strong className="text-white">{data.careerInterests?.[0] || 'Software Development'}</strong>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onRetakeOnboarding}
          className="btn-tactile-secondary py-2 px-4 text-xs flex items-center gap-1.5 shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Edit / Retake Onboarding</span>
        </button>
      </div>

      {/* Profile Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Education & Stage */}
        <div className="card-tactile rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#7956D8]">
            <GraduationCap className="w-4 h-4 text-[#FF914D]" />
            <span>Education & Background</span>
          </div>
          <div className="text-sm font-bold text-[#302747]">
            {data.educationLevel || 'Not specified'}
          </div>
          <div className="text-xs text-[#5D5473]">
            {data.degreeCourse ? `${data.degreeCourse}` : ''} 
            {data.yearOfStudy ? ` • ${data.yearOfStudy}` : ''}
          </div>
        </div>

        {/* Ambition */}
        <div className="card-tactile rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#7956D8]">
            <Target className="w-4 h-4 text-[#FF914D]" />
            <span>North Star Ambition</span>
          </div>
          <div className="text-sm font-bold text-[#302747]">
            {data.ambition || 'Build awesome skills with SKILLIO'}
          </div>
        </div>

        {/* Career Interests */}
        <div className="card-tactile rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#7956D8]">
            <Compass className="w-4 h-4 text-[#FF914D]" />
            <span>Career Interests</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {data.careerInterests?.map((c) => (
              <span key={c} className="badge-peach px-2.5 py-1 text-xs">
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="card-tactile rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#7956D8]">
            <Code2 className="w-4 h-4 text-[#FF914D]" />
            <span>Existing Skills</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {data.skills?.map((s) => (
              <span key={s} className="badge-mint px-2.5 py-1 text-xs">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
