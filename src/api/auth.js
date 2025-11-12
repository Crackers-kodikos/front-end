/**
 * Auth helpers: save/get/clear tokens in cookies and helpers to attach auth header.
 *
 * This module intentionally keeps things small and dependency-free (no external cookie
 * library) so it works in the browser environment used by the app. Use `setTokensFromResponse`
 * when you receive an auth response from the server that contains tokens.
 */

const ACCESS_COOKIE = 'app_access_token';
const REFRESH_COOKIE = 'app_refresh_token';
const ACCESS_EXPIRES_COOKIE = 'app_access_expires'; // optional store of expiry (ms since epoch)

function isSecure() {
  return typeof window !== 'undefined' && window.location.protocol === 'https:';
}

function setCookie(name, value, { maxAgeSec, path = '/', secure = true, sameSite = 'Lax' } = {}) {
  if (typeof document === 'undefined') return;
  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=${path};`;
  if (typeof maxAgeSec === 'number') cookie += ` Max-Age=${Math.floor(maxAgeSec)};`;
  if (secure && isSecure()) cookie += ' Secure;';
  if (sameSite) cookie += ` SameSite=${sameSite};`;
  document.cookie = cookie;
}

function getCookie(name) {
  if (typeof document === 'undefined') return undefined;
  const cookies = document.cookie ? document.cookie.split('; ') : [];
  for (const c of cookies) {
    const [k, ...rest] = c.split('=');
    if (decodeURIComponent(k) === name) return decodeURIComponent(rest.join('='));
  }
  return undefined;
}

function deleteCookie(name, { path = '/' } = {}) {
  if (typeof document === 'undefined') return;
  // To delete, set Max-Age=0
  document.cookie = `${encodeURIComponent(name)}=; Max-Age=0; path=${path};`;
}

/**
 * Save tokens in cookies. Accepts different possible server shapes.
 * serverData may contain: { accessToken, refreshToken, token, refresh, expiresIn }
 */
export function setTokensFromResponse(serverData = {}) {
  if (!serverData) return;

  // common keys
  const accessToken = serverData.accessToken || serverData.token || (serverData.tokens && serverData.tokens.access) || serverData.access;
  const refreshToken = serverData.refreshToken || serverData.refresh || (serverData.tokens && serverData.tokens.refresh) || serverData.refresh_token;
  const expiresIn = serverData.expiresIn || serverData.expires_in; // in seconds

  if (accessToken) {
    // default to 7 days if expiresIn not provided
    const maxAge = typeof expiresIn === 'number' ? expiresIn : 7 * 24 * 60 * 60;
    setCookie(ACCESS_COOKIE, accessToken, { maxAgeSec: maxAge, secure: true });
    if (expiresIn) {
      // store expiry timestamp (ms) for quick checks
      const expiryTs = Date.now() + expiresIn * 1000;
      setCookie(ACCESS_EXPIRES_COOKIE, String(expiryTs), { maxAgeSec: maxAge, secure: true });
    }
  }

  if (refreshToken) {
    // Make refresh token long-lived (30 days) unless server provided expires
    const refreshMax = 30 * 24 * 60 * 60;
    setCookie(REFRESH_COOKIE, refreshToken, { maxAgeSec: refreshMax, secure: true });
  }
}

export function setTokens({ accessToken, refreshToken, expiresIn } = {}) {
  if (accessToken) {
    const maxAge = typeof expiresIn === 'number' ? expiresIn : 7 * 24 * 60 * 60;
    setCookie(ACCESS_COOKIE, accessToken, { maxAgeSec: maxAge, secure: true });
    if (expiresIn) {
      const expiryTs = Date.now() + expiresIn * 1000;
      setCookie(ACCESS_EXPIRES_COOKIE, String(expiryTs), { maxAgeSec: maxAge, secure: true });
    }
  }
  if (refreshToken) {
    const refreshMax = 30 * 24 * 60 * 60;
    setCookie(REFRESH_COOKIE, refreshToken, { maxAgeSec: refreshMax, secure: true });
  }
}

export function getAccessToken() {
  return getCookie(ACCESS_COOKIE);
}

export function getRefreshToken() {
  return getCookie(REFRESH_COOKIE);
}

export function clearTokens() {
  deleteCookie(ACCESS_COOKIE);
  deleteCookie(REFRESH_COOKIE);
  deleteCookie(ACCESS_EXPIRES_COOKIE);
}

/**
 * Attach Authorization header to an axios instance (mutates instance).
 */
export function attachAuthHeader(axiosInstance) {
  const token = getAccessToken();
  if (token && axiosInstance && axiosInstance.defaults) {
    axiosInstance.defaults.headers = axiosInstance.defaults.headers || {};
    axiosInstance.defaults.headers.common = axiosInstance.defaults.headers.common || {};
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}

/**
 * Optional helper to request a token refresh from the API.
 * Expects an endpoint POST /refresh that accepts { refreshToken } or uses cookies on the server.
 * Returns the same result shape as other API helpers: { ok, data, status, message }
 */
export async function refreshAuthToken(axiosInstance) {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return { ok: false, message: 'No refresh token' };
    const resp = await axiosInstance.post('/refresh', { refreshToken });
    // store tokens if returned
    if (resp?.data) setTokensFromResponse(resp.data);
    return { ok: true, data: resp.data };
  } catch (err) {
    if (err?.response) {
      return { ok: false, status: err.response.status, message: err.response.data?.message || 'Refresh failed', data: err.response.data };
    }
    return { ok: false, message: err?.message || 'Network error' };
  }
}

export default {
  setTokensFromResponse,
  setTokens,
  getAccessToken,
  getRefreshToken,
  clearTokens,
  attachAuthHeader,
  refreshAuthToken,
};
