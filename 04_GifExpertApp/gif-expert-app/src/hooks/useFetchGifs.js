/*
        Custom Hook

    El Hook es solo una funcion que regrese algo por eso aqui solo es un Return que regresa un objeto
    esto no es un FunctionalComponent porque no esta regresando JSX
*/

import { useEffect, useState } from "react";
import { getGifts } from "../../helpers/getGifs.";

export const useFetchGifs = ( category ) => {// Recibimos lo que nos manda GifGrid

    const [images, setImages] = useState([]);// El Hooks personalizados pueden tener estados independientes

    /*
        Para la parte del Loading
            Podriamos crearnos un unico UseState para manejar todo o nos podemos crear otro UseState
            dandole un valor por defecto al inicio con True porque es cuando cargamos por primera vez 
            y cuando ya dejo de cargar seria dentro del metodo "getImages" que seria despues de obtener la imagen
    */
    const [isLoading, setIsLoading] = useState(true);
    
    const getImages = async() => {
        const newImages = await getGifts( category );// Este es el que hace la peticion HTTP
        setImages(newImages);
        setIsLoading(false);// Esto solo dispara una renderizacion NO varias como podriamos creer
    }

    useEffect(() => {
        getImages();
    }, []);

    // Le mandamos las imagenes que recibimos
    return {
      //images: [],
      //isLoading: true
      // Lo de arriba lo podemos simplificar asi
      images,
      isLoading// Asi ya sabemos cuando estamos cargando y cuando NO
    }
    /*
        Con estos cambios por defecto veremos que todo vuelve a funcionar correctamente
        esto es porque las imagenes "images" son un arreglo vacio, cuando se cargan con "getImages"
        y se manda a llamar la funcion "setImages()" con esto el Hook dispara la renderizacion del componente
        entonces React sabe en Gifgrid que hubo un cambio en el State y se redibuja obtiendo las nuevas imagenes
    */
}
