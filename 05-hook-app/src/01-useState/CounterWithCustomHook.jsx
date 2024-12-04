import { UseCounter } from "../hook/useCounter"

/*
        Hook Personalizado

    En el counter con el Hook del UseState teniamos que crear el estado, luego extraerlo,
    despues aplicar el setCounter (Es mucha logica para algo tan sencillo como un contador)
    pero a la vez queremos tener cierta logica y el control del mismo, entonces para eso creamos
    este CustoHook que se encarge de manejar los Counters para reutilizar la logica en nuestra App
        Para esto creamos la Carpeta Hook -> UseCounter.js
*/
export const CounterWithCustomHook = () => {
    // Usamos el "UseCounter" (Como regresamos un objeto lo desestructuramos como un objeto, si fuera un arreglo
    // lo desestructuramos como Arreglo)
    const { counter, increment, decrement, reset } = UseCounter();

    return (
        <>
            <h1>Counter With Custom Hook: { counter }</h1>
            <hr />
            {/*
                Estos botones deben de estar enlazados al "Counter", si en nuestro CustomHook "useCounter" no retornamos 
                nada entonces no hay manera de que Aqui podamos cambiar el valor del counter, asi que debemos de proporcionar 
                en el CustomHook la forma en como queremos que la variable "counter" sea cambiado.

                Para esto creamos funciones en el useCounter y las retornamos en el objeto pasandolas en el evento click
            */}
            <button onClick={ () => increment(2) } className="btn btn-primary">+1</button>
            <button onClick={ reset } className="btn btn-primary">Reset</button>
            <button onClick={ () => decrement(2) } className="btn btn-primary">-1</button>

        </>
    )
}

