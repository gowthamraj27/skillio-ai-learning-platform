import React from 'react';
import { Volume2, VolumeX, RotateCcw, ShieldCheck } from 'lucide-react';

interface SettingsViewProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onResetAllData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  soundEnabled,
  onToggleSound,
  onResetAllData,
}) => {
  return (
    <div className="flex flex-col gap-5 pb-8 max-w-xl animate-pop-in">
      <div className="card-tactile rounded-3xl p-5">
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#302747] mb-1">
          Settings & Preferences
        </h1>
        <p className="text-xs sm:text-sm text-[#5D5473] font-medium">
          Customize your audio feedback, application storage, and preferences.
        </p>
      </div>

      <div className="card-tactile rounded-2xl p-5 space-y-4">
        {/* Audio Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#F3EDFF] text-[#7956D8]">
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </div>
            <div>
              <span className="text-sm font-extrabold text-[#302747] block">
                Sound Effects
              </span>
              <span className="text-xs text-[#5D5473]">
                Synthesized bubble pops & celebratory chimes
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onToggleSound}
            className={`px-4 py-2 text-xs font-extrabold transition-all ${
              soundEnabled
                ? 'btn-tactile-primary'
                : 'btn-tactile-secondary'
            }`}
          >
            {soundEnabled ? 'Enabled' : 'Muted'}
          </button>
        </div>

        {/* Clear Data */}
        <div className="pt-4 border-t border-[#E9DFFF] flex items-center justify-between">
          <div>
            <span className="text-sm font-extrabold text-[#302747] block">
              Reset Onboarding Data
            </span>
            <span className="text-xs text-[#5D5473]">
              Clear browser session data and start fresh
            </span>
          </div>

          <button
            type="button"
            onClick={onResetAllData}
            className="btn-tactile-orange px-4 py-2 text-xs flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Data</span>
          </button>
        </div>

        {/* Product Mission Note */}
        <div className="pt-4 border-t border-[#E9DFFF] text-[11px] text-[#5D5473] flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-[#7956D8] shrink-0 mt-0.5" />
          <span>
            SKILLIO is a career navigation companion that guides you to the highest quality external courses across Google Cloud, Kaggle, and AWS. We do not host internal video courses or paywalls.
          </span>
        </div>
      </div>
    </div>
  );
};
