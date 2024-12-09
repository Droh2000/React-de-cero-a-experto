import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './slices/counter/counterSlice';
import { pokemonSlice } from './slices/pokemon/pokemonSlice';
import { todosApi } from './apis/todosApi';

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        pokemons: pokemonSlice.reducer,

        // Implementacion del RTK Query
        // Este es el espacio en el cual vamos a colocar los resultados producto de los query que vamos a disparar aqui
        [todosApi.reducerPath]: todosApi.reducer,
    },
    // Configuramos los Middlewares (Un middleware es solo una funcion que se ejecuta antes que otra)
    // 'getDefaultMiddleware' es el nombre del argumento que estamos recibiendo
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()// Lo que recibimos como paraemtro asi es como lo estamos usando
        .concat(todosApi.middleware)// Le concatenamos el middleware que se esta generando el "createApi"
        
})