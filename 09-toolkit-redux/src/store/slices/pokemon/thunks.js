// Aqui van a estar las peticiones HTTP diferente a usar 

import { pokemonApi } from "../../../api/pokemonApi";
import { setPokemon, startLoadingPokemons } from "./pokemonSlice"

// Viendo los Endpoint y la llamada para que se ejecuten le mandamos la pagina en donde queremos cargar
export const getPokemons = ( page = 0 ) => {
    // Es una funcion que regresa otra funcion asincrona solo que esta la va a terminar llamando alguien especial
    // que seria el Dispatch que es para hacer el Dispatch de otra accion, el getState lo llamamos para obtener
    // todo el RootState por ejemplo para saber si el usuario esta autenticado, cual es el nombre del usuario
    // o cualquier pieza del state que requiramos la tenemos ahi
    // Ahora cuando llamemos la accion de "getPokemons" vamos a poner el Store de la parte de pokemons a un estado de carga
    // es decir vamos a llamar el Reducer "startLoadingPokemon" llamadno a su accion para pode ejecutarlo
    return async ( dispatch, getState ) => {
        dispatch( startLoadingPokemons() );

        // Hacer la Peticion HTTP y lo que obtengamos es lo que vamos a mandar como payload en el "setPokemon"
        // Primero vamos a ver el ejemplo usando FETCH API
        // El offset lo tenemos que controlar basado en el "Page" que recibimos (Vamos a mostrarlas de 10 en 10)
        //          const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${ page * 10 }`);
        // Requerimos deserealizar esto porque vamos a tener el contenido String
        //          const data = await resp.json();

        // Ahora vamos a hacerlo con la implementacion de Axios
        // Esta es una peticion donde queremos obtener los datos y entre los parentesis le pasamos lo que nos valta de la URL
        // De aqui directamente podemos obtener los datos (Ya en un solo paso)
        const { data } = await pokemonApi.get(`/pokemon?limit=10&offset=${ page * 10 }`);
    
        // Ya con los datos ahora requerimos disparar la accion que es la de "setPokemon" creada en el pokemonSlice.js, dentro de esta
        // funcion tenemos el parametro "action", esta puede ser lo que requiramos 
        // Cuando se hace la peticion HTTP, luego de la tarea acincrona de arriba tenemos que hacer otro Dispatch de la otra accion
        // llamada "setPokemon" donde de los datos es ".results" porque asi viene en la llamada del API
        dispatch( setPokemon({ pokemons: data.results, page: page+1 }) );
    }
}