// Este tiene como objetivo realizar cualquier interaccion con la parte del Auth en nuestro Store

import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store';


export const useAuthStore = () => {
    // Vamos a ocupar informacion del Store que viene desde el "state" y de ahi tomamos la parte de la autenticacion
    // con la ventaja del UseSelector es que en el State tenemos toda la informacion que ocuparamos
    const { status, user, errorMessage } = useSelector = ( state => state.auth );
    const dispatch = useDispatch()

    // Como nos tenemos que comunicar al backed tenemos que hacerlo de manera asyncrona
    const startLogin = async ({ email, password }) => {
        // Aqui nos conestamos a backend
        // Por como programamos el Backend sabemos que si entramos dentro del Try se cumpli la autenticacion y en el Catch nos dira los mensajes de error

        // Por lo que tenemos en el "authSlice.js" en el Reducer "onCheking" estamos revisando la autenticacion, asi que apliquemos los dispatch
        // Esto pondra la aplicacion en un estado de carga
        dispatch( onChecking );
        try{
            // Para hacer el login es una peticion POST al que le mandamos el segmento del URL que no tenemos configurado en nuestra variable de entorno
            // Como en la variable de entorno no terminamos con un slash le agregamos aqui el slash
            // En el BODY le mandamos los datos
            const { data } = await calendarApi.post('/auth', {
                email, password
            });
            // Establecemos el token en el LocalStorage
            localStorage.setItem('token', data.token);
            // Tambien nos generamos esto para saber en que momento nos creamos el token
            // Con esto nos ahorramos hacer peticiones al backend para verificar si el token todabia es valido
            localStorage.setItem('token-init-date', new Date().getTime() );

            // Hacemos el dispatch de la accion onLogin del Store
            // Este espera un payload es basicamente el Usuario pero nosotros en la respuesta bienen solo el Name y el uid
            // Si todo sale bien esto es lo que se va a grabar
            dispatch( onLogin({name: data.name, uid: data.uid}) );

        }catch(error){
            dispatch( onLogout('Credenciales incorrectas') );
            // Como el procedimiento se esta ejecutando de manera asincrona le decimos que se dispare despues de unas 10 milesimas de segundos despues
            setTimeout(() => {
                dispatch( clearErrorMessage );
            }, 10);

        }
    }

    return {
        //* Propiedades
        status,
        user,
        errorMessage,

        //* Metodos (Acciones que las personas van a poder llamar para interactuar con el Store)
        startLogin,
    }
}