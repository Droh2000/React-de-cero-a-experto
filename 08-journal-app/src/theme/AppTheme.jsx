/*
  En este Proyecto instalamos Material UI

  La idea es que utilizemos componentes ya creados para agilizar el desarrollo de nuestro proyecto
  Despues de toda la instalacion por linea de comandos, tenemos que realizar algunas configuracion
  dentro de nuestro codigo (Para no meter todo el codigo dentro del "main.jsx" creamos la capeta "Theme"
  y dentro de ahi el archivo "AppTheme"

  Este sera un componente de orden superiro que recibe al componente hijo
  al cual le afectaran el codigo de la configuracion del Matria UI
*/
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { purpleTheme } from './purpleTheme';

// Este lo podemos poner en el Main pero en este caso lo pusimos en el JournalApp para que el main se mantenga corto
export const AppTheme = ({ children }) => {
    return (
        <ThemeProvider theme={ purpleTheme }>
            {/* Esto es para que siempre se mantenga el mismo formato y estilo sin importar le navegador */}
            <CssBaseline />

            { children }
        </ThemeProvider>
    )
}