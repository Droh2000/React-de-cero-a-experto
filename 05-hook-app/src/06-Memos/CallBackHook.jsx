import { useCallback, useEffect, useState } from "react"
import { ShowIncrement } from "./ShowIncrement";

/*
        Este es parate de los Hooks que memorizan

    Nos creamos otro componente que es el encargado de llamar al setCounter
*/
export const CallBackHook = () => {

    const [counter, setCounter ] = useState(10);

    // No le mandamos el setCounter a "ShowIncrement" porque estos valores ya estan memorizados hasta cierto punto
    // Asi que creamos una funcion mejor (ESTO LO REMPLAZAMOS POR EL useCallBack)
    /*const increment = () => {
        setCounter( counter + 1 );
    }*/

    // Para evitar que se vuelve a llamar la funcion de arriba y la memorize
    // El Hook de useCallBack nos sirve para memorizar funciones y lo que regresa es una funcion que pados ejecutar
    // y esa funcion memorizada solo se va a volver a procesar cuando algo cambie
    /*
        Ahora si queremos mandar algun argumento (Tambien tenemos que meorizar esto)
        Por ejemlo queremos incrementar de tal numero en tal numero y no solo de uno en uno

        Esta funcion que esta dentro del "useCallBack" es literalemnte la funcion que se llama en el componente "ShowIncrement"
        en el Boton en su funcion OnClick()
        Entonces si desde ese componente "ShowIncrement" en la funcion que esta dentro del evento del boton le estamos mandando un argumento
        entonces desde aqui (La funcion flecha dentro del useCallback) se recibe el valor
        Este seria el "Value" que le especificamos en la funcion flecha
        (En este caso es solo un argumento si fueran mas, ahi mismo se definen separador por coma)
    */
    const increment = useCallback(
        (value) => {
            // Este es el Callback que vamos a quere ejecutar cuando se mande a llamar
            /*
                Despues de esta implementacion al inicio 
                Cuando le demos click al boton de incrementar y solo se va a incrementar una vez
                porque realemente la funcion solo se va a dibujar una unica vez pero la variable del "counter"
                siempre se va a mantener con el mismo valor del inicio
                Si ponemos un Console.Log dentro de la funcion Flecha del useCallBack veremos que al darle click 
                al boton de incrementar la funcion "setCounter" si se esta volviendo a ejecutar 

                Entonses el Counter siempre se va a memorizar con la suma de 1 por consecuencia siempre 
                sera ese mismo valor

                Una solucion que podriamos pensar es si ponemos el "counter" como una dependencia dentro del arreglo PERO
                al hacer eso se vuelve a generar toda la funcion porque se vuelve a renderizar el Hook y cada vez que incrementamos
                se crea una funcion en otro espacio de memeoria

                La solucion es que aparte de llamar asi:
            */
            //setCounter( counter + 1 );
            /*
                Al setCounter le podemos pasar una funcion en el cual tenemos el valor (En el parametro) el valor actual del counter
                el cual dentro de la funcion lo podemos modificar

                Esto funciona porque la funcion setCounter sabe que va a tomar el valor actual del State y le va a sumar uno
                y no se va a volver a crear la funcion "ShowIncrement" en memoria porque ya esta memorizada
                (Mantenemos el mismo espacio en memoria donde esta la funcion)
            */
           setCounter( (c) => c + value );
        },
        [] // Dependencias (Se especifica para cuando queramos que se vuelva a generar pero con un arreglo vacio solo se generar una vez)
        // Aqui ya tenemos una funcion memrizada que para REACT mientras no cambie porque siempre va a apuntar al mismo valor en memoria y lo va a dejar igual
    )

    // Otro uso es que podria ser que solo cuando esta funcion "increment" cambie se dispare algun efecto
    useEffect(() => {
        // Si mandamos a llamar la funcion y no estubieramos usando el Memo
        // Para este caso esta funcion siempre seria diferente y cada vez que cambie el estado cambiaria el useEffect
        // Y con esto estariamos Creando un ciclo infinito porque el mismo useEffect dispara el Redibujo lo que 
        // ocaciona que la funcion este en otro espacio en memoria
        // En pocas palabras aqui le estamos diciendo que solo cambie cuando cambie el componente padre o la funcion
        //      increment();
    }, [increment]);

    return (
        <>
            <h1>UseCallback Hook: { counter }</h1>
            <hr />
            {/*
                Componente aparte que nos incrementa el valor al que le mandamos la funcion que queremos ejecutar

            */}
            <ShowIncrement increment={ increment } />

        </>
    )
}

