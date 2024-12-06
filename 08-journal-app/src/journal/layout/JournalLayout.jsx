import { Box, Toolbar } from '@mui/material';
import { NavBar, SideBar } from '../components';

// Queremos colocar la barra lateral siempre en un tamano especifico  (NavBar)
// Estos valores se los vamos a mandar al componente para que el NavBar no se muestre encima del Texto
const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
    return (
        // Este es como un Div
        <Box sx={{ display: 'flex' }}>
            <NavBar drawerWidth={ drawerWidth } />

            <SideBar drawerWidth={ drawerWidth } />

            {/* Es como si definimos la etiqueta Main de HTML */}
            <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
                {/* Este nos da el espacio nesesario para que la parte de JournalApp y el boton de salir salgan despues del Nombre */}
                <Toolbar />

                { children }

            </Box>
        </Box>
    )
}
