import { useForm } from "../hook/useForm";

/*
    Tenemos que emitir el nuevo valor convertido en un objeto de TODO
    para eso vamos a recibir la funcion que hace esa tarea que es "onNewTodo"

    Aqui dentro de la funcion "onFormSubmit" le mandamos todo el nuevo TODO creado
*/
export const TodoAdd = ({ onNewTodo }) => {

    /*
        Aqui utilizamos el HOOK que ya tenemos para manejar el formulario
        En Hook/useForm donde ya manejamos el estado del formulario, el cambio en el input
        y reset en caso de limpiarlo

        En el useForm vamos a mandar un objeto en el cual en el campo "description" es donde se almacena
        lo que escribe el usuario en el INPUT
    */
    const { description, onInputChange, onResetForm} = useForm({
        description: ''
    });

    const onFormSubmit = (event) => {
        event.preventDefault();

        if(description.trim().length <= 1) return;

        const newTodo = {
            id: new Date().getTime(),
            description: description.trim(),
            done: false
        }

        onNewTodo(newTodo); // Esto es lo que estamos emitiendo (El nuevo TODO creado)

        onResetForm();
    }

    return (
        <form onSubmit={ onFormSubmit }>
            {/* 
                Para que el Hook del formulario funcione debemos de darle un "name" al input porque es como la
                funcion del "onInputChange" recibe para identificar el input

                
            */}
            <input 
                type="text"
                placeholder="¿Que hay que hacer?"
                className="form-control"
                name="description"
                value={ description }
                onChange={ onInputChange }
            />
            <button type="submit" className="btn btn-outline-primary mt-1">
                Agregar
            </button>
        </form>
    )
}
