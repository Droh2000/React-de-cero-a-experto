// Creamos el usuario que podra hacer las peticiones a la BD
const { Schema, model } = require('mongoose');

// Definimos el Schema que es la informacion que vamos a guardar en la BD
// Esto es un objeto y dentro le definimos los campos con el tipo de datos que se va a almacenar
const UsuarioSchema = Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true // Para que no haya duplicados
    },
    password: {
        type: String,
        require: true
    }
});

// Exportamos para que cuando queramos trabajar con usuarios solo usemos este esquema de arriba
module.exports = model('Usuario', UsuarioSchema);
