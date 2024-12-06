import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid2, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"

export const NoteView = () => {
    return (
        // Box es como un Div y el Grid nos permite definir elementos internamente (Orden y alineamento)
        <Grid2 
            container 
            direction='row' 
            justifyContent='space-between' 
            sx={{ mb: 1 }}
            alignItems='center'
        >
            <Grid2 item="true">
                <Typography fontSize={ 39 } fontWeight="light">29 Enero 2030</Typography>
            </Grid2>

            <Grid2 item="true">
                <Button color="primary" sx={{ padding: 2 }}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid2>

            <Grid2 container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un titulo"
                    label="Titulo"
                    sx={{ border: 'none', mb: 1 }}
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Que paso en el dia de Hoy?"
                    minRows={ 5 }
                />
            </Grid2>

            <ImageGallery/>
            
        </Grid2>
    )
}
