import { useEffect, useState } from "react"

/*
    Cada vez que le damos click al boton de siguiente se hace el cambio de la URL
    se vuelve a hacer la peticion HTTP y nos demora 2 seg en darnos la respuesta por el Sleep que implementamos

    Lo del Sleep lo programas nosotros pero lo de hacer la peticion HTTP no es muy eficiente
    porque los datos de los Pokemones no cambia tan frecuentemente, es decir que los datos de los pokemones que ya previamente
    habiamos obtenido se va acumulando sea informacion, entonces estamos volviendo a pedir informacion que nosotros habiamos 
    previamente pedido
    Lo mejor es que almacenemos eso en algun lugar para que no tengamos la nececidad de volver a hacer la peticion si el URL es el mismo
    que el anterior (Vamos a incorporar el Cache)

    La idea es crearnos un objeto donde vayamos metiendo las URLs y su correspondientes datos
    asi si se vuelve a mandar una peticion que ya se ah realizado anteriormente se va a este localCache
*/
const localCache = {};

// Aqui vamos a trabar la peticion HTTP
// Como parametro le mandamos el URL a la que se le realizara la peticion
export const useFetch = ( url ) => {

    const [state, setState] = useState({
        data: null,
        isLoading: true, // Cuando se muestro componente va a montar automaticamente el useFetc y con esto este sera el estatus por defecto
        hasError: false, // Para indicar si hay algun error con la peticion
        error: null // Para el caso de mostrar el error
        // Este es nuestro estado inicial
    });

    // Para implementar la logica de la peticion HTTP (Si lo hacemos directamente con el FECTH tendriamos el mismo problema del "MultipleCustomeHook")
    // asi que se usa un useEffect que dipare la peticion HTTP, la podemos hacer directamente dentro del Hook pero mejor lo hacemo con una funcion externa
    // Este useEfect se manda a llamar inmediatamente cuando se llama el useFetch (Como tenemos el arreglo vacio solo se dispara una vez)
    useEffect(() => {
        getFetch();

    }, 
        // Aqui vamos a depender que cuando el URL cambie (Ya sea desde el padre u otro lugar) se requeiere que se vuelva a realizar la Peticion HTTP
        [url]
    );

    // Cada vez que se vuelva a hacer la peticion HTTP seria bueno poner al custom HOOK en un estado de Cargando
    // para esto creamos esta funcion que establece que ponga en Carga el Hook
    const setLoadingState = () => {
        setState({
            data: null,
            isLoading: true,
            hasError: false,
            error: null
        });
    }

    const getFetch = async () => {
        // Ejemplo de la implementacion de un API
        
        /*
                Implementacion del Cache (Cuando ya antes habiamos consultado la URL hay que hacerle que se mande al cache)
            Asi que verificamos primero si tenemos la url en el Cache local
            si esto nos da un valor (Es diferente de undefined)

            Asi ya cuando le demos click al boton de regresarse No volvera a hacer la peticion HTTP sino que
            se ira al cache y la obtencion de la informacion es instantanea

            Existe la libreria llamada "TanStack Query" que hace el manejo del Cache en las peticiones 
        */
       if( localCache[url] ){
            setState({
                data: localCache[url],
                isLoading: false,
                hasError: false,
                error: null
            });
            return;
       }

        setLoadingState();// Cada vez que la URL cambie le establecemos el loading en True

        const resp = await fetch(url);// Obtenemos la respuesta

        // Relentizamos la obtencion de los datos para mostrar por mas tiempo el mensaj de Carga con el isLoading
        await new Promise( resolve => setTimeout(resolve, 1500) );// Nos esperamos un segundo y medio

        // La respuesta puede fallar
        if( !resp.ok ){
            setState({
                data:null, // No tenemos los datos
                isLoading: false, // Ya no estamos cargando porque ya tenemos una respuesta
                hasError: true, // Si tenemos un error
                error: { // Especificamos el Error
                    code: resp.status,
                    message: resp.statusText
                }
            });
            return;
        } 

        const data = await resp.json();// Tomamos los datos en formato JSON

        // Colocamos la informacion que tenemos en "data" (Tenemos que actualizar nuestro Estado) para eso esta la funcion "setState"
        // Esta funcion "setState" cuando se usa notifica a REACT que ocurrio un cambio en el State, redibijando el componente y notificar que hay nuevos datos a quien use esos datos
        setState({
            data,
            isLoading: false,
            hasError: false,
            error: null
        });

        // Manejo del Cache
        // Alacenamos los datos en el objeto donde a al URL correspondiente le almacenamos sus daos obtenidos
        localCache[url] = data;
    }

    // Siempre hay varias maneras de hacer alog
    // Podriamos regresar todo el State pero queremos exponer la informacion de una manera muy controlada
    // Lo que regresemos aqui es lo que otros componentes podran consumir y desestructurar
    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError
    }
}