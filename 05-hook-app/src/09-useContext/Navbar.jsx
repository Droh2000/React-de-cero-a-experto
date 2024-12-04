/* 
    Este componente se encarga de renderizar los enlaces de las paginas que tenemos 

    Este menu de navegacion lo implementamos con Bootstrap
    (La palabra "class" la cambiaamos a clasName)
*/
import { Link, NavLink } from "react-router-dom"

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded-3">
            
            {/* Este es el nombre que le queremos dar a la aplicacion */}
            <Link className="navbar-brand" to="/">useContext</Link>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    {/* 
                        (Asi hacemos que el link reacciones basado en la ruta en la que se encuentra)
                        Aqui tenemos la clase CSS de "active" para resaltar el elemento del menu en el que nos encontramos
                        Podriamos crearnos un Link en el que sepa en que pagina es la que se encuentra para aplicar la Clase CSS

                        Para esto requerimos el componente del NavLink (Este es un Link que se usa en la navegacion), este cumple
                        la misma tarea del Link solo que le podemos especificar alguna clase en particular dependiendo de donde se
                        encuentre

                        Dentro le tenemos que especificar un Componente Hijo el cual va a tener el nombre de la etiqueta que queemos
                        mostrarle (Le tenemos que definir la ruta en el "to="), ademas le definimos la clase CSS para que se mire con
                        el mismo estilo con el que veninan

                        El NavLink en general nos permite a nosotros poder obtener en el ClassName si esa clase CSS se active
                        segun si nos encontramos en esa pagina
                        Entonces definimos una Funcion flecha la cual recibe unos argumentos, regresamos la clase que nos interesa
                    */}
                    <NavLink
                        className={ ({isActive}) => {
                            // Si miramos los args veremos que tenemos el "isActive = true" que es donde nos enontramos
                            // si miramos de otro NavLink veremos que nos saldra en False
                            //console.log(args);
                            // Aqui desestructuramos los "args" por la propiedad {isActive}
                            
                            // Asi que solo evaluamos agregandole la clase CSS de "active segun sea el caso"
                            return `nav-link ${ isActive ? 'active' : ''}`
                        }}
                        to='/'
                    >
                        Home
                    </NavLink>

                    <NavLink
                        className={ ({ isActive }) => `nav-link ${ isActive ? 'active': ''}`}
                        to='/about'
                    >
                        About
                    </NavLink>

                    <NavLink
                        className={ ({ isActive }) => `nav-link ${ isActive ? 'active': ''}`}
                        to='/login'
                    >
                        Login
                    </NavLink>
                </ul>
            </div>
        </nav>
    )
}