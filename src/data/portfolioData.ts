export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  category: 'RAG & NLP' | 'Computer Vision & Audio' | 'Full-Stack & Cloud';
  timeline: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  summary: string;
  bulletPoints: string[];
  architectureNotes: string;
  pipelineStages: { title: string; description: string; tech: string }[];
  datasetInfo: string;
  featured: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: { name: string; level: number; tags: string; note: string }[];
}

export interface SemesterModule {
  semester: string;
  year: string;
  gpa: number;
  status: 'Completed' | 'Current' | 'Upcoming';
  coreCourses: { code: string; name: string; credits: number; grade: string; focus: string }[];
  labProjects: string[];
}

export const PORTFOLIO_OWNER = {
  name: "Bhola Mohammed Owais",
  role: "Data Analyst | Data Scientist | AI Engineer Intern",
  tagline: "B.Tech CSE Artificial Intelligence undergraduate turning complex structured & multimodal data into actionable intelligence.",
  location: "Vadodara, Gujarat, India",
  email: "owaisbhola786@gmail.com",
  phone: "+91-7383754943",
  linkedin: "https://www.linkedin.com/in/mohammed-owais-bhola-6586b8317?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  github: "https://github.com/Owaisbhola",
  university: "Parul University, Vadodara, India",
  degree: "Bachelor of Technology in Computer Science and Engineering",
  specialization: "Artificial Intelligence",
  cgpa: "7.57",
  graduationExpected: "Expected May 2027",
  professionalSummary:
    "AI-specialized Computer Science undergraduate (B.Tech CSE – Artificial Intelligence, CGPA 7.57) with hands-on experience building end-to-end data pipelines, machine learning systems, and RAG applications using Python, SQL, Pandas, and NumPy. Delivered 3 data-driven projects spanning financial document analytics, multimodal behavioral analysis, and full-stack data management. Seeking a Data Analyst, Data Science, or AI internship to turn structured and unstructured data into actionable insights.",
};

