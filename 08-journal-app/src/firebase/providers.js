import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseAuth } from './config';

// Esto es para la configuracion de iniciar sesion con la cuenta de Google
const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {

    try {
        // Del Archivo config.js usamos el de autenticacion, despues le pasamos el provedor que nos mostrar el PopUp
        const result = await signInWithPopup( FirebaseAuth, googleProvider );

        // Esta parte es solo para ver como se obtienen las credenciales como los Tokens
        //const credentials = GoogleAuthProvider.credentialFromResult( result );

        // Con el "result" ya obtenemos los datos requeridos del usuario (Muchos de los datos
        // que obtenemos aqui son proporcionados por FireBase)
        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true, // para indidcar que todo salio Bien
            displayName, 
            email, 
            photoURL, 
            uid
        }
    } catch ( error ) {
        const errorCode = error.errorCode;
        const errorMessage = error.errorMessage;

        return {
            ok: false,
            errorMessage,
            errorCode,
        }
    }
}
// Esto lo mandamos a llamar en: /src/store/auth/thunks.js dentro de la funcion startGoogleSignIn

// Para tomar los datos en el formulario y crear el usuario en firebase (Esto ses una tarea asyncrona)
// Creamos un nuevo proveedor para regsitrar el usuario y password, de aqui recibimos un objeto con el cual
// le sacamos las propiedaes que son los campos
export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
    try {
        // Primero llegamos a Firebase
        // Le mandamos el "FireBaseAuth" el cual ya tiene toda la configuracion de la autenticacion
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        // Si todo sale bien vamos a tener un par de cosas que van a venir del usuario
        // Esto cuando se esta creando el usuario no lo vamos a tener pero puede que despues se auntentique 
        const { uid, photoURL } = resp.user;

        // Por defecto el DisplayName nos viene en NULL en esta parte porque aunque el usuario se creo el usuario no 
        // lo estamos estableciendo en ningun lugar (Debemos de autenticar el usuario)
        // ademas de actualzar el DisplayName para que asi sepamos el nombre de esa persona
        // A la funcion "updateProfile" le tenemos que mandar un usuario que cuando nosotros nos autenticamos y queremos saber 
        // el usuario actual se le especifica esta linea de codigo despues le especificamos lo que queremos actualizar en el usuario
        await updateProfile( FirebaseAuth.currentUser, { displayName } );

        updateProfile()


        // Retornamos los datos que nos interesa
        return {
            ok: true,
            uid, photoURL, email, displayName
        }
        
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.errorMessage,
        }
    }
}// Esta funcion la madamos a llamar en thunks.js

export const loginWithEmailPassword = async ({ email, password }) => {

    try {
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true,
            uid, photoURL, displayName
        }

    } catch (error) {
        return {
            ok: false,
            errorMessage: error.errorMessage,
        }
    }
}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut(); // Esto nos cierra todo
}