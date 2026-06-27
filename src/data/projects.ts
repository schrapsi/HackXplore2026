import { ImpactCategory, type Project } from '../types';

interface LocationOption {
  name: string;
  lat: number;
  lng: number;
  scope: 'baden-wuerttemberg' | 'global';
}

interface ProjectConcept {
  title: string;
  description: string;
  impactMetric: string;
}

interface CategoryDefinition {
  idPrefix: string;
  category: ImpactCategory;
  label: string;
  keywords: string[];
  imageUrl: string;
  concepts: ProjectConcept[];
}

const bwLocations: LocationOption[] = [
  { name: 'Karlsruhe', lat: 49.0069, lng: 8.4037, scope: 'baden-wuerttemberg' },
  { name: 'Stuttgart', lat: 48.7758, lng: 9.1829, scope: 'baden-wuerttemberg' },
  { name: 'Mannheim', lat: 49.4875, lng: 8.466, scope: 'baden-wuerttemberg' },
  { name: 'Freiburg im Breisgau', lat: 47.999, lng: 7.8421, scope: 'baden-wuerttemberg' },
  { name: 'Ulm', lat: 48.4011, lng: 9.9876, scope: 'baden-wuerttemberg' },
  { name: 'Heidelberg', lat: 49.3988, lng: 8.6724, scope: 'baden-wuerttemberg' },
  { name: 'Heilbronn', lat: 49.1427, lng: 9.2109, scope: 'baden-wuerttemberg' },
  { name: 'Pforzheim', lat: 48.8922, lng: 8.6946, scope: 'baden-wuerttemberg' },
  { name: 'Reutlingen', lat: 48.4914, lng: 9.2043, scope: 'baden-wuerttemberg' },
  { name: 'Tuebingen', lat: 48.5216, lng: 9.0576, scope: 'baden-wuerttemberg' },
  { name: 'Konstanz', lat: 47.6779, lng: 9.1732, scope: 'baden-wuerttemberg' },
  { name: 'Baden-Baden', lat: 48.7656, lng: 8.2285, scope: 'baden-wuerttemberg' },
  { name: 'Ravensburg', lat: 47.7811, lng: 9.6109, scope: 'baden-wuerttemberg' },
  { name: 'Aalen', lat: 48.8378, lng: 10.0933, scope: 'baden-wuerttemberg' },
  { name: 'Villingen-Schwenningen', lat: 48.0594, lng: 8.4641, scope: 'baden-wuerttemberg' },
];

const globalLocations: LocationOption[] = [
  { name: 'Nairobi, Kenya', lat: -1.2921, lng: 36.8219, scope: 'global' },
  { name: 'Dhaka, Bangladesh', lat: 23.8103, lng: 90.4125, scope: 'global' },
  { name: 'Bogota, Colombia', lat: 4.711, lng: -74.0721, scope: 'global' },
  { name: 'Manila, Philippines', lat: 14.5995, lng: 120.9842, scope: 'global' },
  { name: 'Cape Town, South Africa', lat: -33.9249, lng: 18.4241, scope: 'global' },
  { name: 'Kathmandu, Nepal', lat: 27.7172, lng: 85.324, scope: 'global' },
  { name: 'Lagos, Nigeria', lat: 6.5244, lng: 3.3792, scope: 'global' },
  { name: 'Jakarta, Indonesia', lat: -6.2088, lng: 106.8456, scope: 'global' },
  { name: 'Sao Paulo, Brazil', lat: -23.5505, lng: -46.6333, scope: 'global' },
  { name: 'Athens, Greece', lat: 37.9838, lng: 23.7275, scope: 'global' },
  { name: 'Mexico City, Mexico', lat: 19.4326, lng: -99.1332, scope: 'global' },
  { name: 'Amman, Jordan', lat: 31.9539, lng: 35.9106, scope: 'global' },
  { name: 'Accra, Ghana', lat: 5.6037, lng: -0.187, scope: 'global' },
  { name: 'Bangkok, Thailand', lat: 13.7563, lng: 100.5018, scope: 'global' },
  { name: 'Lisbon, Portugal', lat: 38.7223, lng: -9.1393, scope: 'global' },
];

const budgetTierGroups: string[][] = [
  ['20k-50k', '50k-100k'],
  ['50k-100k', '100k-200k'],
  ['100k-200k', '200k-500k'],
  ['200k-500k', '500k+'],
  ['500k+'],
];

