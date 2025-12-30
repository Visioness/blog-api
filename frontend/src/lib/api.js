const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

/**
 * Wrapper around fetch with credentials and JSON handling
 * @param {string} endpoint - API endpoint (e.g., '/posts')
 * @param {object} options - Fetch options
 * @returns {Promise<object>} - Response data
 */
export const api = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Don't stringify body if it's FormData
  if (options.body && !(options.body instanceof FormData)) {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, config);

    // Handle non-JSON responses (e.g., 502/503 HTML from proxies)
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      if (!response.ok) {
        throw new Error(
          'We are trying to load the server. Please wait a moment.'
        );
      }
      return {};
    }

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message || 'Something went wrong';
      // Log the error for debugging purposes, but rely on the UI to show the message
      console.warn(`API Error (${response.status}):`, errorMessage);
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    // Handle network errors (connection refused, offline, etc.)
    if (error instanceof TypeError || error.name === 'TypeError') {
      console.error('Network Error:', error);
      throw new Error(
        'We are trying to load the server. Please check your connection.'
      );
    }
    // Re-throw other errors
    throw error;
  }
};

// Auth API
export const authApi = {
  getMe: () => api('/me'),
  signUp: (userData) => api('/sign-up', { method: 'POST', body: userData }),
  logIn: (credentials) => api('/log-in', { method: 'POST', body: credentials }),
  logOut: () => api('/log-out', { method: 'POST' }),
};

// Posts API
export const postsApi = {
  getAll: () => api('/posts'),
  getById: (postId) => api(`/posts/${postId}`),
  create: (postData) => api('/posts', { method: 'POST', body: postData }),
  update: (postId, postData) =>
    api(`/posts/${postId}`, { method: 'PATCH', body: postData }),
  delete: (postId) => api(`/posts/${postId}`, { method: 'DELETE' }),
  changeStatus: (postId, status) =>
    api(`/posts/${postId}/status`, { method: 'PATCH', body: { status } }),
  like: (postId) => api(`/posts/${postId}/like`, { method: 'POST' }),
};

// Comments API
export const commentsApi = {
  create: (postId, content) =>
    api(`/posts/${postId}/comments`, { method: 'POST', body: { content } }),
  update: (commentId, content) =>
    api(`/comments/${commentId}`, { method: 'PATCH', body: { content } }),
  delete: (commentId) => api(`/comments/${commentId}`, { method: 'DELETE' }),
};

// Profile API
export const profileApi = {
  getByUsername: (username) => api(`/profile/${username}`),
  getPosts: (username) => api(`/profile/${username}/posts`),
  getComments: (username) => api(`/profile/${username}/comments`),
  upgradeRole: () => api('/profile/role', { method: 'PATCH' }),
};
