import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../lib/api';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { LogIn } from 'lucide-react';

import FormError from '../components/ui/FormError';

const LogInPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await authApi.logIn(formData);
      login(data.user);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-full overflow-y-auto scrollbar-thin'>
      <div className='flex items-center justify-center min-h-full px-4 py-8'>
        <Card className='w-full max-w-md'>
          <Card.Header className='text-center'>
            <div className='flex justify-center mb-4'>
              <div className='p-3 bg-emerald-500/10 rounded-full text-emerald-500'>
                <LogIn size={28} />
              </div>
            </div>
            <h1 className='text-2xl font-bold text-zinc-100'>Welcome Back</h1>
            <p className='text-zinc-400 mt-2'>Log in to your account</p>
          </Card.Header>

          <Card.Body>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <FormError error={error} />

              <Input
                label='Username'
                name='username'
                placeholder='johndoe'
                value={formData.username}
                onChange={handleChange}
                required
                autoComplete='username'
              />

              <Input
                label='Password'
                name='password'
                type='password'
                placeholder='••••••••'
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete='current-password'
              />

              <Button
                type='submit'
                loading={loading}
                className='w-full bg-emerald-600 hover:bg-emerald-500 text-white'>
                Log In
              </Button>
            </form>
          </Card.Body>

          <Card.Footer className='justify-center'>
            <p>
              Don't have an account?{' '}
              <Link
                to='/sign-up'
                className='text-emerald-500 hover:text-emerald-400 font-medium'>
                Sign up
              </Link>
            </p>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
};

export default LogInPage;
