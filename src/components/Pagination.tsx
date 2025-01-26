import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMovieStore } from '../store/movieStore';

const Pagination: React.FC = () => {
  const { currentPage, totalPages, fetchMovies, searchQuery, searchForMovies } =
    useMovieStore();

  const handlePageChange = (page: number) => {
    if (searchQuery) {
      searchForMovies(searchQuery, page);
    } else {
      fetchMovies(page);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-4 mt-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg bg-gray-800 disabled:opacity-50"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg bg-gray-800 disabled:opacity-50"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;