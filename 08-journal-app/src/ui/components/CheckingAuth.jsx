/*
    Mantener el estado de la autenticacion de los usuarios
    ya que por defecto la informacion que ingresamos ya sea en el login o en el Register
    la informacion esta en memoria y cuando recargamos el navegador Toda la informacion se borra
    Aqui tenemos que hacer algo para ver la sesion del usuario y cargar el State

    En el SRC nos creamos una nueva carpeta:
        ui -> Es para componentes globales de la aplicacion

    Este componente es como una vista que vamos a utilizar para tener una pantalla de carga

*/

import { CircularProgress, Grid2, Typography } from "@mui/material"

export const CheckingAuth = () => {
  return (
    <Grid2 
            container
            spacing={ 0 } 
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
        >
            <Grid2 
                container
                direction='row' 
                justifyContent='center'
            >
                <CircularProgress color="warning"/>
            </Grid2>
        </Grid2>
  )
}
