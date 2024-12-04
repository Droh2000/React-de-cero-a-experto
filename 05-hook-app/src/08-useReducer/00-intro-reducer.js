// Implementacion de un Reducer por nosotros (Antes de usar el Hook)
// Estamos creando un TODO de Listas de Tareas

// Estado Inicial (Asi es como queremos que este nuestra aplicacion o una parte de esta)
const initialState = [{
    id: 1,
    todo: 'Cagar parado en el monte',
    done: false
}];

// Un Reducer es solo una funcion
// Los Reducer se utilian cuando tenemos un objeto algo elaborado y queremos hacer varios cambios al mismo y cuando manejar la logica con
// una sola variable no seria el caso poque podemos usar un UseState para ese caso
// De argumentos le mandamos el State que sera por defecto igual al estado inicial
// el "action" es el que le va a decir al Reducer como queremos que cambie el estado
const todoReducer = ( state = initialState, action = {} ) => {// Si no nos mnada ninguna accion por defecto sera un objeto vacio

    // Aqui dentro tenemos que hacer algo con el STATe porque si recibimos la ACTION y esta no modifica nada del STATE entonces nos retornara
    // el mismo valor del STATe que se tenia, si queriamos hacer la modificacion del State (El termino correcto seria regresar un nuevo STATE)
    // Primero identificamos el tipo de Accion
    if( action.type === '[TODO] add todo' ){
        // Regresamos el nuevo estado
        // Primero desestructuramos el estaod anterior y agregamos del "action" el payload porque es lo que esperamos de la Accion de este tipo
        // NUNCA usar el PUSH porque este nos mutua el estado
        return [ ...state, action.payload ];
    }


    // Cumplimos la condicion de que siempre debe de regresar un estado o alguna forma del estado 
    // que se mire como un objeto, arreglo, lo que requieramo almacenar
    return state;
}

// Utilizar el Reducer
let todos = todoReducer();

// Si queremos agregar un nuevo elemento podriamos pensar en usar el Push y va a funcionar
/*
    todos.push({
        id: 2,
        todo: 'Cagar Sentado en el jardin'
        donde: true
    });
*/
// PERO lo de arriba es algo que no se debe de hacer porque como estamos en REACT, esto nos crea una
// mutuacion no nos va a redibujar nada y es una mala practica cuando mutamos el estado de esta manera

// Cuando queramos hacer una modificacion al Reducer le tenemos que mandar una ACCION y eso es lo que le va a decir
// como va a modificarse, asi que nos creamos un nuevo TODO
const newTodo = {
    id: 2,
    todo: 'Cagar Sentado en el jardin',
    donde: true
}
// Este newTodo se lo tenemos que mandar al Reducer para que produsca un nuevo estado y eses nuevo estado debera de tener los dos TODOs
// Entonces mandamos a llamar el Reducer y le mandamos El estado anterior o el InitialState y la Accion, estas se programan como de la 
// siguiente forma:
const addTodoAction = {
    // Usualmente se manda la accion con lo que requiramos pero hay un estandar donde tenemos algo llamdo "Type"
    // y el valor pude ser un simple String con el nombre que queramos darle (Con este sabemos cual fue la accion que se disparo)
    type: '[TODO] add todo',
    // Esto seria lo que le queremos mandar a la Accion y el nombre que se le pone a lo que contiene la informacion a mandar es 
    // payload que serua la Carga que esta en la accion
    // No siempre tendremos que definir este porque puede que sea la accion para borrar todos los TODOS entonces solo requerimos saber el tipo de accion
    payload: newTodo
}
// Lo de arriba es la accion y es lo que le mandamos al Reducer
todos = todoReducer( todos, addTodoAction );

// Esto seria todo lo del Reducer (Con el REDUX seria lo mismo pero este tiene otra capa para hacer tareas asyncronas), donde tenemos un estado inicial
// eso se lo mandamos al Reducer, el reducer en todo momento debe de saber cual es el estado anterior y vamos a tener una accion
// Cuando queremos agregar algo o eliminar algo o algun tipo de proceso, vamos a mandar alguna accion a nuestro Reducer, esa accion es la que se va a encargar
// de regresar un nuevo estado en el cual el Payload de la accion o dependiendo de la accion que sea va a regresar un nuevo estado
// Cuando se recibe una accion que no esta identificada porque no esta en la condicion entonces no ocurre un cambio del estado (Regresamos el mismo estado y para REACT
// no pasa nada entonces no gasta recursos redibujando la parte que modifica el estado)
