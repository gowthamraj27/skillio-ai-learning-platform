export interface CareerPath {
  id: string;
  title: string;
  slug: string;
  category: string;
  icon: string;
  explanation: string;
  typicalResponsibilities: string[];
  importantTechnicalSkills: string[];
  complementarySkills: string[];
  beginnerLearningPath: string[];
  relatedJobRoles: string[];
  industryOverview: string;
}

export const CAREER_PATHS: CareerPath[] = [
  {
    id: 'software-dev',
    title: 'Software Development',
    slug: 'software-development',
    category: 'Engineering',
    icon: '💻',
    explanation: 'Design, write, test, and maintain robust computer applications and systems that solve user and business needs.',
    typicalResponsibilities: [
      'Write clean, maintainable, and efficient code adhering to software engineering patterns.',
      'Collaborate with cross-functional teams to define, design, and ship new features.',
      'Identify bottlenecks, debug defects, and maintain code quality and test automation.',
      'Participate in design reviews, architecture discussions, and peer code reviews.'
    ],
    importantTechnicalSkills: [
      'Data Structures & Algorithms',
      'Python',
      'Java or C++',
      'Git & Version Control',
      'Object-Oriented Programming (OOP)',
      'Relational Databases (SQL)'
    ],
    complementarySkills: [
      'Agile / Scrum Methodologies',
      'System Architecture',
      'Technical Communication',
      'Debugging & Profiling',
      'Unit Testing'
    ],
    beginnerLearningPath: [
      'Phase 1: Master one foundational language (Python or Java/C++)',
      'Phase 2: Practice Core Data Structures (Arrays, Lists, HashMaps, Trees)',
      'Phase 3: Build 2-3 terminal or GUI applications with unit tests',
      'Phase 4: Learn Git, GitHub workflow, and collaborative pull requests'
    ],
    relatedJobRoles: [
      'Associate Software Engineer',
      'Backend Engineer',
      'Application Developer',
      'Systems Programmer'
    ],
    industryOverview: 'Continuous demand across tech, finance, e-commerce, and healthcare with emphasis on problem-solving and scalability.'
  },
  {
    id: 'ai-ml',
    title: 'Artificial Intelligence & Machine Learning',
    slug: 'ai-ml',
    category: 'Data & AI',
    icon: '🤖',
    explanation: 'Build mathematical models and algorithms that enable computers to learn from patterns, make predictions, and generate intelligent outputs.',
    typicalResponsibilities: [
      'Design and train statistical learning models on structured and unstructured datasets.',
      'Clean, preprocess, and perform feature engineering on tabular, text, or visual data.',
      'Evaluate model performance using precision, recall, F1, and cross-validation techniques.',
      'Integrate models into production APIs and monitor prediction accuracy.'
    ],
    importantTechnicalSkills: [
      'Python (NumPy, Pandas)',
      'Scikit-learn',
      'Linear Algebra & Statistics',
      'PyTorch or TensorFlow',
      'Data Preprocessing',
      'SQL'
    ],
    complementarySkills: [
      'Experiment Tracking (MLflow/W&B)',
      'Responsible AI & Bias Mitigation',
      'Data Storytelling',
      'API Deployment (FastAPI/Docker)'
    ],
    beginnerLearningPath: [
      'Phase 1: Solidify Python for Data Analysis (Pandas, NumPy)',
      'Phase 2: Mathematical foundations (Probability, Linear Algebra, Calculus)',
      'Phase 3: Classical Machine Learning algorithms (Regression, Trees, Clustering)',
      'Phase 4: Deep Learning basics and practical Kaggle competition notebooks'
    ],
    relatedJobRoles: [
      'Junior ML Engineer',
      'AI Research Assistant',
      'Data Scientist',
      'NLP / Computer Vision Specialist'
    ],
    industryOverview: 'Rapidly transforming software capabilities across every industry with strong demand for practical model implementation and data hygiene.'
  },
  {
    id: 'data-science',
    title: 'Data Science & Analytics',
    slug: 'data-science',
    category: 'Data & AI',
    icon: '📈',
    explanation: 'Extract actionable business insights from complex datasets using statistical analysis, exploratory visualization, and metric modeling.',
    typicalResponsibilities: [
      'Query relational databases and data warehouses using advanced SQL joins and window functions.',
      'Perform exploratory data analysis (EDA) to uncover trends, anomalies, and correlations.',
      'Design executive business dashboards and KPI reports in BI tools.',
      'Present analytical findings to stakeholders to guide strategic decisions.'
    ],
    importantTechnicalSkills: [
      'Advanced SQL',
      'Python / R',
      'Pandas & Matplotlib/Seaborn',
      'Data Visualization (Tableau/Power BI)',
      'Hypothesis Testing & A/B Testing',
      'Spreadsheets (Excel/Sheets modeling)'
    ],
    complementarySkills: [
      'Business Acumen',
      'Stakeholder Presentation',
      'Metric Definition',
      'Data Storytelling'
    ],
    beginnerLearningPath: [
      'Phase 1: Master SQL querying and relational schema modeling',
      'Phase 2: Exploratory data analysis in Python using real-world public datasets',
      'Phase 3: Interactive dashboard design and metric storytelling',
      'Phase 4: Statistical experimentation, hypothesis testing, and business case studies'
    ],
    relatedJobRoles: [
      'Data Analyst',
      'Business Intelligence Engineer',
      'Analytics Consultant',
      'Product Analyst'
    ],
    industryOverview: 'Essential for data-driven companies to measure performance, retain customers, and optimize operations.'
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    slug: 'cybersecurity',
    category: 'Security & Infrastructure',
    icon: '🛡️',
    explanation: 'Protect systems, computer networks, cloud infrastructure, and sensitive data from cyber threats, unauthorized breaches, and exploits.',
    typicalResponsibilities: [
      'Monitor networks and security information event management (SIEM) systems for intrusions.',
      'Conduct vulnerability assessments, threat analysis, and penetration testing simulations.',
      'Implement identity access management (IAM), encryption, and firewall protections.',
      'Formulate incident response plans and security hygiene policies.'
    ],
    importantTechnicalSkills: [
      'Computer Networking (TCP/IP, DNS, VPN)',
      'Linux Operating System Security',
      'Web Application Security (OWASP Top 10)',
      'Network Security Tools (Wireshark, Nmap)',
      'Cryptography Fundamentals',
      'Scripting (Python/Bash)'
    ],
    complementarySkills: [
      'Security Compliance & Frameworks (ISO 27001, NIST)',
      'Analytical Investigation',
      'Ethical Mindset',
      'Incident Reporting'
    ],
    beginnerLearningPath: [
      'Phase 1: Master networking protocols, subnetting, and Linux command-line',
      'Phase 2: Learn web security fundamentals and common vulnerabilities (OWASP)',
      'Phase 3: Hands-on security labs (OverTheWire, TryHackMe)',
      'Phase 4: Security monitoring, packet analysis, and secure coding practices'
    ],
    relatedJobRoles: [
      'Junior Security Analyst',
      'SOC Analyst',
      'Penetration Tester',
      'Information Security Specialist'
    ],
    industryOverview: 'High global demand with severe talent shortages; critical across banking, defense, enterprise SaaS, and infrastructure.'
  },
  {
    id: 'cloud-computing',
    title: 'Cloud Computing & DevOps',
    slug: 'cloud-computing',
    category: 'Security & Infrastructure',
    icon: '☁️',
    explanation: 'Architect, automate, and operate scalable, resilient cloud infrastructure, microservices, and continuous delivery pipelines.',
    typicalResponsibilities: [
      'Provision and manage cloud computing resources, storage buckets, and virtual private clouds.',
      'Build automated continuous integration and continuous deployment (CI/CD) pipelines.',
      'Containerize applications using Docker and orchestrate with Kubernetes.',
      'Monitor cluster health, uptime, latency, and cloud cost efficiency.'
    ],
    importantTechnicalSkills: [
      'Linux Administration',
      'Cloud Platforms (AWS, GCP, or Azure)',
      'Docker & Containerization',
      'CI/CD Pipelines (GitHub Actions/GitLab)',
      'Infrastructure as Code (Terraform)',
      'Bash & Python Scripting'
    ],
    complementarySkills: [
      'Site Reliability Engineering (SRE) principles',
      'High Availability Architecture',
      'Root Cause Analysis',
      'Cost Optimization'
    ],
    beginnerLearningPath: [
      'Phase 1: Linux system administration and shell scripting',
      'Phase 2: Cloud fundamentals (GCP Cloud Practitioner / AWS Essentials)',
      'Phase 3: Docker containerization and deploying multi-container apps',
      'Phase 4: Automated CI/CD build/test pipelines and Kubernetes basics'
    ],
    relatedJobRoles: [
      'Cloud Engineer',
      'DevOps Engineer',
      'Platform Engineer',
      'Site Reliability Engineer (SRE)'
    ],
    industryOverview: 'Massive adoption as organizations migrate from physical on-premise hardware to scalable serverless and cloud architectures.'
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    slug: 'web-development',
    category: 'Engineering',
    icon: '🌐',
    explanation: 'Build responsive, fast, and accessible web experiences from responsive user interfaces to resilient backend APIs.',
    typicalResponsibilities: [
      'Build intuitive, responsive user interfaces with semantic HTML, CSS, and modern JavaScript/TypeScript.',
      'Develop server-side REST/GraphQL APIs and integrate database transactions.',
      'Optimize web performance, Core Web Vitals, and cross-browser accessibility.',
      'Manage authentication, cookies, and secure application state.'
    ],
    importantTechnicalSkills: [
      'HTML5, Modern CSS & Tailwind',
      'JavaScript (ES6+) & TypeScript',
      'React.js / Next.js',
      'Node.js & Express or Python FastAPI',
      'RESTful API Design',
      'PostgreSQL or MongoDB'
    ],
    complementarySkills: [
      'Web Accessibility (WCAG)',
      'Responsive Web Design',
      'SEO & Performance Tuning',
      'Version Control (Git)'
    ],
    beginnerLearningPath: [
      'Phase 1: Semantic HTML, modern CSS layouts (Flexbox, Grid), and responsive design',
      'Phase 2: JavaScript DOM manipulation, async/await, and API fetches',
      'Phase 3: React component architecture, props, state, and hooks',
      'Phase 4: Full-stack integration with Node.js/PostgreSQL and production deployment'
    ],
    relatedJobRoles: [
      'Frontend Developer',
      'Full Stack Developer',
      'Web Application Engineer',
      'UI Engineer'
    ],
    industryOverview: 'Ubiquitous industry need for building internal tooling, customer portals, SaaS platforms, and mobile-first web applications.'
  },
  {
    id: 'mobile-dev',
    title: 'Mobile App Development',
    slug: 'mobile-development',
    category: 'Engineering',
    icon: '📱',
    explanation: 'Create engaging, intuitive native and cross-platform applications for smartphones, tablets, and wearable devices.',
    typicalResponsibilities: [
      'Build responsive mobile screens adhering to iOS Human Interface Guidelines and Android Material Design.',
      'Integrate device APIs such as camera, location, notifications, and local offline storage.',
      'Optimize app performance, frame rates, and battery consumption.',
      'Manage app store submission workflows and version updates.'
    ],
    importantTechnicalSkills: [
      'Flutter / Dart OR React Native',
      'Kotlin (Android) or Swift (iOS)',
      'Mobile State Management (Bloc/Riverpod/Redux)',
      'REST & WebSocket Integration',
      'Local Storage (SQLite / Hive)',
      'Git'
    ],
    complementarySkills: [
      'Mobile UX Patterns',
      'Offline-First Architecture',
      'App Store Optimization (ASO)',
      'Touch Gesture Interactions'
    ],
    beginnerLearningPath: [
      'Phase 1: Master Dart (for Flutter) or JavaScript/TypeScript (for React Native)',
      'Phase 2: Layout widgets, responsive mobile views, and navigation stacks',
      'Phase 3: State management, API integration, and offline caching',
      'Phase 4: Build 2 production-ready mobile apps and publish APK / TestFlight'
    ],
    relatedJobRoles: [
      'Flutter Developer',
      'React Native Developer',
      'Android Engineer',
      'iOS Engineer'
    ],
    industryOverview: 'Thriving global mobile economy with strong demand in fintech, delivery, healthcare, and consumer social apps.'
  },
  {
    id: 'robotics',
    title: 'Robotics & Automation',
    slug: 'robotics-automation',
    category: 'Hardware & Systems',
    icon: '⚙️',
    explanation: 'Combine embedded systems, computer vision, control theory, and software to design autonomous robots and automated processes.',
    typicalResponsibilities: [
      'Program microcontrollers and embedded microprocessors (ARM, ESP32, Arduino).',
      'Develop sensor fusion algorithms integrating LIDAR, cameras, and IMU sensors.',
      'Implement motor control, kinematics, and path-planning algorithms.',
      'Simulate robotic systems using ROS (Robot Operating System) and Gazebo.'
    ],
    importantTechnicalSkills: [
      'C / C++',
      'Python',
      'Robot Operating System (ROS / ROS 2)',
      'Embedded Systems & Microcontrollers',
      'Control Systems & Kinematics',
      'Computer Vision Basics (OpenCV)'
    ],
    complementarySkills: [
      'Circuit Prototyping & Schematics',
      'Simulation Tools (Gazebo/Webots)',
      'Real-Time Operating Systems (RTOS)',
      'Hardware Debugging (Oscilloscopes)'
    ],
    beginnerLearningPath: [
      'Phase 1: Master C/C++ programming and memory management',
      'Phase 2: Microcontroller prototyping (Arduino / ESP32) with sensors and actuators',
      'Phase 3: Robot kinematics and Robot Operating System (ROS 2) in Linux',
      'Phase 4: Autonomous navigation, obstacle avoidance, and computer vision integration'
    ],
    relatedJobRoles: [
      'Robotics Software Engineer',
      'Embedded Systems Engineer',
      'Automation Specialist',
      'Control Systems Developer'
    ],
    industryOverview: 'Transforming industrial manufacturing, warehouse logistics, agricultural automation, and autonomous vehicles.'
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    slug: 'ui-ux-design',
    category: 'Design & Product',
    icon: '🎨',
    explanation: 'Craft intuitive, accessible, and delightful digital user interfaces and cohesive design systems backed by user research.',
    typicalResponsibilities: [
      'Conduct user interviews, surveys, and usability testing to identify user pain points.',
      'Create wireframes, user journeys, low-fidelity flows, and high-fidelity prototypes.',
      'Maintain modular component libraries and design token systems in Figma.',
      'Collaborate with engineers to ensure pixel-perfect and accessible frontend implementation.'
    ],
    importantTechnicalSkills: [
      'Figma & Auto-Layout',
      'Design Systems & Component Architecture',
      'Interactive Prototyping',
      'User Research & Usability Testing',
      'Wireframing & Information Architecture',
      'Basic HTML/CSS Understanding'
    ],
    complementarySkills: [
      'Empathy & User Advocacy',
      'Microcopy & Content Strategy',
      'Design Critique & Presentation',
      'Accessibility Standards (WCAG)'
    ],
    beginnerLearningPath: [
      'Phase 1: Visual design principles (typography, color theory, spacing, visual hierarchy)',
      'Phase 2: Master Figma tools, components, variants, and interactive prototyping',
      'Phase 3: User research methodology, user persona creation, and wireframing',
      'Phase 4: Build 2 detailed case studies showcasing the complete problem-to-prototype journey'
    ],
    relatedJobRoles: [
      'Product Designer',
      'UI Designer',
      'UX Researcher',
      'Design Systems Specialist'
    ],
    industryOverview: 'Vital across all digital products where intuitive user experience differentiates winning apps from frustrating software.'
  }
];
