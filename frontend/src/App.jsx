import { Outlet } from 'react-router-dom';
import Header from './components/layout/Header';
import Button from './components/ui/Button';
import { Github } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from './lib/api';
import WakeUpPage from './pages/WakeUpPage';

function App() {
  const [isSystemReady, setIsSystemReady] = useState(false);

  useEffect(() => {
    if (isSystemReady) return;

    const checkStatus = async () => {
      try {
        await api('/status');
        setIsSystemReady(true);
      } catch {
        console.log('System sleeping, retrying...');
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 3000);

    return () => clearInterval(interval);
  }, [isSystemReady]);

  if (!isSystemReady) {
    return <WakeUpPage />;
  }

  return (
    <div className='h-screen grid grid-rows-[auto_1fr] bg-zinc-950 text-zinc-300 relative overflow-hidden'>
      <Header />
      <main className='overflow-hidden relative flex flex-col'>
        <Outlet />
      </main>

      <a
        href='https://github.com/Visioness'
        target='_blank'
        rel='noopener noreferrer'
        className='fixed bottom-4 right-4 z-10'>
        <Button variant='icon' size='icon'>
          <Github size={24} />
        </Button>
      </a>
    </div>
  );
}

export default App;
