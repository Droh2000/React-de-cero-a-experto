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
// Entonces con los interceptores vamos a interceptar las peticiones ya sea las que van al backend o las que regresan
// en este caso lo ocupamos al hacer un request y agreagar la informacion especifica que ocupamos en el Header en la propiedad de "x-token"

// Crear el interceptor
// Antes de que se haga la solicitud (Request) queremos que use este interceptor
// internamente el use() se dispara con la configuracion de esa peticion y tenemos que retornar esa configuracion de nuevvo
calendarApi.interceptors.request.use(config => {
    // Aqui podemos agreagar el Header personalizado
    // Con esto cualquier peticion que se haga en el calendarApi adicionalmente se le coloque al header
    config.headers = {
        // En caso de usarHeaders Personalizados o se hayan agregado otros headers en la configuracion que nosotros queremos mantener
        // asi que esparcemos todos los headers que venagn y queramos mantenerlos
        ...config.headers,
        'x-token': localStorage.getItem('token')
    };

    return config;
});

export default calendarApi;