import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';
import { useMovieStore } from '../store/movieStore';

vi.mock('../store/movieStore', () => ({
  useMovieStore: vi.fn(),
}));

describe('SearchBar', () => {
  const mockSearchForMovies = vi.fn();
  const mockFetchMovies = vi.fn();

  beforeEach(() => {
    vi.mocked(useMovieStore).mockReturnValue({
      searchForMovies: mockSearchForMovies,
      fetchMovies: mockFetchMovies,
    } as any);
  });

  it('calls searchForMovies when submitting with query', () => {
    render(<SearchBar />);
    
    const input = screen.getByPlaceholderText('Search for movies...');
    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.submit(input);

    expect(mockSearchForMovies).toHaveBeenCalledWith('test query');
  });

  it('calls fetchMovies when submitting with empty query', () => {
    render(<SearchBar />);
    
    const input = screen.getByPlaceholderText('Search for movies...');
    fireEvent.submit(input);

    expect(mockFetchMovies).toHaveBeenCalledWith(1);
  });
});