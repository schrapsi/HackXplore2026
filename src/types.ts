export interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string[];
  budgetTier: string[];
  imageUrl: string;
  impactMetric: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  fundedProjects: {
    projectId: string;
    amountCommitted: string;
    date: string;
  }[];
}

export interface ProjectUpdate {
  id: string;
  projectId: string;
  title: string;
  description: string;
  imageUrl?: string;
  date: string;
}

