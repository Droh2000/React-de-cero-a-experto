// Para eliminar un evento
import { useCalendarStore, useUiStore } from "../../hooks"

export const FabDelete = () => {
    // Para ocultar/mostrar el boton esta logica la podriamos implementar en el CalendarPAgen donde se implenta
    // pero vamos a hacerlo aqui para no meter tanta logica en el lo otro
    // Sacando la propiedad que nos indica si hay una nota activa o no
    const { startDeleteEvent, hasEventSelected } = useCalendarStore();

    const handleDelete = () => {
        startDeleteEvent();
    }

    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={ handleDelete }
            style={{
                // Si tenemos un evento seleccionado no regresamos nada pero si es True lo bloqueamos
                display: hasEventSelected ? '' : 'none'
            }}
        >
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}
