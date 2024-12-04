import { useState } from "react"
import { UserContext } from "./userContext"

/*
    Este seria como un componente cualquiera solo que con una caracteristica diferente
    Los componentes de nivel superior se diferencian que en las properties a parte de tener 
    cualquier otra que se le puede mandar, tambien vamos a recibir el Children (Los componentes hijos
    que va a tener)

    El UserContext lo creamos porque nos permite saber como luce la informacion que vamos a colocar ahi
    y tambien nos va a servir para que el Hook de REACT busque ese contexto y para definir el Proveedor

    Objeto de ejemplo para retornarlo
*/
/*const user = {
    id: 122,
    name: 'nada',
    email: 'example@example.com'
}*/

export const UserProvider = ({ children }) => {
    {/*
        Implementamos el context
        El Children lo vamos a renderizar adentro donde no importa cuantos vengan
        Aqui igual podemos implementar cualquier elemento HTML que queremos que contengan todas
        estas paginas.

        Ahora si definimos solo como <UserContext> no seria un Provider, es una forma de usar nuestro cotnexto
        pero para que funcione como provider le tenemos que agregar el ".Provider" para que pueda proveer
        toda la informacion que el "UseContext" va a proporcionarle al arbol de los componentes y el valor que vamos
        a compartirle es el que definimos en "value= {}" entre llaves para compartir un objeto (Esto es lo que cualquier
        hijo de este UserProvider va a poder obtener del este UserContext) aqui en este value podemos poner lo que queramos
        (Normalmente es un objeto que contiene toda la informacion del Usuario)

        Para usarlo tomamos el "UserProvider" y lo tenemos que colocar en el punto mas alto donde los hijos lo pueden utilizar
        usualmente se coloca bien arriba en el arbol de componentes, este caso seria en el "MainApp" ya que no hay nada 
        mas arriba (Solo seria el BrowserRouter) el chiste es colocarlo en donde los hijos van a empezar a utilizar esa Data
        (Esto lo colocamos en lugar del Fragmento)
    */}

    // Este es el usuario que vamos a regresar en el Value
    const [user, setUser] = useState();

    return (
        /* Ahora nuestro Objeto de Aqui queremos que no carge la informacion de Entrada  
        <UserContext.Provider value={{ hola: 'mundo', user}}>
        
            Si queremos cambiar la informacion que esta en el Provider y que 
            cuando ocurra un cambio en el provider podamos utilizar el UseEffect
            o cualquier renderizacion de React (Para este caso usamos el UseState)

            Ahora en el "LoginPage" tenemos un boton donde al precionarlo queremos establecer el usuario
            que seria llamar al "setUser" (Hay varias formas de hacer) 
            podemos mandar la funcion directamente en el VALUE= pero no se recomienda
            porque le da demaciado valor a los componentes pero por ahora lo vamos a poner asi
            para cambiar el usuario
        */
        <UserContext.Provider value={{ user, setUser }}>
            { children } 
        </UserContext.Provider>
    )
}
