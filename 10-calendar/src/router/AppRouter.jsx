import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../auth';
import { CalendarPages } from '../calendar';
import { useAuthStore } from '../hooks';
import { useEffect } from 'react';

// usamos el ReactRouter Doom para mostrar una pagina u otra de forma condicional
export const AppRouter = () => {

    // Esta es la validacion (Dependiendo de esta vamos a mostrar una u otra ruta)
    // asi nos evitamos el paso de crear rutas privadas o publicas
    //const authStatus = 'authenticated'; // not-authenticated

    // En este punto tenemos que tomar la decicion si mostramos rutas publicas o rutas privadas
    // Este "checkAuthToken" nesecitamos que se dipare antes de que muestre el login o la otra pantalla
    const { status, checkAuthToken } = useAuthStore();

    useEffect(()=>{
        checkAuthToken();
    }, []);

    // Podriamos determinar si el status
    if( status === 'checking' ){
        return (
            <h3>Cargando...</h3>
        )
    }

    // Si esta autenticado o no el usario mostrara estas otras rutas

    // Por la forma en la que esta la logica aqui no importa si el usuario escribe la ruta de login cuando ingresa al sistema porque estas
    // rutas de /auth/ ya no va a existir, solo existen las rotas donde se cumple la condicion (Este es el sistema de rutas)
    return (
        <Routes>
            {
                // En este caso si la condicion se cumple entonces vamos a mostrar la ruta para el login
                // caso contrario vamos a crear las rutas de autenticacion esto va a hacer que si el usuario
                // quiere llegar a una ruta que no exite no va a poder ingresar a esta
                ( status === 'not-authenticated' )
                // Cuando ya estemos autenticados la ruta de "/auth/" deja de existir y cualquier rota nos lleva al CalendarPages
                // asi que cambiamos la logia para cuando ingresemos al sistema no que queda en esta ruta
                // para que solo estas rutas se pueda acceder si no esta autenticado el usuario
                ? (
                    <>
                        <Route path='/auth/*' element={ <LoginPage/> }/>
                        {/*
                            Si se pone una ruta que no es conocida
                            ESto se va a llegar a esta ruta
                            Porque si no estubieramos autenticado solo apuntamos al /auth/
                            entonces en este caso redireccionamos a esa ruta, ya si estamos autneticado se maneja
                            la otra ruta de /*, la ruta de abajo con Navigate la ponemos como a prueba de fallos para evitar
                            que el usuario entre a un lugar donde no queramos
                        */}
                        <Route path='/*' element={ <Navigate to="/auth/login" /> }/>
                    </>
                ) // Cualquier ruta que entre al Auth por eso es el astedisco va a mostrar el elemento indicado
                : (
                    <>
                        {/* La ruta raiz de nuestra navegacion solo sera para el ingreso dentro de la aplicacion */}
                        <Route path='/' element={ <CalendarPages/> }/>
                        {/* Cualquier otra ruta va a navegar a "/"  */}
                        <Route path='/*' element={ <Navigate to="/" /> }/>
                    </>
                )  // Cualquier otra ruta que no sea la de arriba entonces entra al elemento que es el calendario

            }
        </Routes>
        // Ya si quisieramos podriamos implementar rutas pribadas o publicas pero en este caso es una implementacion de otra forma
    )
}
