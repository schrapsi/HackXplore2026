import type { ProjectUpdate } from '../types';

export const sampleUpdates: ProjectUpdate[] = [
  // Karlsruhe After-School Maker Club
  {
    id: 'karlsruhe-maker-1',
    projectId: 'karlsruhe-kids-maker-club',
    title: 'Robotics Kits and Tool Carts Checked In',
    description: 'The first hardware batch arrived in Durlach: robotics kits, microcontrollers, hand tools, safety goggles, and labeled storage boxes. Volunteers tested the parts, logged serial numbers, and packed the first project bins for the opening workshops.',
    imageUrl: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'karlsruhe-maker-2',
    projectId: 'karlsruhe-kids-maker-club',
    title: 'Workshop Room Set Up for After-School Sessions',
    description: 'The room layout is now ready for small groups: tables were moved into team islands, cable covers were installed, shelves were labeled, and a quiet homework corner was set aside so children can switch between study time and hands-on building.',
    imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800',
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'karlsruhe-maker-3',
    projectId: 'karlsruhe-kids-maker-club',
    title: 'Mentors Prepared the First Four Projects',
    description: 'Local mentors finalized the starter sessions: LED name badges, simple cardboard robots, sensor-based plant monitors, and a collaborative marble run. The plan keeps tools low-risk for younger children while giving older students room to extend each build.',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },

  // p1: Clean Water Infrastructure
  {
    id: 'u1-1',
    projectId: 'p1',
    title: 'First Water Filter Installed in Village A',
    description: 'Local water committees have successfully set up the first solar filtration system. Clean, safe water is now running for 1,200 villagers, drastically reducing waterborne diseases in the area.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
  {
    id: 'u1-2',
    projectId: 'p1',
    title: 'Solar Panels & Pump Delivery',
    description: 'The solar components and submersible pumps arrived safely at our regional hub in Sub-Saharan Africa. Engineering teams are mobilizing for transport to the villages.',
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800',
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
  },
  {
    id: 'u1-3',
    projectId: 'p1',
    title: 'Funding Cleared & Engineering Commenced',
    description: 'Funds have been received and distributed to local contractors. Ground survey has been completed and construction zones are cleared for piping network expansion.',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
  },

  // p2: Urban Reforestation Initiative
  {
    id: 'u2-1',
    projectId: 'p2',
    title: 'Community Planting Day Complete',
    description: 'Over 120 local volunteers joined our team in Berlin-Neukölln. Together, we planted our first batch of 1,500 native saplings, kickstarting the restoration of the urban canopy.',
    imageUrl: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=800',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
  {
    id: 'u2-2',
    projectId: 'p2',
    title: 'Soil Remediation Finished',
    description: 'The team completed preparing the urban soil, introducing organic matter and beneficial micro-organisms to promote strong root systems for the incoming micro-forest.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=800',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  },
  {
    id: 'u2-3',
    projectId: 'p2',
    title: 'Site Approved & Fenced',
    description: 'Official permits have been secured from the city administration. The abandoned urban lot has been safely prepared, cleaned of waste, and fenced off for work.',
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800',
    date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(), // 9 days ago
  },

  // p3: Tech Education for Underprivileged Youth
  {
    id: 'u3-1',
    projectId: 'p3',
    title: 'Laptops Configured & Handed Out',
    description: 'The classroom hub is fully equipped! We handed out high-performance laptops to our first cohort of 45 students. Coding classes start tomorrow!',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
  },
  {
    id: 'u3-2',
    projectId: 'p3',
    title: 'Classroom Center Renovated',
    description: 'Renovations are complete at the local community hub. High-speed fiber internet and solar battery back-ups have been installed to prevent power disruptions.',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
    date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days ago
  },
  {
    id: 'u3-3',
    projectId: 'p3',
    title: 'Curriculum & Mentor Network Finalized',
    description: 'Our 12-month Web Development curriculum has been finalized. We have secured 15 industry experts as volunteer mentors to host weekly QA sessions.',
    imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=800',
    date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 days ago
  },

  // p4: Ocean Plastic Cleanup Fleet
  {
    id: 'u4-1',
    projectId: 'p4',
    title: 'First Drone Fleet Deployed',
    description: 'The solar-powered collection vessels are in the water! They have begun their autonomous sweep of the Pacific high-density garbage patch, guided by real-time GPS telemetry.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
  {
    id: 'u4-2',
    projectId: 'p4',
    title: 'Vessel Sea Trials Successful',
    description: 'Completed 72 hours of open-water testing under full solar power. Navigation algorithms and automated plastic trapping nets checked out perfectly.',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800',
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
  },
  {
    id: 'u4-3',
    projectId: 'p4',
    title: 'Autonomous Systems Finalized',
    description: 'Software integrations for path-planning and plastic debris recognition are loaded onto the vessels. Fleet assembly is completely finished.',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
  }
];

export function getUpdatesForProject(projectId: string, projectTitle: string): ProjectUpdate[] {
  // If the project ID matches directly, return those updates
  const directUpdates = sampleUpdates.filter(u => u.projectId === projectId);
  if (directUpdates.length > 0) return directUpdates;

  // Determine a themed template based on the project's ID prefix
  let baseTemplateId = 'p1'; // Default: Clean Water / Infrastructure (Water/Kitchen/Shelter)
  
  if (projectId.startsWith('climate-environment') || projectId.startsWith('animal-welfare')) {
    baseTemplateId = 'p2'; // Theme: Nature & Planting
  } else if (projectId.startsWith('education') || projectId.startsWith('open-source-tech') || projectId.startsWith('research-innovation')) {
    baseTemplateId = 'p3'; // Theme: Laptops, Tech & Education
  } else if (projectId.startsWith('disaster-relief') || projectId.startsWith('health-medical')) {
    baseTemplateId = 'p4'; // Theme: Advanced systems & equipment deploy
  }

  const baseUpdates = sampleUpdates.filter(u => u.projectId === baseTemplateId);

  // Map the base template updates to the specific project
  return baseUpdates.map(u => ({
    ...u,
    id: `${u.id}-${projectId}`,
    projectId: projectId,
    title: u.title.replace('Village A', projectTitle.split(' - ')[0]),
    description: u.description.replace('Berlin-Neukölln', projectTitle.split(' - ')[0]),
  }));
}

