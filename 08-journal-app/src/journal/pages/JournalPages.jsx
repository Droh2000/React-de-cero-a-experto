import { IconButton } from '@mui/material';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { AddOutlined } from '@mui/icons-material';

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
            {/* 
                Debemos de mostrar algo cuando no hay nada seleccionado 
                Este componente ya viene con su separacion gracias al Layout que definimos
                (El mismo diseno del Login Register)
            */}
            <NothingSelectedView />
            
            {/* Esto es lo que vamos a mostrar cuando haya una nota */}
            {/*<NoteView/>*/}
            
            {/* Boton Flotante */}
            <IconButton
                size='large'
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',':hover':{ backgroundColor: 'error.main', opacity:0.9 },
                    position: 'fixed',
                    right: 50,
                    bottom: 50

                }}
            >
                <AddOutlined sx={{ fontSize: 30 }} />
            </IconButton>
            
            
        </JournalLayout>
    )
}