<template>
  <div class="home" align = "center">
    <div>
      <h1>{{movies[0].name}} ({{movies[0].year}})</h1>
      
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
      computed: {
        ...mapState(['movies'])
      },
      methods: {
        ...mapActions(['load_movie']),
        toggleNewComm: function () {
                this.newcomm = !this.newcomm
            }
      },
      mounted: function() {

            this.load_movie(this.$route.params.id);
      }
  }
</script>