// CustomHook
// Para no tener que estar haciendo useSelector, useDispatch, hacer esas importacoones a cada rato
// y si otro componente requerie los datos o hacer algo entoncse tenemos que hacer el mismo proceso
// de hacerlo, entonces para eso es el CustomHook donde cualquier interaccion que hagamos con el Store
// Lo vamos a hacer atraez de este custom hook (Asi tenemos centralizada la logica) y los demas componentes solo
// llaman las funciones que requieran

import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {

    const dispatch = useDispatch(); // PAra conectarnos a los reducers

    // Vamos a tomar los datos que estan el CalendarSlice y asi mostrarlos en el CalendarPages
    // (Estamos accediendo al store "calendarSlice.js")
    const { events, activeEvent } = useSelector( state => state.calendar );

    // Asi es como cuando queremos crear mas interacciones del calendario, nos creamos funciones aqui internas
    // que nos sirven para hacer los dispatch de las acciones respectivas
    // A esta funcion le mandamos el payload que esta esperando (La accion)
    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent(calendarEvent) );
    }

    // Una tecnica que vamos a usar aqui es que no vamos a usar Thunks, en lugar de eso vamos a disparar siempre
    // acciones siempre sincronas, no vamos a tener thonks asyncronos
    // Aqui creamos algo que parece un Thunk (Empezamos a crear una nueva nota)
    // Eventualmente vamos a llegar al backend mandarle la informacion respectiva (Que seria la nueva notta)
    // vamos a ir al backen y este nos va a regresar la informacion
    const startSavingEvent = async (calendarEvent) => {

        // Si la nota que le pasamos tiene el ID
        if( calendarEvent._id ){
            // Actualizando
            dispatch( onUpdateEvent({...calendarEvent}) );
        }else{
            // Creando
            // Insertamos en el arreglo de los eventos
            // El "calendarEvent" seria la nueva nota pero como no tiene el ID por el momento le creamos uno ficticio
            // esto sera temporal hasta que ya tengamos acceso al backend
             dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) );
        }
    }

    return {
        // Propieades
        events,
        activeEvent,
        // Metodos
        setActiveEvent,
        startSavingEvent, // Este lo llamamos en el CalendarModal porque es el que esta haciendo el inicio del guardado
    }
}