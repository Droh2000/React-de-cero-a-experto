import { useState } from "react";

export const Message = () => {

    // Este hook de UseEffect por defecto consta de 3 partes
    //  La funcion que seria el cuerpo
    //  El Return que seria una funcion de limpieza (Esto se utiliza cuando queremos limpiar, cancelar algo (Como un Listener) para evitar que sigua consumiendo memeoria )
    // Para apreciar esta funcion en accion tenemos que crear un componente que pueda Montar y Desmontar ("Message.jsx")
    /*
        No vamos a tener ninguna dependencia entonces el useEffect se disapara cuando el componente se monta la primera vez

        Lo que pasa aqui es que cuando se muestra el mensaje en SimpleForm.jsx se mete al UseEffect y nos muestra 
        el mensaje de que se monto y cuando ocurre el cambio en SimpleForm.jsx y ya no se cumple la condicion para mostrar
        el mensaje entonces sale que se Desmonto
        (Con esto podemos ejecutar codigo cuando el componente se muestra o se destruye)
        Esto NO APLICA si estamos usando clases de manera condicional con "className" ya que nunca veremos la parte de que se Desmonto porque el componente seguiria ahi solo que esta como invisible
        En este caso cuando se Desmonta el componente deja de existir fisicamente en nuestro codigo
    */
    /*useEffect(() => {
        console.log("El componente se monto");

        return () => {
            console.log("El componente se Desmonto");
        }
    }, [])*/

    // Aplicacion de porque usar la parte de la limpieza en el UseEffect
    useEffect(() => {

        // Cuando el componente se monta nos vamos a crear un Listener
        // Vamos a esuchar todos los movimientos del mouse
        //window.addEventListener( 'mousemove', (event) => {
            // Cuando se dispare el movimiento del mouse vamos a ejecutar este codigo
            // console.log(event);
            // Podriamos esperar que cuando el mensaje ya no se muestra entonces el evento tendria que dejar de existe pero NO
            // Aunque se quite el mensaje (Se dejo de cumplir la condicion) sigue activo el listener
            // POR CADA VEZ que activamos y volvemos a activar la condicion para mostrar el mensaje se esta creando un Listener
            // aqui es donde tendriamos una Fuga de memoria (podria ser que una peticion HTTP se este llamando infinitas veses)

            // En este caso vamos a mostrar las coordenadas 
            //console.log(event.x, event.y);
        //} );
        // ----------------------------------------------------------------------------------------------------------------------------------------

        // Hacer la limpieza en el RETURN para cuando ya no se muestre el componente se Desactive el Listener
        // Para remover tenemos que hacer referencia al espacio en memoria donde esta definida la funcion y por eso se acustumbra
        // que cuando queremos limpiar algo lo definimos al inicio
        // En este caso desestructuramos el { event } para obtener el valor de las coordenadas
        const onMouseMove = ({ x,y }) => {
            const coords = { x, y };
            console.log(coords);        
        }
        
        // Cuando el componente se crea por primera vez toma el onMouseEvent creando el Listener que apunta a la funcion "onMouseMove"
        window.addEventListener( 'mousemove', onMouseMove );

        return () => {
            // Removemos el Listener indicandole la referencia a la funcion
            // Por eso se creo la funcion aparte y no dentro de listener porque en este caso al pasarle la funcion
            // le estamos pasando el mismo espacio en memoria
            window.removeEventListener( 'mousemove', onMouseMove );
        }
    }, [])

    // Si no lo hacemos correctamente o no hacemos la limpieza
    /*const [coords, setCoords] = useState({x: 0, y: 0});

    useEffect(() => {
        
        const onMouseMove = ({ x,y }) => {
            setCoords({ x,y });
        }

        window.addEventListener( 'mousemove', onMouseMove );

        return () => {
            // Si no removemos el Listener entonces cuando muevamos el mouse vamos a intentar actualizar el estado
            // de un componente que ya no esta montado, es decir que ya no existe 
            // En las antiguas versiones de REACT  nos marcaran un ERROR en las versiones mas nuevas esto estaria mas controlado
            // para no hacer cambios en el State de un componente que no esta montado (PEro igual es un problema que se debe evitar)

        }
    }, []);*/

    return (
        <>
             <h3>Usuario ya existente</h3>
             {/* Usamos el JSON para mostrar los Objetos Correctamente en el HTML*/}
             {/* JSON.stringify( coords ) */}
        </>
    )
}

