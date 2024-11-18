// Recordemos los Export e Import para usar el componente afuera

// Todo en React comienza con un componente o Functional Compponent (Porque son basados en funciones)
// ese seria el punto de entrada de la aplicacion y ese compontne en si es una funcion
// Empezar el nombre con mayusculas (Los componentes NO se definen en el mismo archivo Main)
export function App(){
    // Aqui estaria nuestra aplicacion
    return <h1>Hola Mundo</h1>
}

// Ejemplo de Exportacion por Defecto
// function App(){
//     return <h1>Hola Mundo</h1>
// }
// export default App;

// Componente con Funcion Flecha
// Comunicacion entre Componentes (Props) estas son las propiedades que le esamos mandando a esa funcion
//  que es un objeto y siempre se desetructuran, estas nos permiten establecer un canal de comunicacion
//  entre el padre (Que es el React.StrictMode) hacia el componente hijo

// PoprType (Tipos de las Propiedades) -> En vite esto no viene instalado por defecto
import PropTypes from 'prop-types';
// Con esto le podemos definir los tipos a las Pops

// export const InitialApp = ( props ) => {
export const InitialApp = ( {title, nombre} ) => { // Lo comun es desetructurar solo lo que nos interesa (Tambien le podemos establecer un valor por defecto)

    // Si queremos poner el parametro del title como Obligatorio podriamos poner esto:
    // Sin embargo  este codigo esta dentro del componente, incrementa la complejidad
    /*if( !title ){
        throw new Error('El titulo no existe');
    }*/// PARA ESTO EXISTEN LAS PROPTYPES


    // De los Props podemos mandar a llamar lo que esperamos a rrecibir
    return (
        <>
            {/*<h1>{ props.title }</h1>*/}
            <h1>{ title }</h1>
            <p>{ nombre }</p>
        </>
    )
}

// Definir las PropsTypes (No es obligatorio definirlos todos)
// por convencion definen al final de todo
InitialApp.propTypes = {
    // El parametro del titulo nos interesa que sea un String
    // Ademas le establecesmos que sea obligatorio
    title: PropTypes.string.isRequired,
    nombre: PropTypes.number
}

// DefaultProps (Mandar Valores por Defecto) 
export const TirdComponent = ({
    // Esta es una forma de definir las propiedades por defecto
    title,
    cont //= 'Contenido por defecto' 
}) => {
    return (
        <> 
            <p>{ title }</p>
            <p>{ cont }</p>
        </>
    )
}

// Propiedades por defecto Abajo (Estos se ejecutan primero que los PropTypes)
TirdComponent.defaultProps = {
    // Creamos las propiedades e incluso invertarnos aunque no esten definidas en la funcion
    // El CONTENIDO que se envia aqui tiene que coincidir con el tipo de dato especificado en el PropType
    title: 'No hay titulo',
    cont: 'No hay Contenido',
    otra: 'Inventada'// No obtendremos error pero si se envia al Fronted
}