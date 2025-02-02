// Cada peticion nos tiene que regresar el True y un mensaje para distingirlas
const { response } = require('express');

// Vamos a empezar a grabar en la base de datos
const Evento = require('../models/Evento');

const getEventos = async (req, res = response) => {

    // Queremos retornar la lista de todos los eventos 
    // Para mostrar los datos en el campo usuario dentro del JSON de respuesta esta el metodo
    // ".populate()" a este le pasamos la referencia a la cual queremos llenarle los datos en este caso del usuario
    // y le especificamos que solo queremos el nombre (l id siempre se pasa por defecto)
    const eventos = await Evento.find().populate('user', 'name');

    res.status(201).json({
        ok: true,
        eventos
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

const actualizarEvento = async (req, res = response) => {
    // Tomamos el valor del Id que viene en el URL
    const eventoId = req.params.id;
    const uid = req.uid;

    try{

        // Verificamos si el dato existe en la basse de datos y esto lo hacemos usando el modelo
        // de mongosse
        const evento = await Evento.findById( eventoId );

        // Puede que el usuario manda informacion que no es correcta 
        if( !evento ){ // Preguntamos si el evento eiste
            // El codigo de error en internet si algo no existe es de 404
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe por ese Id'
            });
        }

        // Varificar si la persona que creo el evento es la misma que lo quiere actualizar
        // solo si es si entonces lo dejamos pasar de otra forma no esta autorizado
        if( evento.user.toString() !== uid ){
            // Este es el codigo de error cuando alguien no esta autorizado para hacer algo
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        // En este punto dejamos a la perona editar (Creamos los nuevos datos)
        const nuevoEvento = {
            ...req.body, // Desestructuramos todo lo que venga en la respuesta del JSON
            // Colocamos el ID porque originalmente no viene en la peticion del usuario
            user:uid
        }

        // Aplicamos la actualizacion
        // A este metodo le podemos pasar configuraciones adicionales
        // Mongoose cuando se actualizar regresa el antiguo registro, esto lo vemos en el Postman
        const eventoActualizado = await Evento.findByIdAndUpdate( 
            eventoId, 
            nuevoEvento,
            // Para que nos regrese el dato ya actualizado
            {
                new: true,
            }
        );

        res.status(201).json({
            ok: true,
            eventoActualizado
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const eliminarEvento = async (req, res = response) => {
    // Tomamos el valor del Id que viene en el URL
    const eventoId = req.params.id;
    const uid = req.uid;

    try{

        // Verificamos si el dato existe en la basse de datos y esto lo hacemos usando el modelo de mongosse
        const evento = await Evento.findById( eventoId );

        // Puede que el usuario manda informacion que no es correcta 
        if( !evento ){ // Preguntamos si el evento eiste
            // El codigo de error en internet si algo no existe es de 404
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe por ese Id'
            });
        }

        // Varificar si la persona que creo el evento es la misma que lo quiere actualizar
        // solo si es si entonces lo dejamos pasar de otra forma no esta autorizado
        if( evento.user.toString() !== uid ){
            // Este es el codigo de error cuando alguien no esta autorizado para hacer algo
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            });
        }

        // Aplicamos la Eliminacion
        await Evento.findByIdAndDelete( eventoId );

        res.status(201).json({
            ok: true
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}