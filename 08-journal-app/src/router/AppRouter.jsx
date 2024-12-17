import { Route, Routes, Navigate } from 'react-router-dom'
import { AuthRoutes } from '../auth/Routes/AuthRoutes'
import { JournalRoutes } from '../journal/routes/JournalRoutes'
import { useSelector, useDispatch } from 'react-redux'
import { CheckingAuth } from '../ui/components/CheckingAuth'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { FirebaseAuth } from '../firebase/config'
import { login, logout } from '../store/auth/authSlice'
import { useCheckAuth } from '../hooks/useCheckAuth'

export const AppRouter = () => {
    /*
        Podriamos definir directamente aqui todas las rutas para cada caso pero la idea es que nuestros
        modulos de "Auth" y "Journal" que esten separados lo mas posible, esto nos va a permitir a nosotros
        poder agregar rutas directamente al Router que vamos a tener dentro de la carpeta "Auth" y en el "Journal"
            Dentro de Auth tenemos este directorio:
                * Layout: Este seria el cascaron que va a tener envueltas las paginas o tambien que no son paginas solo son Views
                            para mantener el mismo aspecto, misma forma
        
        Despues de crear los archivos respectivos de Rutas de Auth y Journal las configuramos aqui

        Antes de la creacion de las rutas dentro del Reutrn vamos a hacer una evaluacion
    */
    const {status} = useCheckAuth();

   
    // Si esta en este estado ponemos el componente que es la pantalla de Carga
    // Asi incluso nos ayudara a tener las rutas privadas
    if( status === 'checking' ){
        return <CheckingAuth/>
    }

    return (
        <Routes>
            {/*
                Debemos de hacer la proteccion de rutas segun si el usuario esta o no autenticado
                (Aqui aplicamos un tipo de proteccion de rutas privadas y publicas)
                porque si el usuario esta ya dentro de la APP y quiere navegar a la ruta de Login no va a poder
                porque no existe, tiene que cerrar seesion
            */}
            {
                (status === 'authenticated')
                ? <Route path='/*' element={ <JournalRoutes /> } />
                : <Route path='/auth/*' element={ <AuthRoutes /> } /> 
            }
            {/*
                Puede ser que el usuario este en una URL que no sea de las que estan permitidas arriba
                si no esta autenticado entonces se debe de ir a la ruta respectiva de "auth"
                entonces creamos una ruta por defecto que no sea de las definidas arriba
            */}
            <Route path='/*' element={ <Navigate to='/auth/login' /> } />

            {/* Rutas para el Login y Registro 
                Aqui indicamos que cualquier ruta que entre por "auth" entonces va a mostrar el elemento de las Rutas de esa carpeta
            */}
            {/*<Route path='/auth/*' element={ <AuthRoutes /> } />*/}

            {/* Rutas para la Aplicacion Journal (Diario)
                Cualquier otra ruta que no sea la de arriba va a entrar por aqui*/}
            {/*<Route path='/*' element={ <JournalRoutes /> } />*/}
        
        </Routes>
    )
}