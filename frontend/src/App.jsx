import Outlet from 'react-router-dom';

function App() {
  return (
    <div className='app grid grid-cols-2 grid-rows-2'>
      <Outlet />
    </div>
  );
}

export default App;
