// De las props desestructuramos la propieadad que recibimos en "CallBackHook"
// Por defecto este componente se volvera a generar cada vez que el componente PAdre "CallBackHook" cambie
// Podriamos pensar en encerrar este componente en: "React.memo()" para soluciones el problema pero SIGUE OCURRIENDO EL PROBLEMA
//  Esto pasa porque las funciones y los objetos siempre apuntan a posiciones de memoria diferentes entonces cada vez que el componente se
//  vuelve a dibujar la funcion que el pasamos al componente desde el padre "CallBackHook"  llamada "increment" esta ubicada en una 
//  posicion diferente de memeoria por lo cual siempre es diferente y por eso no sirve la memorizacion
//  (Cada vez que cambia de estado del componente padre la funcion cambia en una posicion diferente de memoria)
// 
// Entonces para evitar que esto no se redibuje usamos el useCallBack en el compontne PAdre

import React from "react";

export const ShowIncrement = React.memo(({ increment }) => {
    return (
        <button
            className="btn btn-primary"
            onClick={() => {
                {/* Aqui le esamos mandando un argumeno y este se procesa dentro de "CallBackHook" en donde se implementa el "useCallBack" */}
                increment( 5);
            }}
        >
            Incrementar
        </button>
    )
})
