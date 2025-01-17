// Importamos Express
// const express = require('express');
// Configuramos un Router
// const router = express.Router;

// Otra forma de hacer lo mismo de arriba y nos ahorramos una linea de codigo
const { Router } = require('express');
// Pero en esta forma tenemos que ejecutar la funcion
const router = Router();

// Como la definicion de un Endpoint empieza a crecer de codigo lo mejor es separar 
// la ruta del controlador que va a manejar esa ruta para eso nos creamos el directorio de controllers
// donde vamos a meter las funciones de cada enpoint y de ahi importamos estoa:
// De aqui extraemos la funcion
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');

// El check es el middleware que se va a encargar de validar un campo en particular
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// Crear un usuario 
// Nos creamos un espacio reservado en la API ''/new 
// Express Validator nos da middleware y asi podemoas hacer las validacion sin hacerlas manualmente
// Como requereimos que los datos vengan en la peticion, es los pondemos mandar directamente como una funcion
// como segundo argumento pero como queremos implementar varios middleware entre llavez para tener una coleccion de middlewares
router.post(
    '/new',[
        // A la funcion le pasamos el campo que queremo evaluar, el mensaje de error y al final especificamos que no este vacio
        // Para ver estos errores lo configuramos en el Controller
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        // Ponemos las demas validaciones para los otors campos
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        // Implementamos el Custom Middleware
        // En cualquier ruta donde tengamos un check al final lo llamamos
        validarCampos
    ],
    crearUsuario);

router.post(
    '/', [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario);

// Este es para renovar el token (Le paamos el middleware que definimos)
router.get('/renew', validarJWT ,revalidarToken);

// Esta es la forma de Exportar en Node
module.exports = router;
// Para llamar el endpoint tenemos que especificar la ruta que definiamos en "index.js"
/*
    Rutas de Usuarios / Auth
    host + /api/auth + Ruta del Endpoint(Si es '/' no se ponde nada)
*/