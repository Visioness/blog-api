import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Home, AlertTriangle } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-[60vh] text-center px-4'>
      <div className='inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 text-red-500 mb-8 animate-pulse'>
        <AlertTriangle size={40} />
      </div>

      <h1 className='text-6xl sm:text-8xl font-extrabold text-zinc-100 tracking-tight mb-4'>
        404
      </h1>

      <h2 className='text-2xl sm:text-3xl font-bold text-zinc-200 mb-6'>
        Page Not Found
      </h2>

      <p className='text-lg text-zinc-400 max-w-md mb-10 leading-relaxed'>
        Oops! The page you're looking for doesn't exist. It might have been
        moved or deleted.
      </p>

      <Link to='/'>
        <Button size='lg' className='gap-2'>
          <Home size={20} />
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
