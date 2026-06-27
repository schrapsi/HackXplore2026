import { useEffect, useState } from 'react'
import { TopNavigationBar } from './TopNavigationBar'

interface LandingPageProps {
  onSearch: (prompt: string, budget: string) => void;
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

export function LandingPage({ onSearch, onNavigateLogin }: LandingPageProps) {
  const [prompt, setPrompt] = useState('')
  const [budget, setBudget] = useState('')
  const [suggestionIndex, setSuggestionIndex] = useState(0)
  const [typedSuggestion, setTypedSuggestion] = useState('')

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

  const budgetTiers = [
    { id: '20k-50k', label: '€20k - €50k' },
    { id: '50k-100k', label: '€50k - €100k' },
    { id: '100k-200k', label: '€100k - €200k' },
    { id: '200k-500k', label: '€200k - €500k' },
    { id: '500k+', label: '> €500k' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt || !budget) return
    onSearch(prompt, budget)
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
              disabled={!prompt || !budget}
              className="btn btn-primary btn-wide rounded-full text-lg h-14 shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:shadow-none"
            >
              Find projects
            </button>
          </div>

        </form>
      </div>
      </div>
    </div>
  )
}
