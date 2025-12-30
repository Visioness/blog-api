import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Clock, Eye, EyeOff } from 'lucide-react';
import Card from '../ui/Card';

const PostCard = ({ post, showStatus = false }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Card hover className='h-full flex flex-col group relative'>
      <Link
        to={`/posts/${post.id}`}
        className='absolute inset-0 z-0'
        aria-label={`Read ${post.title}`}
      />

      <div className='flex flex-col h-full pointer-events-none'>
        <Card.Body className='flex-1 relative z-10'>
          {/* Status badge for authors */}
          {showStatus && (
            <div className='mb-3'>
              {post.status === 'PUBLISHED' ? (
                <span className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'>
                  <Eye size={12} />
                  Published
                </span>
              ) : (
                <span className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-400 border border-zinc-700'>
                  <EyeOff size={12} />
                  Hidden
                </span>
              )}
            </div>
          )}

          {/* Title */}
          <h3 className='text-xl font-bold text-zinc-100 mb-3 group-hover:text-emerald-400 transition-colors line-clamp-2'>
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className='text-zinc-400 text-sm leading-relaxed line-clamp-3'>
            {post.content}
          </p>
        </Card.Body>

        <Card.Footer className='relative z-10'>
          {/* Author */}
          {post.author && (
            <div className='flex items-center gap-2 w-full pointer-events-auto'>
              <div className='w-6 h-6 rounded-full bg-linear-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center text-emerald-500 text-xs font-bold border border-emerald-500/20'>
                {post.author.username[0].toUpperCase()}
              </div>
              <Link
                to={`/profile/${post.author.username}`}
                className='text-xs font-medium text-zinc-400 hover:text-emerald-400 transition-colors relative z-20'>
                {post.author.username}
              </Link>
            </div>
          )}

          <div className='flex items-center justify-between w-full'>
            {/* Date */}
            <div className='flex items-center gap-2'>
              <Clock size={14} className='text-zinc-500' />
              <span className='text-xs font-medium'>
                {formatDate(post.createdAt)}
              </span>
            </div>

            {/* Stats */}
            <div className='flex items-center gap-4 text-zinc-500'>
              <div className='flex items-center gap-1.5'>
                <Heart size={14} />
                <span className='text-xs font-medium'>{post.likes}</span>
              </div>
              {post.comments && (
                <div className='flex items-center gap-1.5'>
                  <MessageCircle size={14} />
                  <span className='text-xs font-medium'>
                    {post.comments.length}
                  </span>
                </div>
              )}
            </div>
          </div>
        </Card.Footer>
      </div>
    </Card>
  );
};

export default PostCard;
