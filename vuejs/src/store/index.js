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
    addComment: function (state, comment) {
      state.comments.push(comment);
    },
    updateComment: function (state, payload) {
      for (let i = 0; i < state.comments.length; i++) {
        if (state.comments[i].id === parseInt(payload.id)) {
          state.comments[i].stars = parseInt(payload.stars);
          state.comments[i].content = payload.content;
          break;
        }
      }
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
    },
    removeComment: function (state, id) {
      for (let i = 0; i < state.comments.length; i++) {
        if (state.comments[i].id === id) {
          state.comments.splice(i, 1);
          break;
        }
      }
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
    fetchComments({ commit }, id) {
      const url = 'http://localhost:8080/api/comments/movie/' + id;
      fetch(url)
          .then( obj => obj.json() )
          .then( res => commit('addComments', res));
    },
    newComment({ commit }, obj) {
      const token = 'Bearer ' + localStorage.getItem('token');
      fetch('http://localhost:8080/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: obj
      })
          .then( obj => obj.json() )
          .then( res => commit('addComment', res));
    },
    deleteComment({ commit }, id) {
      const token = 'Bearer ' + localStorage.getItem('token');
      const url = 'http://localhost:8080/api/comments/' + id
      console.log(url)
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
          .then( obj => obj.json() )
          .then( res => commit('removeComment', res.id));
    },
    editComment({ commit }, arg) {
      const token = 'Bearer ' + localStorage.getItem('token');
      const url = 'http://localhost:8080/api/comments/' + arg.commentId
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: arg.comm
      })
          .then( obj => obj.json() )
          .then( res => commit('updateComment', res));
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
