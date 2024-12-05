import { AppBar, IconButton, Toolbar, Grid2, Typography } from '@mui/material';
import { MenuOutlined, LoginOutlined } from '@mui/icons-material';

// drawerWidth es el ancho que va a tener este elemento
export const NavBar = ({ drawerWidth=240 }) => {
    return (
      <AppBar
        position='fixed'
        sx={{
            // Calculamos el 100% que tenga la pantalla y le restamos el elemento que recibimos
            width: { sm: `calc(100%-${ drawerWidth }px)` },
            // Solo en pantallas pequenas el MarginLeft va a ser el valor que le estamos mandando
            ml: { sm: `${ drawerWidth }px` }
        }}
      >
        <Toolbar>
            <IconButton
                color='inherit'
                edge="start"
                sx={{ mr: 2, display: { sm: 'none'} }} // Para que en pantallas pequenas salga el menu comprimido
            >
                <MenuOutlined />
            </IconButton>

            <Grid2
                container
                direction='row'
                justifyContent='space-between' // Para que el contenido de separe
                alignItems='center'
            >
                <Typography 
                    variant='h6'
                    noWrap
                    component='div'
                >JournalApp</Typography>

                <IconButton color='error'>
                    <LoginOutlined />
                </IconButton>
            </Grid2>
        </Toolbar>
      </AppBar>
    )
}
