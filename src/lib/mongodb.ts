import axios from 'axios';

const API_BASE_URL = 'https://api.example.com'; // This should be your actual backend API URL

// Auth Service
export const authService = {
  async login(email: string, password: string) {
    try {
      const response = await axios.post('/auth/login', {
        email,
        password
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  async register(email: string, password: string) {
    try {
      const response = await axios.post('/auth/register', {
        email,
        password
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  async getUserData(userId: string) {
    try {
      const response = await axios.get(`/users/${userId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user data');
    }
  }
};