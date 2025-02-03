// Nos vamos a crear otro espacio en el Store para manejar los eventos del calendario o saber los tipos de eventos que se ejecutan
import { createSlice } from '@reduxjs/toolkit';
// import { addHours } from 'date-fns';

// Esto es temporal porque originalmente los vamos a obtener del backend
/*const tempEvents = {
    // Aqui le especificamos un guion bajo antes del ID porque asi vendra en el backend que usaremos
    // Esto es temporal porque despues el Id vendra del backend
    _id: new Date().getTime(),
    title: 'Cumple del Jefe',
    notes: 'Hay que mandarlo a chingar su madre',
    start: new Date(),
    end: addHours( new Date(), 2 ),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'jose'
    } 
}*/

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    // Cuando estamos informacion hay que indicarle al Store que estamos cargando para asi poder un loading o algun tipo de mensaje
    // Este por defecto esta en True para que cuando creamos este "calendarSlice" requerimos empezar a cargar los eventos porque 
    // todavia no estan disponibles
    isLoadingEvents: true,

    // ¿Como queremos que luzca el estado inicial? Asi queemos como se mire el estado en el CalendarSlice
    events: [
        //tempEvents
    ],
    // Para cuando hagamos click en uno de los cuadros azules queremos que aqui se indique que esta activada
    activeEvent: null
  },
  reducers: {
    // Para establecer si una nota esta activa (El cuadro azul que sale en el calendario)
    // De la accion extraemos el payload porque de aqui ya sea que venga el id de la nota a acctivar o mandar toda la nota
    // podra ser como queramos pero si aqui mandamos el ID entonces en todos los demas lugares tendresmo que actualizar notas 
    // lo importante es que mantengamos lo mas homogeneo posible
    onSetActiveEvent: ( state, { payload } ) => {
      state.activeEvent = payload; // Lo que sea que le mande se va a activar
    },
    // Para guardar una nueva nota desde el boton de Guardar
    // El payload seria la nueva con el ID ya lista y procesada para ser insertada
    onAddNewEvent: (state, { payload }) => {
      state.events.push( payload );
      // Una vez se inserta la nota hay que cerrar el modal y limpiamos los ccampos de de la nota
      state.activeEvent = null;

    },
    // Para actualizar una nota ya creada
    onUpdateEvent: (state, { payload }) => {
      // Esto significa que ya viene con un ID entonces buscamos la nota a actualizar
      // Con el MAP que nos crea un nuevo arreglo de las notas que tengamos en el arreglo events
      state.events = state.events.map( event => {
        // Si el ID que estamos iternado es igual a lo que se esta mandando en el payload
        if( event._id === payload._id ){
          return payload; // Este sera el nuevo Event con los nuevos datos
        }

        return event;
      });

    },
    // Accion para Eliminar una nota
    // No requerimos pasarle el Payload porque solo con saber cual es la nota activa sabemos cual eliminar
    onDeleteEvent:  (state) => {
      // Vamos a regresar todos los eventos cuyo id sea diferente al de la nota activa
      // Aqui fisicamente lo vamos a eliminar del arreglo
      // Si no tenemos niguna nota activa no deberiamos de poder ejecutar este codigo
      if( state.activeEvent ){
        state.events = state.events.filter( event => event._id !== state.activeEvent._id );
        state.activeEvent = null; // Para que ya no tengamos niguna nota activa
      }
    },
    // No tenemos ninguna forma ni ningun reducer para poder modificar la informacion que tenems aqui
    // Asi que vamos a crearnos un reducer y la accion (esto lo va a crear el slice por nosotros) para establecer los eventos
    onLoadEvents: (state, {payload = []}) => {
      // Aqui ya vamos a tener los eventos (Esta funcion la vamos a llamar cuando ya tengamos los eventos)
      state.isLoadingEvents = false;

      // El chiste esta en que esta funion la podamos reutilizar y cada vez que tengamos eventos nuevos puede que 
      // tengamos que volver a llamar esta funcion (En cuanto definimos el reducer ya tenemos la accion)
      // state.events = payload; -> Esto funcionaria para este proyecto pero queremos la reutilizacion

      // Lo que vamos a hacer es recorrer el arreglo de payload y confirmar si el arreglo de eventos ya tenemos 
      // ciertos eventos por el ID si ya es el caso no hacemos nada pero si no lo tenemos entonces lo insertamos
      // Asi podremos llaamr varias veses esta funcion sin tener un impacto en el State
      payload.forEach(event => {
        // Bandera que nos indica si el evento que estamos iterando ya existe en el store
        // Con la funcion "some()" si encuentra segun la condicion que le pasemos nos regresa un booleano
        const exists = state.events.some( dbEvent => dbEvent.id === event.id );
        // Si no existe agregamos el evento
        if( !exists ){
          state.events.push( event );
        }
        // En este caso si ya tenemos el evento localmente no le haremos nada, pero la logica podria ser que actualizemos
        // los que ya tenemos que en este caso no lo requerimos
      });

    }
  },
});

export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents, // Este lo usamos en UseCalendarStore
} = calendarSlice.actions;
