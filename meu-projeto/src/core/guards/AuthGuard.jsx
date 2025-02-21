import { Navigate, Outlet } from 'react-router-dom';
import AuthenticationService from '../../services/AuthenticationService';
import { ROUTES } from '../constants/routes';

// Guarda de rota para usuários autenticados
export const AuthGuard = () => {
  const isAuthenticated = AuthenticationService.isAuthenticated();

  return isAuthenticated 
    ? <Outlet /> 
    : <Navigate to={ROUTES.LOGIN} replace />;
};

// Guarda de rota para usuários não autenticados
export const GuestGuard = () => {
  const isAuthenticated = AuthenticationService.isAuthenticated();

  return !isAuthenticated 
    ? <Outlet /> 
    : <Navigate to={ROUTES.HOME} replace />;
};
