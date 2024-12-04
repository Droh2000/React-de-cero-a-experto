import { Navigate, useNavigate, useParams } from "react-router-dom"
import { getHeroById } from "../helpers";
import { useMemo } from "react";

export const HeroPage = () => {

    // Con este Hook tratamos los argumentos que recibimos por la URL
    // Con este recibimos la informacion almacenada en el parametro del "heroId" en la URL
    // que espacificamos en la ruta de "HeroesRoutes" (Con este Hook obtenemos el segmento del URL que especificamos)
    const { heroId } = useParams();

    // Para obtener el Heroe en base al ID creamos un funcion dentro de la carpeta Helpres
    // Hay que recordar que cualquier sea por la cual REACT vuelva a redibujar este componente, este funcion se volveria
    // a disparar, Para ese caso podriamos pensar en memorizar ese reultado en el cual si el ID no cambia
    // entonces no deberia volver a llamar esta funcion
    // Tambien podria pasar que no solo este componente cambie sino que lo haga el componente padre y ese sea el responsable de 
    // hacer que este componente se vuelva a redibujar 
    // Recordemos: "useMemo" para memorizar Funciones "useCallback" para memorizar Funcion 
    // El "useMemo" va a disparar su funcion interna cada vez que sus dependencias cambien que seria el HeroId
    // cuando cambie el ID va a volver a dispara la funcion, nada mas no porque el componente se redibujo
    const hero = useMemo( () => {
        getHeroById( heroId );
    }, [heroId]); 

    // Funcion para el boton para regresarnos a Atras
    const navigate = useNavigate();

    const onNavigateBack = () => {
        // Si le pasamos -1 esto nos va a regresar el historial anterior
        navigate(-1);
    }

    // Si nos mandan un ID que no existe vamos a obtener un Undefined y cuando usemos propiedades
    // como: "undefined.nombre" vamos a obtener un error, entonces tenemos que filtrar
    // Si el ID no existe queremos sacar al usuario de esta pantalla y redirigirla a otra que si existe (En lugar de eso podriamos aplicar solo un mensaje 404 o muchas otras cosas)
    // Al ser un archivo JSX tenemos que retornar un Functional Component
    if( !hero ){
        return <Navigate to="/marvel"/>
    }

    return (
        <div className="row mt-5">
            <div className="col-4">
                <img 
                    src={`/assets/heroes/${ id }.jpg`}
                    alt={ hero.superhero }
                    className="img-thumbnail animate__animated animate__fadeInLeft"
                />
            </div>

            <div className="col-8">
                <h3>{ hero.superhero }</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>Alter ego:</b> {hero.alter_ego}</li>
                    <li className="list-group-item"><b>Publisher:</b> {hero.publisher}</li>
                    <li className="list-group-item"><b>First Appearance:</b> {hero.first_appearance}</li>
                </ul>

                <h5 className="mt-3"> Characters</h5>
                <p>{ hero.characters }</p>

                <button
                    className="btn btn-outline-primary"
                    onClick={ onNavigateBack }
                >
                    Regresar
                </button>

            </div>

        </div>
    )
}
