import { useState } from 'react';
import type { Project } from '../types';
import { calculateTotalCommitment } from '../data/projects';
import { TopNavigationBar } from './TopNavigationBar';
import { ProjectMap } from './ProjectMap';

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
    <div className="flex flex-col bg-base-200/50 h-[100dvh] overflow-hidden">
      
      <TopNavigationBar 
        badgeText="DISCOVERY"
        rightElement={
          <button onClick={onBack} className="btn btn-ghost btn-sm rounded-full px-6 font-semibold">
            Start over
          </button>
        }
      />

      <div className="w-full max-w-6xl mx-auto flex-1 flex flex-col px-4 py-4 min-h-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2 shrink-0">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold text-base-content">
              Curated projects for you
            </h2>
            <p className="text-base-content/60 text-sm">
              Based on your input, here are the most impactful initiatives you can fund today.
            </p>
          </div>
          
          {/* View Toggler */}
          <div className="flex justify-center md:justify-end shrink-0">
            <div className="relative grid grid-cols-2 bg-base-100 p-1 rounded-full shadow-sm border border-base-300 w-full sm:w-64">
              <span
                className={`absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-primary shadow-sm transition-transform duration-300 ease-out ${
                  activeView === 'map' ? 'translate-x-full' : 'translate-x-0'
                }`}
                aria-hidden="true"
              ></span>
              <button 
                className={`relative z-10 flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-bold transition-colors duration-300 ${
                  activeView === 'grid' ? 'text-primary-content' : 'text-base-content/70 hover:text-base-content'
                }`}
                onClick={() => setActiveView('grid')}
              >
                Card Grid
              </button>
              <button 
                className={`relative z-10 flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-bold transition-colors duration-300 ${
                  activeView === 'map' ? 'text-primary-content' : 'text-base-content/70 hover:text-base-content'
                }`}
                onClick={() => setActiveView('map')}
              >
                Map View
              </button>
            </div>
          </div>
        </div>

        {/* Alternative Views */}
        {activeView === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 flex-1 min-h-0 pb-20 overflow-y-auto">
            {projects.map(project => (
              <div key={project.id} className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 border border-base-300 group overflow-hidden flex flex-col h-full">
                
                <figure className="relative h-[30%] min-h-[140px] overflow-hidden w-full shrink-0">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="object-cover absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Gradient overlay to make text readable */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"></div>
                  
                  <div className="absolute top-3 left-3">
                    <span className="badge badge-primary text-xs font-semibold shadow-sm px-3 py-3">{project.location}</span>
                  </div>

                  {/* Floating Title */}
                  <div className="absolute bottom-0 left-0 w-full p-4 z-10">
                    <h2 
                      className="text-xl lg:text-2xl font-extrabold text-white leading-tight m-0"
                      style={{ textShadow: '0 0 12px var(--color-primary)' }}
                    >
                      {project.title}
                    </h2>
                  </div>
                </figure>

                <div className="card-body p-5 lg:p-6 flex flex-col flex-1 gap-0">
                  
                  {/* Top Header Section */}
                  <div className="flex flex-col gap-3 shrink-0">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-primary/10 text-primary font-bold text-[10px] uppercase tracking-wider rounded-full">
                        {project.categoryLabel}
                      </span>
                    </div>
                    
                    <p className="text-base-content/80 text-xs lg:text-sm leading-relaxed m-0">
                      {project.description}
                    </p>
                  </div>

                  {/* Budget Box - my-auto to absorb whitespace */}
                  <div className="my-auto flex flex-col justify-center">
                    {(() => {
                      const total = calculateTotalCommitment(project.initialCost, project.runningCostsPerYear);
                      const endowment = project.runningCostsPerYear / 0.04;
                      return (
                        <div className="bg-base-200/40 rounded-2xl p-4 lg:p-5 border border-base-300/40 flex flex-col gap-2 shadow-inner">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] lg:text-xs uppercase font-extrabold text-primary tracking-wider">Required Commitment</span>
                            <span className="text-lg lg:text-xl font-black text-base-content">€{total.toLocaleString()}</span>
                          </div>
                          <div className="border-t border-base-300/60 my-1"></div>
                          <div className="grid grid-cols-2 gap-4 text-[11px] lg:text-xs text-base-content/70">
                            <div>
                              <span className="font-semibold block text-base-content/50">Initial Launch</span>
                              <span className="font-bold text-base-content text-sm lg:text-base">€{project.initialCost.toLocaleString()}</span>
                            </div>
                            <div className="text-right">
                              <span className="font-semibold block text-base-content/50">Yearly Running</span>
                              <span className="font-bold text-base-content text-sm lg:text-base">€{project.runningCostsPerYear.toLocaleString()}/yr</span>
                              <span className="block text-[9px] text-base-content/40 leading-tight mt-1 text-success font-semibold">
                                (upkeep via €{endowment.toLocaleString()} fund)
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                  
                  {/* Bottom Footer Section */}
                  <div className="flex flex-col gap-1 mt-auto shrink-0 pt-4">
                    <span className="text-[10px] uppercase font-bold text-accent tracking-wider">Estimated impact</span>
                    <span className="text-base-content font-bold text-sm leading-tight">{project.impactMetric}</span>
                    
                    <div className="card-actions justify-end mt-4">
                      <button 
                        onClick={() => onFundProject(project)}
                        className="btn btn-primary h-12 min-h-12 text-base w-full rounded-full shadow-lg hover:scale-[1.02] transition-transform"
                      >
                        Fund this project
                      </button>
                    </div>
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
