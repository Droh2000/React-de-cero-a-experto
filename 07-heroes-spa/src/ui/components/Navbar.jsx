import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/context/AuthContext';

export const Navbar = () => {

    // PONER EL NOMBRE DEL USUARIO QUE INGRESO AL SISTEMA
    // Del Context sacamos el usuario
    // Sacamos el Logout para borrar el usuario del menu al cerrar la session
    const { user, logout } = useContext( AuthContext );

    // IMPLEMENTACION DEL LOGOUT
    // En versiones antiguas de REACT podriamos tambien del componente "NavBar" tomar los "props" en los parametros
    // asi es como recibiamos toda la forma de la navegacion, pero ahora ya nno recibimos nada 
    // Para esto existe un CustomHook de React para ayudarnos con la navegacion
    // Con este "UseNavigate" es que vama a ir al "Navigation.Provider" y ahi es donde esta la funcion del Navigator
    // donde esta para regresarnos, saber la localizacion, con PUSH creamos una nueva pantalla en el historial
    const navigate = useNavigate();

    const onLogout = () => {
        // Hacemos la navegacion
        // indicamos la ruta a la cual queremos navegar, luego podemos mandar un objeto y este objeto tiene el STATe y Replace
        // Ahora si precionamos el boron de Logout por especificar la ruta de LOGIN ahi es donde nos mandara pero si nos regresamos a una pagina anterior
        // nos regresa a la pagina anterior de historial que seria el inicio de nuestra aplicacion
        // Para que no se nos genere esa entrada de regresarnos a nuestra aplicacion porque si la persona cerro sesion no tiene sentido
        // poder regresarse (Esto se puede lograr igual con la proteccion de rutas)
        // Aqui estamos usado el REPLACE=True par que remplaze la ruta (Esto nos puede dar un falso positivo porque si le damos Atras nos regresa a la 
        // aplicacion pero en otras ocasiones nos puede sacar de la aplicacion porque en teoria el LoginPage es la pagina que tenemos de entrada), el Replace
        // evita que el usuario puede regresar al historial anterior porque lo estamos remplazando
        logout();// Funcion que limpia el LocalStoraged y el State
        navigate('/login', {
            replace: true
        });
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                Asociaciones
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink 
                        className={ ({isActive}) => `nav-item nav-link ${isActive ? "active" : ""}`} 
                        to="/marvel"
                    >
                        Marvel
                    </NavLink>

                    <NavLink 
                        className={ ({isActive}) => `nav-item nav-link ${isActive ? 'active' : ''}`} 
                        to="/dc"
                    >
                        DC
                    </NavLink>

                    <NavLink 
                        className={ ({isActive}) => `nav-item nav-link ${isActive ? 'active' : ''}`} 
                        to="/search"
                    >
                        Search
                    </NavLink>
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">

                    <span className='nav-item nav-link text-primary'>
                        { user?.name }
                    </span>

                    <button
                        className='nav-item nav-link btn'
                        onClick={onLogout}
                    >
                        LogOut
                    </button>

                    {/*<NavLink 
                        className={({isActive}) => `nav-item nav-link ${isActive ? 'active' : ''}`}
                        to="/login"
                    >
                        Logout
                    </NavLink>*/}
                </ul>
            </div>
        </nav>
    )
}