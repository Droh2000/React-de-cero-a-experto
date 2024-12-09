import { TurnedInNot } from '@mui/icons-material';
import { Box, Drawer, Toolbar, Typography, Divider, List, ListItem, ListItemButton, ListItemIcon, Grid2, ListItemText } from '@mui/material';

export const SideBar = ({ drawerWidth=240 }) => {
    return (
        // Vamos a crear como una barra de navegacion
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm:0 } }}
        >
            
            <Drawer
                variant='permanent' // Esto podria ser tambein "temporary" si quisieramos ocultarlo y mostrarlo de manera condicion
                open = { true } // React si tenemos una propiedad que siempre es True podemos omitir esta deficion y crear solo la propiedad
                sx={{
                    display: { sx: 'block' },
                    // Podemos crear en SX como SAS una propiedad computada y agregarle a esa clase que definamos y especificarle propiedades adicionales
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >

                <Toolbar>
                    <Typography variant='h6' noWrap component='div' >User Name</Typography>
                </Toolbar>

                <Divider/>

                {/* Creamos una lista ficcticia */}
                <List>
                    {
                        ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio'].map( text => (
                            <ListItem key={ text } disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <TurnedInNot />
                                    </ListItemIcon>

                                    <Grid2 container>
                                        <ListItemText primary={ text } />
                                        <ListItemText secondary={ 'No se que poner' } />
                                    </Grid2>

                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>

            </Drawer>
        </Box>
    )
}
