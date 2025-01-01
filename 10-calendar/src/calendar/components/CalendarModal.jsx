// Para generar el Modal (La pantalla que se muestra al hacer doble clik en el cuadro) instalamos un paquete
import { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

// Aqui le pasamos el elemento del index.html en el cual toda la aplicacion esta contenia (Seria todo el ID)
Modal.setAppElement('#root');

export const CalendarModal = () => {
    
    // Este lo usamos para cambiar el valor de la propiedad del "isOpen" y asi cerrar el modal
    // Esto sera temporal porque el cerrar un model debe ser global donde tambien en otras partes de la app se pueda cerrar
    const [ isOpen, setIsOpen ] = useState(true);

    const onCloseModal = () => {
        setIsOpen(false);
    }

    return (
        <Modal
            isOpen = {isOpen} // Si queremos que este abierta la pantalla
            onRequestClose={ onCloseModal } // Esta funcion que se va a disparar cuando se mande a llamar la forma de cerrar el modal como al hacer click afuera
            style={customStyles}
            // Estos son estilos definidos en el index.css
            className="modal"
            overlayClassName="modal-fondo"
             closeTimeoutMS={200} // Para que se cierre mas lento y se pueda aplicar la animacion definida en el index.css
        >
        
        </Modal>
    )
}