import React, { useState, useEffect } from 'react';
import { OnboardingData } from '../../types/onboarding';
import { getRoadmapForCareer, RoadmapStage, RoadmapTask } from '../../data/roadmapData';
import { 
  Map, 
  CheckCircle2, 
  Lock, 
  ExternalLink, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Play, 
  Check, 
  Compass
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/audio';
import { recordRoadmapTaskToSupabase, fetchCompletedRoadmapTasksFromSupabase } from '../../services/supabaseService';

interface RoadmapViewProps {
  data: OnboardingData;
  onExploreCourse: (url: string) => void;
  onAddXP: (amount: number) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  data,
  onExploreCourse,
  onAddXP,
}) => {
  const primaryCareer = data.careerInterests?.[0] || 'Software Development';
  const initialStages = getRoadmapForCareer(primaryCareer);

  // Completed task IDs in session state
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>(['task-py-vars', 'task-cs-syntax']);
  const [expandedStageId, setExpandedStageId] = useState<string>('stage-1');

  // Load completed tasks from Supabase user_roadmap_tasks on mount
  useEffect(() => {
    fetchCompletedRoadmapTasksFromSupabase().then(taskIds => {
      if (taskIds && taskIds.length > 0) {
        setCompletedTaskIds(prev => Array.from(new Set([...prev, ...taskIds])));
      }
    });
  }, []);

  // Toggle stage expansion
  const toggleStage = (stageId: string) => {
    sound.playPop();
    setExpandedStageId(prev => prev === stageId ? '' : stageId);
  };

  // Mark task as complete
  const handleToggleTaskComplete = (task: RoadmapTask) => {
    const isDone = completedTaskIds.includes(task.id);
    if (!isDone) {
      sound.playChime();
      confetti({
        particleCount: 60,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#7956D8', '#10B981', '#FFD45C', '#FFE1D2']
      });
      setCompletedTaskIds(prev => [...prev, task.id]);
      recordRoadmapTaskToSupabase(task, primaryCareer);
      onAddXP(task.xpReward);
    } else {
      sound.playPop();
      setCompletedTaskIds(prev => prev.filter(id => id !== task.id));
    }
  };

  // Calculate stage status
  const getStageStatus = (stage: RoadmapStage, stageIdx: number): 'completed' | 'current' | 'upcoming' | 'locked' => {
    const totalTasks = stage.tasks.length;
    const doneTasks = stage.tasks.filter(t => completedTaskIds.includes(t.id)).length;

    if (doneTasks === totalTasks && totalTasks > 0) return 'completed';
    
    // Stage 1 is never locked
    if (stageIdx === 0) return doneTasks > 0 ? 'current' : 'current';

    // Check if previous stage has progress
    const prevStage = initialStages[stageIdx - 1];
    const prevDoneTasks = prevStage.tasks.filter(t => completedTaskIds.includes(t.id)).length;

    if (prevDoneTasks === 0) return 'locked';
    if (doneTasks > 0) return 'current';
    return 'upcoming';
  };

  // Find next recommended task
  const allTasks = initialStages.flatMap(s => s.tasks);
  const nextTask = allTasks.find(t => !completedTaskIds.includes(t.id)) || allTasks[0];

  return (
    <div className="flex flex-col gap-6 pb-12 animate-pop-in">
      {/* Header Banner */}
      <div className="card-tactile rounded-3xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFE1D2] border border-[#f0c3ad] text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-[#FF914D] mb-1.5">
            <Map className="w-3.5 h-3.5" />
            <span>Interactive Learning Adventure</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#302747] tracking-tight">
            My Visual Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-[#5D5473] font-medium mt-1 max-w-xl">
            A milestone journey from foundations to career-readiness, tailored to your {primaryCareer} goals.
          </p>
        </div>

        {/* Career Goal Pill */}
        <div className="px-4 py-2 rounded-2xl bg-[#F3EDFF] border border-[#E9DFFF] flex items-center gap-2 self-start md:self-auto">
          <Compass className="w-4 h-4 text-[#7956D8]" />
          <span className="text-xs font-extrabold text-[#7956D8]">{primaryCareer} Track</span>
        </div>
      </div>

      {/* ========================================================
          RESUME JOURNEY: NEXT RECOMMENDED ACTION BANNER
         ======================================================== */}
      {nextTask && (
        <section className="bg-gradient-to-r from-[#FFFCF8] via-[#FAF7FF] to-[#FFE1D2]/30 border-3 border-[#7956D8] rounded-3xl p-5 sm:p-6 shadow-[0_6px_0_0_#6542BC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#7956D8] text-white text-[10px] font-extrabold uppercase tracking-wider">
              <Play className="w-3 h-3 fill-current" />
              <span>Resume Journey • Next Recommended Task</span>
            </div>
            <h3 className="text-lg font-extrabold text-[#302747]">
              {nextTask.title}
            </h3>
            <p className="text-xs text-[#5D5473] max-w-xl">
              {nextTask.description}
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => onExploreCourse(nextTask.recommendedResourceUrl)}
              className="btn-tactile-primary py-2.5 px-4 text-xs flex items-center gap-1.5"
            >
              <span>Learn Task</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => handleToggleTaskComplete(nextTask)}
              className="btn-tactile-secondary py-2.5 px-4 text-xs flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Mark Done (+{nextTask.xpReward} XP)</span>
            </button>
          </div>
        </section>
      )}

      {/* ========================================================
          JOURNEY MAP STAGES
         ======================================================== */}
      <div className="space-y-4 relative">
        {/* Visual Connecting Spine on Desktop */}
        <div className="hidden sm:block absolute left-8 top-10 bottom-10 w-1 bg-[#E9DFFF] -z-0" />

        {initialStages.map((stage, idx) => {
          const status = getStageStatus(stage, idx);
          const isExpanded = expandedStageId === stage.id;
          const completedCount = stage.tasks.filter(t => completedTaskIds.includes(t.id)).length;
          const totalTasks = stage.tasks.length;

          return (
            <div
              key={stage.id}
              className={`rounded-3xl border-2 transition-all overflow-hidden ${
                status === 'completed'
                  ? 'bg-[#FFFCF8] border-[#A7F3D0] shadow-sm'
                  : status === 'current'
                  ? 'bg-[#FFFCF8] border-[#7956D8] shadow-[0_4px_16px_rgba(121,86,216,0.12)]'
                  : status === 'upcoming'
                  ? 'bg-[#FFFCF8] border-[#E9DFFF]'
                  : 'bg-[#FAF7FF]/60 border-[#E9DFFF] opacity-75'
              }`}
            >
              {/* Stage Header Button */}
              <button
                type="button"
                onClick={() => status !== 'locked' && toggleStage(stage.id)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4"
              >
                <div className="flex items-center gap-3.5">
                  {/* Status Indicator Icon */}
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-extrabold text-sm shrink-0 shadow-sm ${
                    status === 'completed'
                      ? 'bg-[#DDF3E8] text-[#065F46] border border-[#A7F3D0]'
                      : status === 'current'
                      ? 'bg-[#7956D8] text-white shadow-playful-purple-sm ring-4 ring-[#7956D8]/20'
                      : status === 'upcoming'
                      ? 'bg-[#FAF7FF] text-[#7956D8] border border-[#E9DFFF]'
                      : 'bg-[#E9DFFF] text-[#8F86A5]'
                  }`}>
                    {status === 'completed' ? <CheckCircle2 className="w-5 h-5 text-[#10B981]" /> :
                     status === 'locked' ? <Lock className="w-4 h-4 text-[#8F86A5]" /> :
                     stage.icon}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#7956D8]">
                        Stage {stage.stageNumber}
                      </span>
                      {status === 'completed' && (
                        <span className="px-2 py-0.2 rounded-md bg-[#DDF3E8] text-[#065F46] text-[9px] font-extrabold uppercase">
                          Completed
                        </span>
                      )}
                      {status === 'current' && (
                        <span className="px-2 py-0.2 rounded-md bg-[#FFE1D2] text-[#FF914D] text-[9px] font-extrabold uppercase">
                          Active Stage
                        </span>
                      )}
                      {status === 'locked' && (
                        <span className="px-2 py-0.2 rounded-md bg-[#E9DFFF] text-[#5D5473] text-[9px] font-extrabold uppercase">
                          Locked
                        </span>
                      )}
                    </div>

                    <h3 className="font-extrabold text-base sm:text-lg text-[#302747] leading-snug">
                      {stage.title}
                    </h3>
                    <p className="text-xs text-[#5D5473]">
                      {stage.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-extrabold text-[#7956D8] bg-[#F3EDFF] px-2.5 py-1 rounded-xl border border-[#E9DFFF]">
                    {completedCount} / {totalTasks} Tasks
                  </span>

                  {status !== 'locked' && (
                    <div className="p-1.5 rounded-xl bg-[#FAF7FF] text-[#7956D8]">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  )}
                </div>
              </button>

              {/* Stage Tasks List (Expanded) */}
              {isExpanded && status !== 'locked' && (
                <div className="px-4 pb-5 sm:px-6 pt-1 border-t border-[#E9DFFF] space-y-3">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#7956D8] pt-2">
                    Actionable Milestone Tasks:
                  </div>

                  <div className="space-y-2.5">
                    {stage.tasks.map((task) => {
                      const isDone = completedTaskIds.includes(task.id);

                      return (
                        <div
                          key={task.id}
                          className={`p-3 sm:p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                            isDone
                              ? 'bg-[#DDF3E8]/40 border-[#A7F3D0]'
                              : 'bg-white border-[#E9DFFF] hover:border-[#7956D8]'
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleToggleTaskComplete(task)}
                                className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all ${
                                  isDone
                                    ? 'bg-[#10B981] text-white'
                                    : 'border-2 border-[#A78BFA] hover:border-[#7956D8]'
                                }`}
                                aria-label={isDone ? 'Mark uncompleted' : 'Mark completed'}
                              >
                                {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </button>

                              <h4 className={`text-xs sm:text-sm font-extrabold ${
                                isDone ? 'text-[#065F46] line-through' : 'text-[#302747]'
                              }`}>
                                {task.title}
                              </h4>
                            </div>

                            <p className="text-xs text-[#5D5473] pl-7">
                              {task.description}
                            </p>

                            <div className="flex items-center gap-3 pl-7 pt-1 text-[11px]">
                              <span className="flex items-center gap-1 text-[#8F86A5]">
                                <Clock className="w-3 h-3 text-[#FF914D]" />
                                {task.estimatedHours} hrs
                              </span>
                              <span className="flex items-center gap-1 text-[#FF914D] font-bold">
                                <Sparkles className="w-3 h-3" />
                                +{task.xpReward} XP
                              </span>
                            </div>
                          </div>

                          {/* Task Actions */}
                          <div className="flex items-center gap-2 pl-7 sm:pl-0 shrink-0">
                            <button
                              type="button"
                              onClick={() => onExploreCourse(task.recommendedResourceUrl)}
                              className="btn-tactile-secondary py-1.5 px-3 text-xs flex items-center gap-1"
                            >
                              <span>Resource</span>
                              <ExternalLink className="w-3 h-3" />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleToggleTaskComplete(task)}
                              className={`py-1.5 px-3 rounded-xl text-xs font-extrabold transition-all ${
                                isDone
                                  ? 'bg-[#DDF3E8] text-[#065F46] border-2 border-[#A7F3D0]'
                                  : 'btn-tactile-primary'
                              }`}
                            >
                              {isDone ? 'Completed ✓' : 'Mark Done'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
