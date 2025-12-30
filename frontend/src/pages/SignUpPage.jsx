import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../lib/api';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { UserPlus } from 'lucide-react';

import FormError from '../components/ui/FormError';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      setError(
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      );
      return;
    }

    setLoading(true);
    try {
      const { username, email, password, confirmPassword } = formData;
      const data = await authApi.signUp({
        username,
        email,
        password,
        confirmPassword,
      });
      login(data.user);
      navigate('/');
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
                <UserPlus size={28} />
              </div>
            </div>
            <h1 className='text-2xl font-bold text-zinc-100'>Create Account</h1>
            <p className='text-zinc-400 mt-2'>Join DevBlog and start sharing</p>
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
                label='Email'
                name='email'
                type='email'
                placeholder='john@example.com'
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete='email'
              />

              <Input
                label='Password'
                name='password'
                type='password'
                placeholder='••••••••'
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete='new-password'
              />

              <Input
                label='Confirm Password'
                name='confirmPassword'
                type='password'
                placeholder='••••••••'
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                autoComplete='new-password'
              />

              <Button
                type='submit'
                loading={loading}
                className='w-full bg-emerald-600 hover:bg-emerald-500 text-white'>
                Create Account
              </Button>
            </form>
          </Card.Body>

          <Card.Footer className='justify-center'>
            <p>
              Already have an account?{' '}
              <Link
                to='/log-in'
                className='text-emerald-500 hover:text-emerald-400 font-medium'>
                Log in
              </Link>
            </p>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
