import { TurnedInNot } from '@mui/icons-material';
import { ListItem, ListItemButton, ListItemIcon, Grid2, ListItemText } from '@mui/material';
import { useMemo } from 'react';

export const SideBarItem = ({ title, body, id }) => {

    // Para el caso que el titulo sea muy largo lo ponemos asi para que no pase de una linea
    const newTitle = useMemo(() => {
        // Si el titulo cambia se vuelve a generar este memo
        return title.length > 17
                ? title.substring(0,17) + '...' // Cortamos el titurlo hasta 17 posiciones
                : title
    }, [title]);

    return (
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>

                <Grid2 container>
                    <ListItemText primary={ newTitle } />
                    <ListItemText secondary={ body } />
                </Grid2>

            </ListItemButton>
        </ListItem>
    )
}
