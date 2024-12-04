// Componente para mostrar Informacion el Pokemon

import { useLayoutEffect, useRef, useState } from "react"

// Los parametros que recibimos son los datos qe vamos a renderizar del pokemon
export const PokemonCard = ({id, name, sprites = []}) => {
  //const {id, name, sprites } = data;

  // Implementacion del UseLayoutEffect para el componente en la carpeta 05

  // Para hacer referencia al elemento HTML
  const hRef = useRef();

  // Para mostrar las dimenciones en Pantalla
  // Aqui estamos tomando el Widht y Heish de la propiedad "getBoundingClientRect" dandole sus valores iniciales
  const [boxSize, setBoxSize] = useState({ width:0, height:0 });
  
  // El formato de este hook es el mismo que el de UseEffect, tambien tenemos el Return de limpieza
  // y ademas de especificar la lista de dependencias
  // La dependencia que le coloquemos podria dispararse cada vez que el PokemonCard Cambie aunque en teoria
  // Cuando estamos verificando si "isLoading" destruimos el componente de PokemonCard y creamos otro
  // asi que la especificacion de la dependencia no sera nesesario porque cuando se destruye y se vuelve a crear 
  // se volvera a disparar el UseLayoutEffect (Igual si queremos estar seguros podemos especificarlo)
  useLayoutEffect(() => {
    // Para hacer referencia al tamano del H2 para eso utilizamos el componente del UseRef
    // Una vez que ya esta dibujado el componente poemos sacar el Tamano de ese elemento
    // Usamos la referencia y con .current accedemos a una propiedad para el elemento HTML que en este caso
    // Con este propiedad obtenemos todo el Tamano, posicion, ubicacion, todo del elemento
    //      console.log( hRef.current.getBoundingClientRect() );
    // Con estos valores podriamos actualizar el estado y mostrarlo en algun lugar para decirle al usuario el tamano
    // Entonces ya que implementamos el UseState le establecemos los valores correspondientes aqui

    const {height, width} = hRef.current.getBoundingClientRect();

    setBoxSize({
      width,
      height
    });

    // Si cambiamos esto por un UseEffect en si obtendremos el mismo resultado
    // Pero esto seria una excepcion porque cuando se crea el elemento ya tiene las dimenciones
    // y se puede calcular 

  }, []);

  return (
    // El estilo lo pasamos entre llaves para que REACT pueda procesarlo y asi en el Stage lo podemos cambiar tambien
    /*
        (Para Trabajar con el 05-useLayout)
        Le agregamos el "display:Flex" para que asi cada vez que hacemos el cambio en el Pockemon
        veremos que la parte del Id y Nombre tiene un tamano diferente al de la imagen
        La idea es que obtengamos su tamano despues de que se haya dibujado el componente

        Esta implementacion la hacemos aqui porque aqui es donde podemos aceder directamente a este componente
    */
   <>
      <section style={{ height: 200, display:"flex" }}>
          <h2 ref={hRef} className="text-capitalize">#{id} - {name}</h2>

          {/* Para mostrar la parte de las imagenes */}
          <div>
            {
              sprites.map( sprites => (
                // Le tenemos que dar el KEy (Identificador unico parar que REACT sepa cual y como renderizarlo y en algun cambio sepa cual cambio)
                <img key={ sprites } src={sprites} alt={name} />
              ))
            }
          </div>
      </section>
      
      {/* Aqui mostramos las dimenciones obtenidas con el UseLayouteffect  */}
      <code>{ JSON.stringify(boxSize) }</code>
    </>
  )
}