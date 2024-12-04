import { Hijo } from './Hijo'
import { useCallback, useState } from 'react';

/*
    Este componente tiene implementado el componente hijo
    y con la memorizacion tenemos que evitar que se vuelva a regenrar 

*/

export const Padre = () => {

    const numeros = [2,4,6,8,10];
    const [valor, setValor] = useState(0);

    /*
        Si desde el componente padre le estamos mandando la funcion "incrementar" al hijo
        y si esta funcion no esta memorizada no pasara nada cuando pongamos "React.memo()"
        encerrando todo el componente hijo

        Ahora en el padre tenemos ue memorizar la funcion de incrementar
        usando el CallBack
    */

    /*const incrementar = ( num ) => {
        setValor( valor + num )
    }*/
    const incrementar = useCallback(
        (num) => {
            /*
               Al implementar lo de React.memo en el componete hijo e implementar el useCallback
               en el Padre, Ya no se vuelve a llamar el componente Hijo PERO no se estan incrementando los 
               valores 

               Lo que pasa es que estamos llamando dentro el "setValor" y vamos a tener el valor anterior en 
               la definicion de la funcion Flecha (oldValue) y vamos a tomar ese oldValue sumandole el nuevo numero
            */
            setValor( (oldValue) => oldValue + num );
        }, []
    );


    return (
        <div>
            <h1>Padre</h1>
            <p> Total: { valor } </p>

            <hr />

            {
                numeros.map( n => (
                    <Hijo 
                        key={ n }
                        numero={ n }
                        incrementar={ incrementar }
                    />
                ))
            }
            {/* <Hijo /> */}
        </div>
    )
}
