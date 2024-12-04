import { Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/Routes/AuthRoutes'
import { JournalRoutes } from '../journal/routes/JournalRoutes'

export const AppRouter = () => {
    /*
        Podriamos definir directamente aqui todas las rutas para cada caso pero la idea es que nuestros
        modulos de "Auth" y "Journal" que esten separados lo mas posible, esto nos va a permitir a nosotros
        poder agregar rutas directamente al Router que vamos a tener dentro de la carpeta "Auth" y en el "Journal"
            Dentro de Auth tenemos este directorio:
                * Layout: Este seria el cascaron que va a tener envueltas las paginas o tambien que no son paginas solo son Views
                            para mantener el mismo aspecto, misma forma
        
        Despues de crear los archivos respectivos de Rutas de Auth y Journal las configuramos aqui
    */
    return (
        <Routes>
            {/* Rutas para el Login y Registro 
                Aqui indicamos que cualquier ruta que entre por "auth" entonces va a mostrar el elemento de las Rutas de esa carpeta
            */}
            <Route path='/auth/*' element={ <AuthRoutes /> } />

            {/* Rutas para la Aplicacion Journal (Diario)
                Cualquier otra ruta que no sea la de arriba va a entrar por aqui*/}
            <Route path='/*' element={ <JournalRoutes /> } />
        
        </Routes>
    )
}