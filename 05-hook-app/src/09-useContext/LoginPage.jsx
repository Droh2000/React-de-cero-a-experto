import { useContext } from "react"
import { UserContext } from "./context/userContext"

export const LoginPage = () => {
    /*
        Para tomar el valor que estamos recibiendo con el CONTEXT a travez del Provider

        Para esto implementamos el "UseContext" pero hay que recordar que podemos tener muchos
        contextos, entonces para indicar que queremos el UserContext (ese proveedor en particular)
        le pasamos el nombre del Contexto (Si tubieramos varios contextos con el mismo nombre entonces 
        nos va a regresar el contexto que coincida mas cercano llendo siempre hacia arriba segun
        se encuentre el componente entre los arboles de componentes)

        Ahora podemos desestructurar lo que nosotros queramos

        Esto lo podemos ver como este "value" del "UserContext.Provider"  como el valor que estamos regresando de un custom Hook
        que seria lo que exponemos a los usuarios que quieren usar el Contexto (De hecho estamos desestructurando informacion
        como con los CustomHook)
    */
    const { user, setUser } = useContext( UserContext );

    return (
        <>
            <h1>LoginPage</h1>
            <hr />

            <pre>
                {JSON.stringify( user, null, 3 )}
            </pre>

            {/* 
                Cuando precionamos el Boton queremos cargar el Objeto de arriba con los datos del usuario
                En el "UserContext.Provider" ya establecimos que en el VALUE nos regrese el usuario y la funcion
                para poder establecer que seria un UseState (Estos ya los extraemos de arriba en el useContext)

                Ahora aqui le podemos establecer los valores al usuario
                Al precionar el boton manda esta informacion al "user" y de este ya lo pueden tomar los demas
                componentes con el CONTEXT

                Asi podemos compartir informacion y colocar en un estado global cosas que los componentes van a requerir
                
            */}
            <button 
                className="btn btn-primary"
                onClick={ () => setUser({ id:213, name: 'oaess', email: 'example@example.com'})}
            >
                Establecer Usuario
            </button>
        </>
    )
}
