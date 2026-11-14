import { useState, useEffect } from 'react';
import { OnboardingData, BlobbyExpression, VisualProp } from './types/onboarding';
import { Blobby } from './components/Blobby/Blobby';
import { SpeechBubble } from './components/Blobby/SpeechBubble';
import { ProfileImportModal } from './components/Onboarding/ProfileImportModal';
import { Step0Name } from './components/Onboarding/Step0Name';
import { Step1Education } from './components/Onboarding/Step1Education';
import { Step2Interests } from './components/Onboarding/Step2Interests';
import { Step3Skills } from './components/Onboarding/Step3Skills';
import { Step4Achievements } from './components/Onboarding/Step4Achievements';
import { Step5Ambition } from './components/Onboarding/Step5Ambition';
import { CompletionScene } from './components/Onboarding/CompletionScene';
import { DashboardLayout } from './components/Dashboard/DashboardLayout';
import { sound } from './utils/audio';
import { syncProfileToSupabase } from './services/supabaseService';
import { ArrowLeft, ArrowRight, Sparkles, FileText, RotateCcw, LayoutDashboard } from 'lucide-react';
import confetti from 'canvas-confetti';

const INITIAL_DATA: OnboardingData = {
  name: '',
  educationLevel: '',
  degreeCourse: '',
  yearOfStudy: '',
  careerInterests: [],
  skills: [],
  achievementTypes: [],
  achievementsDetail: '',
  ambition: '',
};

const STEP_SPEECHES = [
  {
    step: 1, // Mandatory Name Step
    prop: 'none' as VisualProp,
    expression: 'happy' as BlobbyExpression,
    prompt: "Hey! Before we begin, what should I call you?",
  },
  {
    step: 2, // Question 1: Education
    prop: 'graduation-cap' as VisualProp,
    expression: 'happy' as BlobbyExpression,
    prompt: "Let's start with your foundations! Where are you currently learning?",
  },
  {
    step: 3, // Question 2: Career Interests
    prop: 'floating-cards' as VisualProp,
    expression: 'curious' as BlobbyExpression,
    prompt: "Ooh, the future is vast! What kind of tech fields make your eyes light up?",
  },
  {
    step: 4, // Question 3: Existing Skills
    prop: 'toolkit' as VisualProp,
    expression: 'happy' as BlobbyExpression,
    prompt: "Every builder has a toolkit! What technologies or skills have you already practiced?",
  },
  {
    step: 5, // Question 4: Achievements
    prop: 'trophy' as VisualProp,
    expression: 'proud' as BlobbyExpression,
    prompt: "Have you built projects, hackathons or earned badges? (Feel free to skip if you're just starting!)",
  },
  {
    step: 6, // Question 5: Personal Ambition
    prop: 'glowing-orb' as VisualProp,
    expression: 'excited' as BlobbyExpression,
    prompt: "Almost there! What is the #1 milestone or dream you want to achieve next?",
  },
];

