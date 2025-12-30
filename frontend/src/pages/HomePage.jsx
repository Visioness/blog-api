import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { postsApi } from '../lib/api';
import PostCard from '../components/posts/PostCard';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { ArrowRight, PenLine, Sparkles } from 'lucide-react';

const HomePage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postsApi.getAll();
        setPosts(data.data.slice(0, 6));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className='h-full overflow-y-auto scrollbar-thin'>
      <div className='flex flex-col min-h-full'>
        {/* Hero Section */}
        <section className='relative bg-zinc-950 border-b border-zinc-800 overflow-hidden'>
          <div className='absolute inset-0 bg-emerald-500/5 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-emerald-900/20 via-zinc-950/0 to-zinc-950/0 pointer-events-none' />

          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 text-center'>
            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-8 border border-emerald-500/20 animate-fade-in'>
              <Sparkles size={16} />
              <span>Welcome to DevBlog</span>
              {user && (
                <span className='text-emerald-300'>• {user.username}</span>
              )}
            </div>

            <h1 className='text-5xl sm:text-7xl font-extrabold text-zinc-100 tracking-tight mb-8 leading-tight'>
              Share your ideas,
              <br />
              <span className='text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-500'>
                inspire the community
              </span>
            </h1>

            <p className='text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed'>
              A platform for developers to write, share, and discover stories
              about programming, technology, and the journey of building
              software.
            </p>

            <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
              <Link to='/posts'>
                <Button
                  size='lg'
                  className='w-full sm:w-auto text-lg px-8 h-12'>
                  Explore Posts
                  <ArrowRight size={20} />
                </Button>
              </Link>
              {user?.role === 'AUTHOR' && (
                <Link to='/posts/new'>
                  <Button
                    variant='secondary'
                    size='lg'
                    className='w-full sm:w-auto text-lg px-8 h-12'>
                    <PenLine size={20} />
                    Write a Post
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Recent Posts Section */}
        <section className='py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
          <div className='flex items-center justify-between mb-12'>
            <div>
              <h2 className='text-3xl font-bold text-zinc-100 mb-2'>
                Recent Posts
              </h2>
              <p className='text-zinc-400'>Fresh from the community</p>
            </div>
            <Link to='/posts'>
              <Button
                variant='ghost'
                className='text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10 group'>
                View all
                <ArrowRight
                  size={18}
                  className='group-hover:translate-x-1 transition-transform'
                />
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className='flex justify-center py-12'>
              <LoadingSpinner size='lg' />
            </div>
          ) : error ? (
            <div className='p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-center'>
              <p>{error}</p>
            </div>
          ) : posts.length === 0 ? (
            <div className='text-center py-16 bg-zinc-900/50 rounded-xl border border-zinc-800 border-dashed'>
              <p className='text-zinc-400 text-lg mb-4'>
                No posts yet. Be the first to write one!
              </p>
              {user?.role === 'AUTHOR' && (
                <Link to='/posts/new'>
                  <Button variant='secondary'>Start Writing</Button>
                </Link>
              )}
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </section>

        {/* CTA Section */}
        {!user && (
          <section className='py-24 bg-zinc-900/50 border-t border-zinc-800'>
            <div className='max-w-4xl mx-auto px-4 text-center'>
              <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 text-emerald-500 mb-8'>
                <PenLine size={32} />
              </div>
              <h2 className='text-4xl font-bold text-zinc-100 mb-6'>
                Ready to start writing?
              </h2>
              <p className='text-xl text-zinc-400 mb-10 max-w-2xl mx-auto'>
                Join our community of developers and share your knowledge with
                the world. Get started today for free.
              </p>
              <Link to='/sign-up'>
                <Button
                  size='lg'
                  className='text-lg px-8 h-12 bg-zinc-100 text-zinc-900 hover:bg-white'>
                  Get Started
                  <ArrowRight size={20} />
                </Button>
              </Link>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default HomePage;
