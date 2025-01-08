// Esto nos va a servir para mantener la informacion del UI para saber si el modal esta abierto o cerrado
// Ademas usamos el Sniper que habiamos creado
import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isDateModalOpen: false
  },
  reducers: {
    // Podemos hacer un toggle (Si esta false pasarlo a true o si esta true pasarlo a falso)
    // Esto lo vamos a hacer mas adelante con un hook pero por ahora nos vamos a crear dos reducers
    onOpenDateModal: ( state ) => { // Esto se va a mandar a llamar cuando la persona quiera abrir el modal
        // Como estamos trabajando con el Toolkit podemos hacer esto
        state.isDateModalOpen = true;
        /* Si no estubieramos usando el toolkit tendriamos que hacer esto
        return {
            ...state,
            isDateModalOpen: true
        }*/
    },
    onCloseDateModal: ( state ) => {
        state.isDateModalOpen = false;
    }
  },
});

export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;
