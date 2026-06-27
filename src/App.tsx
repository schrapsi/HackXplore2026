import { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { ProjectDiscovery } from './components/ProjectDiscovery';
import { SignupFlow } from './components/SignupFlow';
import { Dashboard } from './components/Dashboard';
import { processUserInput } from './data/projects';
import { mockBackend } from './data/auth';
import type { Project, User } from './types';

function App() {
  const [step, setStep] = useState<'landing' | 'discovery' | 'signup' | 'dashboard'>('landing');
  const [matchedProjects, setMatchedProjects] = useState<Project[]>([]);
  
  // Track selections across steps
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Check user session on load
  useEffect(() => {
    const checkSession = async () => {
      const user = await mockBackend.getCurrentUser();
      if (user) {
        setCurrentUser(user);
        setStep('dashboard');
      }
    };
    checkSession();
  }, []);

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

  const handleSignupComplete = async () => {
    const user = await mockBackend.getCurrentUser();
    setCurrentUser(user);
    setStep('dashboard');
  };

  const handleLogout = async () => {
    await mockBackend.logout();
    setCurrentUser(null);
    setStep('landing');
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
        <Dashboard 
          user={currentUser} 
          onLogout={handleLogout} 
          onFundAnother={handleGoBack} 
        />
      )}
    </>
  );
}

export default App;
