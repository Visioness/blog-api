import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { postsApi } from '../../lib/api';
import CommentCard from '../../components/posts/CommentCard';
import CommentForm from '../../components/posts/CommentForm';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import {
  Heart,
  MessageCircle,
  Clock,
  ArrowLeft,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
} from 'lucide-react';

const PostDetailPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [liking, setLiking] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [togglingStatus, setTogglingStatus] = useState(false);

  const isAuthor = user?.id === post?.authorId;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await postsApi.getById(postId);
        setPost(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleLike = async () => {
    if (!user) {
      navigate('/log-in');
      return;
    }

    setLiking(true);
    try {
      const data = await postsApi.like(postId);
      setPost((prev) => ({ ...prev, likes: data.data.likes }));
    } catch (err) {
      console.error(err.message);
    } finally {
      setLiking(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    setDeleting(true);
    try {
      await postsApi.delete(postId);
      navigate('/posts', { replace: true });
    } catch (err) {
      setError(err.message);
      setDeleting(false);
    }
  };

  const handleToggleStatus = async () => {
    const newStatus = post.status === 'PUBLISHED' ? 'HIDDEN' : 'PUBLISHED';
    setTogglingStatus(true);

    try {
      const data = await postsApi.changeStatus(postId, newStatus);
      setPost((prev) => ({ ...prev, status: data.data.status }));
    } catch (err) {
      console.error(err.message);
    } finally {
      setTogglingStatus(false);
    }
  };

  const handleCommentAdded = (newComment) => {
    setPost((prev) => ({
      ...prev,
      comments: [newComment, ...prev.comments],
    }));
  };

  const handleCommentUpdated = (updatedComment) => {
    setPost((prev) => ({
      ...prev,
      comments: prev.comments.map((c) =>
        c.id === updatedComment.id ? updatedComment : c
      ),
    }));
  };

  const handleCommentDeleted = (commentId) => {
    setPost((prev) => ({
      ...prev,
      comments: prev.comments.filter((c) => c.id !== commentId),
    }));
  };

  if (loading) {
    return (
      <div className='flex justify-center py-20'>
        <LoadingSpinner size='lg' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='max-w-3xl mx-auto px-4 py-20 text-center'>
        <h2 className='text-2xl font-bold text-zinc-100 mb-4'>
          Post Not Found
        </h2>
        <p className='text-zinc-500 mb-6'>{error}</p>
        <Link to='/posts'>
          <Button variant='secondary'>
            <ArrowLeft size={16} />
            Back to Posts
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='h-full overflow-y-auto scrollbar-thin'>
      <article className='max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8'>
        {/* Back button */}
        <Link
          to='/posts'
          className='inline-flex items-center gap-2 text-zinc-400 hover:text-emerald-500 mb-8 transition-colors group'>
          <ArrowLeft
            size={18}
            className='group-hover:-translate-x-1 transition-transform'
          />
          Back to Posts
        </Link>

        {/* Post Header */}
        <header className='mb-10'>
          {/* Status badge for author */}
          {isAuthor && (
            <div className='mb-4'>
              {post.status === 'PUBLISHED' ? (
                <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'>
                  <Eye size={14} />
                  Published
                </span>
              ) : (
                <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-400 border border-zinc-700'>
                  <EyeOff size={14} />
                  Hidden
                </span>
              )}
            </div>
          )}

          <h1 className='text-4xl sm:text-5xl font-extrabold text-zinc-100 mb-6 leading-tight'>
            {post.title}
          </h1>

          {/* Meta info */}
          <div className='flex flex-wrap items-center gap-6 text-zinc-400 text-sm mb-8 pb-8 border-b border-zinc-800'>
            {post.author && (
              <div className='flex items-center gap-2'>
                <div className='w-6 h-6 rounded-full bg-linear-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center text-emerald-500 text-xs font-bold border border-emerald-500/20'>
                  {post.author.username[0].toUpperCase()}
                </div>
                <Link
                  to={`/profile/${post.author.username}`}
                  className='font-medium text-zinc-300 hover:text-emerald-400 transition-colors'>
                  {post.author.username}
                </Link>
              </div>
            )}
            <div className='flex items-center gap-2'>
              <Clock size={16} className='text-zinc-500' />
              {formatDate(post.createdAt)}
            </div>
            <div className='flex items-center gap-2'>
              <Heart size={16} className='text-zinc-500' />
              {post.likes} likes
            </div>
            <div className='flex items-center gap-2'>
              <MessageCircle size={16} className='text-zinc-500' />
              {post.comments?.length || 0} comments
            </div>
          </div>

          {/* Author actions */}
          {isAuthor && (
            <div className='flex flex-wrap items-center gap-3 mb-8 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50'>
              <span className='text-xs font-medium text-zinc-500 uppercase tracking-wider mr-2'>
                Author Actions:
              </span>
              <Link to={`/posts/${postId}/edit`}>
                <Button size='sm' variant='secondary'>
                  <Edit2 size={14} />
                  Edit
                </Button>
              </Link>
              <Button
                size='sm'
                variant='secondary'
                onClick={handleToggleStatus}
                loading={togglingStatus}>
                {post.status === 'PUBLISHED' ? (
                  <>
                    <EyeOff size={14} />
                    Hide
                  </>
                ) : (
                  <>
                    <Eye size={14} />
                    Publish
                  </>
                )}
              </Button>
              <Button
                size='sm'
                className='bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 border-transparent'
                onClick={handleDelete}
                loading={deleting}>
                <Trash2 size={14} />
                Delete
              </Button>
            </div>
          )}
        </header>

        {/* Post Content */}
        <div className='prose prose-invert prose-lg max-w-none mb-12 text-zinc-300 leading-relaxed whitespace-pre-wrap'>
          {post.content}
        </div>

        {/* Like button */}
        <div className='flex justify-center mb-16 pb-16 border-b border-zinc-800'>
          <Button
            onClick={handleLike}
            loading={liking}
            disabled={!user}
            className={`rounded-full gap-2 transition-all px-4 py-2 ${
              post.likes > 0
                ? 'text-red-500 hover:bg-red-500/10'
                : 'text-zinc-400 hover:text-red-500 hover:bg-red-500/10'
            } ${!user ? 'opacity-50 cursor-not-allowed' : ''}`}
            variant='ghost'>
            <Heart
              size={24}
              className={`transition-all ${
                post.likes > 0 ? 'fill-current scale-110' : ''
              }`}
            />
            <span className='text-lg font-medium'>{post.likes}</span>
          </Button>
        </div>

        {/* Comments Section */}
        <section className='max-w-3xl mx-auto'>
          <h2 className='text-2xl font-bold text-zinc-100 mb-8 flex items-center gap-3'>
            <MessageCircle size={28} className='text-emerald-500' />
            Comments ({post.comments?.length || 0})
          </h2>

          {/* Comment Form */}
          <div className='mb-12'>
            <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />
          </div>

          {/* Comments List */}
          <div className='space-y-6'>
            {post.comments?.length === 0 ? (
              <div className='text-center py-12 bg-zinc-900/50 rounded-xl border border-zinc-800 border-dashed'>
                <MessageCircle
                  size={48}
                  className='mx-auto text-zinc-700 mb-4'
                />
                <p className='text-zinc-400 text-lg'>
                  No comments yet. Be the first to share your thoughts!
                </p>
              </div>
            ) : (
              post.comments?.map((comment) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  onUpdate={handleCommentUpdated}
                  onDelete={handleCommentDeleted}
                />
              ))
            )}
          </div>
        </section>
      </article>
    </div>
  );
};

export default PostDetailPage;
