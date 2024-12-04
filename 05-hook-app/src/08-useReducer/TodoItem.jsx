
// Recibimos parametro que nos manda el componente padre para eliminar el TODO
// En el evento del boton mandamos a llamar la funcion

export const TodoItem = ({ todo, onDeleteTodo, onToggleTodo }) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            {/*
                Marcar como completado o Pendiente un TODO
    
                Esta logica la podemos implementar en varios lugares, pero lo vamos a hacer en TodoItem  porque ahi tenemos el elemento que le hacemos click
                donde podemos hacerlo en todo el ListItem o solo en el SPAN (Aqui es donde lo vamos a agregar)
                Gracias a REACT podemos agregar Listener en cualquier parte de la aplicacion

                En este caso empezamos desde el Hijo hasta los demas padres

                Cuando hacemos click queremos que se ejecute la funcionde "onToggleTodo( ID )"
                (Definimos la funcion Flecha porque no nos interesa nada del parametro "event")
                De Aqui nos vamos al TodoList.jsx 

                Despues de implementada la logica en el REDUCER
                Vamos a hacer que se tache el TODO en la Interfaz
                El "className" lo ponemos como una Expreccion de JS {} y le cambiamos las comillas por ``
                y agregamos la expreccion con ${} para agregar una condicion, asi si es TRUE le agregamos la clase de Bootstrap

                    Esta forma de implementar esto no es lo ideal porque si "todo.done" es FALSE estaremos agregando una clase en HTML class="false"
                    por eso usamos el condicional Ternario y le agregamos un espacio blanco si no se cumple
            */}
            <span 
                className={`align-self-center ${ todo.done ? 'text-decoration-line-through' : ''}`}
                onClick={ () => onToggleTodo( todo.id ) }
                >
                    { todo.description }
            </span>

            <button 
                className="btn btn-danger"
                onClick={ () => onDeleteTodo( todo.id ) }
            >Borrar</button>
        </li>
    )
}