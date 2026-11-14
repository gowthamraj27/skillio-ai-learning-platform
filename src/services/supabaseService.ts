import { supabase } from '../lib/supabase';
import { OnboardingData } from '../types/onboarding';
import { SkillItem } from '../components/Dashboard/SkillProgressView';
import { UserCustomProject } from '../data/projectsData';
import { RoadmapTask } from '../data/roadmapData';
import { VerifiedCourse } from '../data/learningData';

// Local storage key for persistent guest/demo session ID
const STORAGE_USER_ID_KEY = 'skillio_session_user_id';

/**
 * Get or determine the current user ID.
 * Returns authenticated user ID if logged in, or falls back to a persistent session UUID.
 */
export async function getActiveUserId(): Promise<string> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.id) return user.id;
  } catch {
    // Ignore auth fetch error in guest mode
  }

  let storedId = localStorage.getItem(STORAGE_USER_ID_KEY);
  if (!storedId) {
    storedId = '2b0094b9-21d5-4cf5-a5b5-65248458440c'; // default active student profile ID
    localStorage.setItem(STORAGE_USER_ID_KEY, storedId);
  }
  return storedId;
}

// ============================================================================
// 1. PROFILES TABLE SYNC
// ============================================================================

export async function syncProfileToSupabase(data: OnboardingData): Promise<boolean> {
  try {
    const userId = await getActiveUserId();
    const payload = {
      id: userId,
      name: data.name || 'Learner',
      education_level: data.educationLevel || null,
      degree_course: data.degreeCourse || null,
      year_of_study: data.yearOfStudy || null,
      career_interests: data.careerInterests || [],
      skills: data.skills || [],
      achievement_types: data.achievementTypes || [],
      achievements_detail: data.achievementsDetail || null,
      ambition: data.ambition || null,
      imported_from: data.importedFrom || 'manual',
      completed_onboarding: Boolean(data.completedAt),
      completed_at: data.completedAt || null,
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('profiles')
      .upsert(payload, { onConflict: 'id' });

    if (error) {
      console.warn('[Supabase] Failed to sync profile:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('[Supabase] syncProfileToSupabase error:', err);
    return false;
  }
}

export async function fetchProfileFromSupabase(): Promise<Partial<OnboardingData> | null> {
  try {
    const userId = await getActiveUserId();
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error || !data) return null;

    return {
      name: data.name,
      educationLevel: data.education_level,
      degreeCourse: data.degree_course,
      yearOfStudy: data.year_of_study,
      careerInterests: data.career_interests,
      skills: data.skills,
      achievementTypes: data.achievement_types,
      achievementsDetail: data.achievements_detail,
      ambition: data.ambition,
      importedFrom: data.imported_from,
      completedAt: data.completed_at
    };
  } catch {
    return null;
  }
}

// ============================================================================
// 2. USER PROGRESS (XP & STREAK) TABLE SYNC
// ============================================================================

export async function syncProgressToSupabase(xp: number, streak: number = 1): Promise<boolean> {
  try {
    const userId = await getActiveUserId();
    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        xp,
        level: Math.floor(xp / 100) + 1,
        current_streak: streak,
        last_active_date: new Date().toISOString().split('T')[0],
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' });

    if (error) {
      console.warn('[Supabase] Failed to sync progress:', error.message);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export async function fetchProgressFromSupabase(): Promise<{ xp: number; streak: number } | null> {
  try {
    const userId = await getActiveUserId();
    const { data, error } = await supabase
      .from('user_progress')
      .select('xp, current_streak')
      .eq('user_id', userId)
      .maybeSingle();

    if (error || !data) return null;
    return { xp: data.xp, streak: data.current_streak };
  } catch {
    return null;
  }
}

// ============================================================================
// 3. DAILY MISSIONS TABLE SYNC
// ============================================================================

export async function recordMissionToSupabase(missionId: string, title: string, xpReward: number): Promise<boolean> {
  try {
    const userId = await getActiveUserId();
    const { error } = await supabase
      .from('user_missions')
      .upsert({
        user_id: userId,
        mission_id: missionId,
        title,
        xp_earned: xpReward,
        completed_at: new Date().toISOString()
      }, { onConflict: 'user_id,mission_id' });

    if (error) {
      console.warn('[Supabase] Failed to record mission:', error.message);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export async function fetchCompletedMissionsFromSupabase(): Promise<string[]> {
  try {
    const userId = await getActiveUserId();
    const { data, error } = await supabase
      .from('user_missions')
      .select('mission_id')
      .eq('user_id', userId);

    if (error || !data) return [];
    return data.map(m => m.mission_id);
  } catch {
    return [];
  }
}

// ============================================================================
// 4. USER SKILLS TABLE SYNC
// ============================================================================

export async function syncSkillToSupabase(skill: SkillItem): Promise<boolean> {
  try {
    const userId = await getActiveUserId();
    const { error } = await supabase
      .from('user_skills')
      .upsert({
        user_id: userId,
        name: skill.name,
        category: skill.category,
        status: skill.status,
        verification_type: skill.verificationType,
        date_added: skill.dateAdded,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id,name' });

    if (error) {
      console.warn('[Supabase] Failed to sync skill:', error.message);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export async function fetchSkillsFromSupabase(): Promise<SkillItem[]> {
  try {
    const userId = await getActiveUserId();
    const { data, error } = await supabase
      .from('user_skills')
      .select('*')
      .eq('user_id', userId);

    if (error || !data) return [];

    return data.map(item => ({
      id: item.id || `skill-${item.name}`,
      name: item.name,
      category: item.category as any,
      status: item.status as any,
      verificationType: item.verification_type as any,
      dateAdded: item.date_added || 'Saved in Cloud'
    }));
  } catch {
    return [];
  }
}

// ============================================================================
// 5. ROADMAP TASKS TABLE SYNC
// ============================================================================

export async function recordRoadmapTaskToSupabase(task: RoadmapTask, careerTrack: string): Promise<boolean> {
  try {
    const userId = await getActiveUserId();
    const { error } = await supabase
      .from('user_roadmap_tasks')
      .upsert({
        user_id: userId,
        career_track: careerTrack,
        stage_id: 'active-stage',
        task_id: task.id,
        xp_reward: task.xpReward,
        is_completed: true,
        completed_at: new Date().toISOString()
      }, { onConflict: 'user_id,task_id' });

    if (error) {
      console.warn('[Supabase] Failed to record roadmap task:', error.message);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export async function fetchCompletedRoadmapTasksFromSupabase(): Promise<string[]> {
  try {
    const userId = await getActiveUserId();
    const { data, error } = await supabase
      .from('user_roadmap_tasks')
      .select('task_id')
      .eq('user_id', userId)
      .eq('is_completed', true);

    if (error || !data) return [];
    return data.map(item => item.task_id);
  } catch {
    return [];
  }
}

// ============================================================================
// 6. PROJECTS & PORTFOLIO TABLE SYNC
// ============================================================================

export async function syncProjectToSupabase(project: UserCustomProject): Promise<boolean> {
  try {
    const userId = await getActiveUserId();
    const { error } = await supabase
      .from('user_projects')
      .insert({
        user_id: userId,
        title: project.title,
        description: project.description,
        github_url: project.githubUrl,
        live_url: project.liveUrl,
        tech_stack: project.techStack,
        status: project.status,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.warn('[Supabase] Failed to sync project:', error.message);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export async function fetchProjectsFromSupabase(): Promise<UserCustomProject[]> {
  try {
    const userId = await getActiveUserId();
    const { data, error } = await supabase
      .from('user_projects')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error || !data) return [];

    return data.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description || '',
      githubUrl: item.github_url || '',
      liveUrl: item.live_url || '',
      techStack: Array.isArray(item.tech_stack) ? item.tech_stack : [],
      status: item.status || 'in-progress',
      createdAt: item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Recently'
    }));
  } catch {
    return [];
  }
}

// ============================================================================
// 7. USER SAVED COURSES TABLE SYNC
// ============================================================================

export async function saveCourseToSupabase(course: VerifiedCourse): Promise<boolean> {
  try {
    const userId = await getActiveUserId();
    const { error } = await supabase
      .from('user_saved_courses')
      .upsert({
        user_id: userId,
        course_id: course.id,
        title: course.title,
        platform: course.platform,
        url: course.url,
        difficulty: course.difficulty,
        saved_at: new Date().toISOString()
      }, { onConflict: 'user_id,course_id' });

    if (error) {
      console.warn('[Supabase] Failed to save course:', error.message);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export async function removeSavedCourseFromSupabase(courseId: string): Promise<boolean> {
  try {
    const userId = await getActiveUserId();
    const { error } = await supabase
      .from('user_saved_courses')
      .delete()
      .eq('user_id', userId)
      .eq('course_id', courseId);

    if (error) {
      console.warn('[Supabase] Failed to remove saved course:', error.message);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export async function fetchSavedCoursesFromSupabase(): Promise<string[]> {
  try {
    const userId = await getActiveUserId();
    const { data, error } = await supabase
      .from('user_saved_courses')
      .select('course_id')
      .eq('user_id', userId);

    if (error || !data) return [];
    return data.map(item => item.course_id);
  } catch {
    return [];
  }
}

// ============================================================================
// 8. USER SETTINGS TABLE SYNC
// ============================================================================

export async function syncSettingsToSupabase(soundEnabled: boolean): Promise<boolean> {
  try {
    const userId = await getActiveUserId();
    const { error } = await supabase
      .from('user_settings')
      .upsert({
        user_id: userId,
        sound_enabled: soundEnabled,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' });

    if (error) {
      console.warn('[Supabase] Failed to sync settings:', error.message);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export async function fetchSettingsFromSupabase(): Promise<{ soundEnabled: boolean } | null> {
  try {
    const userId = await getActiveUserId();
    const { data, error } = await supabase
      .from('user_settings')
      .select('sound_enabled')
      .eq('user_id', userId)
      .maybeSingle();

    if (error || !data) return null;
    return { soundEnabled: Boolean(data.sound_enabled) };
  } catch {
    return null;
  }
}
