<template>
  <div id="app">

    <b-form @submit="onSubmit">
      <b-form-group label="Username:" label-for="username">
        <b-form-input id="username" v-model="form.username" placeholder="Enter username" required></b-form-input>
      </b-form-group>

      <b-form-group label="Password:" label-for="password">
        <b-form-input id="password" v-model="form.password" type="password" required></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>

import Header from '@/components/Header.vue';
import { mapActions } from 'vuex';

export default {
  name: 'Login',

  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },

  methods: {
    ...mapActions(['login']),

    onSubmit(e) {
      e.preventDefault();

      this.login(this.form);

    }
  }
}
</script>

<style scoped>

</style>
