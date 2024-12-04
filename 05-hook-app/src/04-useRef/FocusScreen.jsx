// El Hook de UseRef nos sirve para cuando queremos mantener alguna referencia
// y cuando esa referencia cambie no se dispare una renderizacion del componente,
// Dentro le podemos establecer cualquier tipo que requiramos mantener en el componente
// La idea es que tengamos una referencia que sea controlable

import { useRef } from "react"

export const FocusScreen = () => {

    const onClick = () => {
        // Obtenemos la referencia al input para ponerle el foco
        // Lo mismo que hariamos en JS tradicional (Con .focus() solo se selecciona el campo pero con .seelct() nos selecciona todo el texto que contenga)
        //document.querySelector('input').select();

        // Usando el HOOK
        // Con este podemos mantener la referencia a un elemento HTML y asi si garantizamos que esa
        // referencia va a estar apuntando al elemento HTML que queremos
        const InputRef = useRef();// Lo queremos para mantener la referencia al input

        // Ahora donde establecemos el InputRef obtendremos el elementos HTML que es lo que queremos mantener
        // Ademas aunque tuvieramos la implementacion del componente "FocusScreen" en muchos lados 
        // siempre el InputRef va a apuntar al elemento donde lo establecimos, no importa si hay otros componentes con la referencia
        // React no se va a confundir
        // Con .current hacemos referencia al valor que tenga almacenado donde esteblecimos la referencia
        InputRef.current.select();

        /*
            El uso de este Hook lo podriamos omitir consiguiendo el mismo efecto si creamos lo siguiente:
                let inputRef = ''; -> Esto se crea fuera de la funcion Onclick
                console.log( inputRef ) -> Esto lo ponemos dentro de esta funcion

                En el HTML (Que es donde queremos mantener la referencia) le especificamos:
                No le podemos pasar directamente el "inputRef" porque los componentes no se les puede pasar asi un String y nos dara errro
                ref={ (element) => inputRef = element }
                
                Con esto logramos el mismo Efecto
        */
    }

    return (
      <>
            <h1>Focus Screen</h1>
            <hr />
             {/*
                  La variable "InputRef" va a mandar el elemento HTML
                  y se lo va a establecer al input que le estamos pasando el parametro "ref"

             */}
            <input 
                ref = { InputRef }  
                type="text"
                placeholder="Ingrese su nombre"
                className="form-control"
            />

            {/*
                Ahora queremos esteblecerle el foco al input de arriba cuando precinamos el boton
                y nos ponga el cursor en el Input

                Sin usar el useRef
                Le pasamos en el evento click la funcion donde creamos la logica usando JS normal
                Pero si ya tenemos muchos Inputs y queremos establecer el foco en cualquiera de ellos
                ya que con el QuerySelector estamos buscando un "input" y no estamos seleccionando uno en particular
                ademas si establecemos con el ID o la clase de todas formas no tenemos garantizado seleccionar el que nos importa
                Porque recordemos que esto es un componente y el componente lo podemos usar en muchas partes entonces el ID y la
                clase se van a estar repitiendo en otros elementos 
            */}
            <button className="btn btn-primary mtt-2" >Set Focus</button>
      </>
    )
}
