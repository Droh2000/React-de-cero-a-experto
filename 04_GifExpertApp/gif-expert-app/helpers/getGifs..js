// Para una mejor practica esta funcion se movio a otro archivo fuera del GifGrid
// dentro de la carpeta Helpers (Asi nuestro componente GifGrids es mas facil de mantener, mas limpio)
export const getGifts = async (category) => {
    // Esta es la URL del API y ya viene con el Token incluido (Le pusmimos limite de 20 para solo obtener esa catidad de imagenes)
    const url = `https://api.giphy.com/v1/gifs/search?api_key=xA8ZkaqSPug7maCTmVu0yIRLp0pPKC9v&q=${ category }&limit=20`;
    const resp = await fetch( url );

    // Viendo la peticion 
    // console.log(resp);
    // Tenemos 2 respuestas por cada elemento de la categoria

    // RECT cada vez que detecta un cambio, el compontne lo vuelve a ejectuar para redibujarlo
    // pero hay ciertas funciones especiales que pueden manter el estado o que ignoren si hay cambios
    // para que no se vuelvan a ejecutar.
    // Si usamos el Hook del useState 
    // ¿Porque se vuelve a dispara la peticion HTTP?
    // ¿Porque se dispara 2 veses la peticion HTTP?

    // El modo Estricto nos ayuda a identificar componentes que tienen problemas con el LifeCycle
    // nos da Warnings si estamos usando codigo Viejo y entre otras cosas que solo se aplica en desarrollo
    // Si comentamos las lineas del modo estricto veremos que la peticion HTTPs solo se dispara UNA VEZ
    // Entonces eso de dispararlo dos veses lo hace REACT para asegurarse que el componente funcione correctamente (Esto no afecta en produccion)
    // Para que al ocurrir un cambio no se regrese a la peticion HTTP
    // Una solucion es la implementacion del Hook en el componente GifGrid

    // Lo que nos interesa es tomar "data" de todo el aarray y dentro solo vamos a extrar la informacion que nos interesa
    const { data } = await resp.json();
    // Aqui estamos retorando un objeto con las propiedades que nos interesa
    const gifs = data.map( img => ({
        id: img.id,
        title: img.title,
        url: img.images.downsized_medium.url
    }));

    return gifs;
}