import { supabase } from '../lib/supabase';
import { OnboardingData, BlobbyExpression } from '../types/onboarding';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  expression?: BlobbyExpression;
  suggestedAction?: {
    label: string;
    targetTab: string | null;
  } | null;
  createdAt: string;
}

export interface BlobbyChatRequest {
  message: string;
  profile?: OnboardingData;
  progress?: {
    xp?: number;
    streak?: number;
    completedMissionsCount?: number;
    completedTasksCount?: number;
    savedCoursesCount?: number;
  };
  history?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  currentSection?: string;
}

export interface BlobbyChatResponse {
  response: string;
  expression: BlobbyExpression;
  suggestedAction?: {
    label: string;
    targetTab: string | null;
  } | null;
  isFallback?: boolean;
}

const LOCAL_STORAGE_CONVERSATION_KEY = 'skillio_blobby_active_conversation_id';
const LOCAL_STORAGE_MESSAGES_KEY_PREFIX = 'skillio_blobby_msgs_';

/**
 * Sends student message and learning context to the Supabase Edge Function 'blobby-chat'
 * which securely invokes Google Gemini API.
 */
export async function sendBlobbyMessage(request: BlobbyChatRequest): Promise<BlobbyChatResponse> {
  try {
    const { data, error } = await supabase.functions.invoke('blobby-chat', {
      body: {
        message: request.message,
        profile: {
          name: request.profile?.name,
          educationLevel: request.profile?.educationLevel,
          degreeCourse: request.profile?.degreeCourse,
          yearOfStudy: request.profile?.yearOfStudy,
          careerInterests: request.profile?.careerInterests,
          skills: request.profile?.skills,
          ambition: request.profile?.ambition,
        },
        progress: request.progress,
        history: request.history || [],
        currentSection: request.currentSection || 'home',
      },
    });

    if (error) {
      console.warn('[BlobbyAiService] Edge Function error:', error);
      // Check if function is not found on remote Supabase instance
      if (error.message?.includes('404') || (error as any).status === 404 || error.message?.includes('FunctionsFetchError') || error.message?.includes('not found')) {
        return {
          response: `Hi ${request.profile?.name || 'there'}! 💜 I'm Blobby, your AI companion. I'm connected to your profile and progress! To activate full Gemini intelligence, please deploy the \`blobby-chat\` Edge Function in your Supabase project with your GEMINI_API_KEY. Until then, you can ask me about your roadmap, missions, and skill growth anytime! ✨`,
          expression: 'curious',
          suggestedAction: {
            label: 'View Learning Roadmap',
            targetTab: 'roadmap',
          },
          isFallback: true,
        };
      }
      throw error;
    }

    if (data && typeof data.response === 'string') {
      return {
        response: data.response,
        expression: (data.expression as BlobbyExpression) || 'happy',
        suggestedAction: data.suggestedAction || null,
      };
    }

    throw new Error('Invalid response structure received from Blobby AI backend.');
  } catch (err: any) {
    console.error('[BlobbyAiService] Failed to send message:', err);
    throw err;
  }
}

/**
 * Get or create an active conversation ID for the student
 */
export async function getOrCreateConversation(userId: string): Promise<string> {
  const localId = localStorage.getItem(LOCAL_STORAGE_CONVERSATION_KEY);
  if (localId) return localId;

  try {
    const { data, error } = await supabase
      .from('blobby_conversations')
      .select('id')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!error && data?.id) {
      localStorage.setItem(LOCAL_STORAGE_CONVERSATION_KEY, data.id);
      return data.id;
    }

    // Create a new conversation row
    const { data: newConv, error: createErr } = await supabase
      .from('blobby_conversations')
      .insert({
        user_id: userId,
        title: 'Learning with Blobby',
      })
      .select('id')
      .single();

    if (!createErr && newConv?.id) {
      localStorage.setItem(LOCAL_STORAGE_CONVERSATION_KEY, newConv.id);
      return newConv.id;
    }
  } catch {
    // Supabase table not created yet, proceed with local fallback
  }

  const fallbackId = 'conv-' + Date.now();
  localStorage.setItem(LOCAL_STORAGE_CONVERSATION_KEY, fallbackId);
  return fallbackId;
}

