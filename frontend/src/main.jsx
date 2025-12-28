import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // Auth routes
      {
        path: 'sign-up',
        element: <SignUpPage />,
      },
      {
        path: 'log-in',
        element: <LogInPage />,
      },
      {
        path: 'log-out',
        element: <LogOutPage />,
      },

      // Posts routes
      {
        path: 'posts',
        element: <PostsPage />,
        children: [
          {
            path: ':postId',
            element: <PostDetailed />,
          },
        ],
      },

      // Profile routes
      {
        path: 'profile/:username',
        element: <ProfileLayout />,
        children: [
          {
            index: true,
            element: <ProfileInfo />,
          },
          {
            path: 'posts',
            element: <ProfilePosts />,
          },
          {
            path: 'comments',
            element: <ProfileComments />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
