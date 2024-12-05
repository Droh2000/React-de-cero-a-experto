import { Box } from '@mui/system';
import { NavBar } from '../components';

// Queremos colocar la barra lateral siempre en un tamano especifico  (NavBar)
// Estos valores se los vamos a mandar al componente para que el NavBar no se muestre encima del Texto
const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
    return (
        // Este es como un Div
        <Box sx={{ display: 'flex' }}>
            <NavBar drawerWidth={ drawerWidth } />

            {/* SideBar */}

            {/* Es como si definimos la etiqueta Main de HTML */}
            <Box component='main' sx={{ flexGrow: 1, p: 3 }}>

                {/* Toolbar */}

                { children }

            </Box>
        </Box>
    )
}
