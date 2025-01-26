import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { useMovieStore } from '../store/movieStore';
import { ChevronRight, Loader2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

interface MovieSectionProps {
  title: string;
  movies: any[];
  viewAllLink: string;
}

const MovieSection: React.FC<MovieSectionProps> = ({ title, movies, viewAllLink }) => (
  <div className="mb-8">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <Link to={viewAllLink} className="flex items-center text-blue-500 hover:text-blue-400">
        View All <ChevronRight className="w-4 h-4 ml-1" />
      </Link>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {movies.slice(0, 5).map((movie) => (
        <Link to={`/movie/${movie.id}`} key={movie.id} className="group">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title || movie.name}
              className="w-full h-[300px] object-cover transform group-hover:scale-105 transition-transform duration-200"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-4">
              <h3 className="text-white font-semibold truncate">{movie.title || movie.name}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

const Home: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { movies, fetchMovies, loading } = useMovieStore();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchMovies(1);
  }, [user, navigate, fetchMovies]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  // Filter movies by type (you would typically get this from the API)
  const moviesList = movies.filter(m => !m.name); // Movies don't have 'name' property
  const seriesList = movies.filter(m => m.name); // Series have 'name' property
  const animeList = movies.slice(0, 5); // Placeholder for anime
  const animationList = movies.filter(m => m.genre_ids?.includes(16) || false); // Animation genre_id is 16

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar />
      <MovieSection title="Movies" movies={moviesList} viewAllLink="/movies" />
      <MovieSection title="Series" movies={seriesList} viewAllLink="/series" />
      <MovieSection title="Anime" movies={animeList} viewAllLink="/anime" />
      <MovieSection title="Animation" movies={animationList} viewAllLink="/animation" />
    </div>
  );
};

export default Home;