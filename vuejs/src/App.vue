<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Movies</router-link> |
      <router-link to="/directors">Directors</router-link> |
      <router-link to="/about">About</router-link>
      <b-button v-if="logged" variant="dark" @click="log_out">Log out</b-button>
      <div v-else>
        <router-link to="/login">Login</router-link> |
        <router-link to="/register">Register</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

  export default {
    data() {
      return {
        logged: false
      }
    },
    mounted: function() {
      if(localStorage.getItem('token') === ''){
        this.logged = false
      }else{
        this.logged = true
      }
    },
    methods: {
      ...mapActions(['logOut']),
      log_out: function () {
        this.logOut();
      }
    },
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
