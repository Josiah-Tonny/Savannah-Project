import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

describe('MovieCard', () => {
  const mockProps = {
    id: 1,
    title: 'Test Movie',
    posterPath: '/test-poster.jpg',
    overview: 'Test overview',
    rating: 8.5,
  };

  it('renders movie information correctly', () => {
    render(
      <BrowserRouter>
        <MovieCard {...mockProps} />
      </BrowserRouter>
    );

    expect(screen.getByText('Test Movie')).toBeDefined();
    expect(screen.getByText('Test overview')).toBeDefined();
    expect(screen.getByText('8.5')).toBeDefined();
    expect(screen.getByAltText('Test Movie')).toBeDefined();
  });
});