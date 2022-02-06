<template>
  <div>
    <b-table
        hover v-if="directors.length"
        sticky-header="800px"
        :items="directors"
        :fields="fields"
        head-variant="light">
    </b-table>
    <h1 v-else>No directors</h1>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import router from "@/router";
export default {
  name: "DirectorList",
  computed: {
    ...mapState(['directors'])
  },
  mounted: function() {
    this.fetchDirectors();
  },
  data() {
    return {
      fields: [
        { key: 'name' },
        { key: 'country' }
      ]
    }
  },
  methods: {
    ...mapActions(['fetchDirectors'])

  }
}
</script>

<style>
tr:hover td{
  background: darkgrey;
}
</style>