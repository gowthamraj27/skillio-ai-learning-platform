export interface RoleSkillCategory {
  category: 'core' | 'languages' | 'frameworks' | 'databases' | 'cloud' | 'fundamentals' | 'softSkills';
  categoryLabel: string;
  skills: {
    name: string;
    type: 'required' | 'preferred';
  }[];
}

export interface CompanyRole {
  id: string;
  title: string;
  level: string;
  summary: string;
  skillCategories: RoleSkillCategory[];
  preparationRoadmap: {
    step: number;
    title: string;
    action: string;
    resourceName: string;
    resourceUrl: string;
  }[];
}

export interface CompanyInfo {
  id: string;
  name: string;
  logo: string;
  industry: string;
  headquarters: string;
  about: string;
  techFocus: string[];
  careersUrl: string;
  lastVerified: string;
  roles: CompanyRole[];
}

export const COMPANIES_DATA: CompanyInfo[] = [
  {
    id: 'google',
    name: 'Google',
    logo: '🔍',
    industry: 'Internet & Cloud Technology',
    headquarters: 'Mountain View, CA / Global Offices',
    about: 'Google is a global technology leader focused on organizing the world’s information and making it universally accessible. Major engineering hubs build Search, Android, Chrome, YouTube, and Google Cloud.',
    techFocus: ['Distributed Systems', 'Generative AI & LLMs', 'Cloud Infrastructure', 'Large-Scale Algorithms'],
    careersUrl: 'https://careers.google.com/',
    lastVerified: 'November 2026',
    roles: [
      {
        id: 'google-swe',
        title: 'Software Engineer (Early Career)',
        level: 'L3 / Early Career',
        summary: 'Build large-scale distributed systems and products used by billions of people worldwide.',
        skillCategories: [
          {
            category: 'fundamentals',
            categoryLabel: 'CS Fundamentals & Problem Solving',
            skills: [
              { name: 'Data Structures & Algorithms', type: 'required' },
              { name: 'Time & Space Complexity Analysis', type: 'required' },
              { name: 'Object-Oriented Design', type: 'required' }
            ]
          },
          {
            category: 'languages',
            categoryLabel: 'Programming Languages',
            skills: [
              { name: 'Python', type: 'required' },
              { name: 'Java', type: 'required' },
              { name: 'C++', type: 'preferred' },
              { name: 'Go', type: 'preferred' }
            ]
          },
          {
            category: 'frameworks',
            categoryLabel: 'Frameworks & Tools',
            skills: [
              { name: 'Git & Version Control', type: 'required' },
              { name: 'Unit Testing & CI/CD', type: 'preferred' },
              { name: 'gRPC / Protocol Buffers', type: 'preferred' }
            ]
          },
          {
            category: 'cloud',
            categoryLabel: 'Cloud & Infrastructure',
            skills: [
              { name: 'Distributed Systems Fundamentals', type: 'required' },
              { name: 'Google Cloud Platform (GCP)', type: 'preferred' },
              { name: 'Docker / Containers', type: 'preferred' }
            ]
          },
          {
            category: 'softSkills',
            categoryLabel: 'Collaboration & Soft Skills',
            skills: [
              { name: 'Technical Problem Solving', type: 'required' },
              { name: 'Code Review Etiquette', type: 'required' },
              { name: 'Clear Technical Documentation', type: 'preferred' }
            ]
          }
        ],
        preparationRoadmap: [
          {
            step: 1,
            title: 'Algorithmic Problem Solving Mastery',
            action: 'Practice core trees, graphs, dynamic programming, and hash maps with clean syntax.',
            resourceName: 'freeCodeCamp Algorithms Curriculum',
            resourceUrl: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/'
          },
          {
            step: 2,
            title: 'Modern Cloud Foundations',
            action: 'Learn cloud computing concepts, containers, and microservice architectures.',
            resourceName: 'Google Cloud Skills Boost: Cloud Computing Foundations',
            resourceUrl: 'https://www.cloudskillsboost.google/course_templates/153'
          },
          {
            step: 3,
            title: 'High-Scale Project Portfolio',
            action: 'Build an end-to-end multi-tier application with automated tests and Docker deployment.',
            resourceName: 'GitHub Student Pack & Open Source Guides',
            resourceUrl: 'https://opensource.guide/'
          }
        ]
      },
      {
        id: 'google-aiml',
        title: 'AI / Machine Learning Engineer',
        level: 'Early Career / Associate',
        summary: 'Develop mathematical models, transformer architectures, and generative AI features for Google Cloud and products.',
        skillCategories: [
          {
            category: 'languages',
            categoryLabel: 'Programming Languages',
            skills: [
              { name: 'Python', type: 'required' },
              { name: 'C++', type: 'preferred' }
            ]
          },
          {
            category: 'frameworks',
            categoryLabel: 'ML Frameworks & Libraries',
            skills: [
              { name: 'PyTorch or JAX', type: 'required' },
              { name: 'TensorFlow', type: 'required' },
              { name: 'NumPy & Pandas', type: 'required' },
              { name: 'Hugging Face Transformers', type: 'preferred' }
            ]
          },
          {
            category: 'fundamentals',
            categoryLabel: 'Mathematics & Modeling',
            skills: [
              { name: 'Linear Algebra & Calculus', type: 'required' },
              { name: 'Probability & Statistics', type: 'required' },
              { name: 'Model Optimization & Evaluation', type: 'required' }
            ]
          },
          {
            category: 'cloud',
            categoryLabel: 'Cloud ML & MLOps',
            skills: [
              { name: 'Google Vertex AI', type: 'preferred' },
              { name: 'Model Deployment (Docker/K8s)', type: 'preferred' }
            ]
          }
        ],
        preparationRoadmap: [
          {
            step: 1,
            title: 'Generative AI Foundations',
            action: 'Understand foundation models, prompt tuning, and responsible AI safety.',
            resourceName: 'Google Cloud Skills Boost: Intro to Generative AI',
            resourceUrl: 'https://www.cloudskillsboost.google/course_templates/536'
          },
          {
            step: 2,
            title: 'Machine Learning Practice with Kaggle',
            action: 'Train regression, decision trees, and neural nets on real-world datasets.',
            resourceName: 'Kaggle Learn: Intro to Machine Learning',
            resourceUrl: 'https://www.kaggle.com/learn/intro-to-machine-learning'
          }
        ]
      }
    ]
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    logo: '🪟',
    industry: 'Enterprise Software & Cloud',
    headquarters: 'Redmond, WA / India Development Centers (Hyd/Blr/Noida)',
    about: 'Microsoft develops operating systems, developer tooling (VS Code, TypeScript, GitHub), enterprise SaaS (Office 365), and the Azure cloud infrastructure powering global organizations.',
    techFocus: ['Azure Cloud', 'C# / .NET & TypeScript', 'Developer Productivity', 'Enterprise Security'],
    careersUrl: 'https://careers.microsoft.com/',
    lastVerified: 'November 2026',
    roles: [
      {
        id: 'ms-swe',
        title: 'Software Engineer',
        level: 'Level 59-60 / University Graduate',
        summary: 'Design resilient microservices, cloud applications, and developer tools using TypeScript, C#, and Azure.',
        skillCategories: [
          {
            category: 'fundamentals',
            categoryLabel: 'Computer Science Fundamentals',
            skills: [
              { name: 'Data Structures & Algorithms', type: 'required' },
              { name: 'Operating Systems & Concurrency', type: 'required' },
              { name: 'System Design Basics', type: 'preferred' }
            ]
          },
          {
            category: 'languages',
            categoryLabel: 'Programming Languages',
            skills: [
              { name: 'C# or Java', type: 'required' },
              { name: 'C++', type: 'required' },
              { name: 'TypeScript / JavaScript', type: 'preferred' },
              { name: 'Python', type: 'preferred' }
            ]
          },
          {
            category: 'cloud',
            categoryLabel: 'Cloud Platforms',
            skills: [
              { name: 'Microsoft Azure Services', type: 'preferred' },
              { name: 'REST APIs & Microservices', type: 'required' },
              { name: 'Docker / Containers', type: 'preferred' }
            ]
          },
          {
            category: 'databases',
            categoryLabel: 'Databases',
            skills: [
              { name: 'Relational Databases (SQL Server / PostgreSQL)', type: 'required' },
              { name: 'NoSQL (Cosmos DB / MongoDB)', type: 'preferred' }
            ]
          }
        ],
        preparationRoadmap: [
          {
            step: 1,
            title: 'Microsoft Learn: C# Fundamentals',
            action: 'Master modern object-oriented programming, LINQ, and asynchronous patterns in C#.',
            resourceName: 'Microsoft Learn C# Certification',
            resourceUrl: 'https://learn.microsoft.com/en-us/training/paths/get-started-c-sharp-part-1/'
          },
          {
            step: 2,
            title: 'Azure Cloud Architecture Fundamentals',
            action: 'Understand Azure compute, app services, blob storage, and security.',
            resourceName: 'Microsoft Learn Azure Fundamentals (AZ-900)',
            resourceUrl: 'https://learn.microsoft.com/en-us/training/paths/az-900-describe-cloud-concepts/'
          }
        ]
      }
    ]
  },
  {
    id: 'amazon',
    name: 'Amazon',
    logo: '📦',
    industry: 'E-Commerce & Cloud Computing (AWS)',
    headquarters: 'Seattle, WA / Multiple India Tech Hubs',
    about: 'Amazon is guided by Leadership Principles and powers global e-commerce, Prime Video streaming, Alexa, and Amazon Web Services (AWS), the world’s leading cloud infrastructure platform.',
    techFocus: ['High-Throughput Microservices', 'AWS Cloud Architecture', 'NoSQL at Scale', 'Supply Chain Tech'],
    careersUrl: 'https://www.amazon.jobs/',
    lastVerified: 'November 2026',
    roles: [
      {
        id: 'amazon-sde',
        title: 'Software Development Engineer I (SDE-1)',
        level: 'L4 / Entry Level',
        summary: 'Architect services capable of handling thousands of requests per second with strict latency SLAs.',
        skillCategories: [
          {
            category: 'fundamentals',
            categoryLabel: 'CS Fundamentals & Leadership Principles',
            skills: [
              { name: 'Data Structures & Algorithms', type: 'required' },
              { name: 'Customer Obsession & Ownership Mindset', type: 'required' },
              { name: 'Object-Oriented Design & Design Patterns', type: 'required' }
            ]
          },
          {
            category: 'languages',
            categoryLabel: 'Programming Languages',
            skills: [
              { name: 'Java', type: 'required' },
              { name: 'Python', type: 'preferred' },
              { name: 'C++', type: 'preferred' }
            ]
          },
          {
            category: 'cloud',
            categoryLabel: 'AWS & Cloud Systems',
            skills: [
              { name: 'REST APIs & Asynchronous Queues', type: 'required' },
              { name: 'AWS (Lambda, SQS, DynamoDB, S3)', type: 'preferred' },
              { name: 'CI/CD & DevOps Automation', type: 'preferred' }
            ]
          },
          {
            category: 'databases',
            categoryLabel: 'Data Stores',
            skills: [
              { name: 'SQL Databases', type: 'required' },
              { name: 'DynamoDB or Key-Value Stores', type: 'preferred' }
            ]
          }
        ],
        preparationRoadmap: [
          {
            step: 1,
            title: 'Master AWS Cloud Practitioner',
            action: 'Learn core cloud computing architecture, storage, and serverless compute.',
            resourceName: 'AWS Skill Builder: Cloud Practitioner Essentials',
            resourceUrl: 'https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials'
          },
          {
            step: 2,
            title: 'Design Patterns & OOP in Java',
            action: 'Practice modular SOLID principles and multi-threaded event handlers.',
            resourceName: 'freeCodeCamp Java Programming Guide',
            resourceUrl: 'https://www.freecodecamp.org/news/learn-java-programming/'
          }
        ]
      }
    ]
  },
  {
    id: 'zoho',
    name: 'Zoho Corporation',
    logo: '🔴',
    industry: 'Enterprise SaaS & Business Suites',
    headquarters: 'Chennai / Tenkasi, India',
    about: 'Zoho creates comprehensive cloud-based business software suites, operating its own private data centers and valuing strong fundamental programming skills, logic, and self-taught builders.',
    techFocus: ['Custom In-House Frameworks', 'High-Density Datacenters', 'Full-Stack Web SaaS', 'Privacy-First Architecture'],
    careersUrl: 'https://www.zoho.com/careers/',
    lastVerified: 'November 2026',
    roles: [
      {
        id: 'zoho-dev',
        title: 'Software Developer',
        level: 'Fresher / Trainee / Associate',
        summary: 'Build high-performance web applications and backend databases with deep emphasis on core logical problem solving and raw language fundamentals.',
        skillCategories: [
          {
            category: 'fundamentals',
            categoryLabel: 'Logic & Problem Solving',
            skills: [
              { name: 'C or Java Problem Solving', type: 'required' },
              { name: 'Logical Aptitude & Matrix Manipulation', type: 'required' },
              { name: 'Memory Management & Pointers', type: 'preferred' }
            ]
          },
          {
            category: 'languages',
            categoryLabel: 'Languages & Web Tech',
            skills: [
              { name: 'Java', type: 'required' },
              { name: 'C', type: 'required' },
              { name: 'JavaScript & HTML/CSS', type: 'preferred' }
            ]
          },
          {
            category: 'databases',
            categoryLabel: 'Databases & Performance',
            skills: [
              { name: 'SQL Query Optimization', type: 'required' },
              { name: 'Relational Schema Design', type: 'required' }
            ]
          }
        ],
        preparationRoadmap: [
          {
            step: 1,
            title: 'Deep C / Java Core Logic',
            action: 'Solve multi-stage programming puzzles, matrix rotations, and string manipulations.',
            resourceName: 'freeCodeCamp C Programming Tutorial',
            resourceUrl: 'https://www.freecodecamp.org/news/the-c-beginners-handbook/'
          },
          {
            step: 2,
            title: 'Database Schema & Query Design',
            action: 'Learn normalized SQL table design and index performance tuning.',
            resourceName: 'Kaggle Learn: Intro to SQL',
            resourceUrl: 'https://www.kaggle.com/learn/intro-to-sql'
          }
        ]
      }
    ]
  },
  {
    id: 'freshworks',
    name: 'Freshworks',
    logo: '🍀',
    industry: 'Customer Engagement & IT Service SaaS',
    headquarters: 'San Mateo, CA / Chennai, India',
    about: 'Freshworks builds AI-powered customer service, CRM, and IT service management suites designed to be delightfully simple for modern businesses.',
    techFocus: ['Modern React & Ember Frontend', 'Ruby on Rails & Python Backend', 'AWS Cloud Serverless', 'Generative AI Assistants'],
    careersUrl: 'https://www.freshworks.com/company/careers/',
    lastVerified: 'November 2026',
    roles: [
      {
        id: 'freshworks-fullstack',
        title: 'Full Stack Engineer',
        level: 'Associate / Early Career',
        summary: 'Develop responsive, human-centered web software and scalable REST microservices.',
        skillCategories: [
          {
            category: 'languages',
            categoryLabel: 'Web & Programming Languages',
            skills: [
              { name: 'JavaScript (ES6+) & TypeScript', type: 'required' },
              { name: 'Python or Ruby or Java', type: 'required' },
              { name: 'HTML5 & Modern CSS', type: 'required' }
            ]
          },
          {
            category: 'frameworks',
            categoryLabel: 'Web Frameworks',
            skills: [
              { name: 'React.js', type: 'required' },
              { name: 'Node.js / Express', type: 'required' },
              { name: 'RESTful API Architecture', type: 'required' }
            ]
          },
          {
            category: 'databases',
            categoryLabel: 'Databases & Caching',
            skills: [
              { name: 'PostgreSQL or MySQL', type: 'required' },
              { name: 'Redis Caching', type: 'preferred' }
            ]
          }
        ],
        preparationRoadmap: [
          {
            step: 1,
            title: 'Modern React Application Architecture',
            action: 'Build full-featured component hierarchies with hooks and state management.',
            resourceName: 'freeCodeCamp Frontend Development Libraries',
            resourceUrl: 'https://www.freecodecamp.org/learn/front-end-development-libraries/'
          }
        ]
      }
    ]
  },
  {
    id: 'accenture',
    name: 'Accenture',
    logo: '🟣',
    industry: 'Global Technology Consulting & Cloud Transformation',
    headquarters: 'Dublin, Ireland / Pan-India Delivery Centers',
    about: 'Accenture delivers enterprise digital transformation, cloud migrations, AI adoption, and system integration services for Fortune Global 500 enterprises.',
    techFocus: ['Enterprise Cloud Migration', 'SAP / Salesforce / ServiceNow', 'Full-Stack Development', 'Data Engineering'],
    careersUrl: 'https://www.accenture.com/in-en/careers',
    lastVerified: 'November 2026',
    roles: [
      {
        id: 'accenture-ase',
        title: 'Associate Software Engineer (ASE)',
        level: 'Entry Level / Campus Onboarding',
        summary: 'Collaborate with global clients to develop, test, and modernize enterprise software solutions.',
        skillCategories: [
          {
            category: 'languages',
            categoryLabel: 'Core Programming',
            skills: [
              { name: 'Java or Python', type: 'required' },
              { name: 'SQL & Database Basics', type: 'required' },
              { name: 'JavaScript Basics', type: 'preferred' }
            ]
          },
          {
            category: 'fundamentals',
            categoryLabel: 'Software Lifecycle & Quality',
            skills: [
              { name: 'Software Development Life Cycle (SDLC)', type: 'required' },
              { name: 'Agile & Scrum Methodologies', type: 'required' },
              { name: 'Testing & Quality Assurance', type: 'preferred' }
            ]
          },
          {
            category: 'cloud',
            categoryLabel: 'Cloud Awareness',
            skills: [
              { name: 'Cloud Fundamentals (AWS/Azure/GCP)', type: 'preferred' }
            ]
          }
        ],
        preparationRoadmap: [
          {
            step: 1,
            title: 'Java & Database Integration',
            action: 'Understand database connections, JDBC, and object-oriented development.',
            resourceName: 'freeCodeCamp Java Curriculum',
            resourceUrl: 'https://www.freecodecamp.org/news/learn-java-programming/'
          }
        ]
      }
    ]
  },
  {
    id: 'tcs',
    name: 'Tata Consultancy Services (TCS)',
    logo: '🏢',
    industry: 'IT Services & Business Consulting',
    headquarters: 'Mumbai, India / Global Delivery Hubs',
    about: 'TCS is India’s largest IT services firm, partnering with banking, aviation, and healthcare leaders to implement large-scale digital software systems (TCS NQT hiring track).',
    techFocus: ['Banking & Financial Systems', 'Enterprise Modernization', 'Cloud Infrastructure', 'Cybersecurity'],
    careersUrl: 'https://www.tcs.com/careers',
    lastVerified: 'November 2026',
    roles: [
      {
        id: 'tcs-ninja-digital',
        title: 'Systems Engineer / Digital Cadre',
        level: 'Entry Level (Ninja & Digital Tracks)',
        summary: 'Develop software applications, microservices, and automated testing pipelines for enterprise clients.',
        skillCategories: [
          {
            category: 'languages',
            categoryLabel: 'Programming Languages',
            skills: [
              { name: 'Python or Java or C++', type: 'required' },
              { name: 'SQL Querying', type: 'required' }
            ]
          },
          {
            category: 'fundamentals',
            categoryLabel: 'Aptitude & Computer Fundamentals',
            skills: [
              { name: 'Data Structures Basics', type: 'required' },
              { name: 'Computer Networks (OSI, TCP/IP)', type: 'required' },
              { name: 'DBMS Concepts (ACID, Normalization)', type: 'required' }
            ]
          },
          {
            category: 'cloud',
            categoryLabel: 'Emerging Technologies',
            skills: [
              { name: 'Cloud Computing Foundations', type: 'preferred' },
              { name: 'Machine Learning Basics', type: 'preferred' }
            ]
          }
        ],
        preparationRoadmap: [
          {
            step: 1,
            title: 'TCS NQT Preparation Track',
            action: 'Solidify quantitative aptitude, logical reasoning, and hands-on coding in Python or Java.',
            resourceName: 'freeCodeCamp Python Guide',
            resourceUrl: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/'
          }
        ]
      }
    ]
  },
  {
    id: 'infosys',
    name: 'Infosys',
    logo: '🔷',
    industry: 'Digital Services & Consulting',
    headquarters: 'Bengaluru, India / Mysore Global Education Center',
    about: 'Infosys is renowned for its world-class Mysore training campus, preparing software engineers for digital enterprise applications, cloud architectures, and AI transformations.',
    techFocus: ['Infosys Topaz (Generative AI)', 'Infosys Cobalt (Cloud)', 'Enterprise Full Stack', 'Automation'],
    careersUrl: 'https://www.infosys.com/careers/',
    lastVerified: 'November 2026',
    roles: [
      {
        id: 'infosys-sp',
        title: 'Specialist Programmer (Power Programmer)',
        level: 'Advanced Campus Track',
        summary: 'Compete in HackWithInfy to join high-impact engineering squads solving algorithmic and full-stack challenges.',
        skillCategories: [
          {
            category: 'fundamentals',
            categoryLabel: 'Advanced Problem Solving',
            skills: [
              { name: 'Dynamic Programming & Graph Algorithms', type: 'required' },
              { name: 'Competitive Coding & Time Complexity', type: 'required' }
            ]
          },
          {
            category: 'languages',
            categoryLabel: 'Full-Stack Foundations',
            skills: [
              { name: 'Java or Python or C++', type: 'required' },
              { name: 'React or Angular', type: 'preferred' },
              { name: 'Spring Boot or Node.js', type: 'preferred' }
            ]
          }
        ],
        preparationRoadmap: [
          {
            step: 1,
            title: 'Advanced Graph & Dynamic Programming Practice',
            action: 'Master complex competitive programming techniques.',
            resourceName: 'freeCodeCamp Algorithms Practice',
            resourceUrl: 'https://www.freecodecamp.org/learn/rosetta-code/'
          }
        ]
      }
    ]
  },
  {
    id: 'wipro',
    name: 'Wipro',
    logo: '🌐',
    industry: 'Technology Services & Digital Consulting',
    headquarters: 'Bengaluru, India',
    about: 'Wipro provides comprehensive IT, consulting, and business process services with strong focus on AI, cloud engineering, and cybersecurity.',
    techFocus: ['Cybersecurity & Cloud', 'AI & Automation (Wipro ai360)', 'Engineering Edge', 'Sustainability Tech'],
    careersUrl: 'https://careers.wipro.com/',
    lastVerified: 'November 2026',
    roles: [
      {
        id: 'wipro-turbo',
        title: 'Project Engineer (Elite & Turbo Tracks)',
        level: 'Fresher / Associate',
        summary: 'Design and deploy modern software, automate testing, and support cloud migration projects.',
        skillCategories: [
          {
            category: 'languages',
            categoryLabel: 'Core Languages',
            skills: [
              { name: 'Java or Python', type: 'required' },
              { name: 'SQL', type: 'required' }
            ]
          },
          {
            category: 'fundamentals',
            categoryLabel: 'Core Fundamentals',
            skills: [
              { name: 'Data Structures Basics', type: 'required' },
              { name: 'Operating Systems & Linux Basics', type: 'required' }
            ]
          }
        ],
        preparationRoadmap: [
          {
            step: 1,
            title: 'Core Java & Data Structures',
            action: 'Learn object-oriented design and collections framework in Java.',
            resourceName: 'Microsoft Learn Java Path',
            resourceUrl: 'https://learn.microsoft.com/en-us/training/paths/build-java-web-apps/'
          }
        ]
      }
    ]
  },
  {
    id: 'cisco',
    name: 'Cisco',
    logo: '🌐',
    industry: 'Networking Hardware, Cybersecurity & Cloud',
    headquarters: 'San Jose, CA / Bengaluru, India',
    about: 'Cisco powers the backbone of the internet with routers, switches, cybersecurity software, Webex collaboration, and cloud observability.',
    techFocus: ['Software-Defined Networking (SDN)', 'Cybersecurity & Zero Trust', 'Cloud Observability (AppDynamics)', 'IoT & Embedded'],
    careersUrl: 'https://www.cisco.com/c/en/us/about/careers.html',
    lastVerified: 'November 2026',
    roles: [
      {
        id: 'cisco-network-swe',
        title: 'Software Engineer - Networking & Cloud',
        level: 'University Graduate / Early Career',
        summary: 'Develop software-defined networking controllers, security protocols, and high-performance packet routing microservices.',
        skillCategories: [
          {
            category: 'fundamentals',
            categoryLabel: 'Networking & OS',
            skills: [
              { name: 'Computer Networking (TCP/IP, Routing Protocols)', type: 'required' },
              { name: 'Linux System Programming', type: 'required' },
              { name: 'Socket Programming & Concurrency', type: 'required' }
            ]
          },
          {
            category: 'languages',
            categoryLabel: 'System Languages',
            skills: [
              { name: 'C or C++', type: 'required' },
              { name: 'Python', type: 'required' },
              { name: 'Go', type: 'preferred' }
            ]
          },
          {
            category: 'cloud',
            categoryLabel: 'Containers & Security',
            skills: [
              { name: 'Docker & Kubernetes', type: 'preferred' },
              { name: 'Network Security Fundamentals', type: 'required' }
            ]
          }
        ],
        preparationRoadmap: [
          {
            step: 1,
            title: 'Master Networking Protocols',
            action: 'Study OSI 7 layers, packet headers, subnetting, and socket programming.',
            resourceName: 'freeCodeCamp Computer Networking Course',
            resourceUrl: 'https://www.freecodecamp.org/news/free-computer-networking-course/'
          }
        ]
      }
    ]
  }
];

