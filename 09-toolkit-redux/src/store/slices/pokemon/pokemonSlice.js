import { createSlice } from '@reduxjs/toolkit';

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    page: 0,
    pokemons: [],
    isLoading: false
  },
  reducers: {
    // Requerimos dos Reducer uno para cuando empezemos a cargar los pokemons
    // el estado lo vamos a poner como que lo estamos cargando y al mandar a llamar
    // esta accion, vamos a tomar del State que esta cargando
    startLoadingPokemons: (state) => {
        state.isLoading = true;
    },
    // Esto sera para cuando ya tenemos los pokemons (Aqui vamos a tener el "action" que
    // seria la informacion que estamos esperando del pokemon)
    setPokemon: (state, action) => {
      // Esta "action" puede ser cualquier cosa (el payload)
      state.isLoading = false; // Ya tenemos los datos
      state.page = action.payload.page;// En el payload deberia de venir la pagina que queremos establecer
      state.pokemons = action.payload.pokemons;
      // Aqui estas como creando un objeto donde vienen cada uno de estos elementos de arrib
    }
    // Estas son nuestras funciones creadoras de acciones
  },
});

export const { startLoadingPokemons, setPokemon } = pokemonSlice.actions;
