// Si queremos regresar arios elementos 
// En versiones antiguas de React se mete todo en un DIV (un nodo padre)
// Pero puede que no queramos agregar otro elemento porque nos puede romper los estilos
// o estamos cargando mas informacion que no tien razon de existir

// Para eso se inventaron los Fragmentos (Asi regresamos un grupo de elementos que estan en el mismo nivel jerarquico)
// que se pueden importar y declarar de manera explicita o solo con poner las <> </>
// react entiende que se trata de un fragmento
import { Fragment } from "react"

// REGLA: Siempre debemos regresar almenos un Nodo Padre y dentro pueden ir la cantidad de elementos que queramos
// Entre llavez {} dentro del componente podemos incluir codigo de JS pero esta EXPRECCION NO DEBE DE SER UN OBJETO
// Que sea una Expreccion y NO un objeto
const message = "Joder Tio";
// const message = [1,2,3,4,5,6,7,8,9]; -> Nos muestra cada uno de los elementos por separado
// const message = true; -> No saldra nada redenrizada
// const message = {message:'hola'}; -> Dara Error toda la aplicacion
// Cuando obtenemos un NULL, UNDEFINED o BOOL no va a aparecer en el componente
/*
    Para Usar el Objeto se tiene que mandar a llamar por cada uno de sus atributos
        { message.Atributo }

    Si queremos imprimir literal el Objeto lo metemos dentro de una expreccion de React
        { JSON.stringify( message ) }
*/

/*
    Para el caso de las funciones

    Estas si las podemos usar en el componente pero CUIDADO si es asyncrona porque esto es una promese y es un objeto
    por tanto nos dara ERROR (Errores de dependencia Ciclica)
    
    Si la funcion no depende de nada que este dentro del componente entonces lo recomendable es que este definida afuera
    para que REACT no este creandole asignacion de memoria
*/
const funcionExtra = () => {
    return {
        nombre: "mario",
        apellido: "lopez",
        edad: 89
    }
}

const SecondComponent = () => {

    // Si aqui no estamos cambiando el elemento y no tiene ninguna relacion con algun HOOK
    // entonces no es recomendable que este dentro de la funcion y mejor este afuera
    // Asi cuando se requiera ser renderizado el componente no estara gastando React memoria

    return (
      //<Fragment>
      <>
          <h1>{ message }</h1>
          {/*<code>{JSON.stringify(funcionExtra())}</code>*/}
          <p>{ funcionExtra().nombre }</p>
      </>    
      //</Fragment>
    )
}

export default SecondComponent
