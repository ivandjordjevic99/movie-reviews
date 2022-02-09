<template>
  <div class="home" align = "center">
    <div>
      <h2 v-if="comments.length == 0">No comments</h2>
      <b-card href="#" v-for="item in comments" :key="item.id" style="max-width: 40rem;">
        <h5 align = "left">{{item.user.username}} - Stars: {{item.stars}}/10</h5>
        <p align = "left">
          {{item.content}}
        </p>
        <b-button v-if="authorized===item.user.username && (!editBool || item.id !== editId)" variant="dark" @click="toggleEdit(item.id)">Edit</b-button>
        <b-button v-if="authorized===item.user.username && editBool && item.id === editId" variant="dark" @click="toggleEdit">Cancel</b-button>
        <b-button v-if="authorized===item.user.username" variant="dark" @click="deleteComment(item.id)">Delete</b-button>
        <small>{{item.updatedAt}}</small>
        <div v-if="editBool && editId === item.id">
          <b-container fluid>
            <b-form>
              <b-row class="mt-2">
                <b-col sm="2" offset="2">
                  <b-input v-model="newStars" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Stars"></b-input>
                </b-col>
                <b-col sm="7" offset="2">
                  <b-form-textarea v-model="newContent" placeholder="Comment"></b-form-textarea>
                </b-col>
                <b-col sm="1">
                  <b-button variant="dark" size="lg" @click="update(item.id)">Upload</b-button>
                </b-col>
              </b-row>
            </b-form>
          </b-container>
        </div>
      </b-card>  
    </div>

  </div>
</template>

<script>
  // @ is an alias to /src
  import { mapState, mapActions } from 'vuex';
  import VueJwtDecode from "vue-jwt-decode";
  import Joi from "joi";
  const sema2 = Joi.object().keys({
    stars: Joi.number().min(1).max(10).required(),
    content: Joi.string().min(5).max(700).required(),
    movie_id: Joi.number().required(),
    user_id: Joi.number().required(),
  });

  export default {
      name: "comments",
      computed: {
        ...mapState(['comments'])

      },
      props: {
        user_id: {
          type: Number,
          default: 0
        },
        movie_id: {
          type: Number,
          default: 0
        },
        content: {
          type: String,
          default: ''
        },
        stars: {
          type: Number,
          default: 10
        }
      },
      data() {
        return {
          authorized: '',
          editId: '',
          editBool: false,
          newStars: 0,
          newContent: '',
        }
      },
      methods: {
        ...mapActions(['fetchComments', 'deleteComment', 'editComment']),
        toggleEdit: function (id) {
          this.editId = id
          this.editBool = !this.editBool
        },
        update: function(commentId) {
          let id = parseInt(this.$route.params.id);
          let decoded = VueJwtDecode.decode(localStorage.getItem('token'));
          const decoded_user_id = decoded.userId
          this.newStars = parseInt(this.newStars)
          let { error } = sema2.validate({stars: this.newStars, content: this.newContent, movie_id: id, user_id: decoded_user_id});
          const comm = JSON.stringify({stars: this.newStars, content: this.newContent, movie_id: id, user_id: decoded_user_id});
          if(error){
            alert(error)
          }
          else{
            this.editComment({commentId, comm});


            this.newStars = '';
            this.newContent = '';
          }
        }

      },
      mounted: function() {
        this.fetchComments(this.$route.params.id);
        let decoded = '';
        if(localStorage.getItem('token') !== ''){
          decoded = VueJwtDecode.decode(localStorage.getItem('token'));
          this.authorized = decoded.username;
        }
      }
  }
</script>