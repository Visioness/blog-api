import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { profileApi } from '../../lib/api';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import FormError from '../../components/ui/FormError';
import { Crown, Calendar, Shield, ArrowUpCircle } from 'lucide-react';

const ProfileInfo = () => {
  const { profile, isOwnProfile, setProfile } = useOutletContext();
  const { user, login } = useAuth();
  const [upgrading, setUpgrading] = useState(false);
  const [error, setError] = useState('');

  const handleUpgradeRole = async () => {
    setUpgrading(true);
    setError('');

    try {
      const data = await profileApi.upgradeRole();
      setProfile((prev) => ({ ...prev, role: 'AUTHOR' }));
      login({ ...user, role: 'AUTHOR' });
    } catch (err) {
      setError(err.message);
    } finally {
      setUpgrading(false);
    }
  };

  return (
    <div className='grid gap-6 md:grid-cols-2'>
      {/* Account Info */}
      <Card>
        <Card.Header>
          <h2 className='text-lg font-semibold text-zinc-100'>Account Info</h2>
        </Card.Header>
        <Card.Body className='space-y-4'>
          <div className='flex items-center gap-3'>
            <div className='p-2 rounded-lg bg-zinc-800 text-zinc-400'>
              <Calendar size={18} />
            </div>
            <div>
              <p className='text-sm text-zinc-500'>Member since</p>
              <p className='text-zinc-200'>
                {new Date(profile.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <div className='p-2 rounded-lg bg-zinc-800 text-zinc-400'>
              <Shield size={18} />
            </div>
            <div>
              <p className='text-sm text-zinc-500'>Role</p>
              <p className='text-zinc-200 flex items-center gap-2'>
                {profile.role}
                {profile.role === 'AUTHOR' && (
                  <Crown size={14} className='text-amber-500' />
                )}
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Upgrade to Author (only for own profile and READER role) */}
      {isOwnProfile && profile.role === 'READER' && (
        <Card className='border-amber-500/20'>
          <Card.Body className='text-center py-8'>
            <div className='inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-500/10 text-amber-500 mb-4'>
              <Crown size={28} />
            </div>
            <h3 className='text-xl font-semibold text-zinc-100 mb-2'>
              Become an Author
            </h3>
            <p className='text-zinc-500 text-sm mb-6 max-w-sm mx-auto'>
              Upgrade your account to start writing and publishing your own
              posts.
            </p>

            <div className="mb-4 text-left">
              <FormError error={error} />
            </div>

            <Button onClick={handleUpgradeRole} loading={upgrading}>
              <ArrowUpCircle size={16} />
              Upgrade to Author
            </Button>
          </Card.Body>
        </Card>
      )}

      {/* Author badge */}
      {profile.role === 'AUTHOR' && (
        <Card className='border-emerald-600/20'>
          <Card.Body className='text-center py-8'>
            <div className='inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600/10 text-emerald-500 mb-4'>
              <Crown size={28} />
            </div>
            <h3 className='text-xl font-semibold text-zinc-100 mb-2'>
              Verified Author
            </h3>
            <p className='text-zinc-500 text-sm max-w-sm mx-auto'>
              {isOwnProfile
                ? 'You can write and publish posts.'
                : 'This user can write and publish posts.'}
            </p>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default ProfileInfo;
