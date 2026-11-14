import React, { useState, useEffect, useRef } from 'react';
import { OnboardingData, BlobbyExpression } from '../../types/onboarding';
import { Blobby } from './Blobby';
import { DashboardTab } from '../Dashboard/Sidebar';
import { 
  Send, 
  RotateCcw, 
  AlertCircle,
  Minimize2,
  BrainCircuit,
  Compass,
  ArrowRight
} from 'lucide-react';
import { sound } from '../../utils/audio';
import { 
  sendBlobbyMessage, 
  loadConversationMessages, 
  persistChatMessage, 
  resetConversation, 
  getOrCreateConversation,
  ChatMessage 
} from '../../services/blobbyAiService';
import { getActiveUserId } from '../../services/supabaseService';

interface BlobbyCompanionWidgetProps {
  data: OnboardingData;
  activeTab: DashboardTab;
  onNavigateTab: (tab: DashboardTab) => void;
  onExploreCourse?: (url: string) => void;
  trackedXP?: number;
  trackedStreak?: number;
  completedMissions?: string[];
}

const TAB_CONTEXT_PROMPTS: Record<DashboardTab, string[]> = {
  home: [
    "What should I learn today?",
    "How is my learning streak going?",
    "Give me a quick 5-minute challenge!"
  ],
  careers: [
    "Which career path fits my skills best?",
    "What does a day in the life look like?",
    "How can I prepare for junior roles?"
  ],
  companies: [
    "What are top tech companies looking for?",
    "Which soft skills matter most?",
    "How do I prepare for technical rounds?"
  ],
  learning: [
    "Recommend a beginner course for me",
    "How do I balance theory and coding?",
    "Which platform has the best labs?"
  ],
  skills: [
    "Which skill should I level up next?",
    "How do I demonstrate skills on GitHub?",
    "Explain APIs in simple words"
  ],
  roadmap: [
    "Am I on track with my roadmap?",
    "What's the hardest stage in this path?",
    "What milestone should I tackle today?"
  ],
  projects: [
    "Give me an awesome project idea!",
    "How should I structure my GitHub README?",
    "Can you suggest a portfolio project with APIs?"
  ],
  profile: [
    "How can I improve my student passport?",
    "What achievements stand out to recruiters?",
    "Can you review my career ambition?"
  ],
  settings: [
    "Tell me about SKILLIO's mission",
    "How does Blobby help me learn?",
    "How do audio cues boost focus?"
  ]
};

