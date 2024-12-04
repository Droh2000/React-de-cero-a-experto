/*
    Aqui estamos trabajando con Contexto que seria toda la estructura de componentes de la aplicacion
    donde ademas estamos utilizando varios componentes de nivel superior donde adentro le mandamos componentes.
    hijos. Si miramos el BrowserRouter (El componente que activa el manejo de rutas e implementamos en el Main)
    automaticamente ya nos genera un Router, Navigation.Provider, Location.Provider (La palabra "Provider" indica
    que esta dando algo, por ejemplo el Navigation nos ofrece cierto control sobre la navegacion y el otro para
    la localizacion)

    No es la unica razon pero es uno de los usos en los cuales se requiere un Contexto para cuando requerimos compartir
    informacion entre paginas
    Si queremos compartir informacion entre paginas, en este punto en nuestra aplicacion solo el <Routes> y dentro los <Route>
    Si algo fuera generado en el AboutPage no le podemos compartir informacion al Login porque fisicamente son hermanos
    Podriamos pensar que desde el MainApp le comparta la informacion a los hijos pero si los datos no se generan directamente
    en el AboutPage sino que esta dentro de algun componente que esta dentro de otro componente que esta dentro del AboutPage
    (Anteriormente tubimos que crear un puente para pasar la informacion entre componentes) y no quremos estar haciendo esa 
    tecnica en cada rato, lo mejor es que cuando algo necesita informacion simplemente deberia de ir al Contexto
    tomarlo de ahi y ya

    Para esto creamos un nuevo directorio llamado "context" Pudemos tener varios contextos (Lugares Centralizados) en la aplicacion 
    
    Empezamos creando el UserContext de tipo JSX porque basicamente un Context es un componente de nivel superior, importamos la libreria
    para crear el Context Especializado.
    La funcion de "createContext()" pide un valor cualquiera, usualmente aqui se define el estado inicial que queremos que tenga
    pero tambien podemos dejarlo en blanco, este es el valor que vamos a exponer a todos los componentes que quieran tomar informacion de
    este contexto

    Asi son basicamente, Solo dos lineas para crear un Contexto pero para el PROVIDER si se le agregara mas logica entonces ya es decicion
    de nosotros si queremos definir aqui mismo el Provider o en otro archivo

*/
import { createContext } from 'react'

export const UserContext = createContext();