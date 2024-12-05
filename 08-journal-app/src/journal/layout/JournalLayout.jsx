import { Box } from '@mui/system';

// Queremos colocar la barra lateral siempre en un tamano especifico  (NavBar)
// Estos valores se los vamos a mandar al componente
const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
    return (
        // Este es como un Div
        <Box sx={{ display: 'flex' }}>
            {/* Navar */}

            {/* SideBar */}

            {/* Es como si definimos la etiqueta Main de HTML */}
            <Box component='main' sx={{ flexGrow: 1, p: 3 }}>

                {/* Toolbar */}

                { children }

            </Box>
        </Box>
    )
}
