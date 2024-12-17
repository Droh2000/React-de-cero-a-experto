import { Grid2, Typography, TextField, Button, Link, Alert } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';

// Objeto que estamos esperando del formulario
const formData = {
    email: 'example@google.com',
    password: '123456',
    displayName: 'User Example'
}

/*
    Vamos a crearnos nuestras validaciones personalizadas

    Esta las vamos a implementar en el UseForm pero como este no tiene manera de saber
    que campos estan registrados porque todo es dinamico, por tanto le tenemos que mandar
    las validaciones en un objeto (Aqui le vamos a determinar como saber si los campos estan
    bien o mal)
    Esta:
        NombreDeLaPropiedad: Arreglo
            Dentro del arreglo le pasamos primero una funcion para evaluar el campo donde el "value" es el valor 
            que el usuario nos esta escribiendo y con este verificamos si incluye lo que queremos que incluya
            (Le especificamos si la condicion es correcta)
            Como segundo elemento del arreglo le especificamos el mansaje a mostrar si no se cumple la condicion

    Le pasamos esto como un segundo argumento al UseForm

    Hay que ver que para que el formulario sea valida, cada una de estas funciones deben de cumplirse, con una que no se
    cumpla automaticamente no debe de ser valido
*/
const formValidations = {
    email: [ (value) => value.includes('@'), 'El correo debe de tener una @'],
    password: [ (value) => value.lenght >= 6, 'La contraseña debe de tener mas de 6 letras'],
    displayName: [ (value) => value.lenght >= 1, 'El nombre es obligatorio'],
}

export const RegisterPages = () => {

    const dispatch = useDispatch();// ESte lo creamos para poder usar de "thunks.js" el "startCreatingUserWithEmailPassword"

    // Tenemos que programar para que cuando sea la primera vez que entra al formulario o recarga la pagina, el usuario no vea los
    // mensajes de errores (ESto lo vamos a mandar a llamar cuando mande el formulario) y asi detectamos cuando se deben de mostrar los mensajes de error
    const [ formSubmitted, setFormSubmitted ] = useState(false);

    // Que pasa si se crea un usuari que ya existe
    // lo que debemos de hacer es mostrar en pantalla el mensaje del error que el usuari ya existe
    // Este mensaje lo especificamos en el Profivers.js dentro del Catch (Aqui detectamos el error que nos 
    // de firebase y dependiendo de ese nosotros escribimos el mensaje que se mostrarara al usuario
    // Como el mensaje ya lo tenemos vamos a implementarlo aqui
    const { status, errorMessage } = useSelector( state => state.auth );
    
    // Aqui vamos a bloquear el boton de registro para que el usuario no pueda crear varias veses si estamos tratando
    // de verificar el usuario y estamos en estado de Checking, Aqui usamos un UseMemo para que no se este recalculando
    // cada veez que se cambie el formulario, esto solo cambiara si cambia el Status
    const isCheckingAuthentication = useMemo( () => status === 'checking', [status]);


    // Manejar el estado del formulario para capturar los valores
    const { 
        displayName, email, password, 
        onInputChange, formState, isFormValid,
        displayNameValid, emailValid, passwordValid 
    } = useForm(formData, formValidations);

    const onSubmit = ( event ) => {
        event.preventdefault();
        // Detectamos que el formulario se esta mandando
        setFormSubmitted(true);

        // Debemos de prevenir que si no se escribe nada en los vampos de Texto no se pueda mandar vacio
        if ( !isFormValid ) return;

        // ESto para registrar el usuario con FireBase y le mandamos donde tenemos toda la DataRegistrada
        dispatch( startCreatingUserWithEmailPassword(formState));
    }

    return (
            <AuthLayout title="Crear Cuenta">
                <form onSubmit={ onSubmit }>
                    <Grid2 container direction='column'>
                        <Grid2 item = "true" xs={ 12 } sx={{ mt: 2 }}>
                            <TextField
                                label="Nombre Completo"
                                type="text"
                                placeholder='User Name'
                                fullWidth
                                name = 'displayName'
                                value={ displayName }
                                onChange={ onInputChange }
                                // Validaciones: Para cambiar el estilo de la caja de texto, en MateriaUI esta estas propiedades
                                // Tenemos que determinar si hay un error y mostrar el mensaje del Error
                                // error={true}
                                // helperText="El nombre debe ser obligatiorio"
                                // Pero esto puede ser tedioso, evaluando esto con UseMemos pero lo mejor es que la evaluacion este en
                                // customHook del useForm, por eso es que le pasamos las propiedades que obtenemos a estas propiedades
                                // Le pondemo doble negacion y le implementamos que solo cuando el Formulario se mande se activen los mensajes
                                error = { !!displayNameValid && formSubmitted }
                                helperText = { displayNameValid }
                            />
                        </Grid2>

                        <Grid2 item = "true" xs={ 12 } sx={{ mt: 2 }}>
                            <TextField
                                label="Correo"
                                type="email"
                                placeholder='example@example.com'
                                fullWidth
                                name = 'email'
                                value={ email }
                                onChange={ onInputChange }
                                error = { !!emailValid && formSubmitted}
                                helperText = { emailValid }
                            />
                        </Grid2>

                        <Grid2 item = "true" xs={ 12 } sx={{ mt: 2 }}>
                            <TextField
                                label="Constraseña"
                                type="password"
                                placeholder='Constraseña'
                                fullWidth
                                name = 'password'
                                value={ password }
                                onChange={ onInputChange }
                                error = { !!passwordValid && formSubmitted }
                                helperText = { passwordValid }
                            />
                        </Grid2>

                        <Grid2 container spacing={ 2 } sx={{ mb:2, mt:1 }}>
                            {/*     
                                    Esta parte es para mostrar el error en caso que ocurra al crear el usuario 
                                    Lo debemos de ocultar para mostrar solo cuando ocurra el error, podriamos aplicar una condicion en JS
                                    pero mejor vamos a aplicar un estilo
                            */}
                            <Grid2 
                                item='true'
                                xs={ 12 }
                                // Es doble negacion para convertirlo a un valor booleano porque si no solo seria NULL
                                // se le ponee none porque seria como la propiedad de CSS de ""display:none
                                display={ !!errorMessage ? '' : 'none'}
                            >   
                                <Alert severity='error'>
                                    { errorMessage }
                                </Alert>
                            </Grid2>

                            <Grid2 item='true' xs={ 12 } >
                                <Button 
                                    disabled={isCheckingAuthentication} // Va a estar desabilitado si esta revisando la autenticacion
                                    type='submit' // Para que se pueda ejecutar el submit
                                    variant='contained'
                                    fullWidth
                                >
                                    Crear Cuenta
                                </Button>
                            </Grid2>
                        </Grid2>

                        <Grid2 
                            container
                            direction='row'
                            justifyContent='end'
                        >
                            <Typography sx={{ mr:1 }} >¿Ya tienes Cuenta?</Typography>
                            <Link
                                component={ RouterLink }
                                color='inherit' 
                                to='/auth/login'
                            >
                                Ingresar
                            </Link>
                        </Grid2>

                    </Grid2>
                </form>
            </AuthLayout>
    )
}
