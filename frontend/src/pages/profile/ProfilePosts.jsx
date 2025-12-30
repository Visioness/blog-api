import { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { profileApi } from '../../lib/api';
import PostCard from '../../components/posts/PostCard';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { FileText } from 'lucide-react';

const ProfilePosts = () => {
  const { username } = useParams();
  const { isOwnProfile } = useOutletContext();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const data = await profileApi.getPosts(username);
        setPosts(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [username]);

  if (loading) {
    return (
      <div className='flex justify-center py-12'>
        <LoadingSpinner size='lg' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center py-12'>
        <p className='text-red-400'>{error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className='text-center py-12'>
        <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 text-zinc-500 mb-4'>
          <FileText size={32} />
        </div>
        <h3 className='text-lg font-medium text-zinc-300 mb-2'>No posts yet</h3>
        <p className='text-zinc-500'>
          {isOwnProfile
            ? "You haven't written any posts yet."
            : "This user hasn't written any posts yet."}
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className='text-sm text-zinc-500 mb-6'>
        {posts.length} post{posts.length !== 1 ? 's' : ''}
      </p>
      <div className='grid md:grid-cols-2 gap-6'>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} showStatus={isOwnProfile} />
        ))}
      </div>
    </div>
  );
};

export default ProfilePosts;
