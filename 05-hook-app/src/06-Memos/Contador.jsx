// Vamos a memorizar el componente para que cuando cambie el componente Padre no cambie tambien este
// Esta es una forma de implementar esto:
// "memo" es una funcion con la que React memoriza el componente (Encerrramos todo el componente en parentecis)
// Asi solo cuando los properties cambie es cuando se renderiza este componente
import { memo } from 'react';

// En algunos proyectos no es comun ver esto importado asi sino que solo es:
// React.memo( ... )
// Esto aplica cuando estamos en CLI o en React de manera Global porque lo imporamos en los Scripts
// entonces funcionaria asi, pero si estamos con YARN no va a funcionar y se tiene que importar como
// import React from 'react';


// Desestructuramos los parametros que recibe el componente porque sino tendriamos "props"
export const Contador = memo(({ counter }) => {

    console.log('Me volvi a dibujar');

    return (
        <small>{ counter }</small>
    )
})
