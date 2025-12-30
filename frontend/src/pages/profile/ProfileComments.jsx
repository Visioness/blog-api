import { useState, useEffect } from 'react';
import { useParams, useOutletContext, Link } from 'react-router-dom';
import { profileApi } from '../../lib/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { MessageCircle, Clock, ArrowUpRight } from 'lucide-react';

const ProfileComments = () => {
  const { username } = useParams();
  const { isOwnProfile } = useOutletContext();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const data = await profileApi.getComments(username);
        setComments(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [username]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

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

  if (comments.length === 0) {
    return (
      <div className='text-center py-12'>
        <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 text-zinc-500 mb-4'>
          <MessageCircle size={32} />
        </div>
        <h3 className='text-lg font-medium text-zinc-300 mb-2'>
          No comments yet
        </h3>
        <p className='text-zinc-500'>
          {isOwnProfile
            ? "You haven't made any comments yet."
            : "This user hasn't made any comments yet."}
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className='text-sm text-zinc-500 mb-6'>
        {comments.length} comment{comments.length !== 1 ? 's' : ''}
      </p>
      <div className='space-y-4'>
        {comments.map((comment) => (
          <div
            key={comment.id}
            className='p-4 bg-zinc-900 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors'>
            {/* Comment content */}
            <p className='text-zinc-300 text-sm leading-relaxed mb-3 line-clamp-3'>
              {comment.content}
            </p>

            {/* Footer */}
            <div className='flex items-center justify-between text-xs text-zinc-500'>
              <div className='flex items-center gap-1.5'>
                <Clock size={12} />
                {formatDate(comment.createdAt)}
              </div>
              <Link
                to={`/posts/${comment.postId}`}
                className='flex items-center gap-1 text-emerald-500 hover:text-emerald-400 transition-colors'>
                View post
                <ArrowUpRight size={12} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileComments;