/**
 * Fetch messages for the given conversation ID (cloud first with local storage sync)
 */
export async function loadConversationMessages(conversationId: string): Promise<ChatMessage[]> {
  try {
    const { data, error } = await supabase
      .from('blobby_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (!error && data && data.length > 0) {
      const messages: ChatMessage[] = data.map(m => ({
        id: m.id,
        role: m.role as 'user' | 'assistant',
        content: m.content,
        expression: m.expression as BlobbyExpression,
        suggestedAction: m.suggested_action,
        createdAt: m.created_at,
      }));
      // Sync local cache
      localStorage.setItem(
        LOCAL_STORAGE_MESSAGES_KEY_PREFIX + conversationId,
        JSON.stringify(messages)
      );
      return messages;
    }
  } catch {
    // Proceed to local cache
  }

  const cached = localStorage.getItem(LOCAL_STORAGE_MESSAGES_KEY_PREFIX + conversationId);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      return [];
    }
  }
  return [];
}

/**
 * Persist a new message into Supabase and local cache
 */
export async function persistChatMessage(
  conversationId: string,
  message: ChatMessage
): Promise<void> {
  // Update local cache immediately
  const cacheKey = LOCAL_STORAGE_MESSAGES_KEY_PREFIX + conversationId;
  const existingStr = localStorage.getItem(cacheKey);
  const existing: ChatMessage[] = existingStr ? JSON.parse(existingStr) : [];
  existing.push(message);
  localStorage.setItem(cacheKey, JSON.stringify(existing));

  // Sync to Supabase
  try {
    await supabase.from('blobby_messages').insert({
      id: message.id.startsWith('msg-') ? undefined : message.id,
      conversation_id: conversationId,
      role: message.role,
      content: message.content,
      expression: message.expression || 'happy',
      suggested_action: message.suggestedAction || null,
      created_at: message.createdAt,
    });

    await supabase
      .from('blobby_conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', conversationId);
  } catch {
    // Non-fatal if table not yet migrated
  }
}

/**
 * Start a brand new conversation
 */
export async function resetConversation(userId: string): Promise<string> {
  const newId = 'conv-' + Date.now();
  localStorage.setItem(LOCAL_STORAGE_CONVERSATION_KEY, newId);
  localStorage.removeItem(LOCAL_STORAGE_MESSAGES_KEY_PREFIX + newId);

  try {
    const { data } = await supabase
      .from('blobby_conversations')
      .insert({
        user_id: userId,
        title: 'Fresh Learning Session',
      })
      .select('id')
      .single();

    if (data?.id) {
      localStorage.setItem(LOCAL_STORAGE_CONVERSATION_KEY, data.id);
      return data.id;
    }
  } catch {
    // Fallback ID works cleanly
  }

  return newId;
}

/**
 * Fetch remembered student preferences or learning goals
 */
export async function fetchStudentMemory(userId: string): Promise<Record<string, string>> {
  try {
    const { data, error } = await supabase
      .from('blobby_memory')
      .select('memory_type, memory_content')
      .eq('user_id', userId);

    if (!error && data) {
      const memoryMap: Record<string, string> = {};
      data.forEach(item => {
        memoryMap[item.memory_type] = item.memory_content;
      });
      return memoryMap;
    }
  } catch {
    // Proceed to fallback
  }

  const localMem = localStorage.getItem('skillio_blobby_memory_' + userId);
  return localMem ? JSON.parse(localMem) : {};
}

/**
 * Persist a learned memory key/value for the student
 */
export async function saveStudentMemory(
  userId: string,
  memoryType: string,
  memoryContent: string
): Promise<boolean> {
  const localKey = 'skillio_blobby_memory_' + userId;
  const current = localStorage.getItem(localKey);
  const map: Record<string, string> = current ? JSON.parse(current) : {};
  map[memoryType] = memoryContent;
  localStorage.setItem(localKey, JSON.stringify(map));

  try {
    const { error } = await supabase
      .from('blobby_memory')
      .upsert({
        user_id: userId,
        memory_type: memoryType,
        memory_content: memoryContent,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id,memory_type' });

    return !error;
  } catch {
    return false;
  }
}
