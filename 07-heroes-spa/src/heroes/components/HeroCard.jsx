import { Link } from 'react-router-dom';

// Componente que solo se usa en el componente de abajo para filtrar cuales personajes tienen mas de un nombre
// y que sean diferentes, si ese es el caso mostramos los diferentes nombres que usa el Heroe
const CharactersByHeroe = ({ alter_ego, characters }) => {
    // Si tiene nombres repetidos no mostramos nada 
    if ( alter_ego === characters ) return (<></>);
    // Caso contrario tegresamos los nombres un un parrafo
    return <p>{characters}</p>

}

// Vamos a recibir todas las propiedades desestructuradads que son las priopiedades de nuestro objeto en la carpeta "data"
export const HeroCard = ({
    id,
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters
}) => {

    // Tomamos las imagenes
    const heroeImageUrl = `/assets/heroes/${ id }.jpg`;

    return (
        <div className="col animate__animated animate__fadeIn">
            <div className="card">
                <div className="row no-gutters">
                    <div className="col-4">
                        <img src={ heroeImageUrl } className="card-img" alt={ superhero } />
                    </div>
                    <div className="col8">
                        <div className="card-body">
                            <h5 className="card-title">{ superhero }</h5>
                            <p className="card-text">{ alter_ego }</p>
                            {/*
                                Como algunos personajes aparece el nombre muchas veses porque tienen diferentes identidades
                                pero otros solo tienen una identidad pero en esto aparece el nombre dos veses, entonces queremos
                                mostrar esas identidades solo si los nombres son diferentes

                                Hay varias formas de hacer eso:
                                    Una es usando una condicional
                            {
                                ( alter_ego !== characters ) && (<p>{ characters }</p>)
                            }

                                El codigo de arriba es dificil de leer, podemos pensar en crear una constante primero
                                que almacene solo el fragmento del HTML y esa pasarselo a la parte de arriba donde esta 
                                el elemento
                                Ahora tambien nos podemos crear un comoponente externo en este mismo archivo que solo va a funcionar aqui
                                (Esta funcion se encarga de renderizar lo que nesesitamos)
                            */}
                            <CharactersByHeroe characters={characters} alter_ego={alter_ego}/>

                            <p className="card-text">
                                <small className="text-muted">{ first_appearance }</small>
                            </p>

                            {/* Nos vamos a una pantalla diferente para mostrar mas informacion del Heroe
                                Para hacer la navegacion con REACT esta el componente LINK

                                Aqui tenemos la pagina "Hero" que seria la ruta a la que queremos mandar pero para que nos mande de manera diferente de modo
                                que sea diferente para cada Heroe que se le de click, entonces debemos mandar el argumento por el URL (Seria el ID)
                                Aun asi al hacer click no se mostrara nada porque no tenemos definido esa ruta pero el URL si obtiene el ID
                                Podriamos pensar que aqui se nos mostraria el COMODIN que creamos en la ruta que es a donde se va cuando definimos una ruta
                                que no existe, pero el comodin lo estamos usando en la Ruta global de "AppRouter.jsx" pero para la ruta de HeroesRoutes no
                                tiene nigun comodin

                                Leer El Argumento Por URL



                            */}
                            <Link to={ `/hero/${id}` }>
                                Mas...
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}