import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    counter: 10
  },
  reducers: {
    increment: (state) => { // Cuando se llama este Reducer, este es el State que se esta generando
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // Aqui solo modifica el counter del "initialState" si tubieramos mas propiedades definidas en el initialState estas 
      // seran regresadas igual peroque solo se esta modificando aqui el "counter", Seria equivalente lo de abajo a:
      /*
        return {
            ...state,
            counter: state.counter += 1 
        }

        Gracias a Redux no los tenemos que preucupar por esparcir las propiedads con el Spread
      */
      state.counter += 1 
    },
    // Si queremos incremtnar por un Argumento que recibamos, esto seria como el Payload 
    // El payload lo obtenemos en este segundo argumento de "action" que es como lo veniamos usando en el useReducer
    incrementBy: (state, action) => {
        // Si imprimimos este "action" veremos que tiene las propiedades como las que creamos en el useReducer (payloas, type)
        // En este caso el "payload" es un numero pero puede ser un objeto o lo que requiramos en general
        state.counter += action.payload;
    },
    decrement: (state) => {
        state.counter -= 1;
    },
  },
})

// Action creators are generated for each case reducer function
// Las "actions" se crean por la funcion "createSlice()" que contiene las acciones en el objeto que retorna
// El hecho que se esten exportando estas acciones es como antes cuando definiamos el Type y Payload
// todo eso viene en estas actions aqui automaticamente 
// Los Reducers que creemos automaticmante nos crean acciones con el mismo nombre (No son del mismo tipo aunque se llamen igual)
export const { increment, incrementBy, decrement } = counterSlice.actions