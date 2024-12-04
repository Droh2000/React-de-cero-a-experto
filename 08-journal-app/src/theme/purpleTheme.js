import { createTheme } from '@mui/material'; // Queremos el estilo de materia
// Esto es para usar los diferentes colores
import { red } from '@mui/material/colors';

// Esta funcion tiene un tema por defecto pero nosotros sobrescribimos lo que nosotros queramos
export const purpleTheme = createTheme({
    // Aqui definimos los colores que queremos que tenga nuestra aplicacion
    palette: {
        primary: {
            main: '#262254'
        },
        secondary: {
            main: '#543884'
        },
        error: {
            main: red.A400
        }
    }
});