import axios from 'axios';

// Aqui no tenemos que hacer la deserializacion que genera el .json en la respuesta
// ademas podemos generar una instancia

// Con el ".create" podemos crear una configuracion estandar que nos va a ayudar a no repetir codigo
// Esto es util cuando tenemos que mandar tokens de autenticacion en cada una de las respuestas
export const pokemonApi = axios.create({
    // Esta es la parte del URL que siempre va a ser constante
    baseURL: 'https://pokeapi.co/api/v2'
})
