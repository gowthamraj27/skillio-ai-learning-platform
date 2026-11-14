import React, { useState, useEffect } from 'react';
import { OnboardingData } from '../../types/onboarding';
import { Sidebar, DashboardTab } from './Sidebar';
import { DashboardHome } from './DashboardHome';
import { CareerExplorerView } from './CareerExplorerView';
import { CompanyInsightsView } from './CompanyInsightsView';
import { MyLearningView } from './MyLearningView';
import { SkillProgressView } from './SkillProgressView';
import { RoadmapView } from './RoadmapView';
import { ProjectsPortfolioView } from './ProjectsPortfolioView';
import { ProfileView } from './ProfileView';
import { SettingsView } from './SettingsView';
import { BlobbyCompanionWidget } from '../Blobby/BlobbyCompanionWidget';
import { sound } from '../../utils/audio';
import { RotateCcw, Database } from 'lucide-react';
import { 
  syncProgressToSupabase, 
  fetchProgressFromSupabase, 
  recordMissionToSupabase, 
  fetchCompletedMissionsFromSupabase,
  syncSettingsToSupabase,
  fetchSettingsFromSupabase
} from '../../services/supabaseService';

interface DashboardLayoutProps {
  data: OnboardingData;
  onRetakeOnboarding: () => void;
  onResetAllData: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  data,
  onRetakeOnboarding,
  onResetAllData,
  soundEnabled,
  onToggleSound,
}) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('home');

  // Tracked growth metrics in session state
  const [trackedXP, setTrackedXP] = useState<number>(120);
  const [trackedStreak, setTrackedStreak] = useState<number>(1);
  const [completedMissions, setCompletedMissions] = useState<string[]>([]);
  const [isCloudSynced, setIsCloudSynced] = useState<boolean>(true);

  // Load progress and missions from Supabase on mount
  useEffect(() => {
    fetchProgressFromSupabase().then(res => {
      if (res && res.xp) {
        setTrackedXP(res.xp);
        if (res.streak) setTrackedStreak(res.streak);
        setIsCloudSynced(true);
      }
    }).catch(() => setIsCloudSynced(false));

    fetchCompletedMissionsFromSupabase().then(res => {
      if (res && res.length > 0) {
        setCompletedMissions(res);
      }
    });

    fetchSettingsFromSupabase().then(res => {
      if (res && typeof res.soundEnabled === 'boolean' && res.soundEnabled !== soundEnabled) {
        onToggleSound();
      }
    });
  }, []);

  const handleTabChange = (tab: DashboardTab) => {
    sound.playPop();
    setActiveTab(tab);
  };

  const handleExploreCourse = (url: string) => {
    sound.playPop();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleAddXP = (amount: number) => {
    setTrackedXP(prev => {
      const nextXP = prev + amount;
      syncProgressToSupabase(nextXP, trackedStreak);
      return nextXP;
    });
  };

  const handleCompleteMission = (missionId: string, xpReward: number) => {
    if (!completedMissions.includes(missionId)) {
      setCompletedMissions(prev => [...prev, missionId]);
      recordMissionToSupabase(missionId, 'Daily Mission', xpReward);
      handleAddXP(xpReward);
    }
  };

  const getTabLabel = (tab: DashboardTab) => {
    switch (tab) {
      case 'home': return 'Dashboard Overview';
      case 'careers': return 'Career Explorer';
      case 'companies': return 'Company Insights & Expectations';
      case 'learning': return 'My Learning Resources';
      case 'skills': return 'Skill Progress & Competency Map';
      case 'roadmap': return 'Visual Learning Roadmap';
      case 'projects': return 'Projects & Portfolio';
      case 'profile': return 'Student Passport & Profile';
      case 'settings': return 'App Settings & Preferences';
      default: return 'Dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFCF8] text-[#302747] flex flex-col md:flex-row font-sans selection:bg-[#FFE1D2] selection:text-[#302747] relative overflow-x-hidden">
      {/* 1. LEFT SIDEBAR */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        studentName={data.name}
        onRetakeOnboarding={onRetakeOnboarding}
      />

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 bg-[#FFFCF8]/95 backdrop-blur-md border-b border-[#E9DFFF] px-4 sm:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#7956D8] bg-[#F3EDFF] px-2.5 py-1 rounded-lg border border-[#E9DFFF]">
              {getTabLabel(activeTab)}
            </span>

            {/* Supabase Database Connection Status Pill */}
            <div className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-extrabold ${
              isCloudSynced 
                ? 'bg-[#DDF3E8] border-[#a8e2c5] text-[#15803d]' 
                : 'bg-[#FFE1D2] border-[#f0c3ad] text-[#FF914D]'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isCloudSynced ? 'bg-[#22c55e] animate-pulse' : 'bg-[#FF914D]'}`}></span>
              <Database className="w-3 h-3" />
              <span>{isCloudSynced ? 'Supabase Connected' : 'Local Storage Mode'}</span>
            </div>
            <div className={`sm:hidden inline-flex items-center gap-1 px-2 py-1 rounded-full border text-[10px] font-extrabold ${
              isCloudSynced 
                ? 'bg-[#DDF3E8] border-[#a8e2c5] text-[#15803d]' 
                : 'bg-[#FFE1D2] border-[#f0c3ad] text-[#FF914D]'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isCloudSynced ? 'bg-[#22c55e] animate-pulse' : 'bg-[#FF914D]'}`}></span>
              <span>{isCloudSynced ? 'DB' : 'Local'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onRetakeOnboarding}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E9DFFF] bg-[#FFFFFF] text-xs font-bold text-[#5D5473] hover:text-[#7956D8] hover:border-[#7956D8] shadow-sm transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#FF914D]" />
              <span className="hidden sm:inline">Onboarding Quest</span>
            </button>

            <div className="w-8 h-8 rounded-full bg-[#7956D8] text-white flex items-center justify-center font-extrabold text-xs shadow-playful-purple-sm">
              {data.name ? data.name.charAt(0).toUpperCase() : 'S'}
            </div>
          </div>
        </header>

        {/* Tab Body with responsive max-width container */}
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto flex-1 min-w-0 pb-24 sm:pb-28">
          {activeTab === 'home' && (
            <DashboardHome
              data={data}
              onExploreCourse={handleExploreCourse}
              onNavigateTab={handleTabChange}
              trackedXP={trackedXP}
              trackedStreak={trackedStreak}
              completedMissions={completedMissions}
              onCompleteMission={handleCompleteMission}
            />
          )}
          {activeTab === 'careers' && (
            <CareerExplorerView
              currentInterest={data.careerInterests?.[0]}
              onSelectCareer={(careerTitle) => {
                // Update active career interest in session
                data.careerInterests = [careerTitle, ...(data.careerInterests || []).filter(c => c !== careerTitle)];
              }}
            />
          )}
          {activeTab === 'companies' && (
            <CompanyInsightsView
              data={data}
              onExploreExternal={handleExploreCourse}
            />
          )}
          {activeTab === 'learning' && (
            <MyLearningView
              data={data}
              onExploreCourse={handleExploreCourse}
            />
          )}
          {activeTab === 'skills' && (
            <SkillProgressView
              data={data}
              trackedXP={trackedXP}
              trackedStreak={trackedStreak}
              completedMissions={completedMissions}
            />
          )}
          {activeTab === 'roadmap' && (
            <RoadmapView
              data={data}
              onExploreCourse={handleExploreCourse}
              onAddXP={handleAddXP}
            />
          )}
          {activeTab === 'projects' && (
            <ProjectsPortfolioView
              data={data}
              onExploreExternal={handleExploreCourse}
              onAddXP={handleAddXP}
            />
          )}
          {activeTab === 'profile' && (
            <ProfileView
              data={data}
              onRetakeOnboarding={onRetakeOnboarding}
            />
          )}
          {activeTab === 'settings' && (
            <SettingsView
              soundEnabled={soundEnabled}
              onToggleSound={() => {
                onToggleSound();
                syncSettingsToSupabase(!soundEnabled);
              }}
              onResetAllData={onResetAllData}
            />
          )}
        </main>
      </div>

      {/* 3. FLOATING BLOBBY COMPANION WIDGET (Contextual across all 9 pages) */}
      <BlobbyCompanionWidget
        data={data}
        activeTab={activeTab}
        onNavigateTab={handleTabChange}
        onExploreCourse={handleExploreCourse}
        trackedXP={trackedXP}
        trackedStreak={trackedStreak}
        completedMissions={completedMissions}
      />
    </div>
  );
};
