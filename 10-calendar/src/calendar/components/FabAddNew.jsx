// Vamos a poner un boton flotante el cual a hacer click lanze el modal
// donde los campos van a estar en blanco No como en el doble click que ya carga la informacion del cuadro azul (La nota)
// Con esto mandamos una nota sin el ID y asi podemos diferenciar si esta creando o actualizando una nota

import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks"

export const FabAddNew = () => {
    // Requerimos hacer el dispatch de ciertas acciones por ejemplo cuando hacemos click en el boton
    // queremos abrir el modal y a la vez queremos activar una nota para que el usuario vea la nota activa
    // Para esto ocupamos los dos hooks que tienen relacion con el Store
    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    // Asi abrimos el modal y establecemos la informacion
    const handlerClickNew = () => {
        // Como puede que estemos viendo una nota activa anterior lo mejor es limpiarla
        // Esto lo hacemos antes de que se abra el modal
        setActiveEvent({
            // No va a tener un ID asi sabemos si esta creando uno nuevo o actualizando, aunque igual podemos crear una propiead en el Store
            title: '',
            notes: '',
            start: new Date(),
            end: addHours( new Date(), 2 ),
            bgColor: '#fafafa',
            user: {
                _id: '123',
                name: 'jose'
            } 
        });

        openDateModal(); // Asi podemos abrir el modal
    }

    return (
        <button
            className="btn btn-primary fab"
            onClick={ handlerClickNew }
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}

// El problema de "A non-serializable  value was detected"
// esto pasa porque al trabajar con fechas usualmente se convierte en numero internamente
// (Lo dejamos asi mas adelante lo resolvemos)