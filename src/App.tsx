import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { ProjectDiscovery } from './components/ProjectDiscovery';
import { SignupFlow } from './components/SignupFlow';
import { processUserInput } from './data/projects';
import type { Project } from './types';

function App() {
  const [step, setStep] = useState<'landing' | 'discovery' | 'signup' | 'dashboard'>('landing');
  const [matchedProjects, setMatchedProjects] = useState<Project[]>([]);
  
  // Track selections across steps
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleSearch = (prompt: string, budget: string) => {
    setSelectedBudget(budget);
    const results = processUserInput(prompt, budget);
    setMatchedProjects(results);
    setStep('discovery');
  };

  const handleGoBack = () => {
    setStep('landing');
    setMatchedProjects([]);
  };

  const handleFundProject = (project: Project) => {
    setSelectedProject(project);
    setStep('signup');
  };

  const handleSignupComplete = () => {
    setStep('dashboard');
  };

  return (
    <>
      {step === 'landing' && (
        <LandingPage onSearch={handleSearch} />
      )}
      
      {step === 'discovery' && (
        <ProjectDiscovery 
          projects={matchedProjects} 
          onBack={handleGoBack} 
          onFundProject={handleFundProject}
        />
      )}

      {step === 'signup' && selectedProject && (
        <SignupFlow 
          project={selectedProject} 
          budgetTier={selectedBudget}
          onBack={() => setStep('discovery')}
          onComplete={handleSignupComplete}
        />
      )}

      {step === 'dashboard' && (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <h2 className="text-4xl font-bold text-primary mb-4">Wirkungs-Dashboard</h2>
          <p className="text-lg text-base-content/70">
            Willkommen in deinem Wirkungs-Dashboard. Schritt 4 folgt in Kürze!
          </p>
          <button onClick={handleGoBack} className="btn btn-outline mt-8 rounded-full">
            Weiteres Projekt fördern
          </button>
        </div>
      )}
    </>
  );
}

export default App;
