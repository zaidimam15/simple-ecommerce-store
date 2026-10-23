import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

import { authAPI } from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(
    () => localStorage.getItem('codealpha_token') || null
  );

  const [loading, setLoading] = useState(true);

  // Verify stored token on initial load
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('codealpha_token');

      if (storedToken) {
        try {
          const res = await authAPI.getMe();

          if (res.success && res.user) {
            setUser(res.user);
          } else {
            logout();
          }
        } catch (error) {
          console.warn('Session expired or invalid, logging out.');
          logout();
        }
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  // Login user
  const login = async (email, password) => {
    const data = await authAPI.login(email, password);

    if (data.success && data.token) {
      localStorage.setItem('codealpha_token', data.token);

      setToken(data.token);
      setUser(data.user);

      return data.user;
    }

    throw new Error(data.message || 'Login failed.');
  };

  // Register user
  const register = async (name, email, password) => {
    const data = await authAPI.register(name, email, password);

    if (data.success && data.token) {
      localStorage.setItem('codealpha_token', data.token);

      setToken(data.token);
      setUser(data.user);

      return data.user;
    }

    throw new Error(data.message || 'Registration failed.');
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('codealpha_token');

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};