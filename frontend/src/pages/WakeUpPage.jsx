import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const WakeUpPage = () => {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-zinc-300 p-4'>
      <div className='text-center space-y-6 max-w-md'>
        <h1 className='text-3xl font-bold text-zinc-100'>
          Waking up the system
        </h1>

        <div className='flex justify-center py-8'>
          <LoadingSpinner size='xl' />
        </div>

        <p className='text-lg text-zinc-400'>
          The server is spinning up from a cold start. This typically takes
          about 30 seconds.
        </p>

        <div className='bg-zinc-900/50 rounded-lg p-4 border border-zinc-800'>
          <p className='text-sm text-zinc-500 mb-1'>Estimated time remaining</p>
          <p className='text-2xl font-mono text-emerald-500 font-bold'>
            {timeLeft}s
          </p>
        </div>
      </div>
    </div>
  );
};

export default WakeUpPage;
