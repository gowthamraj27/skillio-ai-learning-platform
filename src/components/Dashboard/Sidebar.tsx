import React, { useState } from 'react';
import { 
  Home, 
  Compass, 
  Building2, 
  BookOpen, 
  Zap, 
  Map, 
  FolderGit2, 
  User, 
  Settings, 
  Sparkles,
  RotateCcw,
  Menu,
  X
} from 'lucide-react';

export type DashboardTab = 
  | 'home' 
  | 'careers' 
  | 'companies' 
  | 'learning' 
  | 'skills' 
  | 'roadmap' 
  | 'projects' 
  | 'profile' 
  | 'settings';

interface SidebarProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  studentName: string;
  onRetakeOnboarding: () => void;
}

const NAV_ITEMS: { id: DashboardTab; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'careers', label: 'Career Explorer', icon: Compass },
  { id: 'companies', label: 'Company Insights', icon: Building2 },
  { id: 'learning', label: 'My Learning', icon: BookOpen },
  { id: 'skills', label: 'Skill Progress', icon: Zap },
  { id: 'roadmap', label: 'My Roadmap', icon: Map },
  { id: 'projects', label: 'Projects & Portfolio', icon: FolderGit2 },
  { id: 'profile', label: 'My Profile', icon: User },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  studentName,
  onRetakeOnboarding,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSelectTab = (tab: DashboardTab) => {
    onTabChange(tab);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Top Header with Hamburger */}
      <div className="md:hidden bg-[#FFFCF8] border-b border-[#E9DFFF] px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#7956D8] flex items-center justify-center shadow-playful-purple-sm">
            <span className="text-white font-extrabold text-xs">S</span>
          </div>
          <span className="font-extrabold text-base tracking-tight text-[#302747]">
            SKILL<span className="text-[#7956D8]">IO</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl bg-[#FAF7FF] border border-[#E9DFFF] text-[#7956D8] hover:bg-[#F3EDFF]"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div 
          className="md:hidden fixed inset-0 z-40 bg-[#302747]/40 backdrop-blur-xs"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main Persistent Sidebar (Desktop) / Mobile Drawer */}
      <aside className={`
        fixed md:static top-0 bottom-0 left-0 z-50 md:z-30
        w-64 bg-[#FFFCF8] border-r border-[#E9DFFF] flex flex-col justify-between p-3.5 sm:p-4 shrink-0 shadow-sm
        transition-transform duration-300 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Top: Logo & Navigation Links */}
        <div className="flex flex-col gap-4 overflow-y-auto">
          {/* SKILLIO Brand Header */}
          <div className="flex items-center justify-between px-2 pt-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#7956D8] flex items-center justify-center shadow-playful-purple-sm">
                <span className="text-white font-extrabold text-sm">S</span>
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight text-[#302747] block leading-none">
                  SKILL<span className="text-[#7956D8]">IO</span>
                </span>
                <span className="text-[10px] font-bold text-[#FF914D] block mt-0.5">
                  Career Growth Companion
                </span>
              </div>
            </div>

            {/* Mobile close button inside drawer */}
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="md:hidden p-1 text-[#5D5473] hover:text-[#302747]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links List */}
          <nav className="flex flex-col gap-1 pt-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectTab(item.id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all text-left ${
                    isActive
                      ? 'bg-[#7956D8] text-white shadow-playful-purple-sm translate-x-0.5'
                      : 'text-[#5D5473] hover:text-[#7956D8] hover:bg-[#F3EDFF]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#7956D8]'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom: Compact Student Profile Area & Onboarding Reset */}
        <div className="flex flex-col gap-2 pt-3 border-t border-[#E9DFFF]">
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#FAF7FF] border border-[#E9DFFF]">
            <div className="w-8 h-8 rounded-full bg-[#FFE1D2] text-[#FF914D] flex items-center justify-center font-extrabold text-xs shrink-0">
              {studentName ? studentName.charAt(0).toUpperCase() : 'S'}
            </div>
            <div className="flex-1 min-w-0">
              <span className="block text-xs font-extrabold text-[#302747] truncate">
                {studentName || 'Student Pioneer'}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#7956D8]">
                <Sparkles className="w-2.5 h-2.5 text-[#FF914D]" />
                Level 1 Learner
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onRetakeOnboarding}
            className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-[11px] font-bold text-[#5D5473] hover:text-[#7956D8] hover:bg-[#F3EDFF] transition-all"
            title="Retake onboarding to change preferences"
          >
            <RotateCcw className="w-3 h-3 text-[#FF914D]" />
            <span>Retake Onboarding</span>
          </button>
        </div>
      </aside>
    </>
  );
};
