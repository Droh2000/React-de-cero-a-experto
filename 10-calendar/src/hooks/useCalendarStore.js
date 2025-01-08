// CustomHook
// Para no tener que estar haciendo useSelector, useDispatch, hacer esas importacoones a cada rato
// y si otro componente requerie los datos o hacer algo entoncse tenemos que hacer el mismo proceso
// de hacerlo, entonces para eso es el CustomHook donde cualquier interaccion que hagamos con el Store
// Lo vamos a hacer atraez de este custom hook (Asi tenemos centralizada la logica) y los demas componentes solo
// llaman las funciones que requieran

import { useSelector } from "react-redux"

export const useCalendarStore = () => {

    // Vamos a tomar los datos que estan el CalendarSlice y asi mostrarlos en el CalendarPages
    // (Estamos accediendo al store "calendarSlice.js")
    const { events, activeEvent } = useSelector( state => state.calendar );

    // Asi es como cuando queremos crear mas interacciones del calendario, nos creamos funciones aqui internas
    // que nos sirven para hacer los dispatch de las acciones respectivas
    

    return {
        // Propieades
        events,
        activeEvent,
        // Metodos
    }
}