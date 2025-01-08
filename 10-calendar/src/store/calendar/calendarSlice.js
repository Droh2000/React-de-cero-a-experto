// Nos vamos a crear otro espacio en el Store para manejar los eventos del calendario o saber los tipos de eventos que se ejecutan
import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

// Esto es temporal porque originalmente los vamos a obtener del backend
const tempEvents = {
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
    activeEvent: null
  },
  reducers: {
    
  },
});

export const {

} = calendarSlice.actions;
