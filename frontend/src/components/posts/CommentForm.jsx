import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { commentsApi } from '../../lib/api';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import TextArea from '../ui/TextArea';
import FormError from '../ui/FormError';
import { Send } from 'lucide-react';

const CommentForm = ({ postId, onCommentAdded }) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    setError('');

    try {
      const data = await commentsApi.create(postId, content);
      onCommentAdded?.(data.data);
      setContent('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className='p-4 bg-zinc-900 rounded-lg border border-zinc-800 text-center'>
        <p className='text-zinc-500 text-sm'>
          <Link
            to='/log-in'
            className='text-emerald-500 hover:text-emerald-400 font-medium'>
            Log in
          </Link>{' '}
          to leave a comment
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-3'>
      <FormError error={error} />
      <div className='flex items-start gap-3'>
        <div className='w-8 h-8 rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white text-sm font-bold flex-shrink-0'>
          {user.username[0].toUpperCase()}
        </div>
        <div className='flex-1'>
          <TextArea
            placeholder='Write a comment...'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            error={error}
          />
        </div>
      </div>
      <div className='flex justify-end'>
        <Button
          type='submit'
          size='sm'
          loading={loading}
          disabled={!content.trim()}>
          <Send size={14} />
          Post Comment
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