export const BlobbyCompanionWidget: React.FC<BlobbyCompanionWidgetProps> = ({
  data,
  activeTab,
  onNavigateTab,
  trackedXP = 120,
  trackedStreak = 1,
  completedMissions = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState<string | null>(null);
  const [currentExpression, setCurrentExpression] = useState<BlobbyExpression>('happy');
  const [conversationId, setConversationId] = useState<string>('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const studentName = data.name || 'Learner';
  const primaryCareer = data.careerInterests?.[0] || 'Software Development';

  // Initialize conversation and history on mount
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const userId = await getActiveUserId();
        const convId = await getOrCreateConversation(userId);
        if (!isMounted) return;
        setConversationId(convId);

        const history = await loadConversationMessages(convId);
        if (!isMounted) return;

        if (history.length > 0) {
          setMessages(history);
          const lastMsg = history[history.length - 1];
          if (lastMsg.expression) {
            setCurrentExpression(lastMsg.expression);
          }
        } else {
          // Welcome message personalized with student onboarding data
          const welcomeMsg: ChatMessage = {
            id: 'welcome-init',
            role: 'assistant',
            content: `Hey ${studentName}! 💜 I'm Blobby, your AI learning companion. I see you're aiming for **${primaryCareer}** with a ${trackedStreak}-day streak and ${trackedXP} XP. Ask me anything—from debugging Python code to roadmap tips!`,
            expression: 'excited',
            suggestedAction: {
              label: `Explore ${primaryCareer} Roadmap`,
              targetTab: 'roadmap',
            },
            createdAt: new Date().toISOString(),
          };
          setMessages([welcomeMsg]);
          setCurrentExpression('excited');
          await persistChatMessage(convId, welcomeMsg);
        }
      } catch (err) {
        console.warn('[BlobbyCompanionWidget] Init conversation error:', err);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  // Auto-scroll to bottom of messages
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom('auto');
      inputRef.current?.focus();
    }
  }, [isOpen, messages, isLoading]);

  const handleToggleOpen = () => {
    sound.playPop();
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) {
      setCurrentExpression('happy');
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const rawText = textToSend !== undefined ? textToSend : inputValue;
    const text = rawText.trim();
    if (!text || isLoading) return;

    sound.playPop();
    setErrorState(null);
    setInputValue('');

    const userMessage: ChatMessage = {
      id: 'msg-' + Date.now(),
      role: 'user',
      content: text,
      createdAt: new Date().toISOString(),
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setIsLoading(true);
    setCurrentExpression('thinking');

    // Persist user message to Supabase / local cache
    if (conversationId) {
      await persistChatMessage(conversationId, userMessage);
    }

    try {
      const response = await sendBlobbyMessage({
        message: text,
        profile: data,
        progress: {
          xp: trackedXP,
          streak: trackedStreak,
          completedMissionsCount: completedMissions.length,
          completedTasksCount: 2,
        },
        history: nextMessages.map(m => ({ role: m.role, content: m.content })),
        currentSection: activeTab,
      });

      sound.playChime();
      const aiMessage: ChatMessage = {
        id: 'msg-ai-' + Date.now(),
        role: 'assistant',
        content: response.response,
        expression: response.expression,
        suggestedAction: response.suggestedAction,
        createdAt: new Date().toISOString(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setCurrentExpression(response.expression || 'happy');

      if (conversationId) {
        await persistChatMessage(conversationId, aiMessage);
      }
    } catch (err: any) {
      console.error('[BlobbyCompanionWidget] Message error:', err);
      setErrorState('Could not reach Gemini backend. Click retry or check connection.');
      setCurrentExpression('curious');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = async () => {
    if (!window.confirm('Start a fresh conversation with Blobby?')) return;
    sound.playPop();
    try {
      const userId = await getActiveUserId();
      const newConvId = await resetConversation(userId);
      setConversationId(newConvId);
      const freshWelcome: ChatMessage = {
        id: 'welcome-reset-' + Date.now(),
        role: 'assistant',
        content: `Fresh start! 🚀 How can I help your learning journey today, ${studentName}? Ask me a concept, practice question, or roadmap advice!`,
        expression: 'excited',
        createdAt: new Date().toISOString(),
      };
      setMessages([freshWelcome]);
      setCurrentExpression('excited');
      await persistChatMessage(newConvId, freshWelcome);
    } catch {
      setMessages([]);
    }
  };

  const handleActionClick = (tabName: string | null) => {
    if (!tabName) return;
    sound.playPop();
    onNavigateTab(tabName as DashboardTab);
  };

  const activeQuickPrompts = TAB_CONTEXT_PROMPTS[activeTab] || TAB_CONTEXT_PROMPTS.home;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end select-none">
      {/* 1. EXPANDED AI CHAT DIALOG */}
      {isOpen && (
        <div 
          className="w-[92vw] sm:w-[420px] max-w-[440px] h-[580px] max-h-[85vh] bg-[#FFFCF8] border-3 border-[#7956D8] rounded-3xl shadow-[0_20px_50px_rgba(121,86,216,0.30)] mb-3 flex flex-col overflow-hidden animate-pop-in"
          role="dialog"
          aria-label="Blobby AI Learning Companion"
        >
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-[#6542BC] via-[#7956D8] to-[#916FEA] text-white p-3.5 sm:p-4 flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-white/15 backdrop-blur-sm p-0.5 flex items-center justify-center border border-white/20">
                <Blobby expression={currentExpression} size="sm" className="scale-90" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-extrabold tracking-tight leading-tight">
                    Blobby AI
                  </h3>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full bg-[#10B981]/25 border border-[#10B981]/40 text-[9px] font-bold text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse"></span>
                    <span>Online</span>
                  </span>
                </div>
                <p className="text-[10px] text-white/80 font-medium leading-none mt-0.5">
                  Personal AI Learning Companion
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleResetChat}
                title="Start a new chat conversation"
                className="p-1.5 rounded-xl hover:bg-white/20 text-white/90 hover:text-white transition-colors"
                aria-label="New Chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleToggleOpen}
                title="Minimize chat"
                className="p-1.5 rounded-xl hover:bg-white/20 text-white/90 hover:text-white transition-colors"
                aria-label="Close Blobby companion"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Student Context & Progress Banner */}
          <div className="bg-[#FAF7FF] border-b border-[#E9DFFF] px-3.5 py-1.5 flex items-center justify-between text-[10px] font-bold text-[#5D5473] shrink-0">
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-[#7956D8] font-extrabold">{studentName}</span>
              <span>•</span>
              <span className="truncate max-w-[130px]">{primaryCareer}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[#FF914D]">🔥 {trackedStreak}d streak</span>
              <span className="text-[#7956D8]">⭐ {trackedXP} XP</span>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-[#E9DFFF]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-fade-in`}
              >
                {msg.role === 'assistant' ? (
                  <div className="flex items-start gap-2.5 max-w-[88%]">
                    <div className="w-7 h-7 rounded-xl bg-[#F3EDFF] border border-[#E9DFFF] flex items-center justify-center shrink-0 mt-0.5">
                      <Blobby expression={msg.expression || 'happy'} size="sm" className="scale-75" />
                    </div>
                    <div className="space-y-2">
                      <div className="p-3.5 rounded-2xl rounded-tl-sm bg-white border border-[#E9DFFF] text-xs sm:text-[13px] text-[#302747] shadow-sm leading-relaxed whitespace-pre-wrap selection:bg-[#FFE1D2]">
                        {msg.content}
                      </div>

                      {/* Interactive Suggested Action Button */}
                      {msg.suggestedAction && msg.suggestedAction.targetTab && (
                        <button
                          type="button"
                          onClick={() => handleActionClick(msg.suggestedAction?.targetTab || null)}
                          className="btn-tactile-secondary py-1.5 px-3 text-[11px] flex items-center gap-1.5 text-[#7956D8]"
                        >
                          <Compass className="w-3.5 h-3.5 text-[#FF914D]" />
                          <span>{msg.suggestedAction.label}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="max-w-[85%] p-3 rounded-2xl rounded-tr-sm bg-[#7956D8] text-white text-xs sm:text-[13px] shadow-[0_3px_0_0_#5E3DB5] leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </div>
                )}
              </div>
            ))}

            {/* AI Typing Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2.5 max-w-[85%] animate-fade-in">
                <div className="w-7 h-7 rounded-xl bg-[#F3EDFF] border border-[#E9DFFF] flex items-center justify-center shrink-0">
                  <Blobby expression="thinking" size="sm" className="scale-75" />
                </div>
                <div className="p-3 rounded-2xl rounded-tl-sm bg-white border border-[#E9DFFF] shadow-sm flex items-center gap-1.5 text-xs text-[#5D5473]">
                  <span className="font-bold text-[#7956D8]">Blobby is thinking</span>
                  <span className="inline-flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7956D8] animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7956D8] animate-bounce [animation-delay:150ms]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7956D8] animate-bounce [animation-delay:300ms]"></span>
                  </span>
                </div>
              </div>
            )}

            {/* Error Message with Retry */}
            {errorState && (
              <div className="p-3 rounded-2xl bg-[#FFE1D2]/70 border border-[#FF914D]/40 text-xs text-[#302747] flex items-center justify-between gap-2 animate-shake">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-[#FF914D] shrink-0" />
                  <span>{errorState}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
                    if (lastUserMsg) handleSendMessage(lastUserMsg.content);
                  }}
                  className="px-2.5 py-1 rounded-xl bg-white text-[11px] font-extrabold text-[#7956D8] border border-[#E9DFFF] shadow-sm hover:bg-[#F3EDFF]"
                >
                  Retry
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Context Prompt Pills */}
          <div className="px-3 pt-2 pb-1 border-t border-[#E9DFFF] bg-[#FFFCF8] shrink-0">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {activeQuickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleSendMessage(prompt)}
                  className="px-2.5 py-1 rounded-xl bg-white border border-[#E9DFFF] text-[11px] font-bold text-[#5D5473] hover:text-[#7956D8] hover:border-[#7956D8] hover:bg-[#F3EDFF] transition-all whitespace-nowrap shrink-0 disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Footer Input Area */}
          <div className="p-3 bg-white border-t border-[#E9DFFF] shrink-0">
            <div className="flex items-end gap-2 bg-[#FAF7FF] border border-[#E9DFFF] focus-within:border-[#7956D8] rounded-2xl p-1.5 transition-all">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Ask Blobby anything (Enter to send)...`}
                rows={1}
                disabled={isLoading}
                className="w-full bg-transparent text-xs sm:text-[13px] text-[#302747] placeholder-[#8F86A5] px-2 py-1.5 focus:outline-none resize-none max-h-24 min-h-[32px] leading-relaxed disabled:opacity-50"
              />
              <button
                type="button"
                disabled={!inputValue.trim() || isLoading}
                onClick={() => handleSendMessage()}
                className="w-8 h-8 rounded-xl bg-[#7956D8] text-white flex items-center justify-center shrink-0 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#6542BC] shadow-playful-purple-sm transition-all"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-between text-[10px] text-[#8F86A5] px-1 mt-1.5">
              <span>Shift + Enter for new line</span>
              <span className="flex items-center gap-1 text-[#7956D8] font-bold">
                <BrainCircuit className="w-3 h-3" />
                <span>Grounded in your learning</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 2. FLOATING MASCOT BUTTON */}
      <button
        type="button"
        onClick={handleToggleOpen}
        className="group relative flex items-center gap-2.5 p-2 sm:p-2.5 rounded-full bg-[#FFFCF8] border-2 border-[#7956D8] shadow-[0_6px_0_0_#6542BC] hover:scale-105 active:scale-95 transition-all"
        title="Chat with your Blobby learning companion"
      >
        <Blobby expression={isOpen ? 'excited' : currentExpression} size="sm" />
        <div className="hidden sm:flex flex-col text-left pr-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-extrabold text-[#302747] leading-tight">
              Blobby AI
            </span>
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
          </div>
          <span className="text-[10px] font-bold text-[#FF914D]">
            {isOpen ? 'Tap to minimize' : 'Ask Blobby ✨'}
          </span>
        </div>
      </button>
    </div>
  );
};
