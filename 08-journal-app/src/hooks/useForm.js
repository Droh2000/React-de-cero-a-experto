import { useEffect, useMemo, useState } from 'react';

// Aqui vamos a implementar la validacion nosotros pero podemos usar hooks ya hechos pero para nosotros aprneder lo hacemos manual
// Como segundo argumento es el objeto que contiene los campos y las validaciones correspondientes para cada campo
export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );

    // La idea de este State es que podamos tener aqui si hay o no un error en el Form
    // Con este objeto lo podemos evaluar mas facilmente y ademas usamos un Hook porque si se dispara
    // un error en el formulario asi podemos redibujar el formulario (Para mostrar o quitar los mensajes de errro)
    const [ formValidation, setFormValidation ] = useState({});
    
    // Podenos cuando vamos a disparar la funcion que ejecuta las validaciones
    // Esto se va a disparar cada vez que el form Cambia (Un cambio en el formState) 
    useEffect( () => {
        createValidators();
    }, [ formState ]);

    // Para que se actualize con los nuevos valores cada vez que el "initialForm" cambie
    useEffect(() => {
        // LE establecemos el nuevo initialForm
        setFormState( initialForm );
    }, [initialForm]);

    // Con esta propiedad verificamos si todos los valores son validos 
    // Esta la memorizamos por si se cambia en otras cosas no afecta a todo en general que solo debe de cambiar
    // si cambia el formValidation
    const isFormValid = useMemo( () => {
        
        // Tomamos el "formValidation" y recorremos cada una de sus propiedades y verificar si tiene el valor de NULL
        // con una que no lo tenga entonces el formulario tiene errores
        for (const formValue of Object.keys( formValidation )) {
            if ( formValidation[formValue] !== null ) return false;
        }

        return true;
    }, [formValidation]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    // Implementaciones de las validaciones
    // Aqui vamos a tomar el segundo argumento y crear un nuevo estado en el cual 
    // sabremos si los inputs son validos o no
    const createValidators = () => {
        // Este es el objeto que vamos a terminar mandando en el UseState
        const formCheckedValues = {};

        // Recorremos todo el objeto de las validaciones 
        // Por la forma en la que creamos el objeto, con "Object.keys" obtenemos solo los nomobres de los campos
        for (const formField of Object.keys( formValidations )) {
            // Desestrcutramos la funcion de validacion y el mensaje de error del objeto basado en el nombre del campo
            const [ fn, errorMessage ] = formValidations[ formField ];

            // De la funcion solo nos interesa el valor que nos regresa
            // Ahora del objeto que vamos a regresar nos creamos una nueva propiedad computada con el mismo 
            // nombre del campo corres pondiente en la cual le agregamos la palabra "Valid" porque asi es como las
            // especificamos en el "RegisterPage.jsx" que son emailValid, passwordValid, displayNameValid
            // esto lo igualamos a lo que nos regresa la funcion a la cual le paamos el valor del fomulario que esta
            // en el "formField" que lo sacamos el formState (LE mandamos como argumento lo que tenga el input correspondiente),
            // si esto se cumple no almacenamos nada caso contrario le mandamos el mensaje de error
            formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage;
        }

        // Le establecemos los nuevos valores a esto del useState
        setFormValidation( formCheckedValues );
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        // Esparcimos el objeto ya que no nos importa que propiedades tenga que son el nombre del campo con Valid
        ...formValidation,
        isFormValid,
    }
}