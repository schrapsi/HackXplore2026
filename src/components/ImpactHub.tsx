import { useState, useEffect } from 'react';
import { mockBackend } from '../data/auth';

interface ImpactHubProps {
  onBack: () => void;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  brand: string;
  committed: number;
}

export function ImpactHub({ onBack }: ImpactHubProps) {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaders = async () => {
      const data = await mockBackend.getTopImpacters();
      setLeaders(data);
      setLoading(false);
    };
    fetchLeaders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200/30">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const top3 = leaders.slice(0, 3);
  const runnersUp = leaders.slice(3);

  // Helper to reorder top 3 for podium (2, 1, 3)
  const podiumOrder = [top3[1], top3[0], top3[2]].filter(Boolean);

  return (
    <div className="min-h-screen bg-base-200/50 pb-16 animate-fade-in">
      {/* Brand Header */}
      <header className="sticky top-0 z-30 bg-base-200/80 backdrop-blur-md border-b border-base-300 py-4 px-6 md:px-12 flex justify-between items-center transition-all">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold tracking-tighter text-primary">IMPACT.</span>
          <span className="badge badge-sm badge-outline badge-neutral">HUB</span>
        </div>
        <button onClick={onBack} className="btn btn-ghost btn-sm rounded-full px-4 text-xs font-semibold hover:bg-base-content/10">
          Back to Dashboard
        </button>
      </header>

      <div className="max-w-5xl mx-auto mt-12 flex flex-col items-center">

        {/* Podium Section */}
        <div className="flex items-end justify-center gap-2 md:gap-6 w-full max-w-4xl h-96 mb-20 px-4 mt-8">
          {podiumOrder.map((entry, idx) => {
            // idx 0 is rank 2 (Silver)
            // idx 1 is rank 1 (Gold)
            // idx 2 is rank 3 (Bronze)
            const isGold = entry.rank === 1;
            const isSilver = entry.rank === 2;
            
            const heightClass = isGold ? 'h-[280px]' : isSilver ? 'h-[200px]' : 'h-[140px]';
            const colorClass = isGold ? 'bg-warning/20 border-warning text-warning-content' : isSilver ? 'bg-base-300 border-base-content/20 text-base-content' : 'bg-orange-900/20 border-orange-900/30 text-orange-900';
            const medalColor = isGold ? 'text-warning' : isSilver ? 'text-base-content/50' : 'text-orange-800';
            
            return (
              <div key={entry.rank} className={`flex flex-col items-center justify-end w-1/3 max-w-[200px] h-full animate-fade-in-up`} style={{ animationDelay: `${idx * 150}ms` }}>
                <div className="flex flex-col items-center mb-4 text-center">
                  <div className={`text-4xl mb-2 ${medalColor}`}>
                    {isGold ? '🥇' : isSilver ? '🥈' : '🥉'}
                  </div>
                  <h3 className="font-bold text-lg md:text-xl truncate w-full px-2" title={entry.brand}>{entry.brand}</h3>
                  <span className="text-sm opacity-70">{entry.name}</span>
                </div>
                <div className={`w-full ${heightClass} ${colorClass} border-t-4 rounded-t-2xl shadow-lg flex flex-col items-center justify-start pt-6 transition-transform hover:-translate-y-2`}>
                  <span className="text-sm font-bold uppercase tracking-widest opacity-60 mb-1">Committed</span>
                  <span className="text-xl md:text-2xl font-black">€{(entry.committed / 1000).toFixed(0)}k</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* List Section */}
        <div className="w-full max-w-3xl bg-base-100 rounded-3xl shadow-xl overflow-hidden border border-base-content/10">
          <div className="bg-base-200/50 p-6 border-b border-base-content/10">
            <h3 className="text-xl font-bold">Rising Impacters</h3>
          </div>
          <div className="divide-y divide-base-content/10">
            {runnersUp.map((entry, idx) => (
              <div key={entry.rank} className="flex items-center p-6 hover:bg-base-200/30 transition-colors" style={{ animationDelay: `${(idx + 3) * 50}ms` }}>
                <div className="w-12 text-2xl font-bold text-base-content/30">#{entry.rank}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg">{entry.brand}</h4>
                  <span className="text-sm text-base-content/60">{entry.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-lg text-primary">€{(entry.committed / 1000).toFixed(0)}k</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
