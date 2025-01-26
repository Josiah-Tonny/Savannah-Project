import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Loader2, Star, Clock, Calendar } from 'lucide-react';
import { getMovieDetails, getMovieCredits } from '../lib/tmdb';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: movie, isLoading: isLoadingMovie } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieDetails(id!),
  });

  const { data: credits, isLoading: isLoadingCredits } = useQuery({
    queryKey: ['credits', id],
    queryFn: () => getMovieCredits(id!),
  });

  if (isLoadingMovie || isLoadingCredits) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-lg"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 mr-1" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-1" />
              <span>{movie.runtime} min</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-1" />
              <span>{new Date(movie.release_date).getFullYear()}</span>
            </div>
          </div>
          <p className="text-gray-300 mb-6">{movie.overview}</p>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Cast</h2>
            <div className="flex flex-wrap gap-4">
              {credits?.cast.slice(0, 5).map((actor) => (
                <div key={actor.id} className="text-center">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                    className="w-24 h-24 rounded-full object-cover mb-2"
                  />
                  <p className="text-sm font-medium">{actor.name}</p>
                  <p className="text-sm text-gray-400">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;