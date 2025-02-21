import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = useCallback((username, password) => {
    // Implement actual authentication logic
    console.log("Login attempt for:", username);
    // Example mock authentication
    if (username && password) {
      setIsAuthenticated(true);
      localStorage.setItem('token', 'mock-token');
      navigate('/');
      return true;
    }
    return false;
  }, [navigate]);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);

  const checkAuthStatus = useCallback(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    return !!token;
  }, []);

  return {
    isAuthenticated,
    login,
    logout,
    checkAuthStatus
  };
};
