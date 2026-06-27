export const ImpactCategory = {
  LocalCommunitySupport: 'local-community-support',
  Education: 'education',
  HealthAndMedicalCare: 'health-and-medical-care',
  PovertyAndBasicNeeds: 'poverty-and-basic-needs',
  ChildrenAndFamilies: 'children-and-families',
  ClimateAndEnvironment: 'climate-and-environment',
  AnimalWelfare: 'animal-welfare',
  DisasterRelief: 'disaster-relief',
  ArtsCultureAndPublicSpaces: 'arts-culture-and-public-spaces',
  OpenSourcePublicGoodTechnology: 'open-source-public-good-technology',
  SportsAndYouthDevelopment: 'sports-and-youth-development',
  ResearchAndInnovation: 'research-and-innovation',
} as const;

export type ImpactCategory = typeof ImpactCategory[keyof typeof ImpactCategory];

export interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  primaryCategory: ImpactCategory;
  categoryLabel: string;
  category: string[];
  budgetTier: string[];
  imageUrl: string;
  impactMetric: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  fundedProjects: {
    projectId: string;
    amountCommitted: string;
    date: string;
  }[];
}
