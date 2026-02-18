import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { emptySplitApi } from './empty-api';

/**
 * After running `npm run codegen`, import generated slices here:
 *
 *   import './api/auth.slice';
 *   import './api/quizzes.slice';
 *   // ...etc
 *
 * Each slice auto-injects its endpoints into emptySplitApi.
 */

export const store = configureStore({
  reducer: {
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(emptySplitApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
