<template>
    <div>
        <b-card bg-variant="dark" text-variant="white" align = "left">
            <b-card-title>{{movie.name}}  ({{movie.year}}) - Director: {{movie.director_name}}</b-card-title>
            <b-card-text>
               {{movie.synopsis}}
            </b-card-text>

        </b-card>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: "ShowMovie",
        props: {
            movie: Object
        }
    }
    
    
</script>

<style scoped>
   
</style>