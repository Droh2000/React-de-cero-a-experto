import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    // Definimos como queremos que se mire la parte del Store relacionado a la autenticacion
    // Al inicio cuando la aplicacion se carga (En este punto no sabemos si el usuario esta autenticado o no)
    // asi que lo inicializamos como verificando (Cuando esta en este estado no deberiamos ni de mostrar la pantalla
    // de Login porque no sabemos si la persona esta autenticada o no sino que estamos revisando el estado de la autenticacion)
    // Asi que debariamos de mostrar algo que indique que esta Cargando antes de mostrar la pantalla porque no sabemos si no esta autentica o si por eso esta en estado Checking
    status: 'checking', // Otros Estado son: checking, not-authenticated, authenticated
    // Cuando ya se autentico vamos a obtener el ID del usuario
    // Con estas propiedades sabemos la informacion que esta fluyendo en el Store
    uid: null,
    email: null,
    displayName: null,
    photoURL: null, // Cuando sea por autenticacion de Google vamos a obtener la foto del usuario
    errorMessage: null,
  },
  reducers: {
    // Al definirlo en la funcion automaticamente tenemos el State y el Action como parametros
    login: ( state, { payload } ) => {
      // Estado de ingreso a la aplicacion
      state.status = 'authenticated';
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
      state.errorMessage = null;
    },
    // El uso del Payload queda a nuestra discrecion si lo requerimos o no 
    logout: ( state, {payload} ) => {
      // Especificamos el estado inicial de la aplicacion
      state.status = 'not-authenticated';
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      state.errorMessage = payload?.errorMessage;// LE ponemos ? para en caso que vanga el dato busque el error sino no busque nada y no salga errro
    },
    // Verificar si esta autenticado o no el usuarios
    // Esto nos va a ayudar para que cuando el usuario preciono el boton de Login y todo el proceso empeza a hacer asincrono
    // pero tenemos que ponder la aplicacion en algun tipo de estado, asi podremos bloquear botones, bloquear multiples ingresos 
    checkingCredetianls: (state) => {
      state.status = 'checking';
    }
  },
});

// Cada reducer va a tener sus acciones especificas, estas son las que vamos a disparar que ya estan relacionadas a sus reducers
export const { login, logout, checkingCredetianls } = authSlice.actions;
