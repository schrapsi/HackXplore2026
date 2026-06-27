import { useState } from 'react'

function App() {
  const [prompt, setPrompt] = useState('')
  const [budget, setBudget] = useState('')

  const budgetTiers = [
    { id: '20k-50k', label: '$20k - $50k' },
    { id: '50k-100k', label: '$50k - $100k' },
    { id: '100k-200k', label: '$100k - $200k' },
    { id: '200k+', label: '$200k+' },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt || !budget) return
    console.log('Searching for:', { prompt, budget })
    // Transition to step 2: Project Matching
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Brand Header */}
      <div className="absolute top-8 left-8">
        <h1 className="text-2xl font-bold tracking-tighter">IMPACT</h1>
      </div>

      {/* Main Search Area */}
      <div className="w-full max-w-3xl flex flex-col items-center animate-fade-in-up">
        
        <h2 className="text-4xl md:text-5xl font-semibold mb-12 text-center text-base-content tracking-tight">
          How do you want to contribute to society?
        </h2>

        <form onSubmit={handleSearch} className="w-full flex flex-col gap-8">
          
          {/* Prompt Input */}
          <div className="relative w-full shadow-sm rounded-2xl group transition-all duration-300 focus-within:shadow-md focus-within:-translate-y-1">
            <textarea 
              className="w-full textarea textarea-bordered textarea-lg text-lg bg-base-100 rounded-2xl py-6 px-6 resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              rows={2}
              placeholder="e.g., I want to help build sustainable water infrastructure in Sub-Saharan Africa..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          {/* Budget Selection */}
          <div className="flex flex-col items-center gap-4 mt-4">
            <span className="text-sm font-medium uppercase tracking-widest text-base-content/60">Select Commitment Tier</span>
            <div className="flex flex-wrap justify-center gap-3">
              {budgetTiers.map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setBudget(tier.id)}
                  className={`btn btn-outline rounded-full px-6 border-base-content/20 hover:border-primary transition-all ${
                    budget === tier.id 
                      ? 'bg-primary text-primary-content border-primary shadow-lg scale-105 hover:bg-primary-focus' 
                      : 'hover:bg-base-200'
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

export default App
