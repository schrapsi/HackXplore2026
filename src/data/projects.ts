import type { Project } from '../types';

export const sampleProjects: Project[] = [
  {
    id: 'p1',
    title: 'Infrastruktur für sauberes Wasser',
    description: 'Aufbau nachhaltiger, solarbetriebener Wasserfiltersysteme für abgelegene Dörfer, damit Menschen Zugang zu sauberem Trinkwasser erhalten und wasserbedingte Krankheiten zurückgehen.',
    location: 'Subsahara-Afrika',
    category: ['wasser', 'gesundheit', 'infrastruktur', 'water', 'health', 'infrastructure'],
    budgetTier: ['50k-100k', '100k-200k'],
    imageUrl: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&q=80&w=800',
    impactMetric: 'Versorgt täglich mehr als 5.000 Menschen mit sauberem Wasser',
  },
  {
    id: 'p2',
    title: 'Initiative zur urbanen Wiederaufforstung',
    description: 'Umwandlung verlassener Stadtflächen in üppige, selbsttragende Mikrowälder, um Hitzeinseln zu reduzieren und die lokale Luftqualität zu verbessern.',
    location: 'Berlin, Deutschland',
    category: ['umwelt', 'natur', 'klima', 'environment', 'nature', 'climate'],
    budgetTier: ['20k-50k', '50k-100k'],
    imageUrl: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=800',
    impactMetric: 'Pflanzt 10.000 einheimische Bäume und Sträucher',
  },
  {
    id: 'p3',
    title: 'Technikbildung für benachteiligte Jugendliche',
    description: 'Ausstattung lokaler Gemeindezentren mit schnellem Internet und modernen Laptops sowie zwölfmonatige Coding-Bootcamps für benachteiligte Jugendliche.',
    location: 'Weltweit (online & lokale Zentren)',
    category: ['bildung', 'technik', 'jugend', 'education', 'tech', 'youth'],
    budgetTier: ['20k-50k', '50k-100k', '100k-200k', '200k+'],
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
    impactMetric: 'Fördert 200 Teilnehmende pro Kursgruppe',
  },
  {
    id: 'p4',
    title: 'Flotte zur Beseitigung von Plastik im Meer',
    description: 'Einsatz autonomer, solarbetriebener Drohnen, die Plastikmüll in stark verschmutzten Zonen des Pazifischen Ozeans einsammeln.',
    location: 'Pazifischer Ozean',
    category: ['meer', 'ozean', 'umwelt', 'technologie', 'ocean', 'environment', 'technology'],
    budgetTier: ['100k-200k', '200k+'],
    imageUrl: 'https://images.unsplash.com/photo-1621451537084-482c73073e0f?auto=format&fit=crop&q=80&w=800',
    impactMetric: 'Entfernt jährlich 50 Tonnen Plastik',
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
