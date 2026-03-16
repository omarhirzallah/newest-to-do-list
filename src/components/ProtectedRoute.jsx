import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-lol-dark">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-lol-cyan"></div>
      </div>
    );
  }

  return currentUser ? children : <Navigate to="/login" />;
};
