/*
      Metodo de React -> Memo

    Primero creamos el componente nosotros antes de usar el que ya viene en React
    Aqui vamos a usar la logica del contador que ya habiamos implementado

    Entonces cada vez que surge un cambio en el Stage este componente se esta redibujando

*/

import { useState } from "react";
import { UseCounter } from "../hook"
import { Contador } from "./Contador";

export const Memorizer = () => {

    const { counter, increment } = UseCounter( 10 );

    // Esto se creo para ver el comportamiento cuando ocurre con cambio en el padre (Memorizer) y como afecta al hijo (Contador)
    const { show, setShow } = useState(true);

    return (
        <>
            {/*
                La parte que muestra el contador donde le pasamos la variable 'counter'
                lo mostramos en un componente aparte
            
                <h1>Counter: <small>{ counter }</small></h1>

                Ahora es usando este componente
                Esto se hizo asi porque que pasa si surge un cambio en el componente Padre "Memorize" 
                donde no ocurre nada con el componente "Contador" por tanto no deberia de redibujarse

            */}
            <h1>Counter: <Contador counter={counter}/> </h1>

            <hr />

            <button
                className="btn btn-primary"
                onClick={ () => increment() }
            >
                +1
            </button>

            {/* Los valores booleanos para mostrarse en el HTML tiene que ser con un Stringyfy 
                En el OnClick le pasamos el valor del Show alternado para que cambie

                Con esto verificamo que cada vez que le demos click al boton el componente Hijo "Contador"
                se vuelve a redibujar a pesar de que no se esta recibiendo un cambio directamente

                Nosotros podemos memorizar estos componentes (Solo se recomienda cuando los componentes son muy grandes)
                o que ocurre un proceso pesado y solo lo queremos hacer cuando los props cambien (Solo cuando ocurra una despreciacion
                considerable es cuando se recomienda hacer esta implementacion porque se puede simplemente ignorar este hecho)
            */}
            <button
                className="btn btn-outline-primary"
                onClick={ () => setShow( !show ) }
            >
                Show/Hide { JSON.stringify(show) }
            </button>
        </>
    )
}
