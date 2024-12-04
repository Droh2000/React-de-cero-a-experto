import { AuthProvider } from "./auth"
import { AppRouter } from "./router/AppRouter"

export const HeroesApp = () => {
    return (
        /*
            Este AuthProvider nos sirve para compartir la inforamcion que se tiene en el Provider
            en cualquier lado de la aplicacion
        */
        <AuthProvider>
            <AppRouter />
        </AuthProvider>
    )
}
