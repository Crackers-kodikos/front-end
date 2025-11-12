/**
 * Signup API client (Axios template)
 *
 * This module provides a small wrapper around axios for the signup endpoint.
 * The real API may not be available right now; this is a ready-to-use template.
 *
 * Usage:
 *   import signup from '../api/signup';
 *   const result = await signup({ name, email, password });
 *
 * Result shape (always):
 *   { ok: true, data } on success
 *   { ok: false, status?, message, data? } on failure
 */

import axios from 'axios';

// Base URL for API requests. When using Vite, set VITE_API_BASE_URL in .env.
// Falls back to '/api' which you can proxy during development.
const API_BASE = import.meta?.env?.VITE_API_BASE_URL || '/api';

// Create an axios instance so settings (timeout, headers) are centralized.
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10_000, // 10s timeout
});

/**
 * Call the signup endpoint.
 * @param {Object} userData - The signup payload (e.g. { name, email, password })
 * @returns {Promise<Object>} result - { ok: boolean, data?, status?, message? }
 */
export async function signup(userData) {
  try {
    const response = await api.post('/signup', userData);
    return { ok: true, data: response.data };
  } catch (error) {
    // Axios structured error handling
    if (error?.response) {
      // Server responded with a status outside 2xx
      const { status, data } = error.response;
      // Try to extract a friendly message from the server response
      const message = (data && (data.message || data.error)) || error.response.statusText || 'Signup failed';
      return { ok: false, status, message, data };
    }

    // Request made but no response received, or other errors
    return { ok: false, message: error?.message || 'Network or unknown error' };
  }
}

export default signup;
