const { Schema, model } = require('mongoose');

// Estos son los eventos del calendario
// Aqui configuramos para tener la coleccion en la base de datos y tengamos algun tipo de estuctura de datos
const EventoSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    // Estas dos son fecha de inicio y de finalizacion
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    // Esto es para el usario que creo el registro (Para nosotros saber quien grabo el registro)
    user: {
        // Esto le va a decir a mongose que va a ser una referencia
        type: Schema.Types.ObjectId,
        // Aqui especificamos la referencia
        ref: 'Usuario',
        required: true
    }
});

// Configuraciones adicionales de serializacion, en la respuesta cuando consumimos el JSON obtenemos el campo "_id" este
// lo queremos cambiar para que sea solo "id" y nos sale otro campo que no queremos que apareseca
// Podemos sobrescribir como funciones ese toJson (Aqui ponemos como una funcion normal porque requerimos la referencia al This)
EventoSchema.method('toJSON', function() {
    // Asi obtenemos toda la referencia al objeto que se esta serializando y de ahi extraemos cada una de las propiedades
    // Extraemos _v, _id y todo lo demas estara almacenado en Object
    const { _v, _id, ...object } = this.toObject();

    // Hacemos el remplazo para que no se llamen asi
    object.id = _id;

    return object;
    // Todo esto se llama internamente al llamar el metodo "toJSON" no estamos haciendo modificacion en la BD
});

module.exports = model('Evento', EventoSchema);