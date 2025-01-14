const { response } = require('express');
const { validationResult } = require('express-validator');

// Para que las funciones solo tengan codigo relacionado a la peticion
// La condicion del manejo de errores esta duplicado en cada funcion
// Para eso nos vamos a crear un middleware personalizado para que cada vez que quieramos utilizar el Check
// no haga la llamada al controlador si hay errores y solo muestre los errrores directamente

// El argumento "next" es un callback
const validarCampos = (req, res = response, next) => {
    // Aqui tenemos informacion de todo lo que se ah ejecutado anteriormente
    // El 'next' es una funcion que tenemos que ejecutar si este middleware se ejecuta correctamente
    // en pocas palabras este 'next' se esta llamando de manera interna dentro de cada 'check'
    // Cuando entra al 'auth' de 'routes' entra en cada Check de arriba a abajo y si esta correcto pasa
    // al siguiente Check hasta qye termina y pasa al controlador 

    // El 'next' lo tenemos que llamar de manera condicional, esa condicion es la de los Errores
    // Manejo de errores (Si no hay vendra como un arreglo vacio)
    const errors = validationResult( req ); // Obtenemos los errores
    if( !errors.isEmpty() ){
        // Esto es algo personalizado que vamos a hacer para que sea mas facil de trabajar
        // Asi tenemos todos los errores serializados en un solo objeto
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    // Si no hay nigun error ejecuta el 'next' y se pasa al siguiente 'check' de la validacion
    next();
}

module.exports = {
    validarCampos
}