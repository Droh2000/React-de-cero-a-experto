import {useState} from 'react';
import { AddCategory } from './components/AddCategory';

// Componente
/* 
    Esto estara dividido en tres partes
        {Titulo}
        {Input} -> Para introducir algo que deberia de estar como un componente externo para manipularlo y probarlo
        {Listado de Gifs}
            {"Item del Gif"}

    Los HOOKS para ser identificados por REACT es por su posicion en la forma en la que estan creados
    (No por algun Nombre), si tubieramos mas un UseState estarian todos posicionales segun su declaracion
    NO SE RECOMIENDA colocar Hooks dentro de una condicion y si se cumple que ejecuta porque REACT perderia
    la realcion que hay en las posiciones de los Hooks

    No HACER:
            if(Condicion){
                Hook
            }
    
*/
export const GifExpertApp = () => {
    /*
    Vamos a requerir un listado de las categorias que queremos buscar para encontrar ese conjunto de Gifs
    entonces seria como Almacenar el Listado y esa forma de almacenarla tiene que percsitir conforme nosotros
    estamos trabajando en la aplicacion.
    Cuando queremos almacenar informacion y esa informacion tiene que cambiar el HTML lo primero que debemos de pensar es
    en un HOOK para manter el estado (Existen varios que mantienen el estado) uno seria:

        useStateSnippet + tab -> Esto nos crea: la desestructuracion y la igualacion del Hook
        Como punto inicial del estado (Si no especificamos nada sera un undefined)
        
        Este useState se tiene que importar

        Asi tenemos un espacio en memoria que nos va a servir para manejar en este caso las categorias

        El estado inicial sera de un Arreglo y le podmos pasar un valor inicial de una categoria  
    */
   const [categories, setCategories] = useState(['One Punch', 'Porno']); 

    // Si queremos agregar un nuevo elemento al Array
    const onAddCategory = () => {
        // No se puede usar PUSH() porque muta un objeto y en REACT trata de evitar las mutaciones
        // encontes la solucion seria crear un nuevo arreglo y de ahi agregarle el nuevo valor
        // La funcion "set" es la que se llama cuando queremos cambiar el elemento (Para eso esta el operador SPREAD)
        setCategories( [...categories, "otro"] );
        // Otra forma de hacer es pasarle un Callback con la instancia local como parametro
        //         setCategories( cat => [...cat, "otro"] );
    }

    return (
        <>
            <h1>GiftExpertApp</h1>

            {/*
                INPUT -> Donde queremos escribir y de aqui que se agrege una nueva categoria
                PERO hay que saber que podemos crear toda la aplicacion en un uncio componente pero la
                realidad es que cada componente realize una accion en especifico

                Asi que separamos los componentes en la carpeta pertinente
            */}
            <AddCategory/>
            <button onClick={onAddCategory}>Agregar</button>
            {/*
                Si requerimos renderizar un listado basado en las categorias

                Con <ol> colocamos para que cada iten salga enumerado
                Ahora debemos de recorrer las categorias "Categories" -> esta variable es
                un arreglo entonces podemos acceder a los metodos

                Por defecto si tenemos varias categorias declaradas nos aprecen pegados elementos 
                ademas que por defecto estos valores se estan pasando al HTML como String y deberia de 
                ser ListItems no solo texto (Asi que debemos de transformar ese arreglo pero solo visual)
            */}
            <ol>
                {/*
                    Para Transformar el arreglo usamos la funcion .map()
                    que nos deja recorrer cada elemento del arreglo y regresar algo nuevo
                    Dentro de la funcion flecha le podemos decir que nos retorne un <li>

                    Viendo el HTML por defecto React nos crea un "::market" para saber como se creo el elemento

                    Pero ademas debemos de agregarle un Key sino obtendremos un Warning en la consola
                    que se agrega cuando estamos construyendo de manera dinamica
                    que se pone como "key={}" que tiene que ser unica
                */}
                {
                    categories.map( category => {
                        return <li key={ category } >{ category }</li>
                    })
                }
            </ol>

        </>
    )
}
