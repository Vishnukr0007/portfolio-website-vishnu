import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import authReducer from './slices/authSlice';
import portfolioReducer from './slices/portfolioSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    portfolio: portfolioReducer,
  },
});

export default store;
