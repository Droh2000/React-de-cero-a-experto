// Estas son acciones que podemos hacer dispatch que internamente tienen una tarea asincrona

import { loginWithEmailPassword, registerUserWithEmailPassword, singInWithGoogle, logoutFirebase } from "../../firebase/providers";
import { checkingCredetianls, login, logout } from "./authSlice";

// Cuando estemos en el LoginPage.jsx que se preciona al boton que llama la funcion onSubmit se debe de hacer el Dispatch de esta accion
// este "checkingAuthentication" viene a nuestro Store y cambia el STATUS a "checking" (Que es el que definimos en el authSlice.js)
// Esta funcion la disparamos del lado del formulario
export const checkingAuthentication = ( email, password ) => {
    return async ( dispatch  ) => {
        // Al inicio vamos a hacer un dispatch de una de las acciones de authSlice que nos 
        // pone la aplicacion en un estado que es "checkingCredentials"
        
        // Del authSlice hacemos el dispatch para cambiar de Status
        dispatch( checkingCredetianls() );
    }
}

// Este es para el boton de Google
export const startGoogleSignIn = () => {
    return async ( dispatch ) => {
        dispatch( checkingCredetianls() );

        // Funcion con fireBase
        const result = await singInWithGoogle();

        // Lo que sigue despues de estar en Firebase debemos camabiar el Status de "checking"
        // segun lo obtenido de autenticar o mostrar el Error
        // Al que pasa es que si tocamos el boton de Google y lo cerramos loluego vamos a tener la parte del
        // catch indicando que hubo un error indicando que el usuario no se autentico (Toda esta info la tenemos en el "resulr")

        // Si el resultado no fue correcto lo sacamos y le mandamos el error
        if( !result.ok ) return dispatch( logout( result.errorMessage ) );

        // Si todo sale bien mandamos el objeto al Ingreso de la app
        // le mandamos el Payload que es el resultado
        dispatch( login( result ) )
    }
}

export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {
    return async ( dispatch ) => {
        // Establecemos el STATUS de que estamos realizando el Cheking, para poder bloquer los botones y demas
        dispatch( checkingCredetianls() );

        // Aqui vamos a obtener toda la informacion de los elementos del usuario asi que desestructuramos lo que nos interesa
        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({email, password, displayName});

        // Verificamos si la funcion de arriba fallo lo sacamos al usuario y le mandamos el mensaje de error
        // el mensaje de error por como esta definido en el Authslice,js espera que sea un objeto que tenga el mensaje de error
        if( !ok ) return dispatch( logout( {errorMessage} ) );

        // Si todo sale bien ingresamos el usuario al sistema
        // le mandamos la informacion del Login
        dispatch( login({ uid, displayName, email, photoURL }));

    }
}// Esta la usamos en el RegisterPage.jsx

export const startLoginWithEmailPassword = ({ email, password }) => {
    // Debemos retornar el callback asyncrono con el Dispatch
    return async ( dispatch ) => {
        // Lo ponemos en estado de checking
        dispatch( checkingCredetianls() );
        // Usamos la funcion del provider.js
        const result = await loginWithEmailPassword({ email, password });

        if( !ok ) return dispatch( logout( result ) );// El result ya tiene internamente el errormessage

        dispatch( result );
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase();
        // llamamos el logut para hacer la limpieza de toda nuetra aplicacion
        dispatch( logout() );
    }
}