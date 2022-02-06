<template>
    <div>
        <b-jumbotron bg-variant="dark" text-variant="white" border-variant="dark" header="Movies" :lead="'Number of movies: ' + movies.length">
        </b-jumbotron>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        name: "Header",
        computed: {
            ...mapState(['movies'])
        }
    }
</script>

<style scoped>

</style>