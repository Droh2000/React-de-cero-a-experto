// Reducer para usar en TodoApp

export const todoReducer = ( initialState = [], action ) => {
    // Definimos las acciones que puede realizar (Le mandamos el tipo de Accion)
    switch (action.type) {
        // Definimos los nombres de nuestras acciones
        case '[TODO] Add Todo':
            // Cuando nos falta por implementar algo y lo queremos dejar en pendiente lo podemos poner asi
            //throw new Error('Action.type = ABC no esta implementada');

            // Debemos de regresar un nuevo State que como es un Arreglo entonces regresamos esto
            return[
                // Primero esparcirmos cada uno de los elementos que se encuentran dentro del Arreglo
                // y luego agregamos un nuevo valor (En el Action esta el nuevo dato a insertar)
                ...initialState, action.payload
            ];
        // Eliminar un TODO
        // En este caso se estaria mandando en el "payload" todo el Todo o solo el ID y el chiste es que mantengamos la misma logica
        // por ejemplo si en los demas casos buscamos un TODO igualmente manderle en el payload el ID o todo el TODO segun el caso
        case '[TODO] Remove Todo':
            // Del initialState podemos filtrar donde esta funcion nos regresa un nuevo arreglo que el cual si podemos usar porque no estamos
            // mutuando el arreglo como con el PUSH
            // Dentro del FILTER vamos a regresar todos los TODOS siempre y cuando el todo con ese ID sea diferente del ID que estamos recibiendo
            return initialState.filter( todo => todo.id !== action.payload );

        case '[TODO] Toggle Todo':
            // Usamos el MAP para transformar el arreglo en otra cosa (Esta funcion nos regresa un nuevo arreglo, no es el mismo)
            return initialState.map( todo => {

                if( todo.id === action.payload ){ // el payload contiene el ID del TODO
                    // Regresamos un nuevo TODO
                    return {
                        ...todo, // Esparcimos las propiedades
                        // Tomamos especificamente la propiedad que queremos cambiar
                        done: !todo.done // Asi si estaba en True se cambiara a False y si estaba en False se cambiara a True
                    }
                }

                return todo;// Tenemos que regresar lo mismo que sea el estado inicial
            });

        default:
            // Cualquier accion no registradad siempre se regresara el estado inicial
            return initialState;
    }
}