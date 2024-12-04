/*
    UseLayoutEffect

    Ya cuando se renderize el componente y se muestren los textos que pueden ser producto de los estados
    ya  despues de que todas las mutuaciones han sucedido se dispara el UseLayerEffect
    el cual nos puede servir para obtener las medidas del tamano de un contenedor
    Se recomienda mejor usar el UseEffect para evitar el bloqueo de actualizaciones visuales
    
    Aqui estamos usando el mismo codigo de 03-examples
*/

import { UseCounter, useFetch } from "../hook";
import { LoadingMessage } from "../03-examples/LoadingMessage";
import { PokemonCard } from "../03-examples/PokemonCard";

export const Layout = () => {

    const { counter, decrement, increment } = UseCounter(1);
    const {data, isLoading, hasError} = useFetch(`https://pokeapi.co/api/v2/pokemon/${ counter }`);

    return (
        <>
            <h1>Informacion de Pokemon</h1>
            <hr />

            { 
                isLoading 
                ? <LoadingMessage/> 
                : <PokemonCard 
                    id = { counter }
                    name = { data.name }
                    sprites = { [
                        data.sprites.front_default,
                        data.sprites.front_shiny,
                        data.sprites.back_default,
                        data.sprites.back_shiny
                    ]}
                  /> 
            }

            <button 
            className="btn btn-primary mt-2"
            onClick={ () => counter > 1 && decrement() }>
                Anterior
            </button>

            <button 
            className="btn btn-primary mt-2"
            onClick={ () => increment() }>
                Siguiente
            </button>
        </>
    )
}

