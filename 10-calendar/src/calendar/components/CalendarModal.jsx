// Para generar el Modal (La pantalla que se muestra al hacer doble clik en el cuadro) instalamos un paquete
import { useState } from 'react';
import Modal from 'react-modal';
import { addHours, differenceInSeconds } from 'date-fns';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';

// Para ponerlo en el idioma en español
registerLocale('es', es);

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

    // Veamos como funciona un formulario (Esto son para los campos del Modal)
    const [formValues, setFormValues] = useState({
        title: 'Jose',
        notes: 'Lopez',
        start: new Date(),
        end: addHours( new Date(), 2 ),
    });
    
    // Para poder cambiar los inputs del formulario
    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues, // para no tener que especificar todos los valores del formulario
            // Asi actualizamos el valor que venga de entrada
            [target.name]: target.value,
        });
    }

    // Para cambiar entre fechas con el DatePiker 
    // El "changing" es donde tenemos la propiedad de "start" o "end" de la fecha
    // asi esta misma funcion nos sirve para ambas cajas de texto
    const onDateChanged = ( event, changing ) => {
        setFormValues({
            ...formValues,
            [changing]: event,
        });
    }

    const onCloseModal = () => {
        setIsOpen(false);
    }

    // Obtener informacion del Formulario
    const onSubmit = ( event ) => {
        event.preventDefault(); // Detenemos la propagacion por defecto del formulario

        // Configuramos para que la fecha inicial siempre sea menor a la fecha Final
        // Para obtenemos del paquete importado la diferencia en segundos donde la primera fecha
        // que le pasamos es la que esperamos que sea mas grande
        const difference = differenceInSeconds( formValues.end, formValues.start );
        // Asi si este valor nos da negativo significa que la fecha de inicio es mayor 
        // adems si dejamos un campo de las fechas sin nada nos regresa NaN asi que tambien tenemos que verificar eso
        if( isNaN( difference ) || difference <= 0 ){
            return;
        }

        // Vamos a poner obligatorio que tengamos el titulo de la nota
        if( formValues.title.length <= 0 ) return;
         
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
            {/* Para el contenido del model instalamos la libreria de React DatePicker */}
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={ onSubmit }>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker 
                        selected={ formValues.start } // La fecha seleccionada
                        className='form-control'
                        // event es el valor de la nueva fecha seleccionada
                        onChange={(event) => onDateChanged(event, 'start')}
                        dateFormat="Pp" // para que se muestren los minutos 
                        showTimeSelect// Para que aparesca la parte de Hr/Min/Seg y podamos seleccionar eso
                        locale='es' // Para implementarle el espanol
                        timeCaption='Hora' // PAra que la parte de seleccion de la Hora salga en espanol
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker 
                        // Para que tenga una fecha minima de seleccional que no sobrepase a la fecha de inicio
                        minDate={ formValues.start }
                        selected={ formValues.end }
                        className='form-control'
                        onChange={(event) => onDateChanged(event, 'end')}
                        dateFormat="Pp"
                        showTimeSelect
                        locale='es'
                        timeCaption='Hora'
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className="form-control"
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ formValues.title }
                        onChange={ onInputChanged }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ formValues.notes }
                        onChange={ onInputChanged }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}