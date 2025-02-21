import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationService from '../services/AuthenticationService';
import { useNotification } from './useNotification';

export const useAuthentication = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const user = await AuthenticationService.login(credentials);
      showNotification('Login realizado com sucesso!', 'success');
      navigate('/');
      return user;
    } catch (error) {
      showNotification(error.message, 'error');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      const response = await AuthenticationService.register(userData);
      showNotification('Registro realizado com sucesso!', 'success');
      navigate('/login');
      return response;
    } catch (error) {
      showNotification(error.message, 'error');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AuthenticationService.logout();
      showNotification('Logout realizado com sucesso!', 'success');
      navigate('/login');
    } catch (error) {
      showNotification(error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    setIsLoading(true);
    try {
      const response = await AuthenticationService.forgotPassword(email);
      showNotification('Instruções de recuperação enviadas para seu e-mail', 'success');
      return response;
    } catch (error) {
      showNotification(error.message, 'error');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (resetData) => {
    setIsLoading(true);
    try {
      const response = await AuthenticationService.resetPassword(resetData);
      showNotification('Senha redefinida com sucesso!', 'success');
      navigate('/login');
      return response;
    } catch (error) {
      showNotification(error.message, 'error');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const activateAccount = async (activationData) => {
    setIsLoading(true);
    try {
      const response = await AuthenticationService.activateAccount(activationData);
      showNotification('Conta ativada com sucesso!', 'success');
      navigate('/login');
      return response;
    } catch (error) {
      showNotification(error.message, 'error');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    logout,
    register,
    forgotPassword,
    resetPassword,
    activateAccount,
    isLoading
  };
};
