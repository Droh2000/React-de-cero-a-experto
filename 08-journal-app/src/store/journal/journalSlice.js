import { createSlice } from '@reduxjs/toolkit';

// Este slice lo metemos dentro del store.js
export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,// Esto es para saber si estamos guardando una nota o no (Asi evitamos guardar doble)
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
    savingNewNote: (state) => {
      // Para desabilitar el boton de la interface y no crear muchas notas ai la parcion del store "isSaving" dice que es true
        state.isSaving = true;
    },
    // Para crear una nueva entrada
    addNewEmptyNote: (state, action) => {
        // En el payload vamos a tener la nueva nota y la metemos
        state.notes.push( action.payload );
        // Adicionalmente cuando creamos o agregamos una nueva nota vacia podriamos suponer que se estava Salvando "isSaving"
        // y ya cuando se agrega termino de hacer ese trabajo (Esto se puede hacer aqui o en el reducer de abajo)
        state.isSaving = false;
    },
    // Para establecer cual es la nota activa
    setActiveNote: (state, action) => {
        // El payload es la nota que queremos establecer en pantalla para poder editar, actualizar y demas
        state.active = action.payload;
     },
    // Para cargar las notas
    setNotes: (state, action) => {
        state.notes = action.payload;
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

export const {
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById
} = journalSlice.actions;

// Despues de configurar la Base De Datos en Firebase (No se escribio aqui nada por hueva si quieres saber vuelve a ver el video en udemy)
// Cuando toquemos el boton tenemos que hacer el dispatch de una accion (Nos tenemos que preguntar si esa accion es sincrona o no)
// Esta no es una accion sincrona porque nos tenemos que salir de la APP llegar a Firebase y despues regresar a la aPP por lo tanto
// tenemos que pensar automaticamente en los Thunks.js (Para las tareas asyncronas)