import React, { useState, useEffect } from 'react';
import { OnboardingData } from '../../types/onboarding';
import { 
  Zap, 
  CheckCircle2, 
  Plus, 
  Clock, 
  Award, 
  Flame, 
  X, 
  Info,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/audio';
import { syncSkillToSupabase, fetchSkillsFromSupabase } from '../../services/supabaseService';

export type SkillStatus = 'existing' | 'learning' | 'to-develop' | 'completed';
export type SkillCategory = 'Languages' | 'Frameworks & Web' | 'Data & AI' | 'Cloud & Systems' | 'Soft Skills';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  status: SkillStatus;
  verificationType: 'self-reported' | 'activity-verified';
  dateAdded: string;
}

interface SkillProgressViewProps {
  data: OnboardingData;
  trackedXP: number;
  trackedStreak: number;
  completedMissions: string[];
}

export const SkillProgressView: React.FC<SkillProgressViewProps> = ({
  data,
  trackedXP,
  trackedStreak,
  completedMissions,
}) => {
  // Initialize skills from student's onboarding profile
  const [skillsList, setSkillsList] = useState<SkillItem[]>(() => {
    const rawSkills = data.skills?.filter(s => s !== 'Beginner / None yet') || [];
    const initial: SkillItem[] = rawSkills.map((name, idx) => ({
      id: `skill-init-${idx}`,
      name,
      category: name.toLowerCase().includes('python') || name.toLowerCase().includes('java') || name.toLowerCase().includes('c++') ? 'Languages' :
                name.toLowerCase().includes('web') || name.toLowerCase().includes('react') ? 'Frameworks & Web' :
                name.toLowerCase().includes('ai') || name.toLowerCase().includes('data') ? 'Data & AI' : 'Languages',
      status: 'existing',
      verificationType: 'self-reported',
      dateAdded: 'From Onboarding'
    }));

    // Add illustrative in-progress and targeted skills
    initial.push(
      { id: 'skill-dev-1', name: 'Functions & Modular Code', category: 'Languages', status: 'learning', verificationType: 'activity-verified', dateAdded: 'Today' },
      { id: 'skill-dev-2', name: 'REST API Integration', category: 'Frameworks & Web', status: 'learning', verificationType: 'self-reported', dateAdded: 'This Week' },
      { id: 'skill-dev-3', name: 'Cloud Architecture & Containers', category: 'Cloud & Systems', status: 'to-develop', verificationType: 'self-reported', dateAdded: 'Target' },
      { id: 'skill-dev-4', name: 'Database Query Optimization', category: 'Cloud & Systems', status: 'to-develop', verificationType: 'self-reported', dateAdded: 'Target' }
    );

    return initial;
  });

  // Load custom skills from Supabase user_skills on mount
  useEffect(() => {
    fetchSkillsFromSupabase().then(cloudSkills => {
      if (cloudSkills && cloudSkills.length > 0) {
        setSkillsList(prev => {
          const names = new Set(prev.map(s => s.name.toLowerCase()));
          const toAdd = cloudSkills.filter(s => !names.has(s.name.toLowerCase()));
          return [...prev, ...toAdd];
        });
      }
    });
  }, []);

  // Modal State for Add Skill
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<SkillCategory>('Languages');
  const [newSkillStatus, setNewSkillStatus] = useState<SkillStatus>('existing');

  // Filter skills by status
  const existingSkills = skillsList.filter(s => s.status === 'existing');
  const currentlyLearning = skillsList.filter(s => s.status === 'learning');
  const skillsToDevelop = skillsList.filter(s => s.status === 'to-develop');
  const completedSkills = skillsList.filter(s => s.status === 'completed');

  // Categories breakdown
  const categories: SkillCategory[] = ['Languages', 'Frameworks & Web', 'Data & AI', 'Cloud & Systems', 'Soft Skills'];

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    sound.playPop();
    const newEntry: SkillItem = {
      id: `skill-${Date.now()}`,
      name: newSkillName.trim(),
      category: newSkillCategory,
      status: newSkillStatus,
      verificationType: 'self-reported',
      dateAdded: 'Just now'
    };

    setSkillsList(prev => [...prev, newEntry]);
    syncSkillToSupabase(newEntry);
    setNewSkillName('');
    setIsAddModalOpen(false);
  };

  const handlePromoteSkill = (id: string, newStatus: SkillStatus) => {
    sound.playChime();
    if (newStatus === 'completed') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#7956D8', '#10B981', '#FFD45C', '#FFE1D2']
      });
    }

    setSkillsList(prev => prev.map(s => {
      if (s.id === id) {
        const updated: SkillItem = {
          ...s,
          status: newStatus,
          verificationType: newStatus === 'completed' ? 'activity-verified' : s.verificationType
        };
        syncSkillToSupabase(updated);
        return updated;
      }
      return s;
    }));
  };

  return (
    <div className="flex flex-col gap-6 pb-12 animate-pop-in">
      {/* Header Banner */}
      <div className="card-tactile rounded-3xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFE1D2] border border-[#f0c3ad] text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-[#FF914D] mb-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span>Transparent Competency Tracking</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#302747] tracking-tight">
            Skill Progress & Competency Map
          </h1>
          <p className="text-xs sm:text-sm text-[#5D5473] font-medium mt-1 max-w-xl">
            Track your evolving technical abilities across 4 stages. Clearly distinguish self-reported competencies from verified completed activities.
          </p>
        </div>

        {/* Add Skill Button */}
        <button
          type="button"
          onClick={() => {
            sound.playPop();
            setIsAddModalOpen(true);
          }}
          className="btn-tactile-primary py-2.5 px-5 text-xs sm:text-sm flex items-center gap-2 shrink-0 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Skill</span>
        </button>
      </div>

      {/* Metrics Row: Streak & XP */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-[#FFFCF8] border-2 border-[#E9DFFF] shadow-[0_2px_8px_rgba(121,86,216,0.04)] flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#DDF3E8] text-[#10B981]">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase text-[#5D5473] block">Total Tracked Skills</span>
            <span className="text-lg font-extrabold text-[#302747]">{skillsList.length} Competencies</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#FFFCF8] border-2 border-[#E9DFFF] shadow-[0_2px_8px_rgba(121,86,216,0.04)] flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#FFE1D2] text-[#FF914D]">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase text-[#5D5473] block">Learning Streak</span>
            <span className="text-lg font-extrabold text-[#302747]">{trackedStreak} Active Day</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#FFFCF8] border-2 border-[#E9DFFF] shadow-[0_2px_8px_rgba(121,86,216,0.04)] flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#F3EDFF] text-[#7956D8]">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase text-[#5D5473] block">Tracked XP Balance</span>
            <span className="text-lg font-extrabold text-[#7956D8]">{trackedXP} Experience XP</span>
          </div>
        </div>
      </div>

      {/* Transparent Methodology Note */}
      <div className="p-3.5 rounded-2xl bg-[#FAF7FF] border border-[#E9DFFF] text-xs text-[#5D5473] flex items-start gap-2.5">
        <Info className="w-4 h-4 text-[#7956D8] shrink-0 mt-0.5" />
        <span className="leading-relaxed">
          <strong>Skill Metric Standard:</strong> SKILLIO tracks qualitative competencies (Existing, In Practice, Target, Completed), categorized by domain, and distinguishes self-reported skills from mission-verified milestones.
        </span>
      </div>

      {/* ========================================================
          THE 4 SKILL STATUS BUCKETS
         ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Existing Skills */}
        <div className="card-tactile p-4 rounded-3xl space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-1 border-b border-[#E9DFFF]">
              <span className="text-xs font-extrabold text-[#302747] flex items-center gap-1.5">
                <span>📁</span>
                <span>Existing Skills</span>
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#FAF7FF] border border-[#E9DFFF] text-[10px] font-bold text-[#5D5473]">
                {existingSkills.length}
              </span>
            </div>
            <p className="text-[11px] text-[#5D5473]">Self-declared abilities from onboarding.</p>

            <div className="space-y-2">
              {existingSkills.map(s => (
                <div key={s.id} className="p-2.5 rounded-xl bg-white border border-[#E9DFFF] space-y-1 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#302747]">{s.name}</span>
                    <span className="text-[9px] font-bold text-[#8F86A5]">{s.category}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[9px] text-[#8F86A5] italic">{s.verificationType}</span>
                    <button
                      type="button"
                      onClick={() => handlePromoteSkill(s.id, 'learning')}
                      className="text-[10px] font-extrabold text-[#7956D8] hover:underline"
                    >
                      Practice ➔
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Currently Learning */}
        <div className="card-tactile p-4 rounded-3xl !border-[#f0c3ad] space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-1 border-b border-[#f0c3ad]">
              <span className="text-xs font-extrabold text-[#FF914D] flex items-center gap-1.5">
                <span>⏳</span>
                <span>Currently Learning</span>
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#FFE1D2] text-[10px] font-extrabold text-[#FF914D]">
                {currentlyLearning.length}
              </span>
            </div>
            <p className="text-[11px] text-[#5D5473]">Actively building and practicing daily.</p>

            <div className="space-y-2">
              {currentlyLearning.map(s => (
                <div key={s.id} className="p-2.5 rounded-xl bg-white border border-[#f0c3ad] space-y-1 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#302747]">{s.name}</span>
                    <span className="text-[9px] font-bold text-[#FF914D]">{s.category}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[9px] text-[#FF914D] font-bold">{s.dateAdded}</span>
                    <button
                      type="button"
                      onClick={() => handlePromoteSkill(s.id, 'completed')}
                      className="text-[10px] font-extrabold text-[#10B981] hover:underline"
                    >
                      Complete ✓
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Skills to Develop */}
        <div className="card-tactile p-4 rounded-3xl space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-1 border-b border-[#E9DFFF]">
              <span className="text-xs font-extrabold text-[#7956D8] flex items-center gap-1.5">
                <span>🎯</span>
                <span>Skills to Develop</span>
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#F3EDFF] text-[10px] font-extrabold text-[#7956D8]">
                {skillsToDevelop.length}
              </span>
            </div>
            <p className="text-[11px] text-[#5D5473]">Target competencies on your roadmap.</p>

            <div className="space-y-2">
              {skillsToDevelop.map(s => (
                <div key={s.id} className="p-2.5 rounded-xl bg-white border border-dashed border-[#A78BFA] space-y-1 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#5D5473]">{s.name}</span>
                    <span className="text-[9px] font-bold text-[#A78BFA]">{s.category}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[9px] text-[#8F86A5]">Roadmap target</span>
                    <button
                      type="button"
                      onClick={() => handlePromoteSkill(s.id, 'learning')}
                      className="text-[10px] font-extrabold text-[#7956D8] hover:underline"
                    >
                      Start Learning ➔
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Completed Skills */}
        <div className="card-tactile p-4 rounded-3xl !border-[#A7F3D0] space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-1 border-b border-[#A7F3D0]">
              <span className="text-xs font-extrabold text-[#065F46] flex items-center gap-1.5">
                <span>🏆</span>
                <span>Completed Skills</span>
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#DDF3E8] text-[10px] font-extrabold text-[#065F46]">
                {completedSkills.length}
              </span>
            </div>
            <p className="text-[11px] text-[#5D5473]">Milestones achieved and verified.</p>

            <div className="space-y-2">
              {completedSkills.length > 0 ? (
                completedSkills.map(s => (
                  <div key={s.id} className="p-2.5 rounded-xl bg-white border border-[#A7F3D0] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-[#065F46] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                        <span>{s.name}</span>
                      </span>
                    </div>
                    <span className="text-[9px] font-bold text-[#10B981] block">Activity Verified ✓</span>
                  </div>
                ))
              ) : (
                <div className="p-3 rounded-xl bg-[#FAF7FF] text-center text-xs text-[#5D5473]">
                  Complete daily missions or roadmap tasks to add verified completions!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Category-Wise Breakdown & Activity Log */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Category-Wise Breakdown */}
        <div className="p-5 rounded-3xl bg-[#FFFCF8] border-2 border-[#E9DFFF] space-y-3 shadow-sm">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#7956D8]" />
            <h3 className="font-extrabold text-base text-[#302747]">Category-Wise Competency Breakdown</h3>
          </div>

          <div className="space-y-2.5 pt-1">
            {categories.map(cat => {
              const count = skillsList.filter(s => s.category === cat).length;
              const pct = skillsList.length > 0 ? Math.round((count / skillsList.length) * 100) : 0;
              return (
                <div key={cat} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-[#302747]">
                    <span>{cat}</span>
                    <span className="text-[#7956D8]">{count} skills ({pct}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#E9DFFF] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#7956D8] to-[#FF914D] transition-all duration-300"
                      style={{ width: `${Math.max(5, pct)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Learning Activity History */}
        <div className="p-5 rounded-3xl bg-[#FFFCF8] border-2 border-[#E9DFFF] space-y-3 shadow-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#FF914D]" />
            <h3 className="font-extrabold text-base text-[#302747]">Recent Learning Activity History</h3>
          </div>

          <div className="space-y-2.5 pt-1">
            <div className="p-3 rounded-2xl bg-[#FAF7FF] border border-[#E9DFFF] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span className="font-bold text-[#302747]">Completed Onboarding Quest</span>
              </div>
              <span className="text-[11px] text-[#5D5473]">Day 1</span>
            </div>

            {completedMissions.map((mId, i) => (
              <div key={mId} className="p-3 rounded-2xl bg-[#DDF3E8] border border-[#A7F3D0] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#10B981]" />
                  <span className="font-bold text-[#065F46]">Completed Daily Mission #{i + 1}</span>
                </div>
                <span className="text-[11px] font-extrabold text-[#065F46]">+50 XP</span>
              </div>
            ))}

            <div className="p-3 rounded-2xl bg-white border border-[#E9DFFF] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#7956D8]" />
                <span className="font-bold text-[#5D5473]">Started Phase 1 Foundations Roadmap</span>
              </div>
              <span className="text-[11px] text-[#5D5473]">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          ADD CUSTOM SKILL MODAL
         ======================================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#302747]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-pop-in">
          <div className="bg-[#FFFCF8] border-3 border-[#7956D8] rounded-3xl max-w-md w-full p-6 shadow-[0_16px_36px_rgba(121,86,216,0.22)] flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#E9DFFF] pb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-xl bg-[#FFE1D2] text-[#FF914D]">
                  <Plus className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-lg text-[#302747]">Add New Skill</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-[#5D5473] hover:text-[#302747]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSkill} className="space-y-3">
              <div>
                <label className="block text-xs font-extrabold text-[#7956D8] uppercase mb-1">
                  Skill Name:
                </label>
                <input
                  type="text"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="e.g. Docker, TypeScript, SQL, Figma..."
                  className="w-full p-2.5 rounded-xl bg-white border border-[#E9DFFF] text-xs font-bold text-[#302747] focus:outline-none focus:border-[#7956D8]"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#7956D8] uppercase mb-1">
                  Category:
                </label>
                <select
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value as SkillCategory)}
                  className="w-full p-2 rounded-xl bg-white border border-[#E9DFFF] text-xs font-semibold text-[#302747] focus:outline-none focus:border-[#7956D8]"
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#7956D8] uppercase mb-1">
                  Initial Status:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setNewSkillStatus('existing')}
                    className={`p-2 rounded-xl font-bold border transition-all ${
                      newSkillStatus === 'existing'
                        ? 'bg-[#7956D8] text-white border-[#7956D8]'
                        : 'bg-white border-[#E9DFFF] text-[#5D5473]'
                    }`}
                  >
                    Already Known
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewSkillStatus('learning')}
                    className={`p-2 rounded-xl font-bold border transition-all ${
                      newSkillStatus === 'learning'
                        ? 'bg-[#FF914D] text-white border-[#FF914D]'
                        : 'bg-white border-[#E9DFFF] text-[#5D5473]'
                    }`}
                  >
                    Currently Learning
                  </button>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-[#E9DFFF]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#FAF7FF] border border-[#E9DFFF] text-xs font-bold text-[#5D5473]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newSkillName.trim()}
                  className="px-5 py-2 rounded-xl bg-[#7956D8] text-white text-xs font-extrabold shadow-playful-purple hover:bg-[#6542BC] disabled:opacity-50"
                >
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
