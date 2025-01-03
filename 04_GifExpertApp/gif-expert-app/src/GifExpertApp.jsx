import {useState} from 'react';
//import { AddCategory } from './components/AddCategory';
//import { GifGrid } from './components/GifGrid';

// Gracias al Index.js implementado 
import { AddCategory, GifGrid } from './components';

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
   const [categories, setCategories] = useState(['One Punch']); 

    // Si queremos agregar un nuevo elemento al Array
    // Se le agrego el parametro que seria el tipo que se recibe en el componente "AddCategory" en la propiedad "onNewCategory"
    // este seria como un string que se recibe que se manda desde el componente "AddCategory"
    const onAddCategory = ( newCategory ) => {
        // No se puede usar PUSH() porque muta un objeto y en REACT trata de evitar las mutaciones
        // encontes la solucion seria crear un nuevo arreglo y de ahi agregarle el nuevo valor
        // La funcion "set" es la que se llama cuando queremos cambiar el elemento (Para eso esta el operador SPREAD)

        // Antes de insertar el nuevo valor vamos a verificar si ya existe en el arreglo y asi evitamos el problema de los Keys duplicados
        // Si la categoria ya existe que no haga nada y se sale de la funcion
        if ( categories.includes( newCategory ) ) return;

        setCategories( [newCategory,...categories] );
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

                Ahora tenemos que insertar el elemento al listado
                Ese listado lo tenemos en el "GiftExpertApp" llamado "categories"
                donde tenemos que actualizar ese UseState pero por medio del "AppCategory"

                Cuando demos click al formulario se manda a llamar la funcion "onSubmit" de AddCategory, entonces

                Primero se le manda una Property al AddCategory (En este caso sera una funcion)
                y ahi es donde le mandamos la referncia a la funcion, es decir "setCategories" es una
                propiedad del componente el cual va a recibir la funcion "setCategories" del hook de GiftExpert

                ---------------------------------------------------------------------------------------------------------------

                Originalmente le pasamos al componente la funcion para agregar los elementos al arreglo
                pero lo mejor es que en este componente GifExpert y el componente Addcategory solo emita el valor que queremo insertar
                ya validado y listo para ser insertado y aqui mismos dentro de la funcion onAddCategory se encarge de modificar 
                o insertar el State (Asi no ocultamos la implmentacion y es mas facil de comprender como funciona el componente)

                Para Validar que sean unicos los Nombres y asi evtiar el problema de las Keys Duplicadas
                    Hay varias formas de hacerlo pero este componente queremos que solo cree un input y emitir
                    el valor cuando la persona hace Enter, y usualmente queremos que nuestro componnente hagan un unico trabajo
                    y lo hagan bien
                    Ya que podriamos crear otra propiedad como la onNewCategory y pasarle el arreglo actual y ahi validar si el registro emitido por el usuario
                    existe o no y asi evitar tener registros duplicados. Pero esta validacion la podemos hacer aqui en el metodo antes de insertar
            */}
            <AddCategory 
                //setCategories = { setCategories } 
                
                // Nueva implementacion (Cuando le agregemos la implementacion "on" es porque esta emitiendo algo)
                // ese nombre es muy comun en los eventos, para que este argumento funcione tenemos que recivir el evento y ese evento es el que vamos a especificarlo
                // como parametro en la funcion "onAddCategory" y le mandamos la funcion que tenemos aqui pasandole el parametro "event"
                // Este Event sera el que emitia el componente AddCategory (Esta definicion es una propiedad del componente)
                onNewCategory={ event =>  onAddCategory(event)}
            />

            {/*Ya que pasamos la propiedad arriba no requerimos este: <button onClick={onAddCategory}>Agregar</button>*/}

            {/*
                Si requerimos renderizar un listado basado en las categorias

                Con <ol> colocamos para que cada iten salga enumerado
                Ahora debemos de recorrer las categorias "Categories" -> esta variable es
                un arreglo entonces podemos acceder a los metodos

                Por defecto si tenemos varias categorias declaradas nos aprecen pegados elementos 
                ademas que por defecto estos valores se estan pasando al HTML como String y deberia de 
                ser ListItems no solo texto (Asi que debemos de transformar ese arreglo pero solo visual)
            */}
            {/*<ol>*/}
                {/*
                    Para Transformar el arreglo usamos la funcion .map()
                    que nos deja recorrer cada elemento del arreglo y regresar algo nuevo
                    Dentro de la funcion flecha le podemos decir que nos retorne un <li>

                    Viendo el HTML por defecto React nos crea un "::market" para saber como se creo el elemento

                    Pero ademas debemos de agregarle un Key sino obtendremos un Warning en la consola
                    que se agrega cuando estamos construyendo de manera dinamica
                    que se pone como "key={}" que tiene que ser unica

                    REACT usa este valor de "KEY" para saber cuando un elemento se elimino, por eso en la funcion flecha no se le pasa el inidice
                    como "(category, i)" porque REACT se puede confundir al borrar un elemento
                */}
                {
                    /*
                        Aqui es donde se va a retornar varios elementos HTML (Titulo, imagen, etc)
                        entonces debemos de retornar un objeto para esto nos podemos crear un componente para agrupar todos los elementos para
                        mostrar una categoria
                        Cuando tenemos una funcion flecha donde solo tenemos el Return, en este caso siempre se omite el Return
                        y se borran las llaves (Aqui ya le agregamos el componente encargado de darle formato a las categorias donde ya recibe el Key)
                        Con Key se lo estamos mandando como una llave pero no la estariamos mandando como una propiedad, entonces se tnndria que crear
                        otra donde se mande la categoria
                    */
                    categories.map( category => (<GifGrid key={ category } category={ category } />) )
                }
            {/*</ol>*/}

        </>
    )
}
