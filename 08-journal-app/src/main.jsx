import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { JournalApp } from './JournalApp'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './store/store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Implementacion del store y el patron Redux */}
    <Provider store={ store }>
      {/* Para configurar las rutas */}
      <BrowserRouter>
        <JournalApp />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)