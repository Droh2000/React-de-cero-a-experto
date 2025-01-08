// Nos vamos a crear otro espacio en el Store para manejar los eventos del calendario o saber los tipos de eventos que se ejecutan
import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

// Esto es temporal porque originalmente los vamos a obtener del backend
const tempEvents = {
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
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    // ¿Como queremos que luzca el estado inicial? Asi queemos como se mire el estado en el CalendarSlice
    events: [
        tempEvents
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
  },
});

export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent
} = calendarSlice.actions;
