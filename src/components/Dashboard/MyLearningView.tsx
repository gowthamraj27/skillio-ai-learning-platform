import React, { useState, useEffect } from 'react';
import { OnboardingData } from '../../types/onboarding';
import { VERIFIED_COURSES, CourseCategory, getFilteredCourses, VerifiedCourse } from '../../data/learningData';
import { 
  BookOpen, 
  ExternalLink, 
  Search, 
  CheckCircle2, 
  Clock, 
  Award,
  Bookmark
} from 'lucide-react';
import { sound } from '../../utils/audio';
import { 
  saveCourseToSupabase, 
  removeSavedCourseFromSupabase, 
  fetchSavedCoursesFromSupabase 
} from '../../services/supabaseService';

interface MyLearningViewProps {
  data: OnboardingData;
  onExploreCourse: (url: string) => void;
}

const SECTION_TABS: { id: CourseCategory | 'all' | 'saved'; label: string; icon: string }[] = [
  { id: 'all', label: 'All Courses', icon: '📚' },
  { id: 'saved', label: 'Saved in Cloud', icon: '🔖' },
  { id: 'recommended', label: 'Recommended for You', icon: '✨' },
  { id: 'continue', label: 'Continue Learning', icon: '⏳' },
  { id: 'beginner', label: 'Beginner Courses', icon: '🌱' },
  { id: 'intermediate', label: 'Intermediate', icon: '🚀' },
  { id: 'advanced', label: 'Advanced Learning', icon: '⚡' },
  { id: 'practice', label: 'Practice & Challenges', icon: '🎯' },
  { id: 'certifications', label: 'Certifications & Paths', icon: '📜' },
];

