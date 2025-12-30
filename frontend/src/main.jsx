import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

// Layout
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

// Route guards
import RequireAuth from './components/RequireAuth.jsx';
import RequireRole from './components/RequireRole.jsx';

// Pages
import HomePage from './pages/HomePage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import LogInPage from './pages/LogInPage.jsx';
import LogOutPage from './pages/LogOutPage.jsx';

// Posts pages
import PostsPage from './pages/posts/PostsPage.jsx';
import PostDetailPage from './pages/posts/PostDetailPage.jsx';
import CreatePostPage from './pages/posts/CreatePostPage.jsx';
import EditPostPage from './pages/posts/EditPostPage.jsx';

// Profile pages
import ProfileLayout from './pages/profile/ProfileLayout.jsx';
import ProfileInfo from './pages/profile/ProfileInfo.jsx';
import ProfilePosts from './pages/profile/ProfilePosts.jsx';
import ProfileComments from './pages/profile/ProfileComments.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
    children: [
      // Home
      {
        index: true,
        element: <HomePage />,
      },

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
      },
      {
        path: 'posts/new',
        element: (
          <RequireRole allowedRoles={['AUTHOR']}>
            <CreatePostPage />
          </RequireRole>
        ),
      },
      {
        path: 'posts/:postId',
        element: <PostDetailPage />,
      },
      {
        path: 'posts/:postId/edit',
        element: (
          <RequireRole allowedRoles={['AUTHOR']}>
            <EditPostPage />
          </RequireRole>
        ),
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

      // 404 Route
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
