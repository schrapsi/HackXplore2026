import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { ProjectDiscovery } from './components/ProjectDiscovery';
import { SignupFlow } from './components/SignupFlow';
import { LoginFlow } from './components/LoginFlow';
import { Dashboard } from './components/Dashboard';
import { ImpactHub } from './components/ImpactHub';
import { processUserInput } from './data/projects';
import { mockBackend } from './data/auth';
import type { Project, User } from './types';

function App() {
  const [step, setStep] = useState<'landing' | 'discovery' | 'signup' | 'login' | 'dashboard' | 'hub'>('landing');
  const [matchedProjects, setMatchedProjects] = useState<Project[]>([]);
  const [promptHistory, setPromptHistory] = useState<string[]>([]);
  
  // Track selections across steps
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleSearch = async (prompt: string, budget: string) => {
    setSelectedBudget(budget);
    setPromptHistory([prompt]);
    const results = await processUserInput([prompt], budget);
    setMatchedProjects(results);
    setStep('discovery');
  };

  const handleRefineSearch = async (refinement: string) => {
    const newHistory = [...promptHistory, refinement];
    setPromptHistory(newHistory);
    const results = await processUserInput(newHistory, selectedBudget);
    setMatchedProjects(results);
  };

  const handleGoBack = () => {
    setStep('landing');
    setMatchedProjects([]);
  };

  const handleFundProject = (project: Project) => {
    setSelectedProject(project);
    setStep('signup');
  };

  const handleSignupComplete = (user: User) => {
    setCurrentUser(user);
    setStep('dashboard');
  };

  const handleLoginComplete = (user: User) => {
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
        <LandingPage onSearch={handleSearch} onNavigateLogin={() => setStep('login')} />
      )}
      
      {step === 'discovery' && (
        <ProjectDiscovery 
          projects={matchedProjects} 
          onBack={handleGoBack} 
          onFundProject={handleFundProject}
          onRefineSearch={handleRefineSearch}
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

      {step === 'login' && (
        <LoginFlow 
          onBack={handleGoBack} 
          onComplete={handleLoginComplete} 
        />
      )}

      {step === 'dashboard' && (
        <Dashboard 
          user={currentUser} 
          onLogout={handleLogout} 
          onFundAnother={handleGoBack} 
          onNavigateHub={() => setStep('hub')}
        />
      )}

      {step === 'hub' && (
        <ImpactHub onBack={() => setStep('dashboard')} />
      )}
    </>
  );
}

export default App;
