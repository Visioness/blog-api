import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PenLine, User, LogOut, LogIn, UserPlus } from 'lucide-react';
import Button from '../ui/Button';

const Header = () => {
  const { user, isLoading } = useAuth();

  return (
    <header className='grid grid-cols-[1fr_auto_1fr] items-center h-16 px-6 border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-sm sticky top-0 z-50'>
      <Link to='/' className='flex items-center gap-2 group justify-self-start'>
        <div className='bg-emerald-500/10 p-2 rounded-lg group-hover:bg-emerald-500/20 transition-colors'>
          <span className='text-xl text-emerald-500 font-bold'>✦</span>
        </div>
        <span className='text-xl font-bold text-zinc-200 tracking-tight group-hover:text-white transition-colors'>
          DevBlog
        </span>
      </Link>

      {/* Navigation */}
      <nav className='flex items-center gap-1 justify-self-center'>
        <NavLink to='/posts' end>
          {({ isActive }) => (
            <div
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2
              ${
                isActive
                  ? 'bg-zinc-900 text-emerald-400 ring-1 ring-emerald-500/20'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
              }`}>
              Posts
            </div>
          )}
        </NavLink>
        {user?.role === 'AUTHOR' && (
          <NavLink to='/posts/new'>
            {({ isActive }) => (
              <div
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2
                ${
                  isActive
                    ? 'bg-zinc-900 text-emerald-400 ring-1 ring-emerald-500/20'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
                }`}>
                <PenLine size={16} />
                Write
              </div>
            )}
          </NavLink>
        )}
      </nav>

      {/* Auth Actions */}
      <div className='flex items-center gap-3 justify-self-end'>
        {isLoading ? (
          <div className='w-8 h-8 rounded-full bg-zinc-800 animate-pulse' />
        ) : user ? (
          <div className='flex items-center gap-4'>
            <Link to={`/profile/${user.username}`}>
              <div className='flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-zinc-900 transition-colors group cursor-pointer border border-transparent hover:border-zinc-800'>
                <div className='text-right hidden sm:block'>
                  {user.role === 'AUTHOR' && (
                    <span className='block text-[10px] font-bold text-emerald-500 uppercase tracking-wider mb-0.5'>
                      Author
                    </span>
                  )}
                  <span className='block text-sm font-medium text-zinc-300 group-hover:text-white leading-none'>
                    {user.username}
                  </span>
                </div>
                <div className='w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-zinc-700 group-hover:text-zinc-200 transition-colors ring-2 ring-zinc-950'>
                  <User size={16} />
                </div>
              </div>
            </Link>

            <div className='h-6 w-px bg-zinc-800' />

            <NavLink to='/log-out'>
              <button
                className='p-2 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors'
                title='Log Out'>
                <LogOut size={18} />
              </button>
            </NavLink>
          </div>
        ) : (
          <div className='flex items-center gap-3'>
            <Link to='/log-in'>
              <Button
                variant='ghost'
                size='sm'
                className='text-zinc-400 hover:text-white'>
                Log In
              </Button>
            </Link>
            <Link to='/sign-up'>
              <Button
                size='sm'
                className='bg-zinc-100 text-zinc-900 hover:bg-white border-0'>
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
