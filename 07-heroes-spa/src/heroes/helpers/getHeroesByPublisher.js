import { heroes } from '../data/heroes'

// Esta es una funcion que nos filtra los heroes segun la empresa que les corresponde (DC o Marvel)
// y si no es de Marvel o DC nos dara un error

// El publisher que recibimos seria la tematica de Marvel o DC
export const getHeroesByPublisher = ( publisher ) => {
    // Limitamos para que solo pueda aceptar los publisher permitidos
    const validPublishers = ['DC Comics', 'Marvel Comics'];
    // PReguntamos si los temas validos incluyen el tema que recibimos como argumento 
    if( !validPublishers.includes( publisher ) ){
        throw new Error(`${ publisher } is not a valid publisher`);
    }

    // Como si existe regresamos los Heroes filtrados por el tema que les corresponde (Marvel o DC)
    return heroes.filter( heroe => heroe.publisher === publisher );
}