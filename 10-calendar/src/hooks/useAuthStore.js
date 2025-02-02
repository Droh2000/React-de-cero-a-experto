// Este tiene como objetivo realizar cualquier interaccion con la parte del Auth en nuestro Store

import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';


export const useAuthStore = () => {
    // Vamos a ocupar informacion del Store que viene desde el "state" y de ahi tomamos la parte de la autenticacion
    // con la ventaja del UseSelector es que en el State tenemos toda la informacion que ocuparamos
    const { status, user, errorMessage } = useSelector = ( state => state.auth );
    const dispatch = useDispatch()

    // Como nos tenemos que comunicar al backed tenemos que hacerlo de manera asyncrona
    const startLogin = async ({ email, password }) => {
        // Aqui nos conestamos a backend
        try{
            // Para hacer el login es una peticion POST al que le mandamos el segmento del URL que no tenemos configurado en nuestra variable de entorno
            // Como en la variable de entorno no terminamos con un slash le agregamos aqui el slash
            // En el BODY le mandamos los datos
            const resp = await calendarApi.post('/auth', {
                email, password
            });
        }catch(error){
            console.log(error);
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