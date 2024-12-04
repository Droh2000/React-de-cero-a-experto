import { useEffect, useState } from "react";
import { useForm } from "../hook/useForm";

export const FormWithCustomHook = () => {// Hook que utiliza un customhook donde podemos reutilzar la logica del los forms y solo le especificamos los campos que queremos de forma dinamica
    
    // La diferencia es que ahora vamos a manejar el passwaord
    // Entonces que pasaria si tenemos que crear ahora otro formulario pero con otro campo, y otro formulario con otro campo de mas o de menos
    // no tiene sentido estar reptiendo este mismo codigo muchas veses 
    // Lo mejor es que podemos crear un Custom Hook que pueda recibir cual es el estado del fomulario
    // y que nos de todo lo que necesitamos para poder trabajar con el formulario
    //              Este se llama useForm.js en la carpeta de Hooks

    // Implementacion:
    // Le pasamos en objeto los campos del formulario que queremos y desestructuramos
    // los valores que retornamos en el objeto del "useForm" 
    const { formState, onInputChange, username, email, password, onResetForm } = useForm({
        username: '',
        email: '',
        password: ''
    });

    // Ahora tendriamos que hacer la desestructuracion de los campos del formulario para poder usarlos como aqui
    //const { username, email, password} = formState;
    // Nos podemos ahorrar el paso de arriba y poder extraer los valores del formulario
    // Para lograr eso el CustomHook nos tiene que retornar esos campos (Gracias a esto es como los podemos obtener al inicio en la desestructuracion)

    // Entonces en el CustomHook useForm separamos la logica del componente FormWithCustomHook
    // Si es demaciada la logica, la podemos separar en funciones externas 

    return (
        <>
            <h1>Formulario Con Custom Hook</h1>
            <hr />

            <input 
                type="text" 
                className="form-control"
                placeholder="UserName"
                name="username"
                value={ username } 
                onChange={ onInputChange }
            />

            <input 
                type="email" 
                className="form-control mt-2"
                placeholder="example@mail.com"
                name="email"
                value={ email }
                onChange={ onInputChange }
            />

            <input 
                type="password" 
                className="form-control mt-2"
                placeholder="password"
                name="password"
                value={ password }
                onChange={ onInputChange }
            />
            
            <button onClick={ onResetForm } className="btn btn-primary mt-2">Borrar</button>

        </>
    )
}
