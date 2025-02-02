// Cada peticion nos tiene que regresar el True y un mensaje para distingirlas
const { response } = require('express');

// Vamos a empezar a grabar en la base de datos
const Evento = require('../models/Evento');

const getEventos = (req, res = response) => {
    res.status(201).json({
        ok: true,
        msg: 'getEventos'
    });
}

const crearEvento = async (req, res = response) => {

    // En este punto deberiamos de tener ya la informacion validada entonces antes de hacer cualquier cosa
    // deberiamos de asegurarnos de que tenemos en la Request el Evento
    // Hay que validar tanto del lado del Fronted como del Backend para saber que almacenamos informacion de calidad 
    //console.log( req.body );

    // Ya tenemos verificado que exista el evento y venga con todos los datos
    // Con esto obtenemos la nueva instancia del modelo
    const evento = new Evento( req.body );

    try{
        // Antes de guardar nesecitamos el ID del usuario
        evento.user = req.uid;

        // Guardamos en la base de datos
        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
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