export function App() {
  const [viewMode, setViewMode] = useState<'onboarding' | 'dashboard'>('onboarding');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [data, setData] = useState<OnboardingData>(INITIAL_DATA);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Clean start on refresh: ensure no demo profile or Arjun Kumar is persisted
  useEffect(() => {
    try {
      localStorage.removeItem('skillio_onboarding');
      localStorage.removeItem('skillio_student_name');
    } catch {
      // ignore
    }
  }, []);

  // Update onboarding state strictly within the active browser session
  const handleDataChange = (updates: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }));
    setValidationError(null);
  };

  // Validation before advancing to next step
  const validateCurrentStep = (step: number): boolean => {
    if (step === 1) {
      // Mandatory First Question: Name
      if (!data.name || !data.name.trim()) {
        setValidationError('Please enter your name so Blobby knows what to call you! ✨');
        return false;
      }
    } else if (step === 2) {
      // Question 1: Education
      if (!data.educationLevel) {
        setValidationError('Please select your current education level to continue! 🎓');
        return false;
      }
    } else if (step === 3) {
      // Question 2: Career Interests
      if (!data.careerInterests || data.careerInterests.length === 0) {
        setValidationError('Pick at least one career interest (or "Still exploring")! 🚀');
        return false;
      }
    } else if (step === 4) {
      // Question 3: Existing Skills
      if (!data.skills || data.skills.length === 0) {
        setValidationError('Select at least one skill or pick "Beginner / None yet"! 🛠️');
        return false;
      }
    } else if (step === 5) {
      // Question 4: Achievements (Optional)
      return true;
    } else if (step === 6) {
      // Question 5: Personal Ambition
      if (!data.ambition || !data.ambition.trim()) {
        setValidationError('Please enter your ambition or tap one of the suggested goals! ✨');
        return false;
      }
    }
    return true;
  };

  // Forward Navigation
  const handleContinue = () => {
    if (currentStep === 0) {
      sound.playPop();
      setCurrentStep(1); // Go to Name question
      return;
    }

    if (!validateCurrentStep(currentStep)) {
      return;
    }

    sound.playPop();
    setValidationError(null);

    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else {
      // Step 6 (Question 5) completed -> Celebration scene (Step 7)!
      sound.playChime();
      confetti({
        particleCount: 100,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#7956D8', '#6542BC', '#A78BFA', '#E9DFFF', '#FFD45C', '#FF914D'],
      });
      const finalData: OnboardingData = {
        ...data,
        completedAt: new Date().toISOString(),
      };
      setData(finalData);
      syncProfileToSupabase(finalData);
      setCurrentStep(7);
    }
  };

  // Back Navigation
  const handleBack = () => {
    sound.playPop();
    setValidationError(null);
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Reset Onboarding / Start a completely fresh profile
  const handleReset = () => {
    if (window.confirm('Start over and create a fresh profile?')) {
      sound.playPop();
      setData(INITIAL_DATA);
      setCurrentStep(0);
      setViewMode('onboarding');
      setValidationError(null);
      try {
        localStorage.removeItem('skillio_onboarding');
        localStorage.removeItem('skillio_student_name');
      } catch {
        // ignore
      }
    }
  };

  const handleImportProfile = (imported: Partial<OnboardingData>) => {
    handleDataChange(imported);
    syncProfileToSupabase({ ...data, ...imported } as OnboardingData);
    sound.playPop();
    setCurrentStep(1); // Let them review/confirm name first
  };

  const handleRetakeOnboarding = () => {
    sound.playPop();
    setViewMode('onboarding');
    setCurrentStep(0);
  };

  const currentStepConfig = STEP_SPEECHES.find((s) => s.step === currentStep);

  // If in Dashboard View Mode: Render the Main Student Dashboard!
  if (viewMode === 'dashboard') {
    return (
      <DashboardLayout
        data={data}
        onRetakeOnboarding={handleRetakeOnboarding}
        onResetAllData={handleReset}
        soundEnabled={soundEnabled}
        onToggleSound={() => {
          const nxt = !soundEnabled;
          setSoundEnabled(nxt);
          sound.setEnabled(nxt);
        }}
      />
    );
  }

  // Otherwise: Render the Single-Screen Interactive Onboarding Experience
  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#FFFCF8] text-[#302747] flex flex-col font-sans selection:bg-[#FFE1D2] selection:text-[#302747] relative overflow-x-hidden">
      {/* Ambient Warm Multi-Shade Glows */}
      <div className="fixed -top-28 -right-28 w-96 h-96 rounded-full bg-[#FFE1D2]/35 blur-3xl pointer-events-none -z-10" />
      <div className="fixed top-1/3 -left-28 w-80 h-80 rounded-full bg-[#E9DFFF]/40 blur-3xl pointer-events-none -z-10" />
      <div className="fixed -bottom-28 right-1/4 w-96 h-96 rounded-full bg-[#DDF3E8]/35 blur-3xl pointer-events-none -z-10" />

      {/* TOP NAVIGATION / PROGRESS HEADER (Steps 1 to 6) */}
      {currentStep >= 1 && currentStep <= 6 && (
        <header className="sticky top-0 w-full bg-[#FFFCF8]/95 backdrop-blur-md border-b border-[#E9DFFF] py-2 sm:py-2.5 px-4 sm:px-8 z-30">
          <div className="max-w-3xl mx-auto flex flex-col gap-1.5 sm:gap-2">
            <div className="flex items-center justify-between">
              {/* Back button and Brand */}
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleBack}
                  className="p-1.5 rounded-xl border border-[#E9DFFF] bg-[#FFFFFF] text-[#302747] hover:border-[#7956D8] hover:text-[#7956D8] hover:bg-[#F3EDFF] shadow-sm active:translate-y-0.5 transition-all"
                  aria-label="Go back"
                >
                  <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                </button>

                <div className="flex items-center gap-1.5">
                  <div className="w-7 h-7 rounded-lg bg-[#7956D8] flex items-center justify-center shadow-playful-purple-sm">
                    <span className="text-white font-extrabold text-xs">S</span>
                  </div>
                  <span className="font-extrabold text-base tracking-tight text-[#302747]">
                    SKILL<span className="text-[#7956D8]">IO</span>
                  </span>
                </div>
              </div>

              {/* Progress counter pill & actions */}
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#FFFFFF] border border-[#E9DFFF] text-xs font-extrabold text-[#7956D8] shadow-sm">
                  {currentStep === 1 ? 'Meet Blobby' : `${currentStep - 1} of 5`}
                </span>

                {data.completedAt && (
                  <button
                    type="button"
                    onClick={() => setViewMode('dashboard')}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F3EDFF] border border-[#7956D8]/30 text-xs font-extrabold text-[#7956D8] hover:bg-[#7956D8] hover:text-white transition-all shadow-sm"
                    title="Go to Dashboard"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Dashboard</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setIsImportModalOpen(true)}
                  className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FFFFFF] border border-[#E9DFFF] text-xs font-bold text-[#5D5473] hover:text-[#7956D8] hover:border-[#7956D8] hover:bg-[#F3EDFF] shadow-sm transition-all"
                  title="Import from Resume or LinkedIn"
                >
                  <FileText className="w-3.5 h-3.5 text-[#7956D8]" />
                  <span>Import</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="p-1.5 rounded-lg border border-[#E9DFFF] bg-[#FFFFFF] text-[#5D5473] hover:text-[#FF914D] hover:border-[#FF914D] hover:bg-[#FFE1D2]/30 shadow-sm transition-all"
                  title="Restart onboarding / New Profile"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Rich Purple Gradient Progress Bar */}
            <div className="w-full h-2 rounded-full bg-[#E9DFFF] p-0.5 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#6542BC] via-[#7956D8] to-[#FF914D] transition-all duration-400 ease-out shadow-sm"
                style={{ width: `${Math.max(10, ((currentStep - 1) / 5) * 100)}%` }}
              />
            </div>
          </div>
        </header>
      )}

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-3 sm:py-4 flex flex-col justify-between">
        {/* ========================================================
            VIEW 0: WELCOME SCENE (Warm animated entrance & speech)
           ======================================================== */}
        {currentStep === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto py-2 animate-pop-in">
            {/* Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE1D2] border border-[#f0c3ad] text-xs font-extrabold uppercase tracking-wider text-[#FF914D] shadow-sm mb-3 sm:mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#FF914D]" />
              Meet Your Career Mascot
            </div>

            {/* Blobby with gentle entrance */}
            <div className="mb-3 sm:mb-4 animate-float">
              <Blobby expression="waving" size="hero" />
            </div>

            {/* Welcoming Speech Bubble */}
            <div className="mb-4 sm:mb-5 max-w-sm w-full">
              <SpeechBubble
                message="Hey! I’m Blobby. Ready to discover what you’re capable of?"
                soundEnabled={soundEnabled}
                onToggleSound={() => {
                  const nxt = !soundEnabled;
                  setSoundEnabled(nxt);
                  sound.setEnabled(nxt);
                }}
              />
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={handleContinue}
              className="btn-tactile-primary min-w-44 text-base py-3.5 px-8 flex items-center justify-center gap-2"
            >
              <span>Let’s Go!</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Profile Import Link */}
            <div className="mt-4 pt-3 border-t border-[#E9DFFF] w-full flex flex-col items-center">
              <span className="text-[11px] font-bold text-[#5D5473] mb-1.5">
                Already have a resume or LinkedIn?
              </span>
              <button
                type="button"
                onClick={() => setIsImportModalOpen(true)}
                className="btn-tactile-secondary py-1.5 px-3.5 text-xs flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-[#7956D8]" />
                <span>Upload Resume PDF or Paste LinkedIn</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            VIEW 1..6: QUESTIONS FLOW
            (Step 1: Mandatory Name, Steps 2..6: The 5 Core Questions)
           ======================================================== */}
        {currentStep >= 1 && currentStep <= 6 && (
          <div className="flex-1 flex flex-col justify-between gap-3 sm:gap-4 py-1 animate-pop-in">
            {/* Top Mascot + Speech Bubble Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 w-full shrink-0">
              <Blobby
                expression={currentStepConfig?.expression || 'happy'}
                visualProp={currentStepConfig?.prop || 'none'}
                size="md"
              />

              <SpeechBubble
                message={currentStepConfig?.prompt || ''}
                soundEnabled={soundEnabled}
                onToggleSound={() => {
                  const nxt = !soundEnabled;
                  setSoundEnabled(nxt);
                  sound.setEnabled(nxt);
                }}
                className="max-w-md sm:max-w-lg m-0"
              />
            </div>

            {/* Interactive Step Content */}
            <div className="flex-1 flex flex-col justify-center w-full min-h-0 py-1 pb-3">
              {currentStep === 1 && (
                <Step0Name
                  data={data}
                  onChange={handleDataChange}
                  onSubmit={handleContinue}
                />
              )}
              {currentStep === 2 && (
                <Step1Education data={data} onChange={handleDataChange} />
              )}
              {currentStep === 3 && (
                <Step2Interests data={data} onChange={handleDataChange} />
              )}
              {currentStep === 4 && (
                <Step3Skills data={data} onChange={handleDataChange} />
              )}
              {currentStep === 5 && (
                <Step4Achievements data={data} onChange={handleDataChange} />
              )}
              {currentStep === 6 && (
                <Step5Ambition
                  data={data}
                  onChange={handleDataChange}
                  onSubmit={handleContinue}
                />
              )}
            </div>

            {/* Validation Error Message */}
            {validationError && (
              <div className="p-2 rounded-xl bg-[#F3EDFF] border border-[#7956D8] text-[#7956D8] font-bold text-xs text-center shrink-0 animate-bounce">
                {validationError}
              </div>
            )}

            {/* Bottom Actions: Back and Continue Buttons (Sticky on short viewports) */}
            <div className="sticky bottom-0 z-30 bg-[#FFFCF8]/95 backdrop-blur-md pt-3 pb-3 sm:pb-4 border-t border-[#E9DFFF] w-full max-w-xl mx-auto flex items-center justify-between mt-auto">
              <button
                type="button"
                onClick={handleBack}
                className="btn-tactile-secondary px-5 py-2.5 text-xs sm:text-sm"
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleContinue}
                className="btn-tactile-primary px-7 py-2.5 sm:py-3 text-xs sm:text-sm flex items-center gap-1.5"
              >
                <span>{currentStep === 6 ? 'Finish & Celebrate' : 'Continue'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            VIEW 7: COMPLETION SCENE -> Jumps to Dashboard!
           ======================================================== */}
        {currentStep === 7 && (
          <div className="flex-1 flex flex-col items-center justify-start sm:justify-center w-full py-2">
            <CompletionScene
              data={data}
              onEditStep={(stepNum) => {
                sound.playPop();
                // Map step number back (Step 1 is Education which is currentStep 2)
                setCurrentStep(stepNum + 1);
              }}
              onExploreJourney={() => {
                sound.playChime();
                setViewMode('dashboard');
              }}
            />
          </div>
        )}
      </main>

      {/* OPTIONAL PROFILE IMPORT MODAL */}
      <ProfileImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImportComplete={handleImportProfile}
      />
    </div>
  );
}

export default App;
