<template>
  <div class="home" align = "center">
    <div>
      <h1>{{movie.name}} ({{movie.year}})</h1>
      
      <div v-if="newcomm">
        <NewComment/>
        <b-button variant="dark" @click="toggleNewComm">Cancel</b-button>
      </div>
      <div v-else>
        <b-button variant="dark" @click="toggleNewComm">New comment</b-button>
        <CommentList/>
      </div>
    </div>

  </div>
</template>

<script>
  // @ is an alias to /src
  import { mapState, mapActions } from 'vuex';
  import router from "@/router";
  import CommentList from "@/components/CommentList";
  import NewComment from "@/components/NewComment";

  export default {
      name: "comments",
      components: {
        CommentList,
        NewComment
      },
      data() {
          return {
              newcomm: false
          }
      },
      mounted: function() {
        this.fetchMovies();
      },
      methods: {
        ...mapActions(['fetchMovies']),
        toggleNewComm: function () {
                this.newcomm = !this.newcomm
            }
      },
      computed: {
        ...mapState(['movies']),

        movie: function () {
          for (let i = 0; i < this.movies.length; i++) {
            if (this.movies[i].id === parseInt(this.$route.params.id)) {
              return this.movies[i];
            }
          }
        },
      }
  }
</script>