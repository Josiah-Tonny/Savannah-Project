import React, { useEffect } from 'react';
import { useMovieStore } from '../store/movieStore';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { Loader2 } from 'lucide-react';

interface MovieListProps {
  type: 'movie' | 'tv';
}

const MovieList: React.FC<MovieListProps> = ({ type }) => {
  const { movies, loading, fetchMovies } = useMovieStore();

  useEffect(() => {
    fetchMovies(1);
  }, [fetchMovies]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const filteredMovies = type === 'movie' 
    ? movies.filter(m => !m.name)
    : movies.filter(m => m.name);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {type === 'movie' ? 'Movies' : 'TV Series'}
      </h1>
      <SearchBar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title || movie.name}
            posterPath={movie.poster_path}
            overview={movie.overview}
            rating={movie.vote_average}
          />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default MovieList;