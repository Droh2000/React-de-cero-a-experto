// Cada peticion nos tiene que regresar el True y un mensaje para distingirlas
const { response } = require('express');

const getEventos = (req, res = response) => {
    res.status(201).json({
        ok: true,
        msg: 'getEventos'
    });
}

const crearEvento = (req, res = response) => {
    res.status(201).json({
        ok: true,
        msg: 'crearEvento'
    });
}

const actualizarEvento = (req, res = response) => {
    res.status(201).json({
        ok: true,
        msg: 'actualizarEvento'
    });
}

const eliminarEvento = (req, res = response) => {
    res.status(201).json({
        ok: true,
        msg: 'eliminarEvento'
    });
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}