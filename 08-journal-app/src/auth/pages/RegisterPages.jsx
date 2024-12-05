import { Grid2, Typography, TextField, Button, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AuthLayout } from '../layout/AuthLayout';

export const RegisterPages = () => {
    return (
            <AuthLayout title="Crear Cuenta">
                <form>
                    <Grid2 container direction='column'>
                        <Grid2 item = "true" xs={ 12 } sx={{ mt: 2 }}>
                            <TextField
                                label="Nombre Completo"
                                type="text"
                                placeholder='User Name'
                                fullWidth
                            />
                        </Grid2>

                        <Grid2 item = "true" xs={ 12 } sx={{ mt: 2 }}>
                            <TextField
                                label="Correo"
                                type="email"
                                placeholder='example@example.com'
                                fullWidth
                            />
                        </Grid2>

                        <Grid2 item = "true" xs={ 12 } sx={{ mt: 2 }}>
                            <TextField
                                label="Constraseña"
                                type="password"
                                placeholder='Constraseña'
                                fullWidth
                            />
                        </Grid2>

                        <Grid2 container spacing={ 2 } sx={{ mb:2, mt:1 }}>
                            <Grid2 item='true' xs={ 12 } >
                                <Button 
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
