import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PublicRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
}

export default PublicRoute;
