// Para la implementacion del calendario instalamos una libreria que se puede ver en la importacion
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';

import { NavBar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../";
import { localizer, getMessagesES } from '../../helpers';
import { useState } from 'react';
import { useUiStore, useCalendarStore } from '../../hooks';

/*const events = [{
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
}];*/
// Estos eventos de arriba ya no deberian de venir de aqui porque ahora deberian de venir del Store (Cualquier cosa nueva o actualizacion deberia de venir del Store)
// ESto lo implementamos temporal en el "calendarSlice.js"

export const CalendarPages = () => {

    // Asi tomamos los datos de la funcion comentada de arriba pero ahora del Custom Hook
    const {events, setActiveEvent} = useCalendarStore();

    // Custom Hook para poder abrir el modal
    const { openDateModal } = useUiStore();

    // Para almacenar en el localStorage la ubicacion donde nos encontramos en la app
    // En estado inicial obtenemos el elemento pero este puede ser null cuando se carga la primera vez asi
    // que dejamos la vista en la semana 
    const [ lastView, setLastView ] = useState(localStorage.getItem('lastview') || 'week');

    // Tenemos el evento, la fecha de inicio, la de finalizacion y una propiedad booleana
    const eventStyleGetter = ( event, start, end, isSelected ) => {
        // Dependiendo de lo que obtengamos aqui podemos cambiar el estilo
        // ya que estas propiedades que le msnadamos son las mismas que especificamos en "events"
        const style = {
            backgroundColor: '#347CF7',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }

        return {
            style
        }
    }

    // Evento cuando hacemos click queremos saber a cuadro del calendario le hicimos click
    const onSelect = ( event ) => {
        // Del customHook indicamos que esa nota esta activada
        // Asi desde el momento en el que hacemos doble click ya esta la nota activa
        setActiveEvent( event );
    }

    // Queremos hacer Dobleclick en el cuadro para sacar informacion extra de esta nota
    const onDoubleClick = ( event ) => {
        openDateModal(); // Abrimos el modal
    }

    // A pesar qee se recarge el navegador queremos que se mantenga en la misma pantalla de la opcion del menu
    const onViewChanged = ( event ) => {
        // Vamos a almacenar en el LocalStorage la ubicacion donde se encuentra en la app
        // y de ahi vamos a establecer la ubicacion con una propiedad del componente
        localStorage.setItem('lastView', event);
        // Esto no es necesario hacerlo porque el calendario ya cambia cuando establecemos la propiedad en el Calendario
        setLastView( event );
    }

    return (
        <>
            <NavBar/>

            <Calendar
              culture='es'
              localizer={localizer}
              events={events}
              defaultView={ lastView } // Para establecer la vista que se almacena en el localstorage
              startAccessor="start"
              endAccessor="end"
              style={{ height: 'calc( 100vh - 80px )' }}// Le decimos que nos calcule basado en el 100% y le reste 80px
              messages={ getMessagesES() }
              eventPropGetter={ eventStyleGetter }// Vamos a establecer un evento y veremos como funcionan en el calendario
              components={{
                // Creamos este componente para manejar el cuadro azul que se crea en el calendario al crear un nota
                // Aqui le especificamos los compoentes que pueden utilizarse
                // En este caso nos interesa sobrescribir un evento que seria el mismo para toda la App y solo le mandamos la referncia
                // Asi obtenemos varias Propiedades que podemos manipular (Estas las desestructuramos dentro del componente)
                event: CalendarEvent
              }}
              // Conectamos los otros eventos
              onDoubleClickEvent={onDoubleClick }
              onSelectEvent={ onSelect }
              onView={ onViewChanged }
            />

            <CalendarModal />

            <FabAddNew />

            <FabDelete />

        </>
    )
}