import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    projects: [],
    properties: [],
    loading: false,
    error: null,
};

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
      setProjectsList: (state, action) => {
        state.projects = action.payload;
        state.error = null;
      },
      setPropertiesList: (state, action) => {
        state.properties = action.payload;
        state.error = null;
      },
      setProjectError: (state, action) => {
        state.error = action.payload;
      },
      setLoading: (state, action) => {
        state.loading = action.payload;
      }
    }
  });
  
  export const { 
    setProjectsList, 
    setPropertiesList, 
    setProjectError,
    setLoading 
  } = projectSlice.actions;
  
  export default projectSlice.reducer; 