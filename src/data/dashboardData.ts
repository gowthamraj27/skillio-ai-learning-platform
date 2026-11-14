import { OnboardingData } from '../types/onboarding';

export interface RecommendedResource {
  id: string;
  platform: string;
  badgeColor: string;
  icon: string;
  topic: string;
  whyUseful: string;
  estimatedTime: string;
  url: string;
}

export interface LearningMission {
  title: string;
  description: string;
  topic: string;
  timeMinutes: number;
  skillImprovement: string;
  xpReward: number;
  url: string;
}

export function getPersonalizedMission(data: Partial<OnboardingData>): LearningMission {
  const interests = data.careerInterests || [];

  if (interests.some(i => i.toLowerCase().includes('ai') || i.toLowerCase().includes('data'))) {
    return {
      title: 'Master Python Functions & Lambdas',
      description: 'Understand how functions work and practise writing clean, reusable code for data pipelines.',
      topic: 'Python Foundations',
      timeMinutes: 20,
      skillImprovement: '+15 Skill Points in Python / Functions',
      xpReward: 50,
      url: 'https://www.kaggle.com/learn/python'
    };
  }

  if (interests.some(i => i.toLowerCase().includes('design'))) {
    return {
      title: 'Design Systems & Auto-Layout in Practice',
      description: 'Learn modern UI component tokens, spacing scales, and reusable auto-layout frames.',
      topic: 'UI/UX & Product Design',
      timeMinutes: 25,
      skillImprovement: '+20 Skill Points in Design Systems',
      xpReward: 50,
      url: 'https://www.figma.com/resource-library/'
    };
  }

  if (interests.some(i => i.toLowerCase().includes('cybersecurity'))) {
    return {
      title: 'OWASP Top 10 Security Fundamentals',
      description: 'Explore the most critical web application security risks and how to write defensive code.',
      topic: 'Application Security',
      timeMinutes: 20,
      skillImprovement: '+15 Skill Points in App Defense',
      xpReward: 50,
      url: 'https://owasp.org/www-project-top-ten/'
    };
  }

  // Default Full-Stack / Software Dev mission
  return {
    title: 'Master Modern Web API Integration',
    description: 'Learn how to fetch, handle errors, and render real-time REST API data with clean code.',
    topic: 'Software Development',
    timeMinutes: 20,
    skillImprovement: '+15 Skill Points in REST & APIs',
    xpReward: 50,
    url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Introduction'
  };
}

export function getRecommendedResources(data: Partial<OnboardingData>): RecommendedResource[] {
  const interests = data.careerInterests || [];
  const isAI = interests.some(i => i.toLowerCase().includes('ai') || i.toLowerCase().includes('data'));

  return [
    {
      id: 'gcp-genai',
      platform: 'Google Cloud Skills Boost',
      badgeColor: '#4285F4',
      icon: '☁️',
      topic: isAI ? 'Introduction to Generative AI' : 'Google Cloud Computing Foundations',
      whyUseful: isAI 
        ? 'Learn foundation models, large language models, and responsible AI principles from Google.'
        : 'Understand cloud services, containers, and serverless computing on modern cloud infrastructure.',
      estimatedTime: '1.5 hours',
      url: 'https://www.cloudskillsboost.google/course_templates/536'
    },
    {
      id: 'kaggle-ml',
      platform: 'Kaggle Learn',
      badgeColor: '#20BEFF',
      icon: '📊',
      topic: isAI ? 'Intro to Machine Learning' : 'Python for High-Performance Coding',
      whyUseful: 'Practical micro-courses with interactive in-browser notebooks. No setup required.',
      estimatedTime: '3 hours',
      url: 'https://www.kaggle.com/learn'
    },
    {
      id: 'aws-builder',
      platform: 'AWS Skill Builder',
      badgeColor: '#FF9900',
      icon: '🚀',
      topic: 'Cloud Practitioner Essentials & Architecture',
      whyUseful: 'Understand real-world production architectures, cloud security, and distributed systems.',
      estimatedTime: '2 hours',
      url: 'https://explore.skillbuilder.aws/'
    }
  ];
}
