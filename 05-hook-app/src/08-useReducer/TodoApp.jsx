
import { TodoList } from "./TodoList";
import { TodoAdd } from "./TodoAdd";
import { useTodos } from "./useTodos";

export const TodoApp = () => {

    /*
        El componente por si solo se volvio complejo asi que vamos a crear un componente que tendra la logica
        y solo vamos a dejar aqui el retorno del HTML

        Creamos el CustomHook "usetodo"
        Debemos exponer varias cosas: "todos", los 3 metodos "handle" (EStos los vamos a retornar en un Objeto)
        Al implementar el componente Aqui desestructuramos el todos y los handlers

        Podriamos pensar en usar este CustomComponente en los componente que reciben los TODOS para no pasar el paraemtro por padre, padre, hijo
        pero asi como tenemos la logica del CustomHook cada vez que se inicializae o se use un componente que utiliza el Custom Hook
        nos va a crear una nueva instancia del mismo por tanto tendriamos separada la parte de los TODOS (Cada vez se nos crea una intancia en cada llamada)
        (Para un caso como esto lo mejor es el HOOK UseContext)

        Aqui esta toda la logica para manejar el componente del TodoApp.jsx
    */
    const { todos, handleNewTodo, handleDeleteTodo, handleToggleTodo, todosCount, pendingTodosCount} = useTodos();

    return (
        <>
            <h1>TodoApp: {todosCount}, <small>pendientes: {pendingTodosCount}</small></h1>
            <hr />

            <div className="row">
                <div className="col-7">
                    {/*
                        En un punto tenemos todo en un unico archivo y eso como desventajas es que tenemos un componente muy grande
                        que es deficil de leer, de identifiar los elementos y si vamos agregando mas items
                        este codigo va a empezar a leer

                        Componente TODO LIST (Pasar los "todos" como una property) 

                        Le agregamos el evento para que emita el  de eliminar y aqui recibimos el ID que se lo mandamos a la funcion

                        Aqui tenemos nuestro Reducer y ahi es donde tenemos alojado nuestro State, este State de alguna manera tiene que llegar a modificarse dependiendo de las acciones que nuestros componentes
                        estan haciendo, hay varias tecnicas que podemos hacer para la creacion de nuestros componentes en lo cual como aqui que estamos 
                        creando componentes personalizados del TODO NO se encargen de mandar a ejectuar la funcion porque nosotros perfectamente podemos mandarle el DISPATCH
                        dentro de cada componentes y sean estos que hagan la logica directamente para asi no tener que mandar asi estas funciones pero eso ocultaria la implementacion del mismo
                        y puede que en el futuro usemos este componente pero en otro lugar implementado o solo con una cierta accion
                        Entonces aqui estamos trabajando con este patron en el cual los componentes se encarguen de emitir el valor o los eventos que estamos esperando

                        En este caso la logica del boton de eliminacion lo que hace es que el componente hijo "TodoItem" emite el ID cuando se hace clik, este valor se lo manda al "TodoList" que 
                        le manda el valor al "TodoApp" (Aqui es donde manejamos el ID)

                        El "onToggleTodo" es para manejar los TODOS como Pendientes o Completados
                    */}
                    <TodoList 
                        todos={todos} 
                        onDeleteTodo = { id => handleDeleteTodo(id) } 
                        onToggleTodo = { handleToggleTodo }
                    />

                </div>

                <div className="col-5">
                    <h4>Agregar TODO</h4>
                    <hr />

                    {/* Componente TODOADD 
                        Al darle click al boton capturemos el valor del INPUT
                        y que el componente imita ese valor (onNewTodo( TODO )) que deberia de ser todo un TODO
                        que tendra los mismos campos que establecimos arriba
                    */}
                    <TodoAdd onNewTodo={handleNewTodo}/>

                </div>
            </div>        
        </>
    )
}
