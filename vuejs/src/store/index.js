import Vue from 'vue'
import Vuex from 'vuex'
import router from "@/router";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies: [],
    comments: [],
    directors: [],
    token: ''
  },
  mutations: {
    addMovies(state, rows) {
      state.movies = rows;
    },
    addDirectors(state, rows) {
      state.directors = rows;
    },
    addComments(state, rows) {
      state.comments = rows;
    },
    setToken(state, t) {
      state.token = t;
      localStorage.setItem('token', t);
      router.push({ name: 'Home' });
      router.go()
    },
    removeToken(state) {
      state.token = '';
      localStorage.setItem('token', '');
      router.go();
    }

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
    fetchComments({ commit }, id) {
      const url = 'http://localhost:8080/api/comments/movie/' + id;
      fetch(url)
          .then( obj => obj.json() )
          .then( res => commit('addComments', res));
    },
    register({ commit }, obj) {
      fetch('http://localhost:8081/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
          .then( tkn => commit('setToken', tkn.token) );
    },
    logOut({ commit }) {
      commit('removeToken')
    },
    login({ commit }, obj) {
      fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
          .then( tkn => {
            commit('setToken', tkn.token)
          } );
    }
  }
})
