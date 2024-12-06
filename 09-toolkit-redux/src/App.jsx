import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { increment } from './store/slices/counter/counterSlice';

function App() {
  // Requerimos leer algo del Store para eso esta el UseSelector, dentro de este tenemos una funcion
  // un Callback comun y corriente que tiene como primer argumento el state y luego de ahi regresamos 
  // lo que nos interesa (Aqui le estamos diciendo que del State tome todo el objeto del "counter")
  // de ahi desestructuramos el Counter (Que es el que definimos dentro del "initialState" en el archivo "counterSlice")
  const { counter } = useSelector( state => state.counter );

  // Hagamos el dispatch de una nueva accion que es la de incrementar que exportamos en el archivo "counterSlice"
  // ahora ya no tenemos que pensar en el Tipo de la accion o el Payload sino que simplemente tomamos la accion
  // asi que tenemos que ejecutar un Dispatch (Este "dispach" ya sabe a que reducer va a llegar, ya sabe lo que nesecita)
  // debido a que la funcion se creo desde el Slide
  const dispach = useDispatch();

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {/*
            Cuando se hace click en el boton mandamos a llamar el Dispatch y la accion a ejecutar es la de increment
            como una funcion para que se ejecute (Con esto ya va a funcionar el contador con Redux)
         */}
        <button onClick={() => dispach( increment() )}>
          count is {counter}
        </button>
      </div>
    </>
  )
}

export default App
