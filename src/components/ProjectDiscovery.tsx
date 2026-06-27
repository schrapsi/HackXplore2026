import type { Project } from '../types';

interface ProjectDiscoveryProps {
  projects: Project[];
  onBack: () => void;
  onFundProject: (project: Project) => void;
}

export function ProjectDiscovery({ projects, onBack, onFundProject }: ProjectDiscoveryProps) {
  if (projects.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-3xl font-semibold mb-4">No exact matches found</h2>
        <p className="text-base-content/70 mb-8 text-center max-w-md">
          We couldn't find a project matching your exact criteria and budget. Try adjusting your prompt or commitment tier.
        </p>
        <button onClick={onBack} className="btn btn-outline btn-primary rounded-full px-8">
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8 bg-base-200/50">
      
      {/* Header */}
      <div className="w-full max-w-6xl mx-auto flex justify-between items-center mb-12">
        <h1 className="text-2xl font-bold tracking-tighter text-primary">IMPACT.</h1>
        <button onClick={onBack} className="btn btn-ghost rounded-full px-6">
          Start over
        </button>
      </div>

      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-semibold text-base-content">
            Curated projects for you
          </h2>
          <p className="text-base-content/60 mt-2 text-lg">
            Based on your input, here are the most impactful initiatives you can fund today.
          </p>
        </div>

        {/* Project Grid */}
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
                  <span className="badge badge-ghost">
                    {project.coordinates.lat.toFixed(4)}, {project.coordinates.lng.toFixed(4)}
                  </span>
                </div>
                <p className="text-base-content/80 text-sm mt-2 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex justify-between items-center bg-base-200/50 rounded-xl p-3 my-3 text-sm border border-base-300/30">
                  <div>
                    <span className="text-xs uppercase font-bold text-base-content/40 block">Initial Cost</span>
                    <span className="font-extrabold text-base-content">${project.initialCost.toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs uppercase font-bold text-base-content/40 block">Running Cost/Yr</span>
                    <span className="font-extrabold text-base-content">${project.runningCostsPerYear.toLocaleString()}</span>
                  </div>
                </div>
                
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
      </div>
      
    </div>
  );
}
