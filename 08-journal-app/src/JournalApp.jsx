import { Route, Routes } from "react-router-dom"
import { AppRouter } from "./router/AppRouter"

export const JournalApp = () => {
    return (
        <>
            {/* Despues de Configurar las Rutas las definimos en lo mas alto de la APP
                No hay que olvidarnos de implementar el BrowserRoutes
                En el Main que encierre este componente que implementa las Rutas */}
            <AppRouter />
        </>
    )
}
