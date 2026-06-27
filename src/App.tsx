import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { ProjectDiscovery } from './components/ProjectDiscovery';
import { processUserInput } from './data/projects';
import type { Project } from './types';

function App() {
  const [step, setStep] = useState<'landing' | 'discovery'>('landing');
  const [matchedProjects, setMatchedProjects] = useState<Project[]>([]);

  const handleSearch = (prompt: string, budget: string) => {
    // Scaffold: Convert user input into projects
    const results = processUserInput(prompt, budget);
    setMatchedProjects(results);
    
    // Transition to the next page
    setStep('discovery');
  };

  const handleGoBack = () => {
    setStep('landing');
    setMatchedProjects([]);
  };

  return (
    <>
      {step === 'landing' && (
        <LandingPage onSearch={handleSearch} />
      )}
      {step === 'discovery' && (
        <ProjectDiscovery projects={matchedProjects} onBack={handleGoBack} />
      )}
    </>
  );
}

export default App;
