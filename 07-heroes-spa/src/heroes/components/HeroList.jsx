
// Aqui nos vamos a ayudar de la funcion dentro de la carpeta de "Helpers"
// Le tenemos que mandar los "publishers" (Que es el tema de Marvel o DC) por eso recibimos este parametro
// para mandarselo a la funcion

import { useMemo } from "react";
import { getHeroesByPublisher } from "../helpers"
import { HeroCard } from "./HeroCard";

export const HeroList = ({ publisher }) => {
    /*
        Aqui no estamos usando el UseState o un useReducer 
        porque la DATA esta en un archivo fisico que no va a cambiar 
        en caso que qusieramos registrar nuevos heroes, asi tendria el caso usar 
        para cambiar el estado, pero en este caso la DATa no va a cambiar desde que
        son generados 

        Si esta funcion fuera a cambiar podriamos aplicar una optimizacion podriamos memorizar
        el resultado de la funcion, pero igual aunque esta funcion nunca cambia, en el caso que sean
        demaciados registros tambien podemos memorizarla para que no la preprocesemos cada vez
        que haya un cambio en este componente (Tambien si un componente padre cambiara esto se volveria a ejecutar)
    */
    const heroes = useMemo( () => {
        getHeroesByPublisher( publisher );
    }, [publisher]);  

    // Mostramos la informacion obtenida de los Heroes 
    return (
        <div className="row rows-cols-1 row-cols-md-3 g-3">
            <h1>{publisher}</h1>
            <ul>
                {heroes.map( (hero) => 
                    /*
                        Como el componente espera que le pasemos cada una de las propiedades que tiene el archivo
                        seria aplicando la desestructuracion con el operador spread (LE estamos pasando todas las propiedades del obbjeto)
                    */
                    <HeroCard 
                        key={hero.id}
                        {...hero}
                    />
                )}
            </ul>
        </div>
    )   
}
