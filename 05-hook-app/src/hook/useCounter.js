// El Hook es solo una funcion que retorna algo

import { useState } from "react"

// Recibimos el Valor Inicial que si no lo recibimos por defecto sera 10
export const UseCounter = ( initialValue=10 ) => {

    // Es comun que los CustomHook terminen aterrizando en algun Hook propio de React
    const [counter, setCounter] = useState( initialValue );

    /*
        Debemos Exponer la funcionalidad para que desde otra parte se pueda manipular el valor
        Para esto tenemos que exponer alguna funcion (Hay varias formas de hacer esto)

        Este es para incrementar (Esta funcion la exponemos pasando al objeto que retornamos)
    */
   // Si queremos incrementarlo en otro valor que no sea 1 en 1
   // Si dejamos esta logica y probamos la APP obtendremos "10[object Object]" (Paso de un numero a un string)
   // Esta sale igual cuando tenemos un objeto: "const obj = {}" y  le aplicamos el "obj.toString()" es cuando  obtenemos el "[object Object]"
   // eso quiere decir que es la representacion ToString de un Objeto
   // 
   // Entonces lo que pasa aqui es que con el onClick se esta mandando el evento del click como primer argumento a la funcion de Incrementar
   // eso quiere decir que en el para parametro "value" estamos recibiendo el EVENTO completamente
   //       onClick={ (event) => increment(event) }
   // El evento click no nos interesa mandarlo en este caso asi que le especificamos mandandole el valor por el cual queremos incrementarlo
    const increment = ( value = 1 ) => {// el valor que nos manden es la cantidad con la cual vamos a incrementar
        setCounter( counter + value );
    }

    const decrement = ( value = 1 ) => {
        // Gracias a esto la logica de negocio la tenemos aqui y no en la parte del componente CounterWithCustomHook
        // Asi si requerimos otro contador solo usamos el "useCounter"
        if( counter === 0 ) return;
        setCounter( counter - value );
    }

    const reset = () => {// Aqui no afecta nada porque no estamos recibiendo nigun argumento para manipularlo aqui
        setCounter( initialValue );
    }


    // Retornamos el objeto con el Counter (Para asi poder desestructuramos mejor con solo lo que requerimos)
    return {
        counter,
        increment,
        decrement,
        reset
    }
}