import { IconButton } from '@mui/material';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { AddOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store/journal/thunks';

export const JournalPages = () => {

    // Agregamos la logica para agregar una nueva nota
    const dispatch = useDispatch();

    // Tomamos el Active para saber si tenmos algo en una nota activa 
    const { isSaving, active } = useSelector( state => state.journal );

    const onClickNewNote = () => {
        // podriamos pensar en mandar el uid del usuario pero este ya lo tenemos en el Store y los
        // thunks tambien tienen acceso al store
        dispatch( startNewNote() );
    }

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
        
                Esto es lo que vamos a mostrar cuando haya una nota
                Cuando tengamos una nota activa vamos a activar la otra pantalla
            */}
            {
                (!!active)
                ? <NoteView/>
                : <NothingSelectedView />
            }
            
            {/* Boton Flotante */}
            <IconButton
                onClick={ onClickNewNote }
                size='large'
                disabled={ isSaving } // Si esta en este estado no se debe de poder crear mas notas porque ya se esta editando una
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