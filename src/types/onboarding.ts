export type BlobbyExpression = 
  | 'idle'
  | 'happy'
  | 'waving'
  | 'thinking'
  | 'curious'
  | 'excited'
  | 'proud'
  | 'celebrating';

export type VisualProp = 
  | 'none'
  | 'graduation-cap'
  | 'floating-cards'
  | 'toolkit'
  | 'trophy'
  | 'glowing-orb';

export interface OnboardingData {
  // First Mandatory Question: Name
  name: string;

  // Step 1: Education
  educationLevel: string; // 'School student' | 'Undergraduate' | 'Postgraduate' | 'Working professional'
  degreeCourse?: string;
  yearOfStudy?: string;

  // Step 2: Career Interests
  careerInterests: string[];

  // Step 3: Existing Skills
  skills: string[];

  // Step 4: Achievements (Optional)
  achievementTypes: string[];
  achievementsDetail?: string;

  // Step 5: Personal Ambition
  ambition: string;

  // Metadata
  completedAt?: string;
  importedFrom?: 'resume' | 'linkedin' | null;
}

export interface StepConfig {
  stepNumber: number;
  totalSteps: number;
  title: string;
  speechPrompt: string;
  blobbyExpression: BlobbyExpression;
  visualProp: VisualProp;
}
