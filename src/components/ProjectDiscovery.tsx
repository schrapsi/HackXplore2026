import { useState } from 'react';
import type { Project } from '../types';
import { calculateTotalCommitment } from '../data/projects';
import { ProjectMap } from './ProjectMap';
import { TopNavigationBar } from './TopNavigationBar';

interface ProjectDiscoveryProps {
  projects: Project[];
  onBack: () => void;
  onFundProject: (project: Project) => void;
  onRefineSearch?: (refinement: string) => Promise<void>;
}

export function ProjectDiscovery({ projects, onBack, onFundProject, onRefineSearch }: ProjectDiscoveryProps) {
  const [activeView, setActiveView] = useState<'grid' | 'map'>('grid');
  const [refinement, setRefinement] = useState('');
  const [isRefining, setIsRefining] = useState(false);

  const handleRefine = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!refinement.trim() || !onRefineSearch) return;
    setIsRefining(true);
    try {
      await onRefineSearch(refinement);
      setRefinement('');
    } finally {
      setIsRefining(false);
    }
  };

  if (projects.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-base-100">
        <TopNavigationBar 
          badgeText="DISCOVERY"
          rightElement={
            <button onClick={onBack} className="btn btn-ghost btn-sm rounded-full px-6 font-semibold">
              Cancel
            </button>
          }
        />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <h2 className="text-2xl font-bold mb-4">No matching projects found</h2>
          <button onClick={onBack} className="btn btn-primary rounded-full">Try a different prompt</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col bg-base-200/50 ${activeView === 'map' ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>

      <TopNavigationBar 
        badgeText="DISCOVERY"
        rightElement={
          <button onClick={onBack} className="btn btn-ghost btn-sm rounded-full px-6 font-semibold">
            Start over
          </button>
        }
      />


      <div className={`w-full max-w-6xl mx-auto px-4 md:px-8 py-6 flex-grow flex flex-col ${activeView === 'map' ? 'min-h-0' : ''}`}>
        <div className={`flex flex-col md:flex-row md:items-end justify-between ${activeView === 'map' ? 'mb-4' : 'mb-10'} gap-4`}>
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-semibold text-base-content">
              Curated projects for you
            </h2>
            <p className="text-base-content/60 mt-2 text-lg">
              Based on your input, here are the most impactful initiatives you can fund today.
            </p>
          </div>
          
          {/* View Toggler */}
          <div className="flex justify-center md:justify-end">
            <div className="relative grid grid-cols-2 bg-base-100 p-1 rounded-full shadow-sm border border-base-300 w-full sm:w-72">
              <span
                className={`absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-primary shadow-sm transition-transform duration-300 ease-out ${
                  activeView === 'map' ? 'translate-x-full' : 'translate-x-0'
                }`}
                aria-hidden="true"
              ></span>
              <button 
                className={`relative z-10 flex items-center justify-center rounded-full px-5 py-2 text-sm font-bold transition-colors duration-300 ${
                  activeView === 'grid' ? 'text-primary-content' : 'text-base-content/70 hover:text-base-content'
                }`}
                onClick={() => setActiveView('grid')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-13.5 18v-2.25z" />
                </svg>
                Card Grid
              </button>
              <button 
                className={`relative z-10 flex items-center justify-center rounded-full px-5 py-2 text-sm font-bold transition-colors duration-300 ${
                  activeView === 'map' ? 'text-primary-content' : 'text-base-content/70 hover:text-base-content'
                }`}
                onClick={() => setActiveView('map')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.446l-5.25-2.25a.75 0 00-.506 0l-5.25 2.25A.75 0 012.25 18V6a.75 0 01.503-.704l5.25-2.25a.75 0 01.506 0l5.25 2.25A.75 0 0014.25 6v12a.75 0 01-.503.704z" />
                </svg>
                Map View
              </button>
            </div>
          </div>
        </div>

        {/* Alternative Views */}
        {activeView === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <div key={project.id} className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 border border-base-300 group overflow-hidden">
                
                <figure className="relative h-56 overflow-hidden">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="badge badge-primary font-semibold shadow-sm">{project.location}</span>
                  </div>
                  <div className="absolute -bottom-5 right-5 z-10">
                    <img 
                      src={project.logoUrl} 
                      alt="logo" 
                      className="w-12 h-12 rounded-2xl object-cover border-4 border-base-100 shadow-md bg-base-100"
                    />
                  </div>
                </figure>

                <div className="card-body p-6">
                  <h2 className="card-title text-xl text-primary">{project.title}</h2>
                  <div className="flex flex-wrap gap-2">
                    <span className="badge badge-outline">{project.categoryLabel}</span>
                  </div>
                  <p className="text-base-content/80 text-sm mt-2 line-clamp-3">
                    {project.description}
                  </p>

                  {(() => {
                    const total = calculateTotalCommitment(project.initialCost, project.runningCostsPerYear);
                    const endowment = project.runningCostsPerYear / 0.04;
                    return (
                      <div className="bg-base-200/40 rounded-2xl p-4 my-3 border border-base-300/40 flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-[10px] uppercase font-extrabold text-primary tracking-wider block">Initial Launch Cost</span>
                            <span className="text-2xl font-black text-base-content">€{project.initialCost.toLocaleString()}</span>
                          </div>
                          <span className="badge badge-primary badge-sm font-semibold text-[10px] py-1 px-2.5">Launch Budget</span>
                        </div>
                        
                        <div className="border-t border-base-300/60 my-0.5"></div>
                        
                        <div className="grid grid-cols-2 gap-4 text-[11px] text-base-content/70">
                          <div>
                            <span className="font-semibold block text-base-content/50">Required Commitment</span>
                            <span className="text-xs font-bold text-base-content">€{total.toLocaleString()}</span>
                            <span className="block text-[9px] text-base-content/40 leading-none mt-0.5 font-medium">
                              (includes lifetime upkeep)
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="font-semibold block text-base-content/50">Yearly Running Cost</span>
                            <span className="text-xs font-bold text-base-content">
                              €{project.runningCostsPerYear.toLocaleString()}/yr
                            </span>
                            <span className="block text-[9px] text-base-content/40 leading-none mt-0.5 text-success font-medium">
                              (upkeep covered by a €{endowment.toLocaleString()} maintenance fund)
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                  
                  <div className="divider my-2"></div>
                  
                  <div className="flex flex-col gap-1 mb-4">
                    <span className="text-xs uppercase font-bold text-accent tracking-wider">Estimated impact</span>
                    <span className="text-base-content font-medium">{project.impactMetric}</span>
                  </div>

                  <div className="card-actions justify-end mt-auto pt-4">
                    <button 
                      onClick={() => onFundProject(project)}
                      className="btn btn-primary w-full rounded-full shadow-md text-lg h-12"
                    >
                      Fund this project
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <ProjectMap projects={projects} onFundProject={onFundProject} />
        )}
      </div>
      
      {/* Refine Search Input */}
      {onRefineSearch && projects.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-50">
          <form 
            onSubmit={handleRefine}
            className="flex items-center gap-2 bg-base-100/90 backdrop-blur-md p-2 rounded-full shadow-2xl border border-base-content/10"
          >
            <input 
              type="text" 
              placeholder="Refine your selection (e.g. 'Only projects in Europe')..." 
              className="input input-ghost flex-1 rounded-full focus:outline-none focus:bg-transparent bg-transparent"
              value={refinement}
              onChange={(e) => setRefinement(e.target.value)}
              disabled={isRefining}
            />
            <button 
              type="submit" 
              className="btn btn-primary btn-circle"
              disabled={isRefining || !refinement.trim()}
            >
              {isRefining ? <span className="loading loading-spinner"></span> : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              )}
            </button>
          </form>
        </div>
      )}

    </div>
  );
}

