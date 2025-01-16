// Para que funcione el autocompletado en este archivo exportamos express
// Esta variable la igualamos al parametro 'res' de la funcion
//      const express = require('express');
// Podemos desestructurar de arriba 
const { response } = require('express');

// Para obtener los errores de Express-validator (EStos se fueron al Custom middleware)
const { validationResult } = require('express-validator');

// Modelo que creamos con el Schema de Moongose
const Usuario = require('../models/Usuario');

//const crearUsuario = (req, res = express.response) => {
// Request  ->  Esto es lo que la persona solicita (Aqui viene la informacion que se manda en el body)
// Response ->  Es lo que nosotros Respondemos
const crearUsuario = async (req, res = response) => {

    // Asi extraemos la informacion
    //const { name, email, password } = req.body;
    
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

    // Siempre que menjemos BD hay que usar Try/catch
    try {
        // Al Schema le masnamos la informacion que viene el body, ya mongoose sabe la estructura y valores que tiene
        const usuario = new Usuario( req.body );

        // Para guardarlo en la Base de datos (Como es una promesa usamos async/await)
        await usuario.save();

        // Hay que hacer varias validaciones que son requeridas antes de guardar el usuario en la BD
        // aunque mongo nos valida, no hay que dejarle todo el trabajo a mongo
        // Otra cosa a saber es que cuando creamos el modelo "Usuario" por defecto la coneccion la nombre como su plural "Usuarios"

        res.status(201).json({
            ok: true,
            msg: 'registro',
            // Mostrar la informacion que recibimos del Body en la respuesta
            //name, email, password
        });   
    } catch (error) {
        console.log(error);// Esto es para mostrarlos como mensaje del servidor
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el Administrador'
        });// Al cliente le vamos a mostrar este mensaje
    }
    // Si ocurre un error lo podremos ver en la consola donde ejecutamos el comendo para correr el backend
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