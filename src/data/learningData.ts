export type CourseCategory = 
  | 'recommended' 
  | 'continue' 
  | 'beginner' 
  | 'intermediate' 
  | 'advanced' 
  | 'practice' 
  | 'certifications';

export interface VerifiedCourse {
  id: string;
  title: string;
  platform: 'Google Cloud Skills Boost' | 'AWS Skill Builder' | 'Microsoft Learn' | 'Kaggle Learn' | 'freeCodeCamp' | 'MDN Web Docs';
  platformIcon: string;
  topic: string;
  skillCategory: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  whyUseful: string;
  url: string;
  section: CourseCategory;
  careerTags: string[];
}

export const VERIFIED_COURSES: VerifiedCourse[] = [
  // SECTION: Recommended & Beginner
  {
    id: 'gcp-genai-foundations',
    title: 'Introduction to Generative AI',
    platform: 'Google Cloud Skills Boost',
    platformIcon: '☁️',
    topic: 'Generative AI & LLMs',
    skillCategory: 'Artificial Intelligence',
    difficulty: 'Beginner',
    duration: '45 mins (Micro-course)',
    whyUseful: 'Official Google Cloud course explaining foundation models, large language models, and how GenAI is applied in software systems.',
    url: 'https://www.cloudskillsboost.google/course_templates/536',
    section: 'recommended',
    careerTags: ['Artificial Intelligence', 'Data Science', 'Software Development']
  },
  {
    id: 'kaggle-python',
    title: 'Python for Data & Automation',
    platform: 'Kaggle Learn',
    platformIcon: '📊',
    topic: 'Python Programming',
    skillCategory: 'Programming Languages',
    difficulty: 'Beginner',
    duration: '5 hours (Interactive notebooks)',
    whyUseful: 'Learn clean Python syntax, loops, lists, and functions through browser-based interactive notebooks with zero software installation.',
    url: 'https://www.kaggle.com/learn/python',
    section: 'beginner',
    careerTags: ['Artificial Intelligence', 'Data Science', 'Software Development', 'Web Development']
  },
  {
    id: 'fcc-responsive-web',
    title: 'Responsive Web Design Certification',
    platform: 'freeCodeCamp',
    platformIcon: '🔥',
    topic: 'HTML5, Modern CSS & Flexbox',
    skillCategory: 'Web Development',
    difficulty: 'Beginner',
    duration: '300 hours (Comprehensive)',
    whyUseful: 'Build 5 real web projects and learn semantic HTML, CSS Grid, media queries, and accessible layout standards.',
    url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/',
    section: 'beginner',
    careerTags: ['Web Development', 'UI/UX Design', 'Software Development']
  },
  {
    id: 'aws-cloud-essentials',
    title: 'AWS Cloud Practitioner Essentials',
    platform: 'AWS Skill Builder',
    platformIcon: '🚀',
    topic: 'Cloud Computing & Infrastructure',
    skillCategory: 'Cloud Computing',
    difficulty: 'Beginner',
    duration: '6 hours',
    whyUseful: 'Official Amazon Web Services course covering computing, storage, global infrastructure, security, and cloud cost management.',
    url: 'https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials',
    section: 'recommended',
    careerTags: ['Cloud Computing', 'Software Development', 'Cybersecurity']
  },
  {
    id: 'msft-csharp-part1',
    title: 'Foundational C# with Microsoft Certification',
    platform: 'Microsoft Learn',
    platformIcon: '🪟',
    topic: 'C# & .NET Core',
    skillCategory: 'Programming Languages',
    difficulty: 'Beginner',
    duration: '35 hours',
    whyUseful: 'Developed in partnership with freeCodeCamp. Learn object-oriented concepts, syntax, and debugging to earn a verified Microsoft badge.',
    url: 'https://learn.microsoft.com/en-us/training/paths/get-started-c-sharp-part-1/',
    section: 'beginner',
    careerTags: ['Software Development', 'Web Development']
  },

  // SECTION: Intermediate Courses
  {
    id: 'kaggle-intro-ml',
    title: 'Intro to Machine Learning',
    platform: 'Kaggle Learn',
    platformIcon: '📊',
    topic: 'Scikit-Learn & Modeling',
    skillCategory: 'Artificial Intelligence',
    difficulty: 'Intermediate',
    duration: '3 hours',
    whyUseful: 'Build first prediction models using decision trees and random forests. Learn how to handle missing data and evaluate model accuracy.',
    url: 'https://www.kaggle.com/learn/intro-to-machine-learning',
    section: 'intermediate',
    careerTags: ['Artificial Intelligence', 'Data Science']
  },
  {
    id: 'mdn-javascript-deep',
    title: 'JavaScript First Steps & Async Programming',
    platform: 'MDN Web Docs',
    platformIcon: '📖',
    topic: 'JavaScript (ES6+) & DOM',
    skillCategory: 'Web Development',
    difficulty: 'Intermediate',
    duration: '15 hours',
    whyUseful: 'The gold standard web documentation for asynchronous JavaScript, Promises, Fetch API, and browser APIs.',
    url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting',
    section: 'intermediate',
    careerTags: ['Web Development', 'Software Development', 'Mobile App Development']
  },
  {
    id: 'gcp-cloud-foundations',
    title: 'Google Cloud Computing Foundations',
    platform: 'Google Cloud Skills Boost',
    platformIcon: '☁️',
    topic: 'Cloud Infrastructure & Networking',
    skillCategory: 'Cloud Computing',
    difficulty: 'Intermediate',
    duration: '8 hours',
    whyUseful: 'Hands-on Qwiklabs environments provisioning real Compute Engine VMs, Cloud Storage buckets, and VPC networks.',
    url: 'https://www.cloudskillsboost.google/course_templates/153',
    section: 'intermediate',
    careerTags: ['Cloud Computing', 'Cybersecurity', 'Software Development']
  },

  // SECTION: Advanced Learning & Systems
  {
    id: 'fcc-scientific-computing',
    title: 'Scientific Computing with Python',
    platform: 'freeCodeCamp',
    platformIcon: '🔥',
    topic: 'Algorithms & Data Structures',
    skillCategory: 'Computer Science Fundamentals',
    difficulty: 'Advanced',
    duration: '300 hours',
    whyUseful: 'Master recursion, time complexity, binary search trees, and algorithm design required by top tech company interviews.',
    url: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/',
    section: 'advanced',
    careerTags: ['Software Development', 'Artificial Intelligence', 'Data Science']
  },
  {
    id: 'kaggle-deep-learning',
    title: 'Deep Learning & Neural Networks',
    platform: 'Kaggle Learn',
    platformIcon: '📊',
    topic: 'TensorFlow & Keras',
    skillCategory: 'Artificial Intelligence',
    difficulty: 'Advanced',
    duration: '4 hours',
    whyUseful: 'Understand dense layers, convolutional networks (CNNs), activation functions, dropout, and stochastic gradient descent.',
    url: 'https://www.kaggle.com/learn/intro-to-deep-learning',
    section: 'advanced',
    careerTags: ['Artificial Intelligence', 'Robotics & Automation']
  },
  {
    id: 'msft-azure-arch',
    title: 'Architect Modern Cloud Solutions in Azure',
    platform: 'Microsoft Learn',
    platformIcon: '🪟',
    topic: 'Cloud Architecture & Resilience',
    skillCategory: 'Cloud Computing',
    difficulty: 'Advanced',
    duration: '10 hours',
    whyUseful: 'Learn high-availability multi-region design, zero-trust security postures, and cost optimization for enterprise applications.',
    url: 'https://learn.microsoft.com/en-us/training/paths/architect-great-solutions-in-azure/',
    section: 'advanced',
    careerTags: ['Cloud Computing', 'Cybersecurity', 'Software Development']
  },

  // SECTION: Practice & Challenges
  {
    id: 'kaggle-sql-practice',
    title: 'Advanced SQL & Data Warehousing',
    platform: 'Kaggle Learn',
    platformIcon: '📊',
    topic: 'SQL Window Functions & Joins',
    skillCategory: 'Databases',
    difficulty: 'Intermediate',
    duration: '4 hours',
    whyUseful: 'Query BigQuery datasets in real-time, master analytical window functions, GROUP BY HAVING, and nested queries.',
    url: 'https://www.kaggle.com/learn/advanced-sql',
    section: 'practice',
    careerTags: ['Data Science', 'Software Development', 'Web Development']
  },
  {
    id: 'fcc-coding-interview',
    title: 'Coding Interview Prep & Rosetta Code',
    platform: 'freeCodeCamp',
    platformIcon: '🔥',
    topic: 'Interview Problem Solving',
    skillCategory: 'Computer Science Fundamentals',
    difficulty: 'Intermediate',
    duration: 'Self-paced',
    whyUseful: 'Hundreds of real-world algorithm challenges covering sorting, search, graphs, dynamic programming, and project Euler math.',
    url: 'https://www.freecodecamp.org/learn/coding-interview-prep/',
    section: 'practice',
    careerTags: ['Software Development', 'Web Development', 'Mobile App Development']
  },

  // SECTION: Certifications & Structured Learning Paths
  {
    id: 'msft-az900-cert',
    title: 'Microsoft Certified: Azure Fundamentals (AZ-900)',
    platform: 'Microsoft Learn',
    platformIcon: '🪟',
    topic: 'Official Cloud Certification Path',
    skillCategory: 'Cloud Computing',
    difficulty: 'Beginner',
    duration: 'Official Learning Path',
    whyUseful: 'Free official preparation modules for the globally recognized AZ-900 industry credential.',
    url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/',
    section: 'certifications',
    careerTags: ['Cloud Computing', 'Software Development', 'Cybersecurity']
  },
  {
    id: 'gcp-ace-prep',
    title: 'Google Associate Cloud Engineer Learning Path',
    platform: 'Google Cloud Skills Boost',
    platformIcon: '☁️',
    topic: 'GCP Production Administration',
    skillCategory: 'Cloud Computing',
    difficulty: 'Intermediate',
    duration: 'Comprehensive Path',
    whyUseful: 'Deploy applications, monitor operations, and manage enterprise security access on Google Cloud.',
    url: 'https://www.cloudskillsboost.google/journeys/11',
    section: 'certifications',
    careerTags: ['Cloud Computing', 'Software Development']
  }
];

