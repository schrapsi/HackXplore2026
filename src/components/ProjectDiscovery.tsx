import { useState, useEffect, useRef } from 'react';
import type { Project } from '../types';
import { calculateTotalCommitment, chatWithLLM } from '../data/projects';
import { TopNavigationBar } from './TopNavigationBar';

interface Message {
  role: 'user' | 'model';
  parts: [{ text: string }];
  projects?: Project[];
}

interface ProjectDiscoveryProps {
  initialPrompt: string;
  budget: string;
  onBack: () => void;
  onFundProject: (project: Project) => void;
}

export function ProjectDiscovery({ initialPrompt, budget, onBack, onFundProject }: ProjectDiscoveryProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialPrompt && messages.length === 0) {
      handleSend(initialPrompt);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { role: 'user', parts: [{ text }] }
    ];
    setMessages(newMessages);
    setCurrentInput('');
    setIsLoading(true);

    try {
      // Send only the necessary fields to the LLM to avoid sending internal state
      const chatHistory = newMessages.map(m => ({ role: m.role, parts: m.parts }));
      const response = await chatWithLLM(chatHistory, budget);
      setMessages([
        ...newMessages,
        {
          role: 'model',
          parts: [{ text: response.reply }],
          projects: response.projects
        }
      ]);
    } catch (error) {
      console.error(error);
      setMessages([
        ...newMessages,
        {
          role: 'model',
          parts: [{ text: 'Sorry, I encountered an error while processing your request.' }]
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200/50 flex flex-col">
      <TopNavigationBar 
        badgeText="CHAT"
        rightElement={
          <button onClick={onBack} className="btn btn-ghost btn-sm rounded-full px-6 font-semibold">
            Start over
          </button>
        }
      />

      <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-8 pb-32">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat ${msg.role === 'user' ? 'chat-end' : 'chat-start'}`}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full bg-base-300 flex items-center justify-center">
                  {msg.role === 'user' ? 'U' : 'AI'}
                </div>
              </div>
              <div className="chat-header text-xs opacity-50 mb-1">
                {msg.role === 'user' ? 'You' : 'HackXplore Matcher'}
              </div>
              <div className={`chat-bubble ${msg.role === 'user' ? 'chat-bubble-primary text-primary-content' : 'chat-bubble-base-100 text-base-content shadow-sm'} p-4`}>
                <p className="whitespace-pre-wrap leading-relaxed">{msg.parts[0].text}</p>
              </div>

              {/* Display suggested projects if model returned any */}
              {msg.role === 'model' && msg.projects && msg.projects.length > 0 && (
                <div className="mt-6 chat-footer w-full max-w-3xl">
                  <div className="flex flex-col gap-6">
                    {msg.projects.map(project => (
                      <div key={project.id} className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300 flex flex-col md:flex-row overflow-hidden">
                        
                        <figure className="relative md:w-1/3 h-48 md:h-auto overflow-hidden">
                          <img 
                            src={project.imageUrl} 
                            alt={project.title} 
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute top-2 left-2">
                            <span className="badge badge-primary badge-sm font-semibold shadow-sm">{project.location}</span>
                          </div>
                        </figure>

                        <div className="card-body p-5 md:w-2/3">
                          <h3 className="card-title text-lg text-primary">{project.title}</h3>
                          <div className="flex flex-wrap gap-2 mb-2">
                            <span className="badge badge-outline badge-sm">{project.categoryLabel}</span>
                          </div>
                          <p className="text-base-content/80 text-sm line-clamp-2">
                            {project.description}
                          </p>

                          {(() => {
                            const total = calculateTotalCommitment(project.initialCost, project.runningCostsPerYear);
                            return (
                              <div className="mt-3 flex items-center justify-between">
                                <div>
                                  <span className="text-[10px] uppercase font-bold text-base-content/50 block">Commitment</span>
                                  <span className="text-lg font-bold text-base-content">€{total.toLocaleString()}</span>
                                </div>
                                <button 
                                  onClick={() => onFundProject(project)}
                                  className="btn btn-primary btn-sm rounded-full px-6"
                                >
                                  Fund this
                                </button>
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full bg-base-300 flex items-center justify-center">AI</div>
              </div>
              <div className="chat-header text-xs opacity-50 mb-1">HackXplore Matcher</div>
              <div className="chat-bubble chat-bubble-base-100 text-base-content shadow-sm p-4 flex items-center gap-2">
                <span className="loading loading-dots loading-md"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Fixed Input Area */}
        <div className="fixed bottom-0 left-0 right-0 bg-base-200/90 backdrop-blur-md border-t border-base-300 p-4">
          <div className="max-w-4xl mx-auto">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(currentInput); }}
              className="relative flex items-center shadow-lg rounded-full bg-base-100 border border-base-content/10 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all"
            >
              <input 
                type="text" 
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder="Ask about other projects, tweak your requirements..."
                className="input input-ghost w-full rounded-full pl-6 pr-20 h-14 text-base focus:outline-none focus:bg-transparent"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                disabled={!currentInput.trim() || isLoading}
                className="absolute right-2 btn btn-circle btn-primary btn-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
