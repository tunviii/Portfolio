import { Experience, Project, SkillCategory } from "./types";

export const experiences: Experience[] = [
  {
    role: "Full Stack Developer Intern",
    company: "Rengy",
    duration: "June 2026 – July 2026",
    description: "Contributed to the modernization of a MERN-based web platform by developing reusable full-stack features and APIs as part of its migration to a microservices architecture.",
    technologies: ["React", "TypeScript", "shadcn/ui", "Tailwind CSS", "Fastify", "MongoDB"],
    contributions: [
      "Built independent services to contribute to the shift from a monolithic architecture to a microservices-based system, improving maintainability and scalability.",
      "Developed reusable features, implemented REST APIs with Fastify, and optimized database queries to enhance performance and user experience.",
      "Integrated React and TypeScript frontend components with Node.js and Fastify backend services."
    ]
  }
];

export const projects: Project[] = [
  {
    title: "PrepForge",
    description:
      "An AI-powered full-stack mock interview platform that simulates technical interviews through text, voice, and video while providing intelligent resume analysis, automated evaluation, and personalized performance insights.",
    image: "prepforge",
    tags: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Firebase",
      "Groq",
      "WebRTC",
      "Recharts"
    ],
    highlights: [
      "Built an end-to-end interview platform supporting text, voice, and video interviews with WebRTC and AI-driven evaluation.",
      "Developed an AI Resume Analyzer featuring ATS scoring, grammar analysis, LLM feedback, and support for PDF, DOCX, and LaTeX resumes.",
      "Designed analytics dashboards with interview trends, topic-wise scoring, heatmaps, and performance tracking."
    ],
    githubUrl: "https://github.com/tunviii/PrepForge"
  },

  {
  title: "Wok & Roll",
  description:
    "A full-stack mobile food ordering platform built with React Native and Expo, designed for customers, administrators, and kitchen staff with role-based workflows and real-time order management.",

  image: "wokroll",

  tags: [
    "React Native",
    "Expo",
    "TypeScript",
    "Node.js",
    "Express",
    "MongoDB",
    "JWT",
    "Tailwind CSS"
  ],

  highlights: [
    "Developed a complete customer ordering experience with menu browsing, cart management, checkout, and live order tracking.",
    "Built dedicated admin and kitchen dashboards supporting menu management, availability controls, and real-time order processing.",
    "Designed a secure backend using JWT authentication, MongoDB, Express, and Zod validation with role-based API authorization."
  ],

  githubUrl: "https://github.com/tunviii/food-truck-mobile"
},

  {
    title: "Behavioral Data Analysis",
    description:
      "A statistical data analysis project exploring the relationship between screen time, sleep quality, exercise, and mental wellness using Python and scientific computing libraries.",
    image: "wellness",
    tags: [
      "Python",
      "Pandas",
      "NumPy",
      "SciPy",
      "Matplotlib",
      "Seaborn"
    ],
    highlights: [
      "Performed statistical analysis using ANOVA and IQR-based outlier detection across 400+ behavioral data samples.",
      "Created multi-dimensional visualizations including bubble plots, pair plots, and correlation analyses.",
      "Identified exercise as one of the strongest predictors of improved wellness through data-driven insights."
    ],
    githubUrl: "https://github.com/tunviii/Screentime-vs-Mental-Wellness"
  }
];

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    skills: ["React 19", "Bootstrap", "TypeScript", "Tailwind CSS", "HTML", "CSS", "shadcn/ui", "Recharts", "WebRTC"]
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "Python", "Fastify", "RESTful APIs"]
  },
  {
    category: "AI",
    skills: ["Python", "NumPy", "Pandas", "Matplotlib", "Seaborn", "Groq API", "Language Tool"]
  },
  {
    category: "Databases",
    skills: ["MongoDB", "SQL", "PostgreSQL", "Firestore"]
  },
  {
    category: "Cloud & Tools",
    skills: ["AWS S3", "Git", "GitHub", "VS Code", "Postman"]
  },
  {
    category: "Languages",
    skills: ["C", "C++", "Python", "Java", "JavaScript"]
  }
];
