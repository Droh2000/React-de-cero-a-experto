// Importamos Express
// const express = require('express');
// Configuramos un Router
// const router = express.Router;

// Otra forma de hacer lo mismo de arriba y nos ahorramos una linea de codigo
const { Router } = require('express');
// Pero en esta forma tenemos que ejecutar la funcion
const router = Router();

router.get('/', (req, res) => {
    res.json({
        ok: true
    });
});

// Esta es la forma de Exportar en Node
module.exports = router;
// Para llamar el endpoint tenemos que especificar la ruta que definiamos en "index.js"
/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/