export interface SkillMatchAnalysis {
  matchedSkills: string[];
  developingSkills: string[];
  gapSkills: string[];
  matchPercentage: number;
  totalRequired: number;
}

export function calculateSkillMatch(userSkills: string[], role: CompanyRole): SkillMatchAnalysis {
  const normalizedUser = (userSkills || []).map(s => s.toLowerCase().trim());
  
  const allRoleSkills = role.skillCategories.flatMap(cat => cat.skills);
  const matchedSkills: string[] = [];
  const developingSkills: string[] = [];
  const gapSkills: string[] = [];

  allRoleSkills.forEach(skillObj => {
    const sName = skillObj.name;
    const sLower = sName.toLowerCase();

    // Check if user has this exact skill or related keyword
    const hasExact = normalizedUser.some(u => 
      u === sLower || 
      u.includes(sLower) || 
      sLower.includes(u) ||
      (sLower.includes('python') && u.includes('python')) ||
      (sLower.includes('sql') && u.includes('sql')) ||
      (sLower.includes('data structures') && (u.includes('algorithm') || u.includes('problem solving') || u.includes('c++') || u.includes('java'))) ||
      (sLower.includes('web') && (u.includes('react') || u.includes('html') || u.includes('javascript'))) ||
      (sLower.includes('ml') && u.includes('machine learning'))
    );

    if (hasExact) {
      matchedSkills.push(sName);
    } else if (skillObj.type === 'preferred') {
      developingSkills.push(sName);
    } else {
      gapSkills.push(sName);
    }
  });

  const total = allRoleSkills.length;
  const matchPercentage = total > 0 ? Math.round((matchedSkills.length / total) * 100) : 0;

  return {
    matchedSkills,
    developingSkills,
    gapSkills,
    matchPercentage,
    totalRequired: allRoleSkills.filter(s => s.type === 'required').length
  };
}
