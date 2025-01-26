import React from 'react';
import MovieCard from './MovieCard';
import { Loader2 } from 'lucide-react';
import { useMovieStore } from '../store/movieStore';

const MovieGrid: React.FC = () => {
  const { movies, loading, error } = useMovieStore();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error loading movies: {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          posterPath={movie.poster_path}
          overview={movie.overview}
          rating={movie.vote_average}
        />
      ))}
    </div>
  );
};

export default MovieGrid;