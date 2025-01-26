import { create } from 'zustand';
import { getPopularMovies, searchMovies } from '../lib/tmdb';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

interface MovieState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  fetchMovies: (page?: number) => Promise<void>;
  searchForMovies: (query: string, page?: number) => Promise<void>;
}

export const useMovieStore = create<MovieState>((set) => ({
  movies: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  searchQuery: '',
  fetchMovies: async (page = 1) => {
    try {
      set({ loading: true, error: null });
      const data = await getPopularMovies(page);
      set({
        movies: data.results,
        currentPage: data.page,
        totalPages: data.total_pages,
        loading: false,
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  searchForMovies: async (query: string, page = 1) => {
    try {
      set({ loading: true, error: null, searchQuery: query });
      const data = await searchMovies(query, page);
      set({
        movies: data.results,
        currentPage: data.page,
        totalPages: data.total_pages,
        loading: false,
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));