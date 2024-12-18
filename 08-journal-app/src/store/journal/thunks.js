
// Esto es el inicio del proceso (Esta accion se le metera al Dispatch cuando el usuario haga click en el boton de +)

import { doc, collection, setDoc } from "firebase/firestore";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes } from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";

// Este boton esta en: /src/journal/pages/JournalPages.jsx
export const startNewNote = () => {
    return async (dispatch, getState) => {
        // Esto es lo que ocupamos para guardar en Firebase

        // Esto lo hacemos para que la persona no pueda dar click muchas veses en el boton ya que cada vez se crean nuevas entradas
        // para esto lo creamos en el journalSlice el reducer e implementamos la logica en el boton en JournalPage.jsx
        dispatch( savingNewNote() );

        // Con el getState obtenemos todo el estado que es todo lo que esta en el Store que contiene el uid
        // El uid del usuario lo requerimos para saber cual usuario es el que esta insertanto en la BD y asi sabemos
        // cuales son sus respectivas notas
        const { uid } = getState().auth;

        // Esta es la nueva nota que vamos a guardar
        // Aqui no definimos el uid en el objeto porque nos lo va a dar Firebase
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        // Ahora debemos de apuntar a la BD de firebase 
        // Primero nos creamos la referncia a la coleccion, esa coleccion es el punto donde lo queremos insertar
        // Apuntamos al documento y dentro buscamos una coleccion dentro le pasamos la configuracion de Firesotre y
        // para esto le pasamos el FirebaseDB de config.js (Con esto ya sabe la BD y variables de entorno)
        // Lo segundo le pasamos la ruta (Asi es como estara almacenado en la BD) donde primero es el ID del usuario
        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) )

        // Para que esto funcione tenemos que tener configurado en el FireBase para dejar pasar las peticiones
        // ESto es en las Reglas dentro de la BD de Firesotre
        // si la request es diferente de null (En pocas palabras si la persona esta autenticada)

        // Guardamos la nota y la ponemos en el espacio respectivo de la BD de Firestore
        // Firebase tambien nos va a generar un ID para cada una de las notas
        await setDoc( newDoc, newNote );

        // Ahora debemos de insertar la nota en el espacio que tenemos en el Store (Fisicamente en nuestra App)
        // y a la vez como esta es una nota nuea deberiamos de activarla
        // A la nota le especificamos el ID (La propiedad que no especificamos en el objeto)
        newNote.id = newDoc.id;

        // Llamamos la accion de journalSlice que le mandamos el payload
        dispatch( addNewEmptyNote( newNote ) );

        // Activamos la nota
        dispatch( setActiveNote( newNote ) );
    }
}

/*
    En un inicio si recargamos el navegador Web perdemos todo en nuestro Store
    (Estas si existen en Firebase), cuando el usuario entre a la APP denemos de tener todas las demas notas
    que tenga guardadas (Esto es una tarea asyncrona)
    El uid ya lo tenemos en el store por eso no se lo pasamos a la funcion

    Ademas en el journal podriamos tener algo que diga como "loadingNotes" pero aqui lo que vamos
    a hacerlo es que hasta que tengamos las notas y tengamos el usuario es cuando vamos a mostrar la aplicacion
    por tanto no requerimos nigun loadding adicional

    Esta funcion la vamos a llamar en el customHook que creamos "useCheckAuth.js" que lo colocamos en el AppRouter.jsx
    esto es porque cuando tenemos un usuario el primer lugar en darse cuenta es este archivo
*/
export const startLoadingNotes = ( ) => {
    return async (dispatch) => {
        const { uid } = getState().auth;

        // Funcion Helper para traernos los documentos 
        const notes = await loadNotes( uid );

        // Ya que tengamos las nota obtenidas de firebase deberiamos de establecerlas
        // de forma local, esto lo tenemos que definir en el "journalSlice.js" para tener el 
        // store las notas (LLamamos desde el thonks para asegurarnos que tengamos las notas)
        dispatch( setNotes( notes ) );
    }
}