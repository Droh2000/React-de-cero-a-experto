import { AppBar, IconButton, Toolbar, Grid2, Typography } from '@mui/material';
import { MenuOutlined, LoginOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { startLogout } from '../../store/auth/thunks';

// drawerWidth es el ancho que va a tener este elemento
export const NavBar = ({ drawerWidth=240 }) => {

    const dispatch = useDispatch(); // para disparar dentro de cerrar sesion
    
    /*
      Implementacion de Cerrar la Session del usuario 
      
      Como esto tiene que conectarse a Firebase no es una tarea sincrona
      y ademas tenemos que limpiar consas en el store, en este caso seria el "auth" y demas propiedades que tengamos
      esto quiere decir que vamos a tener que hacer varios dispatch de otras acciones para poder
      hacer la limpieza completa de cada propiedad
      Para esto creamos en /src/firebase/providers.js, la funcion para cerrar la sesion

      Vamos a requerir hacer el dispatch de una accion que esta en:
        /src/store/auth/thunks.js -> Como es una tarea asincrona tiene que ser un Thunk, si no lo 
                                     fuera la podemos llamar directamente de un reducer
    */
    const onLogout = () => {
        dispatch( startLogout() );
    }
    

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

                <IconButton 
                    color='error'
                    onClick={ onLogout }
                >
                    <LoginOutlined />
                </IconButton>
            </Grid2>
        </Toolbar>
      </AppBar>
    )
}
