import { useEffect, useState } from "react";
import { getGifts } from "../../helpers/getGifs.";
import { GifItem } from "./GifItem";
import { useFetchGifs } from "../hooks/useFetchGifs";

// Componente para mostrar la categoria
export const GifGrid = ({ category }) => {

    // Peticion HTTP (Para traernos la informacion del API)
    // Esta no es la mejor practica para realizar esto porque
    // ESTAMOS OBLIGADOS A PONER LA FUNCION DENTRO DEL COMPONENTE? Solo depende el parametro Category pero la podemos recibir como argumento
    // y asi sacar esta funcion (Asi no se vuelve a asignar un espacio en memoria cuando el componente se uelve a redibujar)
    // PERO CADA VEZ QUE OCURRA UN CAMBIO EN NUESTRO ESTADO se vuelve a disparar todas las peticiones HTTP
    // porque nunca se deben colocar la ejecucion de una funcion directamente en un Functional Component (Si ya recibimos la categoria
    // solo se debe ejecutar una unica vez esa funcion, No importa si se actualiza el componente, no se debe ejecutar la peticion HTTP)
    // Para eso existe un HOOK
    // UseEffect: Este nos sirve para disparar efectos secundarios (Un efecto es un proceso que queremos ejecutar cuando algo suceda)
    // por ejemplo cuando algo cambie queremos disparar un efecto (Podemos disparar efectos en cualquier punto que queramos)
    // En este caso cuando el componente se renderiza por primera vez, nosotros ahi y solo ahi queremos disparar la peticion HTTP

    // Requerimos un estado local para mantener las imagenes que vengan de la Categoria y este estado se mantiene cuando se redibuja el componente
    // Esto lo inicializamos como un arreglo vacio para no mostrarlo hasta que no tengamos las imagenes 
    // La variable "images" es la que vamos a usar para mostrarla dentro de la Categoria
    /*const [images, setImages] = useState([]);*/
    
    // Implementacion del Hook (Asi no se vulve a llamar toda la peticion HTTP con cada vez que se agrega una categoria)
    // Como primer argumento es una funcion que seria el efecto que queremos disparar (En este caso nuestra funcion)
    // Segundo parametro es una lista de dependencias que son las condiciones con las cuales queremos volver a ejecutar ese Callback
    // si no definimos la lista eso quiere decir que el hook solo se va a disparar la primera vez que se crea el componente
    //useEffect(() => {
         // Cuando agregamos una nueva categoria solo se ejeecuta la peticion HTTP correspondiente a esa categoria porque 
         // esto es asi porque en nuestro GifExpertApp cada  vez que se crea una nueva categoria, esa vuelve a crear el componente GifGrid
         // pero no los anteriores y estos se mantienen igual por eso no se vuelven a disparar (La nueva categoria entra a GifGrid y se va al UseEffect)
         // osea se vuelve a crear, usa el efecto y listo
         // getGifts(category);
    //}, []);

    // Para establecer las imagenes, requerimos llamar el setImages()
    // No PODEMOS HACERLO ASI:
    // En JS al usar un ASYNC estamos regresando implicitamente una promesa y esto es algo que no le podemos pasar al UseEffect
    // y lo que espera es una funcion
    /*useEffect(async () => {
        const newImages = await getGifts(category);// Como esto es una promeso podemos establecer el awai
        setImages(newImages);// Establecemos las imagenes
    }, []);*/
    
    // Una alternativa a la solucion de arriba
    // Con esto tenemos el State con las imagenes pero esto puede no ser muy legible por tener anidado una una promesa
    /*useEffect(() => {
        getGifts(category).then(newImages => setImages(newImages));
    }, []);*/

    // Para separar mas el codigo de arriba nos creamos una funcion (Esta la metoemos dentro del useEffecto para que no se dispare muchas veses)
    /*
    
    const getImages = async() => {
        const newImages = await getGifts( category );
        setImages(newImages);
    }

    useEffect(() => {
        getImages();
    }, []);
    
    */

    /*
        Custom Hook

        Este es un Hook que vamos a crear desde Cero
        estos se crean para cuando queramos que tengan relacion con algun estado o queremos reutilizar ciertas funcionalidades

        Por ejemplo en este caso dentro del GifGrid
            Si se nos ocurre mostrar un mensaje de que se esta cargando las imagenes podriamos crear otro UseState
            y dentro del metodo "getImages" sabiamos segun el cambio de su valor en True o False, si estamos cargando o no
            pero con esto ya estamos empezando a meter mucha logica y todo esta relacionado entre si 

            El useEffect que solo manda a llamar el getImages(), ademas todo este codigo que tenemos arriba lo podemos resumir
            en un CustomHook para que eventualmente podamos desestructurar como un objeto (Para que podamos regresar lo que sea)
            El nombre que empieze con "use" es un estandar para los Hooks y le mandamos la categoria, de aqui podemos recibir muchas cosas
            y sacar todo lo que requieramos (Todas las lineas de codigo de arriba las resumimos a solo una linea de codigo) asi para cuando
            requerimos otro componente que tambien necesita acceso a las imagenes y cargarlos en base a una categoria solo implementamos este hook
    */
    const { images, isLoading} = useFetchGifs( category );


    // Estructuramos como queremos que se muestre la categoria
    return (
        <>
            <h3>{ category }</h3>
            {/*
                Hay varias formas de implementar la logica de la carga
                una es crearnos un componente al que le madaramos el "isLoading" que seria igual al isLoading
                Pero aqui solo vamos a implementar la logica con un condicional Corto
            */}
            {isLoading && (<h2>Cargando...</h2>)}
            

            {/*
                Implementacion del CSS dentro de un componente de un JSX
                No podemos usar directamente el CLASS = "clase de CSS" porque esta palabra ya esta reservada para este lenguaje
                en este caso se usa ClassName que seria lo equivalente a lo del HTML
            */}
            <div className="card-grid">
                {
                    /*
                        Devemos de creamos una lista de manera dinamica basada en la cantidad de imagenes que tenemos almacenadas
                        en la variable "Images", se le especifica el key para que no de error por llaves duplicadas
                        (Aqui estamos aprovechando para usar el identificador unico que nos da el API para las imagenes)

                        Para que esto no cresca en mucho codigo lo mejor es que crear otro componente que nos sirva mostrar bien eststructurada la informacion
                        A este componente le dembemos de pasar las propiedades que recibimos aqui con el MAP()
                        le podemos pasar la "images" directamente o cada una desestructuradas {id, title, url}

                        Lo que vamos a hacer aqui es:
                            Esparcir las propiedades (Tenemos que mandar el title y el URL y esos estan dentro de "images")
                            asi que usamos el operador SPREAD (...) para esparcir todas las propiedades que tenga el images
                    */
                    images.map((images) => (
                        <GifItem 
                            key={images.id}
                            //images={ images }
                            //title={images.id}
                            //url={images.url}
                            { ...images }
                        />
                    ))
                }
            </div>
        </>
    )
}