const categoryDefinitions: CategoryDefinition[] = [
  {
    idPrefix: 'local-community',
    category: ImpactCategory.LocalCommunitySupport,
    label: 'Local community support',
    keywords: ['community', 'local', 'food bank', 'shelter', 'kitchen', 'library', 'neighborhood', 'youth club'],
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800',
    concepts: [
      {
        title: 'Community Kitchen Expansion',
        description: 'Expand a community kitchen with cold storage, volunteer coordination, and weekly meals for residents facing hardship.',
        impactMetric: 'Serves 18,000 warm meals per year',
      },
      {
        title: 'Neighborhood Library Access Hub',
        description: 'Upgrade a public library branch with longer opening hours, free Wi-Fi, homework help, and community meeting space.',
        impactMetric: 'Keeps a library hub open 22 extra hours per week',
      },
      {
        title: 'Youth Club Safe Evenings',
        description: 'Fund evening youth club staffing, art supplies, mentoring, and transport vouchers for teenagers after school.',
        impactMetric: 'Provides 4,500 safe evening visits per year',
      },
      {
        title: 'Homeless Outreach Van',
        description: 'Equip a mobile outreach van with hygiene kits, blankets, case workers, and direct referral support.',
        impactMetric: 'Reaches 1,200 people without stable housing annually',
      },
      {
        title: 'Community Fridge Network',
        description: 'Install shared fridges, pickup routes, and food safety training to redirect surplus food into neighborhoods.',
        impactMetric: 'Rescues 55 tons of food per year',
      },
      {
        title: 'Shelter Renovation Fund',
        description: 'Renovate emergency shelter rooms with safer beds, accessible bathrooms, and private family intake areas.',
        impactMetric: 'Adds 42 safer emergency shelter beds',
      },
      {
        title: 'Local Volunteer Platform',
        description: 'Build a simple volunteer matching service that connects residents to food banks, libraries, and neighborhood projects.',
        impactMetric: 'Coordinates 8,000 volunteer hours annually',
      },
      {
        title: 'Neighborhood Microgrant Pool',
        description: 'Provide small grants for resident-led cleanups, repair cafes, block gardens, and intergenerational events.',
        impactMetric: 'Funds 60 resident-led neighborhood projects',
      },
      {
        title: 'Community Laundry and Shower Access',
        description: 'Create reliable laundry, shower, and locker access for people without stable housing or utilities.',
        impactMetric: 'Provides 9,500 hygiene service visits per year',
      },
      {
        title: 'After-School Meal and Study Room',
        description: 'Combine a daily meal service with staffed study rooms and quiet workspace for children and caregivers.',
        impactMetric: 'Supports 320 regular students and caregivers',
      },
    ],
  },
  {
    idPrefix: 'education',
    category: ImpactCategory.Education,
    label: 'Education',
    keywords: ['education', 'school', 'scholarship', 'tutoring', 'coding', 'apprenticeship', 'university', 'equipment'],
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
    concepts: [
      {
        title: 'Scholarship Bridge Fund',
        description: 'Cover tuition gaps, transit passes, exam fees, and mentoring for students who are first in their family to study.',
        impactMetric: 'Funds 75 scholarship packages per year',
      },
      {
        title: 'School Supply Bank',
        description: 'Stock classrooms and family pickup points with notebooks, calculators, backpacks, and seasonal learning kits.',
        impactMetric: 'Equips 4,000 students with essential supplies',
      },
      {
        title: 'Tutoring for Core Skills',
        description: 'Provide small-group tutoring in math, reading, and science with trained educators and progress tracking.',
        impactMetric: 'Delivers 12,000 tutoring hours annually',
      },
      {
        title: 'Coding Class Lab',
        description: 'Set up a hands-on coding lab with laptops, robotics kits, and weekend classes for underserved students.',
        impactMetric: 'Trains 500 students in practical coding skills',
      },
      {
        title: 'Apprenticeship Starter Program',
        description: 'Prepare young adults for apprenticeships with career coaching, equipment grants, and employer matching.',
        impactMetric: 'Places 180 learners into apprenticeships',
      },
      {
        title: 'Girls in STEM Mentoring',
        description: 'Match girls and young women with STEM mentors, lab visits, and project-based learning cohorts.',
        impactMetric: 'Runs 24 STEM cohorts for 360 participants',
      },
      {
        title: 'Accessible Classroom Technology',
        description: 'Fund assistive devices, captioning tools, screen readers, and teacher training for inclusive classrooms.',
        impactMetric: 'Improves access for 900 learners with disabilities',
      },
      {
        title: 'University Access Counseling',
        description: 'Offer application workshops, financial aid support, and interview coaching for low-income applicants.',
        impactMetric: 'Supports 650 university and college applications',
      },
      {
        title: 'Mobile Science Workshop',
        description: 'Bring lab equipment and science educators to schools that lack dedicated experimental facilities.',
        impactMetric: 'Reaches 14,000 students through mobile labs',
      },
      {
        title: 'Adult Literacy and Numeracy Classes',
        description: 'Run evening literacy, numeracy, and digital basics classes for adults seeking better work options.',
        impactMetric: 'Helps 800 adults complete foundational courses',
      },
    ],
  },
  {
    idPrefix: 'health-medical',
    category: ImpactCategory.HealthAndMedicalCare,
    label: 'Health and medical care',
    keywords: ['health', 'medical', 'hospital', 'cancer', 'mental health', 'disability', 'emergency care', 'global health'],
    imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800',
    concepts: [
      {
        title: 'Mental Health Walk-In Clinic',
        description: 'Fund low-barrier counseling, crisis appointments, and referral support without long waiting lists.',
        impactMetric: 'Provides 6,000 same-week counseling sessions',
      },
      {
        title: 'Cancer Care Navigation',
        description: 'Support patients with appointment coordination, transport vouchers, translation, and treatment navigation.',
        impactMetric: 'Guides 1,100 patients through complex care',
      },
      {
        title: 'Disability Support Equipment Pool',
        description: 'Create a loan pool for wheelchairs, communication devices, ramps, and adaptive home equipment.',
        impactMetric: 'Loans 1,400 assistive devices per year',
      },
      {
        title: 'Emergency Care Access Fund',
        description: 'Cover urgent medical bills, prescriptions, and post-discharge follow-up for uninsured or underinsured patients.',
        impactMetric: 'Stabilizes care for 2,300 emergency patients',
      },
      {
        title: 'Mobile Preventive Health Checks',
        description: 'Run mobile screening days for blood pressure, diabetes, dental health, and vaccination counseling.',
        impactMetric: 'Completes 18,000 preventive screenings',
      },
      {
        title: 'Hospital Family Support Rooms',
        description: 'Renovate family rooms near intensive care and pediatric wards with privacy, rest space, and social work access.',
        impactMetric: 'Supports 4,200 family stays during treatment',
      },
      {
        title: 'Community Paramedic Pilot',
        description: 'Train paramedics to provide home follow-ups for people at high risk of repeat emergency admissions.',
        impactMetric: 'Reduces avoidable emergency visits for 900 patients',
      },
      {
        title: 'Maternal Health Outreach',
        description: 'Provide prenatal visits, safe birth education, nutrition support, and postnatal check-ins for mothers.',
        impactMetric: 'Supports 3,500 mothers and newborns',
      },
      {
        title: 'Youth Mental Health Hotline',
        description: 'Expand confidential chat and phone counseling with trained clinicians and youth peer supporters.',
        impactMetric: 'Handles 22,000 youth support contacts annually',
      },
      {
        title: 'Medical Translation Service',
        description: 'Offer trained interpreters and plain-language health materials for patients navigating complex care.',
        impactMetric: 'Covers 9,000 translated medical appointments',
      },
    ],
  },
  {
    idPrefix: 'poverty-basic-needs',
    category: ImpactCategory.PovertyAndBasicNeeds,
    label: 'Poverty and basic needs',
    keywords: ['poverty', 'basic needs', 'food', 'water', 'housing', 'clothing', 'hygiene', 'cash support'],
    imageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=800',
    concepts: [
      {
        title: 'Direct Cash Relief Fund',
        description: 'Provide rapid cash grants for rent gaps, utility shutoffs, transport, medicine, and other urgent needs.',
        impactMetric: 'Delivers emergency grants to 1,800 households',
      },
      {
        title: 'Clean Water Access Project',
        description: 'Install safe water points, water testing, and local maintenance training for communities without reliable access.',
        impactMetric: 'Provides clean water access for 12,000 people',
      },
      {
        title: 'Housing Stability Team',
        description: 'Fund eviction prevention, landlord mediation, deposits, and case support for families at risk of homelessness.',
        impactMetric: 'Prevents 620 evictions per year',
      },
      {
        title: 'Hygiene Essentials Distribution',
        description: 'Distribute soap, period products, diapers, dental supplies, and laundry support through trusted local partners.',
        impactMetric: 'Supplies 48,000 hygiene kits annually',
      },
      {
        title: 'Winter Clothing and Heat Support',
        description: 'Provide warm clothing, blankets, energy vouchers, and emergency heating repairs before winter peaks.',
        impactMetric: 'Keeps 3,200 people warm through winter',
      },
      {
        title: 'Community Pantry Cold Chain',
        description: 'Add refrigerators, route planning, and fresh food procurement so pantries can offer healthier food.',
        impactMetric: 'Distributes 210 tons of fresh food per year',
      },
      {
        title: 'Basic Needs Navigation Desk',
        description: 'Connect people to benefits, debt advice, health access, childcare help, and emergency assistance.',
        impactMetric: 'Resolves 5,500 basic-needs cases annually',
      },
      {
        title: 'Affordable Transit Passes',
        description: 'Fund transport passes for job seekers, students, caregivers, and patients traveling to essential appointments.',
        impactMetric: 'Funds 14,000 essential transit trips',
      },
      {
        title: 'Household Repair Microgrants',
        description: 'Cover small repairs, appliances, accessibility fixes, and safety improvements for low-income households.',
        impactMetric: 'Completes 700 urgent home repairs',
      },
      {
        title: 'Food and Rent Crisis Hotline',
        description: 'Operate a hotline that triages emergency food, rent, clothing, and shelter requests in real time.',
        impactMetric: 'Responds to 24,000 crisis requests per year',
      },
    ],
  },
  {
    idPrefix: 'children-families',
    category: ImpactCategory.ChildrenAndFamilies,
    label: 'Children and families',
    keywords: ['children', 'families', 'child protection', 'foster care', 'children hospital', 'family shelter', 'school meals', 'single parents'],
    imageUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800',
    concepts: [
      {
        title: 'Family Shelter Stabilization',
        description: 'Create safe temporary rooms, child-friendly spaces, and housing navigation for families leaving crisis situations.',
        impactMetric: 'Shelters and rehouses 260 families annually',
      },
      {
        title: 'School Meal Gap Fund',
        description: 'Cover breakfast, lunch, and holiday meal gaps for children whose families cannot reliably afford food.',
        impactMetric: 'Funds 95,000 nutritious school meals',
      },
      {
        title: 'Single Parent Support Circle',
        description: 'Offer childcare vouchers, legal advice, peer groups, and emergency grants for single parents.',
        impactMetric: 'Supports 1,200 single-parent households',
      },
      {
        title: 'Foster Care Transition Kits',
        description: 'Provide clothing, laptops, bedding, documents support, and mentoring for youth entering or leaving foster care.',
        impactMetric: 'Equips 650 foster youth with transition kits',
      },
      {
        title: 'Child Protection Response Training',
        description: 'Train teachers, coaches, and community workers to identify risks and connect children to protection services.',
        impactMetric: 'Trains 3,000 child-facing adults',
      },
      {
        title: 'Children Hospital Comfort Fund',
        description: 'Fund therapy play, family travel support, child life specialists, and comfort items during treatment.',
        impactMetric: 'Supports 5,200 pediatric hospital visits',
      },
      {
        title: 'Early Childhood Home Visits',
        description: 'Provide home visits, parenting coaching, safe sleep supplies, and development screenings for young children.',
        impactMetric: 'Completes 7,500 early-childhood visits',
      },
      {
        title: 'Family Legal Aid Clinic',
        description: 'Offer legal help for custody, benefits, housing, and protection orders for vulnerable families.',
        impactMetric: 'Resolves 1,600 family legal cases',
      },
      {
        title: 'After-School Care Scholarships',
        description: 'Fund safe after-school care, homework support, and enrichment programs for children from low-income families.',
        impactMetric: 'Provides 480 children with full-year care places',
      },
      {
        title: 'New Parent Essentials Bank',
        description: 'Distribute diapers, formula, strollers, safe cribs, and health referrals to families with infants.',
        impactMetric: 'Supplies essentials for 2,400 infants',
      },
    ],
  },
  {
    idPrefix: 'climate-environment',
    category: ImpactCategory.ClimateAndEnvironment,
    label: 'Climate and environment',
    keywords: ['climate', 'environment', 'tree planting', 'biodiversity', 'clean energy', 'conservation', 'river cleanup', 'ocean cleanup', 'adaptation'],
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800',
    concepts: [
      {
        title: 'Urban Tree Canopy Project',
        description: 'Plant climate-resilient trees, water them through establishment, and prioritize heat-exposed streets.',
        impactMetric: 'Plants and maintains 8,000 climate-resilient trees',
      },
      {
        title: 'Biodiversity Corridor Restoration',
        description: 'Restore connected habitat corridors with native plants, pollinator meadows, and monitoring by local partners.',
        impactMetric: 'Restores 120 hectares of connected habitat',
      },
      {
        title: 'Clean Energy for Community Buildings',
        description: 'Install solar panels, batteries, and efficiency upgrades for schools, clinics, and community centers.',
        impactMetric: 'Cuts 1,900 tons of CO2 equivalent per year',
      },
      {
        title: 'River Cleanup and Monitoring',
        description: 'Remove waste, install trash capture points, and track water quality with citizen science groups.',
        impactMetric: 'Removes 45 tons of waste from waterways annually',
      },
      {
        title: 'Climate Adaptation Cool Spaces',
        description: 'Create shaded cooling spaces, water points, and heatwave response plans for vulnerable neighborhoods.',
        impactMetric: 'Protects 18,000 residents during heatwaves',
      },
      {
        title: 'Wetland Conservation Fund',
        description: 'Protect wetlands, restore native reeds, and monitor flood storage and biodiversity outcomes.',
        impactMetric: 'Restores 80 hectares of flood-buffering wetlands',
      },
      {
        title: 'Zero-Waste School Network',
        description: 'Equip schools with repair stations, composting, reusable lunch systems, and student-led audits.',
        impactMetric: 'Diverts 160 tons of school waste per year',
      },
      {
        title: 'Community Energy Coaching',
        description: 'Provide home energy audits, efficiency kits, and tenant-friendly upgrades for low-income households.',
        impactMetric: 'Lowers energy bills for 3,800 households',
      },
      {
        title: 'Ocean Plastic Interception',
        description: 'Fund river-mouth interception, fishing net recovery, and coastal cleanup teams before plastic reaches the ocean.',
        impactMetric: 'Intercepts 220 tons of plastic waste annually',
      },
      {
        title: 'Disaster Prevention Green Infrastructure',
        description: 'Build rain gardens, permeable surfaces, and floodable parks that reduce stormwater damage.',
        impactMetric: 'Manages runoff from 95 hectares of urban land',
      },
    ],
  },
  {
    idPrefix: 'animal-welfare',
    category: ImpactCategory.AnimalWelfare,
    label: 'Animal welfare',
    keywords: ['animal', 'animal shelter', 'wildlife', 'veterinary', 'anti-cruelty', 'habitat', 'rescue'],
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800',
    concepts: [
      {
        title: 'Animal Shelter Medical Wing',
        description: 'Equip shelter veterinary rooms for vaccinations, spay and neuter care, diagnostics, and recovery kennels.',
        impactMetric: 'Treats 4,200 shelter animals annually',
      },
      {
        title: 'Wildlife Rescue Response Team',
        description: 'Fund rescue transport, rehabilitation enclosures, and veterinary care for injured native wildlife.',
        impactMetric: 'Rescues and rehabilitates 1,800 wild animals',
      },
      {
        title: 'Low-Cost Veterinary Clinic',
        description: 'Provide affordable vaccinations, basic surgery, dental care, and emergency support for low-income pet owners.',
        impactMetric: 'Delivers 12,000 low-cost veterinary visits',
      },
      {
        title: 'Anti-Cruelty Investigation Support',
        description: 'Train responders, fund forensic veterinary exams, and support safe placement for animals removed from abuse.',
        impactMetric: 'Supports 700 cruelty-response cases',
      },
      {
        title: 'Habitat Protection for Urban Wildlife',
        description: 'Create nesting sites, safe corridors, and habitat buffers for birds, bats, hedgehogs, and pollinators.',
        impactMetric: 'Builds 2,500 urban wildlife habitat features',
      },
      {
        title: 'Farm Animal Sanctuary Expansion',
        description: 'Expand safe pasture, winter housing, and medical care for rescued farm animals.',
        impactMetric: 'Provides lifetime care capacity for 350 animals',
      },
      {
        title: 'Pet Food Bank and Foster Network',
        description: 'Keep pets with families during hardship through food supplies, foster placements, and emergency boarding.',
        impactMetric: 'Keeps 2,800 pets safely housed with families',
      },
      {
        title: 'Marine Wildlife Rescue Equipment',
        description: 'Fund rescue gear, disentanglement training, and rehabilitation support for injured marine animals.',
        impactMetric: 'Equips 20 marine wildlife rescue teams',
      },
      {
        title: 'Humane Education in Schools',
        description: 'Teach responsible pet care, wildlife respect, and anti-cruelty awareness through classroom programs.',
        impactMetric: 'Reaches 18,000 students with humane education',
      },
      {
        title: 'Street Animal Sterilization Program',
        description: 'Run humane catch-neuter-vaccinate-return clinics with local caregivers and veterinary partners.',
        impactMetric: 'Sterilizes and vaccinates 9,000 street animals',
      },
    ],
  },
  {
    idPrefix: 'disaster-relief',
    category: ImpactCategory.DisasterRelief,
    label: 'Disaster relief',
    keywords: ['disaster', 'relief', 'flood', 'earthquake', 'war', 'fire', 'storm', 'refugee', 'emergency medical'],
    imageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=800',
    concepts: [
      {
        title: 'Flood Response Supply Hubs',
        description: 'Pre-position pumps, generators, blankets, drinking water, and cleanup kits in flood-prone communities.',
        impactMetric: 'Supports 25,000 people during flood emergencies',
      },
      {
        title: 'Earthquake Medical Response Cache',
        description: 'Stock trauma kits, field tents, radios, and mobile medical supplies for rapid earthquake response.',
        impactMetric: 'Equips 12 emergency medical response teams',
      },
      {
        title: 'Wildfire Evacuation Support',
        description: 'Fund evacuation transport, temporary shelter supplies, air filters, and recovery case managers.',
        impactMetric: 'Protects 8,500 residents during wildfire events',
      },
      {
        title: 'Refugee Emergency Welcome Center',
        description: 'Provide registration support, interpretation, medical triage, family reunification, and safe overnight space.',
        impactMetric: 'Supports 14,000 displaced people annually',
      },
      {
        title: 'Storm Damage Rapid Repair Fund',
        description: 'Cover urgent roof repairs, debris removal, emergency power, and safe water after severe storms.',
        impactMetric: 'Repairs 1,100 storm-damaged homes',
      },
      {
        title: 'War-Affected Family Relief',
        description: 'Provide cash aid, medical referrals, psychosocial care, and school continuity for families affected by conflict.',
        impactMetric: 'Stabilizes 5,000 conflict-affected families',
      },
      {
        title: 'Emergency Communications Network',
        description: 'Deploy satellite phones, radio repeaters, and trained local coordinators for communications outages.',
        impactMetric: 'Keeps 90 communities connected during crises',
      },
      {
        title: 'Heatwave Emergency Outreach',
        description: 'Activate cooling transport, wellness checks, water distribution, and outreach for isolated older adults.',
        impactMetric: 'Completes 30,000 heatwave wellness checks',
      },
      {
        title: 'Disaster Volunteer Training Academy',
        description: 'Train local volunteers in first aid, shelter operations, logistics, and psychological first aid.',
        impactMetric: 'Trains 4,500 disaster-response volunteers',
      },
      {
        title: 'Emergency Medical Drone Delivery',
        description: 'Pilot drone delivery of blood, vaccines, and urgent medication where roads are cut off after disasters.',
        impactMetric: 'Completes 3,200 emergency medical deliveries',
      },
    ],
  },
  {
    idPrefix: 'arts-culture',
    category: ImpactCategory.ArtsCultureAndPublicSpaces,
    label: 'Arts, culture, and public spaces',
    keywords: ['arts', 'culture', 'museum', 'theater', 'music education', 'heritage', 'parks', 'public gardens', 'community events'],
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800',
    concepts: [
      {
        title: 'Local Theater Access Fund',
        description: 'Fund youth tickets, community rehearsals, accessible performances, and fair pay for local theater artists.',
        impactMetric: 'Creates 18,000 subsidized theater seats',
      },
      {
        title: 'Music Education Instrument Library',
        description: 'Build an instrument lending library with repairs, lessons, and ensemble coaching for children and teens.',
        impactMetric: 'Loans 1,200 instruments to young musicians',
      },
      {
        title: 'Museum Free Entry Days',
        description: 'Sponsor free admission, guided tours, multilingual materials, and school transport for cultural institutions.',
        impactMetric: 'Funds 60,000 free museum visits',
      },
      {
        title: 'Public Garden Renewal',
        description: 'Restore public gardens with seating, biodiversity planting, water access, and volunteer stewardship.',
        impactMetric: 'Renews 35 public garden spaces',
      },
      {
        title: 'Community Festival Microgrants',
        description: 'Provide small grants for neighborhood festivals, intercultural events, local artists, and public workshops.',
        impactMetric: 'Supports 140 community arts events',
      },
      {
        title: 'Cultural Heritage Digitization',
        description: 'Digitize archives, oral histories, photographs, and local heritage collections for public access.',
        impactMetric: 'Preserves 120,000 cultural records',
      },
      {
        title: 'Accessible Parks Program',
        description: 'Add accessible paths, seating, shade, inclusive signage, and sensory-friendly areas in public parks.',
        impactMetric: 'Improves access across 28 public parks',
      },
      {
        title: 'Youth Street Art Mentorship',
        description: 'Pair young artists with mentors to create legal murals, workshops, and public art installations.',
        impactMetric: 'Mentors 450 young artists per year',
      },
      {
        title: 'Mobile Cultural Stage',
        description: 'Create a traveling stage for concerts, readings, theater, and community events in underserved areas.',
        impactMetric: 'Brings 120 performances to public spaces',
      },
      {
        title: 'Public Space Night Lighting',
        description: 'Install energy-efficient lighting and community design features to make parks and plazas safer at night.',
        impactMetric: 'Improves 45 public spaces used after dark',
      },
    ],
  },
  {
    idPrefix: 'open-source-tech',
    category: ImpactCategory.OpenSourcePublicGoodTechnology,
    label: 'Open-source / public-good technology',
    keywords: ['open source', 'public good technology', 'digital rights', 'privacy', 'accessibility software', 'civic tech', 'maintainers'],
    imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=800',
    concepts: [
      {
        title: 'Open-Source Maintainer Grants',
        description: 'Provide recurring grants for maintainers of widely used public-interest software libraries.',
        impactMetric: 'Funds 40 maintainers for critical open-source tools',
      },
      {
        title: 'Digital Rights Legal Defense',
        description: 'Support legal and technical advocacy for encryption, free expression, and privacy-preserving infrastructure.',
        impactMetric: 'Protects digital rights for 2 million users',
      },
      {
        title: 'Privacy Tool Usability Lab',
        description: 'Improve secure messaging, password tools, and privacy software through user research and accessibility testing.',
        impactMetric: 'Improves privacy tools used by 600,000 people',
      },
      {
        title: 'Accessibility Software Sprint',
        description: 'Fund developers and disabled testers to improve screen-reader support, captions, and keyboard navigation.',
        impactMetric: 'Ships 120 accessibility improvements',
      },
      {
        title: 'Civic Tech Service Platform',
        description: 'Build open tools for residents to report issues, track services, and participate in local decisions.',
        impactMetric: 'Handles 250,000 civic service interactions',
      },
      {
        title: 'Public Data Commons',
        description: 'Create well-documented open datasets and APIs for transport, climate, public health, and local services.',
        impactMetric: 'Publishes 180 reusable public-good datasets',
      },
      {
        title: 'Security Audit Fund',
        description: 'Pay for independent security audits of public-good software used by nonprofits and civic institutions.',
        impactMetric: 'Audits 55 high-impact software projects',
      },
      {
        title: 'Nonprofit Tech Helpdesk',
        description: 'Offer practical technology support, cloud credits, migration help, and security training for nonprofits.',
        impactMetric: 'Supports 900 nonprofit teams with safer systems',
      },
      {
        title: 'Open Mapping for Crisis Response',
        description: 'Fund open mapping, satellite analysis, and volunteer coordination for humanitarian and climate response.',
        impactMetric: 'Maps 75,000 square kilometers for responders',
      },
      {
        title: 'Public Interest AI Toolkit',
        description: 'Develop open-source tools for transparency, bias testing, and safer deployment of public-sector AI systems.',
        impactMetric: 'Equips 300 public-interest teams with AI safety tools',
      },
    ],
  },
  {
    idPrefix: 'sports-youth',
    category: ImpactCategory.SportsAndYouthDevelopment,
    label: 'Sports and youth development',
    keywords: ['sports', 'youth development', 'local clubs', 'equipment', 'inclusion', 'coaching', 'disabled sports', 'recreational spaces', 'football'],
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800',
    concepts: [
      {
        title: 'Inclusive Football Field Renewal',
        description: 'Upgrade football fields with safer surfaces, lighting, accessible changing areas, and community booking times.',
        impactMetric: 'Renews 10 football fields for 4,800 young players',
      },
      {
        title: 'Youth Coaching Fellowship',
        description: 'Train and pay coaches to provide mentoring, homework support, and inclusive team culture.',
        impactMetric: 'Trains 260 youth coaches and mentors',
      },
      {
        title: 'Sports Equipment for Kids',
        description: 'Provide boots, balls, protective gear, uniforms, and transport vouchers for children who cannot afford fees.',
        impactMetric: 'Equips 5,500 children for regular sports participation',
      },
      {
        title: 'Disabled Sports Access Program',
        description: 'Fund adaptive equipment, accessible transport, trained instructors, and inclusive club partnerships.',
        impactMetric: 'Creates 1,100 adaptive sports places',
      },
      {
        title: 'Safe Recreation Space Network',
        description: 'Create supervised evening sports, lighting, water access, and conflict mediation in public recreation spaces.',
        impactMetric: 'Provides 35,000 safe recreation visits annually',
      },
      {
        title: 'Girls Sports Leadership League',
        description: 'Support girls with coaching, leadership training, safe facilities, and pathways into club leadership.',
        impactMetric: 'Develops 1,400 girls as athletes and leaders',
      },
      {
        title: 'Summer Sports and Meals Camp',
        description: 'Run low-cost summer camps combining sports, meals, mentoring, and health education.',
        impactMetric: 'Funds 3,200 camp weeks for young people',
      },
      {
        title: 'Mental Health Through Team Sports',
        description: 'Embed counseling referral pathways and trained youth workers into clubs and school sports programs.',
        impactMetric: 'Supports 6,000 young athletes with wellbeing resources',
      },
      {
        title: 'Open Gym After Dark',
        description: 'Keep gyms and sports halls open during evenings with coaches, snacks, and safe transport home.',
        impactMetric: 'Creates 18,000 supervised evening sessions',
      },
      {
        title: 'Refugee Youth Sports Integration',
        description: 'Cover club fees, equipment, language support, and coach training for refugee and migrant youth.',
        impactMetric: 'Integrates 2,200 young people into local clubs',
      },
    ],
  },
  {
    idPrefix: 'research-innovation',
    category: ImpactCategory.ResearchAndInnovation,
    label: 'Research and innovation',
    keywords: ['research', 'innovation', 'science', 'disease prevention', 'climate tech', 'social innovation', 'ai safety', 'university labs'],
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800',
    concepts: [
      {
        title: 'Disease Prevention Research Seed Fund',
        description: 'Fund early-stage studies on prevention, diagnostics, and data systems for high-burden diseases.',
        impactMetric: 'Launches 30 early-stage disease prevention studies',
      },
      {
        title: 'Climate Tech Field Lab',
        description: 'Test low-cost climate adaptation tools, sensors, and clean energy pilots with community partners.',
        impactMetric: 'Pilots 25 climate tech solutions in real settings',
      },
      {
        title: 'Social Innovation Accelerator',
        description: 'Support teams building evidence-based solutions for housing, education, health, and public services.',
        impactMetric: 'Accelerates 45 social innovation teams',
      },
      {
        title: 'AI Safety Evaluation Lab',
        description: 'Fund independent evaluation methods, red-teaming tools, and public-interest research on safer AI systems.',
        impactMetric: 'Publishes 20 open AI safety evaluation tools',
      },
      {
        title: 'University Lab Equipment Fund',
        description: 'Provide shared lab equipment, technician support, and open access time for public-good research.',
        impactMetric: 'Enables 160 university research projects',
      },
      {
        title: 'Community Health Data Partnership',
        description: 'Build privacy-preserving data partnerships that help researchers identify preventable health gaps.',
        impactMetric: 'Supports 12 public health research collaborations',
      },
      {
        title: 'Low-Cost Diagnostics Challenge',
        description: 'Fund prototypes and field validation for affordable diagnostic tools in under-resourced settings.',
        impactMetric: 'Validates 18 low-cost diagnostic prototypes',
      },
      {
        title: 'Research Translation Fellowship',
        description: 'Place researchers with nonprofits and public agencies to turn evidence into practical programs.',
        impactMetric: 'Translates 50 studies into field-ready interventions',
      },
      {
        title: 'Open Science Replication Fund',
        description: 'Fund replication studies, open datasets, and transparent methods for high-impact research areas.',
        impactMetric: 'Publishes 70 open replication packages',
      },
      {
        title: 'Future Resilience Innovation Prize',
        description: 'Award milestone funding to teams developing scalable solutions for climate, health, and social resilience.',
        impactMetric: 'Funds 15 breakthrough resilience prototypes',
      },
    ],
  },
];

