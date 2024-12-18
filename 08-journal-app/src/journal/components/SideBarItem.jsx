import { TurnedInNot } from '@mui/icons-material';
import { ListItem, ListItemButton, ListItemIcon, Grid2, ListItemText } from '@mui/material';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../store/journal/journalSlice';

export const SideBarItem = ({ title = '', body, id, date, imageUrls = [] }) => {

    // Para hacer que al dar click en una nota se ponga en estado Activo esa nota
    // esto es sincrono por tanto no usamos nigun thonk, ya tenemos la nota por tanto solo
    // la mandamos a activar
    const dispatch = useDispatch();

    const onClickNote = () => {
        // El setActiveNote esta esperando un payload que es la nota que debe de tener todo lo que estamos mandando 
        // como argumento desde el SideBar.jsx
        dispatch( setActiveNote({ title, body, id, date, imageUrls }) );
    }

    // Para el caso que el titulo sea muy largo lo ponemos asi para que no pase de una linea
    const newTitle = useMemo(() => {
        // Si el titulo cambia se vuelve a generar este memo
        return title.length > 17
                ? title.substring(0,17) + '...' // Cortamos el titurlo hasta 17 posiciones
                : title
    }, [title]);

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={onClickNote}>
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
