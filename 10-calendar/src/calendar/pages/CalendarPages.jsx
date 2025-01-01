// Para la implementacion del calendario instalamos una libreria que se puede ver en la importacion
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';

import { NavBar } from "../";
import { localizer, getMessagesES } from '../../helpers';

const events = [{
    title: 'Cumple del Jefe',
    notes: 'Hay que mandarlo a chingar su madre',
    start: new Date(),// Este es el momento en el que queremos que empieze el evento
    end: addHours( new Date(), 2 ), // A este evento de la libreria le pasamos una fecha y le sumamos 2 horas
    // A estos eventos le podemos mandar propiedades por nosotros
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'jose'
    } 
}];

export const CalendarPages = () => {

    // Tenemos el evento, la fecha de inicio, la de finalizacion y una propiedad booleana
    const eventStyleGetter = ( event, start, end, isSelected ) => {
        // Dependiendo de lo que obtengamos aqui podemos cambiar el estilo
    }

    return (
        <>
            <NavBar/>

            <Calendar
            culture='es'
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 'calc( 100vh - 80px )' }}// Le decimos que nos calcule basado en el 100% y le reste 80px
              messages={ getMessagesES() }
              eventPropGetter={ eventStyleGetter }// Vamos a establecer un evento y veremos como funcionan en el calendario
            />

        </>
    )
}
