import { StarOutline } from "@mui/icons-material"
import { Grid2, Typography } from "@mui/material"

/*
    Componente: Es una pieza pequena de la aplicacion
    Layout: Es el cascaron donde se puede reutilizar el estilo
    Pages: Es lo que cubre toda la pantalla de la aplicacion
    Views: Es lo que va a estar cambiando dinamicamente en la pagina 

        El padding si no nos gusta lo podemos configurar en el JournalLayout
*/
export const NothingSelectedView = () => {
    return (
        <Grid2 
            container
            spacing={ 0 } 
            direction="column"
            alignItems="center"
            justifyContent="center"
            // El minHeigh lo calculamos y le restamos 110px para que no quede en el medio
            sx={{ minHeight: '100vh', backgroundColor: 'primary.main', borderRadius: 3}}
        >
            <Grid2 item="true" xs={ 12 }>
                <StarOutline sx={{ fontSize: 100, color: 'white' }} />
            </Grid2>

            <Grid2 item="true" xs={ 12 }>
                <Typography color="white" variant="h5">Selecciona o Crea una entrada</Typography>
            </Grid2>
        </Grid2>
    )
}