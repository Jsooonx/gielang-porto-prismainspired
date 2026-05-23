export interface TextSegment {
  text: string;
  className?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: 'python' | 'flask-web' | 'c-cpp';
  techStack: string[];
  githubLink?: string;
  demoLink?: string;
  details?: string[];
  image?: string;
  featured: boolean;
}

export interface Achievement {
  id: string;
  year: string;
  title: string;
  role?: string;
  description: string;
  details?: string[];
  category: 'achievement' | 'activity';
}
