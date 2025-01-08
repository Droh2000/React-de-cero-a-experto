// Aqui vamos a configurar el Store
import { configureStore } from '@reduxjs/toolkit';
import { uiSlice, calendarSlice } from './';


// Debemos de colocar este Store en el punto mas alto de la APP o donde lo podamos empezar a consumir
// Este lo colocamos en el "CalendarApp"
export const store = configureStore({
    reducer: {
        // Despues de implementado el reducer se lo mandamos
        ui: uiSlice.reducer,
        calendar: calendarSlice.reducer
    },
    // Para resolver lo de non-serializable value was detected
    // Esto paso porque intenta serializar la fecha de tipo String de JS
    // y eso no es recomendable pero el tipo de dato Date si es valido en JS
    // lo que pasa es que no deberiamos de mandar la fecha directamente si no generarla como
    // un numero y trabajarla asi, en este caso vamos a hacer la configuracion en 
    // el Store de Middlewares en Redux 
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        // Asi evitamos que las fechas las revise si las puede serializar
        serializableCheck: false, 
    }),
});