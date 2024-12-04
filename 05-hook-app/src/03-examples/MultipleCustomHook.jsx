import { UseCounter, useFetch } from "../hook";
import { LoadingMessage } from "./LoadingMessage";
import { PokemonCard } from "./PokemonCard";

/*
    Los componentes de REACT se la pasado redenderizando constamente
        Con un cambio de State
        Un componente padre hizo que la props cambien del componente
        Puede que el componente no este memorizado y eso dispara cuando el padre se vuelve a renderizar
*/
export const MultipleCustomHook = () => {

    /*
        Para cambiar al siguiente pokemon o al anterior (Con los botones que creamos abajo)

        Usamos el Hook UseCounter del cual desestructuramos las funciones
        (Es importante que debemos de proporcionarle un valor inicial al Hook porque sino sera el pokemon que esta actual como entrada)
        Le asignamos el valor de 1 para indicar que empieze en la lista 1 de la API
    */  
   const { counter, decrement, increment } = UseCounter(1);

    // Hacemos la peticion a este API (Cada vez que este componente se vuelva a redibujar se va volver a hacer la llamada a la API)
    // No solo con el redbujo sino que al minimo cambio se estarian haciendo muchas peticiones HTTP
    //          fetch("https://pokerapi.co/api/v2/pokemon/1");
    // Entonces para evitar eso en lugar de hacer la peticion directamente aqui nos vamos a crear un CustomHook que nos ayude a esto

    // Obtenemos la informacion desestructurada del componente
    // Como esta esperando que le mandemos el URL se lo mandamos al UseFetch
    // ------------------------------------------------------------------------------------------------------------------------------------------------
    // 
    // Vamos a colocar el Counter del Endpoint
    // Como el Hook del Counter es Sincrono el valor del counter nos indicara que pokemon se mostrara
    // Cada vez que el valor del counter cambia, tambien se actualizara el CustomHook del pokemon (Porque la URL cambio y vuelve hacer la peticion HTTP)
    // Solo que Tendremos el problema que al decrementar llegaremos al 0 y no exsite ese valor en el API
    // (Podriamos modificar el counter para indicar cual debe ser el valor minimo pero hay otras soluciones)
    //  Para Resolver eso agregamos la logica en la funcion Flecha del evento Onclick
    //
    //
    const {data, isLoading, hasError} = useFetch(`https://pokeapi.co/api/v2/pokemon/${ counter }`);

    // Consumimos los datos 
    return (
        <>
            <h1>Informacion de Pokemon</h1>
            <hr />

            {/* Para mostrar Un Objeto usamos la funcion JSON 
            <pre>{ JSON.stringify( data, null, 2 ) }</pre> */}

            {/* Queremos obtener los datos especificos del la data obtenida 
                Pero esta Data no siempre vendra con informacion ya que puede venir NULL y eso nos disparara un ERROR
                entonces le ponemos el signo de interrogacion para que si tiene datos muestre el dato "name"
            */}
            {/*<h2>{ data?.name }</h2>*/}

            {/* Nos creamos componentes para Mostrar el mensaje de Carga y el Dato del Pockemon */}
            {/* Implementacion de la Carga y mostrar los datos
                Aqui puede pasar que el "isLoading" este en False y diera un Error, no nesesariamente que tengamos dato quiere decir que 
                todo salio Bien
                Al PokemonCard le mandamos solo las propiedades que nos interesa no todo el Data (Asi podemos desestrcutruarlos dentro del PokemonCard y usarlos)
                Para mandar los Sprites los mandamos como un arreglo pero en el API los Sprites bienen como un objeto donde dentro cotiene la URL
                Asi que elegimos los URL que nos interesa
            */}
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

            {/*
                    Conectarnos al Custom Hook
                Tenemos el useCounter donde teniamos el valor del counter y lo increntavamos y decrementabamos
                Asi que vamos a conectar ese CustomHook ("useCounter.js") con el "useFetch"

                Cuando toquemos un Boton queremos cambiar al Siguiente Elemento del API (Seria el siguiente o el anterior pokemon)
                (Incrementamos y decrementamos con la Funcion correspondiente del Hook Counter)
                Estas funciones no se les pasa directamente especificando solo el nombre:
                        decrement
                Porque el evento click por defecto va a emitir un evento como argumento y no queremos mandar eso, asi que se especifica asi
                        () => decrement()   
                Dentro pusimos la logica para limitar el numero al decrementar para que no llegue a un nuemo que no existe en la API
                     La funcion evalua si el counter es mayor a 1 y si lo es llama a la funcion sino no hace nada 
            */}
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

