import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies: [],
    comments: [],
    directors: []
  },
  mutations: {
    addMovies(state, rows) {
      state.movies = rows;
    },
    addDirectors(state, rows) {
      state.directors = rows;
    },
  },
  actions: {
    fetchMovies({ commit }) {
      fetch('http://localhost:8080/api/movies')
          .then( obj => obj.json() )
          .then( res => commit('addMovies', res) );
    },
    fetchDirectors({ commit }) {
      fetch('http://localhost:8080/api/directors')
          .then( obj => obj.json() )
          .then( res => commit('addDirectors', res) );
    },
  }
})
