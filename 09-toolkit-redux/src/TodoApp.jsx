import { useState } from "react";
import { useGetTodoQuery, useGetTodosQuery } from "./store/apis/todosApi"

export const TodoApp = () => {

    // De aqui tenemos muchas cosas que las podemos desestructurar pero por ahora
    // solo nos interesa sacar la Data y si esta cargando
    // "data" la renombramos como "todos"
    //const { data: todos = [], isLoading } = useGetTodosQuery();

    // Este hook lo usamos para cambiar el numero del Todo que queramos obtener
    const [ todoId, setTodoId ] = useState(1);

    // Este es el otro customHook que se nos Genera para el endpoint que creamos para obtener un Todo por el ID
    // Aqui usamos el cache de la peticion, es decir si volvemos a llamar el TODO con el mismo ID en el mismo tiempo
    // nos va a regresar este mismo valor sin hacer una peticion HTTP
    const { data: todo, isLoading } = useGetTodoQuery(todoId);

    // Esto nos maneja el cache de manera automatica que por defecto tiene un minuto de duracion en el Query de este CustomHook
    // esto lo podemos parametrizar para cambiar el lapso de tiempo

    const nextTodo = () => {
        setTodoId( todoId + 1 );   
    }

    const prevTodo = () => {
        if( todoId === 1 ) return;
        setTodoId( todoId - 1 );   
    }

    return (
        <>
            <h1>Todos -RTK Query</h1>
            <hr />

            <h4>isLoading: { isLoading ? 'True' : 'False' }</h4>

            <pre>{ JSON.stringify(todo) }</pre>

            {/*<ul>
                { todos.map( todo => {
                        <li key={ todo.id }>
                            <strong>{ todo.completed ? 'DONE' : 'Pending' }</strong>
                            { todo.title }
                        </li>
                })}
            </ul>*/}
            
            <button
                onClick={ () => prevTodo() }
            >
                Prev Todo
            </button>
            <button
                onClick={ () => nextTodo() }
            >
                Next Todo
            </button>
        </>
    )
}