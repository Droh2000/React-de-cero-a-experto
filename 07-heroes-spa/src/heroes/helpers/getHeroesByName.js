import { heroes } from "../data/heroes";

export const getHeroesByName = (name = '') => {
    // Limpiamos el parametro del URL
    name = name.toLocaleLowerCase().trim();

    //Si la persona no busco nada regresamos un arreglo vacio
    if( name.length === 0 ) return [];

    // Filtramos el Arreglo de Heores que es nuestra data basado en el nombre
    return heroes.filter(
        // Regresamos los que el nombre (Si no encuentra niguna regresara un Arreglo vacio)
        hero => hero.superhero.toLocaleLowerCase().includes( name )
    );

}