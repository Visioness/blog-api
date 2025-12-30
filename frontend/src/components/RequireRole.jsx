import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './ui/LoadingSpinner';

const RequireRole = ({ children, allowedRoles }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className='flex-1 flex items-center justify-center'>
        <LoadingSpinner size='lg' />
      </div>
    );
  }

  if (!user) {
    return <Navigate to='/log-in' state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to home or some "unauthorized" page if role doesn't match
    return <Navigate to='/' replace />;
  }

  return children;
};

export default RequireRole;
