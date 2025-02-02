// Para mantener el estado de la autenticacion en el Store
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'counter',
  initialState: {
    // Lo ponemos el Estado en Checking porque no sabemos si esta autenticado o no
    // El estado inicial es para revisar si la persona esta autenticada
    status: 'checking',
    user: {},
    errorMessage: undefined,
  },
  reducers: { // El objetivo de los reducers es generar un nuevo State y gracias al Toolkit podemos hacer codigo mutante
    // Con esto establecemos el estado de la autenticacion a un estado de pendiente de confirmacion, es decir pasamos por el Login
    // y tenemos que poner la aplicacion en un estado como de verificacion la autenticacion
    onChecking: ( state ) => {
        state.status = 'checking';
        state.user = {};
        state.errorMessage = undefined;
    },
    onLogin: ( state, { payload } ) => {
        // Cuando mandamos a llamar este reducer meidante la accion respectiva significa que la persona esta autenticada
        state.status = 'authenticated';
        state.user = payload;
        state.errorMessage = undefined;
    }
  },
});

export const { onChecking, onLogin } = authSlice.actions;
