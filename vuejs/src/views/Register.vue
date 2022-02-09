<template>
  <div id="app">
    <b-form @submit="onSubmit">
      <b-form-group label="Name:" label-for="name">
        <b-form-input id="name" v-model="form.name" placeholder="Enter name" required></b-form-input>
      </b-form-group>
      <br>
      <b-form-group label="Surname:" label-for="surname">
        <b-form-input id="surname" v-model="form.surname" placeholder="Enter surname" required></b-form-input>
      </b-form-group>
      <br>
      <b-form-group label="Username:" label-for="username">
        <b-form-input id="username" v-model="form.username" placeholder="Enter username" required></b-form-input>
      </b-form-group>
      <br>
      <b-form-group label="Email address:" label-for="email">
        <b-form-input id="email" v-model="form.email" type="email" placeholder="Enter email" required></b-form-input>
      </b-form-group>
      <br>
      <b-form-group label="Password:" label-for="password">
        <b-form-input id="password" v-model="form.password" type="password" placeholder="Enter password" required></b-form-input>
      </b-form-group>

      <br>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>

import Header from '@/components/Header.vue';
import { mapActions } from 'vuex';

export default {
  name: 'Register',

  components: {
    Header
  },

  data() {
    return {
      form: {
        name: '',
        surname: '',
        username: '',
        email: '',
        password: ''
      }
    }
  },

  methods: {
    ...mapActions(['register']),

    onSubmit(e) {
      e.preventDefault();

      this.register(this.form);
    }
  }
}
</script>

<style scoped>

</style>
