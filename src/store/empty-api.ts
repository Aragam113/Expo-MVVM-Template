import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * Universal base API for RTK Query codegen.
 *
 * Token storage:  React Native → AsyncStorage | Web → localStorage
 * Base URL:       auto-picked from ENV (see priority below)
 *
 * ENV priority:
 *   EXPO_PUBLIC_API_URL  (Expo)
 *   NEXT_PUBLIC_API_URL  (Next.js)
 *   VITE_API_URL         (Vite)
 *   REACT_APP_API_URL    (CRA)
 *   API_BASE_URL         (generic / RN bare)
 *
 * Fallback: http://localhost:3001
 */

const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.VITE_API_URL ||
  process.env.REACT_APP_API_URL ||
  process.env.API_BASE_URL ||
  'http://localhost:3001';

const TOKEN_KEY = 'accessToken';

// ─── Token retrieval (auto-detect platform) ────────
let _getToken: () => Promise<string | null>;

try {
  // Will resolve in React Native bundles, throw in web
  const AsyncStorage = require('@react-native-async-storage/async-storage').default;
  _getToken = () => AsyncStorage.getItem(TOKEN_KEY);
} catch {
  _getToken = async () => (typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null);
}

// ─── API instance ──────────────────────────────────
export const emptySplitApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers) => {
      const token = await _getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
