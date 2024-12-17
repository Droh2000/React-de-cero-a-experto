import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../store/auth/authSlice';
import { FirebaseAuth } from '../firebase/config';

// Este Hook no regresa nada solo tiene que disparar lo que tenga que disparar 
export const useCheckAuth = () => {
    const {status} = useSelector( state => state.auth);

    const dispatch = useDispatch(); // Para hacerle dispatch al ussuario

   /*
        Entonces el "AppRouter" esta pendiente del Status y teemos que disparar algun efecto para que ese pueda cambiar 
        si estamos autenticados o no (Este es el punto donde  requerimos tomar deciciones para rendirizar
        un componente u otro)

        Este efecto revisa si la persona esta autenticada o No
        no requereimos implementarle alguna limpieza porque el AppRouter siempre va a estar pendiente
        del estado de la autenticacion

        Firebase tiene varias formas de saber cual es el usuario activo y nos ofrece una forma de estar pendiente
        de los cambios que el usuario va a tener, esto es asi de dinamico porque el usuario cuando cierra o inicia sesion
        puede usar dferentes provedores y requerimos estar pandiente del mismo en el momento que el estado de autenticacion
        cambie para eso es la funcion "onauthStateChanged" (Cuando el estado de la autenticacion cambia)
        lo que se le pasa es el "FirebaseAuth" esto es una funcion que regresa algo que se conoce como un Obervable es decir 
        una funcion que esta emitiendo valores, es decir cuando el estado de la autenticacion cambia esa funcion se va a volver
        a disparar, en teoria cuando tenemos una funcion de ese tiempo la vamos a quere limpiar pero en este caso nunca la vamos 
        a querer limpiar porque siempre vamos a querer estar pendiente del cambio de la autenticacion
        Despues de esto le pasamos la funcion que vamos a querer ejecutar cuando se reciba el siguiente valor que es de tipo User
            Este es el usuario al que le vamos a hacer dispatch para que se autentique
   */

    useEffect(() => {
        onAuthStateChanged( FirebaseAuth, async (user) => {
            // Preguntamos si no hay un usuario entonces llamamos el logout del "authSlice.js"
            if ( !user ) return dispatch( logout() );

            // Extraemos del usuario lo que nos interesa
            const { uid, email, displayName, photoURL } = user;

            // Si tenemos un usuario entonces aplicamos el dispatch del login (No es el StartLogin porque aqui ya tenemos el usuario)
            dispatch( login({ uid, email, displayName, photoURL }) );

            // Con esto el usuario al ingresar al Login ya permanecera Autenticado
        })
    }, []);

    // Lo pasamos en un objeto para desestructurarlo despues pero igual podemos retornar diractamente el status
    return {
        status // para que nos diga si esta autenticado o no el usuario
    }
}
