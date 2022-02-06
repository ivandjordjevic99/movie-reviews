<template>
    <div>
        <b-table
                hover v-if="movies.length"
                sticky-header="800px"
                :items="movies"
                :fields="fields"
                head-variant="light"
                @row-clicked="loadMovie">
        </b-table>
        <h1 v-else>No movies</h1>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import router from "@/router";
    export default {
        name: "MovieList",
        computed: {
            ...mapState(['movies'])
        },
        mounted: function() {
            this.fetchMovies();
        },
        data() {
            return {
                fields: [
                    { key: 'name' },
                    { key: 'year' }
                ]
            }
        },
        methods: {
          ...mapActions(['fetchMovies']),

          loadMovie: function (item, index, event) {
            router.push({path: `/movies/${item.id}`})
          }

        }
    }
</script>

<style>
    tr:hover td{
        background: darkgrey;
    }
</style>