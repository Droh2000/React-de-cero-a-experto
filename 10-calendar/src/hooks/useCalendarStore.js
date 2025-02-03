// CustomHook
// Para no tener que estar haciendo useSelector, useDispatch, hacer esas importacoones a cada rato
// y si otro componente requerie los datos o hacer algo entoncse tenemos que hacer el mismo proceso
// de hacerlo, entonces para eso es el CustomHook donde cualquier interaccion que hagamos con el Store
// Lo vamos a hacer atraez de este custom hook (Asi tenemos centralizada la logica) y los demas componentes solo
// llaman las funciones que requieran

import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";

export const useCalendarStore = () => {

    const dispatch = useDispatch(); // PAra conectarnos a los reducers

    // Vamos a tomar los datos que estan el CalendarSlice y asi mostrarlos en el CalendarPages
    // (Estamos accediendo al store "calendarSlice.js")
    const { events, activeEvent } = useSelector( state => state.calendar );
    // El usuario lo tomamos del Store para tomar el que esta autenticado
    const { user } = useSelector( state => state.auth );

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
        // Aqui tenemos que llegar al backend y hacer el proceso ya sea si tenemos el ID entonces vamos a tener que hacer
        // es actualizarlo y si no entonces lo creamos
        // En el Body para la creacion de un evento estamos mandando se nos regresa el ID, ese lo vamos a tomar ponerlo en el evento a la hora de crearlo

        // Si la nota que le pasamos tiene el ID
        if( calendarEvent._id ){
            // Actualizando
            dispatch( onUpdateEvent({...calendarEvent}) );
        }else{
            // Creando
            // Insertamos en el arreglo de los eventos
            // El "calendarEvent" seria la nueva nota pero como no tiene el ID por el momento le creamos uno ficticio
            // esto sera temporal hasta que ya tengamos acceso al backend
            //  dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) ); -> Ya no ocupamos ese ID porque ya se nos esta regresando en la Base de datos
            // El calendarApi ya viene preconfigurado con el Path asi que en la ruta solo madamos el segmento de 'events', ademes esta incrustando
            // mediante interceptores el token asi que no se manda a llamar nada mas
            // Solo le mandamos toda la informacion que nos pide el backend que es el "calendarEvent" este es el body de la informacion qu va a viajar en el Post 
            const { data } = await calendarApi.post('/events', calendarEvent);
            // En el ID le mandamos el id de la respuesta del evento creado pero ademas si revisamos el Body veremos que 
            // viene un usuario temporal que no es el real que esta autenticado asi que se lo tenemos que proporcionar tambien para que tenga el nuevo usuario real que esta conectado
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }) );
        }
    }

    // Para eliminar una nota activa (Se llama "start" porque vamos a empezar la eliminacion)
    // LA eliminacion se tendra que conectar al backend y este nos regresa una respuecta, osea sera una tarea asyncrona
    const startDeleteEvent = () => {
        dispatch( onDeleteEvent() );
    }
    
    // Para a carga de los eventos que vamos a tener en el backend
    const startLoadingEvents = async () => {
        try {
            // Llegamos al backend
            // Solo le mandamos el torzo de '/events' del endpoint porque lo demas ya esta almacenado en la variable de entorno
            const { data } = await calendarApi.get('/events');

            // Convertimos las fechas que veninan de tipo String a tipo Date de JavaScripts
            // Esta data viene en un objeto que se llama data.eventos, esto es lo que mandamos a llamar
            const events = convertEventsToDateEvents( data.evento );

            // le mandamos los eventos que ya an sido procesados y tiene la fecha
            dispatch(onLoadEvents(events));
            
        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error);
        }
    }

    return {
        // Propieades
        events,
        activeEvent,
        // De manera condicional debemos de mostrar u ocultar el boton de elimnar
        // para que solo se muestre si tenemos un nota activa (Seleccionada), esto lo sabemos con la propiedad
        // de activeEvent, vamos a regresar una nueva propiedad
        // Si es NULL regresa falso y si tiene un objeto nos regresa TRUE
        hasEventSelected: !!activeEvent,


        // Metodos
        setActiveEvent,
        startSavingEvent, // Este lo llamamos en el CalendarModal porque es el que esta haciendo el inicio del guardado
        startDeleteEvent, // Este lo implementamos en el "FabDelete.jsx"
        
        // ¿En donde vamos a llamar esto? podriamos pensar en usar aqui un useEffect que mande a llamar esa funcion
        // lo que pasa es que el "useCalendarStore" es un hook que vamos a usar en muchos componentes y en cada uno de los lugares
        // donde creemos una instancia del "useCalendarStore" mandaria a disparar el useEffect que haria cada vez peticiones al backend
        // es por eso que retornamos la funcion para tener el control de donde la vamos a mandar a llamar
        startLoadingEvents, // La mandamos a llamar en CalendarPage.jsx
    }
}