// Aqui nos vamos a crear todo lo que es el CRUD
/*
    Especificamos la ruta para saber con cual URL llamar los endpoints
        - /api/event
*/

const { Router } = require('express');
const router = Router();

const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
// Middleware par verificar que los datos se ingresan correctamente
const {check } = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

// Hay que Agregar la validacion por JWT como esta validacion se aplica para todas las rutas
// Podemos subir el midleware para no repetir la linea de codigo en todos los endpoints
// Al hacer esto le decimos que cualquier peticion que se encuentre justo debajo de esta linea de codigo va a tener que cumplir el JWT
router.use( validarJWT ); // Todas las peticiones tiene que pasar por este JWT, si queremo que una URL sea publica la ponemos arriba es esta instruccion

// Obtener Eventos
router.get('/', getEventos );

// Crear un nuevo evento
router.post('/',[
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    // Como Express no tiene validaciones para Fecha la vamos a crear nosotros 
    // Dentro de la funcion "custom" le tenemos que envirar un Callback que validara el campo (Este Callback lo creamos en la carpeta Helpers)
    check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
    check('end', 'Fecha final es obligatoria').custom( isDate ),
    validarCampos // Con esta funcion si alguno de los check no se cumple no pasara la validacion
], crearEvento );

// Actualizar evento
// Aqui le especificamos el campo ID pero para probarlo le mandamos cualquier cosa
router.put('/:id', actualizarEvento );

// Borrar Evento
// Solo vamos a permitir que personas puedan eliminar los eventos que crearon ellos mismos
router.delete('/:id', eliminarEvento );

module.exports = router;