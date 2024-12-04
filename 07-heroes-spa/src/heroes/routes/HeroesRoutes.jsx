import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from '../../ui';
import { DcPage, HeroPage, MarvelPage, SearchPage } from '../pages';

export const HeroesRoutes = () => {
    return (
        <>
            <Navbar/>

            <div className='container'>
                <Routes>
                    <Route path='marvel' element={<MarvelPage />}/>
                    <Route path='dc' element={<DcPage />}/>

                    <Route path='search' element={<SearchPage />}/>
                    {/*
                        Esta pagina de Heroe por defecto solo se muestra si estamos en el URL de "Heroe"
                        Queremos que al mandarle en la URL el ID del Heroe se nos muestre informacion de ese Heroe en particular
                        por lo que tenemos que leer los argumento de la URL

                        Entonces le especificamos aqui un Comodin con "/:" seguido de un nombre para ese argumento que vamo a tratar
                        Para atratar este argumento nos vamos al componente "HeroPage"
                    */}
                    <Route path='hero/:heroId' element={<HeroPage />}/>

                    <Route path='/' element={<Navigate to='marvel' />}/>    
                </Routes>
            </div>
        </>
    )
}
