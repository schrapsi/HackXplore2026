import type { User } from '../types';

// Mocked in-memory database
let currentUser: User | null = null;

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockBackend = {
  // Simulate creating a new account
  async createAccount(name: string, email: string): Promise<User> {
    await delay(800); // simulate network
    currentUser = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120`,
      fundedProjects: []
    };
    return currentUser;
  },

  // Simulate a payment/commitment flow
  async commitToProject(projectId: string, amount: string): Promise<User> {
    await delay(1200); // simulate payment processing
    if (!currentUser) throw new Error("Kein Benutzer angemeldet");
    
    currentUser.fundedProjects.push({
      projectId,
      amountCommitted: amount,
      date: new Date().toISOString()
    });
    
    return { ...currentUser };
  },

  // Get current session
  async getCurrentUser(): Promise<User | null> {
    await delay(300);
    return currentUser ? { ...currentUser } : null;
  },
  
  // Logout
  async logout(): Promise<void> {
    await delay(300);
    currentUser = null;
  }
};
