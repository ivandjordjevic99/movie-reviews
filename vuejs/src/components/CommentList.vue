<template>
  <div class="home" align = "center">
    <div>
      <h2 v-if="comments.length == 0">No comments</h2>
      <b-card href="#" v-for="item in comments" :key="item.id" style="max-width: 40rem;">
        <h5 align = "left">{{item.user.username}} - Stars: {{item.stars}}/10</h5>
        <p align = "left">
          {{item.content}}
        </p>

        <small>{{item.updatedAt}}</small>
      </b-card>  
    </div>  

  </div>
</template>

<script>
  // @ is an alias to /src
  import { mapState, mapActions } from 'vuex';


  export default {
      name: "comments",
      computed: {
        ...mapState(['comments'])

      },
      methods: {
        ...mapActions(['fetchComments'])

      },
      mounted: function() {
        this.fetchComments(this.$route.params.id);
      }
  }
</script>