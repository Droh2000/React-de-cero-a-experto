import { useEffect } from 'react';
import { useAuthStore,useForm } from '../../hooks';
import './LoginPage.css'; // Estos son los estilos propios del componente
import Swal from 'sweetalert2';

// Nos vamos a crear dos formas para maneter el formulario de Registro y del Login de manera independiente
// y la ventaja con el customhook del formulario es que podemos tener tantas instancias de formulario como requiramos
const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: '',
}

export const LoginPage = () => {

    // Tomamos la funcion para mandarle los datos a este customHook que se conecta con el Backend
    // En el momento que el errorMessage cambie lo vamos a mostrar
    const { startLogin, errorMessage, startRegister } = useAuthStore();

    // creamos el estado usando el CustomHook que tendra los campos del login
    // Como el onInputChange lo vamos a requerir tambien para el Registaer no podemos tenemos dos con el mismo nombre
    // asi que lo renombramos (EStos campos los conectamos a los elemento HTML correspondientes)
    const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm( loginFormFields );
    const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm( registerFormFields );

    // Funcion para cuando precionamos el boton de Submit
    // De "event" recibimos las propiedades que definimos en los objetos de formFields 
    const loginSubmit = ( event ) => {
        event.preventDefault();
        // Del "event" obtenemos los campos de email y password
        startLogin({ email: loginEmail, password: loginPassword });
    }

    const registerSubmit = ( event ) => {
        event.preventDefault();

        if( registerPassword !== registerPassword2 ){
            Swal.fire('Error en el Registro', 'Contrasenas no son iguales', 'error');
            return;
        }

        startRegister({ name: registerName, email: registerEmail, password: registerPassword });
    }

    // Para estar de los cambios del errorMessage
    useEffect(() => {
        // Para mostrar el mensaje de error vamos a utilizar el Sweet Alert y solo lo mostramos si
        // el mensaje de error no es null
        if( errorMessage != undefined ){
            Swal.fire('Error en la authenticacion', errorMessage, 'error');
        }
    }, [errorMessage]);

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ loginSubmit } >
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name = 'loginEmail' // El nombre debe ser el mismo con el que nombramos el State
                                value = { loginEmail }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name = 'loginPassword' // El nombre debe ser el mismo con el que nombramos el State
                                value = { loginPassword }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ registerSubmit }>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name = 'registerName'
                                value = { registerName }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name = 'registerEmail'
                                value = { registerEmail }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name = 'registerPassword'
                                value = { registerPassword }
                                onChange={ onRegisterInputChange } 
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name = 'registerPassword2'
                                value = { registerPassword2 }
                                onChange={ onRegisterInputChange }
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}