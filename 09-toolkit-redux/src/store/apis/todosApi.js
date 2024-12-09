import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todosApi = createApi({
    reducerPath: 'todos',// Le colocamos un nombre que queramos que tenga
    // Este nos va a ayudar a nosotros a poder hacer algo muy parecido a lo que hicimos en la parte de AXIOS (pokemonApi.js)
    // pero esto no es solo una valor en duro sino que es esta funcion a la que dentro le pasamos la URL
    baseQuery: fetchBaseQuery({
        // El endpoint que llamamos lo vamos a mandar a llamar con este URL
        baseUrl: 'https://jsonplaceholder.typicode.com'
        //Aqui podemos configurar CustomHeaders
    }),
    // Estas son las diferentes formas que vamos a querer llamar para traer la informacion
    // igualmente esto es un CallBack que recibe como argumento un Builder
    endpoints: (builder) => ({
        // Aqui definimos nuestros Endpoints (Si pensamos que esto es demaciado codigo para una peticion
        // recordemos que podemos crear un SNIPPER para traer el codigo que siempre vamos a utilizar)
        getTodos: builder.query({
            // Entonces se junta el "baseUrl" con el Query que especificamos aqui
            query: () => '/todos'
        }),// Nosotros vamos a requerir llamar este "getTodos" y nos va a regresar el Todos

        // Nos creamos otro Endpoint para llamar un TODO atravez de un ID
        // este se tiene que llamar con otro Nombre (no se pueden llamar igual)
        getTodo: builder.query({
            // Aqui le especificamos los argumentos que le queremos mandar a llamar
            // Recordemos que esto se concetena en el "baseUrl"
            query: (todoId) => `/todos/${todoId}`
        }),
    })

});

// Nosotros requerimos desestructurar aqui un CustomHook, cuando nosotros utilizamos el "createApi" esto nos crea CustomHooks
// asi que como nostros tenemos definido el "getTodos" entonces nos genera "useGetTodosQuery" es un Query porque es una peticion GET
// En este CustomHook tenemos toda la informacion nesesaria para saber cuando tenemos erroes, cuando se cargo la Data, etc
export const { useGetTodosQuery, useGetTodoQuery } = todosApi;