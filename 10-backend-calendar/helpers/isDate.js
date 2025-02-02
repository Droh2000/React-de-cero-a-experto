const moment = require('moment');

// Los argumentos que esta funcion recibe es el Value y un objeto donde queremos desestructurar 
// la peticion como tal, estos datos nos los dice la documentacion de Express
const isDate = ( value ) => { // Al final solo se dejo Value, lo otros era para ver mas informacion de la peticion
    // Si imprimimos estos argumentos tenemos toda la informacion referente a la peticion y sus argumentos
    // Para validar fechas instalamos el paquete de Moment

    // Primero verificamos si el value Existe
    if( !value ){
        return false; // La validacion  fallara
    }

    // Usamos moment y sus funciones que nos da
    const fecha = moment( value );

    if( fecha.isValid() ){
        return true;
    }else{
        return false;
    }
}

module.exports = { isDate }