/*
    Rutas Publicas

    Si estamos con un usuario dentro del sistema, no deberia la aplicacion de permitirnos ir a la pagina de Login (Esto solamente debe ser
    posible si cierra la sesion), para esto implementamos el PublicRoute.jsx
    La logica aqui implementada es muy parecida al Privateroute.jsx
    (El sentido de este es que nos aseguremos de que el usuario no debe de estar autenticado para ver las rutas)
*/

import { useContext } from "react"
import { AuthContext } from "../auth";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }) => {

    const { logged } = useContext( AuthContext );

    return (!logged) // Si no esta autenticado vamos a mostrar los hijos
        ? children
        : <Navigate to='/marvel'/> // Si esta autenticado lo mandamos a la pagina de inicio de la app   
}
// De aqui nos vamos a AppRouter para poner publica solo la ruta de Login
