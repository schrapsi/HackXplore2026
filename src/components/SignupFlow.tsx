import { useState } from 'react';
import type { Project } from '../types';
import { mockBackend } from '../data/auth';

interface SignupFlowProps {
  project: Project;
  budgetTier: string;
  onBack: () => void;
  onComplete: () => void;
}

export function SignupFlow({ project, budgetTier, onBack, onComplete }: SignupFlowProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      await mockBackend.createAccount(name, email);
      setStep('payment');
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCommitFunds = async () => {
    setIsProcessing(true);
    try {
      await mockBackend.commitToProject(project.id, budgetTier);
      setStep('success');
      setTimeout(() => {
        onComplete();
      }, 2000);
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-base-200/30">
      <div className="absolute top-8 left-8">
        <h1 className="text-2xl font-bold tracking-tighter text-primary">IMPACT</h1>
      </div>
      <button onClick={onBack} className="absolute top-8 right-8 btn btn-ghost rounded-full px-6">
        Cancel
      </button>

      <div className="w-full max-w-md bg-base-100 rounded-3xl shadow-2xl overflow-hidden border border-base-300">
        
        {/* Header Section */}
        <div className="bg-primary p-8 text-primary-content text-center">
          <span className="text-sm uppercase tracking-widest opacity-80 font-semibold mb-2 block">You selected</span>
          <h2 className="text-2xl font-bold">{project.title}</h2>
          <div className="mt-4 inline-block bg-primary-content/10 px-4 py-1 rounded-full border border-primary-content/20">
            Commitment: <span className="font-bold text-accent">{budgetTier.replace('-', ' - ')}</span>
          </div>
        </div>

        <div className="p-8">
          {step === 'details' && (
            <form onSubmit={handleCreateAccount} className="flex flex-col gap-5 animate-fade-in">
              <h3 className="text-xl font-bold text-base-content text-center mb-2">Create your Account</h3>
              
              <div className="form-control">
                <label className="label"><span className="label-text font-medium">Full Name</span></label>
                <input 
                  type="text" 
                  required
                  placeholder="John Doe" 
                  className="input input-bordered focus:border-primary focus:ring-1 focus:ring-primary w-full bg-base-100" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-medium">Email Address</span></label>
                <input 
                  type="email" 
                  required
                  placeholder="john@example.com" 
                  className="input input-bordered focus:border-primary focus:ring-1 focus:ring-primary w-full bg-base-100" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-medium">Password</span></label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••" 
                  className="input input-bordered focus:border-primary focus:ring-1 focus:ring-primary w-full bg-base-100" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>

              <button 
                type="submit" 
                disabled={isProcessing || !name || !email || !password}
                className="btn btn-primary w-full rounded-full text-lg mt-4"
              >
                {isProcessing ? <span className="loading loading-spinner"></span> : 'Continue to Payment'}
              </button>
            </form>
          )}

          {step === 'payment' && (
            <div className="flex flex-col items-center py-6 text-center animate-fade-in">
              <div className="w-16 h-16 bg-success/20 text-success rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-xl font-bold text-base-content mb-2">Account Created</h3>
              <p className="text-base-content/70 mb-8">You are about to transfer the funds to officially kickstart the project.</p>
              
              <button 
                onClick={handleCommitFunds}
                disabled={isProcessing}
                className="btn btn-primary w-full rounded-full text-lg shadow-xl"
              >
                {isProcessing ? (
                  <>
                    <span className="loading loading-spinner"></span> Processing Bank Transfer...
                  </>
                ) : (
                  'Authorize Transfer'
                )}
              </button>
            </div>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center py-8 text-center animate-fade-in">
              <span className="text-6xl mb-4">🎉</span>
              <h3 className="text-2xl font-bold text-base-content mb-2">Thank you, {name}!</h3>
              <p className="text-base-content/70">Your funds have been committed. Redirecting to your dashboard...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