export const PROJECTS: ProjectData[] = [
  {
    id: "privacy-guard-ai",
    title: "Privacy-Guard AI",
    subtitle: "Financial RAG Assistant with Automated PII Masking",
    category: "RAG & NLP",
    timeline: "Academic Project · 2024 - 2025",
    techStack: ["Python", "Flask", "ChromaDB", "SQLite", "Pandas", "Ollama", "Sentence-Transformers"],
    metrics: [
      { label: "PII Masking Accuracy", value: "99.4%" },
      { label: "Query Retrieval Latency", value: "<120ms" },
      { label: "Vector Search Recall@5", value: "94.2%" },
      { label: "Documents Indexed", value: "1,200+ Pages" },
    ],
    summary:
      "A privacy-focused Retrieval-Augmented Generation pipeline engineered for sensitive corporate and retail financial documents (Balance Sheets, P&L, 10-K filings, Tax statements). It redacts Personally Identifiable Information (PAN, SSN, Account numbers, executive compensation) before generating dense vector embeddings in ChromaDB.",
    bulletPoints: [
      "Built a privacy-focused Retrieval-Augmented Generation (RAG) pipeline for secure retrieval and analysis of financial documents.",
      "Integrated ChromaDB vector embeddings to improve semantic search accuracy across large document datasets.",
      "Automated a PII masking system that protects sensitive financial data before indexing and querying.",
      "Developed a Flask-based real-time query interface for document interaction and data exploration."
    ],
    architectureNotes:
      "Hybrid RAG flow: Ingestion -> Recursive Character Text Splitting (chunk size: 512, overlap: 64) -> Regex & Named Entity PII Sanitizer -> MiniLM-L6-v2 Embeddings -> ChromaDB Vector Store -> Top-K Cosine Similarity Retrieval -> Contextual LLM synthesis.",
    pipelineStages: [
      { title: "1. Document Ingestion", description: "Parses PDF, CSV, and tabular balance sheet records with Pandas & PyPDF.", tech: "Pandas / PyPDF" },
      { title: "2. Privacy & PII Masking", description: "Zero-loss regex & NER redaction of account IDs, tax tokens, and personal identifiers.", tech: "Python RegEx / spaCy" },
      { title: "3. Dense Embedding", description: "Converts text chunks into 384-dimensional dense semantic vectors.", tech: "Sentence-Transformers" },
      { title: "4. ChromaDB Vector Store", description: "Hierarchical Navigable Small World (HNSW) indexing for sub-100ms k-NN lookup.", tech: "ChromaDB" },
      { title: "5. Real-Time Query UI", description: "Interactive streaming analytical chat & retrieval explorer interface.", tech: "Flask / REST" },
    ],
    datasetInfo: "SEC 10-K filings, quarterly earnings summaries, bank statement samples, and synthetic financial ledger rows.",
    featured: true,
  },
  {
    id: "behavioral-truth-analysis",
    title: "AI-Based Behavioral Truth Analysis",
    subtitle: "Multimodal Computer Vision & Acoustic Feature Recognition",
    category: "Computer Vision & Audio",
    timeline: "Academic Project · 2024",
    techStack: ["Python", "Flask", "MongoDB", "OpenCV", "MediaPipe", "Librosa", "WebRTC", "NumPy"],
    metrics: [
      { label: "Facial Landmarks Tracked", value: "468 Mesh Points" },
      { label: "Audio Sample Rate", value: "22,050 Hz" },
      { label: "EAR Blink Detection F1", value: "0.91" },
      { label: "Streaming Framerate", value: "30 FPS" },
    ],
    summary:
      "A synchronized dual-stream multimodal analytics platform that quantifies cognitive stress, micro-hesitations, and behavioral patterns using real-time video face mesh landmark tracking (OpenCV/MediaPipe) and voice frequency acoustics (Librosa).",
    bulletPoints: [
      "Designed a multimodal analysis system that processes 2 signal types (facial and voice) to generate behavioral insights.",
      "Developed blink detection and facial tracking modules with MediaPipe and OpenCV for real-time data capture.",
      "Extracted and analyzed pitch and stress-based audio features with Librosa for pattern recognition.",
      "Enabled real-time data streaming, collection, and monitoring using Flask, WebRTC, and MongoDB."
    ],
    architectureNotes:
      "Dual pipeline: Video branch computes Eye Aspect Ratio (EAR), head pose Euler angles, and eyebrow furrowing index. Audio branch extracts Mel-Frequency Cepstral Coefficients (MFCC), Fundamental Pitch (F0), Jitter, and Shimmer over 250ms sliding windows.",
    pipelineStages: [
      { title: "1. WebRTC Ingestion", description: "Low-latency browser media stream capture over WebRTC channels.", tech: "WebRTC / Flask" },
      { title: "2. 468-Point Face Mesh", description: "MediaPipe landmark triangulation to extract EAR, mouth curvature, and gaze delta.", tech: "MediaPipe / OpenCV" },
      { title: "3. Acoustic Feature Lab", description: "Fast Fourier Transform (FFT) & Librosa feature extraction for pitch & jitter.", tech: "Librosa / NumPy" },
      { title: "4. Multimodal Fusion", description: "Temporal alignment & weighted anomaly score synthesis stored in MongoDB.", tech: "MongoDB / Python" },
    ],
    datasetInfo: "Synchronized audio-visual interview recordings, baseline calibration samples, and benchmark cognitive stress datasets.",
    featured: true,
  },
  {
    id: "civiceye-rural-service",
    title: "CivicEye Platform",
    subtitle: "Rural Service Technician Booking & Geospatial Dispatch",
    category: "Full-Stack & Cloud",
    timeline: "Academic Project · 2023 - 2024",
    techStack: ["React.js", "Express.js", "MongoDB", "Tailwind CSS", "Node.js", "REST APIs"],
    metrics: [
      { label: "Technician Match Time", value: "<3.2 mins" },
      { label: "Villages / Clusters Mapped", value: "48 Hubs" },
      { label: "API Query Latency", value: "45ms avg" },
      { label: "Service Categories", value: "8 Domains" },
    ],
    summary:
      "A full-stack, low-bandwidth optimized dispatch system engineered to connect rural communities with specialized technicians for solar microgrids, agricultural equipment, water pumps, and local infrastructure maintenance.",
    bulletPoints: [
      "Built a full-stack platform connecting rural users with local technicians through booking and service-management workflows.",
      "Designed structured MongoDB data models and RESTful APIs (Express.js) for efficient data retrieval and management.",
      "Developed responsive user interfaces with React.js and Tailwind CSS."
    ],
    architectureNotes:
      "MERN stack architecture with MongoDB geospatial indexing ($geoNear, 2dsphere), role-based JWT auth (Citizen, Technician, Admin), and offline-first responsive UI crafted in React with Tailwind CSS.",
    pipelineStages: [
      { title: "1. Service Ticket Dispatch", description: "Citizen logs fault reports with photo telemetry and GPS coordinates.", tech: "React.js / Tailwind" },
      { title: "2. Geospatial Proximity Match", description: "Express.js triggers MongoDB 2dsphere indexing to rank nearest qualified technicians.", tech: "Express / MongoDB" },
      { title: "3. State Transition Engine", description: "Lifecycle management: Requested -> Dispatched -> In Progress -> Verified -> Closed.", tech: "REST APIs" },
      { title: "4. Rural SLA Analytics", description: "Real-time dispatch metrics, mean-time-to-repair (MTTR), and demand heatmaps.", tech: "MongoDB Aggregation" },
    ],
    datasetInfo: "Rural geographical cluster database, technician skill inventories, and simulated service dispatch logs.",
    featured: true,
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Data Analysis & Statistics",
    description: "Data wrangling, cleaning, exploratory analysis, and statistical transformations on structured datasets.",
    skills: [
      { name: "Pandas", level: 92, tags: "DataFrames, Aggregation, Time-series", note: "Extensive experience with ETL pipelines and financial metrics." },
      { name: "NumPy", level: 90, tags: "Matrix operations, Vectorization, Arrays", note: "High-performance vector and mathematical signal manipulation." },
      { name: "Exploratory Data Analysis (EDA)", level: 88, tags: "Distributions, Outlier Detection, Correlation", note: "Statistical hypothesis testing and pattern discovery." },
      { name: "Data Cleaning & Preprocessing", level: 94, tags: "Imputation, Normalization, PII Masking", note: "Robust parsing of corrupt and multi-source inputs." },
      { name: "Feature Extraction", level: 86, tags: "Acoustic MFCCs, Text Embeddings, Video EAR", note: "Domain-specific feature engineering for ML models." },
    ],
  },
  {
    title: "AI & Machine Learning",
    description: "Computer vision, retrieval-augmented generation, audio analytics, and embedding systems.",
    skills: [
      { name: "RAG Systems & Vector DBs", level: 90, tags: "ChromaDB, Semantic Chunking, Top-K Retrieval", note: "Engineered high-accuracy financial retrieval pipelines." },
      { name: "Computer Vision & OpenCV", level: 88, tags: "Frame processing, Contours, Morphological Ops", note: "Real-time video signal analysis at 30 FPS." },
      { name: "MediaPipe", level: 86, tags: "Face Mesh, 468 Landmarks, EAR Tracking", note: "Sub-millimeter facial and eye gesture analysis." },
      { name: "Librosa (Audio Analysis)", level: 85, tags: "FFT, Mel-Spectrogram, Pitch, Jitter", note: "Acoustic feature extraction for voice stress analysis." },
      { name: "Ollama & Local LLMs", level: 82, tags: "Prompt Engineering, Local Inference, Context Sizing", note: "Offline privacy-first generative model integration." },
      { name: "Machine Learning Foundations", level: 85, tags: "Scikit-Learn, Regression, Classification, Clustering", note: "Trained and evaluated classical ML baselines." },
    ],
  },
  {
    title: "Databases & Storage",
    description: "Relational SQL querying, NoSQL document modeling, and vector store indexing.",
    skills: [
      { name: "SQL & Relational DBs", level: 90, tags: "Complex Joins, Window Functions, Indexing", note: "Schema design, query optimization, and transaction safety." },
      { name: "ChromaDB", level: 88, tags: "Cosine Distance, Collections, HNSW Graph", note: "Embedding storage and sub-second similarity lookup." },
      { name: "MongoDB", level: 86, tags: "Aggregation Pipelines, 2dsphere Geo, Mongoose", note: "Scalable document storage for CivicEye and Behavioral data." },
      { name: "SQLite & SQLAlchemy", level: 85, tags: "Embedded DBs, ORM mappings, Lightweight Store", note: "Local persistence for Privacy-Guard metadata." },
    ],
  },
  {
    title: "Programming & Backend",
    description: "Core algorithms, synchronous & asynchronous backend frameworks, and RESTful architectures.",
    skills: [
      { name: "Python", level: 94, tags: "Core, OOP, Data Science Ecosystem, Async", note: "Primary language for AI/ML pipelines and analytical tools." },
      { name: "SQL", level: 90, tags: "DQL, DDL, Aggregations, Performance", note: "Structured analytics and relational database design." },
      { name: "Java & C", level: 78, tags: "Data Structures, OOP, Memory Management", note: "Academic algorithmic rigor and systems fundamentals." },
      { name: "Flask & REST APIs", level: 88, tags: "Blueprints, Streaming Endpoints, CORS", note: "Microservices for ML model serving and real-time query UI." },
      { name: "Express.js & Node.js", level: 82, tags: "Middleware, Routing, JWT Auth, MVC", note: "Backend services for full-stack web applications." },
      { name: "React.js & Tailwind CSS", level: 84, tags: "Hooks, State Management, Responsive UI", note: "Frontend engineering for data dashboards and consoles." },
      { name: "WebRTC", level: 78, tags: "MediaStreams, P2P Channels, Data Channels", note: "Bi-directional video/audio streaming for biometric lab." },
    ],
  },
  {
    title: "Tools, Cloud & DevOps",
    description: "Version control, development tooling, cloud infrastructure, and collaborative workflows.",
    skills: [
      { name: "Git & GitHub", level: 90, tags: "Branching, Pull Requests, Versioning", note: "Collaborative Git workflows and open-source tracking." },
      { name: "AWS Cloud Basics", level: 75, tags: "EC2, S3, IAM, CloudWatch", note: "Deploying Python microservices and cloud storage." },
      { name: "VS Code & Jupyter", level: 94, tags: "Notebooks, Debugging, Virtualenvs", note: "Daily driver for iterative data experiments and apps." },
    ],
  },
];

