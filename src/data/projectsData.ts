export interface ProjectMilestone {
  title: string;
  description: string;
}

export interface RecommendedProject {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  summary: string;
  skillsDeveloped: string[];
  techStack: string[];
  milestones: ProjectMilestone[];
  starterGuideUrl?: string;
}

export interface UserCustomProject {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  liveUrl?: string;
  techStack: string[];
  status: 'planning' | 'in-progress' | 'completed';
  createdAt: string;
}

export const RECOMMENDED_PROJECTS: RecommendedProject[] = [
  // Beginner Projects
  {
    id: 'proj-beg-taskflow',
    title: 'Personal Learning Quest & Task Tracker',
    level: 'Beginner',
    category: 'Web & Applications',
    summary: 'A clean, responsive task and habit tracker that saves items to local browser storage with filtering and milestone badges.',
    skillsDeveloped: ['Semantic HTML5', 'Responsive CSS Grid & Flexbox', 'JavaScript DOM Manipulation', 'Local Storage APIs'],
    techStack: ['HTML5', 'Modern CSS / Tailwind', 'Vanilla JavaScript or React'],
    milestones: [
      { title: 'Milestone 1: UI Mockup & Layout', description: 'Create responsive input form, task list, and priority chips.' },
      { title: 'Milestone 2: CRUD State Logic', description: 'Implement adding, editing, completing, and deleting tasks.' },
      { title: 'Milestone 3: Local Persistence & Filters', description: 'Save items in browser storage and filter by active/completed status.' }
    ],
    starterGuideUrl: 'https://www.freecodecamp.org/news/how-to-build-a-todo-app-with-javascript/'
  },
  {
    id: 'proj-beg-weather',
    title: 'Global Weather & Environmental Dashboard',
    level: 'Beginner',
    category: 'API & Data',
    summary: 'Fetch live weather forecasts, air quality index, and temperature trends from an external REST API with dynamic condition icons.',
    skillsDeveloped: ['Asynchronous Fetch API', 'JSON Data Parsing', 'Error Handling & Loading States', 'Responsive Cards'],
    techStack: ['JavaScript / TypeScript', 'Open-Meteo or OpenWeather API', 'CSS Grid'],
    milestones: [
      { title: 'Milestone 1: City Search & Geocoding', description: 'Accept user city name and resolve geographical latitude and longitude.' },
      { title: 'Milestone 2: Forecast Retrieval', description: 'Query 7-day forecast data and format timestamps.' },
      { title: 'Milestone 3: Visual Data Cards', description: 'Display animated weather condition icons and temperature charts.' }
    ],
    starterGuideUrl: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Network_requests'
  },
  {
    id: 'proj-beg-sentiment',
    title: 'Text Sentiment & Review Analyzer',
    level: 'Beginner',
    category: 'AI & Data Science',
    summary: 'A Python notebook analyzing customer feedback and book reviews to classify text polarity (positive, neutral, negative).',
    skillsDeveloped: ['Python Text Cleaning', 'Pandas DataFrames', 'Natural Language Preprocessing', 'Data Visualization'],
    techStack: ['Python', 'NLTK / TextBlob', 'Pandas', 'Matplotlib'],
    milestones: [
      { title: 'Milestone 1: Dataset Cleaning', description: 'Remove stop words, punctuation, and tokenize review text.' },
      { title: 'Milestone 2: Polarity Scoring', description: 'Compute sentiment polarity and subjectivity scores.' },
      { title: 'Milestone 3: Distribution Plots', description: 'Create histograms and word clouds highlighting common keywords.' }
    ],
    starterGuideUrl: 'https://www.kaggle.com/learn'
  },

  // Intermediate Projects
  {
    id: 'proj-int-ecom',
    title: 'Full-Stack Campus Marketplace API & UI',
    level: 'Intermediate',
    category: 'Full-Stack Engineering',
    summary: 'A multi-vendor student marketplace where students can list used textbooks, project kits, and electronics with authentication.',
    skillsDeveloped: ['JWT Authentication', 'RESTful API Routing', 'Relational PostgreSQL Schemas', 'State Management'],
    techStack: ['React / Next.js', 'Node.js / Express or FastAPI', 'PostgreSQL', 'Tailwind CSS'],
    milestones: [
      { title: 'Milestone 1: Database Schema & Auth', description: 'Design users, products, and orders tables with hashed passwords.' },
      { title: 'Milestone 2: Secure REST Endpoints', description: 'Create protected CRUD routes with token verification middleware.' },
      { title: 'Milestone 3: Interactive Frontend Storefront', description: 'Build product catalog, search filters, and shopping cart.' }
    ],
    starterGuideUrl: 'https://www.freecodecamp.org/news/learn-the-mern-stack-by-building-an-ecommerce-app/'
  },
  {
    id: 'proj-int-churn-ml',
    title: 'Customer Churn Prediction & Model API',
    level: 'Intermediate',
    category: 'Machine Learning',
    summary: 'Train a machine learning classification model to identify users likely to cancel subscriptions, deployed as a REST microservice.',
    skillsDeveloped: ['Exploratory Feature Engineering', 'Scikit-Learn Random Forests', 'ROC-AUC Evaluation', 'FastAPI Deployment'],
    techStack: ['Python', 'Scikit-learn', 'FastAPI', 'Docker', 'Pandas'],
    milestones: [
      { title: 'Milestone 1: Exploratory Analysis', description: 'Identify high-correlation churn signals from customer usage data.' },
      { title: 'Milestone 2: Model Training & Tuning', description: 'Compare Logistic Regression vs Random Forest with cross-validation.' },
      { title: 'Milestone 3: FastAPI Web Service', description: 'Serialize model with joblib and create a /predict endpoint in Docker.' }
    ],
    starterGuideUrl: 'https://www.kaggle.com/learn/intro-to-machine-learning'
  },
  {
    id: 'proj-int-network-scan',
    title: 'Network Port Scanner & Vulnerability Reporter',
    level: 'Intermediate',
    category: 'Cybersecurity',
    summary: 'A Python command-line utility that inspects local network services, identifies open TCP ports, and flags unencrypted services.',
    skillsDeveloped: ['Socket Programming', 'TCP/IP Handshake Analysis', 'Multi-Threading for Speed', 'Security Auditing'],
    techStack: ['Python Sockets', 'Threading', 'Rich CLI Library'],
    milestones: [
      { title: 'Milestone 1: Single-Threaded Socket Ping', description: 'Connect to standard ports (80, 443, 22) and check connection states.' },
      { title: 'Milestone 2: Concurrent Multi-Threading', description: 'Scan port ranges 1-1024 concurrently with sub-second timeouts.' },
      { title: 'Milestone 3: Banner Grabbing & Output Table', description: 'Grab service banners and output a formatted terminal security report.' }
    ],
    starterGuideUrl: 'https://www.freecodecamp.org/news/how-to-build-a-port-scanner-in-python/'
  },

  // Advanced Projects
  {
    id: 'proj-adv-rag-ai',
    title: 'AI Document Knowledge Base (RAG System)',
    level: 'Advanced',
    category: 'Artificial Intelligence & Systems',
    summary: 'A Retrieval-Augmented Generation (RAG) assistant that indexes technical PDF textbooks and answers semantic questions with source citations.',
    skillsDeveloped: ['Vector Embeddings', 'Vector Databases (Chroma/FAISS)', 'LLM Integration', 'Prompt Architecture'],
    techStack: ['Python', 'LangChain or LlamaIndex', 'ChromaDB', 'FastAPI', 'React'],
    milestones: [
      { title: 'Milestone 1: PDF Ingestion & Chunking', description: 'Parse documents into chunked passages with overlapping windows.' },
      { title: 'Milestone 2: Vector Embedding & Indexing', description: 'Generate high-dimensional embeddings and store in a vector database.' },
      { title: 'Milestone 3: Retrieval & Grounded Generation', description: 'Retrieve top-k similar chunks and synthesize grounded answers with citations.' }
    ],
    starterGuideUrl: 'https://www.cloudskillsboost.google/course_templates/536'
  },
  {
    id: 'proj-adv-microservices',
    title: 'Event-Driven Cloud Microservices Architecture',
    level: 'Advanced',
    category: 'Cloud & DevOps',
    summary: 'An event-driven distributed system with service discovery, message queues, Docker compose, and automated CI/CD deployment.',
    skillsDeveloped: ['Asynchronous Message Brokers', 'Docker Container Orchestration', 'API Gateway Routing', 'Distributed Tracing'],
    techStack: ['Go or Node.js', 'RabbitMQ / Kafka', 'Docker & Kubernetes', 'GitHub Actions'],
    milestones: [
      { title: 'Milestone 1: Service Decomposition', description: 'Create isolated Auth, Order, and Notification microservices.' },
      { title: 'Milestone 2: Message Queue Decoupling', description: 'Publish and consume asynchronous order events via message brokers.' },
      { title: 'Milestone 3: Dockerized Cluster & CI/CD', description: 'Configure docker-compose and automated GitHub Actions testing.' }
    ],
    starterGuideUrl: 'https://explore.skillbuilder.aws/'
  }
];
