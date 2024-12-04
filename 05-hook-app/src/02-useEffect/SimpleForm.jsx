import { useEffect, useState } from "react"
import { Message } from "./Message";

export const SimpleForm = () => {
    /*
        Si queremos mantener la informacion del Formulario
        Asi que debemos de mantener el estado para esto hasta el momento que hemos visto
        es el useState
        Creamos para el estado del formulario (El estado inicial lo creamos como un objeto de ejemplo)
    */
    const [ formState, setFormState ] = useState({
        username: 'usuario',
        email: 'user@mail.com'
    });
    // Tomemos los valores que establecimos arriba para asignarlos al HTML
    // Lo hacemos aparte porque vamos a requerir desestructurar el "formState" despues
    const { username, email } = formState

    // Al establecer estos valores en el HTML, No podremos cambiar 
    // Nos creamos una funcion para poder hacer el cambio de cualquier input
    // esto por defecto al establecer la funcion en un Evento ya recibimos aqui el parametro EVENT
    // El cual con "Event.target" tenemos todo el Input pero a nosotros solo nos interesa el Valor (.value)
    // (Asi tenemos el valor de lo que esta cambiando) pero en el elemento HTML esepcificamos la propiedad "NAME"
    // podemos usar el nombre para saber que elemento es el que esta cambiando (Asi obtenemos las palabras clave
    // 'username', 'emal') para establecer los nuevos valores
    //                  console.log(event.target.name)
    // Aqui desestructuramos el "event" por { target } para que de ahi obtengamos la desestructuracion de los elementos
    const onInputChange = ({ target }) => {
        const { name, value } = target;

        // Asignamos los valores (Cambio del State)
        setFormState({
            ...formState, // Para mantenere todos los valores del formulario y no esta especificando uno por uno
            // Ahora especificamos los valores que si van a cambiar que seria donde "name"
            // En JS existen las propiedades computadas de los objetos, donde declaramos que la propiedad [ name ]
            // es la que vamos a establecer en el objeto y el valor sera igual al " value "
            [ name ]: value // "name" es el mismo nombre de la propieada porque si especificamos una que no existe nos va a crear otra propiedad
        });
    }

    // UseEffect (Para disparar efectos secundarios), esta recibe una funcion como argumento
    // Cada vez que cambia el estado se esta llamando el UseEffect (Si no tiene niguna dependencia se manda a llamar cada vez que 
    // el componente "SiimpleForm" se vuelva a redibujar)
    // Cosas a Considerar con el UseEffect
    //      No poner un UseEffect sin ninguna dependencia (Estos se pasan en la lista como segundo parametro)
    //          en este lista van las dependencias por las cuales queremos que el UseEffect se dispare
    //          Cuando especificamos un arreglo vacio [] estamos indicando que queremos que el useEffect se dispare una unica vez
    //          y cuando el componente se renderiza una unica vez
    //      Si queremos que se dispare cada vez que el formulario cambia (Solo el Formulario no otra cosa del componente)
    //          Como recomendacion de buenas practicas es que en lugar de crear un UseEffect muy grande (Que realize muchas cosas)
    //          se recomienda que creemos UseEffecto especificos por cada accion que queramos llamar
    useEffect(() => {
        console.log("useEffect Called");
    }, []);

    // Creamos un UseEffecto que este pendiente si el FormState Cambia
    // entonces este los pasamos dentro del array [] (Todos los UseEffecto se disparan la primera vez que se renderiza el componente)
    useEffect(() => {
        console.log("FormState Changed");
    }, [formState]);
    // Si queremos disparar pero cuando solo el EMAIL cambie (Asi podriamos dispara una peticion HTTP para saber si el email es permitido)
    useEffect(() => {
        console.log("Email changed");
    }, [email]);

    // El Valor de Retorno que tiene el UseEffect (Esta explicado en Message.jsx)
    
    return (
        <>
            <h1>Formulario Simple</h1>
            <hr />

            {/* 
                Le pasamos los que desestructuramos del UseState en VALUE
                Ademas le pasamos la funcion en el ONChange para poder modificar el input
                No debemos especificar en "name=" el mismo nombre para varios inputs ya que de ahi detectamos cuales cambian
                para asignarles un nuevo valor
            */}
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

            {/*
                Queremos mostrar el mensaje en "Message.jsx" unicamente si el usuario en "username" es el que ya existe
                
                Si la condicion se cumple entonces mostrar el mensaje sino nunca entra aqui
            */}
            {
                (username == 'usuario') && <Message />
            }
        </>
    )
}
