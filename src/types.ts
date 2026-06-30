export interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string;
  technologies: string[];
  contributions: string[];
}

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  highlights: string[];
  githubUrl: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}
