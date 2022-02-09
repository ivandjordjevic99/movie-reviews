<template>
    <b-container fluid>
        <b-form>
            <b-row class="mt-2">
                <b-col sm="2" offset="2">
                    <b-input v-model="newUsername" class="mb-2 mr-sm-2 mb-sm-0" placeholder="UserName"></b-input>
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
  
  const sema2 = Joi.object().keys({
    username: Joi.string().trim().min(4).max(13).token().required(),
    content: Joi.string().min(5).max(700).required()
  });
  export default {
      name: "newComment",
      props: {
            username: {
                type: String,
                default: ''
            },
            content: {
                type: String,
                default: ''
            },
            movie_id: {
                type: Number,
                default: 0
            }
      },
      
      computed: {
        ...mapState(['comments'])

      },
      data() {
            return {
                newUsername: '',
                newContent: '',
            }
      },
      methods: {
        ...mapActions(['load_comments', 'new_comment']),
        addNew: function() {
                let id = parseInt(this.$route.params.id);
                let { error } = sema2.validate({username: this.newUsername, content: this.newContent});
                const comm = JSON.stringify({username: this.newUsername, content: this.newContent, movie_id: id});

                if(error){
                  alert(error)
                }
                else{ 
                  this.new_comment(comm);


                  this.newUsername = '';
                  this.newContent = '';
                }
            }

      },
     
  }
</script>

<style scoped>

</style>