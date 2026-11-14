import React, { useState } from 'react';
import { OnboardingData } from '../../types/onboarding';
import { COMPANIES_DATA, CompanyInfo, CompanyRole, calculateSkillMatch } from '../../data/companiesData';
import { 
  Building2, 
  ExternalLink, 
  Search, 
  Clock, 
  X, 
  Sparkles, 
  AlertCircle
} from 'lucide-react';
import { sound } from '../../utils/audio';

interface CompanyInsightsViewProps {
  data: OnboardingData;
  onExploreExternal: (url: string) => void;
}

export const CompanyInsightsView: React.FC<CompanyInsightsViewProps> = ({
  data,
  onExploreExternal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<CompanyInfo | null>(null);
  const [selectedRoleId, setSelectedRoleId] = useState<string>('');

  const userSkills = data.skills?.filter(s => s !== 'Beginner / None yet') || [];

  const filteredCompanies = COMPANIES_DATA.filter(c => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const inName = c.name.toLowerCase().includes(q);
      const inIndustry = c.industry.toLowerCase().includes(q);
      const inFocus = c.techFocus.some(t => t.toLowerCase().includes(q));
      if (!inName && !inIndustry && !inFocus) return false;
    }
    return true;
  });

  const handleOpenCompany = (company: CompanyInfo) => {
    sound.playPop();
    setSelectedCompany(company);
    setSelectedRoleId(company.roles[0]?.id || '');
  };

  const handleClose = () => {
    setSelectedCompany(null);
  };

  const activeRole: CompanyRole | undefined = selectedCompany?.roles.find(r => r.id === selectedRoleId) || selectedCompany?.roles[0];
  const skillMatch = activeRole ? calculateSkillMatch(userSkills, activeRole) : null;

  return (
    <div className="flex flex-col gap-5 sm:gap-6 pb-12 animate-pop-in">
      {/* Header Banner */}
      <div className="bg-white border-2 border-[#E9DFFF] rounded-3xl p-5 sm:p-6 shadow-[0_4px_16px_rgba(48,39,71,0.04)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFE1D2] border border-[#f0c3ad] text-[11px] font-extrabold uppercase tracking-wider text-[#FF914D]">
            <Building2 className="w-3.5 h-3.5" />
            <span>Employer Expectations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#302747] tracking-tight">
            Company Insights
          </h1>
          <p className="text-xs sm:text-sm text-[#5D5473] font-medium max-w-xl">
            Explore industry technology requirements, match your skills, and see what leading tech companies look for.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-[#8F86A5] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Google, Zoho, AWS..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-[#E9DFFF] text-xs text-[#302747] focus:outline-none focus:border-[#7956D8] transition-all"
          />
        </div>
      </div>

      {/* Mandatory Illustrative Notice & Transparency Disclaimer */}
      <div className="p-3.5 rounded-2xl bg-[#FAF7FF] border border-[#E9DFFF] text-xs text-[#5D5473] flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-[#7956D8] shrink-0 mt-0.5" />
        <span className="leading-relaxed">
          <strong>Transparency Notice:</strong> Skill lists and rubrics are compiled from verified public engineering frameworks and hiring guides. They are illustrative reference blueprints to guide your learning, not live vacancy listings or endorsements.
        </span>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 xl:gap-6">
        {filteredCompanies.map((company) => (
          <div
            key={company.id}
            className="card-tactile flex flex-col justify-between gap-4 group"
          >
            <div className="space-y-2.5">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl select-none">{company.logo}</span>
                  <div>
                    <h3 className="font-extrabold text-base text-[#302747] group-hover:text-[#7956D8] transition-colors">
                      {company.name}
                    </h3>
                    <span className="text-[10px] font-bold text-[#FF914D]">
                      {company.industry}
                    </span>
                  </div>
                </div>
              </div>

              {/* About Snippet */}
              <p className="text-xs text-[#5D5473] leading-relaxed line-clamp-2">
                {company.about}
              </p>

              {/* Roles Offered */}
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#7956D8] block">
                  Featured Roles:
                </span>
                <div className="flex flex-wrap gap-1">
                  {company.roles.map(r => (
                    <span key={r.id} className="px-2 py-0.5 rounded-md bg-[#F3EDFF] text-[#7956D8] text-[10px] font-bold">
                      {r.title}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tech Focus Tags */}
              <div className="space-y-1 pt-0.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5D5473] block">
                  Tech Focus:
                </span>
                <div className="flex flex-wrap gap-1">
                  {company.techFocus.slice(0, 3).map(tech => (
                    <span key={tech} className="px-2 py-0.5 rounded-md bg-[#FAF7FF] border border-[#E9DFFF] text-[10px] font-medium text-[#302747]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-[#E9DFFF] flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => handleOpenCompany(company)}
                className="btn-tactile-secondary flex-1 text-xs font-extrabold"
              >
                Match My Skills
              </button>

              <button
                type="button"
                onClick={() => onExploreExternal(company.careersUrl)}
                className="p-2.5 rounded-xl border border-[#E9DFFF] bg-[#FAF7FF] text-[#5D5473] hover:text-[#7956D8] hover:border-[#7956D8] transition-all"
                title={`Visit official ${company.name} careers portal`}
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================
          DETAILED COMPANY & SKILL MATCH MODAL
         ======================================================== */}
      {selectedCompany && activeRole && skillMatch && (
        <div className="fixed inset-0 z-50 bg-[#302747]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-pop-in">
          <div className="bg-white border-3 border-[#7956D8] rounded-3xl max-w-3xl w-full p-5 sm:p-6 shadow-[0_16px_36px_rgba(121,86,216,0.22)] flex flex-col gap-4 max-h-[90dvh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-[#E9DFFF] pb-3">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{selectedCompany.logo}</span>
                <div>
                  <h3 className="text-xl font-extrabold text-[#302747]">
                    {selectedCompany.name} — Career Blueprint
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#5D5473] mt-0.5">
                    <span>{selectedCompany.industry}</span>
                    <span>•</span>
                    <span>HQ: {selectedCompany.headquarters}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="p-1.5 rounded-xl text-[#5D5473] hover:text-[#302747] hover:bg-[#F3EDFF]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* A. About & Tech Focus */}
            <div className="p-3.5 rounded-2xl bg-[#FAF7FF] border border-[#E9DFFF] space-y-2">
              <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-[#7956D8]">
                About {selectedCompany.name} & Engineering Culture:
              </h4>
              <p className="text-xs text-[#5D5473] leading-relaxed">
                {selectedCompany.about}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedCompany.techFocus.map(t => (
                  <span key={t} className="px-2.5 py-0.5 rounded-lg bg-white border border-[#E9DFFF] text-[11px] font-bold text-[#7956D8]">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* B. Role Selection Tabs */}
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#7956D8] block mb-1.5">
                Select Role:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedCompany.roles.map(r => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      sound.playPop();
                      setSelectedRoleId(r.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                      r.id === activeRole.id
                        ? 'bg-[#7956D8] text-white shadow-playful-purple-sm'
                        : 'bg-white border border-[#E9DFFF] text-[#5D5473] hover:bg-[#F3EDFF]'
                    }`}
                  >
                    {r.title}
                  </button>
                ))}
              </div>
            </div>

            {/* D. YOUR SKILL MATCH SECTION (Prominent Card) */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#F3EDFF] to-[#FFE1D2]/30 border-2 border-[#7956D8] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FF914D]" />
                  <h4 className="text-sm font-extrabold text-[#302747]">
                    Your Skill Match for {activeRole.title}
                  </h4>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E9DFFF]">
                  <span className="text-xs font-extrabold text-[#7956D8]">{skillMatch.matchPercentage}% Alignment</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-white overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#7956D8] to-[#FF914D] transition-all duration-500"
                  style={{ width: `${Math.max(10, skillMatch.matchPercentage)}%` }}
                />
              </div>

              {/* 3 Columns: Matched, In Progress, Gaps */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
                {/* Matched */}
                <div className="p-2.5 rounded-xl bg-white border border-[#A7F3D0]">
                  <span className="font-extrabold text-[#065F46] block mb-1">
                    ✓ In Your Profile ({skillMatch.matchedSkills.length})
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {skillMatch.matchedSkills.length > 0 ? (
                      skillMatch.matchedSkills.map(s => (
                        <span key={s} className="px-1.5 py-0.5 rounded bg-[#DDF3E8] text-[#065F46] text-[10px] font-bold">
                          {s}
                        </span>
                      ))
                    ) : (
                      <span className="text-[11px] text-[#5D5473]">No direct matches yet</span>
                    )}
                  </div>
                </div>

                {/* Developing / Preferred */}
                <div className="p-2.5 rounded-xl bg-white border border-[#f0c3ad]">
                  <span className="font-extrabold text-[#FF914D] block mb-1">
                    ⏳ Preferred Skills ({skillMatch.developingSkills.length})
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {skillMatch.developingSkills.map(s => (
                      <span key={s} className="px-1.5 py-0.5 rounded bg-[#FFE1D2] text-[#FF914D] text-[10px] font-bold">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Skill Gaps */}
                <div className="p-2.5 rounded-xl bg-white border border-[#E9DFFF]">
                  <span className="font-extrabold text-[#7956D8] block mb-1">
                    🎯 Required Gaps ({skillMatch.gapSkills.length})
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {skillMatch.gapSkills.map(s => (
                      <span key={s} className="px-1.5 py-0.5 rounded bg-[#F3EDFF] text-[#7956D8] text-[10px] font-bold">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* C. Categorized Skill Requirements */}
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#7956D8] mb-2">
                Detailed Skill Breakdown (Required vs. Preferred):
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeRole.skillCategories.map(cat => (
                  <div key={cat.category} className="p-2.5 rounded-xl bg-white border border-[#E9DFFF]">
                    <span className="text-[11px] font-extrabold text-[#302747] block mb-1">
                      {cat.categoryLabel}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {cat.skills.map(s => (
                        <span 
                          key={s.name} 
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            s.type === 'required'
                              ? 'bg-[#F3EDFF] text-[#7956D8] border border-[#E9DFFF]'
                              : 'bg-[#FAF7FF] text-[#5D5473] border border-dashed border-[#A78BFA]'
                          }`}
                        >
                          {s.name} {s.type === 'required' ? '★' : '•'}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* E. PREPARE FOR THIS ROLE */}
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#7956D8] mb-2">
                Recommended Preparation Sequence & Resources:
              </h4>
              <div className="space-y-2">
                {activeRole.preparationRoadmap.map(step => (
                  <div key={step.step} className="p-3 rounded-xl bg-white border border-[#E9DFFF] flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#7956D8] text-white text-[10px] font-extrabold flex items-center justify-center">
                          {step.step}
                        </span>
                        <span className="text-xs font-extrabold text-[#302747]">{step.title}</span>
                      </div>
                      <p className="text-xs text-[#5D5473] pl-7">{step.action}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onExploreExternal(step.resourceUrl)}
                      className="inline-flex items-center gap-1 text-[11px] font-extrabold text-[#7956D8] hover:underline shrink-0"
                    >
                      <span>{step.resourceName}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* F. Official Careers Portal & Source Verification */}
            <div className="pt-2 border-t border-[#E9DFFF] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-[11px] text-[#5D5473]">
                <Clock className="w-3.5 h-3.5 text-[#8F86A5]" />
                <span>Verified from public career frameworks ({selectedCompany.lastVerified})</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onExploreExternal(selectedCompany.careersUrl)}
                  className="btn-tactile-primary text-xs"
                >
                  <span>Official Careers Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  className="btn-tactile-secondary text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
