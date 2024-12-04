import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext";

export const LoginPage = () => {

    /*
        Aqui vamos a hacer la navegacion con el Replace a la pantalla de Marvel (Pagina de Inicio de nuestra aplicacion)
    */
    const navigate = useNavigate();
    const { login } = useContext( AuthContext );

    const onLogin = () => {

        // Verificamo si cuando el usuario ingreso existe una ruta ya deifinida para mandarlo ahi (Esto es lo implementado para que 
        // recuerde la aplicacion la ultima parte de la pagina visitada)
        // Si es nulo lo mandamos a la pagina de inicio
        const lastPath = localStorage.getItem('lastPath') || '/';

        // Cuando hagamos click en el boton queremos hacer el Dispatch de esta accion
        // que para eso reuerimos acceso al context (Aqui mandamos a llamar la funcion del "Context")
        // el cual le tenemos que pasar el NAME
        login('User');

        // Despues de eso, si recargamos la pagina perdemos esta informacion entonces tenemos que regresarnos a la
        // pagina del Login para volver a ingresar los datos a la aplicacion

        navigate('lastPath',{
            replace: true
        });
    }

    return (
        <div className="container mt-5">
            <h1>Login</h1>
            <hr />

            <button
                className="btn btn-primary"
                onClick={ onLogin }
            >
                Login
            </button>
        </div>
    )
}
