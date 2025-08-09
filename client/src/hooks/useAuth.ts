import { useState, useEffect } from 'react';
import { User } from '@shared/schema';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    isAdmin: false,
  });

  useEffect(() => {
    // Check if user is logged in from localStorage
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('auth_user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setAuthState({
            user,
            isLoading: false,
            isAuthenticated: true,
            isAdmin: user.role === 'admin',
          });
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const { user } = await response.json();
      
      // Store user in localStorage
      localStorage.setItem('auth_user', JSON.stringify(user));
      
      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
        isAdmin: user.role === 'admin',
      });

      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (username: string, email: string, password: string): Promise<User> => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      const { user } = await response.json();
      
      // Store user in localStorage
      localStorage.setItem('auth_user', JSON.stringify(user));
      
      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
        isAdmin: user.role === 'admin',
      });

      return user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear localStorage and update state
      localStorage.removeItem('auth_user');
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        isAdmin: false,
      });
    }
  };

  const updateProfile = async (updates: Partial<User>): Promise<User> => {
    if (!authState.user) {
      throw new Error('No authenticated user');
    }

    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const { user } = await response.json();
      
      // Update localStorage
      localStorage.setItem('auth_user', JSON.stringify(user));
      
      setAuthState(prev => ({
        ...prev,
        user,
      }));

      return user;
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  return {
    user: authState.user,
    isLoading: authState.isLoading,
    isAuthenticated: authState.isAuthenticated,
    isAdmin: authState.isAdmin,
    login,
    register,
    logout,
    updateProfile,
  };
}
