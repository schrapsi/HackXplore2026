import type { User } from '../types';

// Mocked database - this will be wiped if the page is refreshed!
let usersDb: User[] = [];
let currentUser: User | null = null;

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockBackend = {
  // Simulate creating a new account
  async createAccount(name: string, email: string): Promise<User> {
    await delay(800); // simulate network
    
    // Check if user already exists
    if (usersDb.find(u => u.email === email || u.name === name)) {
      throw new Error("User with this name or email already exists");
    }

    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120`,
      fundedProjects: []
    };
    
    usersDb.push(newUser);
    currentUser = newUser;
    return currentUser;
  },

  // Simulate login
  async login(nameOrEmail: string, _password?: string): Promise<User> {
    await delay(800);
    
    const user = usersDb.find(u => u.name === nameOrEmail || u.email === nameOrEmail);
    if (!user) {
      throw new Error("User does not exist. Please check your credentials or create an account.");
    }
    
    currentUser = user;
    return currentUser;
  },

  // Simulate a payment/commitment flow
  async commitToProject(projectId: string, amount: string): Promise<User> {
    await delay(1200); // simulate payment processing
    if (!currentUser) throw new Error("No user logged in");
    
    currentUser.fundedProjects.push({
      projectId,
      amountCommitted: amount,
      date: new Date().toISOString()
    });
    
    // Update the user in the database as well
    const index = usersDb.findIndex(u => u.id === currentUser?.id);
    if (index !== -1) {
      usersDb[index] = currentUser;
    }
    
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
