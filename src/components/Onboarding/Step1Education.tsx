import React from 'react';
import { OnboardingData } from '../../types/onboarding';
import { Check } from 'lucide-react';

interface Step1EducationProps {
  data: OnboardingData;
  onChange: (updates: Partial<OnboardingData>) => void;
}

const EDUCATION_LEVELS = [
  { id: 'School student', label: 'School student', icon: '🏫', desc: 'High school or pre-university' },
  { id: 'Undergraduate', label: 'Undergraduate', icon: '🎓', desc: 'B.Tech, B.S., BCA, B.E., etc.' },
  { id: 'Postgraduate', label: 'Postgraduate', icon: '📜', desc: 'M.Tech, M.S., MCA, MBA' },
  { id: 'Working professional', label: 'Working professional', icon: '💼', desc: 'Upskilling or career transition' },
];

const MAJORS = [
  'Computer Science',
  'Information Technology',
  'AI & Data Science',
  'Electronics & Electrical',
  'Mechanical / Civil Eng',
  'Design & Creative Tech',
  'Business & Management',
  'Other / Self-Taught'
];

const YEARS = ['1st Year', '2nd Year', '3rd Year', 'Final Year', 'Recent Graduate'];

export const Step1Education: React.FC<Step1EducationProps> = ({
  data,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-xl mx-auto">
      {/* Question Header */}
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#302747] tracking-tight">
          Where are you in your learning journey?
        </h2>
        <p className="mt-0.5 text-xs font-medium text-[#5D5473]">
          Blobby adapts your learning quests to your academic stage.
        </p>
      </div>

      {/* Main 4 Level Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
        {EDUCATION_LEVELS.map((level) => {
          const isSelected = data.educationLevel === level.id;
          return (
            <button
              key={level.id}
              type="button"
              onClick={() => {
                onChange({ 
                  educationLevel: level.id,
                  degreeCourse: data.degreeCourse || (level.id === 'School student' ? 'High School' : 'Computer Science'),
                  yearOfStudy: data.yearOfStudy || (level.id === 'School student' ? '11th-12th Grade' : '2nd Year')
                });
              }}
              className={`flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl border-2 text-left transition-all duration-200 ${
                isSelected
                  ? 'border-[#7956D8] bg-[#F3EDFF] text-[#7956D8] shadow-[0_3px_0_0_#6542BC] -translate-y-0.5'
                  : 'border-[#E9DFFF] bg-[#FFFFFF] text-[#302747] hover:border-[#A78BFA] hover:bg-[#FAF7FF] hover:-translate-y-0.5 hover:shadow-purple-card'
              }`}
            >
              <span className="text-xl sm:text-2xl select-none shrink-0">{level.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="font-extrabold text-xs sm:text-sm tracking-tight leading-snug">
                  {level.label}
                </div>
                <div className={`text-[10px] sm:text-[11px] mt-0.5 truncate ${isSelected ? 'text-[#7956D8] font-semibold' : 'text-[#5D5473]'}`}>
                  {level.desc}
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

      {/* Dynamic Sub-Fields for Course and Year */}
      {data.educationLevel && (
        <div className="p-3 sm:p-3.5 rounded-xl bg-[#FFFFFF] border-2 border-[#E9DFFF] shadow-sm flex flex-col gap-2.5 animate-pop-in">
          {(data.educationLevel === 'Undergraduate' || data.educationLevel === 'Postgraduate') && (
            <>
              <div>
                <label className="block text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-[#7956D8] mb-1.5">
                  Course / Branch:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {MAJORS.map((major) => (
                    <button
                      key={major}
                      type="button"
                      onClick={() => onChange({ degreeCourse: major })}
                      className={`px-2.5 py-1 rounded-lg border text-[11px] sm:text-xs font-bold transition-all ${
                        data.degreeCourse === major
                          ? 'border-[#7956D8] bg-[#F3EDFF] text-[#7956D8] shadow-[0_2px_0_0_#6542BC]'
                          : 'border-[#E9DFFF] bg-[#FAF7FF] text-[#302747] hover:border-[#A78BFA]'
                      }`}
                    >
                      {major}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-[#7956D8] mb-1.5">
                  Year of study:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {YEARS.map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => onChange({ yearOfStudy: yr })}
                      className={`px-3 py-1 rounded-lg border text-[11px] sm:text-xs font-bold transition-all ${
                        data.yearOfStudy === yr
                          ? 'border-[#7956D8] bg-[#F3EDFF] text-[#7956D8] shadow-[0_2px_0_0_#6542BC]'
                          : 'border-[#E9DFFF] bg-[#FAF7FF] text-[#302747] hover:border-[#A78BFA]'
                      }`}
                    >
                      {yr}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {data.educationLevel === 'School student' && (
            <div>
              <label className="block text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-[#7956D8] mb-1.5">
                Class / Grade level:
              </label>
              <div className="flex flex-col sm:flex-row gap-1.5">
                {['Middle School (6th-8th)', 'High School (9th-10th)', 'Senior Secondary (11th-12th)'].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => onChange({ yearOfStudy: lvl })}
                    className={`flex-1 p-2 rounded-lg border text-xs font-bold transition-all ${
                      data.yearOfStudy === lvl
                        ? 'border-[#7956D8] bg-[#F3EDFF] text-[#7956D8] shadow-[0_2px_0_0_#6542BC]'
                        : 'border-[#E9DFFF] bg-[#FAF7FF] text-[#302747] hover:border-[#A78BFA]'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          )}

          {data.educationLevel === 'Working professional' && (
            <div>
              <label className="block text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-[#7956D8] mb-1.5">
                Current domain or target shift:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {['Software Engineering', 'Data & AI', 'Product & Design', 'Transitioning to Tech'].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => onChange({ degreeCourse: f, yearOfStudy: 'Professional' })}
                    className={`px-3 py-1 rounded-lg border text-xs font-bold transition-all ${
                      data.degreeCourse === f
                        ? 'border-[#7956D8] bg-[#F3EDFF] text-[#7956D8] shadow-[0_2px_0_0_#6542BC]'
                        : 'border-[#E9DFFF] bg-[#FAF7FF] text-[#302747] hover:border-[#A78BFA]'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
