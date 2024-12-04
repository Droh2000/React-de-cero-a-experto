// Construccion de nuestro proveedor de informacion
import { useReducer } from "react"
import { AuthContext } from "./AuthContext"
import { AuthReducer } from "./AuthReducer";
import { types } from "../types/types";


const initialState = {
    logged: false
}

// Funcion de inicializador para el useReducer()
const init = () => {
    // Aqui usamos el LocalStoraged para almacenar la data del usuario y no se pierda al recargar la pagina
    // que por defecto lo almacena como String asi que lo convertimos a JSON
    const user = JSON.parse( localStorage.getItem('user') );

    // Debemos de retornar el mismo formato que maneja el State
    return {
        // Preguntamos si el usuario existe esto nos va a dar TRUE
        logged: !!user,
        user
    }
}

// Recibimos todos los componentes hijos
export const AuthProvider = ({ children }) => {

    // Usamos nuestro Reducer
    // Le mandamos el reducer que vamos a usar, luego el estado inical que lo podemos mandar como un objeto vacio
    // o podriamos definirlo fuera del componente como una funcion "InitialState"
    // Desestructuramos para sacar el State y la funcion para hacer el Dispatch
    /*
        Originalmente cuando se ingresaba con el boton de Login se pasan los datos del usuario a la aplicacion
        pero al recargar la pagina se perdian estos datos, entonces para mantener esos datos vamos a usar el LocalStoraged
        y si ya esta almacenado le volveamos a cargar la informacion ahi

        Podriamos pensar en llamar el LocalStoraged dentro del Reducer pero NO se deben de llamar funciones externas dentro del Reducer
        el reducer solo tiene que resolver el nuevo State pasado por el parametro "State" que le pasamos y la accion que va a moificar el State

        Ahora dentro del AuthProvider tenemos la implementacion del useReducer que se dispara con tres posibles argumentos
        que el tercero seria la funcion de inicializacion que vamos a poder utilizar para inicializar el estado
        Asi podremos manter el usuario que se le pasa al precionar el boton de LOGIN porque cuando se recarga la pagina se manda a llamar
        la funcion de inicializacion que detectara que tenemos el usuario en el LocalStoraged y lo carga (Ademas la funcion de inicializacion se encarga de establecer estas propiedades)
    */
    const [ authState, dispatch ] = useReducer( AuthReducer, initialState, init );

    /*
        Login del usuario

    Con el Dispatch del Login que seria que al precionar el boton nos trairiamos la informacion si el usuario es valido, el token y lo demas, pero queremos
    hacer un Dispatch para establecer el usuario en nuestra aplicacion y despues mostrar el nombre del usuario en el Navbar, asi podremos saber
    si hay algun usuario conectado o no lo hay.

    Para esto de alguna forma en nuestro AuthProvider debemos establecer en ese espacio del "useReducer" debemos almacenar si el usuario esta conectado 
    y que usuario es, y para eso debemos de llamar una accion.
    Muchas cosas las podemos exponer facilmente, es decir nosotros podemos perfectamente mandar en el parametro del "value" del Authcontext.Provider
    En ese Value especificarle el "authState" y "dispatch" el problema es que le damos demaciado poder a los demas componentes
    es decir cualquier componente podra mandar a llamar el Dispatch y cualquiera podra obtener informacion del AuthState
    
        Para evitar lo de arriba nos vamos a crear esta funcion. cuando se llame vamos a suponer que nos va a mandar el nombre del usuario nada mas
    */
    const login = ( name = '' ) => {

        const user = { id:'ABC', name};

        // Ejecutamos el Dispatch de una accion, esta accion la definimos
        const action = {
            type: types.login,
            // El Payload es lo que queremos almacenar en el State del AuthProvider (Suponemos que solo es el nombre del usuario)
            // Este es el usuario que estamos mandando al State
            payload: user
        }

        // Ya teniendo la lectura del Localstoraged ahora lo tenemos que guardar en algun lugar 
        // Aqui solo podemos guardar Strings asi  que lo convertimos
        localStorage.setItem('user', JSON.stringify( user ) );

        dispatch(action);
    }

    
    /*
        Implementacion del LOGOUT

        AQui vamos a eliminar los datos almacenados en el LocalStoraged y bloquear el acceso (Para esto requerimos crear Rutas Privadas y Publicas)
        a la aplicacion, asi como tenemos creada la funcion de Login tambien nos vamos a crear la de logout

        La pantalla del Login seria una ruta publica porque va a poder acceder caulquier tipo de usuario
        y todo lo interno de nuestra aplicacion queremos que sea protegida para que solo un usuario registrado tenga acceseso
        Recordemos que estamos del lado del Frontend que es conveniente que haga todas sus validaciones porque va a mandarle la informacion al backend
        lo mas limpio posible (Buscamos que solo nos mande peticiones validas) por ejemplo si en una parte de la aplicacion se requiere autenticacion ya
        sepamos que usuario es el que ingreso al sistema
    */
    const logout = () => {
        localStorage.removeItem('user');
        // Creamos la accion que vamos a llamar por el Dispatch que es la encargada de ejecutar la salida el usuario
        // El AuthReducer.js para llamar el logout solo tenemos que recibir una accion que tenga el tipo Loggout, no tiene el pauyload
        const action = {
            type: types.logout
        }
        dispatch(action);
    }

    return (
        // Le tenemos que especificar un VALUE que si no lo tenemos lo podemos dejar como un objeto vacio
        // La funcion de "Login" la vamos a exponer aqui pasandola al Value y tambien vamos a colocar todo el State del mismo
        // el cual desestructuramos para no manejar nombres tan largos, ademas hay que tener cuidad que si tubieramos una propiedad
        // con el nombre de "login" ocurriendo que el login que colocamos despues se sobrescriba
        <AuthContext.Provider value={{
            ...authState,
            login: login,
            logout: logout
        }}>
            { children }
        </AuthContext.Provider>
    )
}