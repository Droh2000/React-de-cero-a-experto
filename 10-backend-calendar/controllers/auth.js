// Para que funcione el autocompletado en este archivo exportamos express
// Esta variable la igualamos al parametro 'res' de la funcion
//      const express = require('express');
// Podemos desestructurar de arriba 
const { response } = require('express');

//const crearUsuario = (req, res = express.response) => {
const crearUsuario = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'registro'
    });
}

const loginUsuario = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'login'
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