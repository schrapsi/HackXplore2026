import type { Project } from '../types';

export const sampleProjects: Project[] = [
  {
    id: 'p1',
    title: 'Drinking Fountains and Heat Protection for Karlsruhe',
    description: 'Install drinking fountains, shade trees, and water-efficient greenery on schoolyards, sports facilities, and overheated street areas.',
    location: 'Karlsruhe',
    category: ['wasser', 'gesundheit', 'infrastruktur', 'hitzeschutz', 'klima', 'karlsruhe', 'water', 'health', 'infrastructure', 'climate'],
    budgetTier: ['50k-100k', '100k-200k'],
    imageUrl: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&q=80&w=800',
    impactMetric: 'Creates 25 drinking water points and cools 15 school and club spaces',
  },
  {
    id: 'p2',
    title: 'Nature-Friendly Sports and Football Fields',
    description: 'Modernize football and multi-use sports fields with unsealed green edges, safer lighting, drinking water points, and inclusive training times.',
    location: 'Ettlingen, Rheinstetten & Stutensee',
    category: ['sport', 'fußball', 'fussball', 'jugend', 'vereine', 'inklusion', 'umwelt', 'ettlingen', 'rheinstetten', 'stutensee', 'football', 'youth', 'environment'],
    budgetTier: ['20k-50k', '50k-100k'],
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800',
    impactMetric: 'Improves 12 club facilities for around 3,500 children and young people',
  },
  {
    id: 'p3',
    title: 'Digital Opportunities for Young People',
    description: 'Provide coding workshops, loaner laptops, and mentoring in youth centers, schools, and libraries for young people with limited access to digital education.',
    location: 'Pforzheim, Bruchsal & Bretten',
    category: ['bildung', 'technik', 'jugend', 'coding', 'mentoring', 'pforzheim', 'bruchsal', 'bretten', 'education', 'tech', 'youth'],
    budgetTier: ['20k-50k', '50k-100k', '100k-200k', '200k-500k', '500k+'],
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
    impactMetric: 'Reaches 240 young people per year with devices, workshops, and mentoring',
  },
  {
    id: 'p4',
    title: 'Clean and Living Rhine Floodplains',
    description: 'Run cleanup events, install plastic traps, and restore small riverbank habitats along the Rhine and Alb with local schools and clubs.',
    location: 'Rastatt, Philippsburg & Karlsruhe',
    category: ['rhein', 'alb', 'wasser', 'umwelt', 'plastik', 'natur', 'rastatt', 'philippsburg', 'karlsruhe', 'environment', 'nature', 'water'],
    budgetTier: ['100k-200k', '200k-500k', '500k+'],
    imageUrl: 'https://images.unsplash.com/photo-1621451537084-482c73073e0f?auto=format&fit=crop&q=80&w=800',
    impactMetric: 'Removes 35 tons of waste per year and restores 6 riverbank sections',
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
