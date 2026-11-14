import React, { useState, useEffect } from 'react';
import { OnboardingData } from '../../types/onboarding';
import { RECOMMENDED_PROJECTS, UserCustomProject } from '../../data/projectsData';
import { 
  FolderGit2, 
  Plus, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  X,
  GitBranch
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/audio';
import { syncProjectToSupabase, fetchProjectsFromSupabase } from '../../services/supabaseService';

interface ProjectsPortfolioViewProps {
  data: OnboardingData;
  onExploreExternal: (url: string) => void;
  onAddXP: (amount: number) => void;
}

export const ProjectsPortfolioView: React.FC<ProjectsPortfolioViewProps> = ({
  onExploreExternal,
  onAddXP,
}) => {
  const [filterLevel, setFilterLevel] = useState<'all' | 'Beginner' | 'Intermediate' | 'Advanced' | 'mine'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // User logged projects in session state
  const [userProjects, setUserProjects] = useState<UserCustomProject[]>([
    {
      id: 'user-p1',
      title: 'Personal Portfolio & Learning Hub',
      description: 'A responsive web application with clean component architecture and interactive career roadmap.',
      githubUrl: 'https://github.com/',
      liveUrl: 'https://skillio-demo.local',
      techStack: ['React', 'TypeScript', 'Tailwind CSS'],
      status: 'in-progress',
      createdAt: 'Today'
    }
  ]);

  // Load user projects from Supabase user_projects on mount
  useEffect(() => {
    fetchProjectsFromSupabase().then(cloudProjects => {
      if (cloudProjects && cloudProjects.length > 0) {
        setUserProjects(prev => {
          const titles = new Set(prev.map(p => p.title.toLowerCase()));
          const toAdd = cloudProjects.filter(p => !titles.has(p.title.toLowerCase()));
          return [...toAdd, ...prev];
        });
      }
    });
  }, []);

  // Modal Form State
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formGithub, setFormGithub] = useState('');
  const [formLive, setFormLive] = useState('');
  const [formTech, setFormTech] = useState('');
  const [formStatus, setFormStatus] = useState<'planning' | 'in-progress' | 'completed'>('in-progress');

  const filteredRecommended = RECOMMENDED_PROJECTS.filter(p => {
    if (filterLevel === 'all') return true;
    if (filterLevel === 'mine') return false;
    return p.level === filterLevel;
  });

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    sound.playChime();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#7956D8', '#10B981', '#FFD45C', '#FFE1D2']
    });

    const newProj: UserCustomProject = {
      id: `proj-${Date.now()}`,
      title: formTitle.trim(),
      description: formDesc.trim(),
      githubUrl: formGithub.trim(),
      liveUrl: formLive.trim() || undefined,
      techStack: formTech.split(',').map(t => t.trim()).filter(Boolean),
      status: formStatus,
      createdAt: 'Just now'
    };

    setUserProjects(prev => [newProj, ...prev]);
    syncProjectToSupabase(newProj);
    onAddXP(50); // XP for logging a real project
    setFormTitle('');
    setFormDesc('');
    setFormGithub('');
    setFormLive('');
    setFormTech('');
    setIsAddModalOpen(false);
  };

  const handleToggleStatus = (id: string) => {
    sound.playPop();
    setUserProjects(prev => prev.map(p => {
      if (p.id === id) {
        const nextStatus = p.status === 'planning' ? 'in-progress' :
                           p.status === 'in-progress' ? 'completed' : 'in-progress';
        return { ...p, status: nextStatus };
      }
      return p;
    }));
  };

  return (
    <div className="flex flex-col gap-6 pb-12 animate-pop-in">
      {/* Header Banner */}
      <div className="card-tactile rounded-3xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFE1D2] border border-[#f0c3ad] text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-[#FF914D] mb-1.5">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Hands-on Proof of Skill</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#302747] tracking-tight">
            Projects & Portfolio
          </h1>
          <p className="text-xs sm:text-sm text-[#5D5473] font-medium mt-1 max-w-xl">
            Employers hire builders. Transform theoretical tutorials into verified GitHub projects, milestone by milestone.
          </p>
        </div>

        {/* Add Project Button */}
        <button
          type="button"
          onClick={() => {
            sound.playPop();
            setIsAddModalOpen(true);
          }}
          className="btn-tactile-primary py-2.5 px-5 text-xs sm:text-sm flex items-center gap-2 shrink-0 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Your Project</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'Beginner', label: 'Beginner' },
            { id: 'Intermediate', label: 'Intermediate' },
            { id: 'Advanced', label: 'Advanced' },
            { id: 'mine', label: `My Logged Projects (${userProjects.length})` }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                sound.playPop();
                setFilterLevel(tab.id as any);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all ${
                filterLevel === tab.id
                  ? 'bg-[#7956D8] text-white shadow-playful-purple-sm'
                  : 'bg-white border border-[#E9DFFF] text-[#5D5473] hover:text-[#7956D8] hover:bg-[#F3EDFF]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="text-xs font-bold text-[#5D5473]">
          Grounded in practical industry applications
        </span>
      </div>

      {/* ========================================================
          USER LOGGED PROJECTS SECTION
         ======================================================== */}
      {(filterLevel === 'all' || filterLevel === 'mine') && userProjects.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-[#7956D8]" />
            <h2 className="text-lg font-extrabold text-[#302747]">
              My Active Portfolio Items ({userProjects.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userProjects.map(proj => (
              <div
                key={proj.id}
                className="card-tactile p-5 rounded-3xl !border-[#7956D8] flex flex-col justify-between gap-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-base text-[#302747]">{proj.title}</span>
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(proj.id)}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase transition-all ${
                        proj.status === 'completed'
                          ? 'badge-mint'
                          : proj.status === 'in-progress'
                          ? 'badge-peach'
                          : 'badge-purple'
                      }`}
                      title="Tap to change status"
                    >
                      {proj.status === 'completed' ? '✓ Completed' :
                       proj.status === 'in-progress' ? '⏳ In Progress' : '📝 Planning'}
                    </button>
                  </div>

                  <p className="text-xs text-[#5D5473] leading-relaxed">
                    {proj.description || 'No description provided.'}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {proj.techStack.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-md bg-[#FAF7FF] border border-[#E9DFFF] text-[10px] font-bold text-[#7956D8]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E9DFFF] flex items-center justify-between">
                  {proj.githubUrl ? (
                    <button
                      type="button"
                      onClick={() => onExploreExternal(proj.githubUrl)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#302747] hover:text-[#7956D8]"
                    >
                      <GitBranch className="w-3.5 h-3.5 text-[#7956D8]" />
                      <span>View GitHub Repo</span>
                    </button>
                  ) : (
                    <span className="text-[11px] text-[#8F86A5]">No repo URL added</span>
                  )}

                  {proj.liveUrl && (
                    <button
                      type="button"
                      onClick={() => onExploreExternal(proj.liveUrl!)}
                      className="inline-flex items-center gap-1 text-xs font-extrabold text-[#7956D8] hover:underline"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================
          RECOMMENDED PROJECTS GRID
         ======================================================== */}
      {filterLevel !== 'mine' && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#7956D8]" />
            <h2 className="text-lg font-extrabold text-[#302747]">
              Curated Project Blueprints
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredRecommended.map(proj => (
              <div
                key={proj.id}
                className="card-tactile p-5 rounded-3xl flex flex-col justify-between gap-4 group"
              >
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      proj.level === 'Beginner' ? 'badge-mint' :
                      proj.level === 'Intermediate' ? 'badge-peach' :
                      'badge-purple'
                    }`}>
                      {proj.level} Blueprint
                    </span>
                    <span className="text-[10px] font-bold text-[#8F86A5]">{proj.category}</span>
                  </div>

                  <h3 className="font-extrabold text-base text-[#302747] group-hover:text-[#7956D8] transition-colors leading-snug">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-[#5D5473] leading-relaxed">
                    {proj.summary}
                  </p>

                  {/* Skills Developed */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#7956D8] block">
                      Skills Developed:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {proj.skillsDeveloped.map(s => (
                        <span key={s} className="px-2 py-0.5 rounded-md bg-[#F3EDFF] text-[#7956D8] text-[10px] font-bold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FF914D] block">
                      Recommended Tech Stack:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {proj.techStack.map(t => (
                        <span key={t} className="px-2 py-0.5 rounded-md bg-[#FAF7FF] border border-[#E9DFFF] text-[10px] font-semibold text-[#302747]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Milestones */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#302747] block">
                      Key Milestones:
                    </span>
                    <div className="space-y-1">
                      {proj.milestones.map((m, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-xs text-[#5D5473]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                          <span><strong>{m.title}:</strong> {m.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-2 border-t border-[#E9DFFF] flex items-center justify-between gap-2">
                  {proj.starterGuideUrl ? (
                    <button
                      type="button"
                      onClick={() => onExploreExternal(proj.starterGuideUrl!)}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#7956D8] hover:underline"
                    >
                      <span>Starter Tutorial Guide</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <span className="text-xs text-[#8F86A5]">Self-guided build</span>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setFormTitle(proj.title);
                      setFormDesc(proj.summary);
                      setFormTech(proj.techStack.join(', '));
                      setIsAddModalOpen(true);
                    }}
                    className="btn-tactile-secondary py-1.5 px-3.5 text-xs"
                  >
                    Start in My Portfolio
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================
          ADD YOUR PROJECT MODAL
         ======================================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#302747]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-pop-in">
          <div className="bg-[#FFFCF8] border-3 border-[#7956D8] rounded-3xl max-w-lg w-full p-6 shadow-[0_16px_36px_rgba(121,86,216,0.22)] flex flex-col gap-4 max-h-[90dvh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E9DFFF] pb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-xl bg-[#FFE1D2] text-[#FF914D]">
                  <FolderGit2 className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-lg text-[#302747]">Add Project to Portfolio</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-[#5D5473] hover:text-[#302747]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProject} className="space-y-3">
              <div>
                <label className="block text-xs font-extrabold text-[#7956D8] uppercase mb-1">
                  Project Title:
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. AI Resume Parser, Weather CLI, E-commerce Store..."
                  className="w-full p-2.5 rounded-xl bg-white border border-[#E9DFFF] text-xs font-bold text-[#302747] focus:outline-none focus:border-[#7956D8]"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#7956D8] uppercase mb-1">
                  Description & Key Features:
                </label>
                <textarea
                  rows={3}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="What does it do? What problem did you solve?"
                  className="w-full p-2.5 rounded-xl bg-white border border-[#E9DFFF] text-xs text-[#302747] focus:outline-none focus:border-[#7956D8]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold text-[#7956D8] uppercase mb-1">
                    GitHub Repo URL:
                  </label>
                  <input
                    type="url"
                    value={formGithub}
                    onChange={(e) => setFormGithub(e.target.value)}
                    placeholder="https://github.com/your-name/repo"
                    className="w-full p-2.5 rounded-xl bg-white border border-[#E9DFFF] text-xs text-[#302747] focus:outline-none focus:border-[#7956D8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#7956D8] uppercase mb-1">
                    Live Demo URL (Optional):
                  </label>
                  <input
                    type="url"
                    value={formLive}
                    onChange={(e) => setFormLive(e.target.value)}
                    placeholder="https://my-app.vercel.app"
                    className="w-full p-2.5 rounded-xl bg-white border border-[#E9DFFF] text-xs text-[#302747] focus:outline-none focus:border-[#7956D8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#7956D8] uppercase mb-1">
                  Technology Stack (Comma-separated):
                </label>
                <input
                  type="text"
                  value={formTech}
                  onChange={(e) => setFormTech(e.target.value)}
                  placeholder="e.g. React, Python, PostgreSQL, Docker"
                  className="w-full p-2.5 rounded-xl bg-white border border-[#E9DFFF] text-xs text-[#302747] focus:outline-none focus:border-[#7956D8]"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#7956D8] uppercase mb-1">
                  Project Status:
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {(['planning', 'in-progress', 'completed'] as const).map(st => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setFormStatus(st)}
                      className={`p-2 rounded-xl font-bold border transition-all ${
                        formStatus === st
                          ? 'bg-[#7956D8] text-white border-[#7956D8]'
                          : 'bg-white border-[#E9DFFF] text-[#5D5473]'
                      }`}
                    >
                      {st === 'planning' ? 'Planning' : st === 'in-progress' ? 'In Progress' : 'Completed'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-[#E9DFFF]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="btn-tactile-secondary px-4 py-2 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!formTitle.trim()}
                  className="btn-tactile-primary px-5 py-2 text-xs disabled:opacity-50"
                >
                  Save Project (+50 XP)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
