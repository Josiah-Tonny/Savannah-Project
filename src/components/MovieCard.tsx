import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string;
  overview: string;
  rating: number;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  posterPath,
  overview,
  rating,
}) => {
  return (
    <Link
      to={`/movie/${id}`}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={title}
        className="w-full h-96 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold truncate">{title}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-gray-400 text-sm line-clamp-3">{overview}</p>
      </div>
    </Link>
  );
};

export default MovieCard;