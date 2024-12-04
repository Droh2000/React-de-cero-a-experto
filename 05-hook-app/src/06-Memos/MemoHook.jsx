/*
    Hook UseMemo


*/

import { useMemo, useState } from "react";
import { UseCounter } from "../hook"

// Nos creamos este proceso
const heavyStuff = ( iterationNumber = 100 ) => {
    for (let i = 0; i < iterationNumber; i++) {
        console.log('Ahi Vamos...');
    }

    return `${ iterationNumber } iteraciones realizadas`;
}

export const MemoHook = () => {

    const { counter, increment } = UseCounter( 5000 );
    const [ show, setShow ] = useState(true);

    // Uso del UseMemo para que el proceso del heavyStuff no se dispara cada vez que exista un cambio
    // de estado en nuestro componente de MemoHook
    // Este Hook memoriza un valor (Memoriza lo que sea que retorne)
    // el valor memorizado se va a mantener igual a menos de que las dependencias del useMemo Cambien
    // El primer argumento es una funcion que debe de regresar algo (Si no regresamos nada el valor memorizado sera undefined)
    // Lo que vamos a hacer es mandar a llamar la funcion HeavyStuff y lo que nos regrese esta funcion seria lo que se memorize
    // (Esta funcion requiere el argumento para saber el numero de iteraciones)
    // Asi lo va a memorizar cada vez que el Counter cambia
    const memorizedValue = useMemo( () => heavyStuff(counter) );

    return (
        <>
            <h1>Counter: <small>{ counter }</small> </h1>

            <hr />

            {/* 
                Proceso que nos cuesta Recursos 
                Si se vuelve a redibujar el componente padre o el hijo
                se vuelve a disparar el proceso aumento el gasto de procesos en nuestro equipo
                (Por eso aumentos el numero del contador)
                    Donde cada vez que incrementemos entonces se tiene que ejecutar el proceso por la cantidad + 1
                
                En este caso este proceso solo se debe de ejecutar si el valor del contador cambia 
                No se deberia de ejecutar si cambia el componente Padre
                
                Aqui biene el uso del UseMemo donde podemos memorizar el resultado para que cuando React vuelva a redibujar 
                el componente no vuelva a ejecutar este proceso de la funcion
            
                <h4>{ heavyStuff( counter ) }</h4>

                Despues de implementar el useMemo en lugar de pasar aqui la funcion directamente le pasamos el valor memorizado
                (Asi nos podemos ahorrar tareas pesadas que nos podemos memorizar para no volvrlas a ejecutar)
            */}
            <h4>{ memorizedValue }</h4>

            <button
                className="btn btn-primary"
                onClick={ () => increment() }
            >
                +1
            </button>

            <button
                className="btn btn-outline-primary"
                onClick={ () => setShow(!show) }
            >
                Show/Hide: { JSON.stringify(show) }
            </button>
        </>
    )
}
