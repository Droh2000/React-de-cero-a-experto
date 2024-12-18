import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid2, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from '../../hooks/useForm'; 
import { useEffect, useMemo } from "react";
import { setActiveNote } from "../../store/journal/journalSlice";
import { startSaveNote } from "../../store/journal/thunks";

export const NoteView = () => {

    // Tomar la nota que este en esta Activo a la pantalla de edicion y cada campo con su respectivo input
    // Podemos tomar del estado del Store la nota que esta activa
    // al parametro "active" le cambiamos el nombre como "note" para saber que esta es la nota activa
    const { active:note } = useSelector( state => state.journal ); 
    // Esta nota es el estado inicioal del CustomHook del formulario
    // Aqui en el "formState" esta toda la nota, los demas elementos los conectamos con los inputs respectivos
    /*
        En un inicio cuando hacemos click en las notas que tenemos en el menu veremos que
        los inputs solo toman el valor de la primera nota que hicimos click, y despues que
        queramos darle click a las demas notas ya no cambian los inputs 
        Internamente vemos que a la que le demos click esta bien porque esta dice que esta activa
        Pero no cambia porque el CustomHook de useForm solo le estamos diciendo que se inicialize una vez
        lo unico que cambia es la nota activa (El componente no se destruye y se vuelve a generar)

        Dentro del "useForm" le debemos de decir que si el "initialForm" cambia entonces se deben 
        de volver a colocar los nuevos valors del "initialForm" (No le estamos diciendo que actualize 
        las referencias), asi que dentro del useForm le creamos un useEffect
    */
    const { body, title, date, onInputChange, formState } = useForm( note );

    // Usamos este UseMemo para que la fecha no vaya a cambiar ya que el formulario si que cambia mucho
    const dateString = useMemo(() => {
        // Le damos formato a la fecha
        const newDate = new Date( date );
        return newDate.toUTCString();
    }, [date]);

    
    // Aplicar los cambios de la notas del Formulario a la Base de datos 
    // pero tambien vamos a hacer que cada vez que ocurra un cambio los vamos a meter
    // en la nota Activa 
    // Cuando cualquier propiedad del FormState cambia entonces vamos a hacer el dispath de una nueva accion
    const dispatch = useDispatch();
    useEffect(()=>{
        // El setActiveNote va a activar la nota que le pasemos, si le pasamos el FormState va a tener las propeidades actualizadas
        dispatch( setActiveNote(formState) );
        // Con esto si quremos guardar solo hay que guardar lo que esta en la nota Activa que ya tiene todos los campos de la nota
    }, [formState]);

    const onSaveNote = () => {
        // Para esta accion requerimos un thonk porque tenemos que conectarnos a Firebase
        dispatch( startSaveNote() );
    }

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
                <Typography fontSize={ 39 } fontWeight="light">{ dateString }</Typography>
            </Grid2>

            <Grid2 item="true">
                <Button 
                    onClick={ onSaveNote }
                    color="primary"
                    sx={{ padding: 2 }}
                >
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
                    name="title"
                    value={ title }
                    onChange={ onInputChange }
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Que paso en el dia de Hoy?"
                    minRows={ 5 }
                    name="body"
                    value={ body }
                    onChange={ onInputChange }
                />
            </Grid2>

            <ImageGallery/>
            
        </Grid2>
    )
}