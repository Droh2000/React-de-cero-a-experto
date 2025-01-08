// Vamos a trabajar con el Store basado en Hooks que son personalizados porque mos da mucha mas facilidad y evitamos importaciones
// Este hook nos va a servir para manejar, hacer dispatch de acciones y controlar todo lo que esta relacionado al UI Store
// Lo mismo lo vamos a hacer para los otros componentes basado en Hook
import { useDispatch, useSelector } from 'react-redux';
import { onOpenDateModal, onCloseDateModal } from '../store';

export const useUiStore = () => {

    // Para llegar a ese reducer tenemos que hacer el Dispatch de una accion (Por eso importamos el Dipatch)
    // Solo lo vamos a requerir de manera interna para trabajar con el
    const dispatch = useDispatch();

    // Aqui dentro podemos tener acceso a la partes que nos interesa del store
    // Lo que nos interesa es tomar las propiedades como la que definimos de 'isDateModalOpen'
    // Con el useSelector tenemos acceso al State y de ahi nos interesa que nos regrese la parte dle ui
    // De aqui desestructuramos las propiedades que nos interesa
    const {
        isDateModalOpen // Esta propiedad va a ir cambiando dependiendo de los reducers cambien el State
    } = useSelector( state => state.ui );

    
    // Para abrir el modal lo haremos cuando se haga doble click en el cuadro de la nota que se esta en el calendario
    // Esto lo detectamos cuando se haga "doubleClick", para hacer esto lo hacemos dentro del CustomHook  de useUiStore
    // Aqui tenemos que llegar al Store "uiSlice" y decirle a la propiedad de "onOpenDateModal" que ejecute la accion de abrir el modal
    // Para llegar al reducer hacemos el dispatch de la accion
    const openDateModal = () => {
        dispatch( onOpenDateModal() );
    }// Solo llamando esta funcion podremos abrir el modal
    // Esto lo implementamos en el CalendarPage

    // Aqui implementamos la demas logica que requiramos
    // Para cerrar el modal dando click Afuera
    const closeDateModal = () => {
        dispatch( onCloseDateModal() );
    }

    // Hacer un Toggle (Si esta abierto se cierre y si esta cerra se abra)
    const toggleDateModal = () => {
        (isDateModalOpen)
            ? openDateModal()
            : closeDateModal();
    }

    return {
        // Propiedades
        isDateModalOpen, // Lo de saber si el modal esta abierto o no lo ocupamos en el "CalendarModal.jsxs"
        // Metodos
        openDateModal,
        closeDateModal,
        toggleDateModal
    }
}