const getProjectLocation = (categoryIndex: number, conceptIndex: number) => {
  if (conceptIndex < 5) {
    return bwLocations[(categoryIndex * 5 + conceptIndex) % bwLocations.length];
  }

  return globalLocations[(categoryIndex * 5 + conceptIndex - 5) % globalLocations.length];
};

export const sampleProjects: Project[] = categoryDefinitions.flatMap((definition, categoryIndex) =>
  definition.concepts.map((concept, conceptIndex) => {
    const location = getProjectLocation(categoryIndex, conceptIndex);
    const scopeKeywords = location.scope === 'baden-wuerttemberg'
      ? ['baden-wuerttemberg', 'baden-württemberg', 'local', 'regional']
      : ['global', 'international'];

    return {
      id: `${definition.idPrefix}-${conceptIndex + 1}`,
      title: `${concept.title} - ${location.name}`,
      description: concept.description,
      location: location.name,
      primaryCategory: definition.category,
      categoryLabel: definition.label,
      category: [
        definition.category,
        definition.label.toLowerCase(),
        ...definition.keywords,
        ...scopeKeywords,
        location.name.toLowerCase(),
      ],
      budgetTier: budgetTierGroups[(categoryIndex + conceptIndex) % budgetTierGroups.length],
      imageUrl: definition.imageUrl,
      impactMetric: concept.impactMetric,
      coordinates: {
        lat: location.lat,
        lng: location.lng,
      },
    };
  })
);

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
    if (lowercasePrompt.includes(project.title.toLowerCase())) score += 1;
    if (lowercasePrompt.includes(project.description.toLowerCase())) score += 1;

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
