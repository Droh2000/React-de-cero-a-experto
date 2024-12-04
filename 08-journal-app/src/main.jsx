import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { JournalApp } from './JournalApp'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Para configurar las rutas */}
    <BrowserRouter>
      <JournalApp />
    </BrowserRouter>
  </StrictMode>,
)
