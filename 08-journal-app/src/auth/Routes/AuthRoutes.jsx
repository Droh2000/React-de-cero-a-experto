import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPages, RegisterPages } from "../pages"

export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path='login' element={ <LoginPages /> } />
            <Route path='register' element={ <RegisterPages /> } />

            {/*
                Como esta va a ser una ruta a la cual se va a poder entrar mediante algun cierto tipo de Path
                si se entrara a mostrar el AuthRoutes y no estamos en Login o Register entonces vamos a mandar
                automaticamente al usuario a Login

                Para esto usamos el Comodin '/*' para que sea cualquier ruta que no sea de las que definimos arriba
                entonces lo mandamos con el Navigate a la ruta del login pero esto va a estar dentro de algun 
                Path en especifico que al inicio de la APP no sabiamos el segmento del inicio
            */}
            <Route path='/*' element={ <Navigate to='/auth/login' /> } />
        </Routes>
    )
}
