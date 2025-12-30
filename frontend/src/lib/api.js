const API_BASE_URL =
  import.meta.env.API_BASE_URL || 'http://localhost:3000/api';

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

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
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
