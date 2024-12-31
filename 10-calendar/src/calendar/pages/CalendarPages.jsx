import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "../../router";

export const CalendarPages = () => {
    // Aqui vamos a renderizar el componente de las rutas 
    return (
        // Por el uso del Router Doom tenemos que envolver la aplicacion en este componente
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    )
}