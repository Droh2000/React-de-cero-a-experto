import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GifExpertApp } from './GifExpertApp'
// Para que el archivo del CSS sea global nos vamos al Main o al componente padre
import './styles.css';
/*
    La estrategia de archivos a seguir en React es flexible y aqui vamos a elegir para organizar 
    por modulos y funcionalidades (Hay varias alternativas)
*/

// Usualmente en el SRC solo queremos tener el punto de entrada de la aplicacion
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GifExpertApp />
  </StrictMode>,
)
