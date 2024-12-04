import { heroes } from "../data/heroes"

export const getHeroById = ( id ) => {
    /*
        Aqui no queremos lanzar un error en caso que el ID del Heroe no exista
        por ejemplo puede que la persona haya guardado la pagina en su favoritos y con el 
        tiempo el ID cambio y dejo de existir el que tenia la persona 
        Entonces si no existe quremos redirigir a la persona fuera de esta pagina

        Usando de la DATA donde estan los heroes los buscamos, si el FIND no encuentra nada nos regresara u undefined
    */
   return heroes.find( hero => hero.id === id );
}