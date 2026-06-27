import { useState } from 'react'

interface LandingPageProps {
  onSearch: (prompt: string, budget: string) => void;
}

export function LandingPage({ onSearch }: LandingPageProps) {
  const [prompt, setPrompt] = useState('')
  const [budget, setBudget] = useState('')

  const budgetTiers = [
    { id: '20k-50k', label: '$20k - $50k' },
    { id: '50k-100k', label: '$50k - $100k' },
    { id: '100k-200k', label: '$100k - $200k' },
    { id: '200k+', label: '$200k+' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt || !budget) return
    onSearch(prompt, budget)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Brand Header */}
      <div className="absolute top-8 left-8">
        <h1 className="text-2xl font-bold tracking-tighter text-primary">IMPACT</h1>
      </div>

      {/* Main Search Area */}
      <div className="w-full max-w-3xl flex flex-col items-center animate-fade-in-up">
        
        <h2 className="text-4xl md:text-5xl font-semibold mb-12 text-center text-base-content tracking-tight">
          How do you want to contribute to society?
        </h2>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
          
          {/* Prompt Input */}
          <div className="relative w-full shadow-sm rounded-2xl group transition-all duration-300 focus-within:shadow-md focus-within:-translate-y-1">
            <textarea 
              className="w-full textarea textarea-bordered textarea-lg text-lg bg-base-100 rounded-2xl py-6 px-6 resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all border-base-300"
              rows={2}
              placeholder="e.g., I want to help build sustainable water infrastructure in Sub-Saharan Africa..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          {/* Budget Selection */}
          <div className="flex flex-col items-center gap-4 mt-4">
            <span className="text-sm font-medium uppercase tracking-widest text-base-content/60">Select Commitment Tier</span>
            <div className="flex flex-wrap justify-center gap-4">
              {budgetTiers.map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setBudget(tier.id)}
                  className={`btn rounded-full px-8 text-base border-2 transition-all duration-300 ${
                    budget === tier.id 
                      ? 'bg-accent text-accent-content border-accent shadow-xl shadow-accent/30 scale-110 ring-4 ring-accent/20' 
                      : 'bg-base-200 border-transparent text-base-content hover:bg-base-300 hover:border-base-content/20'
                  }`}
                >
                  {tier.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-center mt-8">
            <button 
              type="submit" 
              disabled={!prompt || !budget}
              className="btn btn-primary btn-wide rounded-full text-lg h-14 shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:shadow-none"
            >
              Find Projects
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}