export const MyLearningView: React.FC<MyLearningViewProps> = ({
  data,
  onExploreCourse,
}) => {
  const [activeSection, setActiveSection] = useState<CourseCategory | 'all' | 'saved'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [savedCourseIds, setSavedCourseIds] = useState<string[]>([]);

  // Load saved courses from Supabase user_saved_courses on mount
  useEffect(() => {
    fetchSavedCoursesFromSupabase().then(ids => {
      if (ids && ids.length > 0) {
        setSavedCourseIds(ids);
      }
    });
  }, []);

  const primaryCareer = data.careerInterests?.[0] || 'Software Development';

  const baseCourses = activeSection === 'saved' 
    ? VERIFIED_COURSES.filter(c => savedCourseIds.includes(c.id))
    : VERIFIED_COURSES;

  const filteredCourses = getFilteredCourses(baseCourses, {
    search: searchQuery,
    category: activeSection === 'saved' ? 'all' : activeSection,
    platform: selectedPlatform,
    difficulty: selectedDifficulty,
  });

  const platforms = ['all', 'Google Cloud Skills Boost', 'AWS Skill Builder', 'Microsoft Learn', 'Kaggle Learn', 'freeCodeCamp', 'MDN Web Docs'];
  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  const handleOpenCourse = (course: VerifiedCourse) => {
    sound.playPop();
    onExploreCourse(course.url);
  };

  const handleToggleSaveCourse = async (course: VerifiedCourse) => {
    const isSaved = savedCourseIds.includes(course.id);
    if (isSaved) {
      sound.playPop();
      setSavedCourseIds(prev => prev.filter(id => id !== course.id));
      await removeSavedCourseFromSupabase(course.id);
    } else {
      sound.playChime();
      setSavedCourseIds(prev => [...prev, course.id]);
      await saveCourseToSupabase(course);
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-12 animate-pop-in">
      {/* Header Banner */}
      <div className="bg-[#FFFCF8] border-2 border-[#E9DFFF] rounded-3xl p-5 sm:p-6 shadow-[0_4px_16px_rgba(121,86,216,0.06)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFE1D2] border border-[#f0c3ad] text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-[#FF914D] mb-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Verified Learning Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#302747] tracking-tight">
            My Learning Resources
          </h1>
          <p className="text-xs sm:text-sm text-[#5D5473] font-medium mt-1 max-w-xl">
            SKILLIO pairs your target career ({primaryCareer}) with free, verified external courses across Google Cloud, AWS, Microsoft, and Kaggle.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-[#8F86A5] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Python, Cloud, SQL..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-[#E9DFFF] text-xs text-[#302747] focus:outline-none focus:border-[#7956D8] transition-all"
          />
        </div>
      </div>

      {/* Section Tabs (7 Categories) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {SECTION_TABS.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              sound.playPop();
              setActiveSection(tab.id);
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
              activeSection === tab.id
                ? 'bg-[#7956D8] text-white shadow-playful-purple-sm'
                : 'bg-white border border-[#E9DFFF] text-[#5D5473] hover:text-[#7956D8] hover:bg-[#F3EDFF]'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Multi-Filters: Platform & Difficulty */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#FFFCF8] border border-[#E9DFFF]">
        <div className="flex flex-wrap items-center gap-3">
          {/* Platform Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#5D5473]">Platform:</span>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="p-1.5 rounded-xl bg-white border border-[#E9DFFF] text-xs font-semibold text-[#302747] focus:outline-none focus:border-[#7956D8]"
            >
              {platforms.map(p => (
                <option key={p} value={p}>{p === 'all' ? 'All Platforms' : p}</option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#5D5473]">Difficulty:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="p-1.5 rounded-xl bg-white border border-[#E9DFFF] text-xs font-semibold text-[#302747] focus:outline-none focus:border-[#7956D8]"
            >
              {difficulties.map(d => (
                <option key={d} value={d}>{d === 'all' ? 'All Levels' : d}</option>
              ))}
            </select>
          </div>
        </div>

        <span className="text-xs font-extrabold text-[#7956D8]">
          Showing {filteredCourses.length} verified courses
        </span>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="card-tactile rounded-3xl p-5 flex flex-col justify-between gap-4 group"
          >
            <div className="space-y-2.5">
              {/* Header Badges */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#FAF7FF] border border-[#E9DFFF] text-xs font-extrabold text-[#7956D8]">
                  <span>{course.platformIcon}</span>
                  <span className="truncate max-w-[130px]">{course.platform}</span>
                </span>

                <div className="flex items-center gap-1.5">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                    course.difficulty === 'Beginner' ? 'badge-mint' :
                    course.difficulty === 'Intermediate' ? 'badge-peach' :
                    'badge-purple'
                  }`}>
                    {course.difficulty}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleToggleSaveCourse(course)}
                    title={savedCourseIds.includes(course.id) ? 'Saved in Supabase' : 'Bookmark Course'}
                    className={`p-1.5 rounded-xl border transition-all ${
                      savedCourseIds.includes(course.id)
                        ? 'bg-[#FFE1D2] border-[#FF914D] text-[#FF914D] shadow-sm'
                        : 'bg-white border-[#E9DFFF] text-[#8F86A5] hover:text-[#7956D8] hover:border-[#7956D8]'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${savedCourseIds.includes(course.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-extrabold text-base text-[#302747] group-hover:text-[#7956D8] transition-colors leading-snug">
                {course.title}
              </h3>

              {/* Topic & Skill Category */}
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF914D]">
                <Award className="w-3.5 h-3.5" />
                <span>{course.topic} ({course.skillCategory})</span>
              </div>

              {/* Why Useful */}
              <p className="text-xs text-[#5D5473] leading-relaxed line-clamp-2">
                {course.whyUseful}
              </p>

              {/* Duration */}
              <div className="flex items-center gap-1.5 text-[11px] text-[#8F86A5] pt-1">
                <Clock className="w-3.5 h-3.5 text-[#7956D8]" />
                <span>Verified duration: {course.duration}</span>
              </div>
            </div>

            {/* Action */}
            <div className="pt-2 border-t border-[#E9DFFF]">
              <button
                type="button"
                onClick={() => handleOpenCourse(course)}
                className="w-full btn-tactile-primary py-2.5 px-4 text-xs flex items-center justify-center gap-2"
              >
                <span>Explore Course</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* External Platform Clarification */}
      <div className="p-4 rounded-2xl bg-[#FAF7FF] border border-[#E9DFFF] text-xs text-[#5D5473] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
          <span>SKILLIO never gates or resells learning material. All external links point directly to official documentation and learning paths.</span>
        </div>
      </div>
    </div>
  );
};
