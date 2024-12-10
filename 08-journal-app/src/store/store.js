import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer, // Con esto ya tenemos espacio en el Store para las pertientes acciones
    }
});