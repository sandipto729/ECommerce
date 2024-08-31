// store.jsx
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; 

const store = configureStore({
  reducer: {
    user: userReducer, // Ensure this matches the reducer you want to use
  },
});

export default store; // Default export
