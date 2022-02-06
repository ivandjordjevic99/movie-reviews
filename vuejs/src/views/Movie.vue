<template>
    <div>
        <b-container>
            <b-row>
                <b-col cm="6" >
                    <div>
                        <ShowMovie v-if="movies.length" :movie="movie"/>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col cm="10" style="margin-top: 10px">
                    <b-button variant="dark" @click="showComments">Show Comments</b-button>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import ShowMovie from "@/components/ShowMovie";
    import router from "@/router";
    import { mapState, mapActions } from 'vuex';

    export default {
        name: "Movie",
        components: {
            ShowMovie
        },
        mounted: function() {
          this.fetchMovies();
          this.fetchDirectors()
        },
        computed: {
            ...mapState(['movies']),
            ...mapState(['directors']),

            movie: function () {
                for (let i = 0; i < this.movies.length; i++) {
                  if (this.movies[i].id === parseInt(this.$route.params.id)) {
                    const movie = this.movies[i];
                    for (let j = 0; j < this.directors.length; j++) {
                      if (movie.director_id === this.directors[j].id){
                        movie.director_name = this.directors[j].name
                        return movie
                      }
                    }
                  }
                }
            },
        },
        methods: {
            ...mapActions(['fetchMovies', 'fetchDirectors']),
            showComments: function () {
                router.push({path: `/comments/${this.$route.params.id}`})
            }
        }
    }
</script>

<style scoped>

</style>