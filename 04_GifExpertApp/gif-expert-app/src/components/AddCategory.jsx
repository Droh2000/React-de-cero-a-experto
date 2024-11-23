import { useState } from "react";

// Cada componente puede tener su propio estado, Hooks (UeStates)
// En este caso queremos manejar el estado del Input (Conforme la persona escriba queremos obtener sus valores)
/*
    Aqui estamos recibiendo el "setCategories" que le mandamos desde el GiftExpert
    tenemos que implementar la misma logica de la funcion "onAddCategory" de GiftExpert
    solo que ahora se manda lo que se encuentre en el "inputValue" (Mantiendo lo valores que ya se tenian
    y agregandole el nuevo valor)

    Por defecto tenemos el objeto de props pero lo mas comun es que se desetructure
*/
//export const AddCategory = ({ setCategories }) => {

// Esto seria de otra forma usando la propiedad "onNewCategory" 
export const AddCategory = ({ onNewCategory }) => {    
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
        /*
            Mandamos a llamar la funcion que recibimos como parametro pero si insertamos el nuevo valor
            "InputValue" nos va a sobrescribir el arreglo anterior de "GifExpert"
            Entonces como esta funcion es de UseSate le podemos mandar un CallBack donde vamos a tener el arreglo
            anterior de las categorias e insertamos el nuevo valor seguido de la desestructuracion del arreglo

            Para insertar correctamente tenemos que hacer varias validaciones
                Con '.trim()' le limpiamos los espacios adelante y atras, ademas verificamos si esto tiene que tener almenos una letra
                Le agregamos directamente el RETURN por que si no cumple simplemente se salga de la funcion
        */
        if(InputValue.trim().length <= 1) return;

        //setCategories( categories => [InputValue, ...categories] );

        // De la otra forma
        // Solo mandamos a llamar esta propiedad y le mandamos el InputValue ya limpio y validado
        onNewCategory( InputValue.trim() );

        // Ya insertado el nuevo valor, le podemos limpiar donde se almaceno el texto
        setInputValue('');
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
                <button type="submit">Agregar</button>
            </form>
        </>
    )
}
