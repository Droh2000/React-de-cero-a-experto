import {HeroCard} from '../components'
import { useForm } from '../../hooks/useForm'
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string'
import { getHeroesByName } from '../helpers';

export const SearchPage = () => {

    // Este se requiere para poner lo buscado en el Query de la URL
    const navigate = useNavigate();

    // Para leer el Query Parameter lo obtenemos de la localizacion donde nos encontramos actualmente en el HTML
    const location = useLocation();

    // Para hacer el trabajo de tomar el QueryParameter puede ser complicado porque asi como viene puede ser que este
    // ?q=superman pero tambien puede venir ?q=superman&asc=true para que este ordenado de manera asendente (Con esto tenemos dos
    // argumentos, uno que es del Query y otro de estar en escendente)
    // Para simplificar la extraccion de los mismos hay muchas formas y para este caso vamos a instalar una libreria
    //          yarn add query-string
    // El "queryString" lo usamos para extraer todos lo que se encuentra en el objeto del SEarch
    // Hay que tener presente que siempre va a recibir Strings, aunque sea numero
    // De aqui desestructuramos para tomar siempre el parametro "q" y si no viene sera un String vacio
    const { q = '' } = queryString.parse( location.search );

    // Funcion para regresar el Heroes que se buscaron creada dentro de la carpeta Helpers
    // Aqui ya obtenemos la cantidad de heroes que encuentre basados en la palabra buscada
    const heroes = getHeroesByName(q);

    // No hace falta usar un useState porque se reconstrute el componnente cada vez que el query cambia
    // Esto lo usamos para implementanrlo en la condicion del Style de los mensajes de HTML que estan Abajo
    const showSearch = (q.length === 0);
    // Si el usuario ya escribio algo y el query no regreso nada
    const showError = (q.length > 0) && heroes.length === 0;

    // Hook para el uso del Formulario que ya habiamos creado
    // Como objeto inicial se le pasa la formacion que nesesitamos que requiera
    // El "name" que especificamos en el INPUT es el mismo que especificamos como primera propiedad que
    // seria para establecer el valor a ese campo
    const { searchText,onInputChange } = useForm({
        // Para cuando nosotros realizamos la busquedad y carge el componente lo igualamos al valor que tenemos en el Query
        // para que mantenga el valor que le escribio el usuario que antes al recargar la pagina se perdia el valor en el INPUT
        searchText: ''
    });

    const onSearchSubmit = (event) => {
        event.preventDefault(); // Para evitar que haga un Full Refresh
        // Validacion para que no busque texto menor a un carcter
        //if ( searchText.trim().length <= 1 ) return;

        // Queremos que lo que escribamos en el INPUT se establezca en el Query de la URL
        // para esto requerimos la instruccion para navegar a otra pantalla porque en teoria es otra pantalla
        // aunque vamos a apuntar a la misma. Pra esto usamos el UseNavigate() para apuntarlo a la misma ruta
        // donde nos encontramos estariamos indicando solo como un String Vacio y para indicar el Query parameter
        // seria "?q=" igual a lo que la persona escribiio que esta en "searchText", aqui mismo le indicamos metodos de limpieza
        navigate(`?q=${ searchText }`);
    }

    return (
        <>
            <h1>Search</h1>
            <hr />

            <div className="row">
                <div className="col-5">
                    <h4>Searching</h4>
                    <hr />
                    {/*
                        Usamos un Form para detectar cuando precionan Enter, disparar el Subimt 
                        Al INPUT le especificamos el "name" para despues tomar el valor del Input
                        y establecerlo en algun lugar

                        Estamos esperando obtener un QueryParameter que al escribir en el Input el texto se mandara a la URL
                        y dependiendo de lo obtenido vamos a generar unos ciertos de mensajes, Entonces al escribir en la caja de texto
                        y al tocar el boton de Search o hacer el Form Submit deberia de volver a hacer una peticion a esta misma pantalla pero 
                        cambiando la parte del URL
                        Cuando se agrega "/" al URL seria un Segmento pero si ponemos un "?" seria informacion adicional que le estamos mandando
                        al componente, este Query Parameter nos sirve para realizar la busquedad cuando el componente se va a renderizar y asi mostrar esa 
                        informacion, de hecho cuando hacemos el Search y cambiamos la URL no nesesariamente hace un FullRefresh, simplemente es una navegacion
                        y vamos a detectar los cambios en ese Query Parameter

                        Para tener el Control de Formulario vamos a implementar el HOOK del "useForm" que ya habiamos creado (Este esta dentro de la carpeta de Hooks global)
                        Asi que conectamos nuestro INPUT al HOOK especificandoles los parametros "VALUE" y "ONCHANGE"
                        otra cosa es que cuando disparamos el Submitt del formulario  le establecemos en el "OnSubmit" esa funcion
                    */}
                    <form onSubmit={ onSearchSubmit }>
                        <input 
                            type="text"
                            placeholder="Search a Hero"
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value={ searchText }
                            onChange={ onInputChange }
                        />

                        <button className="btn btn-outline-primary mt-1">
                            Search
                        </button>
                    </form>
                </div>

                {/* Aqui vamos a mostrar los resultados de la busquedad obteniendolos con la variable "q" que tiene el QueryParameter
                    detectando si tenemos contenido en esa variable entonces se mostrara uno y otro mensaje que tenemos aqui abajo

                    Para ocultar o mostrar los mensajes podemos implementar varios condicionales
                */}
                <div className="col-7">
                    <h4>Results</h4>
                    <hr />
                    {/* Este es un mensaje que se mostrar cuando la persona no ah buscado nada, el otro es un mensaje si no encontro nada 
                        ( q === '' )
                        ?
                        <div className="alert alert-primary">
                            Search a Heroe
                        </div>
                        : ( heroes.length === 0) && <div className="alert alert-danger">
                            No Hero Found with <b>{ q }</b>
                        </div>
                    */}

                    {/* Otra forma de hacer lo de arriba porque vemos que es dificil de leer, entonces podemos crear
                        un componente especializado que se encarge de mostrar los mensajes

                        Primero vamos a implementarlo con clases CSS
                        Asi el espacio se quita y se quita el elemento pero igual sigue existiendo dentro del HTML
                        y aqui mismo le aplicamos la condicion para mostrar u ocultar
                    */}
                    <div 
                        className="alert alert-primary animate__animated animate__fadeIn"
                        style={{display: showSearch ? '' : 'none'}}
                    >
                        Search a Heroe
                    </div>
                    {/* Para la condicion de este se complica un poco porque requrie que evaluemos mas cosas entonces para no amontonar
                    codigo aqui nos creamos una funcion afuera para implementar la logica */}
                    <div 
                        className="alert alert-danger animate__animated animate__fadeIn"
                        style={{display: showError ? '' : 'none'}}
                    >
                        No Hero Found with <b>{ q }</b>
                    </div>


                    {/* Si se encontro la Respuesta  mostramos los resultados*/}
                    {
                        heroes.map( hero => (
                            <HeroCard key={hero.id} {...hero} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}
