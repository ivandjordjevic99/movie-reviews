<template>
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
                    <b-button variant="dark" size="lg" @click="addNew">Upload</b-button>
                </b-col>
            </b-row>
        </b-form>
    </b-container>
</template>

<script>
    // @ is an alias to /src
  import { mapState, mapActions } from 'vuex';
  import Joi from 'joi';
  import VueJwtDecode from "vue-jwt-decode";
  
  const sema2 = Joi.object().keys({
    stars: Joi.number().min(1).max(10).required(),
    content: Joi.string().min(5).max(700).required(),
    movie_id: Joi.number().required(),
    user_id: Joi.number().required(),
  });
  export default {
      name: "newComment",
      props: {
            user_id: {
                type: String,
                default: ''
            },
            movie_id: {
              type: String,
              default: ''
            },
            content: {
                type: String,
                default: ''
            },
            stars: {
                type: Number,
                default: 1
            }
      },
      
      computed: {
        ...mapState(['comments'])

      },
      data() {
            return {
                newStars: 0,
                newContent: '',
            }
      },
      methods: {
        ...mapActions(['newComment']),
        addNew: function() {
                let id = parseInt(this.$route.params.id);
                let decoded = VueJwtDecode.decode(localStorage.getItem('token'));
                const decoded_user_id = decoded.userId
                this.newStars = parseInt(this.newStars)
                let { error } = sema2.validate({stars: this.newStars, content: this.newContent, movie_id: id, user_id: decoded_user_id});
                const comm = JSON.stringify({stars: this.newStars, content: this.newContent, movie_id: id, user_id: decoded_user_id});
                console.log(comm)
                if(error){
                  alert(error)
                }
                else{ 
                  this.newComment(comm);


                  this.newStars = '';
                  this.newContent = '';
                }
            }

      },
     
  }
</script>

<style scoped>

</style>