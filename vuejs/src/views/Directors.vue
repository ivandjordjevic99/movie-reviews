<template>
  <div class="home">
    <DirectorHeader/>
    <b-container>
      <b-row>
        <b-col cm="6" >
          <DirectorList/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import DirectorList from "@/components/DirectorList";
import DirectorHeader from "@/components/DirectorHeader";

export default {
  name: 'Directors',
  components: {
    DirectorHeader,
    DirectorList
  }
}
</script>