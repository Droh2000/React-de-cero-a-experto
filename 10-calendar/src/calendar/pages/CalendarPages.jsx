// Para la implementacion del calendario instalamos una libreria que se puede ver en la importacion
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
// Tambien instalamos esta libreria
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import { addHours } from 'date-fns';

import { NavBar } from "../";

const locales = {
    'en-US': enUS,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

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
    return (
        <>
            <NavBar/>

            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 'calc( 100vh - 80px )' }}// Le decimos que nos calcule basado en el 100% y le reste 80px
            />

        </>
    )
}