import { Grid2, Typography } from '@mui/material';

// El contenido que vamos a meter aqui es lo que sabemos que requerimos reutilizar para la pagina Login y register
export const AuthLayout = ({ children, title = '' }) => {
    return (
        // El Grid es como un DIV pero viene con propiedades interesantes 
        <Grid2 
            container
            spacing={ 0 } // Para que no haiga ningun espacio entre los hijos
            direction="column" // Esto es como definirle el FlexBox
            alignItems="center"
            justifyContent="center"
            /*
                Para definir los colores en Material le podemos defininr el SX (Style Extended)
                    con este tenemos acceso al Tema que deinimos en el Theme.Provider
                tambien tenemos un XS pero este hace referencia a al Tamano de la pantalla

                Aqui lo definimos para que use todo el tamano que tenga disponible y el color de fondo
                sera establecido por lo que ya definimos en el PurpleTheme en la parte del objeto de Primary
            */
           sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
        >
            {/*
                Aqui definimos la Caja que queremos poner en el medio de la pantalla
            */}
            <Grid2 
                item = "true"
                className = 'box'    
                xs = { 3 } // Este es el tamano de la pantalla
                sx = {{ 
                        width: { sm: 450 }, // Esto se aplicara solo en pantallas medianas 
                        backgroundColor: 'white',
                        padding: 3, 
                        borderRadius: 2 }} // Este es el estilo
            >
                {/* Este texto tambien variara que seria el titulo del Login y Register porque lo recibimos como argumento */}
                <Typography variant='h5' sx={{ mb:1 }} >{ title }</Typography>

                {/* En este espacio va el componente Children dinamico */}
                { children }

            </Grid2>
        </Grid2>
    )
}
