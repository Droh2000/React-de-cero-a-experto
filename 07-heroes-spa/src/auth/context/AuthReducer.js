import { types } from '../types/types';

// Esta funcion recibe dos argumentos 
// state, Veamos como luce el estado
// El Estado inicial 
//const initialState = {
    //logged: false
    // Cuando ya tenemos un usuario autenticado el logged deberia ser True
    // esos serian los dos estados que vamos a tener (True y False)
//}
// Al state le podriamos mandar esta funcion o simplemente con iguala al state a un objeto vacio en caso que no se mande

// actions -> Las acciones usualmente tienen el Type y el Payload

export const AuthReducer = ( state={}, action ) => {

    switch (action.type) {
        // Los tipos ya los definimos en el archivo types/types.js (Que son las acciones que se podran realizar)
        case types.login:
            // Para el caso que recibimos una accion que tenga login (Cuando mandamos a llamar esta accion ya deberiamos de estar autenticados)
            return {
                // Otra cosa que se acustumbra a hacer a pesar de que nuestra estado solo tiene estas dos propiedades
                // podria ser que el dia de mañana podriamos tener mas propiedades en el 'State' enotnces siempre resulta util hacer la desestructuracion
                // del State para mantener el State Anterior y remplazamos (Especificando aqui) las propiedades que nos interesan 
                ...state, // Si tenemos una configuracion que no queemos perder asi nos evitamos hacer modificaciones a este reducer el dia de manana
                logged: true,
                user: action.payload // Asi establecemos el usuario
            };

        case types.logout:
            // Aqui cambiamos a otro tipo de estado
            return {
                logged: false,
                //name: action.payload -> Aqui ya no va a existir el Name
            };

        default:
            return state;
    }
}
