import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import productReducers from '../slices/inventorySlice';
import settingsReducers from '../slices/settingsSlice';

const preloadedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
const preloadedUser = typeof window !== "undefined" ? localStorage.getItem("auth-user") : null;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducers,
    settings: settingsReducers,
  },
  preloadedState: {
    auth: {
      user: preloadedUser ? JSON.parse(preloadedUser) : null,
      token: preloadedToken,
      status: "idle" as const, // Use 'as const' to ensure literal type
      error: null,
      isAuthenticated: !!preloadedToken,
    },
  },
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch