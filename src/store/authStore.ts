import { create } from 'zustand';
import { authService } from '../lib/mongodb';

interface UserType {
  _id: string;
  email: string;
  watchlist: number[];
  recommendations: number[];
}

interface AuthState {
  user: UserType | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  setUser: (user: UserType | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,
  signIn: async (email, password) => {
    try {
      set({ loading: true, error: null });
      // For now, simulate successful login
      const mockUser = {
        _id: '1',
        email,
        watchlist: [],
        recommendations: []
      };
      localStorage.setItem('user', JSON.stringify(mockUser));
      set({ user: mockUser, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  signUp: async (email, password) => {
    try {
      set({ loading: true, error: null });
      // For now, simulate successful registration
      const mockUser = {
        _id: '1',
        email,
        watchlist: [],
        recommendations: []
      };
      localStorage.setItem('user', JSON.stringify(mockUser));
      set({ user: mockUser, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  signOut: () => {
    localStorage.removeItem('user');
    set({ user: null });
  },
  setUser: (user) => set({ user, loading: false }),
}));