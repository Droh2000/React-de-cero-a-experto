import { TurnedInNot } from '@mui/icons-material';
import { Box, Drawer, Toolbar, Typography, Divider, List, ListItem, ListItemButton, ListItemIcon, Grid2, ListItemText } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { SideBarItem } from './SideBarItem';

export const SideBar = ({ drawerWidth=240 }) => {

    // Tomamos el nombre del usuario que inicie sesion en la APP
    // Sabemos que siempre lo vamos a tener porque ya va a estar autenticado el usuario
    const { displayName } = useSelector( state => state.auth );

    // Del State obtenemos las notas
    const { notes } = useSelector( state => state.journal );

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
                    <Typography variant='h6' noWrap component='div' >{ displayName }</Typography>
                </Toolbar>

                <Divider/>

                {/* Creamos un componente para mostrar la lista que mostrara las notas creadas por el usuario */}
                <List>
                    {
                        notes.map( note => (
                            // Esparcimos toda la note para usar las propiedades directamente dentro del componente
                            <SideBarItem key={note.id} {...note}/>
                        ))
                    }
                </List>

            </Drawer>
        </Box>
    )
}
