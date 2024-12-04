import { TodoItem } from "./TodoItem"

// El "onDeleteTodo" es para que emita la accion de eliminar un TODO
// Ahora este componente no es el que lo emite sino que es el componente hijo "TodoItem" asi que le podemos mandar como referencia la funcion y aplicarle la misma logica
// En este caso no queremos que la funcion hija llame la funcion y ejecute todo el codigo, asi que aqui lo llamamos "onDeleteTodo" para que nos traiga la funcion que va mandar a llamar
// osea que va a mandar a llamar la que recibimos como paramtero "onDeleteTodo" y le pasamos el ID
// Lo que estamos haciendo es tomamos la funcion que recibimos en las props y mandarla a llamar en este punto con esa funcion que pasamos para parametro
// El patron REDUX y el useContex nos ayudan a evitar esto de padre pasarle parametros al hijo y este haga las acciones
export const TodoList = ({ todos = [], onDeleteTodo, onToggleTodo }) => {
    return (
        <>
            {/* Le ponemos como <ul> para nosotros ponerle los numeros manualmente a la lista de TODOs */}
             <ul className="list-group">
             {
                 // Creamos los items basados en la cantidad de TODOS que tenemos
                 todos.map( todo => (
                     // Elemento Personalizado "TodoItem" (Mandar la informacion correcta de los TODOs)
                     // Aqui la funcion onDeleteTodo nos va amandar aqui el ID del TODO a eliminar que esto se lo manda al "TodoApp.jsx" para aplicar la elminacion
                     // La funcion "onToggleTodo" se la mandamos al hijo para que maneje lo de marcar un TODO como pendiente o completado
                     <TodoItem 
                        key = {todo.id} 
                        todo = {todo} 
                        onDeleteTodo = { id => onDeleteTodo(id)}
                        onToggleTodo = { onToggleTodo }
                    />
                 ))
             }
            </ul>
        </>
    )
}