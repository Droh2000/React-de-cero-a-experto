const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = ( req, res = response, next ) => {
    // Debemos recibir el JWT para eso creamos la ruta de '/renew', aqui elegimos mandar el token en los headers
    // con la llave 'x-token', para leer los Headers tenemos:
    const token = req.header('x-token');

    // Validamos el token (La forma en que leyamos el token debe ser igual a como lo generamos)
    if( !token ){ // Si el token es null
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {
        // Extraemos el payload porque nos interesa saber el uid del usuario porque asi sabemos
        // que usuario es, asi sabemos que el payload que obtenemos es el mismo que se genero
        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        // Podemos hacer una modificacion en la Request para que cualquier peticion que haiga pasado el
        // JWT, tambien tenga el uid y el name, asi depues pasaremos la request por referencia a cualquier funcion
        // que sigua despues del llamado del next()
        req.uid = uid;
        req.name = name;


    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }

    next();
}

module.exports = {
    validarJWT
}