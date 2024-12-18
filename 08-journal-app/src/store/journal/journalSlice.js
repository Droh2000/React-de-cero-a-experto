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
        state.messageSaved = ''; // limpiamos el campo por si ya estaba con contenido
     },
    // Para cargar las notas
    setNotes: (state, action) => {
        state.notes = action.payload;
    },
    // Para cuando se esten guardando las notas
    setSaving: (state) => {// No requerimos el action porque aqui solo lo vamos a establecer en Truth
      state.isSaving = true;
      state.messageSaved = ''; // limpiamos el campo por si ya estaba con contenido
    },
    // Actualizar una nota
    updateNote: (state, action) => {
      // Actualizamos la referencia local
      state.isSaving = false; //terminamos de guardar
      //Tenemos que recorrer el listado de entradas buscar la que le corresponde nuestro ID y actualizar ese valor
      // Vamos a actualizar todo lo que mandamos en el action.payload
      // Este codigo lo podemos implementar asi porque estamos usando el Reduce Toolkit
      state.notes = state.notes.map( note => {
        // Va a regresar una nota diferente si se cumple esta condicion
        // suponemos que el payload va a ser la nota actualizada
        if(note.id === action.payload.id){
          return action.payload;
        }
        return note;
      });
      
      // Debemos de saber cuando la nota se actualizo para mostrar mensajes de alerta indicando el hecho
      // para esto creamos en el "initialState" de "JournalSlice" el campo del mensaje de guardado que lo rellenamos
      // cuando se guardo la note
      // Debemos estar pendiente por un effecto si este campo cambia, y cuando cambie disparar el mensaje
      // Esta logica como es externa no se debe impleemntar aqui
      state.messageSaved = `${ action.payload.title }, actualizada correctamente`;

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
