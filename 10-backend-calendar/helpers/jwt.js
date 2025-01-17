const jwt = require('jsonwebtoken');

// Esta funcion le mandamos lo que va a contener el payload del token
const generarJWT = ( uid, name ) => {

    // Como esta libreria trabaja con Callbacks y no con promesas, para poder utilizar las promesas
    // implementamos asi el codigo
    return new Promise( (resolve, reject) => {

        const payload = { uid, name };

        // Firmamos el Token
        // El segundo argumento es la llave pivada que es una palabra que es unica para que el token
        // que se genere sea correcto y al cambiar esa parte y se genere otro token, este ultimo no sera valido
        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            // Opciones para alterar la duracion del token
            expiresIn: '2h'
        }, (error, token) => { // Este Callback se va a disparar con un error y contiene el token
            
            if( error ){
                console.log( error );
                reject('No se pudo generar el token'); // Mostramos este mensaje al usuario para no mostrar el de la variable que puede comprometer informacion sencible del servidor
            }

            // Si todo se hace correctamente
            reject( token );
        });

    });
}

module.exports = {
    generarJWT
}