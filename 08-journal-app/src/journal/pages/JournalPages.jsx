import { Typography } from '@mui/material';
import { JournalLayout } from '../layout/JournalLayout';

export const JournalPages = () => {
    return (
        /*
            El Typography es para aplicarle los estilos que tiene el Material UI
            A este le tenemos que decir el elemento HTML que le corresponde
            ya que por defecto nos asignara un Parrafo
                    component='h1'
            Si queremos que afecte el estilo del HTML y el H1 se comporte como un TITULO entonces
            cambiamos el component por "variant"
        */
       <JournalLayout>
            <Typography variant='h1'>
                JODEEER
            </Typography>

            {/* Debemos de mostrar algo cuando no hay nada seleccionado */}

            {/* Esto es lo que vamos a mostrar cuando haya una nota */}
            
        </JournalLayout>
    )
}