export function getFilteredCourses(
  courses: VerifiedCourse[],
  filters: {
    search?: string;
    platform?: string;
    difficulty?: string;
    category?: CourseCategory | 'all';
    careerGoal?: string;
  }
): VerifiedCourse[] {
  return courses.filter(course => {
    if (filters.category && filters.category !== 'all' && course.section !== filters.category) {
      return false;
    }
    if (filters.platform && filters.platform !== 'all' && course.platform !== filters.platform) {
      return false;
    }
    if (filters.difficulty && filters.difficulty !== 'all' && course.difficulty !== filters.difficulty) {
      return false;
    }
    if (filters.careerGoal && filters.careerGoal !== 'all') {
      const matchesCareer = course.careerTags.some(tag => 
        tag.toLowerCase().includes(filters.careerGoal!.toLowerCase()) ||
        filters.careerGoal!.toLowerCase().includes(tag.toLowerCase())
      );
      if (!matchesCareer) return false;
    }
    if (filters.search && filters.search.trim()) {
      const q = filters.search.toLowerCase();
      const inTitle = course.title.toLowerCase().includes(q);
      const inTopic = course.topic.toLowerCase().includes(q);
      const inSkill = course.skillCategory.toLowerCase().includes(q);
      if (!inTitle && !inTopic && !inSkill) return false;
    }
    return true;
  });
}
