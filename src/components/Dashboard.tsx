import { useEffect, useMemo, useRef, useState } from 'react';
import type { User, Project, ProjectUpdate } from '../types';
import { sampleProjects, calculateTotalCommitment } from '../data/projects';
import { sampleUpdates, getUpdatesForProject } from '../data/updates';
import { MetricChart } from './MetricChart';
import { TopNavigationBar } from './TopNavigationBar';

interface DashboardProps {
  user: User | null;
  onLogout: () => void;
  onFundAnother: () => void;
  onNavigateHub: () => void;
}

interface GlobalFeedItem {
  update: ProjectUpdate;
  supporterName: string;
  supporterHub: string;
  avatarUrl: string;
}

export function Dashboard({ user, onLogout, onFundAnother, onNavigateHub }: DashboardProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [likedUpdates, setLikedUpdates] = useState<Set<string>>(new Set());
  const [selectedFeed, setSelectedFeed] = useState<'personal' | 'global'>('personal');
  const [pitchPost, setPitchPost] = useState<GlobalFeedItem | null>(null);
  const [pitchMode, setPitchMode] = useState<'post' | 'video'>('post');
  const pitchVideoRef = useRef<HTMLVideoElement | null>(null);

  const closePitchMode = () => {
    setPitchPost(null);
    setPitchMode('post');
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {
        // Fullscreen can fail if the browser has already exited it.
      });
    }
  };

  const openPitchMode = (post: GlobalFeedItem) => {
    setPitchPost(post);
    setPitchMode('post');
    document.documentElement.requestFullscreen?.().catch(() => {
      // The overlay still works if fullscreen is blocked.
    });
  };

  // 1. Get projects supported by the user
  const supportedProjects = useMemo(() => {
    if (!user) return [];
    return user.fundedProjects.map(funded => {
      const project = sampleProjects.find(p => p.id === funded.projectId);
      return {
        project,
        commitment: funded.amountCommitted,
        date: funded.date,
      };
    }).filter((item): item is { project: Project; commitment: string; date: string } => !!item.project);
  }, [user]);

  // 2. Aggregate Tangible Metrics
  const tangibleMetrics = useMemo(() => {
    return supportedProjects.map(item => ({
      id: item.project.id,
      title: item.project.title,
      metric: item.project.impactMetric,
    }));
  }, [supportedProjects]);

  // 3. Compile Feed Items: Updates from the user's supported projects
  const feedUpdates: ProjectUpdate[] = useMemo(() => {
    if (!user) return [];
    
    let updates: ProjectUpdate[] = [];
    user.fundedProjects.forEach(funded => {
      const project = sampleProjects.find(p => p.id === funded.projectId);
      const projectTitle = project ? project.title : 'Project';
      updates = [...updates, ...getUpdatesForProject(funded.projectId, projectTitle)];
    });

    // Filter by selected project if applicable
    if (selectedProjectId) {
      updates = updates.filter(u => u.projectId === selectedProjectId);
    }

    // Sort newest first
    return updates.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [user, selectedProjectId]);

  const globalFeedItems: GlobalFeedItem[] = useMemo(() => {
    return [
      {
        supporterName: 'Mira S.',
        supporterHub: 'Karlsruhe Kids Fund',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120',
        update: {
          id: 'global-karlsruhe-kindergarten-launch',
          projectId: 'karlsruhe-kids-kindergarten',
          title: 'Kindergarten courtyard upgrade approved',
          description: 'The first planning session with educators and parents is complete. The team is prioritizing shaded outdoor learning areas, safer play surfaces, and sensory planting for daily kindergarten use.',
          imageUrl: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=800',
          date: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        },
      },
      {
        supporterName: 'Impact.',
        supporterHub: 'HackXplore 2026',
        avatarUrl: '/impact_by_lbbw.svg',
        update: {
          id: 'global-lbbw-initial-support',
          projectId: 'karlsruhe-kids-maker-club',
          title: 'Impact. thanks LBBW for their support',
          description: 'LBBW helped us turn this impact-matching platform into a working prototype. Their support gave the team room to validate the idea, sharpen the project experience, and connect funding intent with concrete local outcomes.',
          imageUrl: '/team_image.jpeg',
          date: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
        },
      },
      {
        supporterName: 'Sarah J.',
        supporterHub: 'Sarah Cares',
        avatarUrl: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&q=80&w=120',
        update: {
          id: 'global-maker-club-materials',
          projectId: 'karlsruhe-kids-maker-club',
          title: 'First maker kits selected for after-school sessions',
          description: 'Mentors have selected beginner-friendly robotics kits, craft materials, and learning modules for the first Karlsruhe after-school maker club cohort.',
          imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
      },
      {
        supporterName: 'David K.',
        supporterHub: 'Future Builders',
        avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120',
        update: {
          id: 'global-sports-fund-coaches',
          projectId: 'karlsruhe-kids-play-sports',
          title: 'Volunteer coaches join the kids sports fund',
          description: 'Local coaches are preparing inclusive weekly play sessions with equipment lending and transport help, making it easier for children across Karlsruhe to participate.',
          imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800',
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        },
      },
    ];
  }, []);

  useEffect(() => {
    if (!pitchPost) return;

    const handlePitchKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePitchMode();
        return;
      }

      if (event.code === 'Space' && pitchMode === 'post') {
        event.preventDefault();
        setPitchMode('video');
      }
    };

    window.addEventListener('keydown', handlePitchKeyDown);

    return () => window.removeEventListener('keydown', handlePitchKeyDown);
  }, [pitchMode, pitchPost]);

  useEffect(() => {
    if (pitchMode === 'video') {
      pitchVideoRef.current?.play().catch(() => {
        // Browser policies can still block playback in edge cases.
      });
    }
  }, [pitchMode]);

  // If there's no user, show a loading/fallback state
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4 text-base-content/60">Loading your profile...</p>
      </div>
    );
  }

  // Handle Like Toggle
  const handleLike = (updateId: string) => {
    setLikedUpdates(prev => {
      const next = new Set(prev);
      if (next.has(updateId)) {
        next.delete(updateId);
      } else {
        next.add(updateId);
      }
      return next;
    });
  };



  // Format dates nicely
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const diffTime = Math.abs(Date.now() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Generate a deterministic base number of likes for mockup richness
  const getBaseLikes = (id: string) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash % 45) + 12; // 12-56 likes base
  };

  // Generate a deterministic base number of comments for mockup richness (independent of likes)
  const getBaseComments = (id: string) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash % 8) + 2; // 2-9 comments base
  };

  const renderFeedCard = (
    update: ProjectUpdate,
    project: Project | undefined,
    supporterName: string,
    avatarUrl?: string,
    supporterHub?: string,
    onOpenPost?: () => void,
  ) => {
    const isLiked = likedUpdates.has(update.id);
    const totalLikes = getBaseLikes(update.id) + (isLiked ? 1 : 0);
    const avatarInitial = supporterName.charAt(0).toUpperCase();

    return (
      <article
        key={update.id}
        onClick={onOpenPost}
        role={onOpenPost ? 'button' : undefined}
        tabIndex={onOpenPost ? 0 : undefined}
        onKeyDown={(event) => {
          if (!onOpenPost) return;
          if (event.key === 'Enter') {
            onOpenPost();
          }
        }}
        className={`card bg-base-100 border border-base-300 shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden group ${
          onOpenPost ? 'cursor-pointer' : ''
        }`}
      >
        <div className="p-6 pb-4 flex justify-between items-start gap-4">
          <div className="flex items-center gap-3">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={supporterName}
                className="w-10 h-10 rounded-full object-cover border border-base-300 shadow-sm"
              />
            ) : (
              <div className="avatar placeholder">
                <div className="bg-primary/10 text-primary rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm border border-primary/20">
                  {avatarInitial}
                </div>
              </div>
            )}
            <div>
              <div className="text-sm">
                <span className="font-extrabold text-base-content">{supporterName}</span>
                <span className="text-base-content/65 font-medium"> supported </span>
                <span className="font-extrabold text-primary hover:underline cursor-pointer">
                  {project?.title}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-0.5">
                <span className="text-xs text-base-content/40 font-medium">
                  {formatDate(update.date)}
                </span>
                {supporterHub && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-base-content/30"></span>
                    <span className="text-xs text-base-content/45 font-semibold">{supporterHub}</span>
                  </>
                )}
                <span className="w-1 h-1 rounded-full bg-base-content/30"></span>
                <span className="badge badge-xs bg-success/10 text-success border-transparent font-bold">
                  Verified Impact
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 flex flex-col gap-3">
          <h3 className="text-xl font-bold tracking-tight text-base-content group-hover:text-primary transition-colors">
            {update.title}
          </h3>
          <p className="text-sm leading-relaxed text-base-content/85">
            {update.description}
          </p>

          {update.imageUrl && (
            <div className="relative mt-2 overflow-hidden rounded-2xl border border-base-300 aspect-video">
              <img
                src={update.imageUrl}
                alt={update.title}
                className="object-cover w-full h-full group-hover:scale-[1.02] transition-transform duration-500 ease-out"
              />
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-base-200/40 border-t border-base-300 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={(event) => {
                event.stopPropagation();
                handleLike(update.id);
              }}
              className={`flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 ${
                isLiked
                  ? 'text-red-500 scale-105'
                  : 'text-base-content/60 hover:text-red-500'
              }`}
            >
              <span className="relative flex items-center justify-center">
                {isLiked && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 absolute scale-125 animate-ping opacity-30 text-red-500"
                  >
                    <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                )}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={isLiked ? 'currentColor' : 'none'}
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </span>
              <span className="tabular-nums">{totalLikes}</span>
            </button>

            <div className="flex items-center gap-1.5 text-sm font-semibold text-base-content/60 hover:text-primary transition-colors cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.921 1.78 4.42 4.42 0 002.386-.718 2.376 2.376 0 011.516-.295c.783.088 1.58.132 2.383.132z" />
              </svg>
              <span>{getBaseComments(update.id)}</span>
            </div>
          </div>
        </div>
      </article>
    );
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content font-sans pb-16">
      <TopNavigationBar 
        badgeText="DASHBOARD"
        rightElement={
          <>
            <button 
              onClick={onNavigateHub}
              className="btn btn-outline btn-sm rounded-full px-4 font-semibold text-primary border-primary/20 hover:bg-primary hover:text-primary-content hover:border-primary transition-colors"
            >
              Top Impacts
            </button>
            <div className="flex items-center gap-2 ml-2">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border border-base-300 shadow-sm"
                />
              ) : (
                <div className="avatar placeholder">
                  <div className="bg-primary text-primary-content rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shadow-inner">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </div>
              )}
              <div className="hidden sm:block text-left mr-2">
                <p className="text-xs font-semibold leading-tight truncate max-w-[100px]">{user.name}</p>
              </div>
            </div>
            <button 
              onClick={onLogout}
              className="btn btn-ghost btn-sm rounded-full px-3 text-xs font-semibold text-error hover:bg-error/10 hover:text-error"
            >
              Logout
            </button>
          </>
        }
      />

      {/* 📂 Main Content Layout (Grid) */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ==================== LEFT COLUMN (1/3): PROFILE & STATS ==================== */}
        <section className="lg:col-span-1 flex flex-col gap-6">
          
          {/* Neobroker-Inspired Stats Card */}
          <div className="card bg-base-200/50 border border-base-300 shadow-sm p-6 rounded-3xl flex flex-col gap-6">
            <div>
              <p className="text-xs font-bold tracking-wider text-base-content/40 uppercase">Total Commitment</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-4xl md:text-5xl font-black tracking-tight text-primary">
                  {supportedProjects.length > 0 
                    ? `€${supportedProjects.reduce((acc, curr) => {
                        const numericVal = parseFloat(curr.commitment);
                        if (!isNaN(numericVal)) {
                          return acc + numericVal;
                        }
                        return acc + calculateTotalCommitment(curr.project.initialCost, curr.project.runningCostsPerYear);
                      }, 0).toLocaleString()}`
                    : '€0'
                  }
                </span>
                <span className="text-xs font-medium text-base-content/50 uppercase">EUR</span>
              </div>
              
              {/* Cost breakdown for prototype (single project assumption) */}
              {supportedProjects.length > 0 && (
                <div className="mt-3 bg-base-100/50 rounded-2xl p-3 border border-base-300/30 flex flex-col gap-1.5 text-xs text-base-content/80">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-base-content/50">Initial Launch Cost</span>
                    <span className="font-extrabold text-base-content">€{supportedProjects[0].project.initialCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-base-content/50">Yearly Running Cost</span>
                    <span className="font-extrabold text-base-content">€{supportedProjects[0].project.runningCostsPerYear.toLocaleString()}/yr</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-success font-medium">
                    <span>Maintenance Fund (upkeep covered)</span>
                    <span>€{(supportedProjects[0].project.runningCostsPerYear / 0.04).toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-base-300/80 pt-4">
              <div>
                <p className="text-xs text-base-content/40 uppercase font-semibold">Projects</p>
                <p className="text-2xl font-bold mt-0.5">{supportedProjects.length}</p>
              </div>
              <div>
                <p className="text-xs text-base-content/40 uppercase font-semibold">Tier Status</p>
                <p className="text-2xl font-bold text-accent mt-0.5">Active</p>
              </div>
            </div>

            {/* Tangible Metrics Accumulator */}
            <div className="border-t border-base-300/80 pt-4 flex flex-col gap-3">
              <h4 className="text-xs font-bold tracking-wider text-base-content/40 uppercase">Tangible Impact Metrics</h4>
              {tangibleMetrics.length > 0 ? (
                <ul className="flex flex-col gap-2">
                  {tangibleMetrics.map(item => (
                    <li key={item.id} className="flex gap-2 items-start text-sm">
                      <span className="text-success text-base">✓</span>
                      <div className="flex-1">
                        <span className="font-semibold text-base-content">{item.metric}</span>
                        <p className="text-xs text-base-content/50">via {item.title}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-base-content/50">No metrics available yet.</p>
              )}
            </div>
          </div>

          {/* Repeat Funding CTA */}
          <button 
            onClick={onFundAnother}
            className="btn btn-primary btn-lg rounded-3xl w-full text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            Fund Another Project
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2.5} 
              stroke="currentColor" 
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>

          {/* Supported Projects List (Sidebar Filter) */}
          <div className="card bg-base-100 border border-base-300 shadow-sm p-6 rounded-3xl flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm tracking-tight text-base-content/75 uppercase">Supported Initiatives</h3>
              {selectedProjectId && (
                <button 
                  onClick={() => setSelectedProjectId(null)}
                  className="text-xs text-primary font-semibold hover:underline"
                >
                  Clear Filter
                </button>
              )}
            </div>

            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedProjectId(null)}
                className={`flex items-center gap-3 p-3 rounded-2xl text-left transition-all border duration-300 ${
                  selectedProjectId === null 
                    ? 'bg-primary/10 border-primary text-primary font-bold shadow-sm' 
                    : 'bg-base-200/40 border-transparent text-base-content hover:bg-base-200'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-base-content/10 flex items-center justify-center font-bold text-xs">
                  All
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold truncate">All Funded Projects</p>
                  <p className="text-xs opacity-60">Showing {sampleUpdates.filter(u => new Set(user.fundedProjects.map(p => p.projectId)).has(u.projectId)).length} updates</p>
                </div>
              </button>

              {supportedProjects.map(item => (
                <button
                  key={item.project.id}
                  onClick={() => setSelectedProjectId(item.project.id)}
                  className={`flex items-center gap-3 p-3 rounded-2xl text-left transition-all border duration-300 ${
                    selectedProjectId === item.project.id 
                      ? 'bg-primary/10 border-primary text-primary font-bold shadow-sm' 
                      : 'bg-base-200/40 border-transparent text-base-content hover:bg-base-200'
                  }`}
                >
                  <img 
                    src={item.project.logoUrl} 
                    alt={item.project.title} 
                    className="w-8 h-8 rounded-full object-cover shadow-sm border border-base-300"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{item.project.title}</p>
                    <p className="text-xs opacity-60 truncate">
                      Initial: €{item.project.initialCost.toLocaleString()} • Running: €{item.project.runningCostsPerYear.toLocaleString()}/yr
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </section>

        {/* ==================== RIGHT COLUMN (2/3): LIVE UPDATES FEED & DIAGRAMS ==================== */}
        <section className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Project Impact Metrics Diagram */}
          {(() => {
            const activeChartProject = selectedProjectId 
              ? supportedProjects.find(p => p.project.id === selectedProjectId)?.project 
              : supportedProjects[0]?.project;
            return activeChartProject ? (
              <MetricChart metric={activeChartProject.metric} />
            ) : null;
          })()}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                {selectedFeed === 'personal' ? 'Personal Feed' : 'Global Feed'}
              </h2>
              <div className="badge badge-neutral shadow-sm font-medium py-3 px-3 mt-2">
                {selectedFeed === 'personal' ? feedUpdates.length : globalFeedItems.length} Updates
              </div>
            </div>
            <div className="relative grid grid-cols-2 bg-base-200 p-1 rounded-full border border-base-300 w-full sm:w-64 shadow-inner">
              <span
                className={`absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-primary shadow-sm transition-transform duration-300 ease-out ${
                  selectedFeed === 'global' ? 'translate-x-full' : 'translate-x-0'
                }`}
                aria-hidden="true"
              ></span>
              <button
                type="button"
                onClick={() => setSelectedFeed('personal')}
                className={`relative z-10 rounded-full px-5 py-2 text-sm font-bold transition-colors duration-300 ${
                  selectedFeed === 'personal' ? 'text-primary-content' : 'text-base-content/70 hover:text-base-content'
                }`}
              >
                Personal
              </button>
              <button
                type="button"
                onClick={() => setSelectedFeed('global')}
                className={`relative z-10 rounded-full px-5 py-2 text-sm font-bold transition-colors duration-300 ${
                  selectedFeed === 'global' ? 'text-primary-content' : 'text-base-content/70 hover:text-base-content'
                }`}
              >
                Global
              </button>
            </div>
          </div>

          {/* Fallback Empty Feed State */}
          {selectedFeed === 'personal' && feedUpdates.length === 0 ? (
            <div className="card bg-base-100 border border-base-300 shadow-sm p-12 rounded-3xl flex flex-col items-center justify-center text-center">
              <span className="text-4xl mb-4">🌱</span>
              <h3 className="text-lg font-bold">No active updates yet</h3>
              <p className="text-sm text-base-content/60 mt-1 max-w-sm">
                Once the projects you support publish live status updates, they will appear in real time on this feed.
              </p>
              <button 
                onClick={onFundAnother}
                className="btn btn-primary rounded-full px-6 mt-6"
              >
                Fund a Project Now
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {selectedFeed === 'personal'
                ? feedUpdates.map(update => renderFeedCard(
                    update,
                    sampleProjects.find(p => p.id === update.projectId),
                    user.name,
                    user.avatarUrl,
                  ))
                : globalFeedItems.map(item => renderFeedCard(
                    item.update,
                    sampleProjects.find(project => project.id === item.update.projectId),
                    item.supporterName,
                    item.avatarUrl,
                    item.supporterHub,
                    item.update.id === 'global-lbbw-initial-support'
                      ? () => {
                          openPitchMode(item);
                        }
                      : undefined,
                  ))}
            </div>
          )}

        </section>

      </main>
      {pitchPost && (
        <div className="fixed inset-0 z-[6000] bg-base-100 text-base-content animate-fade-in">
          {pitchMode === 'post' ? (
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-base-300 px-6 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src={pitchPost.avatarUrl}
                    alt={pitchPost.supporterName}
                    className="h-11 w-11 rounded-full border border-base-300 object-cover bg-base-100"
                  />
                  <div>
                    <p className="font-extrabold">{pitchPost.supporterName}</p>
                    <p className="text-sm font-semibold text-base-content/50">{pitchPost.supporterHub}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closePitchMode}
                  className="btn btn-ghost btn-sm rounded-full px-4"
                >
                  Close
                </button>
              </div>

              <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-2">
                <div className="min-h-0 bg-base-200">
                  {pitchPost.update.imageUrl && (
                    <img
                      src={pitchPost.update.imageUrl}
                      alt={pitchPost.update.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="flex min-h-0 flex-col justify-center p-8 md:p-14 lg:p-20">
                  <span className="badge badge-primary mb-6 w-fit px-4 py-3 font-bold">Global Feed</span>
                  <h1 className="text-4xl font-black leading-tight tracking-tight md:text-6xl">
                    {pitchPost.update.title}
                  </h1>
                  <p className="mt-8 text-lg leading-relaxed text-base-content/75 md:text-2xl">
                    {pitchPost.update.description}
                  </p>
                  <div className="mt-10 flex items-center gap-3 text-sm font-bold uppercase tracking-wide text-base-content/45">
                    <span>Press Space</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-base-content/30"></span>
                    <span>Play impact animation</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative h-full w-full bg-black">
              <video
                ref={pitchVideoRef}
                src="/ImpactAnimation.mp4"
                className="h-full w-full object-cover"
                autoPlay
                playsInline
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
