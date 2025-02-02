// Vamos a usar Axios para hacer las peticiones Api
import axios from 'axios';

// Usamos la variable de entorno donde tenemos la direcciona al backend
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables();

// Esta funcion la creamos para usarla y no tener que estar agregando la URL en los diferentes endpoins
const calendarApi = axios.create({
    baseUrl: VITE_API_URL
});

// Con AXIOS tenemos los interceptores que nos va a permitir interceptar una peticion antes o despues de que se hagan
// y agregar o modificar informacion a la peticion

export default calendarApi;