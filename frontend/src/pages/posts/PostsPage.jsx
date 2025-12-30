import { useState, useEffect } from 'react';
import { postsApi } from '../../lib/api';
import PostCard from '../../components/posts/PostCard';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { FileText, Search } from 'lucide-react';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postsApi.getAll();
        setPosts(data.data);
        setFilteredPosts(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPosts(posts);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query)
    );
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

  return (
    <div className='h-full flex flex-col'>
      {/* Header & Search - Fixed */}
      <div className='flex-none w-full bg-zinc-950/95 backdrop-blur-sm z-10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4'>
          {/* Header */}
          <div className='mb-8'>
            <div className='flex items-center gap-3 mb-2'>
              <div className='p-2 bg-emerald-500/10 rounded-lg text-emerald-500'>
                <FileText size={24} />
              </div>
              <h1 className='text-3xl font-bold text-zinc-100'>All Posts</h1>
            </div>
            <p className='text-zinc-400 text-lg ml-11'>
              Discover stories, ideas, and expertise from the community
            </p>
          </div>

          {/* Search */}
          <div className='relative max-w-md'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Search size={20} className='text-zinc-500' />
            </div>
            <input
              type='text'
              placeholder='Search posts...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='block w-full pl-10 pr-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg leading-5 text-zinc-300 placeholder-zinc-500 focus:outline-none focus:bg-zinc-800 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 sm:text-sm transition-colors'
            />
          </div>
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className='flex-1 overflow-y-auto scrollbar-thin'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8'>
          {loading ? (
            <div className='flex justify-center py-12'>
              <LoadingSpinner size='lg' />
            </div>
          ) : error ? (
            <div className='p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400'>
              <p>{error}</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className='text-center py-16 bg-zinc-900/50 rounded-xl border border-zinc-800 border-dashed'>
              <div className='flex justify-center mb-4'>
                <div className='p-4 bg-zinc-800 rounded-full text-zinc-500'>
                  <FileText size={32} />
                </div>
              </div>
              <h3 className='text-lg font-medium text-zinc-200 mb-1'>
                {searchQuery ? 'No posts found' : 'No posts yet'}
              </h3>
              <p className='text-zinc-500'>
                {searchQuery
                  ? 'Try adjusting your search query'
                  : 'Be the first to share something!'}
              </p>
            </div>
          ) : (
            <>
              <p className='text-sm text-zinc-500 mb-4'>
                Showing {filteredPosts.length} post
                {filteredPosts.length !== 1 ? 's' : ''}
              </p>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {filteredPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostsPage;
