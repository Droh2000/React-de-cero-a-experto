import { SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid2, IconButton, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from '../../hooks/useForm'; 
import { useEffect, useMemo } from "react";
import { setActiveNote } from "../../store/journal/journalSlice";
import { startSaveNote, startUploadingFiles } from "../../store/journal/thunks";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useRef } from "react";

export const NoteView = () => {

    // Tomar la nota que este en esta Activo a la pantalla de edicion y cada campo con su respectivo input
    // Podemos tomar del estado del Store la nota que esta activa
    // al parametro "active" le cambiamos el nombre como "note" para saber que esta es la nota activa
    const { active:note, messageSave, isSaving } = useSelector( state => state.journal ); 
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

    // Mostrar mensaje de Alerta que se guardo la nota
    useEffect(() => {
        // Como va a estar cambiando entre un texto y un string vacio vamos a verificar
        if( messageSave.length > 0){
            Swal.fire('Nota actualizada', messageSave, 'success');
        }
    }, [messageSave]);

    // Hacer la simulacion de un click y que al hacer click en el Icon se dispare el input
    // que carga las imagenes
    const fileInputRef = useRef();

    const onFileInputChange = ({ target }) => {
        // En target tenemos la cantidad de archivos seleccionados
        if( target.files === 0 ) return;

        // Subir las imagenes a Cloudinary
        //  Como tenemos que llegar a un endpoint, hacer la peticion HTTP es una tarea asyncrona por lo tanto usamos Thonk
        dispatch( startUploadingFiles( target.files ) );
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

            {/*
                La idea es que el hosting de nuestras imagenes sea diferente al hosting en donde
                tenemos nuestra aplicacion corriendo
                Aqui vamos a usar cloudinary.con asi vamos a poder tener un boton para subir imagenes
                tradicional y podamos seleccionar uno o varios archivo y ssean subidos de manera tradicional
                Luego esas imagenes requeriran un backend que tengan un URL que este esperando esas imagenes 
                y ahi es donde entra Cloudinary
                
                Vamos a implementar unos selectores de imagenes que tomaran la imagen y la van a mandar a cloudinary  
                por defecto en los inputs de tipo File no podemos seleccionar multiples archivos
                para esto tenemos que definirle la propiedad multiple

                Aqui queremos que se muestre para subir los archivos el IconButton y no el input oroginal porque
                se mira feo, como el Icon es solo la vista y la funcionalidad esta en el Input, entonces tenemos
                que usar el UseRef para que cuando toquemos el Icon se dispare el Input
                        (El input lo ocultamos con CSS y le especificamos la refernecia al input con el hook)
            */}
            <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={ onFileInputChange }
                style={{display: 'none'}}
            />

            <IconButton
                color="primary"
                disabled={ isSaving }
                // Simulamos cuando se hace click se ejecute este en el Input de arriba
                onClick={ () => fileInputRef.current.click() }
            >
                <UploadOutlined/>
            </IconButton>

            <Grid2 item="true">
                <Button 
                    disabled={isSaving}
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
