import React, { useState } from 'react';
import { CAREER_PATHS, CareerPath } from '../../data/careersData';
import { 
  Compass, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  Scale, 
  Sparkles,
  Info
} from 'lucide-react';
import { sound } from '../../utils/audio';

interface CareerExplorerViewProps {
  currentInterest?: string;
  onSelectCareer?: (careerTitle: string) => void;
}

export const CareerExplorerView: React.FC<CareerExplorerViewProps> = ({
  currentInterest,
  onSelectCareer,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeCareerDetail, setActiveCareerDetail] = useState<CareerPath | null>(null);

  // Comparison State
  const [comparisonMode, setComparisonMode] = useState(false);
  const [careerA, setCareerA] = useState<CareerPath>(CAREER_PATHS[0]);
  const [careerB, setCareerB] = useState<CareerPath>(CAREER_PATHS[1]);

  const categories = ['all', 'Engineering', 'Data & AI', 'Security & Infrastructure', 'Hardware & Systems', 'Design & Product'];

  const filteredCareers = CAREER_PATHS.filter(career => {
    if (selectedCategory !== 'all' && career.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const inTitle = career.title.toLowerCase().includes(q);
      const inSkills = career.importantTechnicalSkills.some(s => s.toLowerCase().includes(q));
      const inDesc = career.explanation.toLowerCase().includes(q);
      if (!inTitle && !inSkills && !inDesc) return false;
    }
    return true;
  });

  const handleOpenDetail = (career: CareerPath) => {
    sound.playPop();
    setActiveCareerDetail(career);
  };

  const handleCloseDetail = () => {
    setActiveCareerDetail(null);
  };

  return (
    <div className="flex flex-col gap-5 sm:gap-6 pb-12 animate-pop-in">
      {/* Header Banner */}
      <div className="bg-white border-2 border-[#E9DFFF] rounded-3xl p-5 sm:p-6 shadow-[0_4px_16px_rgba(48,39,71,0.04)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFE1D2] border border-[#f0c3ad] text-[11px] font-extrabold uppercase tracking-wider text-[#FF914D]">
            <Compass className="w-3.5 h-3.5" />
            <span>Discover Tech Pathways</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#302747] tracking-tight">
            Career Explorer
          </h1>
          <p className="text-xs sm:text-sm text-[#5D5473] font-medium max-w-xl">
            Explore core technology roles, discover prerequisite skills, and compare paths side-by-side.
          </p>
        </div>

        {/* Side-by-side Compare Toggle Button */}
        <button
          type="button"
          onClick={() => {
            sound.playPop();
            setComparisonMode(!comparisonMode);
          }}
          className={`btn-tactile-secondary text-xs sm:text-sm ${
            comparisonMode ? 'border-[#7956D8] text-[#7956D8] bg-[#FAF7FF]' : ''
          }`}
        >
          <Scale className="w-4 h-4 text-[#7956D8]" />
          <span>{comparisonMode ? 'Hide Comparison' : 'Compare Two Careers'}</span>
        </button>
      </div>

      {/* Transparent Disclaimer Banner */}
      <div className="p-3.5 rounded-2xl bg-[#FAF7FF] border border-[#E9DFFF] text-xs text-[#5D5473] flex items-start gap-2.5">
        <Info className="w-4 h-4 text-[#7956D8] shrink-0 mt-0.5" />
        <span className="leading-relaxed">
          <strong>Career Note:</strong> Technology roles vary across companies and evolve rapidly. SKILLIO provides verified skill frameworks to guide preparation; no career guarantees specific salaries or hiring offers.
        </span>
      </div>

      {/* ========================================================
          SIDE-BY-SIDE CAREER COMPARISON VIEW
         ======================================================== */}
      {comparisonMode && (
        <section className="bg-white border-3 border-[#7956D8] rounded-3xl p-5 sm:p-6 shadow-[0_6px_0_0_#6542BC] space-y-4 animate-pop-in">
          <div className="flex items-center justify-between border-b border-[#E9DFFF] pb-3">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#7956D8]" />
              <h2 className="text-base sm:text-lg font-extrabold text-[#302747]">
                Side-by-Side Career Comparison
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setComparisonMode(false)}
              className="p-1 rounded-xl text-[#5D5473] hover:text-[#302747] hover:bg-[#FAF7FF]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-[#7956D8] uppercase mb-1">
                Select Career A:
              </label>
              <select
                value={careerA.id}
                onChange={(e) => {
                  const c = CAREER_PATHS.find(x => x.id === e.target.value);
                  if (c) setCareerA(c);
                }}
                className="w-full p-2.5 rounded-xl bg-white border border-[#E9DFFF] text-xs font-bold text-[#302747] focus:outline-none focus:border-[#7956D8]"
              >
                {CAREER_PATHS.map(c => (
                  <option key={c.id} value={c.id}>{c.icon} {c.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#FF914D] uppercase mb-1">
                Select Career B:
              </label>
              <select
                value={careerB.id}
                onChange={(e) => {
                  const c = CAREER_PATHS.find(x => x.id === e.target.value);
                  if (c) setCareerB(c);
                }}
                className="w-full p-2.5 rounded-xl bg-white border border-[#E9DFFF] text-xs font-bold text-[#302747] focus:outline-none focus:border-[#FF914D]"
              >
                {CAREER_PATHS.map(c => (
                  <option key={c.id} value={c.id}>{c.icon} {c.title}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Career A Column */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFCF8] border-2 border-[#E9DFFF] space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="text-3xl">{careerA.icon}</span>
                <h3 className="font-extrabold text-base text-[#302747]">{careerA.title}</h3>
              </div>
              <p className="text-xs text-[#5D5473] leading-relaxed">{careerA.explanation}</p>
              <div>
                <strong className="text-[11px] uppercase tracking-wider text-[#7956D8] block mb-1">Key Technical Stack:</strong>
                <div className="flex flex-wrap gap-1">
                  {careerA.importantTechnicalSkills.map(s => (
                    <span key={s} className="px-2 py-0.5 rounded-lg bg-[#F3EDFF] text-[#7956D8] text-[11px] font-bold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <strong className="text-[11px] uppercase tracking-wider text-[#5D5473] block mb-1">Related Roles:</strong>
                <span className="text-xs text-[#5D5473]">{careerA.relatedJobRoles.join(', ')}</span>
              </div>
            </div>

            {/* Career B Column */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFCF8] border-2 border-[#f0c3ad] space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="text-3xl">{careerB.icon}</span>
                <h3 className="font-extrabold text-base text-[#302747]">{careerB.title}</h3>
              </div>
              <p className="text-xs text-[#5D5473] leading-relaxed">{careerB.explanation}</p>
              <div>
                <strong className="text-[11px] uppercase tracking-wider text-[#FF914D] block mb-1">Key Technical Stack:</strong>
                <div className="flex flex-wrap gap-1">
                  {careerB.importantTechnicalSkills.map(s => (
                    <span key={s} className="px-2 py-0.5 rounded-lg bg-[#FFE1D2] text-[#FF914D] text-[11px] font-bold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <strong className="text-[11px] uppercase tracking-wider text-[#5D5473] block mb-1">Related Roles:</strong>
                <span className="text-xs text-[#5D5473]">{careerB.relatedJobRoles.join(', ')}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Search and Category Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#8F86A5] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search roles, Python, Cloud..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-[#E9DFFF] text-xs text-[#302747] focus:outline-none focus:border-[#7956D8] transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#7956D8] text-white shadow-playful-purple-sm'
                  : 'bg-white border border-[#E9DFFF] text-[#5D5473] hover:text-[#7956D8] hover:bg-[#F3EDFF]'
              }`}
            >
              {cat === 'all' ? 'All Roles' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================
          CAREER CARDS GRID
         ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 xl:gap-6">
        {filteredCareers.map((career) => {
          const isUserCurrent = currentInterest && career.title.toLowerCase().includes(currentInterest.toLowerCase());

          return (
            <div
              key={career.id}
              className={`card-tactile flex flex-col justify-between gap-4 group ${
                isUserCurrent ? 'border-[#7956D8] ring-2 ring-[#7956D8]/20' : ''
              }`}
            >
              <div className="space-y-2.5">
                {/* Header Icon & Title */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl select-none">{career.icon}</span>
                    <div>
                      <h3 className="font-extrabold text-base text-[#302747] group-hover:text-[#7956D8] transition-colors leading-tight">
                        {career.title}
                      </h3>
                      <span className="text-[10px] font-bold text-[#FF914D]">
                        {career.category}
                      </span>
                    </div>
                  </div>

                  {isUserCurrent && (
                    <span className="px-2 py-0.5 rounded-md bg-[#DDF3E8] border border-[#A7F3D0] text-[9px] font-extrabold uppercase text-[#065F46]">
                      Your Goal
                    </span>
                  )}
                </div>

                {/* Short explanation */}
                <p className="text-xs text-[#5D5473] leading-relaxed line-clamp-2">
                  {career.explanation}
                </p>

                {/* Responsibilities Preview */}
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#7956D8] block">
                    Key Responsibilities:
                  </span>
                  <ul className="text-xs text-[#5D5473] space-y-0.5 list-disc list-inside">
                    {career.typicalResponsibilities.slice(0, 2).map((r, i) => (
                      <li key={i} className="line-clamp-1">{r}</li>
                    ))}
                  </ul>
                </div>

                {/* Key Skills */}
                <div className="space-y-1 pt-0.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FF914D] block">
                    Important Skills:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {career.importantTechnicalSkills.slice(0, 4).map(skill => (
                      <span key={skill} className="px-2 py-0.5 rounded-lg bg-[#FAF7FF] border border-[#E9DFFF] text-[10px] font-bold text-[#302747]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-[#E9DFFF]">
                <button
                  type="button"
                  onClick={() => handleOpenDetail(career)}
                  className="btn-tactile-secondary w-full text-xs font-extrabold"
                >
                  <span>Explore Career</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================
          DETAILED CAREER PROFILE MODAL / SLIDE-OVER
         ======================================================== */}
      {activeCareerDetail && (
        <div className="fixed inset-0 z-50 bg-[#302747]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-pop-in">
          <div className="bg-white border-3 border-[#7956D8] rounded-3xl max-w-2xl w-full p-5 sm:p-6 shadow-[0_16px_36px_rgba(121,86,216,0.22)] flex flex-col gap-4 max-h-[90dvh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#E9DFFF] pb-3">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{activeCareerDetail.icon}</span>
                <div>
                  <h3 className="text-xl font-extrabold text-[#302747]">
                    {activeCareerDetail.title}
                  </h3>
                  <span className="text-xs font-bold text-[#FF914D]">
                    {activeCareerDetail.category} Pathway
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseDetail}
                className="p-1.5 rounded-xl text-[#5D5473] hover:text-[#302747] hover:bg-[#F3EDFF]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Explanation */}
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#7956D8] mb-1">
                Overview & Purpose:
              </h4>
              <p className="text-xs sm:text-sm text-[#5D5473] leading-relaxed">
                {activeCareerDetail.explanation}
              </p>
            </div>

            {/* Typical Responsibilities */}
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#7956D8] mb-1.5">
                Typical Responsibilities:
              </h4>
              <div className="space-y-1.5">
                {activeCareerDetail.typicalResponsibilities.map((resp, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#302747]">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-2xl bg-[#FAF7FF] border border-[#E9DFFF]">
                <h5 className="text-[11px] font-extrabold uppercase text-[#7956D8] mb-1.5">
                  Core Technical Skills:
                </h5>
                <div className="flex flex-wrap gap-1">
                  {activeCareerDetail.importantTechnicalSkills.map(s => (
                    <span key={s} className="px-2 py-0.5 rounded-md bg-[#F3EDFF] text-[#7956D8] text-xs font-bold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF7FF] border border-[#E9DFFF]">
                <h5 className="text-[11px] font-extrabold uppercase text-[#FF914D] mb-1.5">
                  Complementary Skills:
                </h5>
                <div className="flex flex-wrap gap-1">
                  {activeCareerDetail.complementarySkills.map(s => (
                    <span key={s} className="px-2 py-0.5 rounded-md bg-[#FFE1D2] text-[#FF914D] text-xs font-bold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Suggested Beginner Learning Path */}
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#7956D8] mb-1.5">
                Suggested Beginner Learning Path:
              </h4>
              <div className="space-y-1.5">
                {activeCareerDetail.beginnerLearningPath.map((phase, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-white border border-[#E9DFFF] text-xs font-semibold text-[#302747]">
                    {phase}
                  </div>
                ))}
              </div>
            </div>

            {/* Related Job Roles */}
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#7956D8] mb-1">
                Common Entry Titles:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {activeCareerDetail.relatedJobRoles.map(r => (
                  <span key={r} className="px-2.5 py-1 rounded-lg bg-[#DDF3E8] border border-[#A7F3D0] text-[#065F46] text-xs font-bold">
                    {r}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 border-t border-[#E9DFFF] flex items-center justify-between">
              {onSelectCareer && (
                <button
                  type="button"
                  onClick={() => {
                    onSelectCareer(activeCareerDetail.title);
                    handleCloseDetail();
                  }}
                  className="btn-tactile-primary text-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Set as My Target Goal</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleCloseDetail}
                className="btn-tactile-secondary text-xs ml-auto"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
