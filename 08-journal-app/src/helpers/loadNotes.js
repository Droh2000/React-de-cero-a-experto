// El codigo para traer las notas es algo que nos va a llevar mas trabajo entonces vamos a crearlo como una funcion Helper

import { collection, getDocs } from "firebase/firestore"
import { FirebaseDB } from "../firebase/config"

export const loadNotes = async ( uid = '' ) => {
    // Nos traemos las notas de Firebase
    // Ocupamos la referncia a la coleccion que requerimos, le pasamos la instancia de la BD, luego la ruta
    // donde se encuentra los datos que nos interesa (No podemos usar la funcion "collection" para traer documentos
    // porque nos va a dar un error, asi que debemos de apuntar a una coleccion)
    const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes` );
    
    // Nos traemos los documento que tenga la coleccion y le pasamos la coleccion
    // Aqui tenemos una funcion que tenemos que llamar para obtener los datos, osea esto es
    // una referencia a los documentos de firebase pero para obtener los datos tenemos que llamar esa funcion
    const docs = await getDocs(collectionRef);

    const notes = []; // Para almacenar las notas
    // llamamos la funcion que esta dentro de cada uno de los documentos
    docs.forEach(doc => {
        // Por defecto no viene el ID y lo ocupamos asi que se lo pasamos manualmente, luego esparcimos todos los datos
        notes.push({ id: doc.id, ...doc.data});
    });

    return notes;// Tenemos un arreglo de objetos
}