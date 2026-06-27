import { useEffect, useState } from 'react'
import { TopNavigationBar } from './TopNavigationBar'

interface LandingPageProps {
  onSearch: (prompt: string, budget: string) => void | Promise<void>;
  onNavigateLogin: () => void;
}

const promptSuggestions = [
  'I want to fund sustainable water infrastructure in Sub-Saharan Africa...',
  'I want more trees, drinking fountains, and heat protection in Karlsruhe...',
  'I want to support safe, inclusive football fields in Ettlingen and Rheinstetten...',
  'I want to enable coding workshops and loaner laptops for young people in Karlsruhe...',
  'I want to support ocean protection and plastic cleanup in the Pacific...',
  'I want to strengthen local sports clubs in Stutensee with accessible equipment...',
  'I want to fund solar power for schools and community centers in rural areas...',
  'I want to support language and mentoring programs for newly arrived families in Bruchsal...',
  'I want to improve mental health and counseling services for young people...',
  'I want to restore riverbank habitats along the Rhine near Rastatt and Philippsburg...',
  'I want to fund digital education for girls and young women in Pforzheim...',
  'I want to support food rescue and warm meals for people in Karlsruhe...',
  'I want to fund disaster relief and climate-resilient infrastructure globally...',
  'I want to create inclusive play and movement spaces in Bretten and Karlsruhe neighborhoods...',
]

const typingSpeedMs = 12
const suggestionPauseMs = 1800
const searchSteps = [
  'Checking commitment tier',
  'Reading intent',
  'Ranking projects',
]

const searchStepDurationsMs = [700, 1300, 900]
const searchCalculationDelayMs = searchStepDurationsMs.reduce((total, duration) => total + duration, 0)

export function LandingPage({ onSearch, onNavigateLogin }: LandingPageProps) {
  const [prompt, setPrompt] = useState('')
  const [budget, setBudget] = useState('')
  const [suggestionIndex, setSuggestionIndex] = useState(0)
  const [typedSuggestion, setTypedSuggestion] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchStepIndex, setSearchStepIndex] = useState(0)

  useEffect(() => {
    const suggestion = promptSuggestions[suggestionIndex]
    let characterIndex = 0
    let nextSuggestionTimeoutId: number | undefined

    setTypedSuggestion('')

    const typingIntervalId = window.setInterval(() => {
      characterIndex += 1
      setTypedSuggestion(suggestion.slice(0, characterIndex))

      if (characterIndex >= suggestion.length) {
        window.clearInterval(typingIntervalId)
        nextSuggestionTimeoutId = window.setTimeout(() => {
          setSuggestionIndex((currentIndex) => (currentIndex + 1) % promptSuggestions.length)
        }, suggestionPauseMs)
      }
    }, typingSpeedMs)

    return () => {
      window.clearInterval(typingIntervalId)
      if (nextSuggestionTimeoutId) {
        window.clearTimeout(nextSuggestionTimeoutId)
      }
    }
  }, [suggestionIndex])

  useEffect(() => {
    if (!isSearching) {
      setSearchStepIndex(0)
      return
    }

    const stepTimeoutIds = searchStepDurationsMs.slice(0, -1).map((_, index) => {
      const nextStepDelay = searchStepDurationsMs
        .slice(0, index + 1)
        .reduce((total, duration) => total + duration, 0)

      return window.setTimeout(() => {
        setSearchStepIndex(index + 1)
      }, nextStepDelay)
    })

    return () => {
      stepTimeoutIds.forEach(timeoutId => window.clearTimeout(timeoutId))
    }
  }, [isSearching])

  const budgetTiers = [
    { id: '20k-50k', label: '€20k - €50k' },
    { id: '50k-100k', label: '€50k - €100k' },
    { id: '100k-200k', label: '€100k - €200k' },
    { id: '200k-500k', label: '€200k - €500k' },
    { id: '500k+', label: '> €500k' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt || !budget) return
    setSearchStepIndex(0)
    setIsSearching(true)
    try {
      await new Promise(resolve => window.setTimeout(resolve, searchCalculationDelayMs))
      await onSearch(prompt, budget)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <TopNavigationBar 
        rightElement={
          <button 
            onClick={onNavigateLogin} 
            className="btn btn-outline btn-sm rounded-full px-6 border-base-content/20"
          >
            Log in
          </button>
        }
      />

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {/* Main Search Area */}
        <div className="w-full max-w-3xl flex flex-col items-center animate-fade-in-up">
          
          <h2 className="text-4xl md:text-5xl font-semibold mb-12 text-center text-base-content tracking-tight">
          How do you want to improve the world today?
        </h2>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
          
          {/* Prompt Input */}
          <div className="relative w-full shadow-sm rounded-2xl group transition-all duration-300 focus-within:shadow-md focus-within:-translate-y-1">
            <textarea 
              className="w-full textarea textarea-bordered textarea-lg text-lg bg-base-100 rounded-2xl py-6 px-6 resize-none border-2 border-base-content/20 shadow-md shadow-base-content/5 placeholder:text-base-content/45 hover:border-base-content/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              rows={2}
              placeholder={typedSuggestion ? `${typedSuggestion}|` : ''}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          {/* Budget Selection */}
          <div className="flex flex-col items-center gap-4 mt-4">
            <span className="text-sm font-medium uppercase tracking-widest text-base-content/60">Select commitment tier</span>
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
              disabled={!prompt || !budget || isSearching}
              className="btn btn-primary btn-wide rounded-full text-lg h-14 shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:shadow-none"
            >
              {isSearching ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Calculating matches
                </>
              ) : 'Find projects'}
            </button>
          </div>

        </form>
      </div>
      </div>
      {isSearching && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-base-100/70 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-md rounded-3xl border border-primary/20 bg-base-100 p-6 shadow-2xl shadow-primary/20">
            <div className="flex items-center gap-4">
              <span className="loading loading-ring loading-lg text-primary"></span>
              <div>
                <p className="text-lg font-bold text-base-content">Analyzing your intent</p>
                <p className="text-sm text-base-content/60">{searchSteps[searchStepIndex]}...</p>
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-2">
              <div className="h-2 overflow-hidden rounded-full bg-base-300">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                  style={{ width: `${((searchStepIndex + 1) / searchSteps.length) * 100}%` }}
                ></div>
              </div>
              <ul className="mt-2 flex flex-col gap-2 text-sm">
                {searchSteps.map((step, index) => (
                  <li
                    key={step}
                    className={`flex items-center gap-2 transition-colors ${
                      index <= searchStepIndex ? 'text-base-content' : 'text-base-content/40'
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        index <= searchStepIndex ? 'bg-primary' : 'bg-base-300'
                      }`}
                    ></span>
                    <span className={index === searchStepIndex ? 'font-bold' : 'font-medium'}>
                      {step}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
