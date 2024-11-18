import PropTypes from 'prop-types';

// Importacion del Hooks
// Al ver "use" significa que es un Hook (esto es una regla a seguir en el nombre), ademas en si solo son funcion
import { useState } from 'react';

export const CounterApp = ({value}) => {
    
    // Funcion para el evento que al no depender de nada interno del componente se puede ponde afuera
    // Pero cuando el componente se vuelva a renderizar no vuelve a asignar un espacio en memoria 
    // para esta funcion entonces si queremos camviar el "value" podemos modificarlo en el nombre del boton

    // Cuando hacemos un cambio en el componente le tenemos que avisar a REACT que ocurrio un cambio y redibuje el componente

    //  HOOKS
    // Cuando se declara asi entre parentesis se le requiere mandar un valor inicial
    // Queremos que el valor inicial es 0 (Este es el valor inicial del estado)
    // Al inicio desestructuramos del retorno de la funcion (El valor que le daremos es Counter)
    // Para lograle cambiarle el valor lo hacemos con el segundo argumento (le llamamos setCounter)
    const [ counter, setCounter ] = useState( value );// Ahora el valor inicial se lo pasamos desde el Padre

    // Al asignarle Value que viene del Padre entones cuando se crea el Padre como estado inicial siempre tendra ese valor

    const aumentarContador = (event) => {
        //console.log(event);
        // El segundo argumento es una funcion y con esta logramos cambiando el valor (ya que directamente esta no se puede porque es una constante)
        // con esto le aviamos a REACT que el estado del componente cambio y por lo tanto tiene que mandar a renderizar el componente
        // Solo este pequeño pedazo es lo que se esta cambiando, No toda la pagina
        setCounter( counter + 1);
        // Si tenemos mas Hooks solo se van a actualizar una vez cuando toda eta funcion termina de ejecutarse
        // React ejecuta cada hook, cambia el estado y luego vuelve a renderizar con los nuevos cambios

        // Otra Forma para cambiar el valor del Counter
        // No queremos usar la referencia al 'counter' donde si queremos este valor creamos la funcion flecha
        // dentro de la funcion setCounter() esto quiere decir que el valor de retorno de la funcion flecha va a ser el nuevo valor que 
        // tendra el contador, Este callback sera el nuevo valor del Counter (El parametro 'c' tendra el valor actual del counter)
        // setCounter( (c) => c+1);
    }

    const restarContador = () => {
        setCounter(counter - 1);
    }

    const resetearContador = () => {
        setCounter(value);
    }

    // Cuando se activa el evente React salta a la funcion, activa el cambio de estado, al llenar al final de la funcion
    // se disparar de nuevo la renderizacion del componente (Aqui vuelve a llamar todo este codigo de "CounterApp")
    // Al cambiar de estado el componente se vuelve a ejecutar TODO
    // Si dentro de Aqui tenemos una llamada a un API, FETCH (Una Tarea Asincrona)
    // entonces se dispararia esta llamada en cada cambio de estado del componente pero hay hooks especializados para controlar  esta accion 
    
    // El valor del Counter es el mismo y cuando lo cambiamos se vuelve a ejecutar todo y aqui dentro del componente siempre tendremos el
    // el valor actualizado, esto es util porque solo usamos esta variable, nos despreocupamos cual sea el valor del mismo y su valor inicial
    // porque eventualmente va a cambiar

    return (
        <>
            <h1>CounterApp</h1>
            {/* Le pasamos el valor desestructurado del Hook*/}
            <h2> { counter } </h2>
            {/*
                En React tenemos muchos eventos en caso de tener alguno que requerimos debemos
                usarlo ditrectamente desde JS puro

                Evento: Click
                    Esta el parametro  "onClick" al que se le pasa una funcion y tenemos un parametro opcional
                    que con este podemos acceder a todas las propiedades del mouse cuando hizo click

                    PAra que sea mas facil de leer declaramos la funcion afuera
                    y originalmente se pasaria:

                        {(event) => nombrefuncion(event)}

                    Lo de arriba se puede simplificar como:
                        
                        {nombrefuncion} -> Si la funcion recibe mas parametros esto ya no se puede hacer
                    
                    Asi los argumentos van a pasar en la misma forma como vengan del Event a la funcion definida
            */}
            <button onClick={aumentarContador} type="button">+1</button>

            <button onClick={restarContador} type="button">-1</button>

            <button onClick={resetearContador} type="button">Reset</button>
        </>
    )
}

CounterApp.propTypes = {
    value: PropTypes.number.isRequired
}