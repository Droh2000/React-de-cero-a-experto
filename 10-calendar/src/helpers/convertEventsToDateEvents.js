// Aqui la fechas la estabamos manejando de tipo string pero las tenemos que convertir a objetos de tipo Date para que 
// el calendario pueda renderizarlo (La data que vamos a convertir es la que esta dentro del metodo StartLoadingEvents)

import { parseISO } from "date-fns";

// para esto nos creamos un nuvo helper
export const convertEventsToDateEvents = ( events = [] ) => {
    // Vamos a regresar los eventos cuyas fechas van a estar de tipo Date
    return events.map(event => {
        // Aqui transformamos la informacion con ayuda de este paquete
        event.end = parseISO( event.end );
        event.start = parseISO( event.start );

        return event;
    });
}