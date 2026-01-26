import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchProjects = createAsyncThunk('portfolio/fetchProjects', async () => {
  const response = await api.get('/projects');
  return response.data;
});

export const fetchSkills = createAsyncThunk('portfolio/fetchSkills', async () => {
    const response = await api.get('/skills');
    return response.data;
});

export const fetchExperience = createAsyncThunk('portfolio/fetchExperience', async () => {
    const response = await api.get('/experience');
    return response.data;
});

export const fetchSocials = createAsyncThunk('portfolio/fetchSocials', async () => {
    const response = await api.get('/socials');
    return response.data;
});

export const fetchContactInfo = createAsyncThunk('portfolio/fetchContactInfo', async () => {
    const response = await api.get('/contact-info');
    return response.data;
});

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: {
    projects: [],
    skills: [],
    experience: [],
    socials: [],
    contactInfo: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
        // Projects
      .addCase(fetchProjects.pending, (state) => { state.loading = true; })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Skills
      .addCase(fetchSkills.fulfilled, (state, action) => {
          state.skills = action.payload;
      })
      // Experience
      .addCase(fetchExperience.fulfilled, (state, action) => {
          state.experience = action.payload;
      })
      // Socials
      .addCase(fetchSocials.fulfilled, (state, action) => {
          state.socials = action.payload;
      })
      // Contact Info
      .addCase(fetchContactInfo.fulfilled, (state, action) => {
          state.contactInfo = action.payload;
      });
  },
});

export default portfolioSlice.reducer;
