import { Navigate, Route, Routes } from 'react-router-dom';
//import { LoginPage } from '../auth/pages/LoginPage';
//import {DcPage} from '../heroes/pages/DcPage';
//import {MarvelPage} from '../heroes/pages/MarvelPage';
import {MarvelPage, DcPage, HeroesRoutes} from '../heroes';
import { LoginPage } from '../auth';
import { Navbar } from '../ui';
import { PrivateRouter } from './PrivateRouter';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
    return (
        <>
            {/* Este ya no es nesesario porque ya lo tenemos en el HeroesRoutes
                <Navbar/>
            */}

            <Routes>
                {/*
                        Implementacion de la Ruta Publica
                    <Route path='login' element={<LoginPage />}/>

                    Aqui usamos nuestro componente de las rutas publicas que creamos
                    OJO no es lo mismo definir el componente "LoginPage" dentro del componente de 
                    las rutas publicas que definir directamente todo el Codigo de ROUTE de login como arriba
                    Esto nos daria un falso positivo ya que en realidad nos dara Error, lo que pasa 
                    es que el PublicRoute esta esperando que le pasemos un componente y no un "Route"
                    ya que para eso deberiamos de pasarlos dentro de un "Routes" pero ya no deberiamos de
                    especificar la misa ruta de "/login" para eso tendriamos que definir que en el Route definamos
                    la PATH como 'login/*' para indicarle que cualquier ruta que empeize con el Login va a entrar 
                    y luego dentro de ROUTE la PATH solo la definimos como "/*" para que no especifiquemos una ruta
                        El Codigo seria:
                            <Route path='login/*' element={
                                <PublicRoute>
                                    <Routes>
                                        <Route path='/*' element={<LoginPage />}/>
                                    </Routes>
                                </PublicRoute>
                            }/>   
                            
                    Como vemos hay diferentes formas de manejar las cosas, todo sea por las nesesidades del proyecto
                */}
                <Route path='login' element={
                    <PublicRoute>
                        <LoginPage />    
                    </PublicRoute>
                }/>

                {/*<Route path='marvel' element={<MarvelPage />}/>
                <Route path='dc' element={<DcPage />}/>

                 Ruta comodin para el caso que no encuentre o se le especifique una desconocida
                    automaticamente manda a la ruta definida, para "path" podemos definir cualquier ruta no definida
                    Con Naviagate es la que nos lleva automaticamente a la ruta definida 
                <Route path='/' element={<Navigate to='marvel' />}/>
                    
                    Estas rutas se comentaron porque ya las tenemos implementamos en las Rutas de Heroes/Router/HeroRoutes
                    entonces para conectar la Ruta de Heores con esta, tenemos que crearnos una nueva ruta
                    donde implementamos el componente que contiene las rutas
                        Para la parte de "Path" queremos que cualquier ruta que no sea de la que ya tenemos definida (Login)
                        despliegue este nuevo componente (REACT entra a este componente, evalua las rutas y si el Path que tienen
                        no cinciden con ninguna entonces ejecuta esa redireccion), con el "/*" es el comodin que hace la redireccion

                <Route path='/*' element={<HeroesRoutes />}/>
                    
                    Implementacion de la Ruta Privada

                    Esta Ruta que es la que nos da el acceso a la aplicacion, es la que tenemos que proteger
                    Para esto nos creamos un nuevo Route que va a tener el mismo PATH que indicamos en la ruta a proteger
                    y el elemento que vamos a mostrar sera el JSX que es el componente PrivateRoute que creamos
                    y dentro de este colocamos el HeroesRoutes
                */}
                <Route path='/*' element={
                    <PrivateRouter>
                        <HeroesRoutes />    
                    </PrivateRouter>
                }/>
                
            </Routes>

        </>
    )
}
