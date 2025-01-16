// Aqui tenemos toda la configuracion para conectarnos a la base de datos
const mongoose = require('mongoose');

const dbConnection = async () => {
    try{
        // Esta cadena de coneccion la sacamos de la pagina de mongoose
        await mongoose.connect( process.env.DB_CNN );

        console.log('DB Online');

    }catch(error){
        console.log(error);
        throw new Error('Error al inicializar la BD');
    }
}

module.exports = {
    dbConnection
}