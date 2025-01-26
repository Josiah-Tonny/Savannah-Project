import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useMovieStore } from '../store/movieStore';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const { searchForMovies, fetchMovies } = useMovieStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      searchForMovies(query);
    } else {
      fetchMovies(1);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className="w-full px-4 py-2 pl-10 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
      </div>
    </form>
  );
};

export default SearchBar;