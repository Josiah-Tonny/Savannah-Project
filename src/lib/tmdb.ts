import axios from 'axios';

const TMDB_API_KEY = 'fcd84d1';
const BASE_URL = 'https://api.themoviedb.org/3';

export const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

export const getPopularMovies = async (page = 1) => {
  const response = await tmdbApi.get('/movie/popular', {
    params: { page },
  });
  return response.data;
};

export const searchMovies = async (query: string, page = 1) => {
  const response = await tmdbApi.get('/search/movie', {
    params: { query, page },
  });
  return response.data;
};

export const getMovieDetails = async (movieId: string) => {
  const response = await tmdbApi.get(`/movie/${movieId}`);
  return response.data;
};

export const getMovieCredits = async (movieId: string) => {
  const response = await tmdbApi.get(`/movie/${movieId}/credits`);
  return response.data;
};
