// Para que funcione el autocompletado en este archivo exportamos express
// Esta variable la igualamos al parametro 'res' de la funcion
//      const express = require('express');
// Podemos desestructurar de arriba 
const { response } = require('express');

// Para obtener los errores de Express-validator (EStos se fueron al Custom middleware)
const { validationResult } = require('express-validator');

//const crearUsuario = (req, res = express.response) => {
// Request  ->  Esto es lo que la persona solicita (Aqui viene la informacion que se manda en el body)
// Response ->  Es lo que nosotros Respondemos
const crearUsuario = (req, res = response) => {

    // Asi extraemos la informacion
    const { name, email, password } = req.body;
    
    // Estos datos que tenemos (name, email, pasword) son datos obligatorios que deberiamos
    // de tener validado en el backend, en el Frontend por supuesto que los vamos a validar 
    // pero el backend tambien tiene que validar esta informacion porque nunca hay que confiarse
    // que la informacion del fronted venga correctamente.
    // Para esto tenemos que aplicar ciertas reglas de validacion
    // Podemos hacer las validaciones manualmente (Pero mejor tenemos Express validation)
    //if( name.length < 5 ){
        // Por defecto nos rergesa un Status 200 pero este caso es para cuando no es correcta la informacion
        // Asi que tenemos que regresar el codigo de error correcto
        // Si hubo un error en la informacion que mando el usuario en el Fronted (Eso seria un Status 400)
        // El 'res.json()' solo se puede ejecutar una vez por funcion por eso se pone en un return, sino sara error
        //return res.status(400).json({
        //    ok: false,
        //    msg: 'El nombre debe ser mayor a 5 letras'
        //});
    //}

    res.status(201).json({
        ok: true,
        msg: 'registro',
        // Mostrar la informacion que recibimos del Body en la respuesta
        name, email, password
    });
}

const loginUsuario = (req, res = response) => {

    const { email, password } = req.body;

    res.status(201).json({
        ok: true,
        msg: 'login',
        email, password
    });
}

const revalidarToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'renew'
    });
}

// Para exportar en Node (usamos objeto para poder pasar varias funciones)
module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
}