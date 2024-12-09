import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "./store/slices/pokemon/thunks";

export const PokemonApp = () => {

    // Queremos hacer el Dispatch de las acciones respectivas
    // Asi podemos con el "useDispatch" vamos a poder disparar cualquier accion no
    // importa de que Store nos interese, el dispatch es el mismo
    const dispatch = useDispatch();

    // Extramoes los datos que se van a ir modificando al llamar el Dispatch
    const { isLoading, page, pokemons } = useSelector( state => state.pokemons );

    // Como queremos hacer algo cuando el componente es creado la primera vez y
    // solo una vez entonces usamos el UseEffect
    useEffect(() => {
        // Como esta memoriza no hace falta declararle alguna dependencia
        // Lo que queremos disparar es el Thonk (Por ahora no le mandamos nada)
        dispatch( getPokemons() );
    },[]);
    // En este punto ya pusimos la aplicacion en modo de Carga pero ahora hay que hacer la peticion HTTP
    // para esto vamos a hacer otra libreria que no sea la de FetchAPI

    return (
        <>
            <h1>Pokemon</h1>
            <hr />

            <span>Loading: { isLoading ? 'True': 'False'} </span>

            <ul>
                {
                    pokemons.map( ({ name, url }) => {
                        return <li key={url} >{name}:</li>
                    })
                }
            </ul>
                
            <button
                disabled = { isLoading }
                onClick={ () => dispatch( getPokemons(page) ) }
            >
                Next
            </button>
        </>
    )
}
