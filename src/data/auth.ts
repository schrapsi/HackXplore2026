import type { User } from '../types';

// Mocked database - this will be wiped if the page is refreshed!
let usersDb: User[] = [];
let currentUser: User | null = null;

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockBackend = {
  // Simulate creating a new account
  async createAccount(name: string, email: string, hubBrandName: string): Promise<User> {
    await delay(800); // simulate network
    
    // Check if user already exists
    if (usersDb.find(u => u.email === email || u.name === name)) {
      throw new Error("User with this name or email already exists");
    }

    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      hubBrandName,
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
  },

  // Get Top Impacters (Mock Leaderboard)
  async getTopImpacters() {
    await delay(400);
    // Hardcoded mock users for the leaderboard
    const mockLeaderboard: Array<{ rank: number; name: string; brand: string; committed: number; isCurrentUser?: boolean }> = [
      { rank: 1, name: "Elena R.", brand: "Elena's Ocean Rescue", committed: 450000 },
      { rank: 2, name: "Marcus T.", brand: "The Green Horizon", committed: 380000 },
      { rank: 3, name: "Sarah J.", brand: "Sarah Cares", committed: 310000 },
      { rank: 4, name: "David K.", brand: "Future Builders", committed: 275000 },
      { rank: 5, name: "Nina W.", brand: "Safe Havens", committed: 220000 },
      { rank: 6, name: "Tom H.", brand: "Tech for Good", committed: 190000 },
      { rank: 7, name: "Lisa M.", brand: "Mental Health First", committed: 150000 },
      { rank: 8, name: "James B.", brand: "James Impact", committed: 110000 },
      { rank: 9, name: "Emma S.", brand: "Emma's Education Fund", committed: 95000 },
      { rank: 10, name: "Felix R.", brand: "Clean Rivers Initiative", committed: 80000 }
    ];

    // Calculate actual user commitment and inject if high enough
    let userTotal = 0;
    if (currentUser) {
      userTotal = currentUser.fundedProjects.reduce((sum, p) => {
        // amountCommitted is a string of the total number (e.g. "1250000")
        const val = parseInt(p.amountCommitted, 10);
        return sum + (isNaN(val) ? 0 : val);
      }, 0);
      
      if (userTotal > 0) {
        mockLeaderboard.push({
          rank: 0, 
          name: currentUser.name, 
          brand: currentUser.hubBrandName || `${currentUser.name}'s Hub`, 
          committed: userTotal,
          isCurrentUser: true
        });
      }
    }

    // Sort descending by commitment
    mockLeaderboard.sort((a, b) => b.committed - a.committed);
    
    // Re-assign ranks
    return mockLeaderboard.map((item, index) => ({
      ...item,
      rank: index + 1
    })).slice(0, 10); // Keep top 10
  }
};
