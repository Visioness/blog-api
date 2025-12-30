import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { commentsApi } from '../../lib/api';
import Button from '../ui/Button';
import TextArea from '../ui/TextArea';
import { Link } from 'react-router';
import { Heart, Edit2, Trash2, X, Check } from 'lucide-react';

const CommentCard = ({ comment, onUpdate, onDelete }) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isOwner = user?.id === comment.authorId;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleUpdate = async () => {
    if (!editContent.trim()) return;
    setLoading(true);
    setError('');

    try {
      const data = await commentsApi.update(comment.id, editContent);
      onUpdate?.(data.data);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this comment?'))
      return;
    setLoading(true);

    try {
      await commentsApi.delete(comment.id);
      onDelete?.(comment.id);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditContent(comment.content);
    setError('');
  };

  return (
    <div className='p-4 bg-zinc-900 rounded-lg border border-zinc-800'>
      {/* Header */}
      <div className='flex items-center justify-between mb-3'>
        <div className='flex items-center gap-2'>
          <div className='w-8 h-8 rounded-full bg-linear-to-br from-zinc-600 to-zinc-700 flex items-center justify-center text-zinc-300 text-sm font-medium'>
            {comment.author?.username?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <Link
              to={`/profile/${comment.author?.username}`}
              className='text-sm font-medium text-zinc-200 hover:text-emerald-400 transition-colors'>
              {comment.author?.username || 'Unknown'}
            </Link>
            <span className='text-xs text-zinc-500 ml-2'>
              {formatDate(comment.createdAt)}
            </span>
          </div>
        </div>

        {/* Actions for owner */}
        {isOwner && !isEditing && (
          <div className='flex items-center gap-1'>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setIsEditing(true)}
              className='p-1.5 text-zinc-500 hover:text-zinc-200'>
              <Edit2 size={14} />
            </Button>
            <Button
              variant='ghost'
              size='sm'
              onClick={handleDelete}
              loading={loading}
              className='p-1.5 text-zinc-500 hover:text-red-400'>
              <Trash2 size={14} />
            </Button>
          </div>
        )}
      </div>

      {/* Content */}
      {isEditing ? (
        <div className='space-y-3'>
          <TextArea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            rows={3}
            error={error}
          />
          <div className='flex items-center gap-2'>
            <Button
              size='sm'
              onClick={handleUpdate}
              loading={loading}
              disabled={!editContent.trim()}>
              <Check size={14} />
              Save
            </Button>
            <Button
              variant='ghost'
              size='sm'
              onClick={cancelEdit}
              disabled={loading}>
              <X size={14} />
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <p className='text-zinc-300 text-sm leading-relaxed'>
          {comment.content}
        </p>
      )}

      {/* Footer */}
      <div className='flex items-center gap-4 mt-3 pt-3 border-t border-zinc-800'>
        <div className='flex items-center gap-1 text-zinc-500 text-xs'>
          <Heart size={12} />
          <span>{comment.likes}</span>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
