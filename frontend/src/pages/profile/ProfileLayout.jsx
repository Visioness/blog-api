import { useState, useEffect } from 'react';
import { useParams, Outlet, NavLink } from 'react-router-dom';
import { profileApi } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { User, FileText, MessageCircle, Crown } from 'lucide-react';

const ProfileLayout = () => {
  const { username } = useParams();
  const { user: currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const isOwnProfile = currentUser?.username === username;

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const data = await profileApi.getByUsername(username);
        setProfile(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (loading) {
    return (
      <div className='flex justify-center py-20'>
        <LoadingSpinner size='lg' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='max-w-4xl mx-auto px-4 py-20 text-center'>
        <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 text-zinc-500 mb-4'>
          <User size={32} />
        </div>
        <h2 className='text-2xl font-bold text-zinc-100 mb-2'>
          User Not Found
        </h2>
        <p className='text-zinc-500'>{error}</p>
      </div>
    );
  }

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
      isActive
        ? 'bg-emerald-600/10 text-emerald-500 border border-emerald-600/20'
        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
    }`;

  return (
    <div className='h-full flex flex-col'>
      {/* Profile Header & Tabs - Fixed */}
      <div className='flex-none w-full bg-zinc-950/95 backdrop-blur-sm z-10 border-b border-zinc-800/50'>
        <div className='max-w-4xl mx-auto px-4 pt-8'>
          <div className='flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 p-6 bg-zinc-900 rounded-xl border border-zinc-800'>
            {/* Avatar */}
            <div className='w-24 h-24 rounded-full bg-linear-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white text-3xl font-bold'>
              {profile.username[0].toUpperCase()}
            </div>

            {/* Info */}
            <div className='flex-1 text-center sm:text-left'>
              <div className='flex flex-col sm:flex-row sm:items-center gap-2 mb-2'>
                <h1 className='text-2xl font-bold text-zinc-100'>
                  {profile.username}
                </h1>
                {profile.role === 'AUTHOR' && (
                  <span className='inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20'>
                    <Crown size={12} />
                    Author
                  </span>
                )}
              </div>
              <p className='text-zinc-500 text-sm'>
                Member since{' '}
                {new Date(profile.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className='flex flex-wrap gap-2 mb-4'>
            <NavLink to={`/profile/${username}`} end className={navLinkClass}>
              <User size={16} />
              Overview
            </NavLink>
            <NavLink to={`/profile/${username}/posts`} className={navLinkClass}>
              <FileText size={16} />
              Posts
            </NavLink>
            <NavLink
              to={`/profile/${username}/comments`}
              className={navLinkClass}>
              <MessageCircle size={16} />
              Comments
            </NavLink>
          </nav>
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className='flex-1 overflow-y-auto scrollbar-thin [scrollbar-gutter:stable]'>
        <div className='max-w-4xl mx-auto px-4 py-8'>
          <Outlet context={{ profile, isOwnProfile, setProfile }} />
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
