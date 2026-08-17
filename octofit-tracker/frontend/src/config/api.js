/**
 * API Configuration
 * Determines the correct API URL based on environment
 */

export const getApiBaseUrl = () => {
  // For Codespaces: https://{CODESPACE_NAME}-8000.app.github.dev
  // For local development: http://localhost:8000
  
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:8000';
  }

  // For Codespaces, extract from current URL and replace port
  const currentHost = window.location.hostname;
  // Expected format: {name}-5173.app.github.dev
  const match = currentHost.match(/^(.+?)-5173\.app\.github\.dev$/);
  if (match) {
    return `https://${match[1]}-8000.app.github.dev`;
  }

  // Fallback
  return 'http://localhost:8000';
};

export const apiClient = {
  get: async (endpoint) => {
    const url = `${getApiBaseUrl()}${endpoint}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}`);
    }
    return response.json();
  },

  post: async (endpoint, data) => {
    const url = `${getApiBaseUrl()}${endpoint}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to post to ${endpoint}`);
    }
    return response.json();
  },
};
