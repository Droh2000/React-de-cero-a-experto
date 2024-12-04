import { AppRouter } from "./router/AppRouter"
import { AppTheme } from "./theme/AppTheme"

export const JournalApp = () => {
    return (
        <AppTheme>
            {/* Despues de Configurar las Rutas las definimos en lo mas alto de la APP
                No hay que olvidarnos de implementar el BrowserRoutes
                En el Main que encierre este componente que implementa las Rutas */}
            <AppRouter />
        </AppTheme>
    )
}
