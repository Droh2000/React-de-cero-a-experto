// Estos dos son para renderizar la aplicacion
import React from 'react';
import ReactDOM from 'react-dom/client';
// Estilos globales de la APP
import './style.css'

// Importamos componente
// Si tendriamos varias exportacion en el mismo archivo entonces donde va el nombre ponemos
// { App, ... } -> asi metemos lo que queremos importar de todo lo disponible
// Si es Exportacion por Defecto NO puede ir entre llaves porque todo lo exportado caera sobre ese nombre
import { App, InitialApp } from './InitialApp';

import SecondComponent from './SecondComponent';
import { CounterApp } from './CounterApp';

// Renderizar la aplicacion
// dentro del createRoot seleccionamos del index.html el id=root
ReactDOM.createRoot( document.getElementById('root') ).render(
    // Se aconseja que trabajemos en el modo estricto para saber en donde hay errrores
    // Dentro renderizamos la Funcion
    <React.StrictMode>
        <App />
        {/* Mandarle La propiedad que espera el componente  
            Si requerimos que sea un numero lo que le enviamos le pasamos el valor entre llaves

            Al configurar los PropTypes si le pasamos un tipo de dato no permitido nos saldra error en la consola
            si no le mandamos nada igual nos dara error
        */}
        <InitialApp title="JODERRRR" nombre={123}/>
        <SecondComponent />
        <CounterApp value={0}/>
    </React.StrictMode>
)


