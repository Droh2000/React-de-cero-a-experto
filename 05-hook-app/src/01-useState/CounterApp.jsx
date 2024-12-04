import { useEffect } from "react";
import { useState } from "react"

export const CounterApp = () => {

    // Para el cambio del valor del contador tenemos el Hook del UseState y el valor inicial es de 10
    /*
        En el UseState no siempre vamos a tener un valor primitivo, arreglo u objeto, sino lo que requiramos como por ejemplo
        una instancia de una clase.
        Si le cambiamos el valor de 10 que tenia y le ponemos ahora un objeto entonces tenemos la posibilidad de manejar
        cualquier cantidad de cosas que requiramos
    */
    //const [counter, setCounter] = useState(10);

    // Aqui se desestructuro el valor del "counter"
    //const [{counter1,counter2,counter3}, setCounter] = useState({
    
    // Para usar el operador SPREAD en la llamada del SetCounter en el evento Onclick se quito la desestructuracion
    const [state, setCounter] = useState({
        counter1: 10,
        counter2: 20,
        counter3: 30,
    });

    // desestructuramos aparte para la implementacion del HTML
    const {counter1,counter2,counter3} = state;

    return (
      <>
          {/*
                El SetCounter nos cambia el estado por defecto con la logica implementada del evento click:
                    () => setCounter(counter1+1)
                Al hacer click en el boton nos borra los nuemeros del contador, esto es porque el State paso de ser
                un objeto con los contadores a un solo valor que es el nuevo incremento (Antes era un objeto y ahora es un valor numerico)
                porque el nuevo valor que se le pasa al UseState sera para todo el Hook

                Por eso una solucion es establecerle el objeto dentro del  SetCounter incrementando solo el que nos interesa y especificando los otros para
                que no se nos pierdan los valores

                Cuando tengamos un objeto en el UseState esta es la forma de mantener los valores anteriores, al llamar esta funcion en el OnClick le estamos diciendo
                que ese objeto que le especificamos ahora sera el nuevo valor del State
          */}
          <h1>Counter1: { counter1 }</h1>
          <h1>Counter2: { counter2 }</h1>
          <h1>Counter3: { counter3 }</h1>

          <br />  
          {/*
                Para no especificar todas las propiedades y solo cambiar lo que nos interese (Para el caso que tengamos muchas propiedades y no tengamos que especificar todas)
                en ese caso se usa el operador SPREAD usando la variable que se crea con el setCounter

                    Pasamos de esto:
                        setCounter({
                            counter1:counter1+1,
                            counter2,
                            counter3
                        })
                    A esto:
          */}
          <button className="btn" onClick={ () => setCounter({
                    ...state,
                    counter1:counter1+1
                })
            }>+1</button>
      </>
    )
}
