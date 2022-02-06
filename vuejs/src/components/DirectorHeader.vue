<template>
  <div>
    <b-jumbotron bg-variant="dark" text-variant="white" border-variant="dark" header="Directors" :lead="'Number of directors: ' + directors.length">
    </b-jumbotron>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "DirectorHeader",
  computed: {
    ...mapState(['directors'])
  }
}
</script>

<style scoped>

</style>