import { useState } from "react";

// Cada componente puede tener su propio estado, Hooks (UeStates)
// En este caso queremos manejar el estado del Input (Conforme la persona escriba queremos obtener sus valores)
export const AddCategory = () => {
    // El estado inicial del Input es un String vacio
    const [InputValue, setInputValue] = useState('');

    // Funcion para pasarla dentro del OnChange, al pasarla ahi por defecto esta funcion recibe el parametro Event
    const onInputChange = (event) => {// Se puede desestructurar esto como: { target }
        // Con el event podemos acceder al nuevo valor que el usuario este tecleando
        // asi es como recibimos el cambio y eso se lo pasamos a la funcion que nos actualiza el estado del componente
        setInputValue( event.target.value );
    }

    const onSubmit = (event) => {
        // Con el evento que recibimos es como podemos acceder para prevenir que el formulario nos actualize la pagina
        event.preventDefault();
    }

    return (
        <>
            {/*Aqui configuramos el INPUT para que el valor por defecto sea el del estado    

                Esto que estamos definiendo en el Input aqui son concidos como Properties
                Por defecto renderizamos el elemento como ReadOnly, entonces no se podra cambiar nada, 
                para poder cambiarlo tenemos que dispara el OnChange

                Queremos detectar cuando se precione Enter por el usuario
                se puede hacer muchas formas pero aqui de forma tradicial seria con un form
                que encierre el input, el problema de esto es que por defecto nos actualiza
                la pagina y queremos quitar ese comportamiento

                Para esto llamamos el evento del OnSubmit al cual le mandamos la funcion que nos evita ese comportamiento

                Gracias al formulario es como recibimos lo que escribio el usuario al input y asi le pondemos mandar este
                dato al padre
                    InputValue -> Es el que vamos a tener que enviar para actualizar la informacion en el padre
            */}
            <form onSubmit={ onSubmit }>
                <input 
                    type="text"
                    placeholder="Buscar Gifs"
                    value={InputValue}
                    onChange = {onInputChange}
                />
            </form>
        </>
    )
}
