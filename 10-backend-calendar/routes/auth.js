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


// Crear un usuario 
// Nos creamos un espacio reservado en la API ''/new 
router.post('/new', crearUsuario);

router.post('/', loginUsuario);

// Este es para renovar el token
router.get('/renew', revalidarToken);

// Esta es la forma de Exportar en Node
module.exports = router;
// Para llamar el endpoint tenemos que especificar la ruta que definiamos en "index.js"
/*
    Rutas de Usuarios / Auth
    host + /api/auth + Ruta del Endpoint(Si es '/' no se ponde nada)
*/