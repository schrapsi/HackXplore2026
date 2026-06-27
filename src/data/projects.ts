import type { Project } from '../types';

export const sampleProjects: Project[] = [
  {
    id: 'p1',
    title: 'Clean Water Infrastructure',
    description: 'Build sustainable solar-powered water filtration systems for remote villages, providing access to clean drinking water and reducing waterborne diseases.',
    location: 'Sub-Saharan Africa',
    category: ['water', 'health', 'infrastructure'],
    budgetTier: ['50k-100k', '100k-200k'],
    imageUrl: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&q=80&w=800',
    impactMetric: 'Provides clean water to 5,000+ people daily',
  },
  {
    id: 'p2',
    title: 'Urban Reforestation Initiative',
    description: 'Transform abandoned urban spaces into lush, self-sustaining micro-forests to combat urban heat islands and improve local air quality.',
    location: 'Berlin, Germany',
    category: ['environment', 'nature', 'climate'],
    budgetTier: ['20k-50k', '50k-100k'],
    imageUrl: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=800',
    impactMetric: 'Plants 10,000 native trees and shrubs',
  },
  {
    id: 'p3',
    title: 'Tech Education for Underprivileged Youth',
    description: 'Equip local community centers with high-speed internet, modern laptops, and provide 12-month coding bootcamps for underprivileged teenagers.',
    location: 'Global (Online & Local hubs)',
    category: ['education', 'tech', 'youth'],
    budgetTier: ['20k-50k', '50k-100k', '100k-200k', '200k+'],
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
    impactMetric: 'Sponsors 200 students per cohort',
  },
  {
    id: 'p4',
    title: 'Ocean Plastic Cleanup Fleet',
    description: 'Deploy autonomous, solar-powered drones to collect plastic waste in high-density pollution zones across the Pacific Ocean.',
    location: 'Pacific Ocean',
    category: ['ocean', 'environment', 'technology'],
    budgetTier: ['100k-200k', '200k+'],
    imageUrl: 'https://images.unsplash.com/photo-1621451537084-482c73073e0f?auto=format&fit=crop&q=80&w=800',
    impactMetric: 'Removes 50 tons of plastic annually',
  }
];

// Scaffold function simulating AI processing of user input
export const processUserInput = (prompt: string, budget: string): Project[] => {
  const lowercasePrompt = prompt.toLowerCase();
  
  // 1. Filter by budget first
  const budgetMatched = sampleProjects.filter(p => p.budgetTier.includes(budget));
  
  // 2. Simulate AI matching by checking if prompt keywords match categories/description
  // In reality, this would be an API call to an LLM returning matching project IDs.
  const scoredProjects = budgetMatched.map(project => {
    let score = 0;
    project.category.forEach(cat => {
      if (lowercasePrompt.includes(cat)) score += 2;
    });
    if (lowercasePrompt.includes(project.location.toLowerCase())) score += 1;
    
    // If prompt is very short or generic, give a base score so we still show options
    if (score === 0 && lowercasePrompt.length < 10) score = 1;
    
    return { ...project, score };
  });

  // Sort by score descending and return
  const sorted = scoredProjects.sort((a, b) => b.score - a.score);
  
  // If no keyword matched but we have budget matches, just return the budget matches
  if (sorted.length > 0 && sorted[0].score > 0) {
     return sorted.map(({ score: _, ...project }) => project);
  }
  
  return budgetMatched;
};
