// Configuracion de Express (Con esto tenemos montado un backend server)
// Para arrancar el backend con "npm run dev"

// Asi funciona en Node las importaciones
const express = require('express');
const { dbConnection } = require('./database/config');

// Para que use las variables de Entorno
require('dotenv').config();

// Ver todos los procesos que estan corriendo en Node
// console.log( process.env ); -> Aqui veremos las variables de entorno que definamos

// Crear el servidor de Express
const app = express();

// Configuracion de Rutas
// Le ponemos el tipo de peticion que queremos
// La funcion se dispara con los argumentos de Request y Response
/*app.get('/', (req, res) => {
    // Cuando se solicite esta ruta esto es lo que le queremos responder
    //console.log('Se requere /'); // Esto lo veremos al acceder a la ruta "loccalhost:4000" y en la consola veremos el mensaje

    // Mostramos una respuesta
    res.json({
        ok: true
    });

});*/

// Base de Datos
dbConnection();

// Directorio Publico
// El "use()" en express es conocido como Middleware (Funcion que se ejecuta cuando se hace una peticion al servidor)
// En este caso establecemos el directorio publico que es lo que se mostrara
app.use( express.static('public') );

// Rutas

// Lectura y Parceo del Body
// Una vez definida en nuestra carpeta Routes, le pasamos la ruta donde esta definido el endpoint
// Para mandar informacion en el Body para los endpoints de POST Vamos a prosesar la peticion del body
// Para esto pasamos todas las peticiones que vengan en formato JSON por un middleware
app.use( express.json() );

// Todo lo relacionado a la autenticacion va a estar en esta ruta
// En el 'requiere('Ruta de Archivo')' le decimos que todo lo que ese archivo vaya a exportar lo va a habilitar en la ruta especificada
app.use('/api/auth', require('./routes/auth'));

// Escuchar peticiones
// El primer argumento es el puerto en donde correra y el segundo argumento es la funcion que se ejecuta
// cuando el servidor este arrancando (Aqui usamos la variable de entorno y para ver los cambios tenemos que detener y volver a ejecutar la APP)
app.listen( process.env.PORT, () => {
    console.log(`Servidro corriendo en puerto ${process.env.PORT}`);
});
