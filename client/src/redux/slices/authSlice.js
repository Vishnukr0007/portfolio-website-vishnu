import { createSlice } from '@reduxjs/toolkit';

// Simulating auth for now since no backend auth flow was strictly requested yet aside from "Admin Panel"
// In a real app, this would use JWT from backend.
const initialState = {
  isAdmin: localStorage.getItem('isAdmin') === 'true',
  adminToken: localStorage.getItem('adminToken') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAdmin = true;
      state.adminToken = action.payload; // Store the password/token
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('adminToken', action.payload);
    },
    logout: (state) => {
      state.isAdmin = false;
      state.adminToken = null;
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('adminToken');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
