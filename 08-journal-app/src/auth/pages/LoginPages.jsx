import { Grid2, Typography, TextField, Button, Link, Alert } from '@mui/material';
import { Google } from '@mui/icons-material';
// Le cambiamos el Nombre al Link del REACT para que no ocurran conflictos con el de Material
import { Link as RouterLink } from 'react-router-dom';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-router-dom';
import { checkingCredetianls } from '../../store/auth/authSlice';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/thunks';
import { useMemo } from 'react';
/*
    El diseno de este y el del Registro es LITERALMENTE el mismo, lo unico que cambia
    es un formulario entonces podemos reutilizar todo esto
*/
export const LoginPages = () => {

    // Debemos de tener cuidad que al estar abierta la ventana del PopUp de Google el usuario no deba de poder volver a 
    // hacer click en los botones, para esto obtenemos lo que nos interesa del Store
    // Con el "status" vamos a evaluar y asi no obtenemos nigun error solamente se cambia al estado de no sutenticado
    // Tomamos del Store el mensaje del Error
    const { status, errorMessage } = useSelector( state => state.auth );

    const dispatch = useDispatch(); // Lo usamos para las tareas asyncronas

    // Con el uso del CustomHook le especificamos como queremos que lusca el formulario
    const { email, password, onInputChange } = useForm({
        // Solo le especificamos informacion de relleno
        email: '',
        password: ''
    });

    // Vamos a memorizar el resultado que obtenemos el "status", le ponemos como dependencia el Status
    // para que cada vez que cambie se vuelva a recalcular el valor
    const isAuthenticating = useMemo( () => status === 'checking', [status]);

    // Estas dos funciones son siempre tareas asyncronas (Para esto creamos en /store/auth/thunks.js)
    // Aqui esta tratando de autenticarse con Email y contrasena
    const onSubmit = ( event ) => {
        event.preventDefault();

        // Implementar la logica en Login que al precionar el boton verifique el usuario y la constasena en Firebase
        // Debemos de evualar el dispatch de la accion por el Thunks.js, esto seruia una accion asyncrona que haga 
        // el proeses de autenticacion
        // Para esto creamos en thunks.js las funciones de: startLoginWithEmailPassword
        // y en la parte de providers.js creamos loginWithEmailPassword
        // Entonces tenemos que hacer el Dispatch del Thunk que creamos que internamente esta va a llamar la que implementamos en el provider
        
        // Hacemos el dispatch de la accion que tenemos en el thunks.js y le mandamos el email y password
        dispatch( startLoginWithEmailPassword({ email, password }));
    }

    // Disparar la parte de la autenticacion de Google
    const onGoogleSignIn = () => {
        dispatch( startGoogleSignIn() );
    }

    return (
            /*
                Para no tener este codigo Duplicado vamos a crear el LAYOUT
                ya que la pagina de Register es muy parecida del Login, solo cambia pequenas cosas en el Login
                En este caso creamos el AuthLayout.jsx 
                Implementacion del Layout y solo le metemos la parte que va a cambiar en la pantalla 
            */
            <AuthLayout title="Login">  
                <form onSubmit={ onSubmit }>
                    <Grid2 container direction='column'>
                        {/* Cada Grid de tipo ITEM toma por defecto el tamano de los TextField  
                            Aqui le definimos que en pantalla pequenas tendra XS=12 que son 12 columnas
                            (Material manejar un sistema parecido al Bootstrap en el que se tienen espacios de 12 posiciones)
                                Si decimos que tenga un XS=6 seria la mitad de la pantalla
                            Ademas esta libreria trabaja con el MobileFisrt en que estos disenos se aplican a los celulares solamente
                            y para pantalla mas grandes tenemos que especificar el parametro de MD=VALOR, este MD sera el valor que tome por
                            defefecto y como se achique se ira acoplando al XS
                        */}
                        <Grid2 item = "true" xs={ 12 } sx={{ mt: 2 }}>
                            {/* Este es para poder Escribir */}
                            <TextField
                                label="Correo"
                                type="email"
                                placeholder='example@example.com'
                                fullWidth
                                name='email'
                                value={ email }
                                onChange={ onInputChange }
                            />
                        </Grid2>

                        <Grid2 item = "true" xs={ 12 } sx={{ mt: 2 }}>
                            <TextField
                                label="Constraseña"
                                type="password"
                                placeholder='Constraseña'
                                fullWidth
                                name='password'
                                value={ password }
                                onChange={ onInputChange }
                            />
                        </Grid2>
                        
                        {/* Mostrar el mensaje de error cuando se equivoce que el usuario */}
                        <Grid2 
                            container
                            display={ !!errorMessage ? '' : 'none'}
                            sx={{ mt:1 }}
                        >
                            <Grid2
                                item='true'
                                xs={ 12 }
                            >
                                <Alert severity='error'>{ errorMessage }</Alert>
                            </Grid2>
                        </Grid2>

                        {/* Esta parte va a contener los elementos, el spacing es entre los hijos  */}
                        <Grid2 container spacing={ 2 } sx={{ mb:2, mt:1 }}>
                            {/* El tamano dependera de la configuracion donde por defecto podemos defininr de las maquenas
                                    esto es: XS, SM, MD, XL
                                En este caso en pantalla no tan pquenas que pusimos 6 siginifica que podemos poner dos
                                elementos uno al lado del otro (Esto pasara en pantalla no ta pequenas y cuando sea muy pequenas 
                                el boton ocupara todo el tamano)
                            */}
                            <Grid2 item='true' xs={ 12 } sm={ 6 }>
                                {/* Los botones se van a deshabilitar si se esta autenticando osea se tiene abierta la ventana del PopUp de Google*/}
                                <Button  
                                    disabled={ isAuthenticating }
                                    type='submit' // Este boton va a disparar el Submit del formulario
                                    variant='contained'
                                    fullWidth // Esto quiere decir que se extendera a todo el tamano que tenga el Padre que es el Grid Item
                                >
                                    Login
                                </Button>
                            </Grid2>

                            <Grid2 item='true' xs={ 12 } sm={ 6 }>
                                <Button
                                    disabled={ isAuthenticating } 
                                    variant='contained'
                                    fullWidth // Esto quiere decir que se extendera a todo el tamano que tenga el Padre que es el Grid Item
                                    onClick={ onGoogleSignIn }
                                >
                                    <Google />
                                    <Typography sx={{ ml:1 }} >Google</Typography>
                                </Button>
                            </Grid2>
                        </Grid2>

                        {/* Para movernos a la pagina de Registro */}
                        <Grid2 
                            container
                            direction='row'
                            justifyContent='end'
                        >
                            {/*
                                Para esto sabemos que estamos trabajando con el REACT Routerdoom por lo que requerimos usar
                                nuestro componente de LINK pero tambien le tenemos que decir a Materia como queremos que lusca los
                                LINKS entonces requerimos usar dos LINKS que esos componentes se llame igual en los lugares

                                Materia usa el objeto LINK que se llama igual al de REACT

                            */}
                            <Link
                                component={ RouterLink } // Aqui le definimos el Componente de REACT para que ejectue las acciones
                                color='inherit' // Le decimos que herede el color que ya se trae antes
                                to='/auth/register'
                            >
                                Registrarse
                            </Link>
                        </Grid2>

                    </Grid2>
                </form>
            </AuthLayout>
    )
}