import { useState } from 'react';
import { mockBackend } from '../data/auth';

interface LoginFlowProps {
  onBack: () => void;
  onComplete: () => void;
}

export function LoginFlow({ onBack, onComplete }: LoginFlowProps) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMsg('');
    try {
      await mockBackend.login(name, password);
      onComplete();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to login');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-base-200/30">
      <div className="absolute top-8 left-8">
        <h1 className="text-2xl font-bold tracking-tighter text-primary">IMPACT.</h1>
      </div>
      <button onClick={onBack} className="absolute top-8 right-8 btn btn-ghost rounded-full px-6">
        Cancel
      </button>

      <div className="w-full max-w-md bg-base-100 rounded-3xl shadow-2xl overflow-hidden border border-base-300">
        
        {/* Header Section */}
        <div className="bg-primary p-8 text-primary-content text-center">
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="mt-2 opacity-80 text-sm">Log in to view your impact and manage your funded projects.</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleLogin} className="flex flex-col gap-5 animate-fade-in">
            
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Name or Email</span></label>
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
              disabled={isProcessing || !name || !password}
              className="btn btn-primary w-full rounded-full text-lg mt-4"
            >
              {isProcessing ? <span className="loading loading-spinner"></span> : 'Log In'}
            </button>
            
            {errorMsg && (
              <div className="text-error text-sm text-center mt-2 animate-fade-in">
                {errorMsg}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
