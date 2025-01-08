import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";
import { Provider } from 'react-redux';
import { store } from "./store";

export const CalendarApp = () => {
    // Aqui vamos a renderizar el componente de las rutas 
    return (
        // Por el uso del Router Doom tenemos que envolver la aplicacion en este componente
        <Provider store={ store }>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </Provider>
    )
}
