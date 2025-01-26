import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Film, LogOut, TrendingUp, Clock, Play, Tv } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Navbar: React.FC = () => {
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <Film className="w-8 h-8 text-blue-500" />
              <span className="text-xl font-bold">MovieMate</span>
            </Link>
            
            {user && (
              <div className="hidden md:flex space-x-6">
                <Link
                  to="/movies"
                  className={`flex items-center space-x-1 hover:text-blue-500 ${
                    isActive('/movies') ? 'text-blue-500' : 'text-gray-300'
                  }`}
                >
                  <Play className="w-4 h-4" />
                  <span>Movies</span>
                </Link>
                <Link
                  to="/series"
                  className={`flex items-center space-x-1 hover:text-blue-500 ${
                    isActive('/series') ? 'text-blue-500' : 'text-gray-300'
                  }`}
                >
                  <Tv className="w-4 h-4" />
                  <span>Series</span>
                </Link>
                <Link
                  to="/most-watched"
                  className={`flex items-center space-x-1 hover:text-blue-500 ${
                    isActive('/most-watched') ? 'text-blue-500' : 'text-gray-300'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Most Watched</span>
                </Link>
                <Link
                  to="/latest"
                  className={`flex items-center space-x-1 hover:text-blue-500 ${
                    isActive('/latest') ? 'text-blue-500' : 'text-gray-300'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>Latest</span>
                </Link>
              </div>
            )}
          </div>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">{user.email}</span>
              <button
                onClick={handleSignOut}
                className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;