// Configuracion de Express (Con esto tenemos montado un backend server)
// Para arrancar el backend con "npm run dev"

// Asi funciona en Node las importaciones
const express = require('express');

// Crear el servidor de Express
const app = express();

// Configuracion de Rutas
// Le ponemos el tipo de peticion que queremos
// La funcion se dispara con los argumentos de Request y Response
app.get('/', (req, res) => {
    // Cuando se solicite esta ruta esto es lo que le queremos responder
    console.log('Se requere /'); // Esto lo veremos al acceder a la ruta "loccalhost:4000" y en la consola veremos el mensaje

    // Mostramos una respuesta
    res.json({
        ok: true
    });
});

// Escuchar peticiones
// El primer argumento es el puerto en donde correra y el segundo argumento es la funcion que se ejecuta
// cuando el servidor este arrancando
app.listen( 4000, () => {
    console.log(`Servidro corriendo en puerto ${4000}`);
});
