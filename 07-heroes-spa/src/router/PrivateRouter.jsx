
// Al ser un componente de orden superior vamos a recibir el Children que son los componentes hijos que recibe

import { useContext } from "react"
import { AuthContext } from "../auth/context/AuthContext"
import { Navigate, useLocation } from 'react-router-dom'

export const PrivateRouter = ({ children }) => {
    // Aqui debemos de saber si el usuario esta autenticado o no
    // Esta informacion la tenemos almacenadas en el "useContext()" de aqui buscamos el valor llamado
    // "logged" que nos indica si esta autenticado o no
    // Basado en esto mostramos la rutas o NO
    const { logged } = useContext( AuthContext );

    /*
        Implementacion de que el usuario si esta en algun lugar y cierra sesion
        cuando vuelva a ingresar vuelva a aparecer a donde estaba la ultima vez antes de 
        cerrar sesion y no se pierda donde estaba

        Sabemos que nuestras privadas pasan por el PrivateRoute
        para esto vamos a implementar el Hook del useLocation de aqui podemos obtener todo lo que
        requerimos como la ruta, QueryParameters del URL
    */
   const { pathname, search } = useLocation();
   // Concatenamos la ruta completa
   const lastPath = pathname + search;
    // Esto se va a estar llamando cada vez que ejecutemos una accion en la pagina, esto ya es decicion de nosotros
    // si memorizarlo o guardar solo cuando el usuario cierra la sesion para que no se este ejecutando todo el tiempo
    // Ademas si pulsamos en el Input la busquedad aunque no haya cambiado nada de todos modos se vuelve a redibujar
    // Podriamos usar un UseMemo para memeorizarlo o un UseEffect para hacer que cambia solo si el Search o PathName cambia
    localStorage.setItem('lastPath', lastPath);

    // Ahora si la persona se autentica podemos verificar si existe el LastPath
    // Para esto nos vamos al LoginPage

    // Si esta autenticado vamos a mostrar el Children (Esto ya seria un JSX) caso contrario podriamos regresar un fragmento vacio
    // un mensaje de 403 o mandar el usuario a otra pantalla con el Navigate a la de Login
    return (logged)
        ? children
        : <Navigate to='/login' />
}
// Despues de esta implementacion nos vamos al "AppRouter"