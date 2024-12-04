import { useState } from "react";

export const useForm = ( initialForm = {} ) => {

    const [ formState, setFormState ] = useState(/*{
        Si lo dejamos asi, nuestro UseForm solo podra manejar un fomulario que sigua estos campos
        y nosotros queremos ser capaz de mandarle en el parametro del UseForm el objeto que contenga los campos
        username: '',
        email: '',
        password: ''
    }*/
        // Le mandamos el objeto que contiene los campos del formulario
        initialForm
    );
    
    // Aqui ya no tiene sentido la desestructuracion porque no sabemos que campos se usaran
    //const { username, email, password } = formState

    const onInputChange = ({ target }) => {
        const { name, value } = target;

        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    // Restablecer los valores al punto inicial del formulario
    const onResetForm = () => {// podriamos recibir el argumento para hacer algo con lo que ya esta escrito
        setFormState(initialForm);
    }
    /*
        Existen diferentes tecnicas para el manejo de formularios
        Hay un paquete externo a REACT que se llama "React Hook Form"
        ahi podemos encontrar una version mas compleja de nuestro UseForm
        Tratemos de implementar lo que ya podemos hacer con REACT y JS antes de empezar a importar muchos paquetes de Terceros
        donde tengamos funcionalidades ya programadas
    */

    // Se retorna un objeto porque sabemos que este Hook lo podriamos expandir mas en el futuro
    // Hay que preguntarnos que requerimos para exponerlos al mundo exterior para meterlos al objeto
    return {
        // Para ahorrarnos el tener que desestructurar el formState para poder acceder a los campos del formulario y asi poder usarlos
        // para eso desestructuramos el formState para aqui exponga las propiedades que son los campos del formulario
        ...formState,
        formState, // El valor del formulario
        onInputChange, // La funcion para poder cambiar los valores del input
        onResetForm
    }
}