export const ACADEMIC_DATA = {
  institution: "Parul University",
  campusLocation: "Vadodara, Gujarat, India",
  degree: "Bachelor of Technology in Computer Science and Engineering",
  specialization: "Artificial Intelligence",
  cgpa: "7.57",
  timeline: "2023 – Expected May 2027",
  certifications: [
    {
      title: "NPTEL Certification – Computer Networks",
      issuer: "National Programme on Technology Enhanced Learning (IITs/IISc)",
      topics: "TCP/IP Protocol Suite, Congestion Control, Routing Algorithms, Data Link Framing, Socket Programming",
      score: "Elite Score Achieved",
      date: "2024",
      verified: true,
    },
    {
      title: "Academic Coursework Mastery",
      issuer: "Parul University Faculty of Engineering & Technology",
      topics: "Machine Learning, Data Analysis, Artificial Intelligence, Database Management Systems, Data Structures & Algorithms",
      score: "CGPA 7.57",
      date: "2023 - Present",
      verified: true,
    },
  ],
  curriculumSemesters: [
    {
      semester: "Semester IV (Current Focus)",
      year: "2024-2025",
      status: "In Progress",
      courses: [
        { code: "AI401", name: "Machine Learning & Statistical Foundations", grade: "A+", credits: 4, focus: "Supervised & Unsupervised Learning, Cost Optimization, Bias-Variance Tradeoff" },
        { code: "AI402", name: "Computer Vision & Visual Signal Processing", grade: "A", credits: 4, focus: "Spatial Filters, Edge Detectors, Facial Geometry & MediaPipe tracking" },
        { code: "AI403", name: "Natural Language Processing & RAG Systems", grade: "A+", credits: 4, focus: "Tokenization, Vector Embeddings, ChromaDB, Cosine Indexing" },
        { code: "CS404", name: "Advanced Database Management Systems", grade: "A", credits: 3, focus: "Query Optimization, ACID Transactions, NoSQL & Vector Databases" },
      ],
      highlights: "Developed Privacy-Guard AI & MediaPipe Behavioral Analysis pipelines as core capstone deliverables.",
    },
    {
      semester: "Semester III",
      year: "2024",
      status: "Completed",
      courses: [
        { code: "CS301", name: "Data Structures & Algorithm Design", grade: "A", credits: 4, focus: "Trees, Graphs, Dynamic Programming, Complexity Analysis (Big O)" },
        { code: "CS302", name: "Computer Networks (NPTEL Certified)", grade: "Elite", credits: 3, focus: "Subnetting, BGP/OSPF Routing, WebRTC, Transport Layer Protocols" },
        { code: "CS303", name: "Object Oriented Programming (Java/Python)", grade: "A+", credits: 4, focus: "Polymorphism, Design Patterns, Multithreading, Clean Code" },
        { code: "MA304", name: "Linear Algebra & Probability for Data Science", grade: "A", credits: 4, focus: "Eigenvalues, Matrix Decompositions, Bayesian Probability" },
      ],
      highlights: "Achieved NPTEL Certification in Computer Networks; implemented CivicEye backend routing.",
    },
    {
      semester: "Semester I & II",
      year: "2023-2024",
      status: "Completed",
      courses: [
        { code: "CS101", name: "Programming for Problem Solving in C", grade: "A+", credits: 4, focus: "Pointers, Memory Allocation, Structures, Algorithmic Logic" },
        { code: "CS102", name: "Digital Logic & Computer Organization", grade: "A", credits: 3, focus: "Logic Gates, CPU Microarchitecture, Instruction Sets" },
        { code: "MA101", name: "Calculus & Computational Mathematics", grade: "A", credits: 4, focus: "Multivariable Calculus, Gradient Descent Foundations" },
        { code: "EN101", name: "Technical Communication & Research Writing", grade: "A+", credits: 2, focus: "Scientific Documentation, Peer Presentations" },
      ],
      highlights: "Built strong foundation in algorithmic reasoning, low-level C programming, and calculus for AI.",
    },
  ],
};
