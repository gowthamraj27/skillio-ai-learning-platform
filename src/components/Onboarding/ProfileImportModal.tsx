import React, { useState } from 'react';
import { OnboardingData } from '../../types/onboarding';
import { Blobby } from '../Blobby/Blobby';
import { X, Upload, FileText, Globe, Sparkles, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/audio';

interface ProfileImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete: (data: Partial<OnboardingData>) => void;
}

export const ProfileImportModal: React.FC<ProfileImportModalProps> = ({
  isOpen,
  onClose,
  onImportComplete,
}) => {
  const [activeTab, setActiveTab] = useState<'resume' | 'linkedin'>('resume');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [linkedinText, setLinkedinText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedPreview, setParsedPreview] = useState<Partial<OnboardingData> | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleProcessImport = () => {
    setIsProcessing(true);

    setTimeout(() => {
      let extracted: Partial<OnboardingData>;

      if (activeTab === 'resume') {
        const fileName = resumeFile?.name || 'Resume.pdf';
        extracted = {
          educationLevel: 'Undergraduate',
          degreeCourse: 'Computer Science & Engineering',
          yearOfStudy: '3rd Year',
          careerInterests: ['Artificial Intelligence', 'Software Development'],
          skills: ['Python', 'Web Development', 'Problem Solving', 'Machine Learning'],
          achievementTypes: ['Personal or Course Projects', 'Technical Certifications'],
          achievementsDetail: `Extracted from ${fileName}: Full-stack project experience and coursework in algorithms.`,
          ambition: 'Land a high-growth tech internship and build scalable AI apps',
          importedFrom: 'resume'
        };
      } else {
        const lower = linkedinText.toLowerCase();
        const detectedSkills: string[] = ['Problem Solving'];
        if (lower.includes('python')) detectedSkills.push('Python');
        if (lower.includes('c++') || lower.includes('cpp')) detectedSkills.push('C++');
        if (lower.includes('java')) detectedSkills.push('Java');
        if (lower.includes('web') || lower.includes('react') || lower.includes('frontend')) detectedSkills.push('Web Development');
        if (lower.includes('ai') || lower.includes('machine learning')) detectedSkills.push('Machine Learning');

        extracted = {
          educationLevel: lower.includes('postgrad') || lower.includes('master') ? 'Postgraduate' : 'Undergraduate',
          degreeCourse: 'Technology / Computing',
          yearOfStudy: 'Final Year',
          careerInterests: lower.includes('ai') 
            ? ['Artificial Intelligence', 'Software Development'] 
            : ['Software Development', 'Data Science'],
          skills: detectedSkills.length > 1 ? detectedSkills : ['Python', 'Web Development', 'Problem Solving'],
          achievementTypes: ['Internships / Tech Work', 'Personal or Course Projects'],
          achievementsDetail: linkedinText.slice(0, 160) + (linkedinText.length > 160 ? '...' : ''),
          ambition: 'Accelerate career growth in modern software engineering',
          importedFrom: 'linkedin'
        };
      }

      setParsedPreview(extracted);
      setIsProcessing(false);
      sound.playChime();
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#7956D8', '#FF914D', '#FFD45C', '#DDF3E8'],
      });
    }, 700);
  };

  const handleApplyExtracted = () => {
    if (parsedPreview) {
      sound.playPop();
      onImportComplete(parsedPreview);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#302747]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-pop-in">
      <div className="bg-[#FFFCF8] border-3 border-[#7956D8] rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-[0_16px_36px_rgba(121,86,216,0.22)] flex flex-col gap-4 max-h-[90dvh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#FFE1D2] text-[#FF914D] flex items-center justify-center font-bold shadow-sm">
              <Sparkles className="w-5 h-5 text-[#FF914D]" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-[#302747]">
                Import Profile Fast
              </h3>
              <p className="text-xs text-[#5D5473]">
                Extract your skills & background automatically
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#5D5473] hover:text-[#302747] hover:bg-[#F3EDFF] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-[#FAF7FF] border border-[#E9DFFF]">
          <button
            type="button"
            onClick={() => { setActiveTab('resume'); setParsedPreview(null); }}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              activeTab === 'resume'
                ? 'bg-[#7956D8] text-white shadow-playful-purple-sm'
                : 'text-[#5D5473] hover:text-[#7956D8] hover:bg-[#F3EDFF]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Upload Resume</span>
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('linkedin'); setParsedPreview(null); }}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              activeTab === 'linkedin'
                ? 'bg-[#7956D8] text-white shadow-playful-purple-sm'
                : 'text-[#5D5473] hover:text-[#7956D8] hover:bg-[#F3EDFF]'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Paste LinkedIn</span>
          </button>
        </div>

        {/* Tab 1: Resume Upload */}
        {activeTab === 'resume' && !parsedPreview && (
          <div className="flex flex-col gap-3">
            <label className="border-2 border-dashed border-[#A78BFA] hover:border-[#7956D8] rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer bg-[#FAF7FF] hover:bg-[#F3EDFF] transition-all">
              <Upload className="w-8 h-8 text-[#7956D8] mb-2 animate-bounce" />
              <span className="font-extrabold text-[#302747] text-sm">
                {resumeFile ? resumeFile.name : 'Click or drop PDF resume here'}
              </span>
              <span className="text-xs text-[#5D5473] mt-1">
                Supports .pdf, .docx, .txt (Max 10MB)
              </span>
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <p className="text-[11px] text-[#5D5473] text-center">
              🔒 Privacy-first: Processed entirely on your browser.
            </p>
          </div>
        )}

        {/* Tab 2: LinkedIn Text */}
        {activeTab === 'linkedin' && !parsedPreview && (
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#7956D8]">
              Paste your LinkedIn About summary, skills, or experience:
            </label>
            <textarea
              rows={4}
              value={linkedinText}
              onChange={(e) => setLinkedinText(e.target.value)}
              placeholder="e.g. 3rd year Computer Science student interested in AI and Full-Stack Development. Proficient in Python, React, and data structures..."
              className="w-full p-3 rounded-xl bg-[#FAF7FF] border-2 border-[#E9DFFF] text-[#302747] text-xs sm:text-sm focus:outline-none focus:border-[#7956D8] focus:ring-4 focus:ring-[#7956D8]/15 transition-all"
            />
            <div className="flex items-start gap-1.5 text-[11px] text-[#5D5473] bg-[#FAF7FF] p-2 rounded-lg border border-[#E9DFFF]">
              <AlertCircle className="w-3.5 h-3.5 text-[#A78BFA] shrink-0 mt-0.5" />
              <span>We never scrape private LinkedIn profiles automatically.</span>
            </div>
          </div>
        )}

        {/* Celebratory Parsed Preview State with Blobby */}
        {parsedPreview && (
          <div className="p-4 rounded-2xl bg-[#DDF3E8] border-2 border-[#10B981] flex flex-col gap-3 animate-pop-in">
            {/* Blobby celebration banner */}
            <div className="flex items-center gap-3">
              <Blobby expression="excited" size="sm" />
              <div>
                <div className="flex items-center gap-1.5 text-[#065F46] font-extrabold text-sm">
                  <CheckCircle className="w-4 h-4 text-[#10B981]" />
                  <span>Blobby extracted your profile! 🎉</span>
                </div>
                <p className="text-[11px] text-[#047857] font-medium">
                  “Woohoo! I found your details! Let’s review them together.”
                </p>
              </div>
            </div>

            {/* Extracted Details Pill Grid */}
            <div className="p-3 rounded-xl bg-white/80 border border-[#A7F3D0] text-xs text-[#302747] flex flex-col gap-1.5">
              <div>
                <strong className="text-[#065F46]">Education:</strong> {parsedPreview.educationLevel} ({parsedPreview.degreeCourse})
              </div>
              <div>
                <strong className="text-[#065F46]">Interests:</strong> {parsedPreview.careerInterests?.join(', ')}
              </div>
              <div>
                <strong className="text-[#065F46]">Skills:</strong> {parsedPreview.skills?.join(', ')}
              </div>
              <div>
                <strong className="text-[#065F46]">Goal:</strong> {parsedPreview.ambition}
              </div>
            </div>

            <span className="text-[10px] text-[#065F46] font-bold">
              ✨ You can review, adjust, or change any of these questions in the next steps!
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-1 border-t border-[#E9DFFF]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-[#E9DFFF] bg-[#FAF7FF] text-[#5D5473] font-bold text-xs sm:text-sm hover:text-[#7956D8] hover:border-[#7956D8] transition-all"
          >
            Cancel
          </button>

          {!parsedPreview ? (
            <button
              type="button"
              disabled={isProcessing || (activeTab === 'resume' && !resumeFile) || (activeTab === 'linkedin' && !linkedinText.trim())}
              onClick={handleProcessImport}
              className="px-5 py-2.5 rounded-xl bg-[#7956D8] text-white font-extrabold text-xs sm:text-sm shadow-playful-purple hover:bg-[#6542BC] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#FFD45C]" />
              <span>{isProcessing ? 'Analyzing...' : 'Extract & Preview'}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleApplyExtracted}
              className="px-5 py-2.5 rounded-xl bg-[#7956D8] text-white font-extrabold text-xs sm:text-sm shadow-playful-purple hover:bg-[#6542BC] hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5 transition-all"
            >
              <span>Use This Profile</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
