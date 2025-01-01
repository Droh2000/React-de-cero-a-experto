import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../auth';
import { CalendarPages } from '../calendar';

// usamos el ReactRouter Doom para mostrar una pagina u otra de forma condicional
export const AppRouter = () => {

    // Esta es la validacion (Dependiendo de esta vamos a mostrar una u otra ruta)
    // asi nos evitamos el paso de crear rutas privadas o publicas
    const authStatus = 'authenticated'; // not-

    return (
        <Routes>
            {
                // En este caso si la condicion se cumple entonces vamos a mostrar la ruta para el login
                // caso contrario vamos a crear las rutas de autenticacion esto va a hacer que si el usuario
                // quiere llegar a una ruta que no exite no va a poder ingresar a esta
                ( authStatus === 'not-authenticated' )
                ? <Route path='/auth/*' element={ <LoginPage/> }/> // Cualquier ruta que entre al Auth por eso es el astedisco va a mostrar el elemento indicado
                : <Route path='/*' element={ <CalendarPages/> }/>  // Cualquier otra ruta que no sea la de arriba entonces entra al elemento que es el calendario

            }
            {/*
                Si se pone una ruta que no es conocida
                ESto se va a llegar a esta ruta
                Porque si no estubieramos autenticado solo apuntamos al /auth/
                entonces en este caso redireccionamos a esa ruta, ya si estamos autneticado se maneja
                la otra ruta de /*, la ruta de abajo con Navigate la ponemos como a prueba de fallos para evitar
                que el usuario entre a un lugar donde no queramos
            */}
            <Route path='/*' element={ <Navigate to="/auth/login" /> }/>
        </Routes>
        // Ya si quisieramos podriamos implementar rutas pribadas o publicas pero en este caso es una implementacion de otra forma
    )
}
