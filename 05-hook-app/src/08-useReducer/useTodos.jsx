/*
   useReducer
   
   Este es una alternativa al useState ya que el useReducer nos ayuda cuando tenemos un estado que es mas complejo que solo un useState
   Al usar este HOOk en la desestructuracion del arreglo tenemos [state, dispatch], el dispatch es la funcion que vamos a mandar a llamar para 
   disparar y ejecutar Acciones (Mandar las acciones al Reducer)
   Tambien como argumentos al useReducer se le pude pasar una funcion de inicializacion usualmente se utiliza cuando tenemos un estado relativamente pesado 
    (Algo que toma tiempo para procesarlo) y el resultado de esa funcion es lo que va a terminar siendo el estado inicial
*/

import { useEffect, useReducer } from "react"
import { todoReducer } from "./todoReducer";

// Creamos nuestro estado inicial
const initialState = [
    /*{
        id: new Date().getTime(), // Esto es para que cada id este identificado con el momento actual
        description: 'Comer Tierra',
        done: false
    },
    {
        id: new Date().getTime() + 100, // Solo le sumamos un valor para que no vaya a registrar con el mismo ID
        description: 'Cagar Tierra',
        done: false
    }*/
];

// Hasta este punto si guardamos datos y actualizamos la pagina, perderemos informacion de todas formas 
// Esto es porque el useEffect se dispara cuando el componente se monta y tambien se dispara cada vez que los TODOS cambian
// Cuando el componente se monta por primera vez, los Todos son un arreglo vacio e inmediatamente despues es ejecuta el Efecto
// que al ver que son un arreglo vacio lo termina sobrescribiendo con un nuevo arreglo vacio
// Lo que debemos de hacer es inicializar el State con los TODOS que previamente existian en el LocalStorage para esto en el useReducer
// tenemos un tercer parametro que es una funcion que es la que inicializa el reducer
const init = () => {
    // Parseamos lo que se encuentra en el LocalStorage con la clave llamada 'todos'
    // La primera vez que se carge esto, puede ser NULO y si ese es el caso regresamos un Arreglo vacio
    return JSON.parse( localStorage.getItem('todos') ) || [];
}// Esta funcion la pasamos al "useReducer"


export const useTodos = () => {

    // El useReducer como argumento espera:
    // El Reducer, El Estado inicial (Lo llamamos "todos" que seria nuestra lista de tareas), Funcion inicializadora para un proceso pesado
    // El Reducer lo podemos crear en el mismo archivo ('TodoApp') o en otro, para esto creamos el todoReducer.js
    // El reducer no lo ejecutamos solo le pasamos la referencia de la funcion para que sea el useReducer que lo ejecute cuando tenga que hacerlo
    // La parte del "dispatch" se nombra asi cuando tenemos solo un Reducer, si tenemos mas de uno en el functionalComponent entonces es comun llamarlo 
    //      "dispatchTodo" para indicar que esta es la funcion que despacha acciones hacia ese reducer en particular
    const [todos, dispatch] = useReducer( todoReducer, initialState, init);

    /*
            LocalStorage
    
        Debemos de hacer que los TODOs no vengan del initialState (No esta mal tener un valor inicial) pero ahora queremos que 
        esta informacion sea persistente y perdure cuando la guardemos
        Los navegadores nos ofrecen el LocalStorage para almacenar
        (Las Cookies tienen menor espacio de almacenamiento porque ahi se mandan las peticiones HTTP)

        Asi que debemos de ejecutar algo cuando los TODOS cambian (Tenemos que ejecutar un efecto secundario) ese efecto
        lo hacemos mediante un useEffect (Como depende de que los TODOS cambien para volverse a ejecutar entonces esa es la dependencia)
        
        Cuando tenemos este useEffect cada vez que ocurra un cambio ya sea que insertemos, eliminamos o actualizemos, esto va a hacer que automaticamente
        se guarde en el local Storage
    */    
    useEffect(() => {
        // Aqui tenemos que leer los Todos y Serializarlos porque en el LocalStorage no podemos grabar objetos, solo pueden ser Strings
        // Guardamos en el LocalStorage
        localStorage.setItem('todos', JSON.stringify( todos ));

    }, [todos]);

    // Aqui recibimos el nuevo TODO creado en el componente TodoAdd
    /*
        Agregar un Nuevo TODO
        Como nuestro estado es controlado por un Reducer entonces esa logica va dentro de ese Reducer
        Este "todo" seria el "payload" que queremos enviar al Reducer para agregar
    */
    const handleNewTodo = ( todo ) => {
        // Creamos la accion que vamoa a enviar con la accion a realizar
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }
        
        // Para mandarle la accion al Reducer usamos el "dispatch"
        dispatch( action );

        // Asi modificamos el arreglo que al ocurrir cambios en el State entonce React Redibuja el componente
    }

    // Para elminar un TODO (Usamos la misma logica que la de Agregar)
    /*
        Podemos mandar la funcion en el componente como referencia para que sea el componente el que lo llame
        En este caso vamos a mantener el mismo patron en el cual el Componente "TodoList" emita el evento
    */
    const handleDeleteTodo = ( id ) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        })
    }

    // Para Marcar un TODO como Pendiente o Completado
    const handleToggleTodo = ( id ) => {
        // Ya mandada la funcion desde los padres hasta el hijo que dispara el Evento Click
        // Es el momento de preparar los Reducer para agregar la accion de cambiar el estado del TODO
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id
        })
    }

    return {
        todos,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
        // Para obtener todas las tareas que tenemos registradas en el TODO
        todosCount: todos.length,
        // Obtener la cantidad de TODOS que no estan completados
        pendingTodosCount: todos.filter(todo => !todo.done).length, 
    }
}