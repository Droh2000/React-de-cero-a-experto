import { Navigate, Route, Routes } from "react-router-dom"
import { JournalPages } from "../pages/JournalPages"

export const JournalRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={ <JournalPages /> } />

            {/* Cualquier otra ruta que nos sea la de arriba nos mandara a ESTA */}
            <Route path='/' element={ <Navigate to='/' /> } />
        </Routes>
    )   
}
