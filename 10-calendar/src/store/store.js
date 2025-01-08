// Aqui vamos a configurar el Store
import { configureStore } from '@reduxjs/toolkit';
import { uiSlice } from './';


// Debemos de colocar este Store en el punto mas alto de la APP o donde lo podamos empezar a consumir
// Este lo colocamos en el "CalendarApp"
export const store = configureStore({
    reducer: {
        // Despues de implementado el reducer se lo mandamos
        ui: uiSlice.reducer
    }
});