import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HooksApp } from './HooksApp'
import { CounterApp } from './01-useState/CounterApp'
import { CounterWithCustomHook } from './01-useState/CounterWithCustomHook'
import { SimpleForm } from './02-useEffect/SimpleForm'
import { FormWithCustomHook } from './02-useEffect/FormWithCustomHook'
import { MultipleCustomHook } from './03-examples/MultipleCustomHook'
import { FocusScreen } from './04-useRef/FocusScreen'
import { Layout } from './05-useLayoutEffect/Layout'
import { Memorizer } from './06-Memos/Memorizer'
import { MemoHook } from './06-Memos/MemoHook'
import { CallBackHook } from './06-Memos/CallBackHook'
import { Padre } from './07-tarea-memo/padre'
//import './08-useReducer/00-intro-reducer';
import { TodoApp } from './08-useReducer/TodoApp'

// Preparamos la aplicacion de Rutas
/*
  Este BrowserRouter es un componente de nivel superior que solo son componentes como los que creamos
  nosotros solo que la diferencia es que recibe otros componentes dentro de el (No como parametros)
  Asi este tipo de componente nos permite que todos los hijos que se encuentren dneto de el, tengan cierto
  acceso a la informacion que provee el padre

  Este componente nos da la oportunidad de movernos entre rutas, manejar la historia, movernos a otra pantalla
  estos serian provedores
*/
import { BrowserRouter } from 'react-router-dom'

import { MainApp } from './09-useContext/MainApp'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <MainApp />
    </StrictMode>
  </BrowserRouter>
)