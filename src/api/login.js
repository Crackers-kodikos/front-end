/**
 * Login API client (Axios template)
 *
 * Mirrors the `signup` API template. Returns a consistent result shape:
 *  - { ok: true, data } on success
 *  - { ok: false, status?, message, data? } on failure
 */

import axios from 'axios';

const API_BASE = import.meta?.env?.VITE_API_BASE_URL || '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10_000,
});

/**
 * Call the login endpoint.
 * @param {Object} credentials - e.g. { phone, password }
 * @returns {Promise<Object>} result - { ok: boolean, data?, status?, message? }
 */
export async function login(credentials) {
  try {
    const response = await api.post('/login', credentials);
    return { ok: true, data: response.data };
  } catch (error) {
    if (error?.response) {
      const { status, data } = error.response;
      const message = (data && (data.message || data.error)) || error.response.statusText || 'Login failed';
      return { ok: false, status, message, data };
    }
    return { ok: false, message: error?.message || 'Network or unknown error' };
  }
}

export default login;
