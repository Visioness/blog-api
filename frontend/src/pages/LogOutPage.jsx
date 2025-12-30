import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../lib/api';
import Card from '../components/ui/Card';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { CheckCircle } from 'lucide-react';

const LogOutPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const performLogout = async () => {
      try {
        // Add a minimum delay to show the loading state
        await Promise.all([
          authApi.logOut(),
          new Promise((resolve) => setTimeout(resolve, 1000)),
        ]);
        setStatus('success');
      } catch (err) {
        // If logout fails (e.g. 401), we still want to clear local state
        // and show the success message to the user
        console.error('Logout error:', err);
        setStatus('success');
      } finally {
        logout();
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 1000);
      }
    };

    performLogout();
  }, [logout, navigate]);

  return (
    <div className='flex-1 flex items-center justify-center px-4 py-12'>
      <Card className='w-full max-w-sm text-center animate-fade-in'>
        <Card.Body className='py-8'>
          {status === 'loading' && (
            <>
              <LoadingSpinner size='lg' className='mb-4' />
              <h2 className='text-xl font-semibold text-zinc-100'>
                Logging out...
              </h2>
              <p className='text-zinc-500 mt-2'>Please wait</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-600/10 text-emerald-500 mb-4'>
                <CheckCircle size={32} />
              </div>
              <h2 className='text-xl font-semibold text-zinc-100'>
                Logged Out
              </h2>
              <p className='text-zinc-500 mt-2'>Redirecting to home...</p>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default LogOutPage;
