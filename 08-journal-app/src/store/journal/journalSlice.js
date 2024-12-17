import { createSlice } from '@reduxjs/toolkit';

// Este slice lo metemos dentro del store.js
export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: true,// Esto es para saber si estamos guardando una nota o no (Asi evitamos guardar doble)
    messageSaved: '',
    notes: [],// La notas del diario van a estar guardado en este arrgle
    active: null,// si esta activa la nota
    // Definimos como muestra, como queremos que se mire una nota activa
    /*active: {
        id: '15SE', // Este ID nos lo va a pasar Firebase
        title: '',
        body: '',
        date: 123456,
        imageUrls: [],// URLs de imagenes que el usuario suba
    }*/
  },
  reducers: { // Estas son las acciones que vamos a requerir
    // Todo lo que pongamos en los Reducers tiene que ser tarea Sincrona no puede ser asyncrona
    // Para crear una nueva entrada
    addNewEmptyNote: (state, action) => {

    },
    // Para establecer cual es la nota activa
    setActiveNote: (state, action) => {

     },
    // Para cargar las notas
    setNotes: (state, action) => {

    },
    // Para cuando se esten guardando las notas
    setSaving: (state) => {// No requerimos el action porque aqui solo lo vamos a establecer en Truth

    },
    // Actualizar una nota
    updateNote: (state, action) => {

    },
    // Elminar la nota del listado
    deleteNoteById: (state, action) => {

    },
  },
});

export const {  } = journalSlice.actions;
