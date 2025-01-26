import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from './store/authStore';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Auth from './pages/Auth';
import ProtectedRoute from './components/ProtectedRoute';
import MovieList from './pages/MovieList';
import MostWatched from './pages/MostWatched';
import Latest from './pages/Latest';

const queryClient = new QueryClient();

function App() {
  const { setUser } = useAuthStore();

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-900 text-white">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/movie/:id"
                element={
                  <ProtectedRoute>
                    <MovieDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/movies"
                element={
                  <ProtectedRoute>
                    <MovieList type="movie" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/series"
                element={
                  <ProtectedRoute>
                    <MovieList type="tv" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/most-watched"
                element={
                  <ProtectedRoute>
                    <MostWatched />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/latest"
                element={
                  <ProtectedRoute>
                    <Latest />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;