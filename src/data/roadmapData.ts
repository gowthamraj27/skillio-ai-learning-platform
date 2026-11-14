export interface RoadmapTask {
  id: string;
  title: string;
  description: string;
  estimatedHours: number;
  xpReward: number;
  recommendedResourceTitle: string;
  recommendedResourceUrl: string;
  isCompleted?: boolean;
}

export interface RoadmapStage {
  id: string;
  stageNumber: number;
  title: string;
  subtitle: string;
  icon: string;
  tasks: RoadmapTask[];
}

export function getRoadmapForCareer(careerGoal: string): RoadmapStage[] {
  const isAI = careerGoal.toLowerCase().includes('ai') || careerGoal.toLowerCase().includes('data');

  if (isAI) {
    return [
      {
        id: 'stage-1',
        stageNumber: 1,
        title: 'Python & Programming Foundations',
        subtitle: 'Master the primary language of data and machine intelligence',
        icon: '🐍',
        tasks: [
          {
            id: 'task-py-vars',
            title: 'Variables, Data Types & Control Flow',
            description: 'Learn variables, booleans, conditionals, while loops, and for loops in Python.',
            estimatedHours: 4,
            xpReward: 30,
            recommendedResourceTitle: 'Kaggle Learn: Python Course (Booleans & Conditions)',
            recommendedResourceUrl: 'https://www.kaggle.com/learn/python'
          },
          {
            id: 'task-py-func',
            title: 'Functions, Scoping & Lambdas',
            description: 'Write modular Python functions with type hints, default arguments, and lambda functions.',
            estimatedHours: 5,
            xpReward: 40,
            recommendedResourceTitle: 'Kaggle Learn: Python Functions Tutorial',
            recommendedResourceUrl: 'https://www.kaggle.com/learn/python'
          },
          {
            id: 'task-py-ds',
            title: 'Python Collections: Lists, Tuples & Dicts',
            description: 'Understand list comprehensions, dictionary lookups, and set operations for efficient data handling.',
            estimatedHours: 6,
            xpReward: 45,
            recommendedResourceTitle: 'freeCodeCamp Python Scientific Computing',
            recommendedResourceUrl: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/'
          }
        ]
      },
      {
        id: 'stage-2',
        stageNumber: 2,
        title: 'Mathematics & Exploratory Data Analysis',
        subtitle: 'Vector math, statistics, and manipulation with NumPy & Pandas',
        icon: '📐',
        tasks: [
          {
            id: 'task-math-stats',
            title: 'Descriptive Statistics & Probability Basics',
            description: 'Understand mean, variance, standard deviation, normal distributions, and correlation.',
            estimatedHours: 8,
            xpReward: 50,
            recommendedResourceTitle: 'Khan Academy / Kaggle Data Exploration',
            recommendedResourceUrl: 'https://www.kaggle.com/learn'
          },
          {
            id: 'task-numpy-arrays',
            title: 'NumPy: Multi-Dimensional Arrays & Broadcasting',
            description: 'Perform vectorized matrix operations, dot products, and slicing without slow loops.',
            estimatedHours: 6,
            xpReward: 40,
            recommendedResourceTitle: 'Kaggle Learn: Data Cleaning with NumPy',
            recommendedResourceUrl: 'https://www.kaggle.com/learn'
          },
          {
            id: 'task-pandas-wrangling',
            title: 'Pandas: DataFrames, GroupBy & Filtering',
            description: 'Load CSVs, inspect tabular schemas, handle missing values, and calculate grouped aggregations.',
            estimatedHours: 8,
            xpReward: 55,
            recommendedResourceTitle: 'Kaggle Learn: Pandas Micro-course',
            recommendedResourceUrl: 'https://www.kaggle.com/learn/pandas'
          }
        ]
      },
      {
        id: 'stage-3',
        stageNumber: 3,
        title: 'Classical Machine Learning',
        subtitle: 'Supervised & unsupervised models with Scikit-Learn',
        icon: '🤖',
        tasks: [
          {
            id: 'task-ml-supervised',
            title: 'Supervised Learning: Regressors & Classifiers',
            description: 'Train Linear Regression, Logistic Regression, Decision Trees, and Random Forests on structured data.',
            estimatedHours: 10,
            xpReward: 60,
            recommendedResourceTitle: 'Kaggle Learn: Intro to Machine Learning',
            recommendedResourceUrl: 'https://www.kaggle.com/learn/intro-to-machine-learning'
          },
          {
            id: 'task-ml-eval',
            title: 'Model Validation, Bias-Variance & Metrics',
            description: 'Evaluate models using train-test splits, K-Fold cross-validation, precision, recall, and ROC-AUC.',
            estimatedHours: 7,
            xpReward: 50,
            recommendedResourceTitle: 'Kaggle Learn: Intermediate Machine Learning',
            recommendedResourceUrl: 'https://www.kaggle.com/learn/intermediate-machine-learning'
          }
        ]
      },
      {
        id: 'stage-4',
        stageNumber: 4,
        title: 'Applied Projects & GitHub Portfolio',
        subtitle: 'Build predictive applications and publish reproducible code',
        icon: '💼',
        tasks: [
          {
            id: 'task-proj-tabular',
            title: 'End-to-End Prediction Project on GitHub',
            description: 'Develop an end-to-end ML project predicting housing prices or customer churn with README and notebooks.',
            estimatedHours: 14,
            xpReward: 80,
            recommendedResourceTitle: 'GitHub Student Developer Guide',
            recommendedResourceUrl: 'https://opensource.guide/'
          },
          {
            id: 'task-proj-api',
            title: 'Package Model into a FastAPI Web Service',
            description: 'Expose a POST /predict API endpoint that accepts JSON inputs and outputs model inferences in milliseconds.',
            estimatedHours: 8,
            xpReward: 60,
            recommendedResourceTitle: 'FastAPI Official Interactive Tutorial',
            recommendedResourceUrl: 'https://fastapi.tiangolo.com/tutorial/'
          }
        ]
      },
      {
        id: 'stage-5',
        stageNumber: 5,
        title: 'Advanced AI & Production Engineering',
        subtitle: 'Deep Learning, LLMs, and Cloud Deployment',
        icon: '⚡',
        tasks: [
          {
            id: 'task-deep-learning',
            title: 'Deep Learning with PyTorch or TensorFlow',
            description: 'Build neural networks with dense layers, dropout, backpropagation, and loss optimizers.',
            estimatedHours: 16,
            xpReward: 90,
            recommendedResourceTitle: 'Kaggle Learn: Intro to Deep Learning',
            recommendedResourceUrl: 'https://www.kaggle.com/learn/intro-to-deep-learning'
          },
          {
            id: 'task-genai-apis',
            title: 'Generative AI & LLM Prompt Engineering',
            description: 'Integrate pre-trained foundation models for summarization, semantic search, and chat interfaces.',
            estimatedHours: 10,
            xpReward: 75,
            recommendedResourceTitle: 'Google Cloud Skills Boost: GenAI Learning Path',
            recommendedResourceUrl: 'https://www.cloudskillsboost.google/course_templates/536'
          }
        ]
      },
      {
        id: 'stage-6',
        stageNumber: 6,
        title: 'Career Ready: Portfolio & Technical Interviews',
        subtitle: 'Showcase projects, polish GitHub, and practice coding challenges',
        icon: '🎓',
        tasks: [
          {
            id: 'task-interview-prep',
            title: 'Data Structures & ML Behavioral Practice',
            description: 'Practice explaining machine learning assumptions, trade-offs, and algorithm complexities.',
            estimatedHours: 12,
            xpReward: 100,
            recommendedResourceTitle: 'freeCodeCamp Interview Prep',
            recommendedResourceUrl: 'https://www.freecodecamp.org/learn/coding-interview-prep/'
          }
        ]
      }
    ];
  }

  // General Software / Web Development Roadmap
  return [
    {
      id: 'stage-1',
      stageNumber: 1,
      title: 'Programming Foundations & Algorithms',
      subtitle: 'Build strong syntax, problem-solving, and computer logic',
      icon: '💻',
      tasks: [
        {
          id: 'task-cs-syntax',
          title: 'Core Language Syntax & Control Flow',
          description: 'Master variables, conditionals, loops, functions, and error handling in Python, JavaScript, or Java.',
          estimatedHours: 6,
          xpReward: 30,
          recommendedResourceTitle: 'freeCodeCamp JavaScript Algorithms',
          recommendedResourceUrl: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/'
        },
        {
          id: 'task-cs-ds',
          title: 'Essential Data Structures (Arrays & HashMaps)',
          description: 'Implement arrays, string manipulation, hash maps, and stacks with algorithmic efficiency analysis.',
          estimatedHours: 8,
          xpReward: 45,
          recommendedResourceTitle: 'freeCodeCamp Rosetta Code Challenges',
          recommendedResourceUrl: 'https://www.freecodecamp.org/learn/coding-interview-prep/'
        }
      ]
    },
    {
      id: 'stage-2',
      stageNumber: 2,
      title: 'Modern Web & API Engineering',
      subtitle: 'Responsive frontend interfaces and RESTful backend APIs',
      icon: '🌐',
      tasks: [
        {
          id: 'task-web-html-css',
          title: 'Responsive Semantic Layouts (Flexbox & Grid)',
          description: 'Create mobile-friendly, accessible user interfaces following WCAG accessibility guidelines.',
          estimatedHours: 10,
          xpReward: 50,
          recommendedResourceTitle: 'freeCodeCamp Responsive Web Design',
          recommendedResourceUrl: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/'
        },
        {
          id: 'task-web-react',
          title: 'Component Architecture with React & Hooks',
          description: 'Build stateful UIs, handle side-effects, manage props, and organize modular component hierarchies.',
          estimatedHours: 14,
          xpReward: 65,
          recommendedResourceTitle: 'freeCodeCamp Frontend Development Libraries',
          recommendedResourceUrl: 'https://www.freecodecamp.org/learn/front-end-development-libraries/'
        },
        {
          id: 'task-web-apis',
          title: 'RESTful Backend APIs & Database Storage',
          description: 'Build server endpoints in Node.js/Express or Python FastAPI connected to a PostgreSQL database.',
          estimatedHours: 12,
          xpReward: 60,
          recommendedResourceTitle: 'MDN Server-Side Web Development',
          recommendedResourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Introduction'
        }
      ]
    },
    {
      id: 'stage-3',
      stageNumber: 3,
      title: 'Databases & Relational Architecture',
      subtitle: 'Designing normalized schemas, indexes, and queries',
      icon: '🗄️',
      tasks: [
        {
          id: 'task-db-sql',
          title: 'Relational Database Queries & Joins',
          description: 'Write multi-table INNER/LEFT joins, subqueries, aggregations, and transaction rollbacks.',
          estimatedHours: 8,
          xpReward: 50,
          recommendedResourceTitle: 'Kaggle Learn: Intro to SQL',
          recommendedResourceUrl: 'https://www.kaggle.com/learn/intro-to-sql'
        }
      ]
    },
    {
      id: 'stage-4',
      stageNumber: 4,
      title: 'Full-Stack Portfolio Projects',
      subtitle: 'Deploy real applications to GitHub with CI/CD',
      icon: '🚀',
      tasks: [
        {
          id: 'task-proj-fullstack',
          title: 'Complete SaaS or Product Web App',
          description: 'Build a full-stack project with authentication, database CRUD, clean responsive styling, and GitHub CI.',
          estimatedHours: 18,
          xpReward: 90,
          recommendedResourceTitle: 'GitHub Open Source & Deployment Guides',
          recommendedResourceUrl: 'https://opensource.guide/'
        }
      ]
    },
    {
      id: 'stage-5',
      stageNumber: 5,
      title: 'Cloud Deployment & DevOps',
      subtitle: 'Docker containers, cloud hosting, and scalability',
      icon: '☁️',
      tasks: [
        {
          id: 'task-cloud-docker',
          title: 'Docker Containerization & Cloud Deployment',
          description: 'Write Dockerfiles, run multi-container docker-compose setups, and deploy to AWS or Google Cloud.',
          estimatedHours: 10,
          xpReward: 70,
          recommendedResourceTitle: 'AWS Skill Builder: Cloud Practitioner Essentials',
          recommendedResourceUrl: 'https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials'
        }
      ]
    },
    {
      id: 'stage-6',
      stageNumber: 6,
      title: 'Career Ready: Technical Interviews & Resume',
      subtitle: 'Showcase verified projects, code reviews, and mock interviews',
      icon: '🎯',
      tasks: [
        {
          id: 'task-interview-tech',
          title: 'Mock Coding Interviews & System Design Basics',
          description: 'Practice live problem-solving, explaining architectural trade-offs, and behavioral STAR stories.',
          estimatedHours: 12,
          xpReward: 100,
          recommendedResourceTitle: 'freeCodeCamp Interview Prep',
          recommendedResourceUrl: 'https://www.freecodecamp.org/learn/coding-interview-prep/'
        }
      ]
    }
  ];
}
