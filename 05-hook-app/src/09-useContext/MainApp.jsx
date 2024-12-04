/*
       Crear la navegacion entre diferentes pantallas de la aplicacion
       
    Lo ideal es hacerlo en el punto mas alto de nuestra aplicacion ahi las definimos

    Ahora este "MainApp" queremos que sea algo que se muestre en todas las pantallas 
    (Paginas) van a tener este componente
    Justo debajo de este queremos renderizar uno de los componentes, para eso los epezamos a defenir
    de <Routes></Routes> (Este es otro componente de nivel superior) el cual recibe un grupo de hijos
    que seria un Arreglo de rutas, esto es la forma de mandar un monton de rutas y usualmente las rutas
    van en un solo <Route /> a excepcion de cuando queremos hacer rutas hijas

    Por defecto en el punto mas alto estamos en la ruta "/" (la raiz), esto lo definimos en el parametor
        path='/' en el parametro "element" le definimos el componente que queremos mostrar en esa ruta
        Ese es el componente que se nos muestra debajo del MainApp
    
    Si al probar en la aplicacion las Rutas, escribimos una ruta que no existe nos saldra en la consola que
    no se encontro la ruta, nosotros podemos atrapar las excepciones y mandar al usuario un 404 o redeirigir
    a otro componente

*/
import {Link, Navigate, Route, Routes} from 'react-router-dom';
import { HomePage } from './HomePage';
import { AboutPage } from './AboutPage';
import { LoginPage } from './LoginPage';
import { Navbar } from './Navbar';
import { UserProvider } from './context/UserProvider';

export const MainApp = () => {
    {/*
        Colocamos en los mas arriba del arbol de componentes el Provider que usa el CONTEXT donde 
        los componentes hijos pueden acceder a los datos que se requieren    
        Como este encierra los componentes entonces cualquier elemento que se encuentre dentro del provider
        y sus subcomponentes van a poder acceder al Provider y obtener la informacion que nos esta regresando
        en el Context.Provider (Cualquier componentes puede tomar los valores que nos este regresando)
    */}
    return (
        <UserProvider>
            {/*
            <h1>Main App</h1>
                Si queremos crear algun tipo de navegacion o crear algun tipo de componente que nos permita navegar a otras pantallas
                que estan definidas en nuestro router

                Podriamos pensar en un enlace tipico de HTML
                La navegacion funciona pero cuando le damos click a los enlaces hay un Full Refresh de la aplicacion
                esto no es conveniente porque al recargar estamos cargando toda la libreria de REACt y todos los componentes
                cuando en realidad solo esta cambiando una porcion pequena de la aplicacion
                (Esto solo se usuaria cuando queremos navegar a un recurso externo de la aplicacion u otro lugar)

            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/login">Login</a>
            
                REACT nos ofrece el componente del LINK para la navegacion
                (Ya no hay Refresh solo se cambia de componente)

                Si miramos el codigo HTML en el navegador veremos que estos enlaces se traducen a un enlace <a>
                es por eso que les podemos agregar formato CSS referenciandolos por "a"

                Esto es lo que se usa para la navegacion a otras pantallas

            <>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/login">Login</Link>
            </>

                Creamos un componente para meter toda la logica de las opciones del menu de navegacion
            */}
            <Navbar />

            <hr />

            {/* Asi definimos las rutas de nuestra Aplicacion y la ruta especifica*/}
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='login' element={<LoginPage />} />
                <Route path='about' element={<AboutPage />} />

                {/* 
                    Manejar las excepciones de una ruta que no Existe

                    Aqui esamos usando un Comodin "/*" y aqui especificamos lo que queremos mostrar cuando no exista
                    Cuando se escriba una ruta que no exista nos llevara al login page
                
                <Route path='/*' element={<LoginPage/>} />
                    
                    Otra forma de hacerlo es mandarlo a una ruta especifica (Porque en el anterior se 
                    queda en la URL inventada y no mueve a la URL del componente que si existe) Asi que
                    usamos el Navigate este es un componente de REACT que apenas se renderice y se termine
                    de implementar y ya cuando los componente se redibujen, entonces hace la navegacion al
                    componente o ruta que le especficamos en "to=" (Aqui si nos movemos a la ruta especifica
                    del componente y nos queda en la inventada)
                */}
                <Route path='/*' element={<Navigate to="/about"/>} />

            </Routes>
        </UserProvider>
    )
}
