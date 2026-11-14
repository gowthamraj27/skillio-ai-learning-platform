import React, { useState } from 'react';
import { OnboardingData, BlobbyExpression } from '../../types/onboarding';
import { Blobby } from '../Blobby/Blobby';
import { CAREER_PATHS } from '../../data/careersData';
import { COMPANIES_DATA } from '../../data/companiesData';
import { VERIFIED_COURSES } from '../../data/learningData';
import { DashboardTab } from './Sidebar';
import { 
  Sparkles, 
  ExternalLink, 
  Clock, 
  Award, 
  Flame, 
  Compass, 
  CheckCircle2, 
  ArrowRight,
  Building2,
  Check,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/audio';

interface DashboardHomeProps {
  data: OnboardingData;
  onExploreCourse: (url: string) => void;
  onNavigateTab: (tab: DashboardTab) => void;
  trackedXP: number;
  trackedStreak: number;
  completedMissions: string[];
  onCompleteMission: (missionId: string, xp: number) => void;
}

const MISSIONS_LIST = [
  {
    id: 'mission-py-func',
    title: 'Master Functions & Reusable Code',
    whatToDo: 'Write 3 modular Python functions with return values and clean syntax.',
    whyItMatters: 'Functions are the fundamental building blocks of all software.',
    timeMinutes: 20,
    xpReward: 50,
    skillImprovement: '+15 in Logic & Functions',
    resourceName: 'Kaggle: Python Functions',
    url: 'https://www.kaggle.com/learn/python'
  },
  {
    id: 'mission-sql-select',
    title: 'Query Relational Data with SQL',
    whatToDo: 'Practice essential SELECT, WHERE, and ORDER BY queries on real datasets.',
    whyItMatters: 'Every engineering role requires querying structured data directly.',
    timeMinutes: 25,
    xpReward: 50,
    skillImprovement: '+20 in SQL Retrieval',
    resourceName: 'Kaggle: Intro to SQL',
    url: 'https://www.kaggle.com/learn/intro-to-sql'
  },
  {
    id: 'mission-cloud-concepts',
    title: 'Explore Cloud Compute & Storage',
    whatToDo: 'Learn how virtual instances and storage buckets operate on Google Cloud & AWS.',
    whyItMatters: 'Modern software runs on distributed, scalable cloud infrastructure.',
    timeMinutes: 30,
    xpReward: 60,
    skillImprovement: '+25 in Cloud Basics',
    resourceName: 'Google Cloud: Computing Foundations',
    url: 'https://www.cloudskillsboost.google/course_templates/153'
  },
  {
    id: 'mission-git-repo',
    title: 'Initialize a GitHub Repository',
    whatToDo: 'Create a repository with a clean README and push your first commit.',
    whyItMatters: 'Git version control is essential for team collaboration.',
    timeMinutes: 20,
    xpReward: 50,
    skillImprovement: '+20 in Git Collaboration',
    resourceName: 'freeCodeCamp: Git Handbook',
    url: 'https://www.freecodecamp.org/news/git-and-github-handbook/'
  }
];

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  data,
  onExploreCourse,
  onNavigateTab,
  trackedXP,
  trackedStreak,
  completedMissions,
  onCompleteMission,
}) => {
  const [currentMissionIdx, setCurrentMissionIdx] = useState(0);
  const [blobbyExpr, setBlobbyExpr] = useState<BlobbyExpression>('happy');
  const [celebrationBanner, setCelebrationBanner] = useState<string | null>(null);

  const studentName = data.name || 'Pioneer';
  const primaryCareerTitle = data.careerInterests?.[0] || 'Software Development';
  
  // Find matched career path details
  const matchedCareer = CAREER_PATHS.find(c => 
    c.title.toLowerCase().includes(primaryCareerTitle.toLowerCase()) ||
    primaryCareerTitle.toLowerCase().includes(c.title.toLowerCase())
  ) || CAREER_PATHS[0];

  // Derive skills from user onboarding profile
  const userSkills = data.skills?.filter(s => s !== 'Beginner / None yet') || [];
  
  // Key skills for target career
  const careerKeySkills = matchedCareer.importantTechnicalSkills.slice(0, 5);
  const skillsBeingLearned = careerKeySkills.filter(s => !userSkills.some(u => u.toLowerCase() === s.toLowerCase())).slice(0, 2);
  const skillsToDevelop = careerKeySkills.filter(s => !userSkills.includes(s) && !skillsBeingLearned.includes(s));

  // Current active mission
  const activeMission = MISSIONS_LIST[currentMissionIdx % MISSIONS_LIST.length];
  const isMissionDone = completedMissions.includes(activeMission.id);

  // Filter 3 recommended courses based on career
  const recommendedCourses = VERIFIED_COURSES.slice(0, 3);

  // Relevant companies matching career
  const relevantCompanies = COMPANIES_DATA.slice(0, 3);

  // Handle Mark Mission Complete
  const handleMarkMissionComplete = () => {
    if (isMissionDone) return;
    sound.playChime();
    setBlobbyExpr('proud');
    setCelebrationBanner(`🎉 Nice work, ${studentName}! +${activeMission.xpReward} XP earned!`);

    confetti({
      particleCount: 70,
      spread: 65,
      origin: { y: 0.6 },
      colors: ['#7956D8', '#FF914D', '#FFD45C', '#DDF3E8'],
    });

    onCompleteMission(activeMission.id, activeMission.xpReward);

    setTimeout(() => {
      setCelebrationBanner(null);
    }, 4000);
  };

  // Next Mission in Sequence
  const handleNextMission = () => {
    sound.playPop();
    setCurrentMissionIdx(prev => (prev + 1) % MISSIONS_LIST.length);
    setBlobbyExpr('curious');
  };

  return (
    <div className="flex flex-col gap-5 sm:gap-6 pb-12 animate-pop-in">
      {/* ========================================================
          TOP SECTION: Personalized Greeting & Blobby Mascot
         ======================================================== */}
      <section className="bg-white border-2 border-[#E9DFFF] rounded-3xl p-5 sm:p-6 shadow-[0_4px_16px_rgba(48,39,71,0.04)] flex flex-col md:flex-row items-center justify-between gap-5 transition-all">
        <div className="flex items-center gap-4 sm:gap-5 text-center md:text-left">
          <Blobby expression={blobbyExpr} size="md" />
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFE1D2] border border-[#f0c3ad] text-[11px] font-extrabold uppercase tracking-wider text-[#FF914D]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Career Growth Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#302747] tracking-tight">
              Hey, <span className="text-[#7956D8]">{studentName}</span>! Ready to level up?
            </h1>
            <p className="text-xs sm:text-sm text-[#5D5473] font-medium max-w-lg">
              Blobby says: “Small daily practice builds unstoppable confidence!”
            </p>
          </div>
        </div>

        {/* Level, XP & Streak Badges */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 sm:gap-3 shrink-0">
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#FFE1D2] border border-[#f0c3ad] shadow-sm">
            <Sparkles className="w-4 h-4 text-[#FF914D]" />
            <div className="text-left">
              <span className="block text-xs font-extrabold text-[#FF914D] leading-tight">{trackedXP} XP</span>
              <span className="block text-[10px] font-bold text-[#302747]">Level 1 Learner</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#DDF3E8] border border-[#A7F3D0] shadow-sm">
            <Flame className="w-4 h-4 text-[#10B981]" />
            <div className="text-left">
              <span className="block text-xs font-extrabold text-[#065F46] leading-tight">{trackedStreak} Day Streak</span>
              <span className="block text-[10px] font-bold text-[#047857]">Active Today</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          A. YOUR CAREER DIRECTION
         ======================================================== */}
      <section className="bg-white border-2 border-[#E9DFFF] rounded-3xl p-5 sm:p-6 shadow-[0_4px_16px_rgba(48,39,71,0.04)] flex flex-col md:flex-row items-start justify-between gap-5 transition-all hover:border-[#7956D8]">
        <div className="flex-1 space-y-2.5">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-[#FFE1D2] text-[#FF914D]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FF914D] block">
                Your Career Direction
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#302747] tracking-tight">
                {matchedCareer.title}
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#5D5473] font-medium leading-relaxed max-w-2xl">
            {matchedCareer.explanation}
          </p>

          <div className="pt-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#7956D8] block mb-1.5">
              Core Technical Skills:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {matchedCareer.importantTechnicalSkills.slice(0, 5).map(skill => (
                <span key={skill} className="px-2.5 py-1 rounded-xl bg-[#F3EDFF] border border-[#E9DFFF] text-xs font-bold text-[#7956D8]">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigateTab('careers')}
          className="btn-tactile-primary shrink-0 self-start md:self-center"
        >
          <span>Explore Career Profile</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* ========================================================
          C. TODAY'S MISSION & D. YOUR NEXT STEP
         ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* C. TODAY'S MISSION (Takes 2 columns on desktop) */}
        <section className="lg:col-span-2 bg-gradient-to-br from-[#FFFCF8] via-[#FAF7FF] to-[#FFE1D2]/25 border-3 border-[#7956D8] rounded-3xl p-5 sm:p-6 shadow-[0_6px_0_0_#6542BC] flex flex-col justify-between gap-4 relative overflow-hidden transition-all">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7956D8] text-white text-xs font-extrabold uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#FFD45C]" />
                <span>Today’s Mission</span>
              </div>

              <span className="text-xs font-extrabold text-[#7956D8] bg-white px-2.5 py-0.5 rounded-xl border border-[#E9DFFF]">
                Mission {(currentMissionIdx % MISSIONS_LIST.length) + 1} of {MISSIONS_LIST.length}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-extrabold text-[#302747] tracking-tight">
              {activeMission.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#5D5473] font-medium leading-relaxed">
              <strong>Task:</strong> {activeMission.whatToDo}
            </p>

            <p className="text-xs text-[#5D5473] font-medium">
              <strong>Why it matters:</strong> {activeMission.whyItMatters}
            </p>

            {/* Metrics Row */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-[#E9DFFF] text-xs font-bold text-[#5D5473]">
                <Clock className="w-3.5 h-3.5 text-[#FF914D]" />
                <span>{activeMission.timeMinutes} mins</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#DDF3E8] border border-[#A7F3D0] text-xs font-extrabold text-[#065F46]">
                <Award className="w-3.5 h-3.5 text-[#10B981]" />
                <span>{activeMission.skillImprovement}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#FFE1D2] border border-[#f0c3ad] text-xs font-extrabold text-[#FF914D]">
                <Sparkles className="w-3.5 h-3.5 text-[#FFD45C]" />
                <span>+{activeMission.xpReward} XP</span>
              </div>
            </div>

            {celebrationBanner && (
              <div className="p-2.5 rounded-xl bg-[#DDF3E8] border border-[#10B981] text-[#065F46] font-extrabold text-xs animate-pop-in">
                {celebrationBanner}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E9DFFF]">
            <button
              type="button"
              onClick={() => onExploreCourse(activeMission.url)}
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#7956D8] hover:underline"
            >
              <span>Open Guide ({activeMission.resourceName})</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleNextMission}
                className="btn-tactile-secondary text-xs"
              >
                Next Mission ➔
              </button>

              <button
                type="button"
                disabled={isMissionDone}
                onClick={handleMarkMissionComplete}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  isMissionDone
                    ? 'bg-[#DDF3E8] text-[#065F46] border border-[#A7F3D0] cursor-default'
                    : 'bg-[#7956D8] text-white shadow-[0_3px_0_0_#6542BC] hover:bg-[#6e4bc9] active:translate-y-0.5'
                }`}
              >
                {isMissionDone ? (
                  <>
                    <Check className="w-4 h-4 text-[#10B981]" />
                    <span>Completed!</span>
                  </>
                ) : (
                  <span>Mark Done</span>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* D. YOUR NEXT STEP (1 column on desktop) */}
        <section className="bg-white border-2 border-[#E9DFFF] rounded-3xl p-5 sm:p-6 shadow-[0_4px_16px_rgba(48,39,71,0.04)] flex flex-col justify-between gap-3 transition-all hover:border-[#7956D8]">
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FF914D] block">
              Roadmap Guidance
            </span>
            <h3 className="text-base font-extrabold text-[#302747]">
              Your Next Step
            </h3>
            <div className="p-3.5 rounded-2xl bg-[#FAF7FF] border border-[#E9DFFF] text-xs font-medium text-[#302747] leading-relaxed">
              “Complete your practice functions mission today, then open your interactive roadmap to inspect upcoming modules.”
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTab('roadmap')}
            className="btn-tactile-secondary w-full text-xs"
          >
            <span>Open Roadmap Map</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </section>
      </div>

      {/* ========================================================
          B. PICKED FOR YOUR GROWTH (Verified External Courses)
         ======================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-[#302747] tracking-tight">
              Picked for Your Growth
            </h2>
            <p className="text-xs text-[#5D5473] font-medium">
              Verified free courses from Google Cloud, AWS, Microsoft, and Kaggle.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTab('learning')}
            className="text-xs font-extrabold text-[#7956D8] hover:underline inline-flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {recommendedCourses.map((course) => (
            <div
              key={course.id}
              className="card-tactile flex flex-col justify-between gap-3 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[#FAF7FF] border border-[#E9DFFF] text-[11px] font-extrabold text-[#7956D8]">
                    <span>{course.platformIcon}</span>
                    <span className="truncate max-w-[140px]">{course.platform}</span>
                  </span>
                  <span className="text-[10px] font-bold text-[#5D5473]">
                    {course.difficulty}
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-[#302747] group-hover:text-[#7956D8] transition-colors leading-snug">
                  {course.title}
                </h3>

                <p className="text-xs text-[#5D5473] leading-relaxed line-clamp-2">
                  {course.whyUseful}
                </p>

                <div className="text-[11px] text-[#8F86A5] font-medium pt-0.5">
                  ⏱️ Verified duration: {course.duration}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onExploreCourse(course.url)}
                className="btn-tactile-secondary w-full text-xs"
              >
                <span>Explore Course</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          E. SKILL SNAPSHOT & F. CAREER OPPORTUNITY SNAPSHOT
         ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* E. SKILL SNAPSHOT */}
        <section className="bg-white border-2 border-[#E9DFFF] rounded-3xl p-5 sm:p-6 shadow-[0_4px_16px_rgba(48,39,71,0.04)] space-y-3.5 flex flex-col justify-between transition-all hover:border-[#7956D8]">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-extrabold text-[#302747]">
                Skill Snapshot
              </h2>
              <button
                type="button"
                onClick={() => onNavigateTab('skills')}
                className="text-xs font-extrabold text-[#7956D8] hover:underline"
              >
                Skill Progress ➔
              </button>
            </div>
            <p className="text-xs text-[#5D5473] font-medium">
              Transparent overview of your declared skills and roadmap competencies.
            </p>

            {/* Skills Already in Profile */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-extrabold uppercase text-[#065F46] block">
                In Profile ({userSkills.length}):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {userSkills.length > 0 ? (
                  userSkills.map(s => (
                    <span key={s} className="px-2 py-0.5 rounded-lg bg-[#DDF3E8] border border-[#A7F3D0] text-[#065F46] text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                      <span>{s}</span>
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-[#5D5473]">None declared yet. Add skills in onboarding or Skill Progress!</span>
                )}
              </div>
            </div>

            {/* Skills Currently Practicing */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-extrabold uppercase text-[#FF914D] block">
                Currently Practicing:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {skillsBeingLearned.map(s => (
                  <span key={s} className="px-2 py-0.5 rounded-lg bg-[#FFE1D2] border border-[#f0c3ad] text-[#FF914D] text-xs font-bold">
                    ⏳ {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Skills to Develop */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-extrabold uppercase text-[#7956D8] block">
                Targeted Next:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {skillsToDevelop.map(s => (
                  <span key={s} className="px-2 py-0.5 rounded-lg bg-[#F3EDFF] border border-[#E9DFFF] text-[#7956D8] text-xs font-bold">
                    🎯 {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* F. CAREER OPPORTUNITY SNAPSHOT */}
        <section className="bg-white border-2 border-[#E9DFFF] rounded-3xl p-5 sm:p-6 shadow-[0_4px_16px_rgba(48,39,71,0.04)] space-y-3.5 flex flex-col justify-between transition-all hover:border-[#7956D8]">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#7956D8]" />
                <h2 className="text-base sm:text-lg font-extrabold text-[#302747]">
                  Employer Expectations
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab('companies')}
                className="text-xs font-extrabold text-[#7956D8] hover:underline"
              >
                All Companies ➔
              </button>
            </div>
            <p className="text-xs text-[#5D5473] font-medium">
              Sample technology requirements from companies hiring for {matchedCareer.title}.
            </p>

            <div className="space-y-2">
              {relevantCompanies.map(company => (
                <div
                  key={company.id}
                  onClick={() => onNavigateTab('companies')}
                  className="p-3 rounded-2xl bg-[#FAF7FF] border border-[#E9DFFF] hover:border-[#7956D8] hover:bg-[#F3EDFF] cursor-pointer transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{company.logo}</span>
                    <div>
                      <h4 className="text-xs font-extrabold text-[#302747]">{company.name}</h4>
                      <span className="text-[10px] text-[#5D5473]">{company.roles[0]?.title}</span>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-[#7956D8]">Match ➔</span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTab('companies')}
            className="btn-tactile-secondary w-full text-xs"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Open Company Insights Hub</span>
          </button>
        </section>
      </div>
    </div>
  );